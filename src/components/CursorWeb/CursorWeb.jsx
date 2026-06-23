"use client";
import "./CursorWeb.css";
import { useRef, useEffect, useState, useCallback } from "react";

const N_STRANDS = 7;
const N_DANGLES = 4;

const FALLBACK_ANCHORS = [
  { x: 60, y: 60 },
  { x: 400, y: -20 },
  { x: 740, y: 60 },
  { x: 820, y: 300 },
  { x: 740, y: 540 },
  { x: 400, y: 620 },
  { x: -20, y: 300 },
];

export default function CursorWeb() {
  const svgRef = useRef(null);
  const cursorRef = useRef({ x: -999, y: -999 });
  const anchorsRef = useRef(FALLBACK_ANCHORS);
  const rafRef = useRef(null);
  const visibleRef = useRef(false);
  const timeoutRef = useRef(null);
  const originRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAnchors = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pad = 80;
    return [
      { x: pad, y: pad },
      { x: w / 2, y: -40 },
      { x: w - pad, y: pad },
      { x: w + 30, y: h / 2 },
      { x: w - pad, y: h - pad },
      { x: w / 2, y: h + 30 },
      { x: -30, y: h / 2 },
    ];
  }, []);

  useEffect(() => {
    anchorsRef.current = getAnchors();
    const onResize = () => { anchorsRef.current = getAnchors(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getAnchors]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const render = () => {
      const c = cursorRef.current;
      const anchors = anchorsRef.current;
      const groups = svg.querySelectorAll(".cw-group");
      const origin = svg.querySelector(".cw-origin");
      const cx = c.x;
      const cy = c.y;
      if (origin) {
        origin.setAttribute("cx", cx);
        origin.setAttribute("cy", cy);
      }
      groups.forEach((g, i) => {
        if (i < N_STRANDS) {
          const a = anchors[i % anchors.length];
          const path = g.querySelector("path");
          const dot = g.querySelector("circle");
          if (path) {
            const dx = a.x - cx;
            const dy = a.y - cy;
            const cp1x = cx + dx * 0.5 + dy * 0.2;
            const cp1y = cy + dy * 0.5 - dx * 0.2;
            const cp2x = cx + dx * 0.35;
            const cp2y = cy + dy * 0.35;
            path.setAttribute("d", `M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${a.x} ${a.y}`);
          }
          if (dot) {
            dot.setAttribute("cx", a.x);
            dot.setAttribute("cy", a.y);
          }
        }
        if (i >= N_STRANDS && i < N_STRANDS + N_DANGLES) {
          const path = g.querySelector("path");
          const tip = g.querySelector("circle");
          const idx = i - N_STRANDS;
          if (path) {
            const angle = (idx / N_DANGLES) * Math.PI * 2;
            const len = 40 + (idx % 2) * 20;
            const ex = cx + Math.cos(angle) * len;
            const ey = cy + Math.sin(angle) * len;
            const sway = Math.sin(Date.now() / 600 + i) * 4;
            const mx = cx + Math.cos(angle) * len * 0.5 + sway;
            const my = cy + Math.sin(angle) * len * 0.5 + sway;
            path.setAttribute("d", `M ${cx} ${cy} Q ${mx} ${my}, ${ex} ${ey}`);
          }
          if (tip) {
            const angle = (idx / N_DANGLES) * Math.PI * 2;
            const len = 40 + (idx % 2) * 20;
            const sway = Math.sin(Date.now() / 600 + i) * 4;
            tip.setAttribute("cx", cx + Math.cos(angle) * len + sway);
            tip.setAttribute("cy", cy + Math.sin(angle) * len + sway);
          }
        }
      });
    };

    const loop = () => {
      if (visibleRef.current) {
        render();
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
    };

    const onMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        svg.style.opacity = "1";
        rafRef.current = requestAnimationFrame(loop);
      }
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        visibleRef.current = false;
        svg.style.opacity = "0";
      }, 3000);
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      svg.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <svg
      className="cursor-web"
      ref={svgRef}
      aria-hidden="true"
    >
      {FALLBACK_ANCHORS.map((a, i) => (
        <g className="cw-group" key={`s${i}`}>
          <path className="cw-strand" />
          <circle className="cw-anchor" cx={a.x} cy={a.y} r="2.5" />
        </g>
      ))}
      {Array.from({ length: N_DANGLES }).map((_, i) => (
        <g className="cw-group" key={`d${i}`}>
          <path className="cw-dangle" />
          <circle className="cw-dangle-tip" r="1.8" />
        </g>
      ))}
      <circle className="cw-origin" r="3.5" cx="0" cy="0" />
    </svg>
  );
}
