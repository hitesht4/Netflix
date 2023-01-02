const express = require("express");
const UserModel = require("../models/netflixUser.model");
const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ msg: "Success", movies: user.likedMovies });
    }

    res.send({ msg: "User Not Found" });
  } catch (e) {
    res.json({ msg: "Error Fetching Movies" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await UserModel.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await UserModel.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
});

module.exports = router;
