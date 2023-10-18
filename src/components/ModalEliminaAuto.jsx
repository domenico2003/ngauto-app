import { Button, Modal, Spinner } from "react-bootstrap";
import ModalSuccessAction from "./ModalSuccessAction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalEliminaAuto = (props) => {
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [spinnerStatus, setSpinnerStatus] = useState(false);

  const eliminaAuto = async () => {
    setErrore("");
    setSpinnerStatus(true);

    const URL = `http://localhost:3001/automobili/${props.auto.id}`;
    const headers = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setTimeout(() => {
          setSuccess(true);
        }, 800);

        setTimeout(() => {
          setSuccess(false);
          navigate("/");
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
              Elimina auto
            </p>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-secondario text-bianco ">
          <p className="text-center fw-bold h5 m-0 text-decoration-underline text-warning">
            Sicuro di voler eliminare l'auto?
          </p>
          {errore !== "" && (
            <p className="text-danger text-center mt-3">{errore}</p>
          )}
          <div className="d-flex mt-5 justify-content-around ">
            <Button variant="danger" onClick={() => eliminaAuto()}>
              Elimina
            </Button>
            <Button variant="outline-dark" type="button" onClick={props.onHide}>
              Chiudi
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {success && (
        <ModalSuccessAction
          text={"Auto eliminata con successo"}
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
export default ModalEliminaAuto;
