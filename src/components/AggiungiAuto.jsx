import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModaleMarche from "./ModaleMarche";
import ModaleModelli from "./ModaleModelli";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AggiungiAuto = () => {
  //datiDB
  let alimentazioniTrovate = useSelector((state) => state.auto.alimentazioni);
  let cambiTrovati = useSelector((state) => state.auto.cambi);
  const [modelliTrovati, setModelliTrovati] = useState(null);
  let marcheTrovate = useSelector((state) => state.auto.marche);
  //Modali
  const [modalMarche, setModalMarche] = useState(false);
  const [modalModelli, setModalModelli] = useState(false);

  // dati
  //0° pagina
  const [condizione, setCondizione] = useState("--Seleziona--");
  //1° pagina
  const [prezzo, setPrezzo] = useState(0);
  //2° pagina
  const [alimentazione, setAlimentazione] = useState("--Alimentazione--");
  const [cambio, setCambio] = useState("--Cambio--");
  const [colore, setColore] = useState("");
  const [km, setKm] = useState(0);
  const [carrozzeria, setCarrozzeria] = useState("");
  const [cilindrata, setCilindrata] = useState(0);
  const [potenza_cv, setPotenza_cv] = useState(0);
  const [anno, setAnno] = useState(0);
  // 3° pagina
  const [note, setNote] = useState("");
  //4° pagina
  const [stato, setStato] = useState("--Seleziona--");
  //5° pagina
  const [marca, setMarca] = useState("--Marca--");
  const [modello, setModello] = useState("--Modello--");
  //6° pagina
  const [copertina, setCopertina] = useState(null);

  // utility
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(0);
  const [errore, setErrore] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [idAut, setIdAut] = useState("");

  //fetch modelli
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

  const avanzaPagina = () => {
    if (pagina === 0) {
      if (condizione !== "--Seleziona--") {
        setErrore("");
        setPagina(pagina + 1);
      } else {
        setErrore("Inserisci una condizione");
      }
    }

    if (pagina === 5) {
      if (modello !== "--Modello--") {
        setErrore("");
        setPagina(pagina + 1);
      } else {
        setErrore("Inserisci un modello");
      }
    }
    if (pagina === 4) {
      if (stato !== "--Seleziona--") {
        setErrore("");
        setPagina(pagina + 1);
      } else {
        setErrore("Inserisci uno stato");
      }
    }
    if (pagina === 1) {
      if (prezzo > 0 && prezzo !== null && prezzo !== "") {
        setErrore("");
        setPagina(pagina + 1);
      } else {
        setErrore("Il prezzo non può essere uguale a 0");
      }
    }
    if (pagina === 3) {
      if (note !== "") {
        setErrore("");
        setPagina(pagina + 1);
      } else {
        setErrore("Inserisci una nota");
      }
    }
    if (pagina === 2) {
      if (
        km > 0 &&
        km !== null &&
        km !== "" &&
        anno > 0 &&
        anno !== null &&
        anno !== "" &&
        anno > 1900 &&
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
        setPagina(pagina + 1);
      } else {
        setErrore("Compila correttamente tutti i campi correttamente");
      }
    }
  };

  const addAutoFetch = async () => {
    if (copertina === null) {
      setErrore("Inserisci una copertina");
    } else {
      setSpinner(true);
      setErrore("");
      setPagina(pagina + 1);
      const URL = "http://localhost:3001/automobili";
      const headers = {
        method: "POST",
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
          carrozzeria: carrozzeria,
          nomeModello: modello,
          cilindrata: cilindrata,
          potenza_cv: potenza_cv,
          prezzo: prezzo,
          note: note,
          anno: anno,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          addImmagineFetch(dato.id);
          setIdAut(dato.id);
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
          setTimeout(() => {
            setSpinner(false);
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          setSpinner(false);
        }, 1500);
      }
    }
  };

  const addImmagineFetch = async (idAuto) => {
    const formData = new FormData();
    formData.append("file", copertina);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const URL = `http://localhost:3001/automobili/img?autoId=${idAuto}`;
    const headers = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        // "Content-Type":
        // "multipart/form-data; boundary=<calculated when request is sent>",
      },
      body: formData,
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        addCopertinaFetch(idAuto, dato.id);
      } else {
        let dato = await risposta.json();
        setErrore(dato.message);

        setTimeout(() => {
          setSpinner(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };

  const addCopertinaFetch = async (idAuto, idImg) => {
    const URL = `http://localhost:3001/automobili?idFoto=${idImg}&idAuto=${idAuto}`;
    const headers = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setSuccess(true);
      } else {
        let dato = await risposta.json();
        setErrore(dato.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinner(false);
      }, 1500);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Verifica se è stato selezionato un file
    if (file) {
      // Verifica la dimensione del file
      if (file.size <= 1024 * 1024 * 10) {
        // Il file è accettabile, puoi fare qualcosa con esso
        setCopertina(event.target.files[0]);
      } else {
        setErrore(
          "Il file è troppo grande. La dimensione massima consentita è 10 MB."
        );
        // Pulisci l'input del file
        event.target.value = null;
      }
    }
  };
  return (
    <Container className=" d-flex flex-column justify-content-center align-items-center mb-5">
      <div className="addAutoCont shadow-lg p-3 rounded-4 d-flex flex-column">
        <p className="text-center fw-bold h2 font-titoli titoloPagina mb-auto">
          Aggiungi Auto
        </p>
        {pagina === 0 && (
          <div>
            <p className="text-center  fw-bold">
              Prima di tutto scegli la condizione della macchina
            </p>
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
          </div>
        )}

        {pagina === 1 && (
          <div>
            <p className="text-center  fw-bold">
              Inserisci il prezzo{" "}
              {condizione !== "noleggio" ? " dell'auto" : " per singolo giorno"}
            </p>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                value={prezzo}
                onChange={(e) => setPrezzo(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
              />{" "}
              <span className="fw-bold h3 font-titoli mb-0">
                {condizione !== "noleggio" ? " €" : " €/24h"}
              </span>
            </div>
          </div>
        )}
        {pagina === 6 && (
          <div className="d-flex flex-column align-items-center align-items-center">
            <p className="text-center  fw-bold">
              Inserisci l'immaggine di copertina
            </p>

            <div className="custom-file-input">
              <Form.Control
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                className={` fw-bold selectForm me-2 input-numerico`}
              />
              <div className="file-input-label">
                <AiOutlinePlus className="text-black" />
              </div>
            </div>

            <Col className="my-3">
              {copertina && (
                <div className="selected-photo-preview">
                  <img
                    src={URL.createObjectURL(copertina)}
                    alt="Selected"
                    className="img-fluid"
                  />
                </div>
              )}
            </Col>
            {copertina !== null && (
              <Button
                variant="outline-danger mb-3"
                onClick={() => setCopertina(null)}
              >
                Cancella Immaggine
              </Button>
            )}
          </div>
        )}
        {pagina === 3 && (
          <div>
            <p className="text-center  fw-bold">Inserisci una nota!</p>
            <Form.Control
              as="textarea"
              value={note}
              maxLength={1500}
              rows={3}
              placeholder="Aggiungi più informazioni"
              onChange={(e) => setNote(e.target.value)}
              className={` fw-bold selectForm me-2 input-numerico`}
            />{" "}
          </div>
        )}
        {pagina === 2 && (
          <div className="mb-3">
            <p className="text-center h5 fw-bold mt-2">Inserisci dati Auto</p>
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
            <p className="fw-bold mb-0 h5 mt-3">Cilindrata</p>
            <Form.Control
              type="number"
              value={cilindrata}
              onChange={(e) => setCilindrata(e.target.value)}
              className={` fw-bold selectForm me-2 input-numerico`}
            />{" "}
            <p className="fw-bold mb-0 h5 mt-3">Anno</p>
            <Form.Control
              type="number"
              value={anno}
              onChange={(e) => setAnno(e.target.value)}
              className={` fw-bold selectForm me-2 input-numerico`}
            />{" "}
            <p className="fw-bold mb-0 h5 mt-3">Inserisci potenza in CV</p>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                value={potenza_cv}
                onChange={(e) => setPotenza_cv(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
              />
              <span className="fw-bold h3 font-titoli mb-0">CV</span>
            </div>
            <p className="fw-bold mb-0 h5 mt-3">Inserisci Km</p>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                className={` fw-bold selectForm me-2 input-numerico`}
              />
              <span className="fw-bold h3 font-titoli mb-0">KM</span>
            </div>
            <p className="fw-bold mb-0 h5 mt-3">Inserisci colore</p>
            <Form.Control
              type="text"
              maxLength={255}
              placeholder="Colore"
              value={colore}
              onChange={(e) => setColore(e.target.value)}
              className={` fw-bold selectForm me-2 input-numerico`}
            />
            <p className="fw-bold mb-0 h5 mt-3">Inserisci carrozzeria</p>
            <Form.Control
              type="text"
              placeholder="Carrozzeria"
              maxLength={255}
              value={carrozzeria}
              onChange={(e) => setCarrozzeria(e.target.value)}
              className={` fw-bold selectForm me-2 input-numerico`}
            />
          </div>
        )}

        {pagina === 4 && (
          <div>
            <p className="text-center  fw-bold">Inserisci lo stato dell'Auto</p>
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
          </div>
        )}

        {pagina === 5 && (
          <div>
            <p className="text-center  fw-bold">Inserisci marca e modello</p>
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
          </div>
        )}

        {pagina === 7 && (
          <>
            {spinner && errore === "" && (
              <div className="d-flex justify-content-center mt-5 mb-auto">
                <Spinner animation="grow" variant="ng-variant" />
              </div>
            )}
            {!spinner && errore === "" && success && (
              <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-auto">
                <span className="text-success success h4 m-0 mb-4 fw-bold font-titoli">
                  Auto salvata con successo!
                </span>
                <Button
                  variant="outline-success"
                  onClick={() => navigate("/auto/" + idAut)}
                >
                  Visualizza auto
                </Button>
              </div>
            )}
          </>
        )}
        {errore !== "" && (
          <p className="text-center text-danger fw-bold ">{errore}</p>
        )}
        {pagina < 7 && (
          <Row className="mt-auto">
            <Col xs={4} sm={3}>
              {pagina > 0 && (
                <Button
                  variant="ng-variant"
                  onClick={() => {
                    setPagina(pagina - 1);
                    setErrore("");
                  }}
                >
                  Indietro
                </Button>
              )}
            </Col>
            <Col
              xs={4}
              sm={6}
              className="d-flex justify-content-center align-items-center"
            >
              <span className="text-center">{pagina} di 6</span>
            </Col>
            <Col xs={4} sm={3}>
              {pagina < 6 && (
                <Button variant="ng-variant" onClick={() => avanzaPagina()}>
                  Avanti
                </Button>
              )}
              {pagina === 6 && (
                <Button
                  variant="success"
                  onClick={() => {
                    addAutoFetch();
                  }}
                >
                  Aggiungi
                </Button>
              )}
            </Col>
          </Row>
        )}
      </div>
      {modalMarche && (
        <ModaleMarche show={modalMarche} onHide={() => setModalMarche(false)} />
      )}
      {modalModelli && (
        <ModaleModelli
          show={modalModelli}
          onHide={() => setModalModelli(false)}
        />
      )}
    </Container>
  );
};

export default AggiungiAuto;
