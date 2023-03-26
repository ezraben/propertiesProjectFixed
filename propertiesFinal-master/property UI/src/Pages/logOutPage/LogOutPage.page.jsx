import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useHistory } from "react-router-dom";

const LogOutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(authActions.loggedOut());
    localStorage.clear();
    history.push("/");
  }, []);
  return <div></div>;
};

export default LogOutPage;
