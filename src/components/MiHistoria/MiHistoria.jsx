"use client";
import "./MiHistoria.css";

const cards = [
  { name: "Toque Fino", desc: "La pelota nunca se queja. Solo vuelve.", img: "/team-cards/futbol.webp" },
  { name: "Gol de Media", desc: "Distancia corta, sueño largo.", img: "/team-cards/futbol.webp" },
  { name: "Doble Amague", desc: "El pie dice una cosa, el alma otra.", img: "/team-cards/futbol.webp" },
  { name: "Pase al Vacío", desc: "No hay mejor mensaje que el que se adivina.", img: "/team-cards/futbol.webp" },
  { name: "Jogo Bonito", desc: "Brasil lo inventó. Argentina lo vive.", img: "/team-cards/futbol.webp" },
  { name: "Eléctrico", desc: "La cancha se achica cuando él aparece.", img: "/team-cards/Anexo-4.webp" },
  { name: "Instinto", desc: "El gol no se piensa, se siente.", img: "/team-cards/Anexo 9.webp" },
  { name: "Eternidad", desc: "Cada partido es un recuerdo naciendo.", img: "/team-cards/Anexo 10.webp" },
];

export default function MiHistoria() {
  return (
    <section className="mi-historia">
      {/* desktop */}
      <div className="mh-desktop">
        <div className="mh-header">
          <h1>Mi historia</h1>
        </div>
        {cards.map((card, i) => (
          <div className="mh-card" key={i} data-card={i}>
            <div className="mh-card-img">
              <img src={card.img} alt={card.name} />
            </div>
            <div className="mh-card-content">
              <div className="mh-card-title"><h6>{card.name}</h6></div>
              <div className="mh-card-desc"><p>{card.desc}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* mobile */}
      <div className="mh-mobile">
        <div className="mh-mobile-header">
          <h1>Mi historia</h1>
        </div>
        {cards.map((card, i) => (
          <div className="mh-card" key={i}>
            <div className="mh-card-img">
              <img src={card.img} alt={card.name} />
            </div>
            <div className="mh-card-content">
              <div className="mh-card-title"><h6>{card.name}</h6></div>
              <div className="mh-card-desc"><p>{card.desc}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
