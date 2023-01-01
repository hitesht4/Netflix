import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Player from "./Components/Player";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/netflix" element={<Home />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
