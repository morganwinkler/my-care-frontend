/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export function MyLibrary(props) {
  const [articles, setArticles] = useState([]);

  const handleIndexArticles = () => {
    axios.get("http://localhost:3000/articles.json").then((response) => {
      setArticles(response.data);
    });
  };

  useEffect(handleIndexArticles, []);

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <img src={article.image_url} alt="" />
          <button onClick={() => props.onMoreInfo(article.link)}>More Information</button>
        </div>
      ))}
    </div>
  );
}

export default MyLibrary;
