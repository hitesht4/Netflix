require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const connect = require("./src/configs/db");
const movieRouter = require("./src/controllers/movies.controller");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome To Api");
});

mongoose.set("strictQuery", true);

app.use(cors());
app.use(express.json());
app.use("/movie", movieRouter);

app.listen(port, async () => {
  connect;
  console.log(`Server Started on ${port}`);
});
