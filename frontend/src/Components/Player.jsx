import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import vedio from "../Assets/vedio.mp4";
import { BsArrowLeft } from "react-icons/bs";

const Container = styled.div`
  .player {
    height: 100vh;
    width: 100vw;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .vedio {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

const Player = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate("/netflix")} />
        </div>
        <video
          src={vedio}
          autoPlay
          loop
          controls
          muted
          className="vedio"
        ></video>
      </div>
    </Container>
  );
};

export default Player;
