import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundColor = "#1E2024";

  const section = document.querySelector(".fdc");
  if (!section) return;

  initHeroAnimations();
  initMarquees();
  initTextReveals();
  initGalleryParallax();

  function initHeroAnimations() {
    const targets = section.querySelectorAll(
      ".fdc-hero-inner > [data-copy-wrapper]"
    );
    if (!targets.length) return;

    gsap.set(targets, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(targets, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      overwrite: "auto",
    });
  }

  function initMarquees() {
    const marquees = document.querySelectorAll("[data-marquee]");
    marquees.forEach((el) => {
      const dir = parseFloat(el.dataset.marquee);
      const clone = el.cloneNode(true);
      el.parentElement.appendChild(clone);

      gsap.to([el, clone], {
        xPercent: dir === 1 ? -50 : 50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    });

    const bands = gsap.utils.toArray(".band");
    bands.forEach((band, i) => {
      gsap.to(band, {
        x: i % 2 === 0 ? 80 : -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".press-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  function initTextReveals() {
    const wrappers = section.querySelectorAll("[data-copy-wrapper]");

    wrappers.forEach((container) => {
      const isMobile = window.innerWidth < 1000;

      const ctx = gsap.context(() => {
        const elements = Array.from(container.children);

        const allLines = [];

        elements.forEach((el) => {
          try {
            const split = SplitText.create(el, {
              type: "lines",
              linesClass: "line",
              lineThreshold: 0.1,
            });
            allLines.push(...split.lines);
          } catch (e) {
          }
        });

        if (!allLines.length) return;

        gsap.set(allLines, { y: "100%" });

        const anim = gsap.to(allLines, {
          y: "0%",
          duration: isMobile ? 0.5 : 1,
          stagger: isMobile ? 0.05 : 0.1,
          ease: "power4.out",
          overwrite: "auto",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          animation: anim,
          once: true,
          refreshPriority: -1,
        });
      }, container);
    });
  }

  function initGalleryParallax() {
    const items = document.querySelectorAll("[data-parallax]");
    if (!items.length) return;

    items.forEach((item) => {
      const speed = parseFloat(item.dataset.parallax) || 60;

      gsap.fromTo(
        item,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });
  }

  function initQuoteReveal() {
    const quotes = document.querySelectorAll(".partido-grid-quote blockquote");
    if (!quotes.length) return;

    quotes.forEach((quote) => {
      gsap.to(quote, {
        "--highlight-offset": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: quote,
          scrub: 1,
          start: "top 85%",
          end: "bottom 30%",
        },
      });
    });
  }

  initQuoteReveal();
});
