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

  const handleRemoveClick = (id) => {
    axios
      .delete(`http://localhost:3000/articles/${id}.json`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
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
          <button onClick={() => handleRemoveClick(article.id)}>Remove From Library</button>
        </div>
      ))}
    </div>
  );
}

export default MyLibrary;
