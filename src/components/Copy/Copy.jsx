"use client";
import "./Copy.css";
import { useRef, useEffect } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  type = "slide",
}) {
  const containerRef = useRef(null);
  const elementRefs = useRef([]);
  const splitRefs = useRef([]);
  const triggerRefs = useRef([]);
  const mountedRef = useRef(true);

  const waitForFonts = async () => {
    try {
      await document.fonts.ready;

      const customFonts = ["Koulen", "Host Grotesk", "DM Mono"];
      const fontCheckPromises = customFonts.map((fontFamily) => {
        return document.fonts.check(`16px ${fontFamily}`);
      });

      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      mountedRef.current = true;

      const initializeSplitText = async () => {
        await waitForFonts();
        if (!mountedRef.current || !containerRef.current) return;

        splitRefs.current = [];
        elementRefs.current = [];
        triggerRefs.current = [];

        let elements = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(containerRef.current.children);
        } else {
          elements = [containerRef.current];
        }

        if (type === "slide") {
          const allLines = [];

          elements.forEach((element) => {
            elementRefs.current.push(element);

            const split = SplitText.create(element, {
              type: "lines",
              mask: "lines",
              linesClass: "line",
              lineThreshold: 0.1,
            });

            splitRefs.current.push(split);

            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;

            if (textIndent && textIndent !== "0px") {
              if (split.lines.length > 0) {
                split.lines[0].style.paddingLeft = textIndent;
              }
              element.style.textIndent = "0";
            }

            allLines.push(...split.lines);
          });

          gsap.set(allLines, { y: "100%" });

          const animation = gsap.to(allLines, {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            delay: delay,
            paused: animateOnScroll,
            onComplete: () => {
              allLines.forEach(line => {
                const mask = line.parentElement?.closest?.(".line-mask");
                if (mask) mask.style.overflow = "visible";
                line.style.overflow = "visible";
              });
            },
          });

          if (animateOnScroll) {
            const st = ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top 80%",
              animation: animation,
              once: true,
              refreshPriority: -1,
            });
            triggerRefs.current.push(st);
          }
        } else if (type === "flicker") {
          const allChars = [];

          elements.forEach((element) => {
            elementRefs.current.push(element);

            const split = SplitText.create(element, {
              type: "words,chars",
            });

            splitRefs.current.push(split);
            allChars.push(...split.chars);
          });

          gsap.set(allChars, { opacity: 0 });

          const animation = gsap.to(allChars, {
            duration: 0.05,
            opacity: 1,
            ease: "power2.inOut",
            delay: delay,
            stagger: {
              amount: 0.5,
              each: 0.1,
              from: "random",
            },
            paused: animateOnScroll,
          });

          if (animateOnScroll) {
            const st = ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top 85%",
              animation: animation,
              once: true,
            });
            triggerRefs.current.push(st);
          }
        }
      };

      initializeSplitText();

      return () => {
        mountedRef.current = false;
        triggerRefs.current.forEach(st => st.kill());
        triggerRefs.current = [];
        splitRefs.current.forEach(s => {
          try { s.revert(); } catch (_) {}
        });
        splitRefs.current = [];
        elementRefs.current = [];
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay, type] }
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
