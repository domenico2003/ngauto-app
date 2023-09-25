import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";

const ModalModificaRichiesta = (props) => {
  const [validated, setValidated] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  const [daData, setDaData] = useState("");
  const [finoA, setFinoA] = useState("");
  const [errore, setErrore] = useState("");

  useEffect(() => {
    setDaData(props?.richiesta?.daData);
    setFinoA(props?.richiesta?.finoA);
  }, []);

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
      const URL = "http://localhost:3001/noleggio/" + props?.richiesta?.id;
      const headers = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          daData: daData,
          aData: finoA,
          idAutoRichiesta: props?.richiesta?.autoRichiesta?.id,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          setErrore("");
          setModificaSuccess(true);
          setTimeout(() => {
            setModificaSuccess(false);
            props.richiestaFetch();

            props.onHide();
          }, 1500);
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else setErrore("compilare tutti i campi");
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
          <p
            id="contained-modal-title-vcenter"
            className="flex-fill m-0 text-center logo-no-nav h2 fw-bold font-titoli"
          >
            Modifica Richiesta
          </p>
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
                modifica
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
      {modificaSuccess && (
        <ModalSuccessAction
          text={"Richiesta modificata con successo"}
          show={modificaSuccess}
        />
      )}
    </>
  );
};
export default ModalModificaRichiesta;
