import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CardComponent from "../../Components/CardComponent/Card.component";

import { cloneDeep } from "lodash";
import EditPopUPComponent from "../../Components/editPropertyPopup/EditePropertyPopUp.component";
import { log } from "joi-browser";
import LikedPropertyComponent from "../../Components/likedPropertyComponent/LikedProperty.component";

import cradComponentCss from "../../Components/CardComponent/cardComponentCss.css";

const DashbordPage = () => {
  const [cardsArr, setCardsArr] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [likedPropertyId, setLikedPropertyId] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showLikedPropertyPopUp, setShowLikedPropertyPopUp] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [_id, set_id] = useState({});
  const history = useHistory();

  useEffect(() => {
    getAllCards();
  }, [dataToEdit, likedPropertyId]);

  const handleDeleteCard = (id) => {
    axios
      .delete(`/properties/${id}`)

      .then((res) => {
        let newCardsArr = cloneDeep(cardsArr);
        newCardsArr = newCardsArr.filter((item) => item._id !== id);
        setCardsArr(newCardsArr);
        toast.success("🦄 Card deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("🦄 something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleShowPopUP = (id) => {
    setShowEditPopUp(true);
    let ktemp = cloneDeep(cardsArr.find((item) => item._id === id));
    setDataToEdit(ktemp);

    setDataToEdit(cardsArr.find((item) => item._id === id));
  };

  const handleCanceleEdit = () => {
    setShowEditPopUp(false);
  };
  const handleEditCard = (
    _id,
    price,
    description,
    city,
    address,

    extraInfo,
    upDatedProperty
  ) => {
    axios
      .put(
        `/properties/${_id}/${price}/${description}/${city}/${address}/${extraInfo}`
      )

      .then((res) => {
        let newArrOfCards = cloneDeep(cardsArr);

        let cardItemIndx = newArrOfCards.findIndex((item) => item._id === _id);
        if (cardItemIndx !== -1) {
          newArrOfCards[cardItemIndx] = { ...cloneDeep(upDatedProperty), _id };

          setCardsArr(newArrOfCards);
          toast.success("🦄 Card updated successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShowEditPopUp(false);
        }

        setDataToEdit(null);
      })
      .catch((err) => {
        console.log(err);
        toast("error");
      });
  };

  const handleShowLikedPopUP = (id) => {
    setShowLikedPropertyPopUp(true);
    let ktemp = cloneDeep(cardsArr.find((item) => item._id === id));
    setLikedPropertyId(ktemp);

    setLikedPropertyId(
      cardsArr.find((item) => item._id === id),
      userData.email
    );
  };
  const handleCanceleLike = () => {
    setShowLikedPropertyPopUp(false);
  };

  const handleLikeCard = (_id) => {
    axios
      .get(`properties/likedProperties/${_id.id}`)

      .then((res) => {
        toast.success("🦄 woop woop you just licked this property", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        axios
          .post(
            `/properties/addLikedPropertyId?id=${_id.id}&email=${_id.email}`
          )
          .then(({ data }) => {})

          .catch((err) => {
            console.log(" err from axios", err);
          });

        setShowLikedPropertyPopUp(false);

        setLikedPropertyId(null);
      })
      .catch((err) => {
        console.log(err);

        toast("error");
      });
  };

  const getAllCards = () => {
    if (!userData.email) {
    }
    axios
      .get(`/properties?userEmail=${userData.email}`)

      .then((res) => {
        setCardsArr(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error("cannot get cards", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const getCardId = (id) => {
    let card = cardsArr.find((item) => item._id === id);

    let cardId = card._id;

    set_id(cardId);
    if (id) {
      history.push("/SpecificPropertyPage", { id: id });
    }
  };

  const renderRowsFromArr = (arrOfItems) => {
    let newArr = [];
    let inArr = [];
    let l = arrOfItems.length;
    for (let i = 0; i < l; i++) {
      if (i > 0 && i % 3 === 0) {
        newArr = [
          ...newArr,
          <div className="row" key={i + "cards row"}>
            {[...inArr]}
          </div>,
        ];
        inArr = [];
      }
      inArr = [
        ...inArr,

        <div key={arrOfItems[i]._id} className="col col-lg-4 ">
          <CardComponent
            key={arrOfItems[i]._id + "_child"}
            {...arrOfItems[i]}
            onDelete={handleDeleteCard}
            onEdit={handleShowPopUP}
            onLike={handleShowLikedPopUP}
            onSeeProperty={getCardId}
          />
        </div>,
      ];
    }
    if (inArr.length > 0) {
      newArr = [
        ...newArr,
        <div className="row" key={l + "cards row"}>
          {[...inArr]}
        </div>,
      ];
    }
    return newArr;
  };
  return (
    <div className="topSpaceFromNav">
      <h1> Your Dashboard</h1>
      {cardsArr.length === 0 && (
        <div>
          <h1 className="noCardMsg">
            Your cards will show up here after you create them
          </h1>
          <div className="text-center">
            <Link to={"/CreateCardComponent"}>
              <button className=" btn btn-primary text-center ">
                Create Property card
              </button>
            </Link>
          </div>
        </div>
      )}

      {renderRowsFromArr(cardsArr)}
      {showEditPopUp && (
        <EditPopUPComponent
          onEditCancel={handleCanceleEdit}
          onEditDone={handleEditCard}
          {...dataToEdit}
        />
      )}
      {showLikedPropertyPopUp && (
        <LikedPropertyComponent
          onLikeCancel={handleCanceleLike}
          onLikeDone={handleLikeCard}
          {...likedPropertyId}
        />
      )}
    </div>
  );
};

export default DashbordPage;
