import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import "animate.css";
import "atropos/css";
import HomePage from "./components/HomePage";
import MyNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import logo from "./ng-auto-logo.png";
import "./sass/style.scss";
import Registration from "./components/Registration";
import AccountDetails from "./components/AccountDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  AlimentazioniFetch,
  cambiFetch,
  marcheFetch,
  profileFetch,
} from "./redux/actions";
import RichiestaDetails from "./components/RichiestaDetails";
import RichiesteNoleggioPage from "./components/RichiesteNoleggioPage";
import PageAutoNuove from "./components/PageAutoNuove";
import PageAutousate from "./components/PageAutousate";
import PageAutoNoleggio from "./components/PageAutoNoleggio";
import AggiungiAuto from "./components/AggiungiAuto";
import DetailAuto from "./components/DetailAuto";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { FiArrowUp } from "react-icons/fi";

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
    dispatch(AlimentazioniFetch());
    dispatch(marcheFetch());
    dispatch(cambiFetch());
  }, []);

  // scroll

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Cambia 100 con il numero di pixel desiderato
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Utilizza scroll smooth per un effetto di scorrimento fluido
    });
  };
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container fluid className={loading ? "login" : "p-0"}>
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
                  N.G. Auto
                </h1>
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <p className="h4 fw-bold m-0 me-2">Benvenuto/a</p>
                  <SyncLoader color="#de0000" size={8} />
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/nuove" element={<PageAutoNuove />} />
                <Route path="/usate" element={<PageAutousate />} />

                <Route path="/aNoleggio" element={<PageAutoNoleggio />} />
                {profile !== null && (
                  <>
                    <Route path="/account/:id" element={<AccountDetails />} />
                    <Route
                      path="/richiestaInfo/:id"
                      element={<RichiestaDetails />}
                    />
                  </>
                )}
                {profile !== null && profile?.ruolo === "ADMIN" && (
                  <>
                    <Route
                      path="/richieste"
                      element={<RichiesteNoleggioPage />}
                    />
                    <Route path="/addAuto" element={<AggiungiAuto />} />
                  </>
                )}
                <Route path="/auto/:id" element={<DetailAuto />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </>
          )}
          {scrolled && (
            <Button className="topButton " onClick={() => handleClick()}>
              <FiArrowUp className="fw-bold h3 m-0 text-ng-variant " />
            </Button>
          )}
        </Container>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
