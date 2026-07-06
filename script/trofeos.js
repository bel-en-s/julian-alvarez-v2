(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  var SHAPES = {
    'mundial': [
      'M42 32 A18 18 0 1 1 78 32 A18 18 0 1 1 42 32',
      'M46 46 C40 64 54 78 48 98',
      'M74 46 C80 64 66 78 72 98',
      'M49 62 C56 68 64 68 71 62',
      'M50 82 C56 88 64 88 70 82',
      'M44 98 L76 98',
      'M40 106 L80 106 L82 122 L38 122 Z'
    ],
    'copa-america': [
      'M44 20 L76 20',
      'M44 20 C44 42 52 56 60 60 C68 56 76 42 76 20',
      'M44 24 C32 26 32 42 46 44',
      'M76 24 C88 26 88 42 74 44',
      'M60 60 L60 76',
      'M50 76 L70 76',
      'M46 88 L74 88',
      'M40 100 L80 100 L82 126 L38 126 Z',
      'M46 112 L74 112'
    ],
    'champions': [
      'M32 24 L88 24',
      'M34 24 C34 56 44 80 60 86 C76 80 86 56 86 24',
      'M33 30 C14 32 12 60 31 62',
      'M87 30 C106 32 108 60 89 62',
      'M47 28 C46 50 52 70 56 78',
      'M73 28 C74 50 68 70 64 78',
      'M60 86 L60 102',
      'M50 114 C52 104 68 104 70 114',
      'M44 120 L76 120 L76 130 L44 130 Z'
    ],
    'finalissima': [
      'M42 18 L78 18',
      'M42 18 C48 36 55 46 56 64 L56 92',
      'M78 18 C72 36 65 46 64 64 L64 92',
      'M52 50 L68 50',
      'M48 92 L72 92',
      'M42 104 L78 104 L80 122 L40 122 Z'
    ],
    'premier': [
      'M40 28 L46 16 L53 24 L60 12 L67 24 L74 16 L80 28',
      'M56.8 8 A3.2 3.2 0 1 1 63.2 8 A3.2 3.2 0 1 1 56.8 8',
      'M40 28 C38 56 46 74 60 80 C74 74 82 56 80 28',
      'M40 34 C22 32 20 60 42 62',
      'M80 34 C98 32 100 60 78 62',
      'M60 80 L60 94',
      'M48 94 L72 94',
      'M42 106 L78 106 L80 124 L40 124 Z'
    ],
    'mundial-clubes': [
      'M44 18 C52 26 68 26 76 18',
      'M44 18 C50 56 52 86 48 108',
      'M76 18 C70 56 68 86 72 108',
      'M60 28 L60 104',
      'M50 64 L70 64',
      'M42 108 L78 108 L80 126 L40 126 Z'
    ],
    'supercopa-europa': [
      'M44 22 L76 22',
      'M46 22 C46 32 50 36 50 42',
      'M74 22 C74 32 70 36 70 42',
      'M50 42 C36 52 38 80 60 88 C82 80 84 52 70 42',
      'M45 28 C32 34 34 56 44 60',
      'M75 28 C88 34 86 56 76 60',
      'M60 88 L60 102',
      'M44 114 L76 114 L78 126 L42 126 Z'
    ],
    'fa-cup': [
      'M56 10 A4 4 0 1 1 64 10 A4 4 0 1 1 56 10',
      'M42 30 C46 18 74 18 78 30',
      'M38 32 L82 32',
      'M38 32 C38 56 46 72 60 76 C74 72 82 56 82 32',
      'M38 36 C20 30 18 54 36 60',
      'M82 36 C100 30 102 54 84 60',
      'M60 76 L60 94',
      'M50 104 C52 96 68 96 70 104',
      'M42 112 L78 112 L80 126 L40 126 Z'
    ],
    'community-shield': [
      'M18 62 A42 42 0 1 1 102 62 A42 42 0 1 1 18 62',
      'M29 62 A31 31 0 1 1 91 62 A31 31 0 1 1 29 62',
      'M43 62 A17 17 0 1 1 77 62 A17 17 0 1 1 43 62',
      'M52 110 L68 110',
      'M44 120 L76 120'
    ],
    'libertadores': [
      'M46 18 L74 18',
      'M46 18 C46 34 52 42 60 44 C68 42 74 34 74 18',
      'M46 21 C36 23 37 36 48 38',
      'M74 21 C84 23 83 36 72 38',
      'M55 44 L52 88',
      'M65 44 L68 88',
      'M44 88 L76 88 L82 130 L38 130 Z',
      'M46 100 L74 100',
      'M46 112 L74 112',
      'M48 122 L72 122'
    ],
    'copa-argentina-trofeo': [
      'M44 16 L76 16',
      'M44 16 C48 44 56 60 58 80',
      'M76 16 C72 44 64 60 62 80',
      'M50 40 L70 40',
      'M60 80 L60 96',
      'M46 96 L74 96 L78 124 L42 124 Z'
    ],
    'supercopa-argentina': [
      'M38 28 L82 28',
      'M38 28 C42 48 52 56 60 56 C68 56 78 48 82 28',
      'M54 40 A6 6 0 1 1 66 40 A6 6 0 1 1 54 40',
      'M60 56 L60 92',
      'M55 74 A5 5 0 1 1 65 74 A5 5 0 1 1 55 74',
      'M44 104 L76 104 L78 122 L42 122 Z'
    ],
    'campeon-argentina': [
      'M46 24 L74 24',
      'M46 24 C46 46 52 60 60 64 C68 60 74 46 74 24',
      'M46 28 C28 24 26 54 46 56',
      'M74 28 C92 24 94 54 74 56',
      'M60 64 L60 78',
      'M50 78 L70 78',
      'M44 92 L76 92',
      'M40 106 L80 106 L82 126 L38 126 Z'
    ],
    'trofeo-campeones': [
      'M46 14 L74 14',
      'M46 14 L72 38 L46 62 L72 86 L54 104',
      'M74 14 L48 38 L74 62 L48 86 L66 104',
      'M42 110 L78 110 L80 126 L40 126 Z'
    ],
    'jugador-temporada': [
      'M40 16 L80 16 L80 104 L40 104 Z',
      'M46 24 L74 24 L74 96 L46 96 Z',
      'M46 92 L74 30',
      'M53 40 A7 7 0 1 1 67 40 A7 7 0 1 1 53 40',
      'M52 104 L46 124 L74 124 L68 104',
      'M40 130 L80 130'
    ],
    'goleador': [
      'M43 50 A17 17 0 1 1 77 50 A17 17 0 1 1 43 50',
      'M48 41 C56 49 64 49 72 41',
      'M48 59 C56 51 64 51 72 59',
      'M40 86 C24 70 22 42 38 24',
      'M80 86 C96 70 98 42 82 24',
      'M40 90 L80 90 L74 104 L46 104 Z',
      'M60 10 L65 17 L60 24 L55 17 Z'
    ]
  };

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function hash(a, b) {
    var x = Math.sin(a * 127.1 + (b || 0) * 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  var meter = null;
  function measurePath(d) {
    if (!meter) {
      meter = el('svg', { width: 0, height: 0, 'aria-hidden': 'true' });
      meter.style.position = 'absolute';
      meter.style.overflow = 'hidden';
      meter.style.pointerEvents = 'none';
      document.body.appendChild(meter);
    }
    var p = el('path', { d: d });
    meter.appendChild(p);
    return p;
  }

  function buildTrophy(svg) {
    var shape = SHAPES[svg.getAttribute('data-trofeo')];
    if (!shape || svg.childNodes.length) return;

    var STEP = 5.5;
    var paths = [];
    var all = [];

    shape.forEach(function (d, pi) {
      var probe = measurePath(d);
      var len = probe.getTotalLength();
      var n = Math.max(3, Math.round(len / STEP));
      var pts = [];
      for (var i = 0; i <= n; i++) {
        var pt = probe.getPointAtLength((len * i) / n);
        pts.push({ x: pt.x, y: pt.y });
        all.push({ x: pt.x, y: pt.y, p: pi, i: i });
      }
      probe.remove();
      var poly = 'M' + pts.map(function (q) {
        return q.x.toFixed(1) + ' ' + q.y.toFixed(1);
      }).join(' L');
      paths.push({ pts: pts, d: poly });
    });

    var gChords = el('g', { 'class': 'tj-chords' });
    var gStrands = el('g', { 'class': 'tj-strands' });
    var gNodes = el('g', { 'class': 'tj-nodes' });

    var chords = 0, MAXC = 34;
    for (var a = 0; a < all.length && chords < MAXC; a += 2) {
      if (hash(a, 7) > 0.6) continue;
      var A = all[a], best = null, bd = 1e9;
      for (var b = a + 1; b < all.length; b++) {
        var B = all[b];
        if (A.p === B.p && Math.abs(A.i - B.i) < 5) continue;
        var dx = A.x - B.x, dy = A.y - B.y, d2 = dx * dx + dy * dy;
        if (d2 < 100 || d2 > 620) continue;
        var score = d2 * (A.p === B.p ? 1.6 : 1);
        if (score < bd) { bd = score; best = B; }
      }
      if (best) {
        var ln = el('line', {
          'class': 'tj-chord',
          x1: A.x.toFixed(1), y1: A.y.toFixed(1),
          x2: best.x.toFixed(1), y2: best.y.toFixed(1)
        });
        ln.style.transitionDelay = (0.7 + hash(a, 3) * 0.9) + 's';
        gChords.appendChild(ln);
        chords++;
      }
    }

    paths.forEach(function (p, i) {
      var path = el('path', { 'class': 'tj-strand', d: p.d });
      var L = Math.ceil(p.pts.length * STEP * 1.4);
      path.style.strokeDasharray = L;
      path.style.strokeDashoffset = L;
      path.style.transitionDelay = (i * 0.09) + 's';
      gStrands.appendChild(path);
    });

    all.forEach(function (q, i) {
      var hot = hash(i, 11) < 0.16;
      var c = el('circle', {
        'class': hot ? 'tj-node tj-node--hot' : 'tj-node',
        cx: q.x.toFixed(1), cy: q.y.toFixed(1),
        r: (hot ? 1.5 : 0.8 + hash(i, 5) * 0.5).toFixed(2)
      });
      c.style.transitionDelay = (0.4 + hash(i, 9) * 1.1) + 's';
      gNodes.appendChild(c);
    });

    svg.appendChild(gChords);
    svg.appendChild(gStrands);
    svg.appendChild(gNodes);
  }

  function init() {
    document.querySelectorAll('svg[data-trofeo]').forEach(buildTrophy);

    if (meter) { meter.remove(); meter = null; }

    var cards = document.querySelectorAll('.t-card');
    if ('IntersectionObserver' in window && cards.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
      cards.forEach(function (c) { io.observe(c); });
    } else {
      cards.forEach(function (c) { c.classList.add('is-in'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
