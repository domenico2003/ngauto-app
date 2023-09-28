import { Button, Container } from "react-bootstrap";
import AutoFilter from "./AutoFilter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageAutoNoleggio = () => {
  let profileMe = useSelector((state) => state.profilo.me);
  const navigate = useNavigate();
  return (
    <Container>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div>
          <p className="text-center h1 mt-4 font-titoli mb-0  fw-bold">
            <span className="titoloPagina ">Auto per noleggio</span>
          </p>
          {profileMe !== null && profileMe?.ruolo === "ADMIN" && (
            <Button
              variant="ng-variant"
              className="w-100 fw-bold"
              onClick={() => navigate("/addAuto")}
            >
              Aggiungi auto
            </Button>
          )}
        </div>
      </div>
      <AutoFilter
        urlBase={"http://localhost:3001/automobili/all?condizione=noleggio"}
      />
    </Container>
  );
};
export default PageAutoNoleggio;
