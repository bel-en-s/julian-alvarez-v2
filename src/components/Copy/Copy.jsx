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
  const mountedRef = useRef(true);
  const splitRefs = useRef([]);
  const triggerRefs = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    mountedRef.current = true;

    const isMobile = window.innerWidth < 1000;
    let cancelled = false;

    const setup = async () => {
      try {
        await document.fonts.ready;
        await new Promise((r) => setTimeout(r, 100));
      } catch {
        await new Promise((r) => setTimeout(r, 200));
      }

      if (!mountedRef.current || cancelled) return;

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

          splitRefs.current.push(split);

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
          paused: animateOnScroll,
          onComplete: () => {
            allLines.forEach((line) => {
              const mask = line.parentElement?.closest?.(".line-mask");
              if (mask) mask.style.overflow = "visible";
              line.style.overflow = "visible";
            });
          },
        });

        animRef.current = anim;

        if (animateOnScroll) {
          const st = ScrollTrigger.create({
            trigger: container,
            start: "top 80%",
            animation: anim,
            once: true,
            refreshPriority: -1,
          });
          triggerRefs.current.push(st);
        }
      } else if (type === "flicker") {
        const allChars = [];

        elements.forEach((el) => {
          const split = SplitText.create(el, {
            type: "words,chars",
          });

          splitRefs.current.push(split);
          allChars.push(...split.chars);
        });

        gsap.set(allChars, { opacity: 0 });

        const anim = gsap.to(allChars, {
          duration: 0.05,
          opacity: 1,
          ease: "power2.inOut",
          delay,
          stagger: {
            amount: isMobile ? 0.3 : 0.5,
            each: 0.1,
            from: "random",
          },
          paused: animateOnScroll,
        });

        animRef.current = anim;

        if (animateOnScroll) {
          const st = ScrollTrigger.create({
            trigger: container,
            start: "top 85%",
            animation: anim,
            once: true,
          });
          triggerRefs.current.push(st);
        }
      }
    };

    setup();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      triggerRefs.current.forEach((st) => st.kill());
      triggerRefs.current = [];
      splitRefs.current.forEach((s) => {
        try {
          s.revert();
        } catch (_) {}
      });
      splitRefs.current = [];
      if (animRef.current) {
        animRef.current.kill();
        animRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
