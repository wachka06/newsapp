const express = require("express");
const app = express();
const fetch = require("node-fetch");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const API_KEY = process.env.NEWSAPI_API_KEY;
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/articles", async (req, res) => {
  const { userInput, sortBy, userLang } = req.body;
  const endPoint = "https://newsapi.org/v2/everything";
  const userInputVal = `?q="${userInput}"`;
  const sortByVal = sortBy ? `&sortBy=${sortBy}` : `&sortBy=""`;
  const language = userLang ? `&language=${userLang}` : "";
  const apiKey = `&apiKey=${API_KEY}`;
  const url = endPoint + userInputVal + sortByVal + language + apiKey;

  return await fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(400).send(error));
});

const readLaterRoute = require("./routes/ReadLaters");

app.use("/readlaters", readLaterRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected DB!");
  }
);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
