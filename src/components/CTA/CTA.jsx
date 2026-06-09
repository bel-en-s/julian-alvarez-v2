"use client";
import "./CTA.css";
import { useRef, useEffect } from "react";
import Link from "next/link";

import Copy from "../Copy/Copy";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const container = ctaRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const defaultBlock = container.querySelector(".cta-block--default");
      if (defaultBlock) {
        const leftImage = defaultBlock.querySelector(
          ".cta-col:nth-child(1) .cta-side-img"
        );
        const rightImage = defaultBlock.querySelector(
          ".cta-col:nth-child(3) .cta-side-img"
        );

        ScrollTrigger.create({
          trigger: defaultBlock,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (leftImage)
              gsap.set(leftImage, { y: `${20 - progress * 30}rem` });
            if (rightImage)
              gsap.set(rightImage, { y: `${-progress * 30}rem` });
          },
        });
      }

      const splitBlock = container.querySelector(".cta-block--split");
      if (splitBlock) {
        const leftImage = splitBlock.querySelector(
          ".cta-side:first-child .cta-img img"
        );
        const rightImage = splitBlock.querySelector(
          ".cta-side:last-child .cta-img img"
        );

        ScrollTrigger.create({
          trigger: splitBlock,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (leftImage)
              gsap.set(leftImage, { y: `${20 - progress * 30}rem` });
            if (rightImage)
              gsap.set(rightImage, { y: `${-progress * 30}rem` });
          },
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="cta" ref={ctaRef}>
      <div className="container cta-block--default">
        <div className="cta-col">
          <div className="cta-side-img">
            {/* <img src="/bio/3.jpeg" alt="" /> */}
          </div>
          <div className="cta-col-copy">
            <Copy>
              {/* <p className="bodyCopy sm">
                Built to exist outside context, these forms prioritize
                neutrality, and distortion.
              </p> */}
            </Copy>
          </div>
        </div>
        <div className="cta-col">
          <h2 className="cta-title">Club Atlético Calchín (2016) </h2>
          <div className="cta-main-img">
            <img src="/bio/2.jpeg" alt="" />
            
          </div>
           <div className="cta-header">
            <Copy>
              <h5>“Mi pueblo, mis amigos, el potrero. Acá nació todo: la pasión por el fútbol y las ganas de ir siempre un paso más allá. Acá aprendí a soñar en grande.”  </h5>
            </Copy>
          </div>
        </div>
        <div className="cta-col">
          <div className="cta-side-img">
            <img src="/bio/1.jpeg" alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        
        <div className="cta-main-copy">
          {/* <div className="btn">
            <Copy type="flicker">
              <Link href="/wardrobe">VEr mas</Link>
            </Copy>
          </div> */}
        </div>
      </div>

      <div className="container cta-block--split">
        <h2 className="cta-title">El Doble Salto (2018)</h2>
        <div className="cta-images-row">
          <div className="cta-side">
            <div className="cta-img cta-img-left">
              <img src="/bio/Anexo-4.jpg" alt="" />
            </div>
            <div className="cta-side-text">
              <Copy>
                <h5>“Llegar a River fue cumplir el sueño que tenía desde chico… y viví noches que quedan para siempre, como aquella final histórica en Madrid.”</h5>
              </Copy>
            </div>
          </div>
          <div className="cta-side">
            <div className="cta-img cta-img-right">
              <img src="/bio/Anexo-3.jpeg" alt="" />
            </div>
            <div className="cta-side-text">
              <Copy>
                <h5>“El primer llamado para vestir la camiseta de Argentina fue un momento único… un orgullo enorme y una responsabilidad que te marca para siempre.”</h5>
              </Copy>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        
        <div className="cta-main-copy">
          {/* <div className="btn">
            <Copy type="flicker">
              <Link href="/wardrobe">VEr mas</Link>
            </Copy>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CTA;
