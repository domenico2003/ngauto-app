import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import ModalSuccessAction from "./ModalSuccessAction";

const DettaglioImg = (props) => {
  let profileMe = useSelector((state) => state.profilo.me);
  const [deleteModal, setDeleteModal] = useState(false);
  const [eliminaSuccess, setEliminaSuccess] = useState(false);
  const [copertinaSuccess, setCopertinaSuccess] = useState(false);

  const handleEliminafotoClick = async () => {
    const URL = "http://localhost:3001/automobili/img/" + props.img.id;
    const headers = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setEliminaSuccess(true);

        setTimeout(() => {
          setEliminaSuccess(false);
          props.detailsautofetch();
          props.onHide();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const impostaCopertinaFetch = async () => {
    const URL = `http://localhost:3001/automobili?idFoto=${props.img.id}&idAuto=${props.auto.id}`;
    const headers = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setCopertinaSuccess(true);

        setTimeout(() => {
          setCopertinaSuccess(false);
          props.detailsautofetch();
          props.onHide();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="dettaglio-img p-0 "
      >
        <Modal.Header className="bg-secondario text-bianco p-0 border-0 singlePointer">
          <img
            src={props.img.url}
            alt={props.img.id}
            onClick={() => props.onHide()}
          />
          {profileMe !== null && profileMe?.ruolo === "ADMIN" && (
            <div className="btn-div">
              <Button
                variant="danger"
                className="me-3"
                onClick={() => setDeleteModal(true)}
              >
                <BsFillTrashFill />
              </Button>
              <Button variant="success" onClick={() => impostaCopertinaFetch()}>
                Imposta come copertina
              </Button>
            </div>
          )}
        </Modal.Header>
      </Modal>
      {deleteModal && (
        <Modal
          size="md"
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
          className="text-bianco"
        >
          <Modal.Header
            closeButton
            className="bg-secondario text-bianco border-ng-variant"
          >
            <p
              id="contained-modal-title-vcenter"
              className="flex-fill m-0 text-center logo-no-nav h2 fw-bold font-titoli"
            >
              Elimina immaggine
            </p>
          </Modal.Header>
          <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
            <p className="text-center">Sicuro di voler eliminare l'immagine?</p>
            <div>
              <Button
                variant="danger"
                size="sm"
                className="ms-4"
                onClick={() => {
                  handleEliminafotoClick();
                }}
              >
                Elimina
              </Button>
              <Button
                variant="outline-dark"
                size="sm"
                className="ms-4"
                onClick={() => setDeleteModal(false)}
              >
                Chiudi
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {eliminaSuccess && (
        <ModalSuccessAction
          text={"Immagine eliminata con successo"}
          show={eliminaSuccess}
        />
      )}
      {copertinaSuccess && (
        <ModalSuccessAction
          text={"Immagine impostata come copertina"}
          show={copertinaSuccess}
        />
      )}
    </>
  );
};
export default DettaglioImg;
