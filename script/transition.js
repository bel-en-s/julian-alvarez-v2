import gsap from "gsap";

const BLOCK_COUNT = 10;

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".transition-grid");
  if (!grid) return;

  const blocks = [];
  const blockWidth = Math.ceil(window.innerWidth / BLOCK_COUNT) + 5;

  for (let i = 0; i < BLOCK_COUNT; i++) {
    const block = document.createElement("div");
    block.className = "transition-block";
    block.style.width = blockWidth + "px";
    block.style.left = (i * (window.innerWidth / BLOCK_COUNT)) + "px";
    block.style.marginLeft = "-2.5px";
    grid.appendChild(block);
    blocks.push(block);
  }

  gsap.set(blocks, { scaleX: 1, transformOrigin: "right" });
  gsap.to(blocks, {
    scaleX: 0,
    duration: 0.6,
    delay: 0.6,
    ease: "power3.out",
    stagger: { amount: 0.3, from: "start" },
  });

  function closeMenuIfOpen() {
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    if (menuToggleBtn && menuToggleBtn.classList.contains("menu-open")) {
      menuToggleBtn.click();
    }
  }

  function isSamePage(href) {
    if (!href || href === "#" || href === "") return true;
    const hashIndex = href.indexOf("#");
    const pathOnly = hashIndex !== -1 ? href.slice(0, hashIndex) : href;
    const currentPath = window.location.pathname;
    if (pathOnly === currentPath) return true;
    if (
      (currentPath === "/" || currentPath === "/index.html") &&
      (pathOnly === "" || pathOnly === "/" || pathOnly === "/index.html" || pathOnly === "index.html" || pathOnly === "./index.html")
    ) return true;
    const currentFileName = currentPath.split("/").pop() || "index.html";
    const hrefFileName = pathOnly.split("/").pop();
    if (currentFileName === hrefFileName) return true;
    return false;
  }

  function animateLeave() {
    return new Promise((resolve) => {
      gsap.set(blocks, { scaleX: 0, transformOrigin: "left" });
      gsap.to(blocks, {
        scaleX: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: { amount: 0.3, from: "start" },
        onComplete: resolve,
      });
    });
  }

  window.addEventListener("resize", () => {
    const bw = Math.ceil(window.innerWidth / BLOCK_COUNT) + 5;
    blocks.forEach((block, i) => {
      block.style.width = bw + "px";
      block.style.left = (i * (window.innerWidth / BLOCK_COUNT)) + "px";
    });
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (href && (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"))) return;
    if (isSamePage(href)) {
      event.preventDefault();
      closeMenuIfOpen();
      return;
    }
    event.preventDefault();
    animateLeave().then(() => {
      window.location.href = href;
    });
  });
});
