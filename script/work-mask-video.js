import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWorkMaskVideoRotation() {
  const firstIcon = document.querySelector(".row--first .work-profile-icon");
  if (firstIcon) {
    gsap.to(firstIcon, {
      rotation: 360,
      force3D: true,
      ease: "none",
      scrollTrigger: {
        trigger: ".row--first",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }

  document.querySelectorAll(".work-items .row .work-profile-icon").forEach((icon) => {
    if (icon === firstIcon) return;
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
}
