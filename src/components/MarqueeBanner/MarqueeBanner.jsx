import "./MarqueeBanner.css";
import { useRef, useEffect } from "react";

import Copy from "../Copy/Copy";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const config = {
  stampInterval: 8,
  sizeBase: 55,
  sizeFromSpeed: 0.06,
  expandMultiplier: 1.0,
  expandTime: 0.2,
  expandEase: "power2.out",
  dissolveStart: 0.2,
  dissolveTime: 1.5,
  dissolveEase: "power2.inOut",
  brushDensity: 10,
  brushSpread: 4,
  brushAspectMin: 0.5,
  brushAspectMax: 1,
};

const MarqueeBanner = () => {
  const marqueeBannerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const smudgeContainerRef = useRef(null);
  const smudgeSVGRef = useRef(null);
  const bannerRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: marqueeBannerRef.current,
        start: "top bottom",
        end: "150% top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const marquee1X = 25 - progress * 50;
          gsap.set(marquee1Ref.current, { x: `${marquee1X}%` });

          const marquee2X = -25 + progress * 50;
          gsap.set(marquee2Ref.current, { x: `${marquee2X}%` });
        },
      });
    },
    { scope: marqueeBannerRef }
  );

  useEffect(() => {
    const banner = bannerRef.current;
    const smudgeContainer = smudgeContainerRef.current;
    const smudgeSVG = smudgeSVGRef.current;
    if (!banner || !smudgeContainer || !smudgeSVG) return;

    const pointer = { x: 0, y: 0, lx: 0, ly: 0 };
    let hasStarted = false;
    let stampAccum = 0;
    let raf = null;

    const onPointerMove = (x, y) => {
      if (!hasStarted) {
        pointer.x = pointer.lx = x;
        pointer.y = pointer.ly = y;
        hasStarted = true;
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
    banner.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        const pos = getRelativePos(e.touches[0].clientX, e.touches[0].clientY);
        onPointerMove(pos.x, pos.y);
      },
      { passive: false },
    );
    banner.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        const pos = getRelativePos(e.touches[0].clientX, e.touches[0].clientY);
        onPointerMove(pos.x, pos.y);
      },
      { passive: false },
    );

    const matchSVGToViewport = () => {
      const rect = banner.getBoundingClientRect();
      smudgeSVG.style.width = rect.width + "px";
      smudgeSVG.style.height = rect.height + "px";
    };

    matchSVGToViewport();
    window.addEventListener("resize", matchSVGToViewport);

    const stampSmudgeAt = (x, y, radius) => {
      const count = config.brushDensity;
      const spread = config.brushSpread;

      for (let b = 0; b < count; b++) {
        const ox = (Math.random() - 0.5) * spread;
        const oy = (Math.random() - 0.5) * spread;
        const size = radius * (0.4 + Math.random() * 0.6);

        const ellipse = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "ellipse",
        );

        const aspect =
          config.brushAspectMin +
          Math.random() * (config.brushAspectMax - config.brushAspectMin);
        const angle = Math.random() * Math.PI * 2;

        ellipse.setAttribute("cx", x + ox);
        ellipse.setAttribute("cy", y + oy);
        ellipse.setAttribute("rx", size);
        ellipse.setAttribute("ry", size * aspect);
        ellipse.setAttribute("fill", "#fff");
        ellipse.setAttribute(
          "transform",
          `rotate(${angle * (180 / Math.PI)} ${x + ox} ${y + oy})`,
        );

        smudgeContainer.prepend(ellipse);

        const animatedSize = { current: size };

        const timeline = gsap.timeline({
          onUpdate() {
            const s = Math.max(0, animatedSize.current);
            ellipse.setAttribute("rx", s);
            ellipse.setAttribute("ry", s * aspect);
          },
          onComplete() {
            timeline.kill();
            ellipse.remove();
          },
        });

        timeline.to(animatedSize, {
          current: size * config.expandMultiplier,
          duration: config.expandTime,
          ease: config.expandEase,
        });

        timeline.to(
          animatedSize,
          {
            current: 0,
            duration: config.dissolveTime,
            ease: config.dissolveEase,
          },
          config.dissolveStart,
        );
      }
    };

    const update = () => {
      if (hasStarted) {
        const dx = pointer.x - pointer.lx;
        const dy = pointer.y - pointer.ly;
        const dist = Math.hypot(dx, dy);

        pointer.lx = pointer.x;
        pointer.ly = pointer.y;

        if (dist > 0) {
          stampAccum += dist;
          const interval = config.stampInterval;

          while (stampAccum >= interval) {
            stampAccum -= interval;
            const t = 1 - stampAccum / dist;
            stampSmudgeAt(
              pointer.x - dx * t,
              pointer.y - dy * t,
              config.sizeBase + dist * config.sizeFromSpeed,
            );
          }
        }
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);

    return () => {
      banner.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", matchSVGToViewport);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="marquee-banner" ref={marqueeBannerRef}>
      <div className="marquees">
        <div className="marquee-header marquee-header-1" ref={marquee1Ref}>
          <h1>Transmission lost in neutral space</h1>
        </div>
        <div className="marquee-header marquee-header-2" ref={marquee2Ref}>
          <h1>Synthetic forms archive the signal</h1>
        </div>
      </div>
      <div className="banner" ref={bannerRef}>
        <div className="banner-content">
          <Copy type="flicker">
            <p>[ Las dos caras ]</p>
          </Copy>
          <Copy>
            <h4>Dentro y fuera de las canchas</h4>
          </Copy>
        </div>
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
              <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 4 -0.35"
              />
            </filter>
          </defs>
          <mask id="smudge-mask">
            <g className="smudge-blobs" ref={smudgeContainerRef} filter="url(#smudge-goo)"></g>
          </mask>
        </svg>
        <div className="banner-logo">
          <img src="public/logo.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default MarqueeBanner;
