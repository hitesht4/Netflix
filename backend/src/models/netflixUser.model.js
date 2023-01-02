const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  likedMovies: Array,
});

const userModel = mongoose.model("netflixUser", userSchema);

module.exports = userModel;
