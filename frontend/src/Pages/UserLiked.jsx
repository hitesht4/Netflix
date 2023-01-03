import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import NotAvailable from "../Components/NotAvailable";
import { GetLikedMovies } from "../Store/Movies/movies.actions";
import styles from "./styles/liked.module.css";

const UserLiked = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuth, email } = useSelector((state) => state.auth);
  const { Liked } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetLikedMovies(email));
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div>
      <Navbar isScrolled={isScrolled} />

      {Liked.length > 0 ? (
        <div className={styles.content}>
          <h1>My List</h1>
          <div className={styles.grid}>
            {Liked.map((movie, index) => {
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  index={index}
                  isLiked={true}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <NotAvailable />
      )}
    </div>
  );
};

export default UserLiked;
