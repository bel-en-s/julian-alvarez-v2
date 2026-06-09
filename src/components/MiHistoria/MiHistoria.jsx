"use client";

import "./MiHistoria.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Copy from "../Copy/Copy";

const CARDS = [
  {
    name: "Kai Tanaka",
    role: "Creative Director",
    img: "/curtain/balon.png",
  },
];

export default function MiHistoria() {
  const cardRef = useRef(null);
  const cuerpoRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const cuerpo = cuerpoRef.current;

    const update = () => {
      const el = card || cuerpo;
      if (!el) return;

      const p =
        parseFloat(
          getComputedStyle(el).getPropertyValue("--h-progress")
        ) || 0;

      const ww = window.innerWidth;

      if (cuerpo) {
        const pc = Math.min(p / 0.45, 1);
        const scale = 0.3 + pc * 1.2;
        const fadeOut = Math.max(0, Math.min((p - 0.35) / 0.25, 1));
        gsap.set(cuerpo, {
          xPercent: -50,
          yPercent: -50,
          scale: scale * (1 - fadeOut * 0.6),
          opacity: 1 - fadeOut,
          y: fadeOut * -80,
        });
      }

      if (card) {
        const pb = Math.max(0, Math.min((p - 0.35) / 0.65, 1));
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: (1 - pb) * ww,
          y: (1 - pb) * 200 - pb * (1 - pb) * 300,
          rotation: (1 - pb) * 720,
          scale: 0.5 + 0.5 * pb,
          opacity: 0.3 + 0.7 * pb,
        });
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <section className="behind-the-lock">
      <div className="btl-header">
        <Copy>
          <h2>MI HISTORIA</h2>
          <h3>“Antes de los estadios llenos, los títulos y las finales, hubo un sueño. Desde chico fui hincha de River. Esa camiseta no era solo un club, era una ilusión que me acompañó desde el primer día que toqué una pelota.” </h3>
        </Copy>
      </div>

      <img
        ref={cuerpoRef}
        className="btl-cuerpo"
        src="/curtain/cuerpo.png"
        alt=""
      />

      <div className="btl-cards">
        {CARDS.map((member, i) => (
          <div key={member.name} className="btl-card" ref={cardRef}>
            <div className="btl-card-img">
              <img src={member.img} alt={member.name} />
            </div>
            <div className="btl-card-content">
              <p className="lg">{member.name}</p>
              <p className="mono">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
