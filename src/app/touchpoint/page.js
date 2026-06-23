"use client";
import "./touchpoint.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Copy from "@/components/Copy/Copy";
import ContactForm from "@/components/ContactForm/ContactForm";
import CursorWeb from "@/components/CursorWeb/CursorWeb";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    label: "Management",
    line1: "Representación & Contratos",
    line2: "management@julianalvarez.com",
  },
  {
    label: "Prensa",
    line1: "Media & Comunicación",
    line2: "press@julianalvarez.com",
  },
  {
    label: "Partnerships",
    line1: "Sponsorships & Colaboraciones",
    line2: "partners@julianalvarez.com",
  },
];

const SOCIALS = [
  { name: "Instagram", handle: "@julianalvarez", url: "https://www.instagram.com/julianalvarez/" },
  { name: "YouTube", handle: "Julián Álvarez", url: "https://www.youtube.com/@julianalvarez" },
];

export default function Touchpoint() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const infoRef = useRef(null);

  useGSAP(() => {
    const heroImg = heroRef.current?.querySelector(".tp-hero-bg");
    if (heroImg) {
      gsap.to(heroImg, {
        scale: 1.1,
        duration: 1.5,
        ease: "power2.out",
      });
    }

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        if (heroImg) {
          heroImg.style.transform = `scale(${1 + self.progress * 0.4})`;
        }
      },
    });
  }, { scope: heroRef });

  return (
    <div className="touchpoint-page">
      <CursorWeb />
      <section className="tp-hero" ref={heroRef}>
        <div className="tp-hero-bg">
          <img src="/contact/arg.jpg" alt="" />
        </div>
        <div className="tp-hero-overlay" />
        <div className="tp-hero-content" ref={heroContentRef}>
          <Copy animateOnScroll={false}>
            <p className="tp-hero-eyebrow">Contacto</p>
          </Copy>
          <Copy animateOnScroll={false} delay={0.15}>
            <h1 className="tp-hero-title">Touchpoint</h1>
          </Copy>
          <Copy animateOnScroll={false} delay={0.3}>
            <p className="tp-hero-sub">
              Conectemos. Ya sea para prensa, partnerships o simplemente para
              compartir tu idea — este es el canal directo.
            </p>
          </Copy>
          <div className="tp-hero-scroll">
            <span className="tp-scroll-indicator">
              <MdOutlineArrowOutward />
            </span>
          </div>
        </div>
      </section>

      <section className="tp-info" ref={infoRef}>
        <div className="tp-info-grid">
          <div className="tp-info-header">
            <Copy animateOnScroll={true}>
              <h2>Canales oficiales</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.15}>
              <p className="bodyCopy">
                Para consultas profesionales, contactanos a través de los
                siguientes canales.
              </p>
            </Copy>
          </div>
          <div className="tp-info-cards">
            {CONTACT_INFO.map((item, i) => (
              <div className="tp-info-card" key={i}>
                <Copy animateOnScroll={true} delay={0.1 * i}>
                  <p className="tp-info-card-label">{item.label}</p>
                </Copy>
                <Copy animateOnScroll={true} delay={0.1 * i + 0.1}>
                  <p className="tp-info-card-line">{item.line1}</p>
                </Copy>
                <Copy animateOnScroll={true} delay={0.1 * i + 0.2}>
                  <p className="tp-info-card-email">{item.line2}</p>
                </Copy>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-social">
        <div className="tp-social-grid">
          <Copy animateOnScroll={true}>
            <h2>Redes sociales</h2>
          </Copy>
          <div className="tp-social-links">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-social-link"
              >
                <Copy animateOnScroll={true} delay={0.1 * i}>
                  <span className="tp-social-name">{s.name}</span>
                </Copy>
                <Copy animateOnScroll={true} delay={0.1 * i + 0.1}>
                  <span className="tp-social-handle">{s.handle}</span>
                </Copy>
                <MdOutlineArrowOutward className="tp-social-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
