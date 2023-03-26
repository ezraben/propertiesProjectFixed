import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "../../Components/CardComponent/Card.component";
import { cloneDeep } from "lodash";

import { Link, useHistory } from "react-router-dom";

const LikedPropertyPage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const userTest = useSelector((state) => state.auth.userData);
  const [cardsArr, setCardsArr] = useState([]);
  const [_id, set_id] = useState({});
  const history = useHistory();
  useEffect(() => {
    handleLickedCards();
  }, []);

  const arrTest = [];

  const handleLickedCards = () => {
    axios
      .get(`/properties/lickedPropertiesByUser?email=${userData.email}`)
      .then((data) => {
        if (data.data.length > 0) {
          const idesToSet = data.data.map((id) => id);

          setCardsArr(idesToSet);
        }
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  };

  const removeLIckedProperty = (id) => {
    axios

      .put(`/properties/removeFavoriteProp/:?id=${id}&email=${userData.email}`)
      .then(() => {
        let newCardsArr = cloneDeep(cardsArr);
        newCardsArr = newCardsArr.filter((item) => item._id !== id);
        setCardsArr(newCardsArr);
        toast.success(
          "🦄 the property was removed successfully from your licked properties",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      })
      .catch((err) => {
        console.log("err", err);
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
            onDelete={removeLIckedProperty}
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
    <div>
      <h1>LikedPropertyPage</h1>
      {cardsArr.length === 0 && (
        <div>
          <h1 className="noCardMsg">
            your liked cards will show up here after you liked them in the all
            cards page
          </h1>
          <div className="text-center">
            <Link to={"/allCards"}>
              <button className="btn btn-primary">
                Click here for all card page
              </button>
            </Link>
          </div>
        </div>
      )}
      {renderRowsFromArr(cardsArr)}
    </div>
  );
};

export default LikedPropertyPage;
