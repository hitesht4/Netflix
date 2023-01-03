import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Player from "./Components/Player";
import Protected from "./Components/Protected";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Movies from "./Pages/Movies";
import Signup from "./Pages/Signup";
import TvShows from "./Pages/TvShows";
import UserLiked from "./Pages/UserLiked";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/netflix"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/player"
            element={
              <Protected>
                <Player />
              </Protected>
            }
          />
          <Route
            path="/movies"
            element={
              <Protected>
                <Movies />
              </Protected>
            }
          />
          <Route
            path="/tv"
            element={
              <Protected>
                <TvShows />
              </Protected>
            }
          />
          <Route
            path="/mylist"
            element={
              <Protected>
                <UserLiked />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
