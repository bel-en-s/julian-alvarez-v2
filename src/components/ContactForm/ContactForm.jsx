import "./ContactForm.css";

import { MdOutlineArrowOutward } from "react-icons/md";
import BrandIcon from "../BrandIcon/BrandIcon";

const ContactForm = ({ cardOnly }) => {
  if (cardOnly) {
    return (
      <div className="contact-form-container">
        <div className="cf-header">
          <h4>Entremos en contacto</h4>
        </div>
        <div className="cf-copy">
          <p className="bodyCopy sm">
            Entremos en contacto
          </p>
        </div>
        <div className="cf-input">
          <input type="text" placeholder="Enter Signal Address" />
        </div>
        <div className="cf-submit">
          <MdOutlineArrowOutward />
        </div>
        <div className="cf-footer">
          <div className="cf-divider"></div>
          <div className="cf-footer-copy">
            <p className="bodyCopy sm">
              No marketing cycles. Just rare, coded dispatches.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="contact-form">
      <div className="contact-parallax-image-wrapper">
        {/* <h1>Nrmlss</h1> */}
        <img src="contact-form/gol.jpg" alt="" />
      </div>
      <div className="contact-form-container">
        <div className="cf-header">
          <h4>Entremos en contacto</h4>
        </div>
        <div className="cf-copy">
          <p className="bodyCopy sm">
            Entremos en contacto
          </p>
        </div>
        <div className="cf-input">
          <input type="text" placeholder="Enter Signal Address" />
        </div>
        <div className="cf-submit">
          <MdOutlineArrowOutward />
        </div>
        <div className="cf-footer">
          <div className="cf-divider"></div>
          <div className="cf-footer-copy">
            <p className="bodyCopy sm">
              No marketing cycles. Just rare, coded dispatches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
