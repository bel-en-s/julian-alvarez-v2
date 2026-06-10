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
