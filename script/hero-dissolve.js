(function() {
  var wrapper = document.querySelector('.hero-header-img');
  if (!wrapper) return;

  var img = wrapper.querySelector('img');
  if (!img) return;

  var canvas = wrapper.querySelector('canvas.hero-dissolve-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'hero-dissolve-canvas';
    canvas.setAttribute('aria-label', 'Julián Álvarez');
    wrapper.appendChild(canvas);
  }

  var ctx = canvas.getContext('2d');
  var IMG_W = 1080, IMG_H = 1440;
  var DISSOLVE = { start: 0.04, end: 0.90, spread: 0.42, rise: 300 };
  var particles = null, cell = 7;
  var dispW = 0, dispH = 0;
  var target = 0, current = 0;
  var raf = null, dirty = true;

  var mulberry32 = function(a) { return function() { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  var clamp = function(v, a, b) { return v < a ? a : v > b ? b : v; };
  var smooth = function(t) { return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t); };

  function sizeCanvas() {
    var rect = img.getBoundingClientRect();
    dispW = rect.width;
    dispH = rect.height;

    if (dispW < 1 || dispH < 1) {
      var wW = wrapper.offsetWidth || window.innerWidth;
      var wH = wrapper.offsetHeight || window.innerHeight;
      var imgAspect = IMG_W / IMG_H;
      var containerAspect = wW / wH;
      if (containerAspect > imgAspect) {
        dispH = Math.min(wH, window.innerHeight * 0.9);
        dispW = dispH * imgAspect;
      } else {
        dispW = Math.min(wW, window.innerHeight * 0.9 * imgAspect);
        dispH = dispW / imgAspect;
      }
    }

    canvas.style.width = dispW + 'px';
    canvas.style.height = dispH + 'px';

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(dispW * dpr);
    canvas.height = Math.round(dispH * dpr);
    ctx.scale(dpr, dpr);
  }

  function buildParticles() {
    var rnd = mulberry32(2026);
    var c = cell;
    var list = [];
    for (var y = 0; y < dispH; y += c) {
      for (var x = 0; x < dispW; x += c) {
        var u = x / dispW, v = y / dispH;
        var t0 = clamp(u * 0.40 + rnd() * 0.22 - (1 - v) * 0.05, 0, 0.45);
        var ang = -Math.PI / 2 + (rnd() - 0.5) * 1.15 - 0.45 * (u - 0.4);
        var sp = 0.6 + rnd() * 0.9;
        list.push({
          x: x, y: y,
          sx: u * IMG_W, sy: v * IMG_H,
          t0: t0, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
          wob: rnd() * 6.28, streak: rnd() < 0.14
        });
      }
    }
    particles = list;
  }

  function draw(progress) {
    if (!particles) return;
    ctx.clearRect(0, 0, dispW, dispH);
    ctx.drawImage(img, 0, 0, dispW, dispH);

    var d = smooth(clamp((progress - DISSOLVE.start) / (DISSOLVE.end - DISSOLVE.start), 0, 1));
    if (d <= 0) return;

    var c = cell;
    var sCW = c / dispW * IMG_W;
    var sCH = c / dispH * IMG_H;

    ctx.globalCompositeOperation = 'destination-out';
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var local = (d - p.t0) / DISSOLVE.spread;
      if (local <= 0) continue;
      var e = local >= 1 ? 1 : smooth(local);
      ctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, e * 1.4).toFixed(3) + ')';
      ctx.fillRect(p.x - 0.4, p.y - 0.4, c + 0.8, c + 0.8);
    }

    var tail = smooth(clamp((d - 0.8) / 0.2, 0, 1));
    if (tail > 0) {
      ctx.fillStyle = 'rgba(0,0,0,' + tail.toFixed(3) + ')';
      ctx.fillRect(0, 0, dispW, dispH);
    }

    ctx.globalCompositeOperation = 'source-over';
    for (var k = 0; k < particles.length; k++) {
      var p2 = particles[k];
      var local2 = (d - p2.t0) / DISSOLVE.spread;
      if (local2 <= 0 || local2 >= 1) continue;
      var e2 = smooth(local2);
      var wob = Math.sin(p2.wob + e2 * 6) * 10 * e2;
      var dx = p2.vx * DISSOLVE.rise * e2 + wob;
      var dy = p2.vy * DISSOLVE.rise * e2;
      var x = p2.x + dx, y = p2.y + dy;
      var s = c * (1 + e2 * 0.6);

      if (p2.streak && e2 > 0.12) {
        ctx.strokeStyle = 'rgba(222,214,242,' + ((1 - e2) * 0.4).toFixed(3) + ')';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx * 0.10, y - dy * 0.10 + 6);
        ctx.stroke();
      }

      ctx.globalAlpha = Math.max(0, 1 - e2);
      ctx.drawImage(img, p2.sx, p2.sy, sCW, sCH, x - s / 2, y - s / 2, s, s);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function init() {
    sizeCanvas();
    buildParticles();
    draw(0);
    canvas.style.opacity = '1';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    requestTick();
  }

  if (img.complete && img.naturalWidth > 0) {
    init();
  } else {
    img.addEventListener('load', init);
  }

  function readScroll() {
    var hero = document.querySelector('.hero');
    if (!hero) return 0;
    var rect = hero.getBoundingClientRect();
    var progress = -rect.top / rect.height;
    if (window.innerWidth < 768) progress *= 0.6;
    return clamp(progress, 0, 1);
  }

  function loop() {
    current += (target - current) * 0.12;
    if (Math.abs(current - target) < 0.0004) {
      current = target;
      dirty = false;
    }
    draw(current);
    if (dirty || Math.abs(current - target) >= 0.0004) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  }

  function requestTick() {
    target = readScroll();
    dirty = true;
    if (!raf) raf = requestAnimationFrame(loop);
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', function() {
    if (particles) {
      sizeCanvas();
      buildParticles();
    }
    requestTick();
  });
})();
