const express = require("express");
const router = new express.Router();
require("dotenv").config();
const API_KEY = process.env.NEWSAPI_API_KEY;
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
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

module.exports = router;
