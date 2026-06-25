"use client";
import "./ContactForm.css";
import { useRef, useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import Copy from "../Copy/Copy";

const CONTACT_API = "/api/contact.php";

const CONTACT_TYPES = [
  { value: "partnership", label: "Partnership / Sponsorship" },
  { value: "press", label: "Press / Media" },
  { value: "management", label: "Management" },
  { value: "booking", label: "Booking / Events" },
  { value: "other", label: "Other" },
];

const ContactForm = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const headerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !type || !message) return;
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, message }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section className="contact-form">
        <div className="contact-parallax-image-wrapper">
          <img src="/contact-form/gol.webp" alt="" loading="lazy" />
        </div>
        <div className="cf-nav">
          <div className="cf-nav-row">
            <div className="cf-nav-col">
              <Copy animateOnScroll={true}>
                <p className="bodyCopy cf-nav-header">Navegación</p>
              </Copy>
              <div className="cf-nav-links">
                <Copy animateOnScroll={true} delay={0.1}>
                  <Link href="/">Index</Link>
                </Copy>
                <Copy animateOnScroll={true} delay={0.15}>
                  <Link href="/fuera-de-las-canchas">Fuera de las canchas</Link>
                </Copy>
                <Copy animateOnScroll={true} delay={0.2}>
                  <Link href="/genesis">Genesis</Link>
                </Copy>
                <Copy animateOnScroll={true} delay={0.25}>
                  <Link href="/touchpoint">Contacto</Link>
                </Copy>
              </div>
            </div>
            <div className="cf-nav-col">
              <Copy animateOnScroll={true}>
                <p className="bodyCopy cf-nav-header">Conectar redes sociales</p>
              </Copy>
              <div className="cf-nav-links">
                <Copy animateOnScroll={true} delay={0.1}>
                  <a href="https://www.instagram.com/julianalvarez/" target="_blank" rel="noopener noreferrer">Instagram</a>
                </Copy>
                <Copy animateOnScroll={true} delay={0.15}>
                  <a href="https://www.youtube.com/@julianalvarez" target="_blank" rel="noopener noreferrer">YouTube</a>
                </Copy>
              </div>
            <div className="cf-nav-ulah">
                <p style={{ color: "#ffffff" }}>«Diseñado por Ulah Marketing · 2026».</p>
            </div>
            </div>
          </div>
        </div>
        <div className="contact-form-container">
          <div className="cf-header" ref={headerRef}>
            <Copy animateOnScroll={true}>
              <h4>Entremos en contacto</h4>
            </Copy>
          </div>
          <div className="cf-copy">
            <Copy animateOnScroll={true} delay={0.15}>
              <p className="bodyCopy sm">
                Recibimos tu mensaje. Te responderemos pronto.
              </p>
            </Copy>
          </div>
          <button className="cf-reset" onClick={() => { setStatus("idle"); setName(""); setEmail(""); setType(""); setMessage(""); }}>
            Enviar otro mensaje
          </button>
          <div className="cf-footer">
            <div className="cf-divider"></div>
            <div className="cf-footer-copy">
              <p className="bodyCopy sm" style={{ color: "#ffffff" }}>«Diseñado por Ulah Marketing · 2026».</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form">
      <div className="contact-parallax-image-wrapper">
        <img src="/contact-form/gol.webp" alt="" loading="lazy" />
      </div>
      <div className="cf-nav">
        <div className="cf-nav-row">
          <div className="cf-nav-col">
            <Copy animateOnScroll={true}>
              <p className="bodyCopy cf-nav-header">Navegación</p>
            </Copy>
            <div className="cf-nav-links">
              <Copy animateOnScroll={true} delay={0.1}>
                <Link href="/">Index</Link>
              </Copy>
              <Copy animateOnScroll={true} delay={0.15}>
                <Link href="/fuera-de-las-canchas">Fuera de las canchas</Link>
              </Copy>
              <Copy animateOnScroll={true} delay={0.2}>
                <Link href="/genesis">Genesis</Link>
              </Copy>
              <Copy animateOnScroll={true} delay={0.25}>
                <Link href="/touchpoint">Contacto</Link>
              </Copy>
            </div>
          </div>
          <div className="cf-nav-col">
            <Copy animateOnScroll={true}>
              <p className="bodyCopy cf-nav-header">Conectar redes sociales</p>
            </Copy>
            <div className="cf-nav-links">
              <Copy animateOnScroll={true} delay={0.1}>
                <a href="https://www.instagram.com/julianalvarez/" target="_blank" rel="noopener noreferrer">Instagram</a>
              </Copy>
              <Copy animateOnScroll={true} delay={0.15}>
                <a href="https://www.youtube.com/@julianalvarez" target="_blank" rel="noopener noreferrer">YouTube</a>
              </Copy>
            </div>

          </div>
        </div>
      </div>
      <div className="contact-form-container">
        <div className="cf-header" ref={headerRef}>
          <Copy animateOnScroll={true}>
            <h4>Entremos en contacto</h4>
          </Copy>
        </div>
        <div className="cf-copy">
          <Copy animateOnScroll={true} delay={0.15}>
            <p className="bodyCopy sm">
              BUSINESS INQUIRIES
            </p>
          </Copy>
        </div>

        <form className="cf-fields" onSubmit={handleSubmit}>
          <div className="cf-field">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="cf-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="cf-field">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Tipo de consulta
              </option>
              {CONTACT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <textarea
              placeholder="Mensaje"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          {status === "error" && <p className="cf-msg error">Error al enviar. Intentá de nuevo.</p>}
          <button type="submit" className="cf-submit" disabled={status === "sending"}>
            <MdOutlineArrowOutward />
          </button>
        </form>

        <div className="cf-footer">
          <div className="cf-divider"></div>
          <div className="cf-footer-copy">
            <p className="bodyCopy sm" style={{ color: "#ffffff" }}>«Diseñado por Ulah Marketing · 2026».</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
