import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles/movies.module.css";
import Navbar from "../Components/Navbar";
import NotAvailable from "../Components/NotAvailable";
import Select from "../Components/Select";
import Slider from "../Components/Slider";
import { firebaseAuth } from "../Utils/FirebaseConfig.js";
import { fetchAllMovies, getGenres } from "../Store/Movies/movies.actions";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Genres, getGenresLoaded, Movies } = useSelector(
    (state) => state.movies
  );

  onAuthStateChanged(firebaseAuth, (currUser) => {
    // if (currUser) {
    //   navigate("/netflix");
    // }
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (getGenresLoaded) dispatch(fetchAllMovies("tv", Genres));
  }, [getGenresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className={styles.data}>
        <Select genres={Genres} type="tv" />
        {Movies.length ? <Slider movies={Movies} /> : <NotAvailable />}
      </div>
    </div>
  );
};

export default Movies;
