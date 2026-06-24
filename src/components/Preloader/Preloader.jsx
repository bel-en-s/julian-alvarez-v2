"use client";
import "./Preloader.css";
import { useEffect, useState, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

let isInitialLoad = true;

const Preloader = () => {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(isInitialLoad);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().catch(() => {
        const onInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("touchstart", onInteraction);
          document.removeEventListener("click", onInteraction);
        };
        document.addEventListener("touchstart", onInteraction, { once: true });
        document.addEventListener("click", onInteraction, { once: true });
      });
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("canplaythrough", attemptPlay, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener("canplaythrough", attemptPlay);
    };
  }, []);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (loaderAnimating) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader) return;

      document.fonts.ready.then(() => {
        const logoSplit = SplitText.create(".preloader-logo h1", {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        });

        gsap.set(logoSplit.chars, { x: "110%" });
        gsap.set(".preloader-logo h1", { opacity: 1 });

        function animateProgress(duration = 4.75) {
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
          delay: 0.5,
          onComplete: () => {
            setLoaderAnimating(false);
            setTimeout(() => {
              setShowPreloader(false);
            }, 100);
          },
        });

        tl.to(logoSplit.chars, {
          x: "0%",
          stagger: 0.05,
          ease: "power4.out",
          duration: 1,
        })
          .add(animateProgress(), "<")
          .set(".preloader-progress-bar", { backgroundColor: "var(--violet)" })
          .to(
            logoSplit.chars,
            {
              x: "-110%",
              stagger: 0.05,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.5"
          )
          .to(
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
          )
          .to({}, { duration: 1 });
      });
    },
    { scope: wrapperRef, dependencies: [showPreloader] }
  );

  if (!showPreloader) return null;

  return (
    <div className="preloader-wrapper" ref={wrapperRef}>
      <div className="preloader-bg"></div>
      <video ref={videoRef} className="preloader-video" src="/loader/loader-opt.mp4" autoPlay muted loop playsInline webkit-playsinline="true" disablePictureInPicture controlsList="nodownload noremoteplayback" preload="auto" />
      <div className="preloader-progress">
        <div className="preloader-progress-bar"></div>
      </div>
      <div className="preloader-logo">
        {/* <h1>Nrmlss</h1> */}
      </div>
      <div className="preloader-mask"></div>
    </div>
  );
};

export { isInitialLoad };
export default Preloader;
