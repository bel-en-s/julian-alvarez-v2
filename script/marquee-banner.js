(function () {
  const stage = document.getElementById("df-stage");
  if (!stage) return;

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

  /* ---- web veil over the figure ---- */
  (function () {
    var svg = stage.querySelector(".df-figure-web");
    if (!svg) return;
    var rnd = mulberry32(2026);
    var cx = 260, cy = 235, N = 18, maxR = 240;
    var dirs = [];
    for (var i = 0; i < N; i++) {
      var a = (i / N) * Math.PI * 2 + (rnd() - 0.5) * 0.08;
      dirs.push([Math.cos(a), Math.sin(a)]);
    }
    var rS = dirs.map(function () { return 0.8 + rnd() * 0.4; });
    var Pt = function (i, t) {
      return [cx + t * maxR * dirs[i][0] * rS[i], cy + t * maxR * dirs[i][1] * rS[i] * 1.18];
    };
    dirs.forEach(function (d, i) {
      var p = Pt(i, 0.85 + rnd() * 0.2);
      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", "M" + cx + " " + cy + " L" + p[0].toFixed(1) + " " + p[1].toFixed(1));
      svg.appendChild(path);
    });
    var rings = [];
    var tr = 0.2;
    while (tr < 0.98) { rings.push(tr); tr *= 1.3 + rnd() * 0.05; }
    rings.forEach(function (rr) {
      for (var i = 0; i < N; i++) {
        var a = i, b = (i + 1) % N;
        var p1 = Pt(a, rr * (1 + (rnd() - 0.5) * 0.06));
        var p2 = Pt(b, rr * (1 + (rnd() - 0.5) * 0.06));
        var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
        var sag = 0.09 + rnd() * 0.04;
        var qx = mx + (cx - mx) * sag, qy = my + (cy - my) * sag;
        var p = document.createElementNS(NS, "path");
        p.setAttribute("d", "M" + p1[0].toFixed(1) + " " + p1[1].toFixed(1) + " Q" + qx.toFixed(1) + " " + qy.toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1));
        svg.appendChild(p);
      }
    });
    for (var k = 0; k < 10; k++) {
      var i2 = Math.floor(rnd() * N), rr2 = rings[Math.floor(rnd() * rings.length)] || 0.5;
      var p3 = Pt(i2, rr2);
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", p3[0].toFixed(1)); c.setAttribute("cy", p3[1].toFixed(1));
      c.setAttribute("r", (0.7 + rnd() * 1.1).toFixed(2));
      svg.appendChild(c);
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

  /* ---- face === mask interaction ---- */
  var dentro = document.getElementById("df-dentro");
  var fuera = document.getElementById("df-fuera");

  function setSide(v) {
    if (v) stage.setAttribute("data-side", v);
    else stage.removeAttribute("data-side");
  }

  if (dentro) {
    dentro.addEventListener("mouseenter", function () { setSide("dentro"); });
    dentro.addEventListener("mouseleave", function () { setSide(null); });
    dentro.addEventListener("focus", function () { setSide("dentro"); });
    dentro.addEventListener("blur", function () { setSide(null); });
  }
  if (fuera) {
    fuera.addEventListener("mouseenter", function () { setSide("fuera"); });
    fuera.addEventListener("mouseleave", function () { setSide(null); });
    fuera.addEventListener("focus", function () { setSide("fuera"); });
    fuera.addEventListener("blur", function () { setSide(null); });
  }
})();
