import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Components/Background";
import Header from "../Components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../Utils/FirebaseConfig";
import styles from "./styles/signup.module.css";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    setForm({
      ...form,
      [inputName]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      const { Email, Password } = form;
      await createUserWithEmailAndPassword(firebaseAuth, Email, Password);
    } catch (e) {
      console.log(e);
    }
  };
  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) {
      navigate("/login");
    }
  });

  return (
    <div className={styles.Container}>
      <Background />
      <div className={styles.content}>
        <Header />
        <div className={styles.body}>
          <div className={styles.text}>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>

          <div
            className={styles.form}
            style={{ gridTemplateColumns: show ? "1fr 1fr" : "2fr 1fr" }}
          >
            <input
              type="text"
              placeholder="Email Address"
              name="Email"
              onChange={handleChange}
              value={form.Email}
            />
            {show && (
              <input
                type="password"
                placeholder="Password"
                name="Password"
                onChange={handleChange}
                value={form.Password}
              />
            )}
            {!show && (
              <button onClick={() => setShow(true)}>Get Started {">"}</button>
            )}
          </div>
          <button onClick={handleSubmit} className={styles.button}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
