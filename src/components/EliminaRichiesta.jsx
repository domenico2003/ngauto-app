import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalSuccessAction from "./ModalSuccessAction";

const EliminaRichiesta = ({ richiestaId, eliminaModale, setEliminaModale }) => {
  const [eliminaSuccess, setEliminaSuccess] = useState(false);
  const navigate = useNavigate();
  const handleEliminaRichiestaClick = async () => {
    const URL = "http://localhost:3001/noleggio/" + richiestaId;
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
          navigate("/aNoleggio");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={eliminaModale}
        onHide={() => setEliminaModale(false)}
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
            Elimina richiesta noleggio
          </p>
        </Modal.Header>
        <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
          <p className="text-center h5">
            Sicuro di voler eliminare la richiesta?
          </p>
          <div>
            <Button
              variant="danger"
              size="sm"
              className="ms-4"
              onClick={() => {
                handleEliminaRichiestaClick();
              }}
            >
              Elimina
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              className="ms-4"
              onClick={() => setEliminaModale(false)}
            >
              Chiudi
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {eliminaSuccess && (
        <ModalSuccessAction
          text={"Richiesta eliminata con successo"}
          show={eliminaSuccess}
        />
      )}
    </>
  );
};
export default EliminaRichiesta;
