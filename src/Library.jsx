/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export function Library(props) {
  const [data, setData] = useState(null);
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
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
      <div className="text-center" style={{ margin: "50px" }}>
        <label className="prose">
          <h2>What would you like to learn more about? Enter keyword to find articles:</h2>
          <div>
            <input
              type="text"
              value={keyword}
              onChange={handleKeywordChange}
              className="input input-bordered input-accent"
            />
          </div>
        </label>
      </div>
      {data && (
        <div className="flex flex-wrap row justify-around text-center">
          {data.map((resource) => (
            <div
              key={resource.Id}
              className="card w-96 bg-base-100 shadow-xl image-full"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <div className="card-body">
                <h3 className="card-title">{resource.Title}</h3>
                <figure>
                  <img src={resource.ImageUrl} alt={resource.ImageAlt} />
                </figure>
                <div className="card-actions">
                  <button onClick={() => props.onMoreInfo(resource.AccessibleVersion)} className="btn btn-accent">
                    More Information
                  </button>

                  <button onClick={() => handleAddToLibrary(resource)} className="btn btn-accent">
                    Add To My Library
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
