import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../ng-auto-logo.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let account = useSelector((state) => state.profilo.me);

  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top" className="px-2">
      <Container fluid>
        <Link
          to={"/"}
          className="navbar-brand fw-bold text-ng-variant font-titoli d-flex align-items-center"
        >
          <img
            alt=""
            src={logo}
            width="52"
            height="50"
            className="d-inline-block align-top me-2"
          />
          {"  "}
          <p className="h2 fw-bold d-inline m-0">NG Auto</p>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className={"text-center"}>
          <div className="me-auto ms-auto">
            <Nav>
              <Link
                to={"/"}
                className={`nav-link link-nav ${
                  location.pathname === "/" && "active"
                }`}
              >
                Home
              </Link>
              <Link
                to={"/nuove"}
                className={`nav-link link-nav ${
                  location.pathname === "/nuove" && "active"
                }`}
              >
                Auto nuove
              </Link>
              <Link
                to={"/usate"}
                className={`nav-link link-nav ${
                  location.pathname === "/usate" && "active"
                }`}
              >
                Auto usate
              </Link>
              <Link
                to={"/aNoleggio"}
                className={`nav-link link-nav ${
                  location.pathname === "/aNoleggio" && "active"
                }`}
              >
                Auto a noleggio
              </Link>
              <Link
                to={"/richieste"}
                className={`nav-link link-nav ${
                  location.pathname === "/richieste" && "active"
                }`}
              >
                Richieste di noleggio
              </Link>
            </Nav>
          </div>
          <Nav
            className={
              (location.pathname === "/login" ||
                location.pathname === "/registration") &&
              "d-none"
            }
          >
            {account === null ? (
              <Button variant="ng-variant" onClick={() => navigate("/login")}>
                Accedi
              </Button>
            ) : (
              <Button
                variant=""
                className="text-center  border-0 link-nav text-white"
                onClick={() => navigate("/account/" + account?.id)}
              >
                <p className="link-nav m-0 ">
                  {account?.nome + " " + account?.cognome}
                </p>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
