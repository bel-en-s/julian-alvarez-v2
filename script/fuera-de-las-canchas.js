import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundColor = "#1E2024";

  try { initFdcAtmos(); } catch (e) { console.warn('initFdcAtmos error:', e); }
  try { initFdcShader(); } catch (e) { console.warn('initFdcShader error:', e); }

  const section = document.querySelector(".fdc");
  if (!section) return;

  initHeroAnimations();
  initMarquees();
  initTextReveals();
  initGalleryParallax();
  function initHeroAnimations() {
    const targets = section.querySelectorAll(
      ".fdc-hero-inner > [data-copy-wrapper]"
    );
    if (!targets.length) return;

    gsap.set(targets, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(targets, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      overwrite: "auto",
    });
  }

  function initMarquees() {
    const marquees = document.querySelectorAll("[data-marquee]");
    marquees.forEach((el) => {
      const dir = parseFloat(el.dataset.marquee);
      const clone = el.cloneNode(true);
      el.parentElement.appendChild(clone);

      gsap.to([el, clone], {
        xPercent: dir === 1 ? -50 : 50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    });

    const bands = gsap.utils.toArray(".band");
    bands.forEach((band, i) => {
      gsap.to(band, {
        x: i % 2 === 0 ? 80 : -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".press-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  function initTextReveals() {
    const galeria = document.querySelector(".partidos");
    const wrappers = section.querySelectorAll("[data-copy-wrapper]");
    const galeriaWrappers = galeria ? galeria.querySelectorAll("[data-copy-wrapper]") : [];
    const allWrappers = [...wrappers, ...galeriaWrappers];

    allWrappers.forEach((container) => {
      const isMobile = window.innerWidth < 1000;

      const ctx = gsap.context(() => {
        const elements = Array.from(container.children);

        const allLines = [];

        elements.forEach((el) => {
          try {
            const split = SplitText.create(el, {
              type: "lines",
              linesClass: "line",
              lineThreshold: 0.1,
            });
            allLines.push(...split.lines);
          } catch (e) {
          }
        });

        if (!allLines.length) return;

        gsap.set(allLines, { y: "100%" });

        const anim = gsap.to(allLines, {
          y: "0%",
          duration: isMobile ? 0.5 : 1,
          stagger: isMobile ? 0.05 : 0.1,
          ease: "power4.out",
          overwrite: "auto",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          animation: anim,
          once: true,
          refreshPriority: -1,
        });
      }, container);
    });
  }

  function initGalleryParallax() {
    const items = document.querySelectorAll("[data-parallax]");
    if (!items.length || window.innerWidth < 640) return;

    items.forEach((item) => {
      const speed = parseFloat(item.dataset.parallax) || 40;
      const img = item.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        item,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
  }

  function initQuoteReveal() {
    const quote = document.querySelector(".partido-grid-quote--wide blockquote");
    if (!quote) return;

    const split = SplitText.create(quote, {
      type: "words",
      wordsClass: "quote-word",
    });

    gsap.fromTo(".quote-word", {
      "--highlight-offset": "0%",
    }, {
      "--highlight-offset": "100%",
      stagger: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: quote.closest(".partidos"),
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1,
      },
    });
  }


  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fluidShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform int iFrame;
    uniform sampler2D iPreviousFrame;
    uniform float uBrushSize;
    uniform float uBrushStrength;
    uniform float uFluidDecay;
    uniform float uTrailLength;
    uniform float uStopDecay;
    varying vec2 vUv;

    vec2 ur, U;

    float ln(vec2 p, vec2 a, vec2 b) {
        return length(p-a-(b-a)*clamp(dot(p-a,b-a)/dot(b-a,b-a),0.,1.));
    }

    vec4 t(vec2 v, int a, int b) {
        return texture2D(iPreviousFrame, fract((v+vec2(float(a),float(b)))/ur));
    }

    vec4 t(vec2 v) {
        return texture2D(iPreviousFrame, fract(v/ur));
    }

    float area(vec2 a, vec2 b, vec2 c) {
        float A = length(b-c), B = length(c-a), C = length(a-b), s = 0.5*(A+B+C);
        return sqrt(s*(s-A)*(s-B)*(s-C));
    }

    void main() {
        U = vUv * iResolution;
        ur = iResolution.xy;

        if (iFrame < 1) {
            float w = 0.5+sin(0.2*U.x)*0.5;
            float q = length(U-0.5*ur);
            gl_FragColor = vec4(0.1*exp(-0.001*q*q),0,0,w);
        } else {
            vec2 v = U,
                 A = v + vec2( 1, 1),
                 B = v + vec2( 1,-1),
                 C = v + vec2(-1, 1),
                 D = v + vec2(-1,-1);

            for (int i = 0; i < 8; i++) {
                v -= t(v).xy;
                A -= t(A).xy;
                B -= t(B).xy;
                C -= t(C).xy;
                D -= t(D).xy;
            }

            vec4 me = t(v);
            vec4 n = t(v, 0, 1),
                e = t(v, 1, 0),
                s = t(v, 0, -1),
                w = t(v, -1, 0);
            vec4 ne = .25*(n+e+s+w);
            me = mix(t(v), ne, vec4(0.15,0.15,0.95,0.));
            me.z = me.z - 0.01*((area(A,B,C)+area(B,C,D))-4.);

            vec4 pr = vec4(e.z,w.z,n.z,s.z);
            me.xy = me.xy + 100.*vec2(pr.x-pr.y, pr.z-pr.w)/ur;

            me.xy *= uFluidDecay;
            me.z *= uTrailLength;

            if (iMouse.z > 0.0) {
                vec2 mousePos = iMouse.xy;
                vec2 mousePrev = iMouse.zw;
                vec2 mouseVel = mousePos - mousePrev;
                float velMagnitude = length(mouseVel);
                float q = ln(U, mousePos, mousePrev);
                vec2 m = mousePos - mousePrev;
                float l = length(m);
                if (l > 0.0) m = min(l, 10.0) * m / l;

                float brushSizeFactor = 1e-4 / uBrushSize;
                float strengthFactor = 0.03 * uBrushStrength;

                float falloff = exp(-brushSizeFactor*q*q*q);
                falloff = pow(falloff, 0.5);

                me.xyw += strengthFactor * falloff * vec3(m, 10.);

                if (velMagnitude < 2.0) {
                    float distToCursor = length(U - mousePos);
                    float influence = exp(-distToCursor * 0.01);
                    float cursorDecay = mix(1.0, uStopDecay, influence);
                    me.xy *= cursorDecay;
                    me.z *= cursorDecay;
                }
            }

            gl_FragColor = clamp(me, -0.4, 0.4);
        }
    }
  `;

  const displayShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform sampler2D iFluid;
    uniform float uDistortionAmount;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform float uColorIntensity;
    uniform float uSoftness;
    varying vec2 vUv;

    void main() {
      vec2 fragCoord = vUv * iResolution;

      vec4 fluid = texture2D(iFluid, vUv);
      vec2 fluidVel = fluid.xy;

      float mr = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

      uv += fluidVel * (0.5 * uDistortionAmount);

      float d = -iTime * 0.5;
      float a = 0.0;
      for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
      }
      d += iTime * 0.5;

      float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
      float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
      float mixer3 = sin(d + a) * 0.5 + 0.5;

      float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
      mixer1 = mix(mixer1, 0.5, smoothAmount);
      mixer2 = mix(mixer2, 0.5, smoothAmount);
      mixer3 = mix(mixer3, 0.5, smoothAmount);

      vec3 col = mix(uColor1, uColor2, mixer1);
      col = mix(col, uColor3, mixer2);
      col = mix(col, uColor4, mixer3 * 0.4);

      col *= uColorIntensity;

      gl_FragColor = vec4(col, 0.55);
    }
  `;

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  }


  function startFdcParallax() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const galeria = document.querySelector('.partidos');
    const parallaxEl = document.querySelector('#galeria-atmos .ha-parallax');
    if (!galeria || !parallaxEl) return;

    let mx = 0, my = 0, cx = 0, cy = 0, raf = null;
    const DEPTH = 12;

    const onMove = (e) => {
      const rect = galeria.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      mx = (px - 0.5) * 2;
      my = (py - 0.5) * 2;
    };

    const loop = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      parallaxEl.style.transform = 'translate3d(' + (cx * DEPTH).toFixed(1) + 'px,' + (cy * DEPTH).toFixed(1) + 'px,0)';
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    }, { threshold: 0 });
    obs.observe(galeria);
  }

  function initFdcAtmos() {
    const galeria = document.querySelector('.partidos');
    if (!galeria) return;
    if (document.getElementById('galeria-atmos')) return;

    const atmos = document.createElement('div');
    atmos.id = 'galeria-atmos';

    const parallax = document.createElement('div');
    parallax.className = 'ha-parallax';

    ['f1', 'f2', 'f3'].forEach(cls => {
      const f = document.createElement('span');
      f.className = 'ha-fog ' + cls;
      parallax.appendChild(f);
    });

    const halo = document.createElement('div');
    halo.className = 'ha-halo';
    parallax.appendChild(halo);

    atmos.appendChild(parallax);

    const vig = document.createElement('span');
    vig.className = 'ha-vignette';
    atmos.appendChild(vig);

    galeria.prepend(atmos);

    startFdcParallax();
  }

  function initFdcShader() {
    const galeria = document.querySelector('.partidos');
    if (!galeria || window.innerWidth < 1000 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrapper = document.createElement("div");
    wrapper.className = "dot-matrix-wrapper";
    wrapper.style.zIndex = "-1";
    galeria.prepend(wrapper);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const cw = galeria.clientWidth || window.innerWidth;
    const ch = galeria.clientHeight || window.innerHeight;
    renderer.setSize(cw, ch);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    wrapper.appendChild(renderer.domElement);

    const downsample = 0.5;
    const simW = Math.floor(cw * downsample);
    const simH = Math.floor(ch * downsample);

    const fluidTarget1 = new THREE.WebGLRenderTarget(simW, simH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    const fluidTarget2 = new THREE.WebGLRenderTarget(simW, simH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;
    let frameCount = 0;

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(simW, simH) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: 25 },
        uBrushStrength: { value: 0.3 },
        uFluidDecay: { value: 0.98 },
        uTrailLength: { value: 0.8 },
        uStopDecay: { value: 0.85 },
      },
      vertexShader,
      fragmentShader: fluidShader,
    });

    const [r1, g1, b1] = hexToRgb("#51398D");
    const [r2, g2, b2] = hexToRgb("#7c5cbf");
    const [r3, g3, b3] = hexToRgb("#3d2a6b");
    const [r4, g4, b4] = hexToRgb("#9b7fd4");

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(cw, ch) },
        iFluid: { value: null },
        uDistortionAmount: { value: 1.5 },
        uColor1: { value: new THREE.Vector3(r1, g1, b1) },
        uColor2: { value: new THREE.Vector3(r2, g2, b2) },
        uColor3: { value: new THREE.Vector3(r3, g3, b3) },
        uColor4: { value: new THREE.Vector3(r4, g4, b4) },
        uColorIntensity: { value: 0.8 },
        uSoftness: { value: 2 },
      },
      vertexShader,
      fragmentShader: displayShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
    const displayPlane = new THREE.Mesh(geometry, displayMaterial);

    let mouseX = 0, mouseY = 0;
    let prevMouseX = 0, prevMouseY = 0;
    let lastMoveTime = 0;

    const handleMouseMove = (e) => {
      const rect = galeria.getBoundingClientRect();
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX - rect.left;
      mouseY = rect.height - (e.clientY - rect.top);
      lastMoveTime = performance.now();
      fluidMaterial.uniforms.iMouse.value.set(mouseX, mouseY, prevMouseX, prevMouseY);
    };

    const handleMouseLeave = () => {
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      const width = galeria.clientWidth || window.innerWidth;
      const height = galeria.clientHeight || window.innerHeight;
      const sw = Math.floor(width * downsample);
      const sh = Math.floor(height * downsample);
      renderer.setSize(width, height);
      fluidMaterial.uniforms.iResolution.value.set(sw, sh);
      displayMaterial.uniforms.iResolution.value.set(width, height);
      fluidTarget1.setSize(sw, sh);
      fluidTarget2.setSize(sw, sh);
      frameCount = 0;
    };

    window.addEventListener("resize", resize);

    const animate = () => {
      if (!rafActive) return;
      requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      fluidMaterial.uniforms.iTime.value = time;
      displayMaterial.uniforms.iTime.value = time;
      fluidMaterial.uniforms.iFrame.value = frameCount;

      if (performance.now() - lastMoveTime > 100) {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      }

      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidPlane, camera);

      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayPlane, camera);

      const temp = currentFluidTarget;
      currentFluidTarget = previousFluidTarget;
      previousFluidTarget = temp;

      frameCount++;
    };

    var rafActive = true;
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!rafActive) { rafActive = true; requestAnimationFrame(animate); }
      } else {
        rafActive = false;
      }
    }, { threshold: 0 });
    observer.observe(galeria);

    animate();
  }
});
