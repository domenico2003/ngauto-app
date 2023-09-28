import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  BsFillInfoSquareFill,
  BsPencilSquare,
  BsFillTrashFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import RispRichiesta from "./RispRichiesta";
import ModalModificaRichiesta from "./ModalModificaRichiesta";
import EliminaRichiesta from "./EliminaRichiesta";
const RichiestaDetails = () => {
  const params = useParams();
  const navigare = useNavigate();
  let profile = useSelector((state) => state.profilo.me);
  const [richiesta, setRichiesta] = useState(null);
  const [modifica, setModifica] = useState(false);
  const [elimina, setElimina] = useState(false);
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    DetailsRichiestaFetch();
  }, [params.id]);

  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
      {richiesta?.autoRichiesta?.note}
    </Tooltip>
  );

  const DetailsRichiestaFetch = async () => {
    const URL = "http://localhost:3001/noleggio/" + params.id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        setRichiesta(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <p className="font-titoli text-center fw-bold h1 my-4">
        Dettaglio Richiesta
      </p>
      <Row xs={1} md={2} className="justify-content-around">
        <Col xs={10} md={5}>
          <p className=" h3 fw-bold text-center font-titoli">Auto Richiesta</p>
          <Card
            className="shadow-lg rounded-4 mb-4 pointer"
            onClick={() => navigare("/auto/" + richiesta?.autoRichiesta?.id)}
          >
            <Card.Img
              variant="top"
              className="img-auto"
              src={richiesta?.autoRichiesta?.copertina?.url}
            />
            <Card.Body className="p-0">
              <Card.Title className=" d-flex justify-content-center align-items-center text-center text-ng-variant bg-black fw-bold border-bottom border-top border-3 h1 border-ng-variant p-2">
                <p className="h4 fw-bold m-0">
                  {" "}
                  {richiesta?.autoRichiesta?.marca?.tipo}{" "}
                  {richiesta?.autoRichiesta?.modello?.tipo}
                </p>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <button className="btn border-0">
                    <BsFillInfoSquareFill className="h5 text-info m-0" />
                  </button>
                </OverlayTrigger>
              </Card.Title>
              <ListGroup variant="flush" className="rounded-4 text-center">
                <ListGroup.Item>
                  <span className="fw-bold h5 font-titoli">Cambio: </span>
                  <span className="h5 datoUser">
                    {richiesta?.autoRichiesta?.cambio?.tipo}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold h5 font-titoli">
                    Alimentazione:{" "}
                  </span>
                  <span className="h5 datoUser">
                    {richiesta?.autoRichiesta?.alimentazione?.tipo}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="fw-bold h5 font-titoli">Km: </span>
                  <span className="h5 datoUser">
                    {richiesta?.autoRichiesta?.km}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="fw-bold h5 font-titoli">Colore: </span>
                  <span className="h5 datoUser">
                    {richiesta?.autoRichiesta?.colore}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="fw-bold h5 font-titoli">Cilindrata: </span>
                  <span className="h5 datoUser">
                    {richiesta?.autoRichiesta?.cilindrata}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-black text-ng-variant">
                  {" "}
                  <span className="h4 fw-bold font-titoli">
                    {richiesta?.autoRichiesta?.prezzo}
                    {" €/24h"}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={10} md={5} className="mb-4">
          <p className=" h3 fw-bold text-center font-titoli">
            Utente richiedente
          </p>
          <Card
            className="shadow-lg rounded-4 mb-4 pointer"
            onClick={() => navigare("/account/" + richiesta?.utente?.id)}
          >
            <Card.Body className="p-0 rounded-4">
              <Card.Title className=" d-flex  justify-content-center align-items-center text-center text-ng-variant bg-black fw-bold border-bottom border-top border-3 h1 border-ng-variant p-2">
                <p className="h4 fw-bold m-0">
                  {" "}
                  {richiesta?.utente?.nome} {richiesta?.utente?.cognome}
                </p>
              </Card.Title>
              <ListGroup variant="flush" className="rounded-4 text-center">
                <ListGroup.Item>
                  <span className="fw-bold h5 font-titoli">Email: </span>
                  <span className="h5 datoUser">
                    {richiesta?.utente?.email}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold h5 font-titoli">Telefono: </span>
                  <span className="h5 datoUser">
                    {richiesta?.utente?.telefono}{" "}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className="fw-bold h5 font-titoli">Username: </span>
                  <span className="h5 datoUser">
                    {richiesta?.utente?.username}{" "}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <div className="d-flex flex-column flex-md-row align-items-center justify-content-center mt-4">
            <p
              className={`d-block h3 fw-bold mb-0 text-center font-titoli w-100 ${
                (profile?.ruolo === "ADMIN" ||
                  richiesta?.utente?.id === profile?.id) &&
                "ms-md-5 ps-md-5"
              }`}
            >
              Richiesta
            </p>
            {(profile?.ruolo === "ADMIN" ||
              richiesta?.utente?.id === profile?.id) && (
              <div className="d-flex align-items-center">
                <button
                  className="flex-shrink-1 py-0 me-1 btn border-0"
                  onClick={() => setModifica(true)}
                >
                  <BsPencilSquare className="h5 fw-bold clicked m-0 text-info" />
                </button>
                <button
                  className="flex-shrink-1 py-0 btn border-0"
                  onClick={() => setElimina(true)}
                >
                  <BsFillTrashFill className="h5 fw-bold clicked m-0 text-danger" />
                </button>
              </div>
            )}
          </div>

          <div className="text-center mb-3">
            <span className="fw-bold h5 font-titoli">Stato: </span>

            <span
              className={`h5 fw-bold 
              ${richiesta?.statoRichiesta === "in_attesa" && "text-warning"} 
              ${richiesta?.statoRichiesta === "rifiutata" && "text-danger"}
              ${richiesta?.statoRichiesta === "approvata" && "text-success"}`}
            >
              {richiesta?.statoRichiesta}
            </span>
          </div>
          <div className="d-flex justify-content-between text-center align-items-center">
            <div>
              <span className="fw-bold h5 font-titoli">Dal giorno: </span>
              <span className=" h5 datoUser">
                {formatDate(richiesta?.daData)}
              </span>
            </div>
            <div>
              <span className="fw-bold h5 font-titoli">Al giorno: </span>
              <span className=" h5 datoUser">
                {formatDate(richiesta?.finoA)}
              </span>
            </div>
          </div>
          {richiesta !== null && richiesta?.statoRichiesta !== "in_attesa" && (
            <Row
              xs={1}
              sm={2}
              md={1}
              xl={2}
              className=" justify-content-around mt-3 align-items-top"
            >
              <Col className="text-center mb-4">
                <p className=" m-0 fw-bold h5 font-titoli">Note risposta: </p>
                <p className="m-0 h5  border border-ng-variant  rounded-4 p-3">
                  {richiesta?.noteRisposta !== null
                    ? richiesta?.noteRisposta
                    : "Note non aggiunte"}
                </p>
              </Col>
              <Col className="text-center mb-4 ">
                <p className=" m-0 fw-bold h5 font-titoli">
                  Contatto consigliato:{" "}
                </p>
                <p className="m-0 h5   border border-ng-variant  rounded-4 p-3">
                  {richiesta?.contattoConsigliato !== null
                    ? richiesta?.contattoConsigliato
                    : "Contatto non aggiunto"}
                </p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      {profile?.ruolo === "ADMIN" && (
        <>
          {" "}
          <hr className=" opacity-100  border-ng-variant " />
          <RispRichiesta
            richiesta={richiesta}
            fetcRichiesta={() => DetailsRichiestaFetch()}
          />
        </>
      )}

      {modifica && (
        <ModalModificaRichiesta
          show={modifica}
          onHide={() => setModifica(false)}
          richiesta={richiesta}
          richiestaFetch={() => DetailsRichiestaFetch()}
        />
      )}

      {elimina && (
        <EliminaRichiesta
          eliminaModale={elimina}
          richiestaId={richiesta?.id}
          setEliminaModale={setElimina}
        />
      )}
    </Container>
  );
};
export default RichiestaDetails;
