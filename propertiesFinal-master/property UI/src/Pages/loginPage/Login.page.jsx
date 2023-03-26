import { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import axios from "axios";
import loginSchema from "../../validation/Login.validation";
import { useHistory, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, []);

  const handelEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handelPassword = (ev) => {
    setPassword(ev.target.value);
  };
  const history = useHistory();

  const handelSubmit = (ev) => {
    ev.preventDefault();
    const validatedVlue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validatedVlue;
    if (error) {
      console.log("invalid-error", { error });
    }

    if (email && password) {
      axios
        .post("/auth/login", { email, password })

        .then(({ data }) => {
          localStorage.setItem("token", data.msg);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("admin", data.msg2);

          dispatch(authActions.updateUserData(jwt_decode(data.msg)));
          console.log("data.msg", data.msg);

          if (data.status === "Success") {
            dispatch(authActions.login());
            if (data.msg2 === true) {
              dispatch(authActions.upDateIsAdmin(data.msg2));

              history.push("/DashbordPage");
            }
            if (data.msg2 === false) {
              history.push("/allCards");
            }
          }
        })

        .catch((err) => {
          console.log("err from axios", err);
          toast.error("invalid email or password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };
  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handelSubmit} className="topSpaceFromNav form-group">
        <h1 className="text-center mt-5">Please Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email@gmail.com"
            onChange={handelEmail}
            value={email}
          />
          {email.length > 0 && email.length <= 4 && (
            <div className="alert alert-warning">
              email must be an <br /> valid structure <br /> such as
              'email@gmail.com'
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
            onChange={handelPassword}
            value={password}
          />
          {password.length > 0 && password.length <= 8 && (
            <div className="alert alert-warning">
              Password must be <br /> at least 8 characters
            </div>
          )}
        </div>

        <div className="text-center">
          <button className="btn btn-primary text-center m-5">Login</button>
        </div>
        <Link to={"/ResetPasswordComponent"}>
          forgot your password click here
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
