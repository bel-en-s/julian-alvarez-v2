"use client";
import "./Copy.css";
import { useRef, useEffect } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  type = "slide",
}) {
  const containerRef = useRef(null);
  const playedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || playedRef.current) return;
    mountedRef.current = true;
    let ctx;

    const setup = async () => {
      try {
        await document.fonts.ready;
        await new Promise((r) => setTimeout(r, 100));
      } catch {
        await new Promise((r) => setTimeout(r, 200));
      }

      if (!mountedRef.current) return;
      playedRef.current = true;

      const isMobile = window.innerWidth < 1000;

      ctx = gsap.context(() => {
        const elements = container.hasAttribute("data-copy-wrapper")
          ? Array.from(container.children)
          : [container];

        if (type === "slide") {
          const allLines = [];

          elements.forEach((el) => {
            const split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "line",
              lineThreshold: 0.1,
            });

            const textIndent = getComputedStyle(el).textIndent;
            if (textIndent && textIndent !== "0px") {
              if (split.lines.length > 0) {
                split.lines[0].style.paddingLeft = textIndent;
              }
              el.style.textIndent = "0";
            }

            allLines.push(...split.lines);
          });

          gsap.set(allLines, { y: "100%" });

          const anim = gsap.to(allLines, {
            y: "0%",
            duration: isMobile ? 0.5 : 1,
            stagger: isMobile ? 0.05 : 0.1,
            ease: "power4.out",
            delay,
            overwrite: "auto",
            paused: animateOnScroll,
            onComplete: () => {
              allLines.forEach((line) => {
                const mask = line.parentElement?.closest?.(".line-mask");
                if (mask) mask.style.overflow = "visible";
                line.style.overflow = "visible";
              });
            },
          });

          if (animateOnScroll) {
            ScrollTrigger.create({
              trigger: container,
              start: "top 80%",
              animation: anim,
              once: true,
              refreshPriority: -1,
            });
          }
        } else if (type === "flicker") {
          const allChars = [];

          elements.forEach((el) => {
            const split = SplitText.create(el, {
              type: "words,chars",
            });

            allChars.push(...split.chars);
          });

          gsap.set(allChars, { opacity: 0 });

          const anim = gsap.to(allChars, {
            duration: 0.05,
            opacity: 1,
            ease: "power2.inOut",
            delay,
            overwrite: "auto",
            stagger: {
              amount: isMobile ? 0.3 : 0.5,
              each: 0.1,
              from: "random",
            },
            paused: animateOnScroll,
          });

          if (animateOnScroll) {
            ScrollTrigger.create({
              trigger: container,
              start: "top 85%",
              animation: anim,
              once: true,
            });
          }
        }
      }, container);
    };

    setup();

    return () => {
      mountedRef.current = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
