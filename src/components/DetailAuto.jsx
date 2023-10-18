import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Carousel,
  Col,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaGasPump, FaCalendarAlt, FaRoad } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";
import { BsDropletFill, BsFillLightningChargeFill } from "react-icons/bs";
import {
  AiFillCar,
  AiFillPlusSquare,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { IoMdColorPalette, IoMdSettings } from "react-icons/io";
import DettaglioImg from "./DettaglioImg";
import { useSelector } from "react-redux";
import ListaRichieste from "./ListaRichieste";
import ModalAddFoto from "./ModalAddFoto";
import ModalModAuto from "./ModalModAuto";
import ModalEliminaAuto from "./ModalEliminaAuto";

const DetailAuto = () => {
  const params = useParams();
  let profileMe = useSelector((state) => state.profilo.me);

  const [auto, setAuto] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [modificaModale, setModificaModale] = useState(false);
  const [addImgModale, setAddImgModale] = useState(false);
  const [eliminaModale, setEliminaModale] = useState(false);
  const [imgSelected, setImgSelected] = useState(null);
  const [effettuaRichiestaModale, setEffettuaRichiestaModale] = useState(false);

  useEffect(() => {
    detailsAutoFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(auto);
  }, [auto]);

  const detailsAutoFetch = async () => {
    const URL = "http://localhost:3001/automobili/all/" + params.id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        setAuto(dato);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ImageCarousel = (imgForRow) => {
    const imagesRows = [];
    const numberOfRows = Math.ceil(auto?.foto.length / imgForRow);

    // split images into rows of 6
    for (let i = 0; i < numberOfRows; i++) {
      const rowImages = auto?.foto.slice(
        i * imgForRow,
        i * imgForRow + imgForRow
      );
      imagesRows.push(rowImages);
    }
    // console.log(imagesRows[0]);
    return imagesRows;
  };

  return (
    <Container className="mb-5">
      <div
        className={`d-flex align-items-center justify-content-center mt-4 ${
          profileMe !== null && profileMe?.ruolo === "ADMIN" && "ms-5"
        }`}
      >
        <p className=" mb-0 text-center fw-bold h1 font-titoli titoloPagina">
          {auto?.marca.tipo} {auto?.modello.tipo}
        </p>
        {profileMe !== null && profileMe?.ruolo === "ADMIN" && (
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
                  <Button
                    variant="outline-success"
                    className=" border-0 border-bottom mb-2 border-bottom border-quaternario border-3"
                    onClick={() => setModificaModale(true)}
                  >
                    Modifica
                  </Button>
                  <Button
                    variant="outline-danger"
                    className=" border-0 border-top border-quaternario border-3"
                    onClick={() => setEliminaModale(true)}
                  >
                    Elimina
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </div>
      <p className="text-center mb-4 h4 font-titoli ">
        <span className="evidenziatore">
          {auto?.stato.split("_").map((stato) => `${stato} `)}
        </span>
      </p>
      <p
        className={`text-center h2 font-titoli fw-bold  ${
          auto?.condizione !== "noleggio" && "mb-4"
        }`}
      >
        {auto?.condizione} -{" "}
        <span className="titoloPagina text-ng-variant">
          {auto?.prezzo}
          {auto?.condizione === "noleggio" ? "€/24h" : "€"}
        </span>
      </p>
      {profileMe !== null && auto?.condizione === "noleggio" && (
        <Button
          variant="outline-ng-variant"
          className="d-block mt-2 mx-auto mb-4"
          onClick={() => setEffettuaRichiestaModale(true)}
        >
          Effettua una richiesta di noleggio
        </Button>
      )}
      <Row xs={1} md={2}>
        <Col>
          <p className="border-bottom border-3 border-ng-variant fw-bold mb-3 pb-2 h3 d-flex align-items-end">
            Immaggini
            {profileMe !== null &&
              profileMe?.ruolo === "ADMIN" &&
              auto?.foto.length < 10 && (
                <button
                  className="btn border-0 py-0"
                  onClick={() => setAddImgModale(true)}
                >
                  <AiFillPlusSquare className="h3 mb-0 text-success" />
                </button>
              )}
          </p>

          <img
            src={auto?.copertina?.url}
            alt="copertina"
            className="img-fluid w-100  img-autoDetail mb-2 singlePointer"
            onClick={() => {
              setImgSelected(auto?.copertina);
              setDetailsModal(true);
            }}
          />

          <Carousel
            className="d-none d-sm-block mb-4 mb-md-0 d-md-none d-lg-block"
            prevIcon={
              <AiOutlineArrowLeft className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1" />
            }
            variant="ng-variant"
            nextIcon={
              <AiOutlineArrowRight
                style={{ opacity: 1, color: "#de0000" }}
                className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1"
              />
            }
          >
            {auto?.foto.length > 0 &&
              ImageCarousel(3).map((row, index) => (
                <Carousel.Item key={index}>
                  <Row>
                    {row.map((obj) => (
                      <Col
                        sm={4}
                        key={obj.id}
                        className="singlePointer"
                        onClick={() => {
                          setImgSelected(obj);
                          setDetailsModal(true);
                        }}
                      >
                        <img
                          src={obj.url}
                          alt={obj.id}
                          className="img-fluid h-100"
                          // width={200}
                          // height={100}
                        />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
          </Carousel>
          <Carousel
            className="d-none  d-md-block d-lg-none"
            prevIcon={
              <AiOutlineArrowLeft className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1" />
            }
            variant="ng-variant"
            nextIcon={
              <AiOutlineArrowRight
                style={{ opacity: 1, color: "#de0000" }}
                className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1"
              />
            }
          >
            {auto?.foto.length > 0 &&
              ImageCarousel(2).map((row, index) => (
                <Carousel.Item key={index}>
                  <Row>
                    {row.map((obj) => (
                      <Col
                        sm={6}
                        key={obj.id}
                        className="singlePointer"
                        onClick={() => {
                          setImgSelected(obj);
                          setDetailsModal(true);
                        }}
                      >
                        <img
                          src={obj.url}
                          alt={obj.id}
                          className="img-fluid h-100"
                          // width={200}
                          // height={100}
                        />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
          </Carousel>
          <Carousel
            className=" d-sm-none  mb-4"
            prevIcon={
              <AiOutlineArrowLeft className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1" />
            }
            variant="ng-variant"
            nextIcon={
              <AiOutlineArrowRight
                style={{ opacity: 1, color: "#de0000" }}
                className="text-black opacity-100 h1 fw-bold m-0 text-ng-variant bg-dark rounded-circle p-1"
              />
            }
          >
            {auto?.foto.length > 0 &&
              ImageCarousel(1).map((row, index) => (
                <Carousel.Item key={index}>
                  <Row>
                    {row.map((obj) => (
                      <Col
                        sm={12}
                        key={obj.id}
                        className="singlePointer"
                        onClick={() => {
                          setImgSelected(obj);
                          setDetailsModal(true);
                        }}
                      >
                        <img
                          src={obj.url}
                          alt={obj.id}
                          className="img-fluid h-100 w-100"
                          // width={200}
                          // height={100}
                        />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
        <Col>
          <p className="border-bottom border-3 border-ng-variant fw-bold mb-3 pb-2 h3 ">
            Maggiori info
          </p>
          <Row xs={1} lg={2}>
            <Col>
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <FaGasPump className="fw-bold text-ng-variant me-2 h5 mb-0" />{" "}
                <p className="m-0 h5 ">
                  <span>Alimentazione</span> -{" "}
                  <span className="fw-bold titoloPagina">
                    {auto?.alimentazione.tipo}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <TbManualGearbox className="fw-bold text-ng-variant me-2 h5 mb-0" />{" "}
                <p className="m-0 h5 ">
                  <span>Cambio</span> -{" "}
                  <span className="fw-bold titoloPagina">
                    {auto?.cambio.tipo}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <BsDropletFill className="fw-bold text-ng-variant me-2 h5 mb-0" />{" "}
                <p className="m-0 h5 ">
                  <span>Cilindrata (cc)</span> -{" "}
                  <span className="fw-bold titoloPagina">
                    {auto?.cilindrata}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <AiFillCar className="fw-bold text-ng-variant me-2 h5 mb-0" />{" "}
                <p className="m-0 h5 ">
                  <span>Carrozzeria</span> -{" "}
                  <span className="fw-bold titoloPagina">
                    {auto?.carrozzeria}
                  </span>
                </p>
              </div>{" "}
              {auto?.condizione !== "nuova" && auto?.anno > 1900 && (
                <div className="d-flex align-items-bottom mb-3">
                  {" "}
                  <FaCalendarAlt className="fw-bold text-ng-variant me-2 h5 mb-0" />{" "}
                  <p className="m-0 h5 ">
                    <span>Anno immatricolazione </span> -{" "}
                    <span className="fw-bold titoloPagina">{auto?.anno}</span>
                  </p>
                </div>
              )}
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <IoMdColorPalette className="fw-bold text-ng-variant me-2 h5 mb-0 " />{" "}
                <p className="m-0 h5 ">
                  <span>Colore </span> -{" "}
                  <span className="fw-bold titoloPagina">{auto?.colore}</span>
                </p>
              </div>
            </Col>
            <Col>
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <FaRoad className="fw-bold text-ng-variant me-2 h5 mb-0  mt-1" />{" "}
                <p className="m-0 h5 ">
                  <span>Km </span> -{" "}
                  <span className="fw-bold titoloPagina">{auto?.km}</span>
                </p>
              </div>
              <div className="d-flex align-items-bottom mb-3">
                {" "}
                <BsFillLightningChargeFill className="fw-bold text-ng-variant me-2 h5 mb-0 " />{" "}
                <p className="m-0 h5 ">
                  <span>Potenza (CV) </span> -{" "}
                  <span className="fw-bold titoloPagina">
                    {auto?.potenza_cv}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <Accordion className="rounded-4 shadow-md">
            <Accordion.Item eventKey="0" className="rounded-4">
              <Accordion.Header className="border rounded-4 border-1 border-ng-variant box-shadow-bottom">
                <p className="text-center mb-0 mx-auto rounded-4 fw-bold h5 text-ng-variant">
                  Più informazioni
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <p className="m-0 fw-bold text-break">{auto?.note}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      {profileMe !== null &&
        profileMe?.ruolo === "ADMIN" &&
        auto?.condizione === "noleggio" && (
          <>
            <p className="mt-5 mb-0 text-center fw-bold h1 font-titoli titoloPagina">
              Richieste noleggio dell'auto
            </p>

            <ListaRichieste
              url={
                "http://localhost:3001/noleggio?idAutoRichiesta=" +
                auto?.id +
                "&"
              }
              effettuarichiestamodale={effettuaRichiestaModale}
              seteffettuarichiestamodale={(azione) =>
                setEffettuaRichiestaModale(azione)
              }
              auto={auto}
            />
          </>
        )}
      {detailsModal && (
        <DettaglioImg
          show={detailsModal}
          onHide={() => setDetailsModal(false)}
          img={imgSelected}
          auto={auto}
          detailsautofetch={() => detailsAutoFetch()}
        />
      )}
      {addImgModale && (
        <ModalAddFoto
          show={addImgModale}
          onHide={() => setAddImgModale(false)}
          auto={auto}
          detailsautofetch={() => detailsAutoFetch()}
        />
      )}
      {modificaModale && (
        <ModalModAuto
          show={modificaModale}
          onHide={() => setModificaModale(false)}
          auto={auto}
          detailsautofetch={() => detailsAutoFetch()}
        />
      )}

      {eliminaModale && (
        <ModalEliminaAuto
          show={eliminaModale}
          onHide={() => setEliminaModale(false)}
          auto={auto}
        />
      )}
    </Container>
  );
};
export default DetailAuto;
