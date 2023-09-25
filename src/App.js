import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import "animate.css";
import "atropos/css";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import logo from "./ng-auto-logo.png";
import "./sass/style.scss";
import Registration from "./components/Registration";
import AccountDetails from "./components/AccountDetails";
import { useDispatch, useSelector } from "react-redux";
import { profileFetch } from "./redux/actions";
import RichiestaDetails from "./components/RichiestaDetails";
import RichiesteNoleggioPage from "./components/RichiesteNoleggioPage";
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  let profile = useSelector((state) => state.profilo.me);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") != null && profile === null) {
      dispatch(profileFetch());
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container fluid className={loading ? "login" : ""}>
          {loading ? (
            <Row className="justify-content-center  animate__bounceInDown animate__animated">
              <Col
                xs={11}
                sm={9}
                md={3}
                lg={2}
                className="d-flex justify-content-center "
              >
                <img
                  alt=""
                  src={logo}
                  width="170"
                  height="170"
                  className=" text-end m-0"
                />
              </Col>
              <Col
                xs={11}
                sm={9}
                md={5}
                lg={3}
                xl={3}
                xxl={2}
                className="d-flex justify-content-center flex-column alig-items-center "
              >
                <h1 className="font-titoli fw-bold text-center mt-4 mt-md-0 text-md-start text-ng-variant m-0">
                  NG Auto
                </h1>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <p className="h4 fw-bold m-0 me-2">Benvenuto/a</p>
                  <SyncLoader color="#de0000" size={8} />
                </div>
              </Col>
            </Row>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/registration" element={<Registration />} />
              {profile !== null && profile?.ruolo === "ADMIN" && (
                <Route path="/richieste" element={<RichiesteNoleggioPage />} />
              )}
              <Route path="/account/:id" element={<AccountDetails />} />
              <Route path="/richiestaInfo/:id" element={<RichiestaDetails />} />
            </Routes>
          )}
        </Container>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
