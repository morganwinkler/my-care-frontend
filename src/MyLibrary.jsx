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
    <div className="flex flex-wrap row justify-around text-center">
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <div
            key={article.id}
            className="card w-96 bg-base-100 shadow-xl image-full"
            style={{ marginTop: "20px", marginBottom: "150px" }}
          >
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <figure>
                <img src={article.image_url} alt="" />
              </figure>
              <div className="card-actions justify-center">
                <button onClick={() => props.onMoreInfo(article.link)} className="btn btn-accent">
                  More Information
                </button>
                <button onClick={() => handleRemoveClick(article.id)} className="btn btn-accent">
                  Remove From Library
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ margin: "100px", marginBottom: "560px" }}>
          <p>You dont have any articles yet! Head over to Learn Library to explore</p>
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
