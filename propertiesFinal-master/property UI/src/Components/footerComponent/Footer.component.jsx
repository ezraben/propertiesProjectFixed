import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from "../../imges/ybn-logo.png";
import footerCss from "./footerCss.css";

import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const FooterComponent = () => {
  return (
    <footer className="text-center text-lg-start  text-muted footer">
      
      <section className="">
        <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
        <p>
          <i className="fas fa-home me-3"></i> Tel aviv, shalom alichem 55,
          israel
        </p>
        <div className="container d-flex justify-content-around ">
          <p className="icons">
            <a
              href=" https://wa.me/+972548193664"
              target="_blank"
              rel="noreferrer"
              className="fas fa-phone me-3"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </p>
          <p className="icons">
            <a href="mailto:ezrabn0@gmail.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </p>
          <p className="icons">
            <a
              href="https://github.com/ezraben"
              target="_blank"
              rel="noreferrer"
              className="me-4 "
            >
              <i className="fab fa-github">
                <FontAwesomeIcon icon={faGithub} />
              </i>
            </a>
          </p>
          <p className="icons">
            <a
              href="https://linkedin.com/in/ezra-ben-natan-8234a51a5"
              target="_blank"
              rel="noreferrer"
              className="me-4 "
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <i className="fab fa-linkedin"></i>
            </a>
          </p>
        </div>
      </section>
      <div className="w-25 p-3 imgFooter">
        <img
          src={logo}
          alt="logo of ybn properties"
          className="img-thumbnail "
        ></img>
      </div>

      <div
        className="text-center p-4"
        
      >
        © 2023 Copyright: EBN
      </div>
    </footer>
  );
};

export default FooterComponent;
