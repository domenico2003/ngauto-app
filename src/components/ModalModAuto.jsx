import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";
import { useSelector } from "react-redux";
import ModaleMarche from "./ModaleMarche";
import ModaleModelli from "./ModaleModelli";

const ModalModAuto = (props) => {
  const [errore, setErrore] = useState("");
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalMarche, setModalMarche] = useState(false);
  const [modalModelli, setModalModelli] = useState(false);
  //datiDB
  let alimentazioniTrovate = useSelector((state) => state.auto.alimentazioni);
  let cambiTrovati = useSelector((state) => state.auto.cambi);
  const [modelliTrovati, setModelliTrovati] = useState(null);
  let marcheTrovate = useSelector((state) => state.auto.marche);

  //dati
  const [condizione, setCondizione] = useState("--Seleziona--");
  const [prezzo, setPrezzo] = useState(0);
  const [alimentazione, setAlimentazione] = useState("--Alimentazione--");
  const [cambio, setCambio] = useState("--Cambio--");
  const [colore, setColore] = useState("");
  const [km, setKm] = useState(0);
  const [carrozzeria, setCarrozzeria] = useState("");
  const [cilindrata, setCilindrata] = useState(0);
  const [potenza_cv, setPotenza_cv] = useState(0);
  const [anno, setAnno] = useState(0);
  const [note, setNote] = useState("");
  const [stato, setStato] = useState("--Seleziona--");
  const [marca, setMarca] = useState("--Marca--");
  const [modello, setModello] = useState("--Modello--");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marca]);

  const addImmagineFetch = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      condizione !== "--Seleziona--" &&
      modello !== "--Modello--" &&
      stato !== "--Seleziona--" &&
      prezzo > 0 &&
      prezzo !== null &&
      prezzo !== "" &&
      anno > 0 &&
      anno !== null &&
      anno !== "" &&
      anno > 1900 &&
      note !== "" &&
      km > 0 &&
      km !== null &&
      km !== "" &&
      cilindrata > 0 &&
      cilindrata !== null &&
      cilindrata !== "" &&
      potenza_cv > 0 &&
      potenza_cv !== null &&
      potenza_cv !== "" &&
      alimentazione !== "--Alimentazione--" &&
      cambio !== "--Cambio--" &&
      colore !== "" &&
      carrozzeria !== ""
    ) {
      setErrore("");
      const URL = `http://localhost:3001/automobili/${props.auto.id}`;
      const headers = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipoAlimentazione: alimentazione,
          tipoCambio: cambio,
          stato: stato,
          condizione: condizione,
          colore: colore,
          km: km,
          anno: anno,
          carrozzeria: carrozzeria,
          nomeModello: modello,
          cilindrata: cilindrata,
          potenza_cv: potenza_cv,
          prezzo: prezzo,
          note: note,
        }),
      };

      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          setTimeout(() => {
            setSuccess(true);
          }, 800);

          setTimeout(() => {
            setSuccess(false);
            props.detailsautofetch();

            props.onHide();
          }, 2300);
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrore("Compila in modo corretto tutti i campi!");
    }
  };

  useEffect(() => {
    setMarca(props.auto.marca.tipo);
    setAlimentazione(props.auto.alimentazione.tipo);
    setCambio(props.auto.cambio.tipo);
    setStato(props.auto.stato);
    setCondizione(props.auto.condizione);
    setColore(props.auto.colore);
    setKm(props.auto.km);
    setAnno(props.auto.anno);
    setCarrozzeria(props.auto.carrozzeria);
    setModello(props.auto.modello.tipo);
    setCilindrata(props.auto.cilindrata);
    setPotenza_cv(props.auto.potenza_cv);
    setPrezzo(props.auto.prezzo);
    setNote(props.auto.note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="border-quaternario "
      >
        <Modal.Header
          closeButton
          className="bg-secondario text-bianco border-ng-variant"
        >
          <div className="flex-fill">
            <p
              id="contained-modal-title-vcenter"
              className=" m-0 text-center logo-no-nav h2 fw-bold font-titoli"
            >
              Modifica auto
            </p>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={addImmagineFetch}>
            <Form.Group
              className="mb-3 d-flex flex-column align-items-center"
              controlId="formBasicUsername"
            >
              <Form.Label className="font-titoli h4  fw-bold titoloPagina">
                Inserisci la condizione della macchina:
              </Form.Label>

              <Form.Select
                aria-label="stato"
                value={condizione}
                onChange={(e) => setCondizione(e.target.value)}
                className={` mb-2 fw-bold selectForm`}
              >
                <option className="fw-bold h6">--Seleziona--</option>
                <option className="fw-bold h6" value="nuova">
                  Nuova
                </option>
                <option className="fw-bold h6" value="usata">
                  Usata
                </option>
                <option className="fw-bold h6" value="noleggio">
                  Per noleggio
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex flex-column align-items-center"
              controlId="formBasicUsername"
            >
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci il prezzo{" "}
                {condizione !== "noleggio"
                  ? " dell'auto"
                  : " per singolo giorno"}
              </Form.Label>

              <div className="d-flex align-items-center">
                <Form.Control
                  type="number"
                  value={prezzo}
                  onChange={(e) => setPrezzo(e.target.value)}
                  className={` fw-bold selectForm me-2 input-numerico`}
                  required
                />{" "}
                <span className="fw-bold h3 font-titoli mb-0">
                  {condizione !== "noleggio" ? " €" : " €/24h"}
                </span>
              </div>

              <Form.Control.Feedback type="invalid">
                Inserisci il prezzo{" "}
                {condizione !== "noleggio"
                  ? " dell'auto"
                  : " per singolo giorno"}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex flex-column align-items-center"
              controlId="formBasicUsername"
            >
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci una nota
              </Form.Label>
              <Form.Control
                as="textarea"
                value={note}
                maxLength={1500}
                rows={3}
                placeholder="Aggiungi più informazioni"
                onChange={(e) => setNote(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
                required
              />{" "}
              <Form.Control.Feedback type="invalid">
                Inserisci una nota
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex flex-column titoloPagina align-items-center"
              controlId="formBasicUsername"
            >
              <Form.Label className="font-titoli h4  fw-bold">
                Inserisci tipo di alimentazione
              </Form.Label>
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
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci tipo di cambio
              </Form.Label>
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
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci cilindrata
              </Form.Label>
              <Form.Control
                type="number"
                value={cilindrata}
                onChange={(e) => setCilindrata(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
                required
              />{" "}
              <Form.Control.Feedback type="invalid">
                Inserisci cilindrata
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci anno immatricolazione
              </Form.Label>
              <Form.Control
                type="number"
                value={anno}
                onChange={(e) => setAnno(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci anno immatricolazione
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci potenza in CV
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="number"
                  value={potenza_cv}
                  onChange={(e) => setPotenza_cv(e.target.value)}
                  className={` fw-bold selectForm me-2 input-numerico`}
                  required
                />
                <span className="fw-bold h3 font-titoli mb-0">CV</span>
              </div>
              <Form.Control.Feedback type="invalid">
                Inserisci potenza in CV
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci KM
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="number"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className={` fw-bold selectForm me-2 input-numerico`}
                  required
                />
                <span className="fw-bold h3 font-titoli mb-0">KM</span>
              </div>
              <Form.Control.Feedback type="invalid">
                Inserisci KM
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci colore
              </Form.Label>
              <Form.Control
                type="text"
                maxLength={255}
                placeholder="Colore"
                value={colore}
                onChange={(e) => setColore(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci colore
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci lo stato dell'auto
              </Form.Label>
              <Form.Select
                aria-label="stato"
                value={stato}
                onChange={(e) => setStato(e.target.value)}
                className={` mb-2 fw-bold selectForm`}
              >
                <option className="fw-bold h6">--Seleziona--</option>
                <option className="fw-bold h6" value="non_disponibile">
                  Non disponibile
                </option>
                {condizione !== "noleggio" ? (
                  <>
                    <option className="fw-bold h6" value="in_vendita">
                      In vendita
                    </option>
                    <option className="fw-bold h6" value="venduta">
                      venduta
                    </option>
                  </>
                ) : (
                  <>
                    <option className="fw-bold h6" value="da_noleggiare">
                      Da noleggiare
                    </option>
                    <option className="fw-bold h6" value="noleggiata">
                      Noleggiata
                    </option>
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci carrozzeria
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Carrozzeria"
                maxLength={255}
                value={carrozzeria}
                onChange={(e) => setCarrozzeria(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci carrozzeria
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-3 d-flex flex-column align-items-center">
              <Form.Label className="font-titoli h4 titoloPagina fw-bold">
                Inserisci marca e modello
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Select
                  aria-label="stato"
                  value={marca}
                  onChange={(e) => {
                    setMarca(e.target.value);
                    setModello("--Modello--");
                  }}
                  className={` mb-2 fw-bold selectForm`}
                >
                  <option className="fw-bold h6">--Marca--</option>
                  {marcheTrovate !== null &&
                    marcheTrovate.map((singolaMarca) => (
                      <option className="fw-bold h6">
                        {singolaMarca.tipo}
                      </option>
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
                      <option className="fw-bold h6">
                        {singoloModello.tipo}
                      </option>
                    ))}
                </Form.Select>
              </div>
              <p className="text-center  fw-bold">
                Non hai la marca o il modello richiesto? Aggiungilo
              </p>
              <div className="d-flex align-items-center justify-content-around">
                <Button
                  variant="outline-ng-variant"
                  onClick={() => setModalMarche(true)}
                >
                  Aggiungi Marca
                </Button>
                <Button
                  variant="outline-ng-variant"
                  onClick={() => setModalModelli(true)}
                >
                  Aggiungi Modello
                </Button>
              </div>
            </Form.Group>

            {errore !== "" && (
              <p className="text-danger text-center mt-3">{errore}</p>
            )}
            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="success">
                Aggiorna
              </Button>
              <Button
                variant="outline-ng-variant"
                type="button"
                onClick={props.onHide}
              >
                Chiudi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {success && (
        <ModalSuccessAction
          text={"Auto modificata con successo"}
          show={success}
        />
      )}
      {modalMarche && (
        <ModaleMarche show={modalMarche} onHide={() => setModalMarche(false)} />
      )}
      {modalModelli && (
        <ModaleModelli
          show={modalModelli}
          onHide={() => setModalModelli(false)}
        />
      )}
    </>
  );
};
export default ModalModAuto;
