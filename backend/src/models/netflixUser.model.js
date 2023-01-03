const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  likedMovies: { type: [], required: false },
});

const userModel = mongoose.model("netflixUser", userSchema);

module.exports = userModel;
