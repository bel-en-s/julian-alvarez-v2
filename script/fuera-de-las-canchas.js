import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundColor = "#1E2024";

  initCursorWeb();

  const section = document.querySelector(".fdc");
  if (!section) return;

  initHeroAnimations();
  initMarquees();
  initTextReveals();
  initGalleryParallax();

  function initHeroAnimations() {
    const targets = section.querySelectorAll(
      ".fdc-hero-inner > [data-copy-wrapper]"
    );
    if (!targets.length) return;

    gsap.set(targets, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(targets, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      overwrite: "auto",
    });
  }

  function initMarquees() {
    const marquees = document.querySelectorAll("[data-marquee]");
    marquees.forEach((el) => {
      const dir = parseFloat(el.dataset.marquee);
      const clone = el.cloneNode(true);
      el.parentElement.appendChild(clone);

      gsap.to([el, clone], {
        xPercent: dir === 1 ? -50 : 50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    });

    const bands = gsap.utils.toArray(".band");
    bands.forEach((band, i) => {
      gsap.to(band, {
        x: i % 2 === 0 ? 80 : -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".press-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  function initTextReveals() {
    const wrappers = section.querySelectorAll("[data-copy-wrapper]");

    wrappers.forEach((container) => {
      const isMobile = window.innerWidth < 1000;

      const ctx = gsap.context(() => {
        const elements = Array.from(container.children);

        const allLines = [];

        elements.forEach((el) => {
          try {
            const split = SplitText.create(el, {
              type: "lines",
              linesClass: "line",
              lineThreshold: 0.1,
            });
            allLines.push(...split.lines);
          } catch (e) {
          }
        });

        if (!allLines.length) return;

        gsap.set(allLines, { y: "100%" });

        const anim = gsap.to(allLines, {
          y: "0%",
          duration: isMobile ? 0.5 : 1,
          stagger: isMobile ? 0.05 : 0.1,
          ease: "power4.out",
          overwrite: "auto",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          animation: anim,
          once: true,
          refreshPriority: -1,
        });
      }, container);
    });
  }

  function initGalleryParallax() {
    const items = document.querySelectorAll("[data-parallax]");
    if (!items.length) return;

    items.forEach((item) => {
      const speed = parseFloat(item.dataset.parallax) || 40;

      gsap.fromTo(
        item,
        { y: speed * 1.5 },
        {
          y: -speed * 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
  }

  function initCursorWeb() {
    const canvas = document.createElement("canvas");
    canvas.id = "fdc-cursor-bg";
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "0",
      display: "block",
    });
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let ww = 0, wh = 0;
    let anchors = [];
    let lastPt = null;
    let raf = null;
    const LIFETIME = 1900;
    const MAX_LINES = 1400;
    let lines = [];

    const repaint = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = Math.floor(ww * dpr);
      canvas.height = Math.floor(wh * dpr);
      canvas.style.width = ww + "px";
      canvas.style.height = wh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastPt = null;
      lines = [];
      const rx = ww * 0.3, ry = wh * 0.35;
      anchors = [];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        anchors.push({ x: ww / 2 + Math.cos(a) * rx, y: wh / 2 + Math.sin(a) * ry });
      }
    };
    repaint();
    window.addEventListener("resize", repaint);

    const render = (now) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, ww, wh);
      const cutoff = now - LIFETIME;
      let write = 0;
      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (ln.t < cutoff) continue;
        lines[write++] = ln;
        const age = (now - ln.t) / LIFETIME;
        const alpha = (1 - age) * ln.opacity;
        ctx.strokeStyle = "rgba(216, 200, 245, " + alpha + ")";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ln.x1, ln.y1);
        ctx.lineTo(ln.x2, ln.y2);
        ctx.stroke();
      }
      lines.length = write;
      if (rafActive) raf = requestAnimationFrame(render);
    };

    const pushLine = (x1, y1, x2, y2, opacity) => {
      lines.push({ x1, y1, x2, y2, t: performance.now(), opacity });
      if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    };

    var rafActive = false;
    function startRAF() { if (!rafActive) { rafActive = true; raf = requestAnimationFrame(render); } }
    function stopRAF() { rafActive = false; if (raf) { cancelAnimationFrame(raf); raf = null; } }

    startRAF();

    const onMove = (e) => {
      const sorted = anchors.slice().sort((a, b) =>
        (a.x - e.clientX) * (a.x - e.clientX) + (a.y - e.clientY) * (a.y - e.clientY)
        - ((b.x - e.clientX) * (b.x - e.clientX) + (b.y - e.clientY) * (b.y - e.clientY))
      );
      pushLine(sorted[0].x, sorted[0].y, e.clientX, e.clientY, 0.55);
      pushLine(sorted[1].x, sorted[1].y, e.clientX, e.clientY, 0.32);
      if (lastPt) pushLine(lastPt.x, lastPt.y, e.clientX, e.clientY, 0.7);
      lastPt = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => { lastPt = null; lines = []; };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
  }
});
