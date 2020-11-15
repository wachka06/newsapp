import React from "react";
import Article from "./Article";

const ArticleContainer = ({ articles, addArticle }) => {
  return (
    <div className="ArticleContainer">
      {articles &&
        articles.length > 0 &&
        articles.map((article, i) => (
          <Article key={i} article={article} addArticle={addArticle} />
        ))}
    </div>
  );
};

export default ArticleContainer;
