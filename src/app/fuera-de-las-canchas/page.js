"use client";

import "./fuera-de-las-canchas.css";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const MOMENTOS = [
  {
    title: "De la Quiaca a…",
    desc: "las giras más locas del mundo. Cada destino nuevo es un partido que no está en el fixture pero se juega con la misma intensidad.",
  },
  {
    title: "Conexión con la gente",
    desc: "No hay título más grande que el cariño de la gente. Un abrazo, una foto, un \"gracias, crack\"… eso no se entrena, se vive.",
  },
  {
    title: "Días libres",
    desc: "Cuando el partido termina, la vida real empieza. Familia, amigos, el pueblo, el asado, la siesta, los que siempre estuvieron.",
  },
];

export default function FueraDeLasCanchas() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          });
        },
      });
    }, sectionRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setPlaying(true); }
    else { video.pause(); setPlaying(false); }
  };

  return (
    <section className="fdc" ref={sectionRef}>
      <div className="fdc-herald" aria-hidden="true">9</div>

      <div className="fdc-hero">
        <div className="fdc-hero-inner">
          <p className="eyebrow fdc-eyebrow">Fuera de las canchas</p>
          <Copy animateOnScroll={false}>
            <h1>FUERA<em>DE LAS CANCHAS</em></h1>
          </Copy>
          <Copy animateOnScroll={false}>
            <p className="fdc-lede">
              Detrás de los 90 minutos hay una vida entera. Viajes, descanso, gente, momentos que no aparecen en la planilla pero construyen al jugador.
            </p>
          </Copy>
          <div className="fdc-stats">
            <div className="fdc-stat"><b>+50</b><span>Ciudades visitadas</span></div>
            <div className="fdc-stat"><b>∞</b><span>Historias</span></div>
            <div className="fdc-stat"><b>1</b><span>Pasión</span></div>
          </div>
        </div>
      </div>

      <div className="fdc-video-section">
        <header ref={headerRef} className="fdc-head">
          <Copy><p className="eyebrow">01 · Fuera del radar</p></Copy>
          <Copy><h2>La otra cara del 9</h2></Copy>
          <Copy><p className="fdc-sub">Lo que pasa cuando nadie está mirando. Los días libres, los viajes, la vida que no sale en la tele.</p></Copy>
        </header>

        <div className="fdc-video-wrapper">
          <video
            ref={videoRef}
            src="/home/julian-chiquito.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="auto"
            onClick={togglePlay}
          />
          <button className="fdc-play-btn" onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"}>
            {playing ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
        </div>
      </div>

      <div className="fdc-momentos">
        <header className="fdc-head momentos-head">
          <Copy><p className="eyebrow">02 · Galería</p></Copy>
          <Copy><h2>Momentos<br />que quedan</h2></Copy>
          <Copy><p className="fdc-sub">Tres historias, un solo protagonista. Fuera de la cancha también se construye el mito.</p></Copy>
        </header>

        <div className="fdc-grid">
          {MOMENTOS.map((m, i) => (
            <article key={i} className="fdc-card">
              <div className="fdc-card-img">
                <img src={`/bio/${i + 1}.jpeg`} alt="" loading="lazy" />
              </div>
              <div className="fdc-card-body">
                <span className="fdc-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="fdc-card-title">{m.title}</h3>
                <p className="fdc-card-desc">{m.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
