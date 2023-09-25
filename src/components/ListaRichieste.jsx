import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsFillInfoSquareFill } from "react-icons/bs";
const ListaRichieste = ({ url }) => {
  const navigate = useNavigate();
  const [richieste, setRichieste] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url.includes("undefined")) {
      richiesteFetch();
    }
  }, [pagina, url]);

  const richiesteFetch = async () => {
    setError("");
    setRichieste(null);
    setSpinner(true);
    const URL = url + "page=" + pagina;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(URL);
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setError("");
        setRichieste(dato);
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
      <div className="d-flex justify-content-between align-items-center my-4 px-4 border-bottom border-ng-variant">
        <p className="m-0  datoUser">Utente richiedente</p>
        <p className="text-center m-0 d-none d-md-block">
          <span className=" datoUser">Data inizio</span>
        </p>
        <p className="text-center m-0  d-none d-md-block">
          <span className=" datoUser">Data fine</span>
        </p>
        <p className="text-center m-0">
          <span className=" datoUser">Stato richiesta</span>
        </p>
      </div>
      {richieste !== null && !spinner && (
        <>
          {richieste?.content.map((richiesta) => (
            <div className="my-4 shadow-lg rounded-4 p-3 ">
              <div className="d-flex justify-content-between align-items-center ">
                <p
                  className="m-0 utenteRichiedente datoUser text-truncate"
                  onClick={() => navigate("/account/" + richiesta.utente.id)}
                >
                  {richiesta.utente.nome} {richiesta.utente.cognome}
                </p>
                <p className="text-center m-0  d-none d-md-block">
                  <span className=" datoUser">{richiesta?.daData}</span>
                </p>
                <p className="text-center m-0  d-none d-md-block">
                  <span className=" datoUser">{richiesta?.finoA}</span>
                </p>

                <p className="text-center m-0 ">
                  <span
                    className={` datoUser me-3 fw-bold ${
                      richiesta?.statoRichiesta === "in_attesa" &&
                      "text-warning"
                    } ${
                      richiesta?.statoRichiesta === "approvata" &&
                      "text-success"
                    } ${
                      richiesta?.statoRichiesta === "rifiutata" && "text-danger"
                    }`}
                  >
                    {richiesta?.statoRichiesta}
                  </span>
                  <Button
                    variant="outline-info"
                    className="text-center m-0  border-0"
                    onClick={() => navigate("/richiestaInfo/" + richiesta?.id)}
                  >
                    <BsFillInfoSquareFill />
                  </Button>
                </p>
              </div>
            </div>
          ))}
          {richieste !== null &&
            !spinner &&
            error === "" &&
            richieste?.content.length === 0 && (
              <p className="my-5 h1 fw-bold text-center">
                Non ci sono richieste di noleggio al momento
              </p>
            )}

          <Row className="justify-content-center mt-4 mb-5">
            <Col xs={6} sm={4} lg={2} className="d-flex">
              {!richieste?.first && (
                <Button
                  variant="outline-ng-variant"
                  onClick={() => setPagina(pagina - 1)}
                  className="me-4 flex-fill"
                  href="#"
                >
                  Precedente
                </Button>
              )}
            </Col>
            <Col xs={6} sm={4} lg={2} className="d-flex">
              {!richieste?.last && (
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
    </>
  );
};
export default ListaRichieste;
