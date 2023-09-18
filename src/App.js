import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import "animate.css";
import "atropos/css";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavbar";
import { useEffect } from "react";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
