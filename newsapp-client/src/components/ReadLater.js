import React from "react";

const ReadLater = ({ article, removeArticle }) => {
  const { title, url } = article;

  return (
    <div className="ReadLater">
      <button onClick={() => removeArticle(article)}>&#10005;</button>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  );
};

export default ReadLater;
