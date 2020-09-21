import React from "react";
import Article from "./Article";

const ArticleContainer = ({ articles }) => {
  return (
    <div className="ArticleContainer">
      {articles.length > 0 &&
        articles.map((article) => (
          <Article
            key={article.publishedAt}
            urlToImage={article.urlToImage}
            title={article.title}
            publishedAt={article.publishedAt}
            description={article.description}
            url={article.url}
          />
        ))}
    </div>
  );
};

export default ArticleContainer;
