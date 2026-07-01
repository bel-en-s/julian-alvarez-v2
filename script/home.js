import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { initAnimations } from "./anime";

function initBlockReveal() {
  const titles = document.querySelectorAll(
    ".work-header .work-header-title h2, .row-content-title h2"
  );
  if (!titles.length) return;

  titles.forEach((el) => {
    if (el.classList.contains("hero-gradient-text")) return;
    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "block-line",
    });
    if (!split.lines || !split.lines.length) return;

    const lines = [];
    const blocks = [];

    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.className = "block-line-wrapper";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);

      const block = document.createElement("div");
      block.className = "block-revealer";
      block.style.backgroundColor = "#8A75B8";
      wrapper.appendChild(block);

      lines.push(line);
      blocks.push(block);
    });

    gsap.set(lines, { opacity: 0 });
    gsap.set(blocks, { scaleX: 0, transformOrigin: "left center" });

    const trigger = el.closest(".row") || el.closest("section");
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger,
        start: "top 88%",
        once: true,
        onEnter: () => tl.play(),
      },
    });

    lines.forEach((line, i) => {
      const block = blocks[i];
      const pos = i * 0.15;
      tl.to(block, { scaleX: 1, duration: 0.7, ease: "power4.inOut" }, pos);
      tl.set(line, { opacity: 1 }, pos + 0.7);
      tl.set(block, { transformOrigin: "right center" }, pos + 0.7);
      tl.to(block, { scaleX: 0, duration: 0.7, ease: "power4.inOut" }, pos + 0.7);
    });
  });
}

