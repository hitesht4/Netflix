import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Background from "../Components/Background";
import Header from "../Components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../Utils/FirebaseConfig";

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
      navigate("/netflix");
    }
  });

  return (
    <Container show={show}>
      <Background />
      <div className="content">
        <Header />
        <div className="body flex coloumn a-center j-center">
          <div className="text flex coloumn">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>

          <div className="form">
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
          <button onClick={handleSubmit}>Signup</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
  }
  .body {
    gap: 1rem;
    .text {
      gap: 1rem;
      text-align: center;
      font-size: 2rem;
    }
    h1 {
      padding: 0 25rem;
    }
  }
  .form {
    display: grid;
    width: 60%;
    grid-template-columns: ${({ show }) => (show ? "1fr 1fr" : "2fr 1fr")};
    input {
      color: black;
      border: none;
      padding: 1.3rem;
      font-size: 1.2rem;
      border: 1px solid black;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;

      font-weight: bolder;
      font-size: 1.05rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;

export default Signup;
