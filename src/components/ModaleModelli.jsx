import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";
import { useSelector } from "react-redux";

const ModaleModelli = (props) => {
  let marcheTrovate = useSelector((state) => state.auto.marche);
  const [validated, setValidated] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  const [marca, setMarca] = useState("--Marca--");
  const [modello, setModello] = useState("");
  const [errore, setErrore] = useState("");

  const handleSubmit = async (e) => {
    if (modello === "") {
      setErrore("Inserisci il nome del modello");
    }
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (marca !== "--Marca--" && modello !== "") {
      setErrore("");
      const URL = `http://localhost:3001/automobili/modello?tipoModello=${modello}&tipoMarca=${marca}`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          setErrore("");
          setModificaSuccess(true);
          setTimeout(() => {
            setModificaSuccess(false);

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
            Aggiungi modello
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <p className="m-0 text-center text-decoration-underline text-info">
              Non è presente la marca richiesta? torna indietro e aggiungila!
            </p>
            <Form.Group className="mb-3" controlId="formBasicCognome">
              <Form.Label className="font-titoli fw-bold">Marca:</Form.Label>
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="font-titoli fw-bold">
                Nome Modello:
              </Form.Label>
              <Form.Control
                className="input-per-modali"
                type="text"
                placeholder="Nome Modello"
                value={modello}
                onChange={(e) => setModello(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il nome del modello!
              </Form.Control.Feedback>
            </Form.Group>
            {errore !== "" && <p className="text-danger mt-3">{errore}</p>}
            <div className="d-flex mt-5 justify-content-around ">
              <Button type="submit" variant="success">
                Aggiungi
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
          text={"Modello aggiunto con successo"}
          show={modificaSuccess}
        />
      )}
    </>
  );
};
export default ModaleModelli;
