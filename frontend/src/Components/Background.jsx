import React from "react";
import background from "../Assets/login.jpg";
import styles from "./styles/bg.module.css";

const Background = () => {
  return (
    <div className={styles.Container}>
      <img src={background} alt="Background" />
    </div>
  );
};

export default Background;
