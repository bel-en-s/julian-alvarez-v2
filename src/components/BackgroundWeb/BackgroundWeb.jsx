"use client";
import { useEffect, useRef } from "react";

export default function BackgroundWeb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let ww = 0, wh = 0;
    let anchors = [];
    let raf = null;
    const MAX_DIST = 400;
    const LIFETIME = 1200;
    const MAX_LINES = 3000;
    let lines = [];
    let lastGen = 0;
    let lastRandomPt = null;

    const distSq = (a, x, y) => (a.x - x) ** 2 + (a.y - y) ** 2;

    const resize = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = Math.floor(ww * dpr);
      canvas.height = Math.floor(wh * dpr);
      canvas.style.width = ww + "px";
      canvas.style.height = wh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = [];
      lastRandomPt = null;
      const rx = ww * 0.3, ry = wh * 0.35;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
      }
    };
    resize();

    window.addEventListener("resize", resize);

    const render = (now) => {
      ctx.clearRect(0, 0, ww, wh);
      const cutoff = now - LIFETIME;
      let write = 0;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (ln.t < cutoff) continue;
        lines[write++] = ln;
        const age = (now - ln.t) / LIFETIME;
        const alpha = (1 - age) * ln.opacity;
        ctx.strokeStyle = `rgba(216,200,245,${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ln.x1, ln.y1);
        ctx.lineTo(ln.x2, ln.y2);
        ctx.stroke();
      }
      lines.length = write;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    const pushLine = (x1, y1, x2, y2, opacity) => {
      const dx = x2 - x1, dy = y2 - y1;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > MAX_DIST) {
        const s = MAX_DIST / d;
        x2 = x1 + dx * s;
        y2 = y1 + dy * s;
      }
      lines.push({ x1, y1, x2, y2, t: performance.now(), opacity });
      if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    };

    const biasedCoord = (size) => {
      if (Math.random() < 0.7) {
        return Math.random() < 0.5
          ? Math.random() * size * 0.3
          : size - Math.random() * size * 0.3;
      }
      return Math.random() * size;
    };

    const genPatch = () => {
      const tx = biasedCoord(ww);
      const ty = biasedCoord(wh);
      const sorted = anchors.slice().sort((a, b) =>
        distSq(a, tx, ty) - distSq(b, tx, ty)
      );
      pushLine(sorted[0].x, sorted[0].y, tx, ty, 0.45 + Math.random() * 0.15);
      pushLine(sorted[1].x, sorted[1].y, tx, ty, 0.2 + Math.random() * 0.15);
      if (lastRandomPt) {
        pushLine(lastRandomPt.x, lastRandomPt.y, tx, ty, 0.55 + Math.random() * 0.2);
      }
      lastRandomPt = { x: tx, y: ty };
      if (Math.random() > 0.65) {
        const i1 = Math.floor(Math.random() * 8);
        const i2 = (i1 + 1 + Math.floor(Math.random() * 2)) % 8;
        pushLine(anchors[i1].x, anchors[i1].y, anchors[i2].x, anchors[i2].y, 0.08 + Math.random() * 0.06);
      }
    };

    const initialBurst = () => {
      for (let i = 0; i < 6; i++) {
        setTimeout(genPatch, i * 200);
      }
    };

    const initTimer = setTimeout(initialBurst, 800);

    const onScroll = () => {
      const now = performance.now();
      if (now - lastGen < 120) return;
      lastGen = now;
      genPatch();
      if (Math.random() > 0.7) genPatch();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(initTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        display: "block",
        mixBlendMode: "multiply",
      }}
    />
  );
}
