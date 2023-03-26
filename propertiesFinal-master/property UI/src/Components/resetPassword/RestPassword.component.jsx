import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
const ResetPasswordComponent = () => {
  const dispatch = useDispatch();
  dispatch(authActions.loggedOut());

  localStorage.clear();
  const [email, setEmail] = useState("");
  const handelEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handelSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/forgetPassword", { email })
      .then((data) => {
        console.log("data", data);
        toast.success("check your email for the recovery link", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <form onSubmit={handelSubmit} className="topSpaceFromNav">
      <h1 className="text-center mt-5">
        Forgot your password? <br />
        please enter your email and we well send you your recovery link
      </h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handelEmail}
          value={email}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary text-center m-5">send</button>
      </div>
    </form>
  );
};
export default ResetPasswordComponent;
