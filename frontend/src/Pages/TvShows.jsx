import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import NotAvailable from "../Components/NotAvailable";
import Select from "../Components/Select";
import Slider from "../Components/Slider";
import { fetchMovies, getGenres } from "../Store/store";
import { firebaseAuth } from "../Utils/FirebaseConfig.js";

const TvShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const { genres, genresLoaded, movies } = useSelector(
    (state) => state.netflix
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
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <Select genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
};
const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default TvShows;
