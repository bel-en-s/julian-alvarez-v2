"use client";
import "./home.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { products } from "./wardrobe/products";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import DotMatrix from "@/components/DotMatrix/DotMatrix";
import BrandIcon from "@/components/BrandIcon/BrandIcon";
import MarqueeBanner from "@/components/MarqueeBanner/MarqueeBanner";
import TextBlock from "@/components/TextBlock/TextBlock";
import PeelReveal from "@/components/PeelReveal/PeelReveal";
import CTA from "@/components/CTA/CTA";
import NextMatch from "@/components/NextMatch/NextMatch";
import Mascara3D from "@/components/Mascara3D/Mascara3D";

import Copy from "@/components/Copy/Copy";
import Product from "@/components/Product/Product";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [loaderAnimating, setLoaderAnimating] = useState(isInitialLoad);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const heroImgRef = useRef(null);
  const heroHeaderRef = useRef(null);
  const heroSectionRef = useRef(null);
  const alvarezCanvasRef = useRef(null);
  const alvarezContainerRef = useRef(null);

  const handlePreloaderComplete = () => {
    setLoaderAnimating(false);
  };

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 4));
  }, []);

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
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
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

    const repaint = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = Math.floor(ww * dpr);
      canvas.height = Math.floor(wh * dpr);
      canvas.style.width = ww + "px";
      canvas.style.height = wh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, ww, wh);
      const rx = ww * 0.3, ry = wh * 0.35;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
      }
    };
    repaint();

    window.addEventListener("resize", repaint);

    const strand = (x1, y1, x2, y2, alpha) => {
      ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
      ctx.lineWidth = 0.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const onMove = (e) => {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, ww, wh);
      ctx.restore();

      const sorted = anchors.slice().sort((a, b) =>
        (a.x - e.clientX) * (a.x - e.clientX) + (a.y - e.clientY) * (a.y - e.clientY)
        - ((b.x - e.clientX) * (b.x - e.clientX) + (b.y - e.clientY) * (b.y - e.clientY))
      );
      strand(sorted[0].x, sorted[0].y, e.clientX, e.clientY, 0.55);
      strand(sorted[1].x, sorted[1].y, e.clientX, e.clientY, 0.32);
      if (lastPt) strand(lastPt.x, lastPt.y, e.clientX, e.clientY, 0.7);
      lastPt = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", repaint);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <Preloader onAnimationComplete={handlePreloaderComplete} />

      <section className="hero" ref={heroSectionRef}>
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
              <span className="hero-name hero-name--alvarez violeta" ref={alvarezContainerRef}>Alvarez</span>
            </Copy>
          </div>
          <canvas className="hero-alvarez-canvas" ref={alvarezCanvasRef} aria-hidden="true" />
        </div>
        <div className="hero-img" ref={heroImgRef}>
          <img src="/home/hero.webp" alt="" />
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

      <section className="about">
        <div className="container">
          <div className="about-copy">
           <div className="about-icon">
              <BrandIcon />
            </div>
            <Copy>
              <h3>
               "Sigan soñando.<br />Con trabajo, sacrificio y siendo buenas personas, los sueños se acercan cada día."
              </h3>
            </Copy>
            <div className="about-icon">
              Aca poner un componente de video
            </div>
          </div>
        </div>
        <div className="section-footer light">
          <Copy type="flicker">
            <p>/ Core State /</p>
          </Copy>
        </div>
      </section>
{/* 
      <section className="featured-products">
        <div className="container">
          <div className="featured-products-header">
            <Copy type="flicker">
              <p>Featured Units</p>
            </Copy>
            <Copy>
              <h3>
                Selected <br /> Garments
              </h3>
            </Copy>
          </div>
          <div className="featured-products-separator">
            <div className="featured-products-divider"></div>
            <div className="featured-products-labels">
              <Copy type="flicker">
                <p>Primary Set</p>
              </Copy>
              <Copy type="flicker">
                <Link href="/wardrobe">View Archive</Link>
              </Copy>
            </div>
          </div>
          <div className="featured-products-list">
            {featuredProducts.map((product) => (
              <Product
                key={product.name}
                product={product}
                productIndex={products.indexOf(product) + 1}
                showAddToCart={true}
              />
            ))}
          </div>
        </div>
      </section> */}

      <MarqueeBanner />

      <TextBlock />

      <PeelReveal />

      <CTA />
    </>
  );
}
