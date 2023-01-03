import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import styles from "./styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" onClick={() => navigate("/netflix")} />
      </div>
      <button className={styles.btn} onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default Header;
