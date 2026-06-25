"use client";

import "./dentro.css";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";
import { fetchPartidos } from "@/lib/sheets";

gsap.registerPlugin(ScrollTrigger);

const TROFEOS = [
  { name: "Copa del Mundo", n: 1, club: "Argentina", year: "22" },
  { name: "Copa América", n: 2, club: "Argentina", years: ["20/21", "23/24"] },
  { name: "Copa CONMEBOL-UEFA", n: 1, club: "Argentina", year: "21/22" },
  { name: "Champions League", n: 1, club: "Manchester City", year: "22/23" },
  { name: "Campeón de Inglaterra", n: 2, club: "Manchester City", years: ["22/23", "23/24"] },
  { name: "FA Cup", n: 1, club: "Manchester City", year: "23" },
  { name: "Mundial de Clubes", n: 1, club: "Manchester City", year: "23" },
  { name: "Supercopa de Europa", n: 1, club: "Manchester City", year: "23/24" },
  { name: "Community Shield", n: 1, club: "Manchester City", year: "24/25" },
  { name: "Copa Libertadores", n: 1, club: "CA River Plate", year: "17/18" },
  { name: "Campeón de Argentina", n: 1, club: "CA River Plate", year: "21" },
  { name: "Copa Argentina", n: 1, club: "CA River Plate", year: "18/19" },
  { name: "Supercopa Argentina", n: 1, club: "CA River Plate", year: "19/20" },
  { name: "Trofeo de Campeones", n: 1, club: "CA River Plate", year: "20/21" },
  { name: "Jugador de la Temporada", n: 1, club: "Argentina", year: "21" },
  { name: "Goleador", n: 2, desc: ["18 goles", "2 goles"] },
];

const PARTIDOS_FALLBACK = [
  {
    n: 1,
    fecha: "18 · Oct · 2024 · LaLiga · Jornada 9",
    fixture: "Atlético de Madrid",
    rival: "Real Sociedad",
    lugar: "Estadio Metropolitano · Madrid",
    fotos: ["/bio/1.jpeg", "/bio/Anexo 1.jpeg", "/bio/Anexo 2.jpeg", "/bio/3.jpeg", "/bio/Anexo 5.jpeg"],
  },
  {
    n: 2,
    fecha: "23 · Oct · 2024 · Champions League · Fecha 2",
    fixture: "Atlético de Madrid",
    rival: "AC Milan",
    lugar: "San Siro · Milán",
    fotos: ["/bio/2.jpeg", "/bio/Anexo 2.jpeg", "/bio/Anexo-3.jpeg", "/bio/4.jpg", "/bio/Anexo 5.jpeg"],
  },
  {
    n: 3,
    fecha: "27 · Oct · 2024 · LaLiga · Jornada 11",
    fixture: "Atlético de Madrid",
    rival: "FC Barcelona",
    lugar: "Spotify Camp Nou · Barcelona",
    fotos: ["/bio/3.jpeg", "/bio/Anexo-3.jpeg", "/bio/4.jpg", "/bio/Anexo 5.jpeg", "/bio/Anexo 6.webp"],
  },
];

export default function DentroDeLasCanchas() {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [partidos, setPartidos] = useState(PARTIDOS_FALLBACK);

  useEffect(() => {
    fetchPartidos().then((data) => {
      if (data.length) setPartidos(data);
    });
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "var(--base-600)";
    return () => { document.body.style.backgroundColor = ""; };
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
            overwrite: "auto",
          });
        },
      });
    }, sectionRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  useGSAP(() => {
    const targets = heroRef.current?.querySelectorAll(
      ".ph-inner > *:not([data-copy-wrapper])"
    );
    if (!targets?.length) return;

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
  }, { scope: heroRef, dependencies: [] });

  return (
    <>
      <section className="ph" id="top" ref={heroRef}>
        <div className="ph-dorsal" aria-hidden="true">9</div>
        <div className="ph-inner">
          <p className="eyebrow ph-eyebrow">Dentro de las canchas</p>
          <Copy animateOnScroll={false}>
            <h1>DENTRO<em>DE LAS CANCHAS</em></h1>
          </Copy>
          <Copy animateOnScroll={false}>
            <p className="ph-lede">Cada partido cuenta una historia. Primero, los títulos que construyeron la carrera. Debajo, las fotos de cada noche — partido a partido.</p>
          </Copy>
          <div className="ph-stats">
            <div className="ph-stat"><b>16</b><span>Títulos</span></div>
            <div className="ph-stat"><b>3</b><span>Distinciones</span></div>
            <div className="ph-stat"><b>3</b><span>Camisetas</span></div>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="palmares" id="palmares">
        <header ref={headerRef} className="palmares-head">
          <Copy>
            <p className="eyebrow">01 · Palmarés</p>
          </Copy>
          <Copy>
            <h2>Los títulos</h2>
          </Copy>
          <Copy>
            <p className="palmares-sub">Cada trofeo representa un capítulo. De Núñez a Manchester, de Manchester al mundo.</p>
          </Copy>
        </header>

        <div className="t-grid">
          {TROFEOS.map((t, i) => (
            <article key={i} className="t-card">
              {t.n > 1 && <span className="t-count">×{t.n}</span>}
              <div className="t-icon">
                <span className="t-icon-emoji">🏆</span>
              </div>
              <h3 className="t-name">{t.name}</h3>
              <ul className="t-meta">
                {t.years ? t.years.map((y, j) => (
                  <li key={j}><b>{y}</b> · {t.club}</li>
                )) : t.desc ? t.desc.map((d, j) => (
                  <li key={j}><b>{t.year || ""}</b> · {d}</li>
                )) : (
                  <li><b>{t.year}</b> · {t.club}</li>
                )}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="partidos" id="partidos">
        <header className="partidos-head">
          <Copy>
            <p className="eyebrow">02 · Galería</p>
          </Copy>
          <Copy>
            <h2>Partido<br />a partido</h2>
          </Copy>
          <Copy>
            <p className="partidos-sub">Tres fotos por encuentro. La historia se sigue escribiendo cada fin de semana.</p>
          </Copy>
        </header>

        {partidos.map((p) => (
          <article key={p.n} className="partido">
            <header className="partido-head">
              <div>
                <p className="eyebrow partido-fecha">{p.fecha}</p>
                <Copy>
                  <h3 className="partido-fixture">{p.fixture} <span className="vs">VS</span> {p.rival}</h3>
                </Copy>
                <p className="partido-lugar">{p.lugar}</p>
              </div>
              <span className="partido-num" aria-hidden="true">{String(p.n).padStart(2, "0")}</span>
            </header>
            <div className="partido-grid">
              {p.fotos.map((foto, i) => (
                <div key={i} className={`partido-img${i === 0 ? " slot-a" : ""}`}>
                  <img src={foto} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
