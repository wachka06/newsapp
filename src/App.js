import React, { useState, useEffect } from "react";
import "./css/style.scss";
import SearchBar from "./components/SearchBar";
import ArticleContainer from "./components/ArticleContainer";
import GoTop from "./components/GoTop";
import ReadLaterContainer from "./components/ReadLaterContainer";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState({ articles: [] });
  const [filter, setFilter] = useState({ userInput: "", sortBy: "" });
  const [ReadLaters, setReadLaters] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  const endPoint = "http://newsapi.org/v2/everything";

  async function fetchData() {
    const userInputVal = `?q="${filter.userInput}"`;
    const sortByVal = filter.sortBy ? `&sortBy=${filter.sortBy}` : `&sortBy=""`;
    const language = "&language=en";
    const apiKey = `&apiKey=${API_KEY}`;
    const url = endPoint + userInputVal + sortByVal + language + apiKey;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData({ articles: data.articles }))
      .catch((error) => console.log("Request failed", error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const getArticles = (article) => {
    article &&
      fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      })
        .then((res) => res.json())
        .then((newArticle) => setReadLaters([...ReadLaters, newArticle]));
  };

  useEffect(() => {
    getArticles();
  }, []);

  const removeArticles = (article) => {
    article &&
      fetch(`http://localhost:3000/articles/${article.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          let newReadLaters = [...ReadLaters].filter(
            (art) => art.id !== article.id
          );
          setReadLaters(newReadLaters);
        });
  };

  useEffect(() => {
    removeArticles();
  }, []);

  console.log(ReadLaters, "read");

  return (
    <div className="App">
      <header>
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </header>
      <main>
        {ReadLaters.length > 0 && (
          <ReadLaterContainer
            articles={ReadLaters}
            handleRemove={removeArticles}
          />
        )}
        <ArticleContainer
          articles={data.articles}
          handleArticles={getArticles}
        />
        <GoTop />
      </main>
    </div>
  );
};

export default App;
