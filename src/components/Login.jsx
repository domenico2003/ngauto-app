import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { profileFetch } from "../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const [emailInserita, setEmailInserita] = useState("");
  const [passwordInserita, setPasswordInserita] = useState("");
  const [errore, setErrore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (emailInserita !== "" && passwordInserita !== "") {
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
          setErrore("");
          dispatch(profileFetch());
          navigate("/");
        } else {
          let dato = await risposta.json();
          setErrore(dato.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container className="text-bianco login pt-5 ">
      <Row className="justify-content-center  ">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          className="bg-secondario p-4  shadow-lg rounded-4"
        >
          <div className="d-flex">
            <p className="h1 border-bottom border-2 border-ng-variant logo fw-bold text-bianco animate__bounceInLeft animate__animated">
              Accedi
            </p>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicLoginEmail">
              <Form.Label className="animate__bounceInRight animate__animated">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={emailInserita}
                onChange={(e) => setEmailInserita(e.target.value)}
                className="animate__bounceInLeft animate__animated"
                required
              />

              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                inserisci un'email valida!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLoginPassword">
              <Form.Label className="animate__bounceInRight animate__animated">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordInserita}
                onChange={(e) => setPasswordInserita(e.target.value)}
                className="animate__bounceInLeft animate__animated"
                required
              />
              <Form.Control.Feedback
                type="invalid"
                className="animate__bounceIn animate__animated"
              >
                Inserisci la password!
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="justify-content-between animate__bounceInRight animate__animated">
              <Col xs={3} sm={4}>
                <Button variant="ng-variant" type="submit">
                  Accedi
                </Button>
              </Col>
              <Col
                xs={9}
                sm={8}
                className="d-flex justify-content-end align-items-center"
              >
                <small className="fs-7 ">
                  non sei ancora registrato?{" "}
                  <Link to={"/registration"} className="text-decoration-none">
                    registrati ora
                  </Link>
                </small>
              </Col>
            </Row>
            {errore !== "" && (
              <p className="text-danger mt-3 animate__bounceIn animate__animated">
                {errore}
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
