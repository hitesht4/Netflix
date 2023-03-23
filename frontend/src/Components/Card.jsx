import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/card.module.css";
import vedio from "../Assets/vedio.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RemoveLikedMovie } from "../Store/Movies/movies.actions";
import { ToastContainer, toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  draggable: true,
  theme: "dark",
};

const Card = ({ movie, isLiked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { email } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddtoList = async () => {
    try {
      let r = await axios.post("http://localhost:5000/movie/add", {
        email,
        ...movie,
      });
      console.log(r);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className={styles.Container}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.image}`}
          alt="movie"
        />
        {isHovered && (
          <div className={styles.hover}>
            <div className={styles.image_vedio_container}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                alt="movie"
                onClick={() => navigate("/player")}
              />
              <video
                src={vedio}
                autoPlay
                loop
                controls
                muted
                className={styles.vedio}
                onClick={() => navigate("/player")}
              ></video>
            </div>

            <div className={styles.info}>
              <h3 className={styles.name}>{movie.name}</h3>

              <div className={styles.icons}>
                <div className={styles.controls}>
                  <IoPlayCircleSharp
                    title="play"
                    onClick={() => navigate("/player")}
                  />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {isLiked ? (
                    <BsCheck
                      title="Remove From List"
                      onClick={() =>
                        dispatch(RemoveLikedMovie(email, movie._id))
                      }
                    />
                  ) : (
                    <AiOutlinePlus title="Add To My List" onClick={AddtoList} />
                  )}
                </div>

                <div className={styles.MoreInfo}>
                  <BiChevronDown title="More Info" />
                </div>
              </div>

              <div className={styles.genres}>
                <ul>
                  {movie.genres.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default React.memo(Card);
