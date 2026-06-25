"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./AboutVideo.css";

gsap.registerPlugin(ScrollTrigger);

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
    if (!video) return;
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
    return () => {
      video.removeEventListener("touchstart", onTouch);
      video.removeEventListener("click", onClick);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const newVol = video.volume > 0.5 ? LOW_VOL : FULL_VOL;
    activeVolume.current = newVol;
    video.muted = false;
    gsap.to(video, { volume: newVol, duration: 0.3, ease: "power2.out" });
    setVolState(newVol === LOW_VOL ? "low" : "high");
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

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const p = self.progress;
        const fullyVisible = p > 0 && p < 1;
        const target = fullyVisible ? activeVolume.current : 0;
        gsap.to(video, {
          volume: target,
          duration: 0.3,
          ease: "power2.out",
          onUpdate: () => {
            if (video.volume < 0.05) setVolState("muted");
            else if (video.volume <= LOW_VOL + 0.05) setVolState("low");
            else setVolState("high");
          },
        });
      },
    });

    return () => st.kill();
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
