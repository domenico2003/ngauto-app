import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  Carousel,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../ng-auto-logo.png";
import img1 from "../img/imgAuto1.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [auto, setAuto] = useState([]);
  useEffect(() => {
    autoFetch();
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
        <div data-aos="fade-right">
          <Row xs={1} md={2}>
            <Col className="oblique-border">
              <img src={img1} alt="auto1" />
            </Col>{" "}
            <Col className="d-flex flex-column align-items-center">
              <p className="m-0 fw-bold text-center h2 font-titoli titoloPagina">
                Visualizza auto
              </p>
              <p className="m-0 w-personalizzata d-block my-auto text-center align-self-center">
                Dai un'ochiata alle auto, nuove e usate, che possono essere
                acquistate o noleggiate nelle apposite pagine
              </p>
              <div class="canvas">
                <div class="flower"></div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default HomePage;
