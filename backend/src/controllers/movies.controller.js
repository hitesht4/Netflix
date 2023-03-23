const express = require("express");
const router = express.Router();
const Movie = require("../models/LikedMovie.model");

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    let movies = await Movie.find({ email: email });
    res.send({ data: movies, status: true });
  } catch (e) {
    res.send({ msg: e.message, status: false });
  }
});

router.post("/add", async (req, res) => {
  try {
    const body = req.body;
    const { email, id } = body;
    const check = await Movie.find({ $and: [{ email: email }, { id: id }] });
    if (check.length > 0) {
      return res.send({ msg: " Movie Already Liked", status: false });
    }
    const newMovie = new Movie({ ...body });
    await newMovie.save();
    res.send({ msg: "Added to Liked Movies", data: newMovie, status: true });
  } catch (e) {
    return res.send({
      msg: "Error Adding Movie to The Liked List",
      status: false,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let r = await Movie.deleteOne({ _id: id });
    if (r.acknowledged == true) {
      return res.json({ msg: "Movie Deleted Successfully", status: true });
    }
    return res.send({ msg: "Can't Delete the Movie", status: false });
  } catch (error) {
    return res.json({
      msg: "Error Deleting movie from the Liked List",
      status: false,
    });
  }
});

module.exports = router;
