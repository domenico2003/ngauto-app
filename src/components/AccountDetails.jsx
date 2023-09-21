import { useDispatch, useSelector } from "react-redux";
import { DetailsProfileFetch, setProfileAction } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Row,
  Form,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import ModalSuccessAction from "./ModalSuccessAction";
import ListaRichieste from "./ListaRichieste";
import ModalModificaAccount from "./ModalModificaAccount";
const AccountDetails = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const params = useParams();
  let profileMe = useSelector((state) => state.profilo.me);
  let profileDetail = useSelector((state) => state.profilo.dettaglioAccount);
  const [successAddAdmin, setSuccessAddAdmin] = useState(false);
  const [modificaModale, setModificaModale] = useState(false);
  const [eliminaSuccess, setEliminaSuccess] = useState(false);
  const [eliminaModale, setEliminaModale] = useState(false);
  const [emailInserita, setEmailInserita] = useState("");
  const [errore, setErrore] = useState("");

  const aggiungiAdmin = async () => {
    const URL = "http://localhost:3001/admin/" + emailInserita;
    const headers = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        setErrore("");
        setSuccessAddAdmin(true);

        setTimeout(() => {
          setSuccessAddAdmin(false);
          setEmailInserita("");
        }, 2000);
      } else {
        let dato = await risposta.json();
        setErrore(dato.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEliminaAccountClick = async () => {
    const URL = "http://localhost:3001/utente/" + profileMe?.id;
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
          handleLogout();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdminClick = () => {
    if (emailInserita === "") {
      setErrore("Inserisci un'email");
    } else {
      setErrore("");
      aggiungiAdmin();
    }
  };
  useEffect(() => {
    dispatch(DetailsProfileFetch(params.id));
  }, [params.id, profileMe]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setProfileAction(null));
    navigate("/login");
  };

  return (
    <Container className="mb-5">
      <div className="d-flex align-items-center justify-content-center mt-5">
        <p className="h1 m-0 fw-bold b text-dark text-center ">
          {profileDetail?.nome + " " + profileDetail?.cognome}
        </p>
        {profileMe?.id === profileDetail?.id && (
          <>
            <Dropdown className="">
              <Dropdown.Toggle
                drop={"down-centered"}
                className={`text-ng-variant border-0 clicked `}
                variant=""
                id="dropdown-basic"
              >
                <IoMdSettings className="h3 m-0" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-primario border-2 border-quaternario p-0 ">
                <div className="d-flex flex-column w-100 ">
                  <Button variant="ng-variant" onClick={() => handleLogout()}>
                    logout
                  </Button>
                  <Button
                    variant="outline-success"
                    className=" border-0 border-top my-2 border-bottom border-quaternario border-3"
                    onClick={() => setModificaModale(true)}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="outline-danger"
                    className=" border-0 border-top border-quaternario border-3"
                    onClick={() => setEliminaModale(true)}
                  >
                    Elimina account
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </div>
      <p className="text-center mt-2">
        <span className="fw-bold h5">Ruolo: </span>
        <span className=" datoUser">{profileDetail?.ruolo}</span>
      </p>
      <Row
        xs={1}
        sm={2}
        md={3}
        className="border-bottom border-2 border-ng-variant justify-content-center"
      >
        <Col>
          <p className="text-center">
            <span className="fw-bold h5">Email: </span>
            <span className=" datoUser">{profileDetail?.email}</span>
          </p>
        </Col>
        <Col>
          <p className="text-center">
            <span className="fw-bold h5">Telefono: </span>
            <span className=" datoUser">{profileDetail?.telefono}</span>
          </p>
        </Col>
        <Col>
          <p className="text-center">
            <span className="fw-bold h5">Username: </span>
            <span className=" datoUser">{profileDetail?.username}</span>
          </p>
        </Col>
      </Row>
      {profileMe?.id === profileDetail?.id &&
        profileDetail?.ruolo === "ADMIN" && (
          <div className="border-bottom border-2 border-ng-variant  d-flex flex-column align-items-center">
            <div className="mb-5">
              <p className="h1 fw-bold font-titoli text-center m-0 mt-5">
                Nomina Collaboratore
              </p>
              <div className="d-flex align-content-center mt-5">
                <Form.Control
                  type="email"
                  placeholder="Email collaboratore"
                  value={emailInserita}
                  onChange={(e) => setEmailInserita(e.target.value)}
                  className="animate__bounceInLeft animate__animated me-0  "
                  required
                />
                <Button variant="ng-variant" onClick={() => handleAdminClick()}>
                  Aggiungi
                </Button>
              </div>
              {errore.length > 0 && (
                <p className="text-center h5 mt-2 text-danger">{errore}</p>
              )}
            </div>
          </div>
        )}{" "}
      <div>
        <div className="d-flex flex-column align-items-center">
          <div>
            <p className="h1 fw-bold font-titoli text-center m-0 mt-5">
              Richieste di noleggio inviate
            </p>
            <Button
              variant="outline-ng-variant w-100 mt-3"
              onClick={() => navigate("/aNoleggio")}
            >
              Effettua una richiesta
            </Button>
          </div>
        </div>
        <ListaRichieste
          url={
            "http://localhost:3001/noleggio?idUtenteRichiedente=" +
            profileDetail?.id +
            "&"
          }
        />
      </div>
      {successAddAdmin && (
        <ModalSuccessAction
          text={"Complimenti, L'account da te scelto è ora un admin"}
          show={successAddAdmin}
        />
      )}
      {modificaModale && (
        <ModalModificaAccount
          show={modificaModale}
          onHide={() => setModificaModale(false)}
        />
      )}
      {eliminaModale && (
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
              Elimina Account
            </p>
          </Modal.Header>
          <Modal.Body className="bg-secondario d-flex flex-column align-items-center">
            <p className="text-center">Sicuro di voler eliminare l'account?</p>
            <div>
              <Button
                variant="danger"
                size="sm"
                className="ms-4"
                onClick={() => {
                  handleEliminaAccountClick();
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
      )}
      {eliminaSuccess && (
        <ModalSuccessAction
          text={"Account eliminato con successo"}
          show={eliminaSuccess}
        />
      )}
    </Container>
  );
};
export default AccountDetails;
