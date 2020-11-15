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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  async function fetchData() {
    await fetch("http://localhost:3000/articles", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://newsmore.herokuapp.com",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(filter),
    })
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

  useEffect(async () => {
    const res = await fetch("http://localhost:3000/readlaters");
    const readLaters = await res.json();
    setReadLaters(readLaters);
  }, []);

  const addArticle = (article) => {
    const userArticle = { title: article.title, url: article.url };
    setSelectedArticle(userArticle);
    return postReadLater();
  };

  const postReadLater = () => {
    if (selectedArticle.title) {
      fetch("http://localhost:3000/readlaters", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedArticle),
      })
        .then((res) => res.json())
        .then((addedData) => setReadLaters([...readLaters, addedData]))
        .catch((error) => console.log("Request failed", error));
    }
  };

  const removeArticle = async (selectedArticle) => {
    console.log(selectedArticle._id, "ID");
    const res = await fetch(
      `http://localhost:3000/readlaters/${selectedArticle._id}`,
      {
        method: "DELETE",
      }
    );
    const filteredArticles = readLaters.filter((article) => {
      return article._id !== selectedArticle._id;
    });
    setReadLaters(filteredArticles);
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
