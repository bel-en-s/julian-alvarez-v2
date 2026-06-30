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
