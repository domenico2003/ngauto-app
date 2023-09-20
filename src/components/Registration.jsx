import { useState } from "react";
import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { profileFetch } from "../redux/actions";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [emailInserita, setEmailInserita] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const [usernameInserito, setUsernameInserito] = useState("");
  const [nomeInserito, setNomeInserito] = useState("");
  const [cognomeInserito, setCognomeInserito] = useState("");
  const [telefonoInserito, setTelefonoInserito] = useState("");
  const [validated, setValidated] = useState(false);

  const [errore, setErrore] = useState("");
  const isStringaNumerica = (stringa) => {
    return !/[^0-9]/.test(stringa);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (!isStringaNumerica(telefonoInserito)) {
      setValidated(false);
    }
    if (
      emailInserita !== "" &&
      passwordInserita !== "" &&
      usernameInserito !== "" &&
      nomeInserito !== "" &&
      cognomeInserito !== "" &&
      telefonoInserito !== "" &&
      isStringaNumerica(telefonoInserito) &&
      telefonoInserito.length <= 10
    ) {
      setSpinnerStatus(true);
      const URL = "http://localhost:3001/auth/register";
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInserito,
          email: emailInserita,
          password: passwordInserita,
          nome: nomeInserito,
          cognome: cognomeInserito,
          telefono: telefonoInserito,
        }),
      };
      try {
        let risposta = await fetch(URL, headers);
        if (risposta.ok) {
          let dato = await risposta.json();
          setErrore("");
          localStorage.setItem("token", dato.token);
          handleRegistred();
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);

          setTimeout(() => {
            setSpinnerStatus(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRegistred = async () => {
    const URL = "http://localhost:3001/auth/login";
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInserita,
        password: passwordInserita,
      }),
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        localStorage.setItem("token", dato.token);
        dispatch(profileFetch());
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSpinnerStatus(false);
      }, 2000);
    }
  };
  return (
    <Container className="text-bianco my-5 ">
      <Row className="justify-content-center ">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="bg-secondario p-4  shadow-lg rounded-4 "
        >
          <div className="d-flex">
            <p className="h1 logo fw-bold text-bianco  border-bottom border-2 border-ng-variant animate__bounceInLeft animate__animated">
              Registrati
            </p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="animate__bounceInRight animate__animated">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={emailInserita}
                onChange={(e) => setEmailInserita(e.target.value)}
                required={true}
                className="animate__bounceInLeft animate__animated"
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                inserisci un'email valida!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTelefono">
              <Form.Label className="animate__bounceInRight animate__animated">
                Telefono
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono"
                value={telefonoInserito}
                onChange={(e) => {
                  setTelefonoInserito(e.target.value);
                  if (!isStringaNumerica(telefonoInserito)) {
                    setValidated(true);
                  } else {
                    setValidated(false);
                  }
                }}
                maxLength={10}
                isInvalid={!isStringaNumerica(telefonoInserito)}
                required={true}
                className="animate__bounceInLeft animate__animated"
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                inserisci un numero di telefono valido!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="animate__bounceInRight animate__animated">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordInserita}
                onChange={(e) => setPasswordInserita(e.target.value)}
                required={true}
                className="animate__bounceInLeft animate__animated"
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                Inserisci la password!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label className="animate__bounceInRight animate__animated">
                Nome
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={nomeInserito}
                onChange={(e) => setNomeInserito(e.target.value)}
                required={true}
                className="animate__bounceInLeft animate__animated"
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                Inserisci il tuo nome!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCognome">
              <Form.Label className="animate__bounceInRight animate__animated">
                Cognome
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Cognome"
                value={cognomeInserito}
                onChange={(e) => setCognomeInserito(e.target.value)}
                required={true}
                className="animate__bounceInLeft animate__animated"
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                Inserisci il tuo cognome!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="animate__bounceInRight animate__animated">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={usernameInserito}
                onChange={(e) => setUsernameInserito(e.target.value)}
                required
                className="animate__bounceInLeft animate__animated"
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                Inserisci il tuo username!
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="justify-content-between animate__bounceInRight animate__animated">
              <Col xs={3} sm={4}>
                <Button variant="ng-variant" type="submit">
                  Registrati
                </Button>
              </Col>
              <Col
                xs={9}
                sm={8}
                className="d-flex justify-content-end align-items-center"
              >
                <small className="fs-7 ">
                  sei già registrato?{" "}
                  <Link to={"/login"} className="text-decoration-none">
                    accedi ora
                  </Link>
                </small>
              </Col>
            </Row>
            {errore !== "" && <p className="text-danger mt-3">{errore}</p>}
          </Form>
        </Col>
      </Row>
      {spinnerStatus && (
        <div className="position-fixed top-0 start-0 bottom-0 spinnerBackground end-0 spinnerBackground d-flex justify-content-center align-items-center">
          <Spinner animation="grow" variant="ng-variant" />
        </div>
      )}
    </Container>
  );
};
export default Registration;
