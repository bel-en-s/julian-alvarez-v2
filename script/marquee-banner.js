import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

(function () {
  const section = document.querySelector(".marquee-banner");
  const marquee1 = section?.querySelector(".marquee-header-1");
  const marquee2 = section?.querySelector(".marquee-header-2");
  const banner = section?.querySelector(".banner");
  const smudgeContainer = section?.querySelector(".smudge-blobs");
  const smudgeSVG = section?.querySelector(".smudge-revealer");

  if (!section || !banner || !smudgeContainer || !smudgeSVG) return;

  const NS = "http://www.w3.org/2000/svg";
  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  let started = false;
  let raf = null;

  const easeOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const easeInCubic = (t) => t * t * t;

  const config = {
    smoothing: 0.12,
    threshold: 0.01,
    sizeFromSpeed: 0.2,
    expandMultiplier: 2,
    expandTime: 2000,
    dissolveStart: 2000,
    dissolveTime: 3000,
  };

  const onPointerMove = (x, y) => {
    if (!started) {
      pointer.x = smooth.x = x;
      pointer.y = smooth.y = y;
      started = true;
      return;
    }
    pointer.x = x;
    pointer.y = y;
  };

  const getRelativePos = (clientX, clientY) => {
    const rect = banner.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleMouseMove = (e) => {
    const pos = getRelativePos(e.clientX, e.clientY);
    onPointerMove(pos.x, pos.y);
  };

  banner.addEventListener("mousemove", handleMouseMove);

  const handleClick = (e) => {
    const pos = getRelativePos(e.clientX, e.clientY);
    const isMobile = window.innerWidth < 1000;
    const burstRadii = isMobile
      ? [15, 22, 12, 18, 10, 20, 14, 16, 19, 11]
      : [30, 45, 25, 35, 20, 40, 28, 32, 38, 22];
    const offsets = isMobile
      ? [[0, 0], [-8, -5], [8, -4], [-4, 8], [6, 6], [-10, 3], [4, -9], [-3, -10], [9, 4], [-6, -3]]
      : [[0, 0], [-15, -10], [15, -8], [-8, 15], [12, 12], [-20, 5], [8, -18], [-5, -20], [18, 8], [-12, -5]];
    offsets.forEach(([ox, oy], i) => {
      stampAt(pos.x + ox, pos.y + oy, burstRadii[i]);
    });
  };

  banner.addEventListener("click", handleClick);

  const matchSVGToViewport = () => {
    const rect = banner.getBoundingClientRect();
    smudgeSVG.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    smudgeSVG.style.width = rect.width + "px";
    smudgeSVG.style.height = rect.height + "px";
  };

  matchSVGToViewport();
  window.addEventListener("resize", matchSVGToViewport);

  const stampAt = (x, y, radius) => {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", radius);
    c.setAttribute("fill", "#fff");
    smudgeContainer.prepend(c);

    const start = performance.now();
    const expandEnd = start + config.expandTime;
    const fadeStart = start + config.dissolveStart;
    const fadeEnd = fadeStart + config.dissolveTime;

    const tick = () => {
      const now = performance.now();
      if (now >= fadeEnd) {
        if (c.parentNode) c.parentNode.removeChild(c);
        return;
      }
      let r = radius;
      if (now < expandEnd) {
        const t = (now - start) / config.expandTime;
        r = radius + (radius * config.expandMultiplier - radius) * easeOutQuad(t);
      }
      if (now >= fadeStart) {
        const t = (now - fadeStart) / config.dissolveTime;
        r *= 1 - easeInCubic(Math.min(t, 1));
      }
      c.setAttribute("r", Math.max(0, r));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const update = () => {
    if (started) {
      smooth.x += (pointer.x - smooth.x) * config.smoothing;
      smooth.y += (pointer.y - smooth.y) * config.smoothing;
      const speed = Math.hypot(pointer.x - smooth.x, pointer.y - smooth.y);
      if (speed > config.threshold) {
        stampAt(smooth.x, smooth.y, speed * config.sizeFromSpeed);
      }
    }
    raf = requestAnimationFrame(update);
  };

  raf = requestAnimationFrame(update);

  if (marquee1 && marquee2) {
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "150% top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(marquee1, { x: `${25 - progress * 50}%` });
        gsap.set(marquee2, { x: `${-25 + progress * 50}%` });
      },
    });
  }

  const bannerContent = section?.querySelector(".banner-content");
  const bannerEl = section?.querySelector(".banner");
  const btnLeft = section?.querySelector(".marquee-btn--left");
  const btnRight = section?.querySelector(".marquee-btn--right");

  if (bannerEl) {
    gsap.set(bannerEl, { opacity: 0, scale: 0.85 });
  }
  if (btnLeft) btnLeft.style.left = "0%";
  if (btnRight) btnRight.style.right = "0%";

  const entryTl = gsap.timeline({ paused: true });
  if (bannerEl) {
    entryTl.to(bannerEl, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
  }
  if (btnLeft && btnRight) {
    entryTl.to(btnLeft, { left: "25%", duration: 0.8, ease: "power3.out" }, "-=0.6")
           .to(btnRight, { right: "25%", duration: 0.8, ease: "power3.out" }, "-=0.6");
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "top 30%",
    onEnter: () => entryTl.play(),
    onLeaveBack: () => entryTl.reverse(),
  });

  const initSpiderWeb = (btn) => {
    const canvas = btn.querySelector(".spider-btn-web");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0;
    const dpr = window.devicePixelRatio || 1;
    let anchors = [];
    let lastPt = null;
    let inside = false;

    const resize = () => {
      const r = btn.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = w / 2, cy = h / 2;
      const rx = w * 0.55, ry = h * 0.6;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
      }
      ctx.clearRect(0, 0, w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(btn);

    const strand = (x1, y1, x2, y2, alpha) => {
      ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
      ctx.lineWidth = 0.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      const sorted = anchors.slice().sort((a, b) =>
        (a.x - x) * (a.x - x) + (a.y - y) * (a.y - y)
        - ((b.x - x) * (b.x - x) + (b.y - y) * (b.y - y))
      );
      strand(sorted[0].x, sorted[0].y, x, y, 0.55);
      strand(sorted[1].x, sorted[1].y, x, y, 0.32);
      if (lastPt && inside) strand(lastPt.x, lastPt.y, x, y, 0.7);
      lastPt = { x, y };
    };

    const onEnter = () => { inside = true; lastPt = null; };
    const onLeave = () => {
      inside = false;
      let t = 0;
      const fade = setInterval(() => {
        t++;
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
        if (t > 14) { clearInterval(fade); ctx.clearRect(0, 0, w, h); }
      }, 30);
    };

    if (window.innerWidth >= 1000) {
      btn.addEventListener("pointerenter", onEnter);
      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", onLeave);
    }
  };

  document.querySelectorAll(".marquee-banner .spider-btn").forEach(initSpiderWeb);

  ScrollTrigger.refresh();

  window.addEventListener("beforeunload", () => {
    banner.removeEventListener("mousemove", handleMouseMove);
    banner.removeEventListener("click", handleClick);
    window.removeEventListener("resize", matchSVGToViewport);
    if (raf) cancelAnimationFrame(raf);
  });
})();
