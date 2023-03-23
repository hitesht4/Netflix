import axios from "axios";
import { Api_key, url } from "../../Utils/constants";
import {
  deleteLiked,
  getAllMovies,
  getGen,
  getLikedMovies,
} from "./movies.types";
// --------------------------------------------------------------------------------
//Fetching Genres
export const getGenres = () => async (dispatch) => {
  const { data } = await axios.get(
    `${url}/genre/movie/list?api_key=${Api_key}`
  );

  dispatch({ type: getGen, payload: data.genres });
};
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
  console.log(data);
  dispatch({ type: getAllMovies, payload: data });
};

//fetching liked Movies
export const GetLikedMovies = (email) => async (dispatch) => {
  const { data } = await axios.get(
    `https://netflix-bk77-hitesht4.vercel.app/movie/${email}`
  );
  dispatch({ type: getLikedMovies, payload: data.data });
};

export const RemoveLikedMovie = (email, movieId) => async (dispatch) => {
  const r = await axios.delete(
    `https://netflix-bk77-hitesht4.vercel.app/movie/delete/${movieId}`,
    {
      data: {
        email: email,
      },
    }
  );

  console.log(r.data.status);

  dispatch({ type: deleteLiked, payload: movieId });
};
