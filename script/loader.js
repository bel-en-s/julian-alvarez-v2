import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const LOADER_KEY = "ja_preloader_shown";
const MAX_LOADER_DURATION = 4000;

function hideWrapper(wrapper) {
  gsap.set(wrapper, { display: "none" });
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

const wrapper = document.querySelector(".preloader-wrapper");
if (!wrapper) throw new Error("Preloader wrapper not found");

if (sessionStorage.getItem(LOADER_KEY) === "1") {
  hideWrapper(wrapper);
} else {
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    sessionStorage.setItem(LOADER_KEY, "1");
    hideWrapper(wrapper);
    document.dispatchEvent(new CustomEvent("preloader:complete"));
  };

  setTimeout(finish, MAX_LOADER_DURATION);

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  Promise.race([
    document.fonts.ready,
    new Promise((resolve) => window.addEventListener("load", resolve)),
  ]).then(() => {
    if (finished) return;

    const logoEl = document.querySelector(".preloader-logo h1");
    const logoSplit = logoEl
      ? SplitText.create(".preloader-logo h1", {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        })
      : null;

    if (logoSplit) {
      gsap.set(logoSplit.chars, { x: "110%" });
      gsap.set(".preloader-logo h1", { opacity: 1 });
    }

    function animateProgress(duration = 2) {
      const tl = gsap.timeline();
      const counterSteps = 5;
      let currentProgress = 0;

      for (let i = 0; i < counterSteps; i++) {
        const finalStep = i === counterSteps - 1;
        const targetProgress = finalStep
          ? 1
          : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
        currentProgress = targetProgress;

        tl.to(".preloader-progress-bar", {
          scaleX: targetProgress,
          duration: duration / counterSteps,
          ease: "power2.out",
        });
      }

      return tl;
    }

    const isMobile = window.innerWidth < 1000;
    const maskScale = isMobile ? 25 : 15;

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: finish,
    });

    if (logoSplit) {
      tl.to(logoSplit.chars, {
        x: "0%",
        stagger: 0.05,
        ease: "power4.out",
        duration: 1,
      });
    }

    tl.add(animateProgress(), "<");

    if (logoSplit) {
      tl.to(
        logoSplit.chars,
        {
          x: "-110%",
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.5"
      );
    }

    tl.to(
      ".preloader-progress",
      {
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
      },
      "-=0.5"
    )
      .to(
        ".preloader-video",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        ".preloader-mask",
        {
          scale: maskScale,
          duration: 1.25,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        ".preloader-bg",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power3.out",
        },
        "-=0.2"
      );
  });
}
