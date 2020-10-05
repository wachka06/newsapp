import React, { useState, useEffect } from "react";
import "./css/style.scss";
import SearchBar from "./components/SearchBar";
import ArticleContainer from "./components/ArticleContainer";
import GoTop from "./components/GoTop";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState({ articles: [] });
  const [userInput, setUserInput] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    switch (e.target.className) {
      case "UserSelect":
        setSortBy(input);
        break;
      case "UserInput":
        const trimmedInput = input.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        setUserInput(trimmedInput.toLowerCase());
        break;
      default:
        console.log("User input not found");
    }
  };

  async function fetchData() {
    const endPoint = "http://newsapi.org/v2/everything";
    const userInputVal = `?q="${userInput}"`;
    const sortByVal = sortBy ? `&sortBy=${sortBy}` : `&sortBy=""`;
    const language = "&language=en";
    const apiKey = `&apiKey=${API_KEY}`;
    const url = endPoint + userInputVal + sortByVal + language + apiKey;

    await fetch(url)
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
