import React from "react";
import noImg from "../img/noimg.jpg";

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const Article = ({ urlToImage, title, publishedAt, description, url }) => {
  return (
    <div className="Article">
      <div className="ImgWrapper">
        {!urlToImage ? (
          <img src={noImg} alt="No_image available" />
        ) : (
          <img src={urlToImage} alt="article" />
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{formatDate(publishedAt)}</p>
      <button className="Selector" value="Read More">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </button>
    </div>
  );
};

export default Article;
