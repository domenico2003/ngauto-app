import { useState } from "react";
import { useEffect } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClockCircle,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import logo from "../ng-auto-logo.png";
import img1 from "../img/imgAuto1.jpg";
import img2 from "../img/imgAuto3.jpg";
import img3 from "../img/imgAuto5.jpg";
import AOS from "aos";
const HomePage = () => {
  const navigate = useNavigate();
  const [auto, setAuto] = useState([]);
  useEffect(() => {
    autoFetch();
    AOS.init({
      duration: 2000, // durata dell'animazione (in millisecondi)
    });
  }, []);

  const autoFetch = async () => {
    const URL = "http://localhost:3001/automobili/all";
    const headers = {};

    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setAuto(dato.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {auto.length > 0 && (
        <Carousel
          className="homeCarusel mb-4 "
          prevIcon={
            <AiOutlineArrowLeft className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1" />
          }
          variant="ng-variant"
          nextIcon={
            <AiOutlineArrowRight
              style={{ opacity: 1, color: "#de0000" }}
              className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1"
            />
          }
        >
          {auto.map((singleAuto, index) => (
            <Carousel.Item
              key={index}
              className="singlePointer"
              onClick={() => navigate("/auto/" + singleAuto?.id)}
            >
              <img
                src={singleAuto?.copertina?.url}
                alt={singleAuto?.copertina?.id}
                className="img-fluid "
                // width={200}
                // height={100}
              />

              <Carousel.Caption className="p-3 mx-auto">
                <div className="mb-0 d-flex justify-content-center align-items-center text-center   fw-bold  h1  ">
                  <p className="h2 fw-bold m-0  titoloPagina font-titoli">
                    {" "}
                    {singleAuto?.marca?.tipo} {singleAuto?.modello?.tipo}
                  </p>
                </div>
                <p className={`text-center h3 mt-1 mb-3 fw-bold`}>
                  {singleAuto?.condizione === "noleggio" && "per "}
                  {singleAuto?.condizione} -{" "}
                  <span className="titoloPagina text-ng-variant">
                    {singleAuto?.prezzo}
                    {singleAuto?.condizione === "noleggio" ? "€/24h" : "€"}
                  </span>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}{" "}
      <Container>
        <div className="d-flex justify-content-center align-items-center mb-5">
          {" "}
          <img
            alt="logo"
            src={logo}
            width="90"
            height="90"
            className="d-inline-block align-top me-2 text-center"
          />
          <div className="text-center text-black">
            <p className="m-0 h1 fw-bold">Vendita Auto</p>
            <p className="m-0 h3 fw-bold">Nuove e Usate</p>
            <p className="m-0 font-titoli text-ng-variant  fw-bold">
              di <span className="h2 m-0 fw-bold">Nando Bara</span>
            </p>
          </div>
        </div>
        <div>
          <Row xs={1} md={2}>
            <Col className="oblique-border" data-aos="fade-right">
              <img src={img1} alt="auto1" />
            </Col>{" "}
            <Col
              className="d-flex background flex-column align-items-center my-5 my-md-0"
              data-aos="fade-left"
            >
              <p className="m-0 fw-bold text-center my-3 my-md-0 h2 font-titoli titoloPagina">
                Visualizza auto
              </p>
              <p className="m-0  w-personalizzata    d-block my-md-auto text-center align-self-center">
                Dai un'ochiata alle auto, nuove e usate, che possono essere
                acquistate o noleggiate nelle apposite pagine.
              </p>
            </Col>
          </Row>
        </div>
        <div className="my-6">
          <Row xs={1} md={2}>
            <Col
              className="oblique-border-destro order-md-2"
              data-aos="fade-left"
            >
              <img src={img2} alt="auto2" />
            </Col>{" "}
            <Col
              className="d-flex background flex-column align-items-center"
              data-aos="fade-right"
            >
              <p className="m-0 fw-bold text-center my-3 my-md-0 h2 font-titoli titoloPagina">
                Richiedi auto per noleggio
              </p>
              <p className="m-0  w-personalizzata  d-block my-auto text-center align-self-center">
                Registrati o accedi per richiedere il noleggio di un auto per un
                periodo di tempo.
              </p>
            </Col>
          </Row>
        </div>
        <div className="my-6">
          <Row xs={1} md={2}>
            <Col className="oblique-border" data-aos="fade-right">
              <img src={img3} alt="auto4" />
            </Col>{" "}
            <Col
              className="d-flex background flex-column align-items-center my-5 my-md-0"
              data-aos="fade-left"
            >
              <p className="m-0 fw-bold text-center my-3 my-md-0 h2 font-titoli titoloPagina d-flex justifu-cpmtent-center">
                <span className="h3 titoloPagina h-auto me-2">
                  {" "}
                  <AiOutlineClockCircle />
                </span>{" "}
                Orari di apertura
              </p>
              <p className="m-0  w-personalizzata  d-block my-auto text-center align-self-center">
                <p className="m-0">
                  <span className="fw-bold text-warning">
                    Dal Lunedì al Venerdì:{" "}
                  </span>
                  <span className="d-block text-decoration-underline fw-bold no-truncate">
                    8:00-12:30 /14:30-18:30
                  </span>
                </p>
                <p className="m-0">
                  <span className="fw-bold text-warning">Sabato: </span>
                  <span className=" text-decoration-underline fw-bold">
                    8:00-12:30
                  </span>
                </p>
                <p className="m-0">
                  <span className="fw-bold text-warning">Domenica: </span>
                  <span className=" text-decoration-underline fw-bold">
                    Chiuso
                  </span>
                </p>
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default HomePage;
