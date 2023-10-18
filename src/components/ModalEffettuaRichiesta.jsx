import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";
import { useSelector } from "react-redux";

const ModalEffettuaRichiesta = (props) => {
  const [daData, setDaData] = useState("");
  const [finoA, setFinoA] = useState("");
  const [errore, setErrore] = useState("");
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  let profileMe = useSelector((state) => state.profilo.me);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (daData !== "" && finoA !== "") {
      setErrore("");

      const URL = `http://localhost:3001/noleggio`;
      const headers = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUtenteRichiedente: profileMe?.id,
          daData: daData,
          aData: finoA,
          idAutoRichiesta: props.auto.id,
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
            if (props.fetch !== undefined) {
              props.fetch();
            }
            props.onHide();
          }, 2300);
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
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
              Effettua richiesta
            </p>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicCognome">
              <Form.Label className="font-titoli fw-bold">
                Data di partenza:
              </Form.Label>
              <Form.Control
                className="input-per-modali"
                type="date"
                value={daData}
                onChange={(e) => setDaData(e.target.value)}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la data di inizio noleggio!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="font-titoli fw-bold">
                Data di fine:
              </Form.Label>
              <Form.Control
                className="input-per-modali"
                type="date"
                value={finoA}
                onChange={(e) => setFinoA(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci la data di fine noleggio!
              </Form.Control.Feedback>
            </Form.Group>
            {errore !== "" && <p className="text-danger mt-3">{errore}</p>}
            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="success">
                chiedi
              </Button>
              <Button
                variant="outline-ng-variant"
                type="button"
                onClick={props.onHide}
              >
                chiudi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {success && (
        <ModalSuccessAction
          text={"Richiesta effettuata con successo!"}
          show={success}
        />
      )}
    </>
  );
};
export default ModalEffettuaRichiesta;
