import { Login, Logout } from "./auth.types";

const initialState = {
  isAuth: false,
  email: "",
};

export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Login: {
      return { ...state, isAuth: true, email: payload };
    }
    case Logout: {
      return { ...state, isAuth: false, email: "" };
    }
    default: {
      return state;
    }
  }
};
