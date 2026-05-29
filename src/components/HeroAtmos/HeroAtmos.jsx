"use client";
import "./HeroAtmos.css";
import { useEffect } from "react";

function WebCorner() {
  const SIZE = 600;
  const RAYS = 8;
  const ARCS = [110, 200, 300, 420, 540];
  const SAG = 0.06;
  const DEWDROPS = [[2, 1], [2, 4], [2, 6], [3, 1], [3, 4], [3, 6]];

  const angles = Array.from({ length: RAYS }, (_, i) =>
    (i / (RAYS - 1)) * 90 * Math.PI / 180
  );

  const rays = angles.map(a => {
    const len = SIZE * 0.98;
    return `M 0 0 L ${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}`;
  });

  const arcs = ARCS.map(r => {
    let d = "";
    angles.forEach((a, i) => {
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) { d += `M ${x.toFixed(1)} ${y.toFixed(1)}`; return; }
      const pa = angles[i - 1];
      const mid = (a + pa) / 2;
      const mx = Math.cos(mid) * r * (1 - SAG);
      const my = Math.sin(mid) * r * (1 - SAG);
      d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    });
    return d;
  });

  const dewdrops = DEWDROPS.map(([arcIdx, angleIdx]) => {
    const r = ARCS[arcIdx];
    const a = angles[angleIdx];
    return { cx: Math.cos(a) * r, cy: Math.sin(a) * r };
  });

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {rays.map((d, i) => (
        <path key={`ray-${i}`} className="web-ray" d={d} />
      ))}
      {arcs.map((d, i) => (
        <path key={`arc-${i}`} className="web-arc" d={d} />
      ))}
      {dewdrops.map((d, i) => (
        <circle
          key={`dew-${i}`}
          className="web-dew"
          cx={d.cx.toFixed(1)}
          cy={d.cy.toFixed(1)}
          r="1.4"
        />
      ))}
    </svg>
  );
}

export default function HeroAtmos() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = null;

    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      document.documentElement.style.setProperty("--mx", cx.toFixed(4));
      document.documentElement.style.setProperty("--my", cy.toFixed(4));
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-atmos">
      <span className="ha-fog f1" />
      <span className="ha-fog f2" />
      <span className="ha-fog f3" />

      <span className="ha-vignette" />

      <div className="ha-halo" />



      <div className="ha-webs" aria-hidden="true">
        {["tl", "tr", "bl", "br"].map((pos) => (
          <div key={pos} className={`ha-corner ${pos}`}>
            <WebCorner />
          </div>
        ))}
      </div>
    </div>
  );
}
