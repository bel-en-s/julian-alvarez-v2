import gsap from "gsap";

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

  function ready() {
    if (finished) return;

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

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: finish,
    });

    tl.add(animateProgress(), "0")
      .to(".preloader-wrapper", {
        y: "-100%",
        duration: 0.4,
        ease: "power4.inOut",
      });
  }

  if (document.readyState === "complete") {
    ready();
  } else {
    window.addEventListener("load", ready);
  }
}
