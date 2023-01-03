import React from "react";
import styles from "../Pages/styles/movies.module.css";

const NotAvailable = () => {
  return (
    <div className={styles.Container}>
      <h1>Movies are not available at The Moment</h1>
    </div>
  );
};

export default NotAvailable;
