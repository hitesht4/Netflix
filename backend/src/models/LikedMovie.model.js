const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: Number },
  email: { type: String, required: true },
  genres: Array,
  image: { type: String, required: true },
  name: { type: String, required: true },
});
//  email: 'xyz@gmail.com',
//   id: 136283,
//   name: '더 글로리',
//   image: '/7vCSrzwqS5PEm0i5mHlkDfjHcnX.jpg',
//   genres: [ 'Drama' ]
const movieModel = mongoose.model("likedMovie", movieSchema);

module.exports = movieModel;
