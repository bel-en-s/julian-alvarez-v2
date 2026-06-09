"use client";

import "./MiHistoria.css";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    name: "Kai Tanaka",
    role: "Creative Director",
    img: "/curtain/balon.png",
  },

];

export default function MiHistoria() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards.length) return;

    const stickyHeight = window.innerHeight * 7;
    const totalCards = cards.length;

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function getRadius() {
      return window.innerWidth < 900
        ? window.innerWidth * 7.5
        : window.innerWidth * 2.5;
    }

    function positionCards(progress = 0) {
      const radius = getRadius();
      const cardSpacing = 0.15;
      const initialOffset = -cardSpacing * (totalCards - 1);
      const totalTravel = 1 - initialOffset;
      const arcProgress = initialOffset + progress * totalTravel;

      cards.forEach((card, i) => {
        if (!card) return;
        const cardOffset = (totalCards - 1 - i) * cardSpacing;
        const cardProgress = cardOffset + arcProgress;
        const angle = startAngle + arcAngle * cardProgress;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

        gsap.set(card, {
          x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        });
      });
    }

    positionCards(0);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        positionCards(self.progress);
      },
    });

    const handleResize = () => {
      positionCards(trigger.progress);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <section className="behind-the-lock" ref={sectionRef}>
      <div className="btl-header">
        <Copy>
          <h2>MI HISTORIA</h2>
          <h3>“Antes de los estadios llenos, los títulos y las finales, hubo un sueño. Desde chico fui hincha de River. Esa camiseta no era solo un club, era una ilusión que me acompañó desde el primer día que toqué una pelota.” </h3>
          
          {/* <h3>"Antes de los estadios llenos, los títulos y las finales, hubo un sueño. Desde chico fui hincha de River. Esa camiseta no era solo un club, era una ilusión que me acompañó desde el primer día que toqué una pelota"</h3> */}
        </Copy>
       
      </div>

      {/* <div className="btl-footer">
        <div className="container">
          <p className="mono">Roster Verified</p>
          <p className="mono">Defectors: None</p>
        </div>
      </div> */}

      <div className="btl-cards">
        {CARDS.map((member, i) => (
          <div
            key={member.name}
            className="btl-card"
            ref={(el) => (cardsRef.current[i] = el)}
          >
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
