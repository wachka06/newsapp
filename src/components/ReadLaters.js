import React from "react";
import ReadLater from "./ReadLater";

const ReadLaters = ({ articles, removeArticle }) => {
  return (
    <div className="ReadLaters">
      <h6>YOUR LIST</h6>
      {articles.map((article, i) => (
        <ReadLater key={i} article={article} removeArticle={removeArticle} />
      ))}
    </div>
  );
};

export default ReadLaters;
