// ================================================================
//  APP.JS — Julián Alvarez — Vanilla Migration
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ── State ────────────────────────────────────────────────────
  const isMobile = () => window.innerWidth <= 1000;
  let lenis = null;
  let isInitialLoad = true;

  // ── 1. Lenis smooth scrolling ────────────────────────────────
  function initLenis() {
    const mobile = isMobile();
    const opts = mobile ? {
      duration: 0.6,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical', gestureDirection: 'vertical',
      smooth: true, smoothTouch: true, touchMultiplier: 1,
      infinite: false, lerp: 0.15, wheelMultiplier: 0,
      orientation: 'vertical', syncTouch: false,
    } : {
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical', gestureDirection: 'vertical',
      smooth: true, smoothTouch: false, touchMultiplier: 2,
      infinite: false, lerp: 0.1, wheelMultiplier: 1,
      orientation: 'vertical', smoothWheel: true, syncTouch: true,
    };
    lenis = new Lenis(opts);
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  if (typeof Lenis !== 'undefined') initLenis();
  else document.addEventListener('lenis:loaded', initLenis);

  // ── 2. Preloader ─────────────────────────────────────────────
  function runPreloader() {
    const wrapper = document.getElementById('preloader');
    if (!wrapper) return;

    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    document.fonts.ready.then(() => {
      const logoEl = document.querySelector('.preloader-logo h1');
      if (!logoEl) { finishPreloader(); return; }

      // Manual char split for the preloader logo
      const text = logoEl.textContent || '';
      logoEl.innerHTML = '';
      const chars = [];
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.cssText = 'position:relative;display:inline-block;will-change:transform;';
        logoEl.appendChild(span);
        chars.push(span);
      }

      gsap.set(chars, { x: '110%' });
      gsap.set(logoEl, { opacity: 1 });

      function animateProgress(duration = 4.75) {
        const tl = gsap.timeline();
        const steps = 5;
        let prog = 0;
        for (let i = 0; i < steps; i++) {
          const last = i === steps - 1;
          prog = last ? 1 : Math.min(prog + Math.random() * 0.3 + 0.1, 0.9);
          tl.to('.preloader-progress-bar', { scaleX: prog, duration: duration / steps, ease: 'power2.out' });
        }
        return tl;
      }

      const maskScale = isMobile() ? 25 : 15;
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          if (lenis) lenis.start();
          document.body.style.overflow = '';
          setTimeout(() => { if (wrapper) wrapper.style.display = 'none'; }, 100);
        }
      });

      tl.to(chars, { x: '0%', stagger: 0.05, ease: 'power4.out', duration: 1 })
        .add(animateProgress(), '<')
        .set('.preloader-progress-bar', { backgroundColor: 'var(--violet)' })
        .to(chars, { x: '-110%', stagger: 0.05, duration: 1, ease: 'power4.out' }, '-=0.5')
        .to('.preloader-progress', { opacity: 0, duration: 0.3, ease: 'power3.out' }, '-=0.5')
        .to('.preloader-video', { opacity: 0, duration: 0.3, ease: 'power3.out' }, '-=0.5')
        .to('.preloader-mask', { scale: maskScale, duration: 1.25, ease: 'power3.out' }, '-=0.5')
        .to('.preloader-bg', { opacity: 0, duration: 0.3, ease: 'power3.out' }, '-=0.2')
        .to({}, { duration: 1 });
    });
  }

  function finishPreloader() {
    if (lenis) lenis.start();
    document.body.style.overflow = '';
    const w = document.getElementById('preloader');
    if (w) w.style.display = 'none';
  }

  runPreloader();

  // ── 3. Background Web Canvas ─────────────────────────────────
  (function() {
    const canvas = document.getElementById('bg-web-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let ww = 0, wh = 0, anchors = [], raf = null;
    const MAX_DIST = 400, LIFETIME = 1200, MAX_LINES = 3000;
    let lines = [], lastGen = 0, lastRandomPt = null;

    const distSq = (a, x, y) => (a.x - x) ** 2 + (a.y - y) ** 2;

    function resize() {
      ww = window.innerWidth; wh = window.innerHeight;
      canvas.width = Math.floor(ww * dpr);
      canvas.height = Math.floor(wh * dpr);
      canvas.style.width = ww + 'px';
      canvas.style.height = wh + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = []; lastRandomPt = null;
      const rx = ww * 0.3, ry = wh * 0.35;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function pushLine(x1, y1, x2, y2, opacity) {
      const dx = x2 - x1, dy = y2 - y1, d = Math.sqrt(dx * dx + dy * dy);
      if (d > MAX_DIST) { const s = MAX_DIST / d; x2 = x1 + dx * s; y2 = y1 + dy * s; }
      lines.push({ x1, y1, x2, y2, t: performance.now(), opacity });
      if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    }

    function biasedCoord(size) {
      if (Math.random() < 0.7) return Math.random() < 0.5 ? Math.random() * size * 0.3 : size - Math.random() * size * 0.3;
      return Math.random() * size;
    }

    function genPatch() {
      const tx = biasedCoord(ww), ty = biasedCoord(wh);
      const sorted = anchors.slice().sort((a, b) => distSq(a, tx, ty) - distSq(b, tx, ty));
      pushLine(sorted[0].x, sorted[0].y, tx, ty, 0.45 + Math.random() * 0.15);
      pushLine(sorted[1].x, sorted[1].y, tx, ty, 0.2 + Math.random() * 0.15);
      if (lastRandomPt) pushLine(lastRandomPt.x, lastRandomPt.y, tx, ty, 0.55 + Math.random() * 0.2);
      lastRandomPt = { x: tx, y: ty };
      if (Math.random() > 0.65) {
        const i1 = Math.floor(Math.random() * 8), i2 = (i1 + 1 + Math.floor(Math.random() * 2)) % 8;
        pushLine(anchors[i1].x, anchors[i1].y, anchors[i2].x, anchors[i2].y, 0.08 + Math.random() * 0.06);
      }
    }

    function render(now) {
      ctx.clearRect(0, 0, ww, wh);
      const cutoff = now - LIFETIME;
      let write = 0;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (ln.t < cutoff) continue;
        lines[write++] = ln;
        const age = (now - ln.t) / LIFETIME;
        ctx.strokeStyle = `rgba(216,200,245,${(1 - age) * ln.opacity})`;
        ctx.lineWidth = 1.2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(ln.x1, ln.y1); ctx.lineTo(ln.x2, ln.y2); ctx.stroke();
      }
      lines.length = write;
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    for (let i = 0; i < 6; i++) setTimeout(genPatch, i * 200 + 800);

    window.addEventListener('scroll', () => {
      const now = performance.now();
      if (now - lastGen < 120) return;
      lastGen = now; genPatch();
      if (Math.random() > 0.7) genPatch();
    }, { passive: true });
  })();

  // ── 4. Hero Alvarez Canvas ────────────────────────────────────
  (function() {
    const canvas = document.getElementById('hero-alvarez-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let ww = 0, wh = 0, anchors = [], lastPt = null, raf = null;
    const LIFETIME = 1900, MAX_LINES = 1400;
    let lines = [], mounted = true;

    function repaint() {
      ww = window.innerWidth; wh = window.innerHeight;
      canvas.width = Math.floor(ww * dpr);
      canvas.height = Math.floor(wh * dpr);
      canvas.style.width = ww + 'px';
      canvas.style.height = wh + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastPt = null; lines = [];
      const rx = ww * 0.3, ry = wh * 0.35;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
      }
    }
    repaint();
    window.addEventListener('resize', repaint);

    function render(now) {
      if (!mounted || !ctx) return;
      ctx.clearRect(0, 0, ww, wh);
      const cutoff = now - LIFETIME;
      let write = 0;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (ln.t < cutoff) continue;
        lines[write++] = ln;
        const age = (now - ln.t) / LIFETIME;
        ctx.strokeStyle = `rgba(216,200,245,${(1 - age) * ln.opacity})`;
        ctx.lineWidth = 0.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(ln.x1, ln.y1); ctx.lineTo(ln.x2, ln.y2); ctx.stroke();
      }
      lines.length = write;
      if (mounted) raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    function pushLine(x1, y1, x2, y2, opacity) {
      lines.push({ x1, y1, x2, y2, t: performance.now(), opacity });
      if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    }

    document.addEventListener('pointermove', e => {
      const sorted = anchors.slice().sort((a, b) =>
        (a.x - e.clientX) ** 2 + (a.y - e.clientY) ** 2 - ((b.x - e.clientX) ** 2 + (b.y - e.clientY) ** 2));
      pushLine(sorted[0].x, sorted[0].y, e.clientX, e.clientY, 0.55);
      pushLine(sorted[1].x, sorted[1].y, e.clientX, e.clientY, 0.32);
      if (lastPt) pushLine(lastPt.x, lastPt.y, e.clientX, e.clientY, 0.7);
      lastPt = { x: e.clientX, y: e.clientY };
    });
  })();

  // ── 5. Menu ───────────────────────────────────────────────────
  (function() {
    const menu = document.getElementById('menu');
    const menuHeader = document.getElementById('menu-header');
    const hamburger = document.getElementById('menu-hamburger');
    const toggleBtn = document.getElementById('menu-toggle-btn');
    const layer = document.getElementById('menu-layer');
    const scrim = document.getElementById('menu-scrim');
    const frame = document.getElementById('menu-frame');
    const menuWeb = document.getElementById('menu-web');

    let isOpen = false, isAnimating = false;

    function primeWeb() {
      if (!menuWeb) return;
      menuWeb.querySelectorAll('path').forEach(p => {
        let len;
        try { len = p.getTotalLength(); } catch (_) { return; }
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      });
    }

    function openMenu() {
      isAnimating = true; isOpen = true;
      const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });

      tl.to(layer, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
        .to(scrim, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);

      if (menuWeb) {
        const origin = menuWeb.querySelector('.origin');
        if (origin) tl.fromTo(origin, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2.5)' }, 0.05);

        const strands = menuWeb.querySelectorAll('.strand');
        if (strands.length) tl.to(strands, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut', stagger: 0.08 }, 0.08);

        const auxs = menuWeb.querySelectorAll('.auxiliary');
        if (auxs.length) tl.to(auxs, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut', stagger: 0.04 }, 0.35);

        const nine = menuWeb.querySelector('.nine');
        if (nine) tl.to(nine, { strokeDashoffset: 0, duration: 1.0, ease: 'power3.inOut' }, 0.55);

        const anchors = menuWeb.querySelectorAll('.anchor:not(.origin)');
        if (anchors.length) tl.fromTo(anchors, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 0.9, scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.15 }, 1.0);

        const dangles = menuWeb.querySelectorAll('.dangle');
        if (dangles.length) tl.to(dangles, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06 }, 1.8);

        const tips = menuWeb.querySelectorAll('.dangle-tip');
        if (tips.length) tl.fromTo(tips, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 0.85, scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.06 }, 2.2);
      }

      const items = frame ? Array.from(frame.querySelectorAll('.ja-menu-arana__item')) : [];
      if (items.length) tl.fromTo(items, { opacity: 0, xPercent: -50, yPercent: -50, scale: 0.6 }, { opacity: 1, xPercent: -50, yPercent: -50, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.08 }, 0.35);

      tl.call(() => { if (layer) layer.classList.add('is-open'); }, [], 0);
    }

    function closeMenu() {
      const tl = gsap.timeline({ onComplete: () => { isOpen = false; isAnimating = false; if (layer) layer.classList.remove('is-open'); } });
      tl.to(layer, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
    }

    function toggleMenu(e) {
      if (isAnimating) return;
      if (e) e.stopPropagation();
      if (isOpen) closeMenu();
      else openMenu();
      hamburger.classList.toggle('open', !isOpen);
    }

    primeWeb();

    function fitFrame() {
      if (!frame) return;
      const w = window.innerWidth, h = window.innerHeight;
      const s = Math.max(0.42, Math.min(1, w / 800, h / 560));
      frame.style.setProperty('--s', s.toFixed(4));
    }
    fitFrame();
    window.addEventListener('resize', fitFrame);

    menuHeader.addEventListener('click', toggleMenu);
    toggleBtn.addEventListener('click', toggleMenu);
    scrim.addEventListener('click', closeMenu);

    document.querySelectorAll('[data-menu-link]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href') + '?t=' + Date.now();
        window.location.href = href;
      });
    });
  })();

  // ── 6. Hero Mouse Parallax ───────────────────────────────────
  (function() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = null;

    window.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function loop() {
      cx += (mx - cx) * 0.06; cy += (my - cy) * 0.06;
      document.documentElement.style.setProperty('--mx', cx.toFixed(4));
      document.documentElement.style.setProperty('--my', cy.toFixed(4));
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
  })();

  // ── 7. DotMatrix (Three.js) ───────────────────────────────────
  (function() {
    const wrapper = document.getElementById('dot-matrix');
    if (!wrapper || typeof THREE === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const checkPreloader = setInterval(() => {
      const preloader = document.getElementById('preloader');
      if (!preloader || preloader.style.display === 'none') {
        clearInterval(checkPreloader);
        initDotMatrix();
      }
    }, 200);

    function initDotMatrix() {
      const color1 = '#51398D', color2 = '#7c5cbf', color3 = '#3d2a6b', color4 = '#9b7fd4';
      const downsample = 0.5, brushSize = 25, brushStrength = 0.3, fluidDecay = 0.98, trailLength = 0.8, stopDecay = 0.85;
      const colorIntensity = 0.4, softness = 2, distortionAmount = 1.5;

      function hexToRgb(hex) {
        return [parseInt(hex.slice(1,3),16)/255, parseInt(hex.slice(3,5),16)/255, parseInt(hex.slice(5,7),16)/255];
      }

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      wrapper.appendChild(renderer.domElement);

      const simW = Math.floor(window.innerWidth * downsample);
      const simH = Math.floor(window.innerHeight * downsample);

      const fluidTarget1 = new THREE.WebGLRenderTarget(simW, simH, {
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat, type: THREE.FloatType
      });
      const fluidTarget2 = new THREE.WebGLRenderTarget(simW, simH, {
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat, type: THREE.FloatType
      });

      let currentFluidTarget = fluidTarget1, previousFluidTarget = fluidTarget2, frameCount = 0;

      const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

      const fluidShader = `uniform float iTime; uniform vec2 iResolution; uniform vec4 iMouse; uniform int iFrame; uniform sampler2D iPreviousFrame; uniform float uBrushSize; uniform float uBrushStrength; uniform float uFluidDecay; uniform float uTrailLength; uniform float uStopDecay; varying vec2 vUv;
      vec2 ur, U;
      float ln(vec2 p, vec2 a, vec2 b) { return length(p-a-(b-a)*clamp(dot(p-a,b-a)/dot(b-a,b-a),0.,1.)); }
      vec4 t(vec2 v, int a, int b) { return texture2D(iPreviousFrame, fract((v+vec2(float(a),float(b)))/ur)); }
      vec4 t(vec2 v) { return texture2D(iPreviousFrame, fract(v/ur)); }
      float area(vec2 a, vec2 b, vec2 c) { float A=length(b-c),B=length(c-a),C=length(a-b),s=0.5*(A+B+C); return sqrt(s*(s-A)*(s-B)*(s-C)); }
      void main() {
        U=vUv*iResolution; ur=iResolution.xy;
        if(iFrame<1){ float w=0.5+sin(0.2*U.x)*0.5; float q=length(U-0.5*ur); gl_FragColor=vec4(0.1*exp(-0.001*q*q),0,0,w); }
        else {
          vec2 v=U,A=v+vec2(1,1),B=v+vec2(1,-1),C=v+vec2(-1,1),D=v+vec2(-1,-1);
          for(int i=0;i<8;i++){ v-=t(v).xy; A-=t(A).xy; B-=t(B).xy; C-=t(C).xy; D-=t(D).xy; }
          vec4 me=t(v),n=t(v,0,1),e=t(v,1,0),s=t(v,0,-1),w=t(v,-1,0);
          vec4 ne=.25*(n+e+s+w); me=mix(t(v),ne,vec4(0.15,0.15,0.95,0.));
          me.z=me.z-0.01*((area(A,B,C)+area(B,C,D))-4.);
          vec4 pr=vec4(e.z,w.z,n.z,s.z); me.xy=me.xy+100.*vec2(pr.x-pr.y,pr.z-pr.w)/ur;
          me.xy*=uFluidDecay; me.z*=uTrailLength;
          if(iMouse.z>0.0){
            vec2 mousePos=iMouse.xy,mousePrev=iMouse.zw,mouseVel=mousePos-mousePrev;
            float velMagnitude=length(mouseVel),q=ln(U,mousePos,mousePrev);
            vec2 m=mousePos-mousePrev; float l=length(m);
            if(l>0.0) m=min(l,10.0)*m/l;
            float brushSizeFactor=1e-4/uBrushSize,strengthFactor=0.03*uBrushStrength;
            float falloff=exp(-brushSizeFactor*q*q*q); falloff=pow(falloff,0.5);
            me.xyw+=strengthFactor*falloff*vec3(m,10.);
            if(velMagnitude<2.0){ float distToCursor=length(U-mousePos); float influence=exp(-distToCursor*0.01); float cursorDecay=mix(1.0,uStopDecay,influence); me.xy*=cursorDecay; me.z*=cursorDecay; }
          }
          gl_FragColor=clamp(me,-0.4,0.4);
        }
      }`;

      const displayShader = `uniform float iTime; uniform vec2 iResolution; uniform sampler2D iFluid; uniform float uDistortionAmount; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3; uniform vec3 uColor4; uniform float uColorIntensity; uniform float uSoftness; varying vec2 vUv;
      void main() {
        vec2 fragCoord=vUv*iResolution; vec4 fluid=texture2D(iFluid,vUv); vec2 fluidVel=fluid.xy;
        float mr=min(iResolution.x,iResolution.y); vec2 uv=(fragCoord*2.0-iResolution.xy)/mr;
        uv+=fluidVel*(0.5*uDistortionAmount);
        float d=-iTime*0.5,a=0.0;
        for(float i=0.0;i<8.0;++i){ a+=cos(i-d-a*uv.x); d+=sin(uv.y*i+a); }
        d+=iTime*0.5;
        float mixer1=cos(uv.x*d)*0.5+0.5,mixer2=cos(uv.y*a)*0.5+0.5,mixer3=sin(d+a)*0.5+0.5;
        float smoothAmount=clamp(uSoftness*0.1,0.0,0.9);
        mixer1=mix(mixer1,0.5,smoothAmount); mixer2=mix(mixer2,0.5,smoothAmount); mixer3=mix(mixer3,0.5,smoothAmount);
        vec3 col=mix(uColor1,uColor2,mixer1); col=mix(col,uColor3,mixer2); col=mix(col,uColor4,mixer3*0.4);
        col*=uColorIntensity; gl_FragColor=vec4(col,0.35);
      }`;

      const fluidMaterial = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 }, iResolution: { value: new THREE.Vector2(simW, simH) },
          iMouse: { value: new THREE.Vector4(0,0,0,0) }, iFrame: { value: 0 },
          iPreviousFrame: { value: null }, uBrushSize: { value: brushSize },
          uBrushStrength: { value: brushStrength }, uFluidDecay: { value: fluidDecay },
          uTrailLength: { value: trailLength }, uStopDecay: { value: stopDecay }
        },
        vertexShader, fragmentShader: fluidShader
      });

      const displayMaterial = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 }, iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          iFluid: { value: null }, uDistortionAmount: { value: distortionAmount },
          uColor1: { value: new THREE.Vector3(...hexToRgb(color1)) },
          uColor2: { value: new THREE.Vector3(...hexToRgb(color2)) },
          uColor3: { value: new THREE.Vector3(...hexToRgb(color3)) },
          uColor4: { value: new THREE.Vector3(...hexToRgb(color4)) },
          uColorIntensity: { value: colorIntensity }, uSoftness: { value: softness }
        },
        vertexShader, fragmentShader: displayShader
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
      const displayPlane = new THREE.Mesh(geometry, displayMaterial);

      let mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0, lastMoveTime = 0;

      document.addEventListener('mousemove', e => {
        const rect = wrapper.getBoundingClientRect();
        prevMouseX = mouseX; prevMouseY = mouseY;
        mouseX = e.clientX - rect.left; mouseY = rect.height - (e.clientY - rect.top);
        lastMoveTime = performance.now();
        fluidMaterial.uniforms.iMouse.value.set(mouseX, mouseY, prevMouseX, prevMouseY);
      });

      document.addEventListener('mouseleave', () => { fluidMaterial.uniforms.iMouse.value.set(0,0,0,0); });

      function resize() {
        const w = window.innerWidth, h = window.innerHeight;
        const sw = Math.floor(w * downsample), sh = Math.floor(h * downsample);
        renderer.setSize(w, h);
        fluidMaterial.uniforms.iResolution.value.set(sw, sh);
        displayMaterial.uniforms.iResolution.value.set(w, h);
        fluidTarget1.setSize(sw, sh); fluidTarget2.setSize(sw, sh);
        frameCount = 0;
      }
      window.addEventListener('resize', resize);

      function animate() {
        requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        fluidMaterial.uniforms.iTime.value = time;
        displayMaterial.uniforms.iTime.value = time;
        fluidMaterial.uniforms.iFrame.value = frameCount;
        if (performance.now() - lastMoveTime > 100) fluidMaterial.uniforms.iMouse.value.set(0,0,0,0);
        fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
        renderer.setRenderTarget(currentFluidTarget);
        renderer.render(fluidPlane, camera);
        displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
        renderer.setRenderTarget(null);
        renderer.render(displayPlane, camera);
        const temp = currentFluidTarget; currentFluidTarget = previousFluidTarget; previousFluidTarget = temp;
        frameCount++;
      }
      animate();
    }
  })();

  // ── 8. NextMatch ──────────────────────────────────────────────
  (function() {
    const card = document.getElementById('next-match');
    if (!card) return;

    const kickoffEl = { days: document.getElementById('nm-days'), hours: document.getElementById('nm-hours'), minutes: document.getElementById('nm-minutes'), seconds: document.getElementById('nm-seconds') };
    const homeEl = document.getElementById('nm-home'), awayEl = document.getElementById('nm-away'), compEl = document.getElementById('nm-comp'), extraEl = document.getElementById('nm-extra'), toggleEl = document.getElementById('nm-toggle'), canvas = document.getElementById('nm-canvas');

    let match = {
      kickoff: '2026-06-15T21:00:00+02:00',
      home: 'Atlético de Madrid', away: 'Real Madrid',
      competition: 'LaLiga', extra: 'Metropolitano'
    };
    let minimized = isMobile();

    function getTimeLeft(kickoff) {
      const diff = new Date(kickoff).getTime() - Date.now();
      if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
      return {
        days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      };
    }

    function updateDisplay() {
      const tl = getTimeLeft(match.kickoff);
      kickoffEl.days.textContent = tl.days;
      kickoffEl.hours.textContent = tl.hours;
      kickoffEl.minutes.textContent = tl.minutes;
      kickoffEl.seconds.textContent = tl.seconds;
    }
    updateDisplay();
    setInterval(updateDisplay, 1000);

    function updateMatchData(data) {
      match = data;
      updateDisplay();
      homeEl.textContent = data.home;
      awayEl.textContent = data.away;
      compEl.textContent = data.competition;
      extraEl.textContent = data.extra;
    }

    const API_KEY = 'AIzaSyAbz5asrrgmNzwHVNoNVDbvZmwNvgtUk0M';
    const SHEET_ID = '1R-2071jn0jZ50BV14l7Nw27hCaU6ZahPu1-WpFi8KhA';

    async function fetchNextMatch() {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Hoja%201!A2:E?key=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (!data.values?.length) return;
        const rows = data.values;
        const now = Date.now();
        const upcoming = rows
          .map(r => ({ kickoff: r[0]||'', home: r[1]||'', away: r[2]||'', competition: r[3]||'', extra: r[4]||'' }))
          .filter(m => new Date(m.kickoff).getTime() > now)
          .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
        if (upcoming[0]) updateMatchData(upcoming[0]);
      } catch (_) {}
    }

    fetchNextMatch();

    // Minimize/maximize toggle
    let minimizedState = minimized;
    if (minimized) card.classList.add('is-min');

    toggleEl.addEventListener('click', () => {
      minimizedState = !minimizedState;
      card.classList.toggle('is-min', minimizedState);
      gsap.to(card, { scale: minimizedState ? 0.92 : 1, transformOrigin: 'bottom left', duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
    });

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      ScrollTrigger.create({
        trigger: heroSection,
        start: 'bottom top',
        onLeave: () => {
          if (!minimizedState) {
            minimizedState = true;
            card.classList.add('is-min');
            gsap.to(card, { scale: 0.92, transformOrigin: 'bottom left', duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
          }
        },
        onEnter: () => {
          if (minimizedState) {
            minimizedState = false;
            card.classList.remove('is-min');
            gsap.to(card, { scale: 1, transformOrigin: 'bottom left', duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
          }
        }
      });
    }

    // Canvas web effect
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      let w = 0, h = 0, anchors = [], lastPt = null, inside = false;

      function resizeCanvas() {
        const r = card.getBoundingClientRect();
        w = r.width; h = r.height;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const cx = w / 2, cy = h / 2, rx = w * 0.55, ry = h * 0.6;
        anchors = [];
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          anchors.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
        }
        ctx.clearRect(0, 0, w, h);
      }
      resizeCanvas();
      new ResizeObserver(resizeCanvas).observe(card);

      function strand(x1, y1, x2, y2, alpha) {
        ctx.strokeStyle = `rgba(216,200,245,${alpha})`;
        ctx.lineWidth = 0.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }

      const onMove = e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,0.04)'; ctx.fillRect(0, 0, w, h); ctx.restore();
        const sorted = anchors.slice().sort((a, b) => (a.x-x)**2 + (a.y-y)**2 - ((b.x-x)**2 + (b.y-y)**2));
        strand(sorted[0].x, sorted[0].y, x, y, 0.55);
        strand(sorted[1].x, sorted[1].y, x, y, 0.32);
        if (lastPt && inside) strand(lastPt.x, lastPt.y, x, y, 0.7);
        lastPt = { x, y };
      };

      const onEnter = () => { inside = true; lastPt = null; };
      const onLeave = () => {
        inside = false;
        let t = 0;
        const fade = setInterval(() => {
          t++; ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0, 0, w, h); ctx.restore();
          if (t > 14) { clearInterval(fade); ctx.clearRect(0, 0, w, h); }
        }, 30);
      };

      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
    }
  })();

  // ── 9. About Video ───────────────────────────────────────────
  (function() {
    const video = document.getElementById('about-video');
    if (!video) return;
    video.play().catch(() => {});

    const playBtn = document.getElementById('about-video-play');
    const soundBtn = document.getElementById('about-video-sound');
    const LOW_VOL = 0.15, FULL_VOL = 1.0;
    let activeVolume = 0, volState = 'muted';

    playBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (video.paused) video.play();
      else video.pause();
      updatePlayIcon();
    });

    function updatePlayIcon() {
      playBtn.innerHTML = video.paused
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    }

    function getSoundIcon(state) {
      if (state === 'muted') return '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>';
      if (state === 'low') return '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>';
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';
    }

    soundBtn.addEventListener('click', e => {
      e.stopPropagation();
      const newVol = video.volume > 0.5 ? LOW_VOL : FULL_VOL;
      activeVolume = newVol;
      video.muted = false;
      gsap.to(video, { volume: newVol, duration: 0.3, ease: 'power2.out' });
      volState = newVol === LOW_VOL ? 'low' : 'high';
      soundBtn.innerHTML = getSoundIcon(volState);
    });

    video.addEventListener('click', () => {
      if (video.paused) video.play();
      else video.pause();
      updatePlayIcon();
    });

    const wrapper = document.getElementById('about-video-wrapper');
    if (wrapper) {
      ScrollTrigger.create({
        trigger: wrapper, start: 'top bottom', end: 'bottom top',
        onUpdate: self => {
          const p = self.progress, fullyVisible = p > 0 && p < 1;
          const target = fullyVisible ? activeVolume : 0;
          gsap.to(video, { volume: target, duration: 0.3, ease: 'power2.out' });
          if (target < 0.05) { volState = 'muted'; soundBtn.innerHTML = getSoundIcon('muted'); }
        }
      });
    }
  })();

  // ── 10. Horizontal Scroll ─────────────────────────────────────
  (function() {
    const hScroll = document.getElementById('h-scroll');
    const hTrack = document.getElementById('h-scroll-track');
    if (!hScroll || !hTrack || isMobile()) return;

    let retries = 0;
    function setup() {
      const totalWidth = hTrack.scrollWidth;
      if (totalWidth <= 0) { if (retries++ < 30) requestAnimationFrame(setup); return; }
      ScrollTrigger.create({
        trigger: hScroll, pin: true, start: 'top top',
        end: () => `+=${totalWidth - window.innerWidth}`,
        scrub: 1, invalidateOnRefresh: true,
        onUpdate: self => {
          const gp = self.progress;
          const x = -(totalWidth - window.innerWidth) * gp;
          gsap.set(hTrack, { x });
          document.documentElement.style.setProperty('--h-progress', gp);
        }
      });
    }
    requestAnimationFrame(setup);
  })();

  // ── 11. Curtain Animation ─────────────────────────────────────
  (function() {
    const section = document.getElementById('curtain-section');
    if (!section) return;

    const ballRef = document.getElementById('curtain-ball');
    const imgRef = document.getElementById('curtain-img');

    function updateCurtain(p) {
      if (imgRef) {
        const eased = gsap.parseEase('power3.out')(p);
        gsap.set(imgRef, { rotation: 30 * (1 - eased), scale: 0.75 + 0.25 * eased });
      }
    }

    if (!isMobile() && ballRef) {
      gsap.set(ballRef, { x: window.innerWidth + 300, y: window.innerHeight * 0.08, rotation: 0, scale: 1 });

      const ballTl = gsap.timeline({ paused: true });
      ballTl.to(ballRef, { x: window.innerWidth * 0.58, y: window.innerHeight * 0.45, rotation: 540, ease: 'power2.in', duration: 0.42 })
        .to(ballRef, { x: window.innerWidth * 0.25, y: window.innerHeight * 0.10, rotation: 900, ease: 'power2.out', duration: 0.18 })
        .to(ballRef, { x: window.innerWidth * 0.05, y: window.innerHeight * 0.40, rotation: 1180, ease: 'power2.in', duration: 0.15 })
        .to(ballRef, { x: -250, y: window.innerHeight * 0.20, rotation: 1500, ease: 'power2.out', duration: 0.25 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * (isMobile() ? 5 : 3)}`,
        scrub: true, invalidateOnRefresh: true,
        onUpdate: self => {
          updateCurtain(self.progress);
          ballTl.progress(self.progress);
        }
      });
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 5}`,
        scrub: true,
        onUpdate: self => updateCurtain(self.progress)
      });
    }
  })();

  // ── 12. About Section Colors ──────────────────────────────────
  (function() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    ScrollTrigger.create({
      trigger: aboutSection, start: 'top top', once: true,
      onEnter: () => {
        gsap.to(aboutSection, { backgroundColor: 'transparent', '--about-text': '#000000', duration: 0.8, ease: 'power2.out' });
      }
    });
  })();

  // ── 13. Hero image entrance animation ────────────────────────
  (function() {
    const heroImg = document.getElementById('hero-img');
    if (!heroImg) return;
    gsap.set(heroImg, { y: 1000 });
    gsap.to(heroImg, { y: 0, duration: 0.75, ease: 'power3.out', delay: isInitialLoad ? 5.75 : 1 });
  })();

  // ── 14. MarqueeBanner ─────────────────────────────────────────
  (function() {
    const bannerEl = document.getElementById('marquee-banner');
    const marquee1 = document.getElementById('marquee-1');
    const marquee2 = document.getElementById('marquee-2');
    if (!bannerEl) return;

    ScrollTrigger.create({
      trigger: bannerEl, start: 'top bottom', end: '150% top', scrub: true,
      onUpdate: self => {
        const p = self.progress;
        gsap.set(marquee1, { x: `${25 - p * 50}%` });
        gsap.set(marquee2, { x: `${-25 + p * 50}%` });
      }
    });

    const banner = document.getElementById('marquee-banner-container');
    const smudgeContainer = document.getElementById('marquee-smudge-container');
    const smudgeSVG = document.getElementById('marquee-smudge-svg');
    if (!banner || !smudgeContainer || !smudgeSVG) return;

    const config = { stampInterval: 8, sizeBase: 55, sizeFromSpeed: 0.06, expandMultiplier: 1.0, expandTime: 0.2, expandEase: 'power2.out', dissolveStart: 0.2, dissolveTime: 1.5, dissolveEase: 'power2.inOut', brushDensity: 10, brushSpread: 4, brushAspectMin: 0.5, brushAspectMax: 1 };

    const pointer = { x: 0, y: 0, lx: 0, ly: 0 };
    let hasStarted = false, stampAccum = 0, raf = null;

    function matchSVG() {
      const rect = banner.getBoundingClientRect();
      smudgeSVG.style.width = rect.width + 'px';
      smudgeSVG.style.height = rect.height + 'px';
      smudgeSVG.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    }
    matchSVG();
    window.addEventListener('resize', matchSVG);

    function stampSmudgeAt(x, y, radius) {
      const count = config.brushDensity, spread = config.brushSpread;
      for (let b = 0; b < count; b++) {
        const ox = (Math.random() - 0.5) * spread, oy = (Math.random() - 0.5) * spread;
        const size = radius * (0.4 + Math.random() * 0.6);
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        const aspect = config.brushAspectMin + Math.random() * (config.brushAspectMax - config.brushAspectMin);
        const angle = Math.random() * Math.PI * 2;
        ellipse.setAttribute('cx', x + ox); ellipse.setAttribute('cy', y + oy);
        ellipse.setAttribute('rx', size); ellipse.setAttribute('ry', size * aspect);
        ellipse.setAttribute('fill', '#fff');
        ellipse.setAttribute('transform', `rotate(${angle * (180 / Math.PI)} ${x + ox} ${y + oy})`);
        smudgeContainer.prepend(ellipse);

        const animatedSize = { current: size };
        const tl = gsap.timeline({
          onUpdate() { const s = Math.max(0, animatedSize.current); ellipse.setAttribute('rx', s); ellipse.setAttribute('ry', s * aspect); },
          onComplete() { tl.kill(); ellipse.remove(); }
        });
        tl.to(animatedSize, { current: size * config.expandMultiplier, duration: config.expandTime, ease: config.expandEase });
        tl.to(animatedSize, { current: 0, duration: config.dissolveTime, ease: config.dissolveEase }, config.dissolveStart);
      }
    }

    function updateSmudge() {
      if (hasStarted) {
        const dx = pointer.x - pointer.lx, dy = pointer.y - pointer.ly;
        const dist = Math.hypot(dx, dy);
        pointer.lx = pointer.x; pointer.ly = pointer.y;
        if (dist > 0) {
          stampAccum += dist;
          const interval = config.stampInterval;
          while (stampAccum >= interval) {
            stampAccum -= interval;
            const t = 1 - stampAccum / dist;
            stampSmudgeAt(pointer.x - dx * t, pointer.y - dy * t, config.sizeBase + dist * config.sizeFromSpeed);
          }
        }
      }
      raf = requestAnimationFrame(updateSmudge);
    }

    function getRelPos(clientX, clientY) {
      const rect = banner.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    banner.addEventListener('mousemove', e => {
      const pos = getRelPos(e.clientX, e.clientY);
      if (!hasStarted) { pointer.x = pointer.lx = pos.x; pointer.y = pointer.ly = pos.y; hasStarted = true; return; }
      pointer.x = pos.x; pointer.y = pos.y;
    });

    banner.addEventListener('touchstart', e => {
      const pos = getRelPos(e.touches[0].clientX, e.touches[0].clientY);
      pointer.x = pointer.lx = pos.x; pointer.y = pointer.ly = pos.y;
      hasStarted = true;
    }, { passive: true });

    banner.addEventListener('touchmove', e => {
      const pos = getRelPos(e.touches[0].clientX, e.touches[0].clientY);
      pointer.x = pos.x; pointer.y = pos.y;
    }, { passive: true });

    raf = requestAnimationFrame(updateSmudge);

    document.getElementById('marquee-btn-left')?.addEventListener('click', () => {
      window.location.href = '/dentro-de-las-canchas?t=' + Date.now();
    });
    document.getElementById('marquee-btn-right')?.addEventListener('click', () => {
      window.location.href = '/fuera-de-las-canchas?t=' + Date.now();
    });
  })();

  // ── 15. SpiderButton canvas web effects ──────────────────────
  (function() {
    document.querySelectorAll('.spider-btn').forEach(btn => {
      const canvas = btn.querySelector('.spider-btn-web');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      let w = 0, h = 0, anchors = [], lastPt = null, inside = false;

      function resize() {
        const r = btn.getBoundingClientRect();
        w = r.width; h = r.height;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const cx = w / 2, cy = h / 2, rx = w * 0.55, ry = h * 0.6;
        anchors = [];
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          anchors.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
        }
        ctx.clearRect(0, 0, w, h);
      }
      resize();
      new ResizeObserver(resize).observe(btn);

      function strand(x1, y1, x2, y2, alpha) {
        ctx.strokeStyle = `rgba(216,200,245,${alpha})`;
        ctx.lineWidth = 0.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }

      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,0.04)'; ctx.fillRect(0, 0, w, h); ctx.restore();
        const sorted = anchors.slice().sort((a, b) => (a.x-x)**2 + (a.y-y)**2 - ((b.x-x)**2 + (b.y-y)**2));
        strand(sorted[0].x, sorted[0].y, x, y, 0.55);
        strand(sorted[1].x, sorted[1].y, x, y, 0.32);
        if (lastPt && inside) strand(lastPt.x, lastPt.y, x, y, 0.7);
        lastPt = { x, y };
      });

      btn.addEventListener('pointerenter', () => { inside = true; lastPt = null; });
      btn.addEventListener('pointerleave', () => {
        inside = false;
        let t = 0;
        const fade = setInterval(() => {
          t++; ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0, 0, w, h); ctx.restore();
          if (t > 14) { clearInterval(fade); ctx.clearRect(0, 0, w, h); }
        }, 30);
      });
    });
  })();

  // ── 16. Contact Form ──────────────────────────────────────────
  (function() {
    const form = document.getElementById('cf-form');
    const errorEl = document.getElementById('cf-error');
    const submitBtn = document.getElementById('cf-submit');
    const container = document.getElementById('cf-container');
    if (!form || !container) return;

    const CONTACT_API = '/api/contact.php';

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const type = form.type.value;
      const message = form.message.value.trim();
      if (!name || !email || !type || !message) return;
      errorEl.style.display = 'none';
      submitBtn.disabled = true;

      try {
        const res = await fetch(CONTACT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, type, message })
        });
        if (res.ok) {
          container.innerHTML = `
            <div class="cf-header"><div data-copy-wrapper><h4>Entremos en contacto</h4></div></div>
            <div class="cf-copy"><div data-copy-wrapper><p class="bodyCopy sm">Recibimos tu mensaje. Te responderemos pronto.</p></div></div>
            <button class="cf-reset" id="cf-reset-btn">Enviar otro mensaje</button>
            <div class="cf-footer">
              <div class="cf-divider"></div>
              <div class="cf-footer-copy"><p class="bodyCopy sm" style="color:#ffffff">«Diseñado por Ulah Marketing · 2026».</p></div>
            </div>
          `;
          document.getElementById('cf-reset-btn')?.addEventListener('click', () => location.reload());
        } else {
          errorEl.style.display = 'block';
          submitBtn.disabled = false;
        }
      } catch (_) {
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
      }
    });
  })();

  // ── 17. Copy on-scroll reveal animations (vanilla, no SplitText) ──
  (function() {
    document.fonts.ready.then(() => {
      setTimeout(() => {
        document.querySelectorAll('[data-copy-wrapper]').forEach(wrapAnim);
      }, 300);
    });

    function wrapAnim(wrapper) {
      const type = wrapper.getAttribute('data-copy-type') || 'slide';
      const children = Array.from(wrapper.children);

      if (type === 'slide') {
        const targets = children.length > 0 ? children : [wrapper];
        // Also handle nested data-copy-wrapper: skip if child has its own
        const elms = targets.filter(el => !el.hasAttribute('data-copy-wrapper'));

        elms.forEach(el => {
          // Wrap text content in a reveal container
          el.style.overflow = 'hidden';
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(el, { y: '100%' }, {
            y: '0%', duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: wrapper, start: 'top 80%', once: true }
          });
        });
      } else if (type === 'flicker') {
        const targets = children.length > 0 ? children : [wrapper];
        targets.forEach(el => {
          const text = el.textContent || '';
          if (!text.trim()) return;
          el.innerHTML = '';
          const chars = [];
          for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            span.style.cssText = 'display:inline-block;will-change:opacity;';
            el.appendChild(span);
            chars.push(span);
          }
          gsap.set(chars, { opacity: 0 });
          gsap.to(chars, {
            duration: 0.05, opacity: 1, ease: 'power2.inOut',
            stagger: { amount: 0.5, each: 0.1, from: 'random' },
            scrollTrigger: { trigger: wrapper, start: 'top 85%', once: true }
          });
        });
      }
    }
  })();

  // ── 18. ScrollTrigger Refresh ─────────────────────────────────
  setTimeout(() => ScrollTrigger.refresh(), 300);
  window.addEventListener('resize', () => {
    setTimeout(() => ScrollTrigger.refresh(), 200);
  });

  // ── 19. Cleanup on unload ─────────────────────────────────────
  window.addEventListener('beforeunload', () => {
    isInitialLoad = false;
  });

}); // end DOMContentLoaded
