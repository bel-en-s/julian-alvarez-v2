import gsap from "gsap";

const CONTACT_API = "/api/contact.php";

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.getElementById("stage");
  const rig = document.getElementById("rig");
  const form = document.getElementById("form");
  const thanks = document.getElementById("thanks");
  const submitBtn = document.getElementById("submitBtn");

  function dropAway() {
    if (!stage.classList.contains("is-open") || stage.classList.contains("is-closing")) return;
    stage.classList.add("is-closing");
    stage.setAttribute("aria-hidden", "true");
    thanks.classList.add("is-visible");
    setTimeout(() => stage.classList.remove("is-open", "is-closing"), 700);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("msg").value.trim();
    if (!name || !email || !msg) return;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      if (res.ok) {
        dropAway();
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
        alert("Error al enviar. Intentá de nuevo.");
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar";
      alert("Error al enviar. Intentá de nuevo.");
    }
  });

  gsap.from(".contact-eyebrow", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.4,
    ease: "power2.out",
  });

  gsap.from(".contact-sub", {
    opacity: 0,
    y: 15,
    duration: 0.5,
    delay: 0.55,
    ease: "power2.out",
  });

  gsap.from(".contact-field", {
    opacity: 0,
    y: 10,
    duration: 0.4,
    stagger: 0.08,
    delay: 0.7,
    ease: "power2.out",
  });

  gsap.from(".contact-submit", {
    opacity: 0,
    y: 10,
    duration: 0.4,
    delay: 1.1,
    ease: "power2.out",
  });

  if (window.innerWidth >= 1000 && rig) {
    rig.addEventListener("animationend", () => {
      gsap.set(rig, { opacity: 1, x: 0, y: 0, rotation: 0 });
      rig.style.animation = "none";
      document.addEventListener("mousemove", (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        gsap.to(rig, {
          rotationX: -dy * 8,
          rotationY: dx * 8,
          duration: 1.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    }, { once: true });
  }
});
