const express = require("express");
const app = express();
const fetch = require("node-fetch");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const API_KEY = process.env.NEWSAPI_API_KEY;
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://newsmore.herokuapp.com",
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/articles", async (req, res) => {
  const endPoint = "https://newsapi.org/v2/everything";
  const userInputVal = `?q="${req.body.userInput}"`;
  const sortByVal = req.body.sortBy
    ? `&sortBy=${req.body.sortBy}`
    : `&sortBy=""`;
  const language = req.body.userLang ? `&language=${req.body.userLang}` : "";
  const apiKey = `&apiKey=${API_KEY}`;
  const url = endPoint + userInputVal + sortByVal + language + apiKey;

  return await fetch(url)
    .then((res) => res.json())
    .then((data) => res.send(data))
    .catch((error) => console.log("Request failed", error));
});

app.listen(PORT, () => {
  console.log("Server Listening on port 3000");
});
