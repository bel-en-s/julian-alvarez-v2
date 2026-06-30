(function() {
  var section = document.querySelector('.work-items');
  if (!section) return;

  var NS = 'http://www.w3.org/2000/svg';

  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function buildWeb(svg, o) {
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
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', hx); l.setAttribute('y1', hy);
      var p = P(i, r);
      l.setAttribute('x2', p[0]); l.setAttribute('y2', p[1]);
      l.setAttribute('stroke', 'rgba(138,117,184,0.12)');
      l.setAttribute('stroke-width', (0.5 + rnd() * 0.3).toFixed(2));
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
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', 'M' + p1[0] + ' ' + p1[1] + ' Q' + cx + ' ' + cy + ' ' + p2[0] + ' ' + p2[1]);
        p.setAttribute('stroke', 'rgba(138,117,184,0.10)');
        p.setAttribute('stroke-width', (0.4 + rnd() * 0.25).toFixed(2));
        p.setAttribute('fill', 'none');
        svg.appendChild(p);
      }
    });
  }

  function init() {
    var rect = section.getBoundingClientRect();
    var W = rect.width, H = rect.height;
    if (W < 1 || H < 1) return;

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '0';
    svg.style.overflow = 'visible';
    svg.setAttribute('aria-hidden', 'true');

    var webSize = Math.min(W, H) * 0.4;
    buildWeb(svg, { hx: 0, hy: 0, sx: 1, sy: 1, seed: 7, N: 8, maxR: webSize, factor: 1.35, start: webSize * 0.12, irreg: 0.3 });
    buildWeb(svg, { hx: W, hy: 0, sx: -1, sy: 1, seed: 13, N: 8, maxR: webSize * 0.8, factor: 1.30, start: webSize * 0.1, irreg: 0.25 });
    buildWeb(svg, { hx: 0, hy: H, sx: 1, sy: -1, seed: 19, N: 7, maxR: webSize * 0.7, factor: 1.32, start: webSize * 0.1, irreg: 0.35 });

    section.appendChild(svg);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
