import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Pages/styles/movies.module.css";
import { fetchMoviesByGenre } from "../Store/Movies/movies.actions";

const Select = ({ genres, type }) => {
  const dispatch = useDispatch();
  const { Genres } = useSelector((state) => state.movies);
  return (
    <select
      className={styles.Select}
      onChange={(e) =>
        dispatch(fetchMoviesByGenre(type, e.target.value, Genres))
      }
    >
      {genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
