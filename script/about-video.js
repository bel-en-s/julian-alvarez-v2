import gsap from "gsap";

const LOW_VOL = 0.15;

const wrapper = document.querySelector(".about-video-wrapper");
const video = wrapper?.querySelector("video");
if (video && wrapper) {
  let playing = true;
  let volState = "muted";
  let activeVolume = 0;
  let touched = false;

  const playBtn = wrapper.querySelector(".video-play-btn");
  const soundBtn = wrapper.querySelector(".video-sound-btn");
  const pauseSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  const playSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  const muteSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>';
  const lowSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>';
  const highSvg =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';

  video.muted = true;
  video.play().catch(() => {});

  const togglePlay = () => {
    if (video.paused) {
      video.play();
      playing = true;
      if (playBtn) playBtn.innerHTML = pauseSvg;
    } else {
      video.pause();
      playing = false;
      if (playBtn) playBtn.innerHTML = playSvg;
    }
  };

  const toggleSound = () => {
    if (volState !== "muted") {
      video.muted = true;
      volState = "muted";
      if (soundBtn) soundBtn.innerHTML = muteSvg;
    } else {
      video.muted = false;
      video.volume = activeVolume > 0 ? activeVolume : LOW_VOL;
      activeVolume = video.volume;
      volState = activeVolume === LOW_VOL ? "low" : "high";
      if (soundBtn)
        soundBtn.innerHTML = volState === "low" ? lowSvg : highSvg;
    }
  };

  const onTouch = () => {
    touched = true;
    togglePlay();
  };

  const onClick = () => {
    if (touched) {
      touched = false;
      return;
    }
    togglePlay();
  };

  video.addEventListener("touchstart", onTouch);
  video.addEventListener("click", onClick);

  if (playBtn) playBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePlay(); });
  if (soundBtn) soundBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleSound(); });

  let savedVolState = null;
  let savedActiveVol = 0;
  const aboutSection = wrapper.closest(".about");
  if (aboutSection) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          if (volState !== "muted") {
            savedVolState = volState;
            savedActiveVol = activeVolume;
            video.muted = true;
            volState = "muted";
            if (soundBtn) soundBtn.innerHTML = muteSvg;
          }
        } else if (savedVolState && savedVolState !== "muted") {
          const restoreVol = savedActiveVol > 0 ? savedActiveVol : LOW_VOL;
          video.muted = false;
          video.volume = restoreVol;
          activeVolume = restoreVol;
          volState = savedVolState;
          if (soundBtn)
            soundBtn.innerHTML = savedVolState === "low" ? lowSvg : highSvg;
          savedVolState = null;
          savedActiveVol = 0;
        }
      });
    }, { threshold: 0 });
    obs.observe(aboutSection);
  }
}
