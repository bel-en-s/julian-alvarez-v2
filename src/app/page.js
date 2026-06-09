"use client";
import "./home.css";
import { useState, useEffect, useRef } from "react";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import DotMatrix from "@/components/DotMatrix/DotMatrix";
import MarqueeBanner from "@/components/MarqueeBanner/MarqueeBanner";
import TextBlock from "@/components/TextBlock/TextBlock";
import PeelReveal from "@/components/PeelReveal/PeelReveal";
import CTA from "@/components/CTA/CTA";
import NextMatch from "@/components/NextMatch/NextMatch";
import HeroAtmos from "@/components/HeroAtmos/HeroAtmos";
import MiHistoria from "@/components/MiHistoria/MiHistoria";
import AboutVideo from "@/components/AboutVideo/AboutVideo";
import Curtain from "@/components/Curtain/Curtain";

import Copy from "@/components/Copy/Copy";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Index() {
  const [loaderAnimating, setLoaderAnimating] = useState(isInitialLoad);
  const heroImgRef = useRef(null);
  const heroHeaderRef = useRef(null);
  const heroSectionRef = useRef(null);
  const alvarezCanvasRef = useRef(null);
  const alvarezContainerRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const handlePreloaderComplete = () => {
    setLoaderAnimating(false);
  };

  useGSAP(() => {
    if (!heroImgRef.current || !heroHeaderRef.current) return;

    gsap.set(heroImgRef.current, { y: 1000 });
    gsap.to(heroImgRef.current, {
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: isInitialLoad ? 5.75 : 1,
    });

    const track = scrollTrackRef.current;
    if (!track) return;

    const CURTAIN_VH = 2;
    const CARDS_VH = 3;
    const TOTAL_VH = CURTAIN_VH + CARDS_VH;
    const curtainEnd = CURTAIN_VH / TOTAL_VH;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1000px)", () => {
      ScrollTrigger.refresh();

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: `+=${window.innerHeight * TOTAL_VH}px`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        onUpdate: (self) => {
          const p = self.progress;

          // ---- VIDEO SCALE (tied to overall scroll, not phase) ----
          document.documentElement.style.setProperty(
            "--video-scale",
            0.88 + 0.14 * p
          );

          if (p < curtainEnd) {
            // ---- CURTAIN PHASE ----
            const rp = p / curtainEnd;
            document.documentElement.classList.remove("is-h-scroll");

            const eased = gsap.parseEase("power3.out")(rp);
            gsap.set(".curtain-img", {
              rotation: 30 * (1 - eased),
              scale: 0.75 + 0.25 * eased,
            });
            gsap.set(".curtain-header:nth-child(1)", {
              x: -innerWidth * 3 * rp,
              y: innerHeight * 0.5 * rp,
              scale: 1 + 9 * rp,
            });
            gsap.set(".curtain-header:nth-child(2)", {
              x: innerWidth * 3 * rp,
              y: innerHeight * 0.5 * rp,
              scale: 1 + 9 * rp,
            });
            gsap.set(".scroll-track .curtain", { x: "0vw" });
          } else {
            // ---- CARDS PHASE (horizontal scroll) ----
            const cp = (p - curtainEnd) / (1 - curtainEnd);
            document.documentElement.classList.add("is-h-scroll");

            gsap.set(".scroll-track .curtain", { x: -100 * cp + "vw" });

            const header = document.querySelector(".mh-header");
            if (header) {
              const maxTranslate = Math.max(0, header.offsetWidth - window.innerWidth);
              gsap.set(header, { x: -cp * maxTranslate });
            }

          }

          // ---- BALL BOUNCE (starts when name scales off screen) ----
          const ballStart = 0.15;
          const bp = p < ballStart ? 0 : Math.min((p - ballStart) / (1 - ballStart), 1);

          if (bp > 0) {
            const card = document.querySelector(".mh-desktop .mh-card");
            if (card) {
              const shaped = Math.pow(bp, 0.5);
              const cx = gsap.utils.interpolate(150, -900, bp);

              const yKeyframes = [10, 400, 50, 420];
              const yProgress = shaped * (yKeyframes.length - 1);
              const yIndex = Math.min(Math.floor(yProgress), yKeyframes.length - 2);
              const cy = gsap.utils.interpolate(yKeyframes[yIndex], yKeyframes[yIndex + 1], yProgress - yIndex);

              const rKeyframes = [15, 480, 960, 1440];
              const cr = gsap.utils.interpolate(rKeyframes[yIndex], rKeyframes[yIndex + 1], yProgress - yIndex);

              const s = 0.7 - 0.12 * Math.sin(Math.PI * shaped);

              gsap.set(card, {
                xPercent: cx,
                yPercent: cy,
                rotation: cr,
                opacity: 1,
                scale: s,
              });
            }
          }
        },
      });

      return () => st.kill();
    });

  });

  useEffect(() => {
    const canvas = alvarezCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let ww = 0, wh = 0;
    let anchors = [];
    let lastPt = null;
    let raf = null;
    const LIFETIME = 900;
    const MAX_LINES = 400;
    let lines = [];

    const repaint = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = Math.floor(ww * dpr);
      canvas.height = Math.floor(wh * dpr);
      canvas.style.width = ww + "px";
      canvas.style.height = wh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastPt = null;
      lines = [];
      const rx = ww * 0.3, ry = wh * 0.35;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
      }
    };
    repaint();

    window.addEventListener("resize", repaint);

    const render = (now) => {
      ctx.clearRect(0, 0, ww, wh);
      const cutoff = now - LIFETIME;
      let write = 0;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (ln.t < cutoff) continue;
        lines[write++] = ln;
        const age = (now - ln.t) / LIFETIME;
        const alpha = (1 - age) * ln.opacity;
        ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
        ctx.lineWidth = 0.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ln.x1, ln.y1);
        ctx.lineTo(ln.x2, ln.y2);
        ctx.stroke();
      }
      lines.length = write;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    const pushLine = (x1, y1, x2, y2, opacity) => {
      lines.push({ x1, y1, x2, y2, t: performance.now(), opacity });
      if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    };

    const onMove = (e) => {
      const sorted = anchors.slice().sort((a, b) =>
        (a.x - e.clientX) * (a.x - e.clientX) + (a.y - e.clientY) * (a.y - e.clientY)
        - ((b.x - e.clientX) * (b.x - e.clientX) + (b.y - e.clientY) * (b.y - e.clientY))
      );
      pushLine(sorted[0].x, sorted[0].y, e.clientX, e.clientY, 0.55);
      pushLine(sorted[1].x, sorted[1].y, e.clientX, e.clientY, 0.32);
      if (lastPt) pushLine(lastPt.x, lastPt.y, e.clientX, e.clientY, 0.7);
      lastPt = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", repaint);
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Preloader onAnimationComplete={handlePreloaderComplete} />

      <section className="hero" ref={heroSectionRef}>
        <HeroAtmos />
        <DotMatrix
          color1="#51398D"
          color2="#7c5cbf"
          color3="#3d2a6b"
          color4="#9b7fd4"
          colorIntensity={0.4}
          softness={2}
        />
        <div className="container">
          <div className="hero-header" ref={heroHeaderRef}>
            <Copy animateOnScroll={false} delay={isInitialLoad ? 5.5 : 0.65}>
              <span className="hero-name hero-name--julian">Julián</span>
              <span className="hero-header-img" ref={heroImgRef}>
                <img src={`${bp}/home/test.png`} alt="" />
              </span>
              <span className="hero-name hero-name--alvarez" ref={alvarezContainerRef}>Alvarez</span>
            </Copy>
          </div>
          <div className="hero-gradient"></div>
          <canvas className="hero-alvarez-canvas" ref={alvarezCanvasRef} aria-hidden="true" />
        </div>
        {/* <div className="section-footer">
          <Copy
            type="flicker"
            delay={isInitialLoad ? 7.5 : 0.65}
            animateOnScroll={false}
          >
            <p>El increíble hombre araña</p>
          </Copy>
          <Copy
            type="flicker"
            delay={isInitialLoad ? 7.5 : 0.65}
            animateOnScroll={false}
          >
            <p>Model v.23</p>
          </Copy>
        </div> */}
      </section>

      <NextMatch />
      <div className="scroll-track" ref={scrollTrackRef}>
      <section className="about">
        <div className="about-bg">
          <AboutVideo />
        </div>
        <div className="slide-content">
          <div className="slide-title">
            <Copy>
              <h1>
                "Sigan <br />soñando.
              </h1>
            </Copy>
          </div>
          <div className="slide-description">
            <Copy>
              <h1>
               <br />Con trabajo, sacrificio y siendo buenas personas, los sueños se acercan cada día."
              </h1>
            </Copy>
          </div>
        </div>
        {/* <div className="section-footer light">
          <Copy type="flicker">
            <p>/ Core State /</p>
          </Copy>
        </div> */}
      </section>

     
     
        {/* <MiHistoria /> */}
      </div>
      <MiHistoria />
      <CTA />
      <MarqueeBanner />

      <TextBlock />



    
     
    </>
  );
}
