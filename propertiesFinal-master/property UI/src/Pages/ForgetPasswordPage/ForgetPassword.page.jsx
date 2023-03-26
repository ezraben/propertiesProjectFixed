import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import recoverPasswordSchema from "../../validation/recoverPassword.validation";
import Joi from "joi-browser";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ForgetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { keyParam, iv, encryptedData } = useParams();

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handlesetConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const history = useHistory();
  const handelSubmit = (ev) => {
    ev.preventDefault();
    const validatedVlue = Joi.validate(
      { password, confirmPassword },
      recoverPasswordSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedVlue;
    if (error) {
      console.log("invalid", error.details, { error });
      for (let i = 0; i < error.details.length; i++) {
        console.log("i", i);
        toast.error(error.details[i].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      if (password === confirmPassword) {
        axios
          .post(`/auth/recoverPassword/${keyParam}/${iv}/${encryptedData}`, {
            password,
          })
          .then((data) => {
            console.log("success", data);
            toast.success("🦄 Password updated successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            history.push("/LoginPage");
          })
          .catch((err) => {
            console.log(err);
            for (let i = 0; i < err.length; i++) {
              toast.error(error.details[i].message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
      }
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <h1>Please enter a new password and click the send button</h1>
      <div className="card-body px-5 ">
        <div className="form-outline">
          <label className="form-label" htmlFor="password">
            New password
          </label>
          <input
            type="password"
            id="password"
            className="form-control my-3"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <div className="form-outline">
          <label className="form-label" htmlFor="typeEmail">
            Confirm new password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control my-3"
            onChange={handlesetConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        {confirmPassword.length > 3 && confirmPassword !== password && (
          <div className="alert alert-warning">
            password and confirm password must match
          </div>
        )}
        <div className="text-center">
          <button className="btn btn-success  ">Send</button>
        </div>
      </div>
    </form>
  );
};

export default ForgetPasswordPage;
