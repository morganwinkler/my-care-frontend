import { useEffect, useState } from "react";

export function Library() {
  const [data, setData] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en&keyword=${keyword}`
        );
        const result = await response.json();
        setData(result.Result.Resources.Resource);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [keyword]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleMoreInfoClick = (url) => {
    window.open(url, "_blank");
  };

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
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Library;
