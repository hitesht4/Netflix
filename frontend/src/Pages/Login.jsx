import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../Utils/FirebaseConfig";
import Background from "../Components/Background";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SignInFunction } from "../Store/Auth/auth.actions";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
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
      toast.error(e.message, toastOptions);
    }
  };

  useEffect(() => {
    if (email) {
      navigate("/netflix");
    }
  }, [email]);
  return (
    <div className={styles.Container}>
      <Background />
      <div className={styles.content}>
        <Header head={"Signup"} route="/" />
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
