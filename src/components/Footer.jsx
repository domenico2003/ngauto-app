import { Col, Container, Row } from "react-bootstrap";
import { FaMapMarkerAlt, FaMapPin } from "react-icons/fa";
import { MdContactSupport, MdEmail } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { PiPhoneIncomingFill } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" &&
        location.pathname !== "/registration" &&
        location.pathname !== "/addAuto" && (
          <div className="bg-dark text-white p-4 mt-5">
            <Container>
              <Row xs={1} md={2}>
                <Col className="d-flex flex-column align-items-center mb-4 mb-md-0">
                  <p className="text-center fw-bold d-flex align-items-bottom h2  font-titoli text-ng-variant ">
                    <FaMapPin /> Dove ci troviamo
                  </p>
                  <div
                    style={{
                      overflow: "hidden",
                      maxWidth: "100%",
                      width: "400px",
                      height: "200px",
                    }}
                  >
                    <div
                      id="embed-map-canvas"
                      style={{
                        height: "100%",
                        width: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <iframe
                        style={{ height: "100%", width: "100%", border: 0 }}
                        frameborder="0"
                        title="ng-Auto map"
                        src="https://www.google.com/maps/embed/v1/place?q=N.G.+Auto,+89044+Mandorleto,+RC,+Italia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                      ></iframe>
                    </div>
                    <a
                      class="code-for-google-map"
                      href="https://www.bootstrapskins.com/themes"
                      id="enable-map-data"
                    >
                      premium bootstrap themes
                    </a>
                  </div>
                </Col>
                <Col className="d-flex flex-column align-items-center position-relative">
                  <p className=" fw-bold d-flex align-items-bottom justify-content-center h2  font-titoli text-ng-variant ">
                    <MdContactSupport />
                    Contattacci o vieni a trovarci
                  </p>
                  <div>
                    <p className="d-flex align-items-center justify-content-center">
                      <span className="fw-bold underline-red h5 m-0 me-2 text-ng-variant d-flex align-items-center">
                        <GiRotaryPhone className="me-1" /> Tel:
                      </span>

                      <a className="h6 m-0" href="tel:+39 0964 22642">
                        +39 0964 22642
                      </a>
                    </p>
                    <p className="d-flex align-items-center justify-content-center">
                      <span className="fw-bold underline-red h5 m-0 me-2 text-ng-variant d-flex align-items-center">
                        <PiPhoneIncomingFill className="me-1" /> Cell:
                      </span>

                      <a className="h6 m-0" href="tel:+39 338 1126556">
                        +39 338 1126556
                      </a>
                    </p>
                    <p className="d-flex align-items-center justify-content-center">
                      <span className="fw-bold underline-red h5 m-0 me-2 text-ng-variant d-flex align-items-center">
                        <MdEmail className="me-1" /> Email:
                      </span>

                      <a
                        className="h6 fw-bold m-0"
                        href="mailto:ngautolocri@gmail.com"
                      >
                        ngautolocri@gmail.com
                      </a>
                    </p>{" "}
                    <p className="d-flex align-items-center justify-content-center mb-5 ">
                      <span className="fw-bold underline-red h5 m-0 me-2 text-ng-variant d-flex align-items-center">
                        <FaMapMarkerAlt className="me-1" /> Indirizzo:
                      </span>

                      <p className="h6 m-0">89044 Mandorleto RC, Italia</p>
                    </p>
                  </div>
                  <small className="crediti text-ng-variant ">
                    created By:{" "}
                    <a
                      href="https://domenico-dattilo-portfolio.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Domenico Dattilo
                    </a>
                  </small>
                </Col>
              </Row>
            </Container>
          </div>
        )}
    </>
  );
};
export default Footer;
