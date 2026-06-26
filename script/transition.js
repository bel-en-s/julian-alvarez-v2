import gsap from "gsap";

const BLOCK_COUNT = 10;

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".transition-grid");
  if (!grid) return;

  const blocks = [];
  for (let i = 0; i < BLOCK_COUNT; i++) {
    const block = document.createElement("div");
    block.className = "transition-block";
    grid.appendChild(block);
    blocks.push(block);
  }

  gsap.set(blocks, { scaleX: 0, transformOrigin: "left" });

  function closeMenuIfOpen() {
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    if (menuToggleBtn && menuToggleBtn.classList.contains("menu-open")) {
      menuToggleBtn.click();
    }
  }

  function isSamePage(href) {
    if (!href || href === "#" || href === "") return true;

    const currentPath = window.location.pathname;

    if (href === currentPath) return true;

    if (
      (currentPath === "/" || currentPath === "/index.html") &&
      (href === "/" ||
        href === "/index.html" ||
        href === "index.html" ||
        href === "./index.html")
    ) {
      return true;
    }

    const currentFileName = currentPath.split("/").pop() || "index.html";
    const hrefFileName = href.split("/").pop();

    if (currentFileName === hrefFileName) return true;

    return false;
  }

  function animateLeave() {
    return new Promise((resolve) => {
      gsap.set(blocks, { scaleX: 0, transformOrigin: "left" });
      gsap.to(blocks, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { amount: 0.3, from: "start" },
        onComplete: resolve,
      });
    });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (
      href &&
      (href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:"))
    ) {
      return;
    }

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
