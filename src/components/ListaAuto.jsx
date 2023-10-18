import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ModalEffettuaRichiesta from "./ModalEffettuaRichiesta";

const ListaAuto = ({ url, total }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let profileMe = useSelector((state) => state.profilo.me);
  const [effettuaRichiestaModale, setEffettuaRichiestaModale] = useState(false);

  const [auto, setAuto] = useState(null);
  const [autoSelected, setAutoSelected] = useState(null);

  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url.includes("undefined")) {
      autoFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, url]);
  useEffect(() => {
    setPagina(0);
  }, [url]);
  const autoFetch = async () => {
    setError("");
    setAuto(null);
    setSpinner(true);
    const URL = url + `&page=${pagina}`;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setError("");
        setAuto(dato);
        total(dato.totalElements);
      } else {
        let dato = await risposta.json();
        setError(dato.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };
  return (
    <>
      {auto !== null && !spinner && (
        <>
          <Row xs={1} sm={1} md={2} lg={2} xl={3}>
            {auto?.content.map((singolaAuto) => (
              <Col>
                <Card
                  className={`${
                    location.pathname !== "/aNoleggio" && "rounded-4"
                  } shadow-lg mb-4 pointer card-auto-filtro`}
                >
                  <div onClick={() => navigate("/auto/" + singolaAuto?.id)}>
                    <Card.Img
                      variant="top"
                      className="img-auto "
                      src={singolaAuto?.copertina?.url}
                    />
                    <Card.Body className="p-0">
                      <Card.Title className="mb-0 d-flex justify-content-center align-items-center text-center text-ng-variant bg-black fw-bold border-bottom border-top border-3 h1 border-ng-variant p-2">
                        <p className="h5 fw-bold m-0">
                          {" "}
                          {singolaAuto?.marca?.tipo}{" "}
                          {singolaAuto?.modello?.tipo}
                        </p>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {singolaAuto?.note}
                            </Tooltip>
                          }
                        >
                          <button className="btn border-0 py-0">
                            <BsFillInfoSquareFill className="h5 text-info m-0 " />
                          </button>
                        </OverlayTrigger>
                      </Card.Title>
                      <div
                        className={`${
                          location.pathname !== "/aNoleggio" && "rounded-4"
                        } text-center`}
                      >
                        <div className="p-2">
                          <div className="d-flex justify-content-around">
                            <span className="fw-bold  font-titoli">
                              Cambio:{" "}
                            </span>
                            <span className="h5 datoUser">
                              {singolaAuto?.cambio?.tipo}
                            </span>
                          </div>

                          <div className="d-flex justify-content-around">
                            <span className="fw-bold  font-titoli">
                              Alimentazione:{" "}
                            </span>
                            <span className="h5 datoUser">
                              {singolaAuto?.alimentazione?.tipo}
                            </span>
                          </div>

                          <span className="h5 datoUser">
                            {singolaAuto?.km} Km
                          </span>
                        </div>

                        <div className="border-top border-ng-variant border-2 pt-1 text-ng-variant">
                          {" "}
                          <span className="h4 fw-bold font-titoli">
                            {singolaAuto?.prezzo}
                            {location.pathname === "/aNoleggio"
                              ? " €/24"
                              : " €"}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                  {location.pathname === "/aNoleggio" && profileMe !== null && (
                    <Button
                      variant="success"
                      className="w-100 rounded-0 border-0"
                      onClick={() => {
                        setEffettuaRichiestaModale(true);
                        setAutoSelected(singolaAuto);
                      }}
                    >
                      Noleggia
                    </Button>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
          {auto !== null &&
            !spinner &&
            error === "" &&
            auto?.content.length === 0 && (
              <p className="my-5 h1 fw-bold text-center">
                La ricerca non ha prodotto nessun risultato
              </p>
            )}

          <Row className="justify-content-center mt-4 mb-5">
            <Col xs={5} sm={4} lg={2} className="d-flex">
              {!auto?.first && (
                <Button
                  variant="outline-ng-variant"
                  onClick={() => setPagina(pagina - 1)}
                  className=" flex-fill"
                  href="#"
                >
                  Precedente
                </Button>
              )}
            </Col>
            <Col
              xs={2}
              className="d-flex align-items-center justify-content-center"
            >
              {auto !== null &&
                !spinner &&
                error === "" &&
                auto?.content.length !== 0 && (
                  <span className="text-center fw-bold h3 font-titoli m-0 ">
                    {" "}
                    {auto?.number + 1}/{auto?.totalPages}
                  </span>
                )}
            </Col>
            <Col xs={5} sm={4} lg={2} className="d-flex">
              {!auto?.last && (
                <Button
                  variant="outline-ng-variant "
                  onClick={() => setPagina(pagina + 1)}
                  className="flex-fill"
                  href="#"
                >
                  Successiva
                </Button>
              )}
            </Col>
          </Row>
        </>
      )}
      {error !== "" && (
        <p className="my-5 h3 fw-bold text-center text-danger">{error}</p>
      )}
      {spinner && error === "" && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="ng-variant" />
        </div>
      )}
      {effettuaRichiestaModale && (
        <ModalEffettuaRichiesta
          show={effettuaRichiestaModale}
          onHide={() => setEffettuaRichiestaModale(false)}
          auto={autoSelected}
        />
      )}
    </>
  );
};
export default ListaAuto;
