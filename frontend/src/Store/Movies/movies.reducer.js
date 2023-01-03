import {
  deleteLiked,
  getAllMovies,
  getGen,
  getLikedMovies,
} from "./movies.types";

const initialState = {
  Genres: [],
  getGenresLoaded: false,
  Movies: [],
  Liked: [],
};

export const MovieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case getGen: {
      return { ...state, Genres: [...payload], getGenresLoaded: true };
    }
    case getAllMovies: {
      return { ...state, Movies: [...payload] };
    }
    case getLikedMovies: {
      return { ...state, Liked: [...payload] };
    }
    case deleteLiked: {
      if (payload) {
        return { ...state, Liked: [...payload] };
      } else {
        return { ...state, Liked: [] };
      }
    }
    default: {
      return state;
    }
  }
};
