"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import "./AboutVideo.css";

const LOW_VOL = 0.15;
const FULL_VOL = 1.0;

export default function AboutVideo() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volState, setVolState] = useState("muted");
  const activeVolume = useRef(0);
  const touched = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;
    video.muted = true;
    video.play().catch(() => {});

    const onTouch = () => {
      touched.current = true;
      if (video.paused) { video.play(); setPlaying(true); }
      else { video.pause(); setPlaying(false); }
    };
    const onClick = () => {
      if (touched.current) { touched.current = false; return; }
      if (video.paused) { video.play(); setPlaying(true); }
      else { video.pause(); setPlaying(false); }
    };
    video.addEventListener("touchstart", onTouch);
    video.addEventListener("click", onClick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && activeVolume.current > 0) {
          gsap.to(video, { volume: activeVolume.current, duration: 0.3, ease: "power2.out" });
          setVolState(activeVolume.current > 0.5 ? "high" : "low");
        } else if (!entry.isIntersecting) {
          gsap.to(video, { volume: 0, duration: 0.3, ease: "power2.out", onComplete: () => setVolState("muted") });
        }
      },
      { threshold: 0 }
    );
    observer.observe(wrapper);

    return () => {
      video.removeEventListener("touchstart", onTouch);
      video.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.volume > 0) {
      activeVolume.current = video.volume;
      gsap.to(video, { volume: 0, duration: 0.2, ease: "power2.out", onComplete: () => setVolState("muted") });
    } else {
      const newVol = activeVolume.current > 0 ? activeVolume.current : LOW_VOL;
      video.muted = false;
      activeVolume.current = newVol;
      gsap.to(video, { volume: newVol, duration: 0.3, ease: "power2.out" });
      setVolState(newVol === LOW_VOL ? "low" : "high");
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div className="about-video-wrapper" ref={wrapperRef}>
      <video
        ref={videoRef}
        src="/home/julian-chiquito.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
      />
      <div className="about-video-controls">
        <button onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"}>
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          )}
        </button>
        <button onClick={toggleSound} aria-label="Alternar sonido">
          {volState === "muted" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" strokeWidth="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" strokeWidth="2"/></svg>
          ) : volState === "low" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" strokeWidth="2" fill="none"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" strokeWidth="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" strokeWidth="2" fill="none"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}
