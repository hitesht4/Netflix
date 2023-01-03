require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const connect = require("./src/configs/db");
const mongoose = require("mongoose");
const userRouter = require("./src/controllers/netflixUser.conroller");
const cors = require("cors");
const app = express();
app.get("/", (req, res) => {
  res.send("Welcome To Api");
});
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, async () => {
  await connect;
  console.log(`Server Started on ${port}`);
});
