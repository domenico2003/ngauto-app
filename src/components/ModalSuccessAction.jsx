import { Modal } from "react-bootstrap";

const ModalSuccessAction = (props) => {
  return (
    <Modal
      size="md"
      show={props.show}
      aria-labelledby="example-modal-sizes-title-sm"
      className="text-bianco"
    >
      <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
        <p className="text-success text-center h5 fw-bold m-0">{props.text}</p>
      </Modal.Body>
    </Modal>
  );
};
export default ModalSuccessAction;
