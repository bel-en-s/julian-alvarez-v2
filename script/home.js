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
  if (heroNames.length && window.innerWidth >= 1000) {
    const heroChars = [];
    heroNames.forEach((el) => {
      const split = new SplitText(el, { type: "chars", charsClass: "hero-char" });
      heroChars.push(...split.chars);
    });
    gsap.set(heroChars, {
      y: () => -(window.innerHeight + 200),
    });
    gsap.to(heroChars, {
      y: 0,
      duration: 0.7,
      stagger: 0.04,
      delay: hasDelay ? 1.5 : 0,
      ease: "power4.out",
      onComplete: () => {
        gsap.set(heroChars, { clearProps: "transform" });
      },
    });
  }

  gsap.set(".hero .hero-cards .card", { transformOrigin: "center center" });

  gsap.to(".hero .hero-cards .card", {
    scale: 1,
    duration: 0.75,
    delay: 0.25,
    stagger: 0.1,
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
  if (aboutSection && window.innerWidth >= 1000) {
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

    const aboutDesc = document.querySelector(".slide-description h1");
    const aboutTitle = document.querySelector(".slide-title h1");
    [aboutDesc, aboutTitle].forEach((el) => {
      if (el) {
        SplitText.create(el, {
          type: "words",
          wordsClass: "about-word"
        });
      }
    });

    if (aboutDesc || aboutTitle) {
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
    document.querySelectorAll(".work-items .row").forEach((row) => {
      const workItems = row.querySelectorAll(".work-item");
      const content = row.querySelector(".row-content");

      workItems.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(item, { x: fromLeft ? "-120%" : "120%", opacity: 0 });
      });

      const tl = gsap.timeline({ paused: true });
      tl.to(workItems, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      });
      if (content) {
        const split = new SplitText(content, { type: "words", wordsClass: "highlight-word" });
        tl.to(split.words, {
          "--highlight-offset": "100%",
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        }, "-=0.6");
      }

      const contentTitle = row.querySelector(".row-content-title");
      if (contentTitle) {
        const titleSplit = new SplitText(contentTitle, { type: "words", wordsClass: "highlight-word" });
        tl.to(titleSplit.words, {
          "--highlight-offset": "100%",
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        }, "-=0.6");
      }

      workItems.forEach((item) => {
        const itemContent = item.querySelector(".work-item-content");
        if (itemContent) {
          const itemSplit = new SplitText(itemContent, { type: "words", wordsClass: "highlight-word" });
          tl.to(itemSplit.words, {
            "--highlight-offset": "100%",
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.out",
          }, "-=0.8");
        }
      });

      ScrollTrigger.create({
        trigger: row,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(),
      });
    });

    ScrollTrigger.refresh();
  }

  if (window.innerWidth >= 1000) {
    if (document.querySelector(".work-header")) {
      gsap.set(".work-profile-icon", { scale: 0 });
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

      headerTl.to(".work-profile-icon", {
        scale: 1,
        duration: 1,
        ease: "power4.out",
      });

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

  const workProfileIcon = document.querySelector(".row--first .work-profile-icon");
  if (workProfileIcon) {
    gsap.to(workProfileIcon, {
      rotation: 360,
      force3D: true,
      ease: "none",
      scrollTrigger: {
        trigger: `.row--first`,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }

  document.querySelectorAll(".work-items .row .work-profile-icon").forEach((icon) => {
    if (icon === workProfileIcon) return;
    gsap.to(icon, {
      rotation: 360,
      force3D: true,
      ease: "none",
      scrollTrigger: {
        trigger: icon.closest(".row"),
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  });

  if (window.innerWidth >= 1000) {
    const amounts = [-200, -280, -150, -320, -220, -180, -300, -160, -260, -350];
    gsap.utils.toArray(".work-items .work-item-img").forEach((wrapper, i) => {
      gsap.to(wrapper, {
        y: amounts[i % amounts.length],
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      const item = wrapper.closest(".work-item");
      const content = item.querySelector(".work-item-content");
      if (content) {
        gsap.to(content, {
          y: amounts[i % amounts.length] * 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });
    gsap.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach((el) => {
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
  initBlockReveal();
});
