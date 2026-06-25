import "./MarqueeBanner.css";
import { useRef, useEffect } from "react";

import Copy from "../Copy/Copy";
import SpiderButton from "../SpiderButton/SpiderButton";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const easeOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeInCubic = (t) => t * t * t;

const config = {
  smoothing: 0.12,
  threshold: 0.01,
  sizeFromSpeed: 0.2,
  expandMultiplier: 2,
  expandTime: 2000,
  dissolveStart: 2000,
  dissolveTime: 3000,
};

const MarqueeBanner = () => {
  const marqueeBannerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const smudgeContainerRef = useRef(null);
  const smudgeSVGRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const el = marqueeBannerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "150% top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(marquee1Ref.current, { x: `${25 - progress * 50}%` });
        gsap.set(marquee2Ref.current, { x: `${-25 + progress * 50}%` });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    const smudgeContainer = smudgeContainerRef.current;
    const smudgeSVG = smudgeSVGRef.current;
    if (!banner || !smudgeContainer || !smudgeSVG) return;

    const NS = "http://www.w3.org/2000/svg";
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let started = false;
    let raf = null;

    const onPointerMove = (x, y) => {
      if (!started) {
        pointer.x = smooth.x = x;
        pointer.y = smooth.y = y;
        started = true;
        return;
      }
      pointer.x = x;
      pointer.y = y;
    };

    const getRelativePos = (clientX, clientY) => {
      const rect = banner.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleMouseMove = (e) => {
      const pos = getRelativePos(e.clientX, e.clientY);
      onPointerMove(pos.x, pos.y);
    };

    banner.addEventListener("mousemove", handleMouseMove);

    const handleClick = (e) => {
      const pos = getRelativePos(e.clientX, e.clientY);
      const isMobile = window.innerWidth < 1000;
      const burstRadii = isMobile
        ? [15, 22, 12, 18, 10, 20, 14, 16, 19, 11]
        : [30, 45, 25, 35, 20, 40, 28, 32, 38, 22];
      const offsets = isMobile
        ? [[0, 0], [-8, -5], [8, -4], [-4, 8], [6, 6], [-10, 3], [4, -9], [-3, -10], [9, 4], [-6, -3]]
        : [[0, 0], [-15, -10], [15, -8], [-8, 15], [12, 12], [-20, 5], [8, -18], [-5, -20], [18, 8], [-12, -5]];
      offsets.forEach(([ox, oy], i) => {
        stampAt(pos.x + ox, pos.y + oy, burstRadii[i]);
      });
    };

    banner.addEventListener("click", handleClick);

    const matchSVGToViewport = () => {
      const rect = banner.getBoundingClientRect();
      smudgeSVG.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      smudgeSVG.style.width = rect.width + "px";
      smudgeSVG.style.height = rect.height + "px";
    };

    matchSVGToViewport();
    window.addEventListener("resize", matchSVGToViewport);

    const stampAt = (x, y, radius) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", x);
      c.setAttribute("cy", y);
      c.setAttribute("r", radius);
      c.setAttribute("fill", "#fff");
      smudgeContainer.prepend(c);

      const start = performance.now();
      const expandEnd = start + config.expandTime;
      const fadeStart = start + config.dissolveStart;
      const fadeEnd = fadeStart + config.dissolveTime;

      const tick = () => {
        const now = performance.now();
        if (now >= fadeEnd) {
          if (c.parentNode) c.parentNode.removeChild(c);
          return;
        }
        let r = radius;
        if (now < expandEnd) {
          const t = (now - start) / config.expandTime;
          r = radius + (radius * config.expandMultiplier - radius) * easeOutQuad(t);
        }
        if (now >= fadeStart) {
          const t = (now - fadeStart) / config.dissolveTime;
          r *= 1 - easeInCubic(Math.min(t, 1));
        }
        c.setAttribute("r", Math.max(0, r));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const update = () => {
      if (started) {
        smooth.x += (pointer.x - smooth.x) * config.smoothing;
        smooth.y += (pointer.y - smooth.y) * config.smoothing;
        const speed = Math.hypot(pointer.x - smooth.x, pointer.y - smooth.y);
        if (speed > config.threshold) {
          stampAt(smooth.x, smooth.y, speed * config.sizeFromSpeed);
        }
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);

    return () => {
      banner.removeEventListener("mousemove", handleMouseMove);
      banner.removeEventListener("click", handleClick);
      window.removeEventListener("resize", matchSVGToViewport);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="marquee-banner" ref={marqueeBannerRef}>
      <div className="marquee-half marquee-half--left" />
      <div className="marquee-half marquee-half--right" />

      <div className="marquee-btn marquee-btn--left">
        <SpiderButton>Ver Dentro</SpiderButton>
      </div>
      <div className="marquee-btn marquee-btn--right">
        <SpiderButton>Ver Fuera</SpiderButton>
      </div>

      <div className="banner-content">
        <Copy type="flicker">
          <p className="bodyCopy sm">[ Las dos caras ]</p>
        </Copy>
        <Copy>
          <h4>Dentro y fuera de las canchas</h4>
        </Copy>
      </div>

      <div className="marquees">
        <div className="marquee-header marquee-header-1" ref={marquee1Ref}>
          <h1>Cada partido cuenta una historia. Acá están los míos.
</h1>
        </div>
        <div className="marquee-header marquee-header-2" ref={marquee2Ref}>
          <h1> Mi vida lejos del campo
</h1>
        </div>
      </div>
      <div className="banner" ref={bannerRef}>
  
        <div className="banner-img banner-img--face"></div>
        <div className="banner-img banner-img--reveal"></div>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="smudge-revealer"
          ref={smudgeSVGRef}
        >
          <defs>
            <filter id="smudge-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -14"
              />
            </filter>
          </defs>
          <mask id="smudge-mask">
            <g className="smudge-blobs" ref={smudgeContainerRef} filter="url(#smudge-goo)"></g>
          </mask>
        </svg>
        {/* <div className="banner-logo">
          <img src="public/logo.png" alt="" />
        </div> */}
        
      </div>
       
    </section>
  );
};

export default MarqueeBanner;
