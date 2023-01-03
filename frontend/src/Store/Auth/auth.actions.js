import { Login, Logout } from "./auth.types";

export const SignInFunction = (email) => (dispatch) => {
  dispatch({
    type: Login,
    payload: email,
  });
};

export const SignOutFunction = () => (dispatch) => {
  dispatch({
    type: Logout,
  });
};
