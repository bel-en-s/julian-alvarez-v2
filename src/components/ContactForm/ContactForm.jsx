"use client";
import "./ContactForm.css";
import { useRef, useCallback } from "react";

import { MdOutlineArrowOutward } from "react-icons/md";
import BrandIcon from "../BrandIcon/BrandIcon";
import Copy from "../Copy/Copy";



const ContactForm = ({ cardOnly }) => {
  const headerRef = useRef(null);
 

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
          <input type="text" placeholder="Deja tu mail" />
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
        <img src="/contact-form/gol.jpg" alt="" />
      </div>
      <div className="contact-form-container">
        <div className="cf-header" ref={headerRef} >
          <Copy animateOnScroll={true}>
            <h4>Entremos en contacto</h4>
          </Copy>
        </div>
        <div className="cf-copy">
          <Copy animateOnScroll={true} delay={0.15}>
            <p className="bodyCopy sm">
             BUISNESS INQUIRIES
            </p>
          </Copy>
        </div>
        <div className="cf-input">
          <input type="text" placeholder="Deja tu mail" />
        </div>
        <div className="cf-submit">
          <MdOutlineArrowOutward />
        </div>
        <div className="cf-footer">
          <div className="cf-divider"></div>
          <div className="cf-footer-copy">
            <Copy animateOnScroll={true} delay={0.3}>
              <p className="bodyCopy sm">
                «Diseñado por Ulah Marketing · 2026».
              </p>
            </Copy>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
