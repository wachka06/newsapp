import React from "react";
import Article from "./Article";

const ArticleContainer = ({ articles, handleArticles }) => {
  return (
    <div className="ArticleContainer">
      {articles.length > 0 &&
        articles.map((article, i) => (
          <Article key={i} article={article} handleArticles={handleArticles} />
        ))}
    </div>
  );
};

export default ArticleContainer;
