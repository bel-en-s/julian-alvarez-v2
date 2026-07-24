const canvas = document.createElement("canvas");
canvas.id = "cursor-web";
canvas.setAttribute("aria-hidden", "true");
Object.assign(canvas.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: "3",
  display: "block",
});
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
let ww = 0, wh = 0;
let anchors = [];
let lastPt = null;
let raf = null;
const LIFETIME = 1900;
const MAX_LINES = 1400;
let lines = [];

const repaint = () => {
  ww = window.innerWidth;
  wh = window.innerHeight;
  canvas.width = Math.floor(ww * dpr);
  canvas.height = Math.floor(wh * dpr);
  canvas.style.width = ww + "px";
  canvas.style.height = wh + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  lastPt = null;
  lines = [];
  const rx = ww * 0.3, ry = wh * 0.35;
  anchors = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
  }
};
repaint();

window.addEventListener("resize", repaint);

const render = (now) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, ww, wh);
  const cutoff = now - LIFETIME;
  let write = 0;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (ln.t < cutoff) continue;
    lines[write++] = ln;
    const age = (now - ln.t) / LIFETIME;
    const alpha = (1 - age) * ln.opacity;
    ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(ln.x1, ln.y1);
    ctx.lineTo(ln.x2, ln.y2);
    ctx.stroke();
  }
  lines.length = write;
  if (rafActive) raf = requestAnimationFrame(render);
};

const pushLine = (x1, y1, x2, y2, opacity) => {
  lines.push({ x1, y1, x2, y2, t: performance.now(), opacity });
  if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
};

const sections = [".hero", ".dentro-fuera", ".fdc", ".partidos"].map(function (sel) {
  return document.querySelector(sel);
}).filter(Boolean);

if (!sections.length) { canvas.style.display = "none"; }

var rafActive = false;
var visibleSet = new Set();
function startRAF() { if (!rafActive) { rafActive = true; raf = requestAnimationFrame(render); } }
function stopRAF() { rafActive = false; if (raf) { cancelAnimationFrame(raf); raf = null; } }

if (window.innerWidth >= 640) {
  if (sections.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleSet.add(entry.target);
        else visibleSet.delete(entry.target);
      });
      if (visibleSet.size > 0) startRAF();
      else stopRAF();
    }, { threshold: 0 });
    sections.forEach(function (el) { obs.observe(el); });
  } else {
    startRAF();
  }
}

const onMove = (e) => {
  const sorted = anchors.slice().sort((a, b) =>
    (a.x - e.clientX) * (a.x - e.clientX) + (a.y - e.clientY) * (a.y - e.clientY)
    - ((b.x - e.clientX) * (b.x - e.clientX) + (b.y - e.clientY) * (b.y - e.clientY))
  );
  pushLine(sorted[0].x, sorted[0].y, e.clientX, e.clientY, 0.25);
  pushLine(sorted[1].x, sorted[1].y, e.clientX, e.clientY, 0.15);
  if (lastPt) pushLine(lastPt.x, lastPt.y, e.clientX, e.clientY, 0.35);
  lastPt = { x: e.clientX, y: e.clientY };
};

const onLeave = () => { lastPt = null; };

if (window.innerWidth >= 640) {
  sections.forEach(function (el) {
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
  });
}
