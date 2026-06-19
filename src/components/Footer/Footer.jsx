import "./Footer.css";
import Link from "next/link";

import ContactForm from "../ContactForm/ContactForm";

const Footer = () => {
  return (
    <>
      <ContactForm />

      <footer>
        <div className="container">
          <div className="footer-row">
            <div className="footer-col">
              <div className="footer-col-header">
                <p className="bodyCopy">Navegación</p>
              </div>
              <div className="footer-col-links">
                <Link href="/">Index</Link>
                <Link href="/wardrobe">Dentro de las canchas</Link>
                <Link href="/genesis">Fuera de las canchas</Link>
                <Link href="/touchpoint">Contacto</Link>

              </div>
            </div>
            <div className="footer-col">
              <div className="footer-col-header">
                <p className="bodyCopy">Conectar redes sociales</p>
              </div>
              <div className="footer-col-links">
                <a
                  href="https://www.instagram.com/julianalvarez/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@julianalvarez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
