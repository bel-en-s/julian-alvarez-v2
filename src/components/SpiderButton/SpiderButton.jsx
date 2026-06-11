"use client";
import { useEffect, useRef } from "react";
import "./SpiderButton.css";

const SpiderButton = ({ children, className = "", ...props }) => {
  const canvasRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const btn = btnRef.current;
    if (!canvas || !btn) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0;
    const dpr = window.devicePixelRatio || 1;
    let anchors = [];
    let lastPt = null;
    let inside = false;

    const resize = () => {
      const r = btn.getBoundingClientRect();
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
    ro.observe(btn);

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
      const r = btn.getBoundingClientRect();
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

    btn.addEventListener("pointerenter", onEnter);
    btn.addEventListener("pointermove", onMove);
    btn.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      btn.removeEventListener("pointerenter", onEnter);
      btn.removeEventListener("pointermove", onMove);
      btn.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <button className={`spider-btn ${className}`} ref={btnRef} {...props}>
      <canvas className="spider-btn-web" ref={canvasRef} aria-hidden="true" />
      <span className="spider-btn-text">{children}</span>
    </button>
  );
};

export default SpiderButton;
