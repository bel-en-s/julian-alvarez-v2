"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTrigger() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);
  return null;
}

export default function ClientLayout({ children }) {
  const pageRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const onPopState = () => {
      window.location.reload();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const scrollSettings = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1,
    lerp: 0.1,
    wheelMultiplier: 1,
    infinite: false,
    syncTouch: true,
  };

  return (
    <ReactLenis root options={scrollSettings}>
      <LenisScrollTrigger />
      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
