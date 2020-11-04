import React, { useState, useEffect } from "react";
import "./css/style.scss";
import SearchBar from "./components/SearchBar";
import ArticleContainer from "./components/ArticleContainer";
import GoTop from "./components/GoTop";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    userInput: "",
    userLang: "",
    sortBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  const endPoint = "https://newsapi.org/v2/everything";

  async function fetchData() {
    const userInputVal = `?q="${filter.userInput}"`;
    const sortByVal = filter.sortBy ? `&sortBy=${filter.sortBy}` : `&sortBy=""`;
    const language = filter.userLang ? `&language=${filter.userLang}` : "";
    const apiKey = `&apiKey=${API_KEY}`;
    const url = endPoint + userInputVal + sortByVal + language + apiKey;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.articles))
      .catch((error) => console.log("Request failed", error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <header>
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </header>
      <main>
        <ArticleContainer articles={data} />
        <GoTop />
      </main>
    </div>
  );
};

export default App;
