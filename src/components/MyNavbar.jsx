import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import logo from "../ng-auto-logo.png";
import user from "../user.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar
      bg="ng-variant"
      variant="dark"
      expand="lg"
      sticky="top"
      className="px-2"
    >
      <Container fluid>
        <Link to={"/"} className="navbar-brand">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          {"  "}
          NG auto
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={"/"}
              className={`nav-link ${location.pathname === "/" && "active"}`}
            >
              Home
            </Link>
            <Link
              to={"/lista"}
              className={`nav-link ${
                location.pathname === "/lista" && "active"
              }`}
            >
              Link
            </Link>
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-ng-variant"
                id="dropdown-basic"
                className="dropdown-icon me-4"
              >
                <img
                  alt=""
                  src={user}
                  width="30"
                  height="30"
                  className="d-inline-block align-top "
                />
              </Dropdown.Toggle>

              <Dropdown.Menu align={"end"}>
                <Button
                  variant="outline-ng-variant"
                  className="text-center  dropdown-item "
                >
                  Accedi
                </Button>
                <Button
                  variant="outline-ng-variant"
                  onClick={() => {
                    navigate("/registrazione");
                  }}
                  className="text-center  dropdown-item"
                >
                  Registrati
                </Button>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
