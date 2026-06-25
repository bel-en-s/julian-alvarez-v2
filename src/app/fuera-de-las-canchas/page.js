"use client";

import "./fuera-de-las-canchas.css";
import { useRef, useEffect, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";
import ContactForm from "@/components/ContactForm/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const GRID = [
  { src: "/fuera-de-las-canchas/BAYER/BAYER-13.jpg", brand: "Bayer 04 Leverkusen" },
  { src: "/fuera-de-las-canchas/XBOTGO/Xbotgo-4.jpg", brand: "Xbot Go" },
  { src: "/fuera-de-las-canchas/XIAOMI/ANUNCIO/01.jpg", brand: "Xiaomi" },
  { src: "/fuera-de-las-canchas/ADIDAS/597160232_1326487642847729_5803140599754485605_n.jpg", brand: "Adidas" },
];

export default function FueraDeLasCanchas() {
  const sectionRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

  useGSAP(() => {
    const targets = sectionRef.current.querySelectorAll(
      ".fdc-hero-inner > *:not([data-copy-wrapper])"
    );
    if (!targets.length) return;

    gsap.set(targets, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(targets, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      overwrite: "auto",
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className="fdc" ref={sectionRef}>
      <div className="fdc-herald" aria-hidden="true">9</div>

      <div className="fdc-hero">
        <video className="fdc-bg-video" src="/fuera-de-las-canchas/Video/Web_Julian.mp4" autoPlay muted loop playsInline />
        <div className="fdc-hero-inner">
          <p className="eyebrow fdc-eyebrow">Fuera de las canchas</p>
          <Copy animateOnScroll={false}>
            <h1>FUERA<em>DE LAS CANCHAS</em></h1>
          </Copy>
          <Copy animateOnScroll={false}>
            <p className="fdc-lede">
              Más allá del estadio, la vida también se juega. Patrocinios, viajes, momentos y gente que construyen el día a día.
            </p>
          </Copy>
        </div>
      </div>

      <div className="fdc-grid-section">
        <div className="fdc-head">
          <p className="eyebrow">Colaboraciones</p>
          <h2>Marcas que me acompañan</h2>
          <p className="fdc-sub">Una selección de los proyectos y socios que forman parte de este camino.</p>
        </div>
        <div className="fdc-grid-mixed">
          {GRID.map((item, i) => (
            <div className="fdc-grid-item" key={i}>
              <img src={item.src} alt={item.brand} loading={i < 2 ? "eager" : "lazy"} />
              <div className="fdc-grid-label">
                <span>{item.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
