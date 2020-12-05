const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const articleRoute = require("./routes/Articles");
const readLaterRoute = require("./routes/ReadLaters");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/articles", articleRoute);
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