function startEntryAnimations(hasDelay = false) {
  const heroNames = document.querySelectorAll(".hero-name");
  if (heroNames.length) {
    if (window.innerWidth >= 1000) {
      const heroChars = [];
      heroNames.forEach((el) => {
        const split = new SplitText(el, { type: "chars", charsClass: "hero-char" });
        heroChars.push(...split.chars);
      });
      gsap.set(heroChars, {
        y: () => -(window.innerHeight + 200),
        visibility: "visible",
      });
      gsap.to(heroChars, {
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        delay: hasDelay ? 0.5 : 0,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(heroChars, { clearProps: "transform" });
        },
      });
    } else {
      gsap.fromTo(heroNames,
        { opacity: 0, y: 40, visibility: "visible" },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: hasDelay ? 0.5 : 0,
          ease: "power3.out",
        }
      );
    }
  }

  const heroImgWrapper = document.querySelector(".hero-header-img");
  if (heroImgWrapper && window.innerWidth >= 1000) {
    if (hasDelay) heroImgWrapper.style.animationDelay = "0.5s";
    heroImgWrapper.classList.add("hero-header-img--enter");
    heroImgWrapper.addEventListener("animationend", () => {
      heroImgWrapper.classList.remove("hero-header-img--enter");
      heroImgWrapper.style.animationDelay = "";
      heroImgWrapper.style.transform = "translateY(0)";
    }, { once: true });
  } else if (heroImgWrapper) {
    gsap.fromTo(heroImgWrapper,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        delay: hasDelay ? 0.6 : 0.1,
        ease: "power2.out",
        onComplete: () => {
          heroImgWrapper.style.transform = "translateY(0)";
        },
      }
    );
  }

  gsap.set(".hero .hero-cards .card", { transformOrigin: "center center" });

  gsap.to(".hero .hero-cards .card", {
    scale: 1,
    duration: 0.8,
    delay: 0.1,
    stagger: 0.05,
    ease: "power4.out",
    onComplete: () => {
      gsap.set("#hero-card-1", { transformOrigin: "top right" });
      gsap.set("#hero-card-3", { transformOrigin: "top left" });
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  document.addEventListener("preloader:complete", () => {
    startEntryAnimations(false);
    ScrollTrigger.refresh();
  }, { once: true });
  if (sessionStorage.getItem("ja_preloader_shown") === "1") {
    startEntryAnimations(true);
  }
  initAnimations();

  const aboutSection = document.querySelector(".about");
  const aboutDesc = document.querySelector(".slide-description h1");
  const aboutTitle = document.querySelector(".slide-title h1");

  if (aboutSection) {
    if (window.innerWidth >= 1000) {
      ScrollTrigger.create({
        trigger: aboutSection,
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

    [aboutDesc, aboutTitle].forEach((el) => {
      if (el) {
        SplitText.create(el, {
          type: "words",
          wordsClass: "about-word"
        });
      }
    });

    const titleWords = document.querySelectorAll(".slide-title .about-word");
    titleWords.forEach((word) => {
      if (word.textContent.trim().toLowerCase().includes("soñando")) {
        word.classList.add("about-word--textured");
      }
    });

    if (aboutDesc || aboutTitle) {
      if (window.innerWidth >= 1000) {
        gsap.to(".about-word", {
          "--highlight-offset": "100%",
          stagger: 0.4,
          scrollTrigger: {
            trigger: ".about",
            scrub: 1,
            start: "top top",
            end: "+=800",
          }
        });
      } else {
        const aboutVideoWrapper = document.querySelector(".about-video-wrapper");
        if (aboutVideoWrapper) {
          gsap.fromTo(aboutVideoWrapper,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".about",
                start: "top 90%",
                once: true,
              }
            }
          );
        }
        gsap.fromTo(".about-word",
          { "--highlight-offset": "0%" },
          {
            "--highlight-offset": "100%",
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about",
              start: "top 80%",
              once: true,
            }
          }
        );
      }
    }
  }

  const videoGraySection = document.querySelector(".row--video-gray");
  if (videoGraySection && window.innerWidth >= 1000) {
    ScrollTrigger.create({
      trigger: videoGraySection,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        document.documentElement.style.setProperty(
          "--video-gray-scale",
          1 + self.progress * 0.2
        );
      },
    });

    const vqTargets = videoGraySection.querySelectorAll(".video-quote h2, .video-quote p");
    if (vqTargets.length) {
      gsap.fromTo(vqTargets,
        { "--highlight-offset": "0%" },
        {
          "--highlight-offset": "100%",
          stagger: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: videoGraySection,
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          }
        }
      );
    }
  }



  const smoothStep = (p) => p * p * (3 - 2 * p);

  if (window.innerWidth > 1000) {
    ScrollTrigger.create({
      trigger: ".home-services",
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: ".home-services",
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: ".home-services",
      start: "top bottom",
      end: `+=${window.innerHeight * 4}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
        const headerY = gsap.utils.interpolate(
          "300%",
          "0%",
          smoothStep(headerProgress)
        );
        gsap.set(".home-services-header", {
          y: headerY,
        });

        ["#card-1", "#card-2", "#card-3"].forEach((cardId, index) => {
          const delay = index * 0.5;
          const cardProgress = gsap.utils.clamp(
            0,
            1,
            (progress - delay * 0.1) / (0.9 - delay * 0.1)
          );

          const innerCard = document.querySelector(
            `${cardId} .flip-card-inner`
          );

          let y;
          if (cardProgress < 0.4) {
            const normalizedProgress = cardProgress / 0.4;
            y = gsap.utils.interpolate(
              "-100%",
              "50%",
              smoothStep(normalizedProgress)
            );
          } else if (cardProgress < 0.6) {
            const normalizedProgress = (cardProgress - 0.4) / 0.2;
            y = gsap.utils.interpolate(
              "50%",
              "0%",
              smoothStep(normalizedProgress)
            );
          } else {
            y = "0%";
          }

          let scale;
          if (cardProgress < 0.4) {
            const normalizedProgress = cardProgress / 0.4;
            scale = gsap.utils.interpolate(
              0.25,
              0.75,
              smoothStep(normalizedProgress)
            );
          } else if (cardProgress < 0.6) {
            const normalizedProgress = (cardProgress - 0.4) / 0.2;
            scale = gsap.utils.interpolate(
              0.75,
              1,
              smoothStep(normalizedProgress)
            );
          } else {
            scale = 1;
          }

          let opacity;
          if (cardProgress < 0.2) {
            const normalizedProgress = cardProgress / 0.2;
            opacity = smoothStep(normalizedProgress);
          } else {
            opacity = 1;
          }

          let x, rotate, rotationY;
          if (cardProgress < 0.6) {
            x = index === 0 ? "100%" : index === 1 ? "0%" : "-100%";
            rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
            rotationY = 0;
          } else if (cardProgress < 1) {
            const normalizedProgress = (cardProgress - 0.6) / 0.4;
            x = gsap.utils.interpolate(
              index === 0 ? "100%" : index === 1 ? "0%" : "-100%",
              "0%",
              smoothStep(normalizedProgress)
            );
            rotate = gsap.utils.interpolate(
              index === 0 ? -5 : index === 1 ? 0 : 5,
              0,
              smoothStep(normalizedProgress)
            );
            rotationY = smoothStep(normalizedProgress) * 180;
          } else {
            x = "0%";
            rotate = 0;
            rotationY = 180;
          }

          gsap.set(cardId, {
            opacity: opacity,
            y: y,
            x: x,
            rotate: rotate,
            scale: scale,
          });

          gsap.set(innerCard, {
            rotationY: rotationY,
          });
        });
      },
    });
  }

  const spotlightImages = document.querySelector(".home-spotlight-images");
  if (spotlightImages) {
    const containerHeight = spotlightImages.offsetHeight;
    const viewportHeight = window.innerHeight;

    const initialOffset = containerHeight * 0.05;
    const totalMovement = containerHeight + initialOffset + viewportHeight;

  const spotlightHeader = document.querySelector(".spotlight-mask-header h3");
  let headerSplit = null;

  if (spotlightHeader) {
    headerSplit = SplitText.create(spotlightHeader, {
      type: "words",
      wordsClass: "spotlight-word",
    });

    gsap.set(headerSplit.words, { opacity: 0 });
  }

  ScrollTrigger.create({
    trigger: ".home-spotlight",
    start: "top top",
    end: `+=${window.innerHeight * 7}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      if (progress <= 0.5) {
        const animationProgress = progress / 0.5;

        const startY = 5;
        const endY = -(totalMovement / containerHeight) * 100;

        const currentY = startY + (endY - startY) * animationProgress;

        gsap.set(spotlightImages, {
          y: `${currentY}%`,
        });
      }

      const maskContainer = document.querySelector(
        ".spotlight-mask-image-container"
      );
      const maskImage = document.querySelector(".spotlight-mask-image");

      if (maskContainer && maskImage) {
        if (progress >= 0.25 && progress <= 0.75) {
          const maskProgress = (progress - 0.25) / 0.5;
          const maskSize = `${maskProgress * 475}%`;

          const imageScale = 1.25 - maskProgress * 0.25;

          maskContainer.style.setProperty("-webkit-mask-size", maskSize);
          maskContainer.style.setProperty("mask-size", maskSize);

          gsap.set(maskImage, {
            scale: imageScale,
          });
        } else if (progress < 0.25) {
          maskContainer.style.setProperty("-webkit-mask-size", "0%");
          maskContainer.style.setProperty("mask-size", "0%");

          gsap.set(maskImage, {
            scale: 1.25,
          });
        } else if (progress > 0.75) {
          maskContainer.style.setProperty("-webkit-mask-size", "475%");
          maskContainer.style.setProperty("mask-size", "475%");

          gsap.set(maskImage, {
            scale: 1,
          });
        }
      }

      if (headerSplit && headerSplit.words.length > 0) {
        if (progress >= 0.75 && progress <= 0.95) {
          const textProgress = (progress - 0.75) / 0.2;
          const totalWords = headerSplit.words.length;

          headerSplit.words.forEach((word, index) => {
            const wordRevealProgress = index / totalWords;

            if (textProgress >= wordRevealProgress) {
              gsap.set(word, { opacity: 1 });
            } else {
              gsap.set(word, { opacity: 0 });
            }
          });
        } else if (progress < 0.75) {
          gsap.set(headerSplit.words, { opacity: 0 });
        } else if (progress > 0.95) {
          gsap.set(headerSplit.words, { opacity: 1 });
        }
      }
    },
  });
  }

  const outroHeader = document.querySelector(".outro h3");
  let outroSplit = null;

  if (outroHeader) {
    outroSplit = SplitText.create(outroHeader, {
      type: "words",
      wordsClass: "outro-word",
    });

    gsap.set(outroSplit.words, { opacity: 0 });
  }

  const outroStrips = document.querySelectorAll(".outro-strip");
  const stripSpeeds = [0.3, 0.4, 0.25, 0.35, 0.2, 0.25];

  ScrollTrigger.create({
    trigger: ".outro",
    start: "top top",
    end: `+=${window.innerHeight * 3}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      if (outroSplit && outroSplit.words.length > 0) {
        if (progress >= 0.25 && progress <= 0.75) {
          const textProgress = (progress - 0.25) / 0.5;
          const totalWords = outroSplit.words.length;

          outroSplit.words.forEach((word, index) => {
            const wordRevealProgress = index / totalWords;

            if (textProgress >= wordRevealProgress) {
              gsap.set(word, { opacity: 1 });
            } else {
              gsap.set(word, { opacity: 0 });
            }
          });
        } else if (progress < 0.25) {
          gsap.set(outroSplit.words, { opacity: 0 });
        } else if (progress > 0.75) {
          gsap.set(outroSplit.words, { opacity: 1 });
        }
      }
    },
  });

  ScrollTrigger.create({
    trigger: ".outro",
    start: "top bottom",
    end: `+=${window.innerHeight * 6}px`,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      outroStrips.forEach((strip, index) => {
        if (stripSpeeds[index] !== undefined) {
          const speed = stripSpeeds[index];
          const movement = progress * 100 * speed;

          gsap.set(strip, {
            x: `${movement}%`,
          });
        }
      });
    },
  });

  if (document.querySelector(".work-items")) {
    ScrollTrigger.refresh();
  }

  if (window.innerWidth >= 1000) {
    if (document.querySelector(".work-header")) {
      gsap.set(".work-header-arrow-icon", { scale: 0 });

      const feastText = SplitText.create(".work-header-content p", {
        type: "lines",
        mask: "lines",
      });

      const titleText = SplitText.create(".work-header-title h1", {
        type: "lines",
        mask: "lines",
      });

      gsap.set([feastText.lines, titleText.lines], {
        y: "120%",
      });

      const headerTl = gsap.timeline({ delay: 0.75 });

      headerTl.to(
        feastText.lines,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
        },
        "-=0.9"
      );

      headerTl.to(
        titleText.lines,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        "-=0.9"
      );

      headerTl.to(
        ".work-header-arrow-icon",
        {
          scale: 1,
          duration: 0.75,
          ease: "power4.out",
        },
        "-=0.9"
      );
    }
  }

  if (window.innerWidth >= 1000) {
    const amounts = [-200, -280, -150, -320, -220, -180, -300, -160, -260, -350].map(function(a) { return a * 0.15; });
    const scrubs = [0.2, 0.5, 0.8, 0.35, 0.65, 0.95, 0.3, 0.55, 0.85, 0.4];
    gsap.utils.toArray(".work-items .work-item-img").forEach((wrapper, i) => {
      const img = wrapper.querySelector("img");
      const video = wrapper.querySelector("video");
      const src = img?.getAttribute("src") || "";

      // skip video wrappers and specific images
      if (video) return;
      if (src.includes("/bio/1.webp")) return;
      if (src.includes("Anexo 9")) return;
      if (src.includes("Anexo 6")) return;
      if (src.includes("Anexo 8")) return;

      let amount = amounts[i % amounts.length];
      if (src.includes("Anexo 11")) amount = Math.abs(amount) * 2;
      if (src.includes("Anexo 5")) amount = -Math.abs(amount) * 12;
      if (src.includes("Anexo 7")) amount = -Math.abs(amount) * 12;
      // parallax hacia arriba para bio/4.webp (contraste con bio/3)
      if (src.includes("/bio/4.webp")) amount = -Math.abs(amount);
      // parallax hacia abajo para bio/3.webp
      if (src.includes("/bio/3.webp")) amount = Math.abs(amount) * 1.5;
      if (src.includes("/bio/2.webp")) amount = Math.abs(amount);
      if (wrapper.classList.contains("work-item-img--bio3")) amount = Math.abs(amount);

      const scrubVal = scrubs[i % scrubs.length];

      gsap.to(wrapper, {
        y: amount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubVal,
        },
      });
      const item = wrapper.closest(".work-item");
      const content = item.querySelector(".work-item-content");
      if (content && !content.classList.contains("no-parallax")) {
        gsap.to(content, {
          y: amount * 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
    start: "top 85%",
            end: "bottom top",
            scrub: Math.min(scrubVal * 2, 1.5),
          },
        });
      }
    });
    gsap.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach((el) => {
      if (el.classList.contains("no-parallax")) return;
      gsap.to(el, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest(".row"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }

  // MI HISTORIA char-by-char entrance (typewriter)
  const miHistoria = document.getElementById("mi-historia-text");
  if (miHistoria && window.innerWidth >= 1000) {
    const fullText = miHistoria.textContent;
    miHistoria.textContent = "";

    const section = miHistoria.closest(".behind-the-lock");
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              const tl = gsap.timeline();
              fullText.split("").forEach((char, i) => {
                tl.call(() => {
                  miHistoria.textContent += char;
                }, [], i * 0.05);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: [0, 0.1, 0.3, 0.5] }
      );
      observer.observe(section);
    }
  }

  // btl-header-text scroll reveal
  const headerText = document.querySelector(".btl-header-text");
  if (headerText) {
    gsap.set(headerText, { opacity: 0, y: 30 });
    gsap.to(headerText, {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: headerText,
    start: "top bottom",
        end: "top 30%",
        scrub: 1,
      },
    });
  }

  initWorkTimeline();
});

function initWorkTimeline() {
  const timeline = document.querySelector(".work-timeline");
  const progress = timeline?.querySelector(".work-timeline-progress");
  const workSection = document.querySelector(".work-items");
  if (!timeline || !progress || !workSection) return;

  const spEl = document.createElement("div");
  spEl.style.position = "absolute";
  spEl.style.left = "50%";
  spEl.style.top = "0";
  spEl.style.width = "60px";
  spEl.style.height = "60px";
  spEl.style.transform = "translate(-50%, -50%)";
  spEl.style.pointerEvents = "none";
  spEl.style.zIndex = "3";
  spEl.style.filter = "drop-shadow(0 0 4px rgba(216,200,245,.4))";
  timeline.appendChild(spEl);

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "-30 -30 60 60");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.display = "block";
  svg.style.opacity = "1";
  spEl.appendChild(svg);

  const defs = document.createElementNS(NS, "defs");
  defs.innerHTML =
    `<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`;
  svg.appendChild(defs);

  const legEls = [];
  for (let i = 0; i < 8; i++) {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("class", "s-leg");
    svg.appendChild(p);
    legEls.push(p);
  }

  const bodyG = document.createElementNS(NS, "g");
  bodyG.innerHTML =
    '<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/>' +
    '<ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/>' +
    '<path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/>' +
    '<path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>';
  svg.appendChild(bodyG);

  const LEGS = [
    { side: +1, fore: 5.2, reach: 12, phase: 0.00 },
    { side: +1, fore: 1.4, reach: 14, phase: 0.50 },
    { side: +1, fore: -2.2, reach: 14, phase: 0.00 },
    { side: +1, fore: -5.6, reach: 12, phase: 0.50 },
    { side: -1, fore: 5.2, reach: 12, phase: 0.50 },
    { side: -1, fore: 1.4, reach: 14, phase: 0.00 },
    { side: -1, fore: -2.2, reach: 14, phase: 0.50 },
    { side: -1, fore: -5.6, reach: 12, phase: 0.00 },
  ];

  const FEMUR = 8.6, TIBIA = 9.2;
  const STEP = 13, DUTY = 0.6, LIFT = 3.4, BODYLIFT = 1.6;

  let walkDist = 0;
  let lastProgress = 0;

  function updateSpider(p) {
    const delta = p - lastProgress;
    lastProgress = p;
    walkDist += delta * 280;

    const yPos = -8 + p * 116;

    const fx = 0, fy = 1;
    const nx = 1, ny = 0;

    const bob = Math.sin(2 * Math.PI * (walkDist / STEP)) * 0.5;
    const bodyX = nx * (BODYLIFT + bob);
    const bodyY = 0;

    const headingDeg = Math.atan2(fy, fx) * 180 / Math.PI;
    bodyG.setAttribute("transform", `translate(${bodyX.toFixed(2)} ${bodyY.toFixed(2)}) rotate(${headingDeg.toFixed(1)})`);

    for (let i = 0; i < 8; i++) {
      const lg = LEGS[i];

      const hx = bodyX + fx * lg.fore * 0.45 + nx * lg.side * 1.7;
      const hy = bodyY + fy * lg.fore * 0.45 + ny * lg.side * 1.7;

      const ntx = bodyX + fx * lg.fore + nx * lg.side * lg.reach;
      const nty = bodyY + fy * lg.fore + ny * lg.side * lg.reach;

      const ph = ((walkDist / STEP) + lg.phase) % 1;
      let foreOff, liftAmt;
      if (ph < DUTY) {
        const u = ph / DUTY;
        foreOff = (0.5 - u) * STEP;
        liftAmt = 0;
      } else {
        const w = (ph - DUTY) / (1 - DUTY);
        foreOff = (w - 0.5) * STEP;
        liftAmt = Math.sin(w * Math.PI) * LIFT;
      }

      const fxw = ntx + fx * foreOff - (ntx - hx) / lg.reach * liftAmt;
      const fyw = nty + fy * foreOff - (nty - hy) / lg.reach * liftAmt;

      let dx = fxw - hx, dy = fyw - hy;
      let d = Math.hypot(dx, dy);
      const dmax = FEMUR + TIBIA - 0.2;
      const dmin = Math.abs(FEMUR - TIBIA) + 0.2;
      if (d > dmax) d = dmax;
      if (d < dmin) d = dmin;
      const ux = dx / (Math.hypot(dx, dy) || 1);
      const uy = dy / (Math.hypot(dx, dy) || 1);
      const px = ux * d, py = uy * d;
      const xk = (d * d + FEMUR * FEMUR - TIBIA * TIBIA) / (2 * d);
      const yk = Math.sqrt(Math.max(0, FEMUR * FEMUR - xk * xk)) * lg.side;
      const vx = -uy, vy = ux;
      const kx = hx + ux * xk + vx * yk;
      const ky = hy + uy * xk + vy * yk;
      const fxc = hx + px, fyc = hy + py;

      legEls[i].setAttribute("d", `M${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)} L${fxc.toFixed(1)} ${fyc.toFixed(1)}`);
    }

    spEl.style.top = yPos + "%";
  }

  const endOffset = 2809;
  timeline.style.height = endOffset + "px";
  timeline.style.bottom = "auto";

  const spiderEndEl = workSection.querySelectorAll(".row--first")[1];
  const spiderEndOffset = spiderEndEl ? spiderEndEl.offsetTop + spiderEndEl.offsetHeight : endOffset;

  ScrollTrigger.create({
    trigger: workSection,
    start: "top 85%",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      const scrollPos = p * endOffset;
      const spiderP = Math.min(scrollPos / spiderEndOffset, 1);
      progress.style.height = spiderP * 100 + "%";
      updateSpider(spiderP);
      spEl.style.display = "block";
    },
  });
}
