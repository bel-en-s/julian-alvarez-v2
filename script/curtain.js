import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".curtain");
const img = section?.querySelector(".curtain-img");
const ball = section?.querySelector(".curtain-ball");
if (section && img && ball) {
  const isMobile = window.innerWidth <= 999;

  if (!isMobile) {
    gsap.set(ball, {
      x: window.innerWidth + 300,
      y: window.innerHeight * 0.08,
      rotation: 0,
      scale: 1,
    });
  }

  const ballTl = gsap.timeline({ paused: true });

  if (!isMobile) {
    ballTl.to(ball, {
      x: window.innerWidth * 0.58,
      y: window.innerHeight * 0.45,
      rotation: 540,
      ease: "power2.in",
      duration: 0.42,
    });

    ballTl.to(ball, {
      x: window.innerWidth * 0.25,
      y: window.innerHeight * 0.10,
      rotation: 900,
      ease: "power2.out",
      duration: 0.18,
    });

    ballTl.to(ball, {
      x: window.innerWidth * 0.05,
      y: window.innerHeight * 0.40,
      rotation: 1180,
      ease: "power2.in",
      duration: 0.15,
    });

    ballTl.to(ball, {
      x: -250,
      y: window.innerHeight * 0.20,
      rotation: 1500,
      ease: "power2.out",
      duration: 0.25,
    });
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${isMobile ? window.innerHeight * 5 : window.innerHeight * 3}`,
    scrub: true,
    invalidateOnRefresh: true,
    refreshPriority: 10,
    onUpdate: (self) => {
      const p = self.progress;
      const eased = gsap.parseEase("power3.out")(p);

      if (!isMobile) {
        gsap.set(img, {
          rotation: 30 * (1 - eased),
          scale: 0.75 + 0.25 * eased,
        });
        ballTl.progress(p);
      }
    },
  });
}
