import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../Utils/FirebaseConfig";
import Background from "../Components/Background";
import Header from "../Components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SignInFunction } from "../Store/Auth/auth.actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, email } = useSelector((state) => state.auth);
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
      await signInWithEmailAndPassword(firebaseAuth, Email, Password);
      dispatch(SignInFunction(Email));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isAuth && email) {
      navigate("/netflix");
    }
  }, [isAuth, email]);
  return (
    <div className={styles.Container}>
      <Background />
      <div className={styles.content}>
        <Header />
        <div className={styles.formContainer}>
          <div className={styles.Form}>
            <div className="title">
              <h3>Login</h3>
            </div>

            <div className={styles.container}>
              <input
                type="text"
                placeholder="Email Address"
                name="Email"
                onChange={handleChange}
                value={form.Email}
              />
              <input
                type="password"
                placeholder="Password"
                name="Password"
                onChange={handleChange}
                value={form.Password}
              />
              <button onClick={handleSubmit}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
