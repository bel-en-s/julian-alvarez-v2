import gsap from "gsap";

const LOADER_KEY = "ja_preloader_shown";
const isMobile = window.innerWidth < 768;
const MAX_WAIT = isMobile ? 6000 : 4000;
const MIN_DISPLAY = 1800;
const PROGRESS_DURATION = 2;
const SLIDE_DURATION = 0.4;

function hideWrapper(wrapper) {
  gsap.set(wrapper, { display: "none" });
  wrapper.style.pointerEvents = "none";
  wrapper.style.touchAction = "";
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.position = "";
}

function startLenis() {
  if (window.lenis) {
    window.lenis.start();
  }
}

const wrapper = document.querySelector(".preloader-wrapper");
if (!wrapper) throw new Error("Preloader wrapper not found");

if (sessionStorage.getItem(LOADER_KEY) === "1") {
  hideWrapper(wrapper);
} else {
  let finished = false;
  const appStart = performance.now();

  const finish = () => {
    if (finished) return;
    finished = true;
    sessionStorage.setItem(LOADER_KEY, "1");
    hideWrapper(wrapper);
    document.dispatchEvent(new CustomEvent("preloader:complete"));
    requestAnimationFrame(() => {
      requestAnimationFrame(startLenis);
    });
  };

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  document.body.style.position = "fixed";
  wrapper.style.pointerEvents = "auto";
  wrapper.style.touchAction = "none";
  if (window.lenis) window.lenis.stop();

  let loadReady = false;
  let timeoutFired = false;

  function tryStart() {
    if (loadReady || timeoutFired) return;
    const elapsed = performance.now() - appStart;
    if (elapsed < MIN_DISPLAY) {
      setTimeout(tryStart, MIN_DISPLAY - elapsed + 100);
      return;
    }
    loadReady = true;

    const tl = gsap.timeline({ delay: 0.1, onComplete: finish });

    const steps = 5;
    let current = 0;
    for (let i = 0; i < steps; i++) {
      const isLast = i === steps - 1;
      const target = isLast ? 1 : Math.min(current + Math.random() * 0.3 + 0.1, 0.9);
      current = target;
      tl.to(".preloader-progress-bar", {
        scaleX: target,
        duration: PROGRESS_DURATION / steps,
        ease: "power2.out",
      });
    }

    tl.to(".preloader-wrapper", {
      y: "-100%",
      duration: SLIDE_DURATION,
      ease: "power4.inOut",
    });
  }

  setTimeout(() => {
    timeoutFired = true;
    tryStart();
  }, MAX_WAIT);

  if (document.readyState === "complete") {
    tryStart();
  } else {
    window.addEventListener("load", tryStart);
  }
}
