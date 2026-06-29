import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

(function () {
  const stage = document.getElementById("df-stage");
  if (!stage) return;

  const section = stage.closest(".dentro-fuera");
  const banner = document.getElementById("df-banner");
  const blobContainer = stage.querySelector(".df-blobs");
  const smudgeSVG = stage.querySelector(".df-smudge");

  const NS = "http://www.w3.org/2000/svg";

  /* ---- grain noise filter ---- */
  const svgGrain = stage.querySelector(".df-grain");
  if (svgGrain) {
    const defs = document.createElementNS(NS, "defs");
    const filter = document.createElementNS(NS, "filter");
    filter.id = "df-noise";
    const ft = document.createElementNS(NS, "feTurbulence");
    ft.setAttribute("type", "fractalNoise");
    ft.setAttribute("baseFrequency", "0.85");
    ft.setAttribute("numOctaves", "2");
    ft.setAttribute("stitchTiles", "stitch");
    filter.appendChild(ft);
    const cm = document.createElementNS(NS, "feColorMatrix");
    cm.setAttribute("type", "saturate");
    cm.setAttribute("values", "0");
    filter.appendChild(cm);
    defs.appendChild(filter);
    svgGrain.prepend(defs);
  }

  /* ---- corner orb webs ---- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function buildRealWeb(svg, o) {
    var hx = o.hx, hy = o.hy, sx = o.sx, sy = o.sy, N = o.N, maxR = o.maxR, factor = o.factor, start = o.start;
    var rnd = mulberry32(o.seed);
    var jit = function (m) { return (rnd() * 2 - 1) * m; };
    var angJit = 2.6 + (o.irreg || 0) * 7;
    var dirs = [], rScale = [];
    for (var i = 0; i < N; i++) {
      var even = 4 + (86 - 4) * (i / (N - 1));
      var a = (even + jit(angJit)) * Math.PI / 180;
      dirs.push([Math.cos(a), Math.sin(a)]);
      rScale.push(1 + jit(0.13 * (o.irreg || 0)));
    }
    var P = function (i, r) {
      return [(hx + sx * r * dirs[i][0]).toFixed(1), (hy + sy * r * dirs[i][1]).toFixed(1)];
    };
    dirs.forEach(function (d, i) {
      var r = maxR * rScale[i] * (0.86 + rnd() * 0.2);
      var l = document.createElementNS(NS, "line");
      l.setAttribute("x1", hx); l.setAttribute("y1", hy);
      var p = P(i, r);
      l.setAttribute("x2", p[0]); l.setAttribute("y2", p[1]);
      l.setAttribute("class", "spoke");
      l.setAttribute("stroke-width", (0.7 + rnd() * 0.35).toFixed(2));
      svg.appendChild(l);
    });
    var ringR = [];
    var r = start;
    while (r < maxR * 0.96) { ringR.push(r); r *= (factor + rnd() * 0.08); }
    ringR.forEach(function (rr) {
      for (var i = 0; i < N - 1; i++) {
        if (rnd() < (0.06 + (o.irreg || 0) * 0.10)) continue;
        var jr = 0.05 + (o.irreg || 0) * 0.13;
        var rA = rr * rScale[i] * (1 + jit(jr)), rB = rr * rScale[i + 1] * (1 + jit(jr));
        var p1 = P(i, rA), p2 = P(i + 1, rB);
        var mx = (+p1[0] + +p2[0]) / 2, my = (+p1[1] + +p2[1]) / 2;
        var sag = 0.06 + rnd() * 0.06 + jit(0.06 * (o.irreg || 0));
        var cx = (mx + (hx - mx) * sag).toFixed(1), cy = (my + (hy - my) * sag).toFixed(1);
        var p = document.createElementNS(NS, "path");
        p.setAttribute("d", "M" + p1[0] + " " + p1[1] + " Q" + cx + " " + cy + " " + p2[0] + " " + p2[1]);
        p.setAttribute("class", rnd() < 0.10 ? "glint" : "capture");
        p.setAttribute("stroke-width", (0.55 + rnd() * 0.3).toFixed(2));
        svg.appendChild(p);
      }
    });
    for (var k = 0; k < 2; k++) {
      var i0 = 1 + k * 3;
      var rr2 = maxR * (0.74 + k * 0.12);
      var p1 = P(i0, rr2), p2 = P(Math.min(i0 + 3, N - 1), rr2 * 1.02);
      var mx = (+p1[0] + +p2[0]) / 2, my = (+p1[1] + +p2[1]) / 2;
      var cx = (mx + (hx - mx) * 0.04).toFixed(1), cy = (my + (hy - my) * 0.04).toFixed(1);
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", "M" + p1[0] + " " + p1[1] + " Q" + cx + " " + cy + " " + p2[0] + " " + p2[1]);
      p.setAttribute("class", "frame-thread");
      p.setAttribute("stroke-width", "0.9");
      svg.appendChild(p);
    }
  }

  var webTl = stage.querySelector(".df-web-tl");
  var webBr = stage.querySelector(".df-web-br");
  if (webTl) buildRealWeb(webTl, { hx: 0, hy: 0, sx: 1, sy: 1, seed: 7, N: 9, maxR: 900, factor: 1.30, start: 52, irreg: 0.22 });
  if (webBr) buildRealWeb(webBr, { hx: 1366, hy: 768, sx: -1, sy: -1, seed: 41, N: 12, maxR: 660, factor: 1.24, start: 40, irreg: 0.92 });

  /* ---- constellation dots ---- */
  (function () {
    var svg = stage.querySelector(".df-dots");
    if (!svg) return;
    var rnd = mulberry32(91), W = 1366, H = 768, pts = [];
    for (var i = 0; i < 14; i++) {
      var x = rnd() * W, y = rnd() * H * 0.92;
      pts.push([x, y]);
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1));
      c.setAttribute("r", (rnd() * 1.1 + 0.6).toFixed(2));
      c.setAttribute("class", "dot");
      svg.appendChild(c);
    }
    for (var i = 0; i < pts.length; i++) {
      for (var j = i + 1; j < pts.length; j++) {
        var dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1];
        if (Math.hypot(dx, dy) < 150 && rnd() < 0.25) {
          var l = document.createElementNS(NS, "line");
          l.setAttribute("x1", pts[i][0].toFixed(1)); l.setAttribute("y1", pts[i][1].toFixed(1));
          l.setAttribute("x2", pts[j][0].toFixed(1)); l.setAttribute("y2", pts[j][1].toFixed(1));
          l.setAttribute("class", "dot-link");
          svg.appendChild(l);
        }
      }
    }
  })();

  /* ---- concentric pulse rings ---- */
  (function () {
    var svg = stage.querySelector(".df-rings");
    if (!svg) return;
    var r = 70;
    while (r < 440) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", 450); c.setAttribute("cy", 450);
      c.setAttribute("r", r);
      c.setAttribute("stroke-width", (0.6 + Math.random() * 0.4).toFixed(2));
      svg.appendChild(c);
      r *= 1.34;
    }
  })();

  /* ---- scale stage to fit ---- */
  function fit() {
    var s = Math.min(innerWidth / 1366, innerHeight / 768);
    if (!s || !isFinite(s) || s <= 0) { requestAnimationFrame(fit); return; }
    stage.style.transform = "scale(" + s + ")";
  }
  addEventListener("resize", fit);
  fit();

  /* ---- blob system ---- */
  if (!banner || !blobContainer || !smudgeSVG) return;
  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  let started = false;
  let raf = null;

  const config = {
    smoothing: 0.12,
    threshold: 0.01,
    sizeFromSpeed: 0.2,
    expandMultiplier: 1.8,
    expandTime: 1800,
    dissolveStart: 1600,
    dissolveTime: 2500,
    burstRadius: 28,
  };

  function stampAt(x, y, radius) {
    if (!radius) radius = config.burstRadius;
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", radius);
    c.setAttribute("fill", "#fff");
    blobContainer.prepend(c);

    const start = performance.now();
    const expandEnd = start + config.expandTime;
    const fadeStart = start + config.dissolveStart;
    const fadeEnd = fadeStart + config.dissolveTime;

    function tick() {
      const now = performance.now();
      if (now >= fadeEnd) {
        if (c.parentNode) c.parentNode.removeChild(c);
        return;
      }
      let r = radius;
      if (now < expandEnd) {
        var t = (now - start) / config.expandTime;
        t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        r = radius + (radius * config.expandMultiplier - radius) * t;
      }
      if (now >= fadeStart) {
        var t2 = (now - fadeStart) / config.dissolveTime;
        t2 = t2 * t2 * t2;
        r *= 1 - Math.min(t2, 1);
      }
      c.setAttribute("r", Math.max(0, r));
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function burstAt(x, y) {
    var isMobile = window.innerWidth < 1000;
    var radii = isMobile
      ? [15, 22, 12, 18, 10, 20, 14, 16, 19, 11]
      : [30, 45, 25, 35, 20, 40, 28, 32, 38, 22];
    var offsets = isMobile
      ? [[0, 0], [-8, -5], [8, -4], [-4, 8], [6, 6], [-10, 3], [4, -9], [-3, -10], [9, 4], [-6, -3]]
      : [[0, 0], [-15, -10], [15, -8], [-8, 15], [12, 12], [-20, 5], [8, -18], [-5, -20], [18, 8], [-12, -5]];
    offsets.forEach(function (o, i) {
      stampAt(x + o[0], y + o[1], radii[i]);
    });
  }

  function clearBlobs() {
    while (blobContainer.firstChild) {
      blobContainer.removeChild(blobContainer.firstChild);
    }
  }

  function getRelativePos(clientX, clientY) {
    var rect = banner.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function onPointerMove(e) {
    var pos = getRelativePos(e.clientX, e.clientY);
    if (!started) {
      pointer.x = smooth.x = pos.x;
      pointer.y = smooth.y = pos.y;
      started = true;
      return;
    }
    pointer.x = pos.x;
    pointer.y = pos.y;
  }

  function handleMove(e) {
    onPointerMove(e);
  }

  function handleClick(e) {
    var pos = getRelativePos(e.clientX, e.clientY);
    burstAt(pos.x, pos.y);
  }

  banner.addEventListener("mousemove", handleMove);
  banner.addEventListener("click", handleClick);

  function handleTouch(e) {
    var touch = e.touches ? e.touches[0] : e.changedTouches[0];
    if (!touch) return;
    var pos = getRelativePos(touch.clientX, touch.clientY);
    if (!started) {
      pointer.x = smooth.x = pos.x;
      pointer.y = smooth.y = pos.y;
      started = true;
      return;
    }
    pointer.x = pos.x;
    pointer.y = pos.y;
  }

  banner.addEventListener("touchmove", handleTouch, { passive: true });
  banner.addEventListener("touchstart", handleTouch, { passive: true });

  function update() {
    if (started) {
      smooth.x += (pointer.x - smooth.x) * config.smoothing;
      smooth.y += (pointer.y - smooth.y) * config.smoothing;
      var speed = Math.hypot(pointer.x - smooth.x, pointer.y - smooth.y);
      if (speed > config.threshold) {
        stampAt(smooth.x, smooth.y, speed * config.sizeFromSpeed);
      }
    }
    raf = requestAnimationFrame(update);
  }
  raf = requestAnimationFrame(update);

  /* ---- match SVG to banner size ---- */
  function matchSVG() {
    var rect = banner.getBoundingClientRect();
    smudgeSVG.setAttribute("viewBox", "0 0 " + rect.width + " " + rect.height);
    smudgeSVG.style.width = rect.width + "px";
    smudgeSVG.style.height = rect.height + "px";
  }
  matchSVG();
  window.addEventListener("resize", matchSVG);

  /* ---- face === mask interaction ---- */
  var dentro = document.getElementById("df-dentro");
  var fuera = document.getElementById("df-fuera");

  function setSide(v) {
    if (v) stage.setAttribute("data-side", v);
    else stage.removeAttribute("data-side");
  }

  if (dentro) {
    dentro.addEventListener("mouseenter", function () {
      setSide("dentro");
      clearBlobs();
    });
    dentro.addEventListener("mouseleave", function () { setSide(null); });
    dentro.addEventListener("focus", function () { setSide("dentro"); });
    dentro.addEventListener("blur", function () { setSide(null); });
  }
  if (fuera) {
    fuera.addEventListener("mouseenter", function () {
      setSide("fuera");
    });
    fuera.addEventListener("mouseleave", function () { setSide(null); });
    fuera.addEventListener("focus", function () { setSide("fuera"); });
    fuera.addEventListener("blur", function () { setSide(null); });
  }

  /* ---- entrance animation ---- */
  var lockups = stage.querySelectorAll(".df-lockup");
  var hint = stage.querySelector(".df-hint");
  var decor = stage.querySelectorAll(".df-web, .df-rings, .df-dots");

  gsap.set(banner, { opacity: 0, scale: 0.92 });
  gsap.set(lockups, { opacity: 0, y: 30 });
  gsap.set(decor, { opacity: 0 });
  gsap.set(hint, { opacity: 0 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 85%",
    once: true,
    onEnter: function () {
      var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(decor, { opacity: 1, duration: 0.6 }, 0);
      tl.to(banner, { opacity: 1, scale: 1, duration: 0.9 }, 0);
      tl.to(lockups, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, 0.15);
      tl.to(hint, { opacity: 1, duration: 0.5 }, 0.5);
    },
  });

  /* ---- cleanup ---- */
  window.addEventListener("beforeunload", function () {
    banner.removeEventListener("mousemove", handleMove);
    banner.removeEventListener("click", handleClick);
    banner.removeEventListener("touchmove", handleTouch);
    banner.removeEventListener("touchstart", handleTouch);
    window.removeEventListener("resize", matchSVG);
    if (raf) cancelAnimationFrame(raf);
  });
})();
