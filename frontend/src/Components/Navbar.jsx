import React, { useState } from "react";
import logo from "../Assets/logo.png";
import styles from "./styles/navbar.module.css";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../Utils/FirebaseConfig";
import { signOut } from "firebase/auth";

const Links = [
  { name: "Home", route: "/" },
  { name: "TV Shows", route: "/tv" },
  { name: "Movies", route: "/movies" },
  { name: "My List", route: "/mylist" },
];

const Navbar = ({ isScrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  return (
    <div>
      <nav
        className={styles.nav}
        style={{ backgroundColor: isScrolled ? "black" : "" }}
      >
        <div className={styles.left}>
          <div className={styles.brand}>
            <img src={logo} alt="logo" />
          </div>
          <ul className={styles.Links}>
            {Links.map((item) => (
              <li key={item.name}>
                <Link to={item.route}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <div className={`${styles.search} ${showSearch && "show_search"}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setInputHover(false);
                setShowSearch(false);
              }}
            />
          </div>
          <button className={styles.Powerbutton}>
            <FaPowerOff onClick={() => signOut(firebaseAuth)} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
