const expandBtn = document.querySelector(".video-expand-btn");
const modal = document.getElementById("video-modal");
const modalVideo = modal?.querySelector("video");
const closeBtn = modal?.querySelector(".video-modal-close");
const backdrop = modal?.querySelector(".video-modal-backdrop");
const inlineVideo = document.querySelector('.work-item--video video');

if (expandBtn && modal && modalVideo) {
  const open = () => {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modalVideo.currentTime = inlineVideo?.currentTime || 0;
    modalVideo.muted = false;
    modalVideo.volume = 0.3;
    modalVideo.play().catch(() => {});
    if (inlineVideo) inlineVideo.pause();
  };

  const close = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    modalVideo.pause();
    if (inlineVideo) inlineVideo.play().catch(() => {});
  };

  expandBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
}
