import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
