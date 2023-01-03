import React from "react";
import { useNavigate } from "react-router-dom";

import vedio from "../Assets/vedio.mp4";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./styles/player.module.css";

const Player = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.player}>
        <div className={styles.back}>
          <BsArrowLeft onClick={() => navigate("/netflix")} />
        </div>
        <video
          src={vedio}
          autoPlay
          loop
          controls
          muted
          className={styles.vedio}
        ></video>
      </div>
    </div>
  );
};

export default Player;
