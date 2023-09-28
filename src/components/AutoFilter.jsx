import { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import ListaAuto from "./ListaAuto";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BsInfoLg } from "react-icons/bs";

const AutoFilter = ({ urlBase }) => {
  const location = useLocation();
  const [totaleElementi, setTotaleElementi] = useState(0);

  const [urlCompleto, setUrlCompleto] = useState("");
  let alimentazioniTrovate = useSelector((state) => state.auto.alimentazioni);
  let cambiTrovati = useSelector((state) => state.auto.cambi);
  let marcheTrovate = useSelector((state) => state.auto.marche);

  //dati per dropdown

  const [modelliTrovati, setModelliTrovati] = useState(null);

  //filtri
  const [colore, setColore] = useState("");
  const [alimentazione, setAlimentazione] = useState("--Alimentazione--");
  const [cambio, setCambio] = useState("--Cambio--");
  const [marca, setMarca] = useState("--Marca--");
  const [modello, setModello] = useState("--Modello--");
  const [prezzoMin, setPrezzoMin] = useState("--Prezzo minimo--");
  const [prezzoMax, setPrezzoMax] = useState("--Prezzo massimo--");

  // lavorocon dati per filtri
  const modelloFetch = async () => {
    const URL = "http://localhost:3001/automobili/all/modelli/" + marca;
    const headers = {};
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setModelliTrovati(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (marca !== "--Marca--") {
      modelloFetch();
    } else {
      setModelliTrovati(null);
    }
  }, [marca]);
  //costruisco l'URL
  useEffect(() => {
    setUrlCompleto(urlBase);
    setAlimentazione("--Alimentazione--");
    setCambio("--Cambio--");
    setMarca("--Marca--");
    setModello("--Modello--");
    setPrezzoMin("--Prezzo minimo--");
    setPrezzoMax("--Prezzo massimo--");
  }, []);

  const componiUrl = () => {
    let url = urlBase;

    if (colore !== "") {
      url += `&colore=${colore}`;
    }

    if (alimentazione !== "--Alimentazione--") {
      url += `&tipoAlimentazione=${alimentazione}`;
    }
    if (cambio !== "--Cambio--") {
      url += `&tipoCambio=${cambio}`;
    }
    if (marca !== "--Marca--") {
      url += `&nomeMarca=${marca}`;
    }

    if (modello !== "--Modello--") {
      url += `&nomeModello=${modello}`;
    }
    if (
      prezzoMin !== "--Prezzo minimo--" &&
      prezzoMax !== "--Prezzo massimo--"
    ) {
      url += `&prezzoMinimo=${prezzoMin}&prezzoMassimo=${prezzoMax}`;
    }
    if (
      prezzoMin === "--Prezzo minimo--" &&
      prezzoMax !== "--Prezzo massimo--"
    ) {
      url += `&prezzoMassimo=${prezzoMax}`;
    }
    if (
      prezzoMin !== "--Prezzo minimo--" &&
      prezzoMax === "--Prezzo massimo--"
    ) {
      url += `&prezzoMinimo=${prezzoMin}`;
    }

    return url;
  };

  const handleClickCerca = () => {
    let customUrl = componiUrl();
    setUrlCompleto(customUrl);
  };
  return (
    <Row className="justify-content-center mt-4">
      <Col xs={11} md={3}>
        <p className="h2 fw-bold m-0">Ricerca</p>
        <hr className="border-ng-variant opacity-75 mt-0" />
        <div className="d-flex flex-column align-items-center">
          <Form.Control
            type="text"
            placeholder="Colore auto"
            className="font-titoli fw-bold mb-2 selectForm"
            value={colore}
            onChange={(e) => setColore(e.target.value)}
          />
          <Form.Select
            aria-label="stato"
            value={alimentazione}
            onChange={(e) => setAlimentazione(e.target.value)}
            className={` fw-bold h5 mb-2 selectForm`}
          >
            <option className="fw-bold h6">--Alimentazione--</option>
            {alimentazioniTrovate !== null &&
              alimentazioniTrovate.map((singolaAlimentazione) => (
                <option className="fw-bold h6">
                  {singolaAlimentazione.tipo}
                </option>
              ))}
          </Form.Select>
          <Form.Select
            aria-label="stato"
            value={cambio}
            onChange={(e) => setCambio(e.target.value)}
            className={` mb-2 fw-bold selectForm`}
          >
            <option className="fw-bold h6">--Cambio--</option>
            {cambiTrovati !== null &&
              cambiTrovati.map((singoloCambio) => (
                <option className="fw-bold h6">{singoloCambio.tipo}</option>
              ))}
          </Form.Select>
          <Form.Select
            aria-label="stato"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className={` mb-2 fw-bold selectForm`}
          >
            <option className="fw-bold h6">--Marca--</option>
            {marcheTrovate !== null &&
              marcheTrovate.map((singolaMarca) => (
                <option className="fw-bold h6">{singolaMarca.tipo}</option>
              ))}
          </Form.Select>
          <Form.Select
            aria-label="stato"
            value={modello}
            onChange={(e) => setModello(e.target.value)}
            className={` mb-2 fw-bold selectForm`}
            disabled={modelliTrovati === null}
          >
            <option className="fw-bold h6">--Modello--</option>
            {modelliTrovati !== null &&
              modelliTrovati.map((singoloModello) => (
                <option className="fw-bold h6">{singoloModello.tipo}</option>
              ))}
          </Form.Select>
          {location.pathname !== "/aNoleggio" && (
            <>
              <Form.Select
                aria-label="stato"
                value={prezzoMin}
                onChange={(e) => setPrezzoMin(e.target.value)}
                className={` mb-2 fw-bold selectForm`}
              >
                <option className="fw-bold h6">--Prezzo minimo--</option>
                <option className="fw-bold h6" value={5000}>
                  5.000
                </option>
                <option className="fw-bold h6" value={10000}>
                  10.000
                </option>
                <option className="fw-bold h6" value={15000}>
                  15.000
                </option>
                <option className="fw-bold h6" value={20000}>
                  20.000
                </option>
                <option className="fw-bold h6" value={25000}>
                  25.000
                </option>
                <option className="fw-bold h6" value={30000}>
                  30.000
                </option>
                <option className="fw-bold h6" value={35000}>
                  35.000
                </option>
                <option className="fw-bold h6" value={40000}>
                  40.000
                </option>
                <option className="fw-bold h6" value={45000}>
                  45.000
                </option>
                <option className="fw-bold h6" value={50000}>
                  50.000
                </option>
                <option className="fw-bold h6" value={55000}>
                  55.000
                </option>
                <option className="fw-bold h6" value={60000}>
                  60.000
                </option>
                <option className="fw-bold h6" value={65000}>
                  65.000
                </option>
                <option className="fw-bold h6" value={70000}>
                  70.000
                </option>
                <option className="fw-bold h6" value={75000}>
                  75.000
                </option>
                <option className="fw-bold h6" value={80000}>
                  80.000
                </option>
                <option className="fw-bold h6" value={85000}>
                  85.000
                </option>
                <option className="fw-bold h6" value={90000}>
                  90.000
                </option>
                <option className="fw-bold h6" value={95000}>
                  95.000
                </option>
                <option className="fw-bold h6" value={100000}>
                  100.000
                </option>
              </Form.Select>
              <Form.Select
                aria-label="stato"
                value={prezzoMax}
                onChange={(e) => setPrezzoMax(e.target.value)}
                className={` mb-2 fw-bold selectForm`}
              >
                <option className="fw-bold h6">--Prezzo massimo--</option>
                <option className="fw-bold h6" value={5000}>
                  5.000
                </option>
                <option className="fw-bold h6" value={10000}>
                  10.000
                </option>
                <option className="fw-bold h6" value={15000}>
                  15.000
                </option>
                <option className="fw-bold h6" value={20000}>
                  20.000
                </option>
                <option className="fw-bold h6" value={25000}>
                  25.000
                </option>
                <option className="fw-bold h6" value={30000}>
                  30.000
                </option>
                <option className="fw-bold h6" value={35000}>
                  35.000
                </option>
                <option className="fw-bold h6" value={40000}>
                  40.000
                </option>
                <option className="fw-bold h6" value={45000}>
                  45.000
                </option>
                <option className="fw-bold h6" value={50000}>
                  50.000
                </option>
                <option className="fw-bold h6" value={55000}>
                  55.000
                </option>
                <option className="fw-bold h6" value={60000}>
                  60.000
                </option>
                <option className="fw-bold h6" value={65000}>
                  65.000
                </option>
                <option className="fw-bold h6" value={70000}>
                  70.000
                </option>
                <option className="fw-bold h6" value={75000}>
                  75.000
                </option>
                <option className="fw-bold h6" value={80000}>
                  80.000
                </option>
                <option className="fw-bold h6" value={85000}>
                  85.000
                </option>
                <option className="fw-bold h6" value={90000}>
                  90.000
                </option>
                <option className="fw-bold h6" value={95000}>
                  95.000
                </option>
                <option className="fw-bold h6" value={100000}>
                  100.000
                </option>
              </Form.Select>
            </>
          )}
          <Button
            variant="outline-success"
            className="mb-4"
            onClick={() => handleClickCerca()}
          >
            Cerca
          </Button>
        </div>
      </Col>
      <Col xs={11} md={9}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="h2 fw-bold m-0">Vetrina ({totaleElementi})</p>

          <p className="text-center text-info text-decoration-underline mb-0">
            <BsInfoLg /> cliccare sulle auto per avere maggiori info{" "}
            <BsInfoLg />
          </p>
        </div>
        <hr className="border-ng-variant opacity-75 mt-0" />
        <ListaAuto
          url={urlCompleto}
          total={(numero) => setTotaleElementi(numero)}
        />
      </Col>
    </Row>
  );
};
export default AutoFilter;
