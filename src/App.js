import React, { useState, useEffect } from "react";
import "./css/App.scss";
import SearchBar from "./components/SearchBar";
import ArticleContainer from "./components/ArticleContainer";
import GoTop from "./components/GoTop";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState({ articles: [] });
  const [userInput, setUserInput] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleChange = (e) => {
    let input = e.target.value;
    switch (e.target.className) {
      case "UserSelect":
        setSortBy(input);
        break;
      case "UserInput":
        setUserInput(input.toLowerCase());
        break;
      default:
        console.log("key not found");
    }
  };

  async function fetchData() {
    let endPoint = "http://newsapi.org/v2/everything";
    let userInputVal = userInput ? `?q=${userInput}` : `?q=""`;
    let sortByVal = sortBy ? `&sortBy=${sortBy}` : `&sortBy=""`;
    const language = "&language=en";
    const apiKey = `&apiKey=${API_KEY}`;
    let url = endPoint + userInputVal + sortByVal + language + apiKey;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.articles));
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
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <ArticleContainer articles={data} />
      <GoTop />
    </div>
  );
};

export default App;
