const express = require("express");
const connect = require("./src/configs/db");
const mongoose = require("mongoose");
const userRouter = require("./src/controllers/netflixUser.conroller");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(5000, async () => {
  await connect;
  console.log("Server Started");
});
