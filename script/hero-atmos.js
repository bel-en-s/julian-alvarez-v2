/* ---- web builders (shared with dentro/fuera) ---- */
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
    var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
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
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
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
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", "M" + p1[0] + " " + p1[1] + " Q" + cx + " " + cy + " " + p2[0] + " " + p2[1]);
    p.setAttribute("class", "frame-thread");
    p.setAttribute("stroke-width", "0.9");
    svg.appendChild(p);
  }
}

function initHeroAtmos() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (document.getElementById('hero-atmos')) return;

  const atmos = document.createElement('div');
  atmos.id = 'hero-atmos';

  ['f1', 'f2', 'f3'].forEach(cls => {
    const f = document.createElement('span');
    f.className = 'ha-fog ' + cls;
    atmos.appendChild(f);
  });

  const vig = document.createElement('span');
  vig.className = 'ha-vignette';
  atmos.appendChild(vig);

  const halo = document.createElement('div');
  halo.className = 'ha-halo';
  atmos.appendChild(halo);

  hero.appendChild(atmos);

  const webs = document.createElement('div');
  webs.id = 'hero-webs';

  ['tl', 'tr', 'bl', 'br'].forEach(cls => {
    const corner = document.createElement('div');
    corner.className = 'ha-corner ' + cls;
    corner.appendChild(buildWebSVG());
    webs.appendChild(corner);
  });

  hero.appendChild(webs);

  var hWebTl = hero.querySelector('.hero-web-tl');
  var hWebBr = hero.querySelector('.hero-web-br');
  if (hWebTl) buildRealWeb(hWebTl, { hx: 0, hy: 0, sx: 1, sy: 1, seed: 13, N: 9, maxR: 900, factor: 1.30, start: 52, irreg: 0.22 });
  if (hWebBr) buildRealWeb(hWebBr, { hx: 1366, hy: 768, sx: -1, sy: -1, seed: 53, N: 12, maxR: 660, factor: 1.24, start: 40, irreg: 0.92 });

  const curtain = document.querySelector('.curtain');
  if (curtain && !document.getElementById('curtain-webs')) {
    const cw = document.createElement('div');
    cw.id = 'curtain-webs';
    ['tl', 'tr', 'bl', 'br'].forEach(cls => {
      const corner = document.createElement('div');
      corner.className = 'ha-corner ' + cls;
      corner.appendChild(buildWebSVG());
      cw.appendChild(corner);
    });
    curtain.appendChild(cw);
  }

  startParallax();
}

function buildWebSVG() {
  const NS = 'http://www.w3.org/2000/svg';
  const SIZE = 600, RAYS = 8;
  const ARCS = [110, 200, 300, 420, 540];
  const SAG = 0.06;
  const DEWDROPS = [[2, 1], [2, 4], [2, 6], [3, 1], [3, 4], [3, 6]];

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + SIZE + ' ' + SIZE);

  const angles = [];
  for (let i = 0; i < RAYS; i++) {
    angles.push((i / (RAYS - 1)) * 90 * Math.PI / 180);
  }

  angles.forEach(function (a) {
    const len = SIZE * 0.98;
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('class', 'ray');
    p.setAttribute('d', 'M 0 0 L ' + (Math.cos(a) * len).toFixed(1) + ' ' + (Math.sin(a) * len).toFixed(1));
    svg.appendChild(p);
  });

  ARCS.forEach(function (r) {
    let d = '';
    angles.forEach(function (a, i) {
      const x = Math.cos(a) * r, y = Math.sin(a) * r;
      if (i === 0) { d += 'M ' + x.toFixed(1) + ' ' + y.toFixed(1); return; }
      const pa = angles[i - 1];
      const mid = (a + pa) / 2;
      const mx = Math.cos(mid) * r * (1 - SAG);
      const my = Math.sin(mid) * r * (1 - SAG);
      d += ' Q ' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1);
    });
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('class', 'arc');
    p.setAttribute('d', d);
    svg.appendChild(p);
  });

  DEWDROPS.forEach(function (pair) {
    const r = ARCS[pair[0]], a = angles[pair[1]];
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'dew');
    c.setAttribute('cx', (Math.cos(a) * r).toFixed(1));
    c.setAttribute('cy', (Math.sin(a) * r).toFixed(1));
    c.setAttribute('r', 1.4);
    svg.appendChild(c);
  });

  return svg;
}

function startParallax() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let mx = 0, my = 0, cx = 0, cy = 0, raf = null;
  var heroEl = document.querySelector('.hero');

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

  if (heroEl) {
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    }, { threshold: 0 });
    obs.observe(heroEl);
  } else {
    raf = requestAnimationFrame(loop);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroAtmos);
} else {
  initHeroAtmos();
}
