import axios from "axios";
import { useEffect, useState } from "react";

export function Library() {
  const [data, setData] = useState(null);
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleMoreInfoClick = (url) => {
    window.open(url, "_blank");
  };

  const handleAddToLibrary = (article) => {
    axios
      .post("http://localhost:3000/articles.json", {
        title: article.Title,
        image_url: article.ImageUrl,
        link: article.AccessibleVersion,
      })
      .then((response) => {
        console.log("Article added to library:", response.data);
      })
      .catch((error) => {
        console.error("Error adding article to library:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en&keyword=${keyword}`
        );
        setData(response.data.Result.Resources.Resource);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <div>
      <label>
        What would you like to learn more about? Enter keyword to find articles:
        <input type="text" value={keyword} onChange={handleKeywordChange} />
      </label>
      {data && (
        <ul>
          {data.map((resource) => (
            <div key={resource.Id}>
              <h3>{resource.Title}</h3>
              <img src={resource.ImageUrl} alt={resource.ImageAlt} />
              <button onClick={() => handleMoreInfoClick(resource.AccessibleVersion)}>More Information</button>
              <button onClick={() => handleAddToLibrary(resource)}>Add To My Library</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Library;
