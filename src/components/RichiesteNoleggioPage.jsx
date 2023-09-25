import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ListaRichieste from "./ListaRichieste";
import { useState } from "react";

const RichiesteNoleggioPage = () => {
  const [customUrl, setCustomUrl] = useState("");
  const [utenteEmail, setUtenteEmail] = useState("");

  const [daData, setDaData] = useState("");
  const [aData, setAData] = useState("");

  const componiUrl = () => {
    let url = "";

    if (utenteEmail !== "") {
      url += `emailUtenteRichiedente=${utenteEmail}&`;
    }
    if (daData !== "" && aData !== "") {
      url += `daData=${daData}&aData=${aData}&`;
    }
    if (daData !== "" && aData === "") {
      url += `daData=${daData}&`;
    }

    if (daData === "" && aData !== "") {
      url += `aData=${aData}&`;
    }
    return url;
  };

  const handleRicercaSubmit = () => {
    let url = componiUrl();
    setCustomUrl(url);
  };

  return (
    <Container>
      <Row className=" shadow border-top-0  p-3 bordoFiltro mb-5 justify-content-center">
        <Col xs={11} sm={6} md={4}>
          <span className="font-titoli fw-bold">Email utente:</span>
          <Form.Control
            type="email"
            placeholder="Email utente"
            value={utenteEmail}
            onChange={(e) => setUtenteEmail(e.target.value)}
          />
        </Col>
        <Col xs={11} sm={6} md={4} className="mt-3 mt-sm-0">
          <span className="font-titoli fw-bold ">Data inizio noleggio:</span>
          <Form.Control
            type="date"
            value={daData}
            onChange={(e) => setDaData(e.target.value)}
          />{" "}
        </Col>
        <Col xs={11} sm={12} md={3} className="mt-3 mt-md-0">
          <span className="font-titoli fw-bold ">Data fine noleggio:</span>
          <Form.Control
            type="date"
            value={aData}
            onChange={(e) => setAData(e.target.value)}
          />
        </Col>
        <Col
          xs={2}
          sm={1}
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            variant="ng-variant"
            className="mt-3 mt-md-0"
            onClick={() => handleRicercaSubmit()}
          >
            Cerca
          </Button>
        </Col>
      </Row>

      <p className="my-3 text-center h2 fw-bold font-titoli">
        {customUrl === ""
          ? "Tutte le richieste di noleggio"
          : "Risultati della ricerca"}
      </p>
      <ListaRichieste url={"http://localhost:3001/noleggio?" + customUrl} />
    </Container>
  );
};
export default RichiesteNoleggioPage;
