import React from "react";

const ReadLater = ({ article, handleRemove }) => {
  const { title, url } = article;
  return (
    <div className="ReadLater">
      <button onClick={() => handleRemove(article)}>&#10005;</button>
      <article>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </article>
    </div>
  );
};

export default ReadLater;
