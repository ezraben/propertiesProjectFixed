import { useState } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBan } from "@fortawesome/free-solid-svg-icons";
const LikedPropertyComponent = (props) => {
  
  const [id, setId] = useState(props._id);
  const userData = useSelector((state) => state.auth.userData);
  const [email, setEmail] = useState(userData.email);

  const handelSubmit = (ev) => {
    ev.preventDefault();
  };
  const handelIdChange = (ev) => {
    setId(ev.target.value);
  };
 
  const handelEmailChange = (ev) => {
    setEmail(ev.target.value);
  };


  const hendeleConfirmClick = (ev) => {
    setId(props.id);

    let dataToSend = { id, email: userData.email };

    props.onLikeDone(dataToSend);
  };
  const handleCanceleLike = () => {
    props.onLikeCancel();
  };
  const handelFormClick = (ev) => {
    ev.stopPropagation();
  };
  return (
    <div className="center-wrapper" onClick={handleCanceleLike}>
      <form
        onSubmit={handelSubmit}
        onClick={handelFormClick}
        className="center-form "
      >
        <div className="mb-3">
          <h3>to add this property to liked properties?</h3>
        </div>

        <div className="container ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={handelEmailChange}
          />

          <label htmlFor="exampleInputId" className="form-label">
            Id
          </label>
          <input
            type="id"
            className="form-control mb-5"
            id="exampleInputid1"
            aria-describedby="idHelp"
            value={id}
            onChange={handelIdChange}
          />

          <div className="container d-flex justify-content-around">
            <div>
              <button
                type="submit"
                className="btn btn-success w-100"
                onClick={hendeleConfirmClick}
              >
                confirm {""}
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-danger w-100"
                onClick={handleCanceleLike}
              >
                cancel {""}
                <FontAwesomeIcon icon={faBan} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LikedPropertyComponent;
