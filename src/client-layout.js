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

  return (
    <ReactLenis root options={{
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 0.8,
      lerp: 0.08,
      wheelMultiplier: 1,
      infinite: false,
      syncTouch: true,
    }}>
      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
