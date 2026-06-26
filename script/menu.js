import gsap from "gsap";

function initMenu() {
  const root = document.querySelector(".ja-menu-arana");
  const fab = document.querySelector("[data-fab]");
  const layer = root?.querySelector("[data-layer]");
  const frame = root?.querySelector("[data-frame]");
  const scrim = root?.querySelector("[data-scrim]");

  if (!fab || !layer || !frame) return;

  function fit() {
    const rect = root.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;
    const s = Math.max(0.42, Math.min(1, w / 800, h / 560));
    frame.style.setProperty("--s", s.toFixed(4));
  }
  fit();
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
  if (ro) ro.observe(root);
  else window.addEventListener("resize", fit);

  let openTween = null;

  function setOpen(open) {
    if (openTween) { openTween.kill(); openTween = null; }
    fab.classList.toggle("is-open", open);
    fab.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      layer.classList.add("is-open");
      gsap.to(layer, { opacity: 1, duration: 0.3, ease: "power2.out" });
      if (scrim) gsap.to(scrim, { opacity: 1, duration: 0.35, ease: "power2.out" });

      const itemEls = Array.from(frame.querySelectorAll(".ja-menu-arana__item"));
      openTween = gsap.fromTo(itemEls,
        { opacity: 0, scale: 0.6, pointerEvents: "none" },
        { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.55, ease: "power3.out", stagger: 0.06 }
      );
    } else {
      gsap.to(layer, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => {
        layer.classList.remove("is-open");
        const itemEls = frame.querySelectorAll(".ja-menu-arana__item");
        gsap.set(itemEls, { opacity: 0, scale: 0.6, pointerEvents: "none" });
      }});
      if (scrim) gsap.to(scrim, { opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }

  fab.addEventListener("click", () => {
    setOpen(!layer.classList.contains("is-open"));
  });

  if (scrim) {
    scrim.addEventListener("click", () => setOpen(false));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && layer.classList.contains("is-open")) setOpen(false);
  });

  const items = document.querySelectorAll(".ja-menu-arana__item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const path = item.getAttribute("href");
      if (path) {
        setOpen(false);
        window.location.href = path;
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenu);
} else {
  initMenu();
}
