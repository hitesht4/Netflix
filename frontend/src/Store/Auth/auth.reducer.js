import { Login, Logout } from "./auth.types";
const email = localStorage.getItem("email") || "";

const initialState = {
  isAuth: false,
  email: email,
};

export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Login: {
      localStorage.setItem("email", payload);
      return { ...state, isAuth: true, email: payload };
    }
    case Logout: {
      localStorage.removeItem("email");
      return { ...state, isAuth: false, email: "" };
    }
    default: {
      return state;
    }
  }
};
