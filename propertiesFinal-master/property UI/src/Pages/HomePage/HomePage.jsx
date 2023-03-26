import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import homePageCss from "./homPageCss.css";

const HomePage = () => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Fragment>
      <h1 className="">YBN Properties since 1979</h1>
      <div
        id="carouselExampleCaptions"
        className="carousel slide "
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2014/08/03/23/41/house-409451_960_720.jpg"
              alt="Beautiful house img"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Join us today </h5>
              <p>Don't miss out.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2019/10/17/02/39/villa-4555824_960_720.jpg"
              alt="swimming pool in a house"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>30 years of experience </h5>
              <p>This can be your house.</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      {userData.email && (
        <div>
          <h3 className="text-center pt-5">
            check out the properties on the site
          </h3>
          <h4 className="text-center pt-2">
            <Link to={"/allCards"}>Click here</Link>
          </h4>{" "}
        </div>
      )}

      {!userData.email && (
        <div className="container pt-5">
          <h3 className="text-center pb-5">Join us today</h3>
          <h3 className="d-flex justify-content-around">
            <Link to={"/LoginPage"}>
              <button className="btn btn-primary">
                Login <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </Link>{" "}
            <Link to={"/SignupPage"}>
              <button className="btn btn-primary">
                Sign up <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </Link>
          </h3>
        </div>
      )}
    </Fragment>
  );
};

export default HomePage;
