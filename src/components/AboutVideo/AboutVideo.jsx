"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./AboutVideo.css";

gsap.registerPlugin(ScrollTrigger);

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const LOW_VOL = 0.15;
const FULL_VOL = 1.0;

export default function AboutVideo() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volState, setVolState] = useState("muted");
  const activeVolume = useRef(LOW_VOL);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const unMute = () => {
      video.muted = false;
      video.volume = LOW_VOL;
      setVolState("low");
    };
    if (video.readyState >= 3 && !video.paused) {
      unMute();
    } else {
      video.addEventListener("canplay", unMute, { once: true });
    }
    return () => video.removeEventListener("canplay", unMute);
  }, []);

  const toggleSound = useCallback((e) => {
    e.stopPropagation();
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
        const isVisible = p > 0.15 && p < 0.85;
        const target = isVisible ? activeVolume.current : 0;
        gsap.to(video, {
          volume: target,
          duration: 0.5,
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
        src={`${bp}/home/julian-chiquito.mp4`}
        autoPlay
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      <div className="about-video-controls">
        <button onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"}>
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button onClick={toggleSound} aria-label="Alternar sonido">
          {volState === "muted" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M17 7l-2 2 2 2-2 2 2 2 2-2 2 2 2-2-2-2 2-2-2-2-2 2-2-2z"/></svg>
          ) : volState === "low" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}
