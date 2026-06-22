
"use client";
import { useEffect, useRef } from "react";
import "./Curtain.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Curtain() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const ballRef = useRef(null);
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth <= 999;

    gsap.set(ballRef.current, {
      x: window.innerWidth + 300,
      y: window.innerHeight * 0.25,
      rotation: 0,
      scale: 1,
    });

    const ballTl = gsap.timeline({ paused: true });

    // entra desde la derecha
    ballTl.to(ballRef.current, {
      x: window.innerWidth * 0.58,
      y: window.innerHeight * 0.72,
      rotation: 540,
      ease: "power2.in",
      duration: 0.42,
    });

    // rebote
    ballTl.to(ballRef.current, {
      x: window.innerWidth * 0.25,
      y: isMobile ? window.innerHeight * 0.18 : window.innerHeight * 0.28,
      rotation: 900,
      ease: "power2.out",
      duration: 0.18,
    });

    // vuelve a caer
    ballTl.to(ballRef.current, {
      x: window.innerWidth * 0.05,
      y: isMobile ? window.innerHeight * 0.55 : window.innerHeight * 0.65,
      rotation: 1180,
      ease: "power2.in",
      duration: 0.15,
    });

    // sale hacia la izquierda
    ballTl.to(ballRef.current, {
      x: -250,
      y: isMobile ? window.innerHeight * 0.35 : window.innerHeight * 0.45,
      rotation: 1500,
      ease: "power2.out",
      duration: 0.25,
    });

    const updateCurtain = (p) => {
      gsap.set(header1Ref.current, {
        x: -innerWidth * 3 * p,
        y: innerHeight * 0.5 * p,
        scale: 1 + 9 * p,
      });

      gsap.set(header2Ref.current, {
        x: innerWidth * 3 * p,
        y: innerHeight * 0.5 * p,
        scale: 1 + 9 * p,
      });

      const eased = gsap.parseEase("power3.out")(p);

      gsap.set(imgRef.current, {
        rotation: 30 * (1 - eased),
        scale: 0.6 + 0.4 * eased,
      });
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      refreshPriority: 10,
      onUpdate: (self) => {
        updateCurtain(self.progress);
        ballTl.progress(self.progress);
      },
    });

    const img = imgRef.current;

    const refreshSoon = () =>
      requestAnimationFrame(() => ScrollTrigger.refresh());

    refreshSoon();

    window.addEventListener("load", refreshSoon, {
      once: true,
    });

    if (img) {
      if (img.complete) {
        refreshSoon();
      } else {
        img.addEventListener("load", refreshSoon, {
          once: true,
        });

        img.addEventListener("error", refreshSoon, {
          once: true,
        });
      }

      img.decode?.().then(refreshSoon).catch(() => {});
    }

    document.fonts?.ready?.then(refreshSoon).catch(() => {});

    return () => {
      st.kill();
      ballTl.kill();
    };
  }, []);

  return (
    <section className="curtain" ref={sectionRef}>
      <div className="curtain-ball" ref={ballRef}>
        <img src="/curtain/balon.png" alt="" />
      </div>

      <div className="curtain-img" ref={imgRef}>
        <img src="/curtain/cuerpo.png" alt="" />
      </div>

      {/*
      <div className="curtain-copy">
        <div className="curtain-header" ref={header1Ref}>
          <h1>Mi</h1>
        </div>

        <div className="curtain-header" ref={header2Ref}>
          <h1>Historia</h1>
        </div>
      </div>
      */}
    </section>
  );
}
