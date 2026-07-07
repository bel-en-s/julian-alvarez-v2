import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getTimeLeft(kickoff) {
  const diff = new Date(kickoff).getTime() - Date.now();
  if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  return {
    days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
    minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
    seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
  };
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

const DEFAULTS = {
  kickoff: new Date(Date.now() + 4 * 86400000),
  home: "Atlético de Madrid",
  away: "Real Madrid",
  competition: "LaLiga",
  extra: "Metropolitano",
  startMinimized: false,
  container: null,
};

function build(opts) {
  const root = document.createElement("article");
  root.className = "next-match" + (opts.startMinimized ? " is-min" : "");

  root.innerHTML = `
    <div class="watermark" aria-hidden="true"></div>
    <canvas class="web" aria-hidden="true"></canvas>

    <header class="head">
      <div class="eyebrow">Próximo partido</div>
      <button type="button" class="toggle"
              aria-label="${opts.startMinimized ? "Ampliar tarjeta" : "Minimizar tarjeta"}"
              aria-expanded="${opts.startMinimized ? "false" : "true"}">
        <span class="bar"></span>
      </button>
    </header>

    <div class="countdown" aria-live="polite">
      <div class="unit">
        <span class="n n-d">00</span>
        <span class="u">Días</span>
      </div>
      <span class="sep">:</span>
      <div class="unit">
        <span class="n n-h">00</span>
        <span class="u">Horas</span>
      </div>
      <span class="sep">:</span>
      <div class="unit">
        <span class="n n-m">00</span>
        <span class="u">Min</span>
      </div>
      <span class="sep">:</span>
      <div class="unit">
        <span class="n n-s">00</span>
        <span class="u">Seg</span>
      </div>
    </div>

    <div class="nm-extra">
      <div class="teams">
        <span class="t home">${opts.home}</span>
        <span class="vs">vs</span>
        <span class="t away">${opts.away}</span>
      </div>
      <div class="meta">
        <span class="comp">${opts.competition}</span>
        <span class="dot">·</span>
        <span class="extra">${opts.extra}</span>
      </div>
    </div>
  `;

  return root;
}

function bindWeb(card, cv) {
  const ctx = cv.getContext("2d");
  let w = 0, h = 0;
  const dpr = window.devicePixelRatio || 1;
  let anchors = [];
  let lastPt = null;
  let inside = false;

  function resize() {
    const r = card.getBoundingClientRect();
    w = r.width; h = r.height;
    cv.width = Math.floor(w * dpr);
    cv.height = Math.floor(h * dpr);
    cv.style.width = w + "px";
    cv.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = w / 2, cy = h / 2;
    const rx = w * 0.55, ry = h * 0.6;
    anchors = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      anchors.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
    }
    ctx.clearRect(0, 0, w, h);
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(card);

  function strand(x1, y1, x2, y2, alpha) {
    ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
    ctx.lineWidth = 0.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function onMove(e) {
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
  }

  function onEnter() { inside = true; lastPt = null; }
  function onLeave() {
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
  }

  if (window.innerWidth >= 768) {
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
  }

  return () => {
    ro.disconnect();
    if (window.innerWidth >= 768) {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    }
  };
}

function mount(userOpts) {
  const opts = Object.assign({}, DEFAULTS, userOpts || {});
  const kickoff = opts.kickoff instanceof Date ? opts.kickoff : new Date(opts.kickoff);

  const card = build(opts);
  (opts.container || document.body).appendChild(card);

  let minimized = opts.startMinimized;

  const toggle = card.querySelector(".toggle");
  const nD = card.querySelector(".n-d");
  const nH = card.querySelector(".n-h");
  const nM = card.querySelector(".n-m");
  const nS = card.querySelector(".n-s");

  toggle.addEventListener("click", () => {
    minimized = !minimized;
    card.classList.toggle("is-min", minimized);
    toggle.setAttribute("aria-expanded", minimized ? "false" : "true");
    toggle.setAttribute("aria-label", minimized ? "Ampliar tarjeta" : "Minimizar tarjeta");

    gsap.to(card, {
      scale: minimized ? 0.92 : 1,
      transformOrigin: "bottom left",
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  function tick() {
    const t = getTimeLeft(kickoff);
    nD.textContent = t.days;
    nH.textContent = t.hours;
    nM.textContent = t.minutes;
    nS.textContent = t.seconds;
  }
  tick();
  const interval = setInterval(tick, 1000);

  const destroyWeb = bindWeb(card, card.querySelector(".web"));

  ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom top",
    onLeave: () => {
      if (!minimized) {
        minimized = true;
        card.classList.add("is-min");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Ampliar tarjeta");
        gsap.to(card, {
          scale: 0.92,
          transformOrigin: "bottom left",
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    },
    onEnter: () => {
      if (minimized) {
        minimized = false;
        card.classList.remove("is-min");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Minimizar tarjeta");
        gsap.to(card, {
          scale: 1,
          transformOrigin: "bottom left",
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    },
  });

  return {
    element: card,
    minimize() { if (!minimized) toggle.click(); },
    expand() { if (minimized) toggle.click(); },
    destroy() {
      clearInterval(interval);
      destroyWeb();
      card.remove();
    },
  };
}

window.NextMatch = { mount };
