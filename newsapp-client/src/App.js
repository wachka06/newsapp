import React, { useState, useEffect } from "react";
import "./css/style.scss";
import SearchBar from "./components/SearchBar";
import ArticleContainer from "./components/ArticleContainer";
import GoTop from "./components/GoTop";
import ReadLaters from "./components/ReadLaters";

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    userInput: "",
    userLang: "",
    sortBy: "",
  });
  const [readLaters, setReadLaters] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const url = "http://localhost:3000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/articles`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      });
      const data = await res.json();
      setData(data.articles);
    } catch (err) {
      console.log((err) => console.log("Request failed", err));
    }
  };

  useEffect(() => {
    async function fetchReadLaters() {
      try {
        const res = await fetch(`${url}/readlaters`);
        const readLaters = await res.json();
        setReadLaters(readLaters);
      } catch (err) {
        console.log((err) => console.log("Request failed", err));
      }
    }
    fetchReadLaters();
  }, []);

  const addArticle = (article) => {
    const userArticle = { title: article.title, url: article.url };
    setSelectedArticle(userArticle);
    return postReadLater();
  };

  const postReadLater = async () => {
    if (selectedArticle.title) {
      try {
        const res = await fetch(`${url}/readlaters`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedArticle),
        });
        const data = await res.json();
        setReadLaters([...readLaters, data]);
      } catch (err) {
        console.log("Request failed", err);
      }
    }
  };

  const removeArticle = async (selectedArticle) => {
    try {
      const res = await fetch(`${url}/readlaters/${selectedArticle._id}`, {
        method: "DELETE",
      });
      res.status === 200 && console.log("The data is succesfully deleted.");
      const filteredArticles = readLaters.filter((article) => {
        return article._id !== selectedArticle._id;
      });
      setReadLaters(filteredArticles);
    } catch (err) {
      console.log("Request failed", err);
    }
  };

  return (
    <div className="App">
      <header>
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </header>
      <main>
        <ArticleContainer articles={data} addArticle={addArticle} />
        {readLaters.length > 0 && (
          <ReadLaters articles={readLaters} removeArticle={removeArticle} />
        )}
        <GoTop />
      </main>
    </div>
  );
};

export default App;
