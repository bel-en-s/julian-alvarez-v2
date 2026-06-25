"use client";
import "./home.css";
import { useState, useEffect, useRef } from "react";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import DotMatrix from "@/components/DotMatrix/DotMatrix";
import BackgroundWeb from "@/components/BackgroundWeb/BackgroundWeb";
import BrandIcon from "@/components/BrandIcon/BrandIcon";

import TextBlock from "@/components/TextBlock/TextBlock";
import PeelReveal from "@/components/PeelReveal/PeelReveal";
import MarqueeBanner from "@/components/MarqueeBanner/MarqueeBanner";
import CTA from "@/components/CTA/CTA";
import NextMatch from "@/components/NextMatch/NextMatch";
import HeroAtmos from "@/components/HeroAtmos/HeroAtmos";
import MiHistoria from "@/components/MiHistoria/MiHistoria";
import AboutVideo from "@/components/AboutVideo/AboutVideo";

import Copy from "@/components/Copy/Copy";
import ContactForm from "@/components/ContactForm/ContactForm";

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
  const hScrollRef = useRef(null);
  const hScrollContentRef = useRef(null);

  const animateHeroImage = () => {
    if (!heroImgRef.current) return;
    const img = heroImgRef.current;
    if (gsap.getTweensOf(img).length) return;
    gsap.set(img, { y: 1000 });
    gsap.to(img, {
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: 0.15,
    });
  };

  const handlePreloaderComplete = () => {
    setLoaderAnimating(false);
  };

  useGSAP(() => {
    if (!heroHeaderRef.current) return;

   const track = scrollTrackRef.current;
if (track && window.innerWidth >= 1000) {
  ScrollTrigger.create({
    trigger: track,
    start: "top top",
    end: "+=800",
    pin: true,
    scrub: true,

    onUpdate: (self) => {
      document.documentElement.style.setProperty(
        "--video-scale",
        1 + self.progress * 0.2
      );
    },
  });
}

    const aboutSection = document.querySelector(".about");
    if (aboutSection && window.innerWidth >= 1000) {
      const lerpColor = (t, c1, c2) => {
        const r = Math.round(parseInt(c1.slice(1,3),16) + (parseInt(c2.slice(1,3),16) - parseInt(c1.slice(1,3),16)) * t);
        const g = Math.round(parseInt(c1.slice(3,5),16) + (parseInt(c2.slice(3,5),16) - parseInt(c1.slice(3,5),16)) * t);
        const b = Math.round(parseInt(c1.slice(5,7),16) + (parseInt(c2.slice(5,7),16) - parseInt(c1.slice(5,7),16)) * t);
        return `rgb(${r},${g},${b})`;
      };

    ScrollTrigger.create({
  trigger: aboutSection,
  start: "top top",
  once: true,

  onEnter: () => {
    gsap.to(aboutSection, {
      backgroundColor: "transparent",
      "--about-text": "#000000",
      duration: 0.8,
      ease: "power2.out",
    });
  },

});

const state = { progress: 0 };

const updateColors = () => {
  aboutSection.style.setProperty(
    "--about-bg",
    lerpColor(state.progress, "#1F1635", "#edf1e8")
  );

  aboutSection.style.setProperty(
    "--about-text",
    lerpColor(state.progress, "#ffffff", "#000000")
  );
};

// ScrollTrigger.create({
//   trigger: aboutSection,

//   // Ajustá este punto hasta que coincida con el momento
//   // en que el hero ya quedó atrás.
//   start: "top top",

//   onEnter: () => {
//     gsap.to(state, {
//       progress: 1,
//       duration: 0.7,
//       ease: "power2.out",
//       overwrite: true,
//       onUpdate: updateColors,
//     });
//   },

//   onLeaveBack: () => {
//     gsap.to(state, {
//       progress: 0,
//       duration: 0.7,
//       ease: "power2.out",
//       overwrite: true,
//       onUpdate: updateColors,
//     });
//   },
// });
    }

    const hScroll = hScrollRef.current;
    const hContent = hScrollContentRef.current;
    if (hScroll && hContent && window.innerWidth >= 1000) {
      let retries = 0;
      const setup = () => {
        const totalWidth = hContent.scrollWidth;
        if (totalWidth <= 0) {
          if (retries++ < 30) { requestAnimationFrame(setup); }
          return;
        }

        ScrollTrigger.create({
          trigger: hScroll,
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const gp = self.progress;
            const x = -(totalWidth - window.innerWidth) * gp;
            gsap.set(hContent, { x });
            document.documentElement.style.setProperty("--h-progress", gp);
          },
        });
      };
      requestAnimationFrame(setup);
    } else if (hContent) {
      gsap.set(hContent, { x: 0 });
      document.documentElement.style.setProperty("--h-progress", 0);
    }

    const refreshOnResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refreshOnResize);

    return () => {
      window.removeEventListener("resize", refreshOnResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };

  });

  useEffect(() => {
    if (window.innerWidth < 1000) return;
    const canvas = alvarezCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let ww = 0, wh = 0;
    let anchors = [];
    let lastPt = null;
    let raf = null;
    const LIFETIME = 1900;
    const MAX_LINES = 1400;
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

    let mounted = true;
    const render = (now) => {
      if (!mounted || !ctx) return;
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
      if (mounted) raf = requestAnimationFrame(render);
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
      mounted = false;
      window.removeEventListener("resize", repaint);
      document.removeEventListener("pointermove", onMove);
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    };
  }, []);

  return (
    <>
      <BackgroundWeb />
      <canvas className="hero-alvarez-canvas" ref={alvarezCanvasRef} aria-hidden="true" />
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
            <Copy animateOnScroll={false} delay={0.15}>
              <span className="hero-name hero-name--julian">Julián</span>
              <span className="hero-header-img" ref={heroImgRef}>
                <img src="/home/hero.webp" alt="" />
              </span>
              <span className="hero-name hero-name--alvarez" ref={alvarezContainerRef}>Alvarez</span>
            </Copy>
          </div>
          <div className="hero-gradient"></div>
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
      <div className="h-scroll" ref={hScrollRef}>
        <div className="h-scroll__track" ref={hScrollContentRef}>
          <div className="h-scroll__panel h-panel">
            <MiHistoria />
          </div>
          <div className="h-scroll__panel h-panel">
            <CTA blocks={[1]} />
          </div>
          <div className="h-scroll__panel h-panel">
            <CTA blocks={[2]} />
          </div>
          <div className="h-scroll__panel h-panel">
            <CTA blocks={[3]} />
          </div>
          <div className="h-scroll__panel h-panel">
            <CTA blocks={[4]} />
          </div>
          {/* <div className="h-scroll__panel h-panel">
            <CTA blocks={[5]} />
          </div> */}
        </div>
      </div>

      <MarqueeBanner />
      <ContactForm />

    </>
  );
}
