import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";
import { useDispatch } from "react-redux";
import { marcheFetch } from "../redux/actions";

const ModaleMarche = (props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [modificaSuccess, setModificaSuccess] = useState(false);
  const [marca, setMarca] = useState("");

  const [errore, setErrore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (marca !== "") {
      setErrore("");
      const URL = `http://localhost:3001/automobili/marca?tipo=${marca}`;
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
          dispatch(marcheFetch());
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
            Aggiungi marca
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="font-titoli fw-bold">
                Nome Marca:
              </Form.Label>
              <Form.Control
                className="input-per-modali"
                type="text"
                placeholder="Nome Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il nome della marca!
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
                Chiudi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {modificaSuccess && (
        <ModalSuccessAction
          text={"Marca aggiunta con successo"}
          show={modificaSuccess}
        />
      )}
    </>
  );
};
export default ModaleMarche;
