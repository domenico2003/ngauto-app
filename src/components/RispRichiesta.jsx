import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";

const RispRichiesta = ({ richiesta, fetcRichiesta }) => {
  const [stato, setStato] = useState("");
  const [note, setNote] = useState("");
  const [contatto, setContatto] = useState("");
  const [validated, setValidated] = useState(false);
  const [errore, setErrore] = useState("");
  const [success, setSuccess] = useState(false);
  const [statoErrore, setStatoErrore] = useState("");

  useEffect(() => {
    setStato(richiesta?.statoRichiesta);
    setNote(richiesta?.noteRisposta);
    setContatto(richiesta?.contattoConsigliato);
  }, [richiesta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if (stato === "in_attesa") {
      setStatoErrore("La risposta non può rimanere in attesa!");
    } else {
      setStatoErrore("");
    }

    if (
      stato !== "in_attesa" &&
      note !== null &&
      note !== "" &&
      contatto !== null &&
      contatto !== ""
    ) {
      setErrore("");

      const URL = "http://localhost:3001/noleggio/rispondi/" + richiesta?.id;
      const headers = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: stato,
          noteRisposta: note,
          contattoConsigliato: contatto,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          setSuccess(true);
          fetcRichiesta();

          setTimeout(() => {
            setSuccess(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 2000);
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrore("Compila tutti i campi");
    }
  };
  return (
    <>
      {" "}
      <p className="font-titoli text-center fw-bold h2 my-4">
        Rispondi alla richiesta{" "}
      </p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row xs={1} md={3}>
          <Col>
            <Form.Group>
              <p className="mb-2 fw-bold h5 font-titoli">Seleziona stato: </p>
              <Form.Select
                aria-label="stato"
                isInvalid={stato === "in_attesa"}
                value={stato}
                onChange={(e) => setStato(e.target.value)}
                className={`mb-3 mb-md-0 bg-black fw-bold ${
                  stato === "in_attesa" && " text-warning"
                } ${stato === "approvata" && "text-success"} ${
                  stato === "rifiutata" && "text-danger"
                }`}
              >
                <option value="in_attesa" className="text-warning fw-bold">
                  in attesa
                </option>
                <option value="rifiutata" className="text-danger fw-bold">
                  rifiutata
                </option>
                <option value="approvata" className="text-success fw-bold">
                  approvata
                </option>
              </Form.Select>
              {statoErrore !== "" && (
                <p className="m-0 h6 text-danger animate__bounceIn animate__animated">
                  {statoErrore}
                </p>
              )}
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group className="mb-3" controlId="note">
              <Form.Label className="mb-2 fw-bold h5 font-titoli">
                Aggungi note:{" "}
              </Form.Label>
              <Form.Control
                as="textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Motivi rifiuto, prossimi step, ecc..."
                className="bg-black text-white"
                rows={3}
                maxLength={1500}
                required
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated h5"
              >
                Aggiungi una nota!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group className="mb-3" controlId="contattiConsigliati">
              <Form.Label className="mb-2 fw-bold h5 font-titoli">
                aggiungi contatti consigliati:
              </Form.Label>
              <Form.Control
                as="textarea"
                className="bg-black text-white"
                rows={3}
                value={contatto}
                onChange={(e) => setContatto(e.target.value)}
                placeholder="email, numero di telefono, ecc..."
                maxLength={255}
                required
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated h5"
              >
                Aggiumgi un contatto!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {errore !== "" && (
          <p className="m-0 h5 text-center mb-3 text-danger animate__bounceIn animate__animated">
            {errore}
          </p>
        )}
        <div className="d-flex justify-content-center align-items-center mb-5">
          <Button type="submit" variant="success">
            Invia risposta
          </Button>
        </div>
      </Form>
      {success && (
        <ModalSuccessAction
          text={
            "Hai risposto alla richiesta di " +
            richiesta?.utente?.nome +
            " " +
            richiesta?.utente?.cognome
          }
          show={success}
        />
      )}
    </>
  );
};
export default RispRichiesta;
