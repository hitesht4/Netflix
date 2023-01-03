import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Image from "../Assets/home.jpg";
import MovieLogo from "../Assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../Components/Slider";
import styles from "./styles/home.module.css";
import { fetchAllMovies, getGenres } from "../Store/Movies/movies.actions";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Genres, getGenresLoaded, Movies } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (getGenresLoaded) dispatch(fetchAllMovies("all", Genres));
  }, [getGenresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div>
      <Navbar isScrolled={isScrolled} />
      <div className={styles.hero}>
        <img src={Image} alt="Trailer" />

        <div className={styles.container}>
          <div>
            <img src={MovieLogo} alt="Logo" />
          </div>

          <div className={styles.buttons}>
            <button onClick={() => navigate("/player")}>
              <FaPlay /> Play
            </button>
            <button>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={Movies} />
    </div>
  );
};

export default Home;
