"use client";
import "./ContactForm.css";
import { useRef, useCallback } from "react";

import { MdOutlineArrowOutward } from "react-icons/md";
import BrandIcon from "../BrandIcon/BrandIcon";
import Copy from "../Copy/Copy";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

const scrambleText = (el) => {
  const lines = el.querySelectorAll(".line");
  if (!lines.length) return;
  const originals = [];
  lines.forEach((line) => originals.push(line.textContent));
  let frame = 0;
  const totalFrames = 60;

  const tick = () => {
    frame++;
    const progress = frame / totalFrames;
    lines.forEach((line, li) => {
      const original = originals[li];
      let result = "";
      for (let i = 0; i < original.length; i++) {
        if (progress > i / original.length) {
          result += original[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      line.textContent = result;
    });
    if (frame < totalFrames) {
      requestAnimationFrame(tick);
    } else {
      lines.forEach((line, li) => { line.textContent = originals[li]; });
    }
  };

  tick();
};

const ContactForm = ({ cardOnly }) => {
  const headerRef = useRef(null);
  const handleHover = useCallback(() => {
    const h4 = headerRef.current?.querySelector("h4");
    if (h4) scrambleText(h4);
  }, []);

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
        <img src="/contact-form/gol.jpg" alt="" />
      </div>
      <div className="contact-form-container">
        <div className="cf-header" ref={headerRef} onMouseEnter={handleHover}>
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
          <input type="text" placeholder="Enter Signal Address" />
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
