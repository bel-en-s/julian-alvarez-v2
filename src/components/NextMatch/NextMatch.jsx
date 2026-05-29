"use client";
import "./NextMatch.css";
import { useState, useEffect, useRef } from "react";

function getTimeLeft(kickoff) {
  const diff = new Date(kickoff).getTime() - Date.now();
  if (diff <= 0) return { days: "00", hours: "00", minutes: "00" };
  return {
    days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
    minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
  };
}

const NextMatch = ({
  kickoff = "2026-06-15T21:00:00+02:00",
  home = "Atlético de Madrid",
  away = "Real Madrid",
  competition = "LaLiga",
  extra = "Metropolitano",
}) => {
  const [minimized, setMinimized] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(kickoff));
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(kickoff));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, [kickoff]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0;
    const dpr = window.devicePixelRatio || 1;
    let anchors = [];
    let lastPt = null;
    let inside = false;

    const resize = () => {
      const r = card.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = w / 2, cy = h / 2;
      const rx = w * 0.55, ry = h * 0.6;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
      }
      ctx.clearRect(0, 0, w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(card);

    const strand = (x1, y1, x2, y2, alpha) => {
      ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
      ctx.lineWidth = 0.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      const sorted = anchors.slice().sort((a, b) =>
        (a.x - x) * (a.x - x) + (a.y - y) * (a.y - y)
        - ((b.x - x) * (b.x - x) + (b.y - y) * (b.y - y))
      );
      strand(sorted[0].x, sorted[0].y, x, y, 0.55);
      strand(sorted[1].x, sorted[1].y, x, y, 0.32);
      if (lastPt && inside) strand(lastPt.x, lastPt.y, x, y, 0.7);
      lastPt = { x, y };
    };

    const onEnter = () => { inside = true; lastPt = null; };
    const onLeave = () => {
      inside = false;
      let t = 0;
      const fade = setInterval(() => {
        t++;
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
        if (t > 14) { clearInterval(fade); ctx.clearRect(0, 0, w, h); }
      }, 30);
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article className={`next-match${minimized ? " is-min" : ""}`} ref={cardRef}>
      <div className="watermark" aria-hidden="true" />
      <canvas className="web" ref={canvasRef} aria-hidden="true" />

      <header className="head">
        <div className="eyebrow">Próximo partido</div>
        <button
          type="button"
          className="toggle"
          aria-label={minimized ? "Expandir tarjeta" : "Minimizar tarjeta"}
          aria-expanded={!minimized}
          onClick={() => setMinimized((p) => !p)}
        >
          <span className="bar" />
        </button>
      </header>

      <div className="countdown" aria-live="polite">
        <div className="unit">
          <span className="n n-d">{timeLeft.days}</span>
          <span className="u">Días</span>
        </div>
        <span className="sep">:</span>
        <div className="unit">
          <span className="n n-h">{timeLeft.hours}</span>
          <span className="u">Horas</span>
        </div>
        <span className="sep">:</span>
        <div className="unit">
          <span className="n n-m">{timeLeft.minutes}</span>
          <span className="u">Min</span>
        </div>
      </div>

      <div className="nm-extra">
        <div className="teams">
          <span className="t home">{home}</span>
          <span className="vs">vs</span>
          <span className="t away">{away}</span>
        </div>
        <div className="meta">
          <span className="comp">{competition}</span>
          <span className="dot">·</span>
          <span className="extra">{extra}</span>
        </div>
      </div>
    </article>
  );
};

export default NextMatch;
