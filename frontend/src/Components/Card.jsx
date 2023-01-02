import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import vedio from "../Assets/vedio.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Utils/FirebaseConfig";
import axios from "axios";

const Card = ({ movie, isLiked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      setEmail(currUser.email);
    } else {
      navigate("/login");
    }
  });

  const AddtoList = async () => {
    try {
      let r = await axios.post("http://localhost:5000/user/add", {
        email,
        data: movie,
      });
      console.log({
        email,
        data: movie,
      });
      console.log(r.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt="movie" />
      {isHovered && (
        <div className="hover">
          <div className="image-vedio-container">
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
              className="vedio"
              onClick={() => navigate("/player")}
            ></video>
          </div>
          <div className="info-container flex coloumn">
            <h3 className="name">"Movie</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove From List" />
                ) : (
                  <AiOutlinePlus title="Add To My List" onClick={AddtoList} />
                )}
              </div>

              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>

            <div className="genres flex">
              <ul className="flex">
                {movie.genres.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
const Container = styled.div`
  max-width: 300px;
  width: 300px;
  height: 180px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -10vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 3px 10px;
    transition: 0.3s ease-in-out;
    background-color: #181818;
    .image-vedio-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      .vedio {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
export default React.memo(Card);
