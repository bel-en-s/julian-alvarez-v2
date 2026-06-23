"use client";
import "./Footer.css";
import Link from "next/link";

import Copy from "../Copy/Copy";

const Footer = () => {
  return (
      <footer>
        <div className="container">
          <div className="footer-row">
            <div className="footer-col">
              <div className="footer-col-header">
                <Copy animateOnScroll={true}>
                  <p className="bodyCopy">Navegación</p>
                </Copy>
              </div>
              <div className="footer-col-links">
                <Copy animateOnScroll={true} delay={0.1}>
                  <Link href="/">Index</Link>
                </Copy>
                <Copy animateOnScroll={true} delay={0.15}>
                  <Link href="/fuera-de-las-canchas">Fuera de las canchas</Link>
                </Copy>
                <Copy animateOnScroll={true} delay={0.2}>
                  <Link href="/genesis">Fuera de las canchas</Link>
                </Copy>
                <Copy animateOnScroll={true} delay={0.25}>
                  <Link href="/touchpoint">Contacto</Link>
                </Copy>
              </div>
            </div>
            <div className="footer-col">
              <div className="footer-col-header">
                <Copy animateOnScroll={true}>
                  <p className="bodyCopy">Conectar redes sociales</p>
                </Copy>
              </div>
              <div className="footer-col-links">
                <Copy animateOnScroll={true} delay={0.1}>
                  <a
                    href="https://www.instagram.com/julianalvarez/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </Copy>
                <Copy animateOnScroll={true} delay={0.15}>
                  <a
                    href="https://www.youtube.com/@julianalvarez"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
