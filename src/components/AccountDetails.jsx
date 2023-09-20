import { useDispatch, useSelector } from "react-redux";
import { DetailsProfileFetch, setProfileAction } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";

const AccountDetails = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const params = useParams();
  let profileMe = useSelector((state) => state.profilo.me);
  let profileDetail = useSelector((state) => state.profilo.dettaglioAccount);
  useEffect(() => {
    dispatch(DetailsProfileFetch(params.id));
  }, [params.id]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setProfileAction(null));
    navigate("/login");
  };
  return (
    <Container>
      {profileMe?.id === profileDetail?.id && (
        <Button variant="ng-variant" onClick={() => handleLogout()}>
          logout
        </Button>
      )}
    </Container>
  );
};
export default AccountDetails;
