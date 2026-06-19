"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const BrandIcon = ({ width, height, style, showSoundButton, ...props }) => {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const userMuted = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = userMuted.current;
        } else {
          video.muted = true;
        }
      },
      { threshold: 0 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const toggleSound = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      userMuted.current = false;
      video.play();
      setMuted(false);
    } else {
      video.muted = true;
      userMuted.current = true;
      setMuted(true);
    }
  }, []);

  return (
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: width || "100%",
          height: height || "100%",
          ...style,
        }}
        {...props}
      >
      <div
        style={{
          width: "100%",
          height: "100%",
          maskImage: `url(/logo.png)`,
          WebkitMaskImage: `url(/logo.png)`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          ref={videoRef}
          src="/home/julian-chiquito.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {showSoundButton && (
        <button
          onClick={toggleSound}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            zIndex: 10,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default BrandIcon;
