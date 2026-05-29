"use client";
import "./Menu.css";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const layerRef = useRef(null);
  const frameRef = useRef(null);
  const scrimRef = useRef(null);
  const webRef = useRef(null);

  const toggleMenu = () => {
    if (isAnimating) return;
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
    if (hamburgerRef.current) hamburgerRef.current.classList.add("open");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
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
      const anchors = web.querySelectorAll(".anchor");
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
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setIsAnimating(false);
        if (hamburgerRef.current) hamburgerRef.current.classList.remove("open");
        if (layerRef.current) layerRef.current.classList.remove("is-open");
      },
    });

    const layer = layerRef.current;

    tl.to(layer, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setTimeout(() => closeMenu(), 500);
    }
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
      <div className="menu-header" onClick={toggleMenu}>
        <img className="menu-logo" src="./logo.png" alt="Julian Alvarez" />
        <button className="menu-toggle" aria-label="Toggle menu">
          <div className="menu-hamburger-icon" ref={hamburgerRef}>
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
              <path className="strand s1" d="M 744 52 Q 560 110 380 160" />
              <path className="strand s2" d="M 744 52 Q 500 170 260 270" />
              <path className="strand s3" d="M 744 52 Q 550 250 360 370" />
              <path className="strand s4" d="M 744 52 Q 620 130 480 200" />
              <path className="auxiliary a1" d="M 744 52 Q 640 80 480 100" />
              <path className="auxiliary a2" d="M 744 52 Q 560 95 360 120" />
              <path className="auxiliary a3" d="M 744 52 Q 660 160 540 280" />
              <path className="auxiliary a4" d="M 744 52 Q 600 250 420 420" />
              <path className="auxiliary a5" d="M 744 52 Q 540 340 340 380" />
              <path
                className="nine"
                d="M 380 160 C 430 150 460 180 480 200 C 510 230 460 270 260 270 C 230 270 320 210 380 160 Z"
              />
              <circle className="anchor k1" cx="380" cy="160" r="2.4" />
              <circle className="anchor k4" cx="480" cy="200" r="2.4" />
              <circle className="anchor k2" cx="260" cy="270" r="2.4" />
              <g className="dangles">
                <path className="dangle g1" d="M 380 220 Q 382 260 376 290 Q 372 310 380 320" />
                <circle className="dangle-tip t1" cx="380" cy="320" r="1.3" />
                <path className="dangle g2" d="M 260 320 Q 250 360 246 390 Q 244 410 254 420" />
                <circle className="dangle-tip t2" cx="254" cy="420" r="1.4" />
                <path className="dangle g3" d="M 480 250 Q 488 280 482 300 Q 478 320 486 330" />
                <circle className="dangle-tip t3" cx="486" cy="330" r="1.2" />
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
