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
import Mascara3D from "@/components/Mascara3D/Mascara3D";
import HeroAtmos from "@/components/HeroAtmos/HeroAtmos";
import MiHistoria from "@/components/MiHistoria/MiHistoria";
import AboutVideo from "@/components/AboutVideo/AboutVideo";

import Copy from "@/components/Copy/Copy";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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

    gsap.to(heroHeaderRef.current, {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const track = scrollTrackRef.current;
    if (!track) return;

    const ABOUT_VH = 3;
    const CARDS_VH = 5;
    const TOTAL_VH = ABOUT_VH + CARDS_VH;
    const revealEnd = ABOUT_VH / TOTAL_VH;

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

          if (p < revealEnd) {
            const rp = p / revealEnd;
            gsap.set(".scroll-track .about", { x: -rp * 100 + "vw" });
            document.documentElement.classList.remove("is-h-scroll");
          } else {
            const ap = (p - revealEnd) / (1 - revealEnd);
            gsap.set(".scroll-track .about", { x: "-100vw" });
            document.documentElement.classList.add("is-h-scroll");

            const header = document.querySelector(".mh-header");
            const cards = document.querySelectorAll(".mh-card");
            if (header) {
              const maxTranslate = Math.max(0, header.offsetWidth - window.innerWidth);
              gsap.set(header, { x: -ap * maxTranslate });
            }

            const video = document.querySelector(".mh-video video");
            if (video) {
              const videoPeak = 0.25;
              const videoEnd = 0.65;
              let vol = 0;
              if (ap < videoPeak) {
                vol = ap / videoPeak;
              } else if (ap < videoEnd) {
                vol = 1 - (ap - videoPeak) / (videoEnd - videoPeak);
              }
              vol = Math.max(0, Math.min(vol, 1));
              const targetVol = vol * 0.4;
              video.volume = video.volume * 0.92 + targetVol * 0.08;
              video.muted = vol < 0.01;
            }

            cards.forEach((card, i) => {
              const delay = i * 0.08;
              const mult = i < 4 ? 1.5 : 2;
              const raw = (ap - delay) * mult;
              const cp = Math.max(0, Math.min(raw, 1));

              const fadeIn = Math.min(cp / 0.08, 1);
              const fadeOut = Math.min((1 - cp) / 0.08, 1);
              const opacity = Math.max(0, Math.min(fadeIn, fadeOut));

              if (opacity > 0.001) {
                const easeCp = cp < 0.5 ? 2 * cp * cp : 1 - Math.pow(-2 * cp + 2, 2) / 2;
                const cx = gsap.utils.interpolate(25, -450, easeCp);
                const cy = i % 2 === 0
                  ? gsap.utils.interpolate(10, -5, easeCp)
                  : gsap.utils.interpolate(50, 10, easeCp);
                const cr = gsap.utils.interpolate(15, -30, easeCp);
                const scale = 0.85 + 0.15 * Math.min(cp / 0.15, 1);

                gsap.set(card, {
                  xPercent: cx,
                  yPercent: cy,
                  rotation: cr,
                  opacity,
                  scale,
                });
              } else {
                gsap.set(card, { opacity: 0 });
              }
            });
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
                <img src="/home/test.png" alt="" />
              </span>
              <span className="hero-name hero-name--alvarez" ref={alvarezContainerRef}>Alvarez</span>
            </Copy>
          </div>
          <canvas className="hero-alvarez-canvas" ref={alvarezCanvasRef} aria-hidden="true" />
        </div>
        <div className="section-footer">
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
        </div>
      </section>

      <NextMatch />

      <Mascara3D />

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
          <div className="section-footer light">
            <Copy type="flicker">
              <p>/ Core State /</p>
            </Copy>
          </div>
        </section>
        <MiHistoria />
      </div>
            <CTA />
      <MarqueeBanner />

      <TextBlock />



    
     
    </>
  );
}
