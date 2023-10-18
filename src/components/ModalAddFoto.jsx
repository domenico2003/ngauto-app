import { useState } from "react";
import { Button, Col, Form, Modal, Spinner } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import ModalSuccessAction from "./ModalSuccessAction";

const ModalAddFoto = (props) => {
  const [foto, setFoto] = useState(null);
  const [errore, setErrore] = useState("");
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spinnerStatus, setSpinnerStatus] = useState(false);

  const addImmagineFetch = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (foto !== null) {
      setErrore("");
      setSpinnerStatus(true);
      const formData = new FormData();
      formData.append("file", foto);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const URL = `http://localhost:3001/automobili/img?autoId=${props.auto.id}`;
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
      } finally {
        setTimeout(() => {
          setSpinnerStatus(false);
        }, 800);
      }
    } else {
      setErrore("Aggiungi un immagine!");
    }
  };
  const handleFileChange = (event) => {
    setErrore("");
    const file = event.target.files[0];

    // Verifica se è stato selezionato un file
    if (file) {
      // Verifica la dimensione del file
      if (file.size <= 1024 * 1024 * 10) {
        // Il file è accettabile, puoi fare qualcosa con esso
        setFoto(event.target.files[0]);
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
              Aggiungi Immagini
            </p>
            {props.auto.foto.length === 9 && (
              <p className="text-center text-warning fw-bold text-decoration-underline m-0">
                ATTENZIONE! puoi inserire soltanto un'altra immagine!{" "}
              </p>
            )}
          </div>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <Form noValidate validated={validated} onSubmit={addImmagineFetch}>
            <Form.Group
              className="mb-3 d-flex flex-column align-items-center"
              controlId="formBasicUsername"
            >
              <Form.Label className="font-titoli h4  fw-bold">
                Inserisci immagine:
              </Form.Label>
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
                {foto && (
                  <div className="selected-photo-preview text-center">
                    <img
                      src={URL.createObjectURL(foto)}
                      alt="Selected"
                      className="img-fluid imgAnteprima"
                    />
                  </div>
                )}
              </Col>
              {foto !== null && (
                <Button
                  variant="outline-danger mb-3"
                  onClick={() => setFoto(null)}
                >
                  Cancella Immaggine
                </Button>
              )}
              <Form.Control.Feedback type="invalid">
                Inserisci una foto!
              </Form.Control.Feedback>
            </Form.Group>
            {errore !== "" && (
              <p className="text-danger text-center mt-3">{errore}</p>
            )}
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
      {success && (
        <ModalSuccessAction
          text={"Immagine aggiunta con successo"}
          show={success}
        />
      )}
      {spinnerStatus && (
        <div className="position-fixed top-0 start-0 bottom-0 spinnerBackground end-0 spinnerBackground d-flex justify-content-center align-items-center">
          <Spinner animation="grow" variant="ng-variant" />
        </div>
      )}
    </>
  );
};
export default ModalAddFoto;
