"use client";
import "./Menu.css";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuRef = useRef(null);

  const layerRef = useRef(null);
  const frameRef = useRef(null);
  const scrimRef = useRef(null);
  const webRef = useRef(null);

  const toggleMenu = () => {
    if (isOpen) closeMenu();
    else openMenu();
  };

  const primeWeb = () => {
    const web = webRef.current;
    if (!web) return;
    web.querySelectorAll("path").forEach((p) => {
      let len;
      try { len = p.getTotalLength(); } catch (_) { return; }
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
  };

  const openMenu = () => {
    setIsAnimating(true);
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    const layer = layerRef.current;
    const frame = frameRef.current;
    const scrim = scrimRef.current;
    const web = webRef.current;

    // Layer + scrim
    tl.to(layer, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
    tl.to(scrim, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0);

      // Web paths draw
    if (web) {
      const origin = web.querySelector(".origin");
      if (origin) {
        tl.fromTo(
          origin,
          { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
          0.05
        );
      }
      const strands = web.querySelectorAll(".strand");
      if (strands.length) {
        tl.to(strands, { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut", stagger: 0.08 }, 0.08);
      }
      const auxs = web.querySelectorAll(".auxiliary");
      if (auxs.length) {
        tl.to(auxs, { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut", stagger: 0.04 }, 0.35);
      }
      const nine = web.querySelector(".nine");
      if (nine) {
        tl.to(nine, { strokeDashoffset: 0, duration: 1.0, ease: "power3.inOut" }, 0.55);
      }
      const anchors = web.querySelectorAll(".anchor:not(.origin)");
      if (anchors.length) {
        tl.fromTo(
          anchors,
          { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" },
          { opacity: 0.9, scale: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.15 },
          1.0
        );
      }
      const dangles = web.querySelectorAll(".dangle");
      if (dangles.length) {
        tl.to(dangles, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out", stagger: 0.06 }, 1.8);
      }
      const tips = web.querySelectorAll(".dangle-tip");
      if (tips.length) {
        tl.fromTo(
          tips,
          { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" },
          { opacity: 0.85, scale: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.06 },
          2.2
        );
      }
    }

    // Items appear
    const items = frame ? Array.from(frame.querySelectorAll(".ja-menu-arana__item")) : [];
    if (items.length) {
      tl.fromTo(
        items,
        { opacity: 0, xPercent: -50, yPercent: -50, scale: 0.6 },
        { opacity: 1, xPercent: -50, yPercent: -50, scale: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.08 },
        0.35
      );
    }

    // Layer state
    tl.call(() => {
      if (layer) layer.classList.add("is-open");
    }, [], 0);
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setIsAnimating(false);
        if (layerRef.current) layerRef.current.classList.remove("is-open");
      },
    });

    const layer = layerRef.current;

    tl.to(layer, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
  };

  const handleLinkClick = () => {
    if (isOpen) closeMenu();
  };

  useEffect(() => {
    primeWeb();

    const fit = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const s = Math.max(0.42, Math.min(1, w / 800, h / 560));
      frame.style.setProperty("--s", s.toFixed(4));
    };
    fit();
    window.addEventListener("resize", fit);

    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <nav className="menu" ref={menuRef}>
      <div className={`menu-header${isOpen ? " is-open" : ""}`} onClick={toggleMenu}>
        <img className="menu-logo" src={bp + "/logo.png"} alt="Julian Alvarez" />
        <button className="menu-toggle" aria-label="Toggle menu" onClick={(e) => { e.stopPropagation(); toggleMenu(); }}>
          <div className={`menu-hamburger-icon${isOpen ? " open" : ""}`}>
            <span className="menu-item"></span>
            <span className="menu-item"></span>
            <span className="menu-item"></span>
          </div>
        </button>
      </div>

      <div className="ja-menu-arana">
        <div className="ja-menu-arana__layer" ref={layerRef}>
          <div className="ja-menu-arana__scrim" ref={scrimRef} onClick={closeMenu}></div>
          <div className="ja-menu-arana__frame" ref={frameRef}>
            <svg
              className="ja-menu-arana__web"
              ref={webRef}
              viewBox="0 0 800 560"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <circle className="anchor origin" cx="740" cy="110" r="3.5" />
              <path className="strand s1" d="M 740 110 Q 520 170 340 240" />
              <path className="strand s2" d="M 740 110 Q 460 240 220 340" />
              <path className="strand s3" d="M 740 110 Q 510 320 320 440" />
              <path className="strand s4" d="M 740 110 Q 560 190 440 260" />
              <path className="auxiliary a1" d="M 740 110 Q 580 130 440 160" />
              <path className="auxiliary a2" d="M 740 110 Q 520 140 340 180" />
              <path className="auxiliary a3" d="M 740 110 Q 600 220 500 340" />
              <path className="auxiliary a4" d="M 740 110 Q 560 300 400 480" />
              <path className="auxiliary a5" d="M 740 110 Q 500 390 320 440" />
              <path
                className="nine"
                d="M 340 240 C 400 230 430 260 440 280 C 460 310 420 350 220 340 C 190 340 280 290 340 240 Z"
              />
              <circle className="anchor k1" cx="340" cy="240" r="2.4" />
              <circle className="anchor k4" cx="440" cy="280" r="2.4" />
              <circle className="anchor k2" cx="220" cy="340" r="2.4" />
              <g className="dangles">
                <path className="dangle g1" d="M 340 290 Q 342 330 336 360 Q 332 380 340 390" />
                <circle className="dangle-tip t1" cx="340" cy="390" r="1.3" />
                <path className="dangle g2" d="M 220 380 Q 210 420 206 450 Q 204 470 214 480" />
                <circle className="dangle-tip t2" cx="214" cy="480" r="1.4" />
                <path className="dangle g3" d="M 440 320 Q 448 350 442 370 Q 438 390 446 400" />
                <circle className="dangle-tip t3" cx="446" cy="400" r="1.2" />
              </g>
            </svg>

            <Link
              href="/"
              className="ja-menu-arana__item i1"
              onClick={handleLinkClick}
            >
              <span className="ja-menu-arana__dot"></span>
              DENTRO DE LAS CANCHAS
            </Link>
            <Link
              href="/wardrobe"
              className="ja-menu-arana__item i2"
              onClick={handleLinkClick}
            >
              <span className="ja-menu-arana__dot"></span>
              FUERA DE LAS CANCHAS
            </Link>
            <Link
              href="/touchpoint"
              className="ja-menu-arana__item i4"
              onClick={handleLinkClick}
            >
              <span className="ja-menu-arana__dot"></span>
              CONTACTO
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
