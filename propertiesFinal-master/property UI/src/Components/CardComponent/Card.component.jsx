import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import CardComponentCss from "./cardComponentCss.css";

const CardComponent = ({
  price,
  description,
  city,
  address,
  img,
  _id,
  onDelete,
  onEdit,
  onLike,
  onSeeProperty,
  extraInfo,
}) => {
  const handelCardClick = (ev) => {
    onSeeProperty(_id);
  };
  const hendeleDedleteBtnClick = () => {
    onDelete(_id);
  };
  const handeleEditeClick = () => {
    onEdit(_id);
  };

  const [isLikeProperty, setIsLikeProperty] = useState(false);
  const handeleLikecheckBtn = (ev) => {
    setIsLikeProperty(ev.target.checked);
    if (ev.target.checked === true) {
      onLike(_id);

      setIsLikeProperty(true);
    }
  };

  const [cardsArr, setCardsArr] = useState([]);
  const [allLickedPropertiesByUser, setAllLickedPropertiesByUser] = useState(
    []
  );

  const isAdmin = useSelector((state) => state.auth.admin);

  const userEmail = useSelector((state) => state.auth.userData.email);

  useEffect(() => {
    getAllCards();
    handleLickedCards();
  }, []);
  useEffect(() => {}, [isAdmin]);

  const handleLickedCards = () => {
    if (userEmail) {
      axios
        .get(`/properties/lickedPropertiesByUser?email=${userEmail}`)
        .then((data) => {
          if (data.data.length > 0) {
            const idesToSet = data.data.map((obj) => obj._id);
            let newArrOfCards = cloneDeep(idesToSet);

            cloneDeep(newArrOfCards);

            setAllLickedPropertiesByUser([...newArrOfCards]);
          }
        })
        .catch((err) => {
          console.log("err from axios", err);
        });
    }
  };

  const getAllCards = () => {
    axios
      .get(`/properties/allCards`)

      .then((res) => {
        setCardsArr(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
      });
  };

  return (
    <div className="card  card-pointer ">
      <img
        className="card-img-top "
        src={img}
        alt={description}
        onClick={handelCardClick}
      />
      {allLickedPropertiesByUser.map(
        (item) =>
          item === _id && (
            <h1 key={_id} className="propertyLikeMsg">
              You liked this property
            </h1>
          )
      )}

      <div className="card-body p-5 ">
        <h5 className="card-title ">
          price: <span className="cardColor">{price}</span>{" "}
        </h5>
        <h5 className="card-text">
          description: <span className="cardColor"> {description} </span>
        </h5>
        <h5 className="card-title">
          City: <span className="cardColor"> {city} </span>
        </h5>
        <h5 className="card-title">
          address: <span className="cardColor"> {address}</span>
        </h5>
        {window.location.pathname === "/allCards" && isAdmin === true && (
          <Fragment>
            <div className="starContainer">
              <input
                type="checkbox"
                className="star"
                id="likePropCheckBox"
                onChange={handeleLikecheckBtn}
                checked={isLikeProperty}
              />

              <p className="likeMsg">click the star to like the property</p>
            </div>
          </Fragment>
        )}

        {window.location.pathname === "/allCards" &&
          isAdmin === false &&
          userEmail && (
            <Fragment>
              <div className="starContainer">
                <input
                  type="checkbox"
                  className="star"
                  id="likePropCheckBox"
                  onChange={handeleLikecheckBtn}
                />

                <p className="likeMsg">click the star to like the property</p>
              </div>
            </Fragment>
          )}
        {window.location.pathname === "/LikedPropertyPage" && (
          <Fragment>
            <div className="card-body d-flex justify-content-center btnCard ">
              <button
                className="btn btn-danger"
                onClick={hendeleDedleteBtnClick}
              >
                Delete <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </Fragment>
        )}
      </div>
      {window.location.pathname === "/DashbordPage" && isAdmin === true && (
        <div
          className="card-body
        btnCard   "
        >
          <button className="btn btn-warning " onClick={handeleEditeClick}>
            Edit
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button className="btn btn-danger" onClick={hendeleDedleteBtnClick}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
