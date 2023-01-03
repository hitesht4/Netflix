import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./Auth/auth.reducer";
import { MovieReducer } from "./Movies/movies.reducer";

const rootReducer = combineReducers({
  movies: MovieReducer,
  auth: AuthReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
