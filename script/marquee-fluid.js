(function () {
  const section = document.querySelector('.marquee-banner');
  if (!section) return;

  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '-1';
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.setAttribute('aria-hidden', 'true');

  const defs = document.createElementNS(NS, 'defs');
  const filter = document.createElementNS(NS, 'filter');
  filter.setAttribute('id', 'bg-smudge-goo');
  const blur = document.createElementNS(NS, 'feGaussianBlur');
  blur.setAttribute('in', 'SourceGraphic');
  blur.setAttribute('stdDeviation', '35');
  filter.appendChild(blur);
  const cm = document.createElementNS(NS, 'feColorMatrix');
  cm.setAttribute('type', 'matrix');
  cm.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -12');
  filter.appendChild(cm);
  defs.appendChild(filter);

  const mask = document.createElementNS(NS, 'mask');
  mask.setAttribute('id', 'bg-smudge-mask');
  const blobs = document.createElementNS(NS, 'g');
  blobs.setAttribute('filter', 'url(#bg-smudge-goo)');
  blobs.setAttribute('fill', '#fff');
  mask.appendChild(blobs);
  defs.appendChild(mask);
  svg.appendChild(defs);
  section.appendChild(svg);

  function syncViewBox() {
    const rect = section.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  }
  syncViewBox();
  window.addEventListener('resize', syncViewBox);

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '0';
  overlay.style.pointerEvents = 'none';
  overlay.style.background = 'radial-gradient(circle at 50% 50%, rgba(81,57,141,0.35), rgba(30,32,36,0.95))';
  overlay.style.mask = 'url(#bg-smudge-mask)';
  overlay.style.webkitMask = 'url(#bg-smudge-mask)';
  section.appendChild(overlay);

  function getRelativePos(clientX, clientY) {
    const rect = section.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function stampAt(x, y, radius) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
    c.setAttribute('r', radius);
    c.setAttribute('fill', '#fff');
    blobs.prepend(c);

    const start = performance.now();
    const expandEnd = start + 1500;
    const fadeStart = start + 2500;
    const fadeEnd = fadeStart + 3000;

    function tick() {
      const now = performance.now();
      if (now >= fadeEnd) {
        if (c.parentNode) c.parentNode.removeChild(c);
        return;
      }
      let r = radius;
      if (now < expandEnd) {
        const t = (now - start) / 1500;
        r = radius + radius * 2 * (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      }
      if (now >= fadeStart) {
        const t = Math.min((now - fadeStart) / 3000, 1);
        r *= 1 - t * t * t;
      }
      c.setAttribute('r', Math.max(0, r));
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  let started = false;
  let raf = null;

  function onPointerMove(clientX, clientY) {
    const pos = getRelativePos(clientX, clientY);
    if (!started) {
      pointer.x = smooth.x = pos.x;
      pointer.y = smooth.y = pos.y;
      started = true;
      return;
    }
    pointer.x = pos.x;
    pointer.y = pos.y;
  }

  section.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
  section.addEventListener('touchmove', (e) => {
    e.preventDefault();
    onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  section.addEventListener('click', (e) => {
    const pos = getRelativePos(e.clientX, e.clientY);
    const radii = [30, 45, 25, 35, 20, 40, 28, 32, 38, 22];
    const offsets = [[0,0],[-15,-10],[15,-8],[-8,15],[12,12],[-20,5],[8,-18],[-5,-20],[18,8],[-12,-5]];
    offsets.forEach(([ox, oy], i) => stampAt(pos.x + ox, pos.y + oy, radii[i]));
  });

  function update() {
    if (started) {
      smooth.x += (pointer.x - smooth.x) * 0.12;
      smooth.y += (pointer.y - smooth.y) * 0.12;
      const speed = Math.hypot(pointer.x - smooth.x, pointer.y - smooth.y);
      if (speed > 0.5) {
        stampAt(smooth.x, smooth.y, Math.max(8, speed * 0.25));
      }
    }
    raf = requestAnimationFrame(update);
  }
  raf = requestAnimationFrame(update);
})();
