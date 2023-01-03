import axios from "axios";
import { Api_key, url } from "../../Utils/constants";
import {
  deleteLiked,
  getAllMovies,
  getGen,
  getLikedMovies,
} from "./movies.types";
// --------------------------------------------------------------------------------
const fillArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};
const getRawData = async (api, genres, paging) => {
  const moviesArr = [];
  for (let i = 1; moviesArr.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    fillArrayFromRawData(results, moviesArr, genres);
  }
  return moviesArr;
};
// --------------------------------------------------------------------------------
//Fetching Genres
export const getGenres = () => async (dispatch) => {
  const { data } = await axios.get(
    `${url}/genre/movie/list?api_key=${Api_key}`
  );

  dispatch({ type: getGen, payload: data.genres });
};
//fetching Movies
export const fetchAllMovies = (type, Genres) => async (dispatch) => {
  let data = await getRawData(
    `${url}/trending/${type}/week?api_key=${Api_key}`,
    Genres,
    true
  );
  dispatch({ type: getAllMovies, payload: data });
};
//fetching movies by genre
export const fetchMoviesByGenre = (type, genre, Genres) => async (dispatch) => {
  let data = await getRawData(
    `${url}/discover/${type}?api_key=${Api_key}&with_genres=${genre}`,
    Genres
  );
  dispatch({ type: getAllMovies, payload: data });
};
//fetching liked Movies

export const GetLikedMovies = (email) => async (dispatch) => {
  const {
    data: { movies },
  } = await axios.get(`http://localhost:5000/user/${email}`);

  dispatch({ type: getLikedMovies, payload: movies });
};

export const RemoveLikedMovie = (email, movieId) => async (dispatch) => {
  const { data } = await axios.put(`http://localhost:5000/user/delete`, {
    email,
    movieId,
  });
  console.log(data.movies);

  dispatch({ type: deleteLiked, payload: data.movies });
};
