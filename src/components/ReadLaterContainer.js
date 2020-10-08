import React from "react";
import ReadLater from "./ReadLater";

const ReadLaterContainer = ({ articles, handleRemove }) => {
  return (
    <div className="ReadLaterContainer">
      {articles.map((article, i) => (
        <ReadLater key={i} article={article} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default ReadLaterContainer;
