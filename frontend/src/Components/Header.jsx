import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import styles from "./styles/Header.module.css";

const Header = ({ route, head }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <button className={styles.btn} onClick={() => navigate(route)}>
        {head}
      </button>
    </div>
  );
};

export default Header;
