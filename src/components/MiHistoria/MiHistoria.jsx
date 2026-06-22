"use client";

import "./MiHistoria.css";

import Copy from "../Copy/Copy";
import Curtain from "../Curtain/Curtain";

export default function MiHistoria() {
  return (
    <section className="behind-the-lock">
      <Curtain />
      <div className="btl-header">
        <Copy>
          <h2>MI HISTORIA</h2>
          <h5>"Antes de los estadios llenos, los títulos y las finales, hubo un sueño. Desde chico fui hincha de River. Esa camiseta no era solo un club, era una ilusión que me acompañó desde el primer día que toqué una pelota." </h5>
        </Copy>
      </div>
    </section>
  );
}
