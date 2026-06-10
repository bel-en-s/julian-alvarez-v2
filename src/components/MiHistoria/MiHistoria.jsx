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
          <h4>“Antes de los estadios llenos, los títulos y las finales, hubo un sueño. Desde chico fui hincha de River. Esa camiseta no era solo un club, era una ilusión que me acompañó desde el primer día que toqué una pelota.” </h4>
        </Copy>
      </div>
    </section>
  );
}
