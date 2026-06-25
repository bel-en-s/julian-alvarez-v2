"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const scrollSettings = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    smoothTouch: true,
    touchMultiplier: 1,
    lerp: 0.1,
    wheelMultiplier: 1,
    infinite: false,
    syncTouch: true,
  };

  return (
    <ReactLenis root options={scrollSettings}>
      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
