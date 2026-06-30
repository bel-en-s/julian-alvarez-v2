import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

if (window.innerWidth >= 1000) {
  const amounts = [-400, -500, -300, -600, -400, -350, -550, -320, -480, -650].map(a => a * 0.15)
  const scrubs = [0.2, 0.5, 0.8, 0.35, 0.65, 0.95, 0.3, 0.55, 0.85, 0.4]

  gsap.utils.toArray(".work-items .work-item-img").forEach((wrapper, i) => {
    const img = wrapper.querySelector("img")
    const video = wrapper.querySelector("video")
    const src = img?.getAttribute("src") || ""

    if (video) return
    if (src.includes("/bio/1.webp")) return
    if (src.includes("Anexo 11")) return
    if (src.includes("Anexo 6")) return
    if (src.includes("Anexo 8")) return

    let amount = amounts[i % amounts.length]
    if (src.includes("Anexo 5")) amount = -Math.abs(amount) * 12
    if (src.includes("Anexo 7")) amount = -Math.abs(amount) * 12
    if (src.includes("/bio/4.webp")) return
    if (src.includes("/bio/3.webp")) amount = Math.abs(amount) * 2
    if (src.includes("/bio/2.webp")) amount = Math.abs(amount)
    if (wrapper.classList.contains("work-item-img--bio3")) amount = Math.abs(amount)

    const scrubVal = scrubs[i % scrubs.length]

    gsap.to(wrapper, {
      y: amount,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        scrub: scrubVal,
      },
    })

    const item = wrapper.closest(".work-item")
    const content = item.querySelector(".work-item-content")
    if (content) {
      gsap.to(content, {
        y: amount * 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: Math.min(scrubVal * 2, 1.5),
        },
      })
    }
  })

  gsap.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach((el) => {
    if (el.classList.contains("no-parallax")) return
    gsap.to(el, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest(".row"),
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })
  })
}

function initWorkTimeline() {
  const timeline = document.querySelector(".work-timeline")
  const progress = timeline?.querySelector(".work-timeline-progress")
  const workSection = document.querySelector(".work-items")
  if (!timeline || !progress || !workSection) return

  const spEl = document.createElement("div")
  spEl.style.position = "absolute"
  spEl.style.left = "50%"
  spEl.style.top = "0"
  spEl.style.width = "60px"
  spEl.style.height = "60px"
  spEl.style.transform = "translate(-50%, -50%)"
  spEl.style.pointerEvents = "none"
  spEl.style.zIndex = "3"
  spEl.style.filter = "drop-shadow(0 0 4px rgba(216,200,245,.4))"
  timeline.appendChild(spEl)

  const NS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(NS, "svg")
  svg.setAttribute("viewBox", "-30 -30 60 60")
  svg.setAttribute("width", "100%")
  svg.setAttribute("height", "100%")
  svg.style.display = "block"
  svg.style.opacity = "1"
  spEl.appendChild(svg)

  const defs = document.createElementNS(NS, "defs")
  defs.innerHTML =
    `<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`
  svg.appendChild(defs)

  const legEls = []
  for (let i = 0; i < 8; i++) {
    const p = document.createElementNS(NS, "path")
    p.setAttribute("class", "s-leg")
    svg.appendChild(p)
    legEls.push(p)
  }

  const bodyG = document.createElementNS(NS, "g")
  bodyG.innerHTML =
    '<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/>' +
    '<ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/>' +
    '<path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/>' +
    '<path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>'
  svg.appendChild(bodyG)

  const LEGS = [
    { side: +1, fore: 5.2, reach: 12, phase: 0.00 },
    { side: +1, fore: 1.4, reach: 14, phase: 0.50 },
    { side: +1, fore: -2.2, reach: 14, phase: 0.00 },
    { side: +1, fore: -5.6, reach: 12, phase: 0.50 },
    { side: -1, fore: 5.2, reach: 12, phase: 0.50 },
    { side: -1, fore: 1.4, reach: 14, phase: 0.00 },
    { side: -1, fore: -2.2, reach: 14, phase: 0.50 },
    { side: -1, fore: -5.6, reach: 12, phase: 0.00 },
  ]

  const FEMUR = 8.6, TIBIA = 9.2
  const STEP = 13, DUTY = 0.6, LIFT = 3.4, BODYLIFT = 1.6

  let walkDist = 0
  let lastProgress = 0

  function updateSpider(p) {
    const delta = p - lastProgress
    lastProgress = p
    const speed = Math.abs(delta)
    if (speed > 0.0001) {
      walkDist += delta * 160
    }

    const yPos = p * 100

    const fx = 0, fy = 1
    const nx = 1, ny = 0

    const bob = Math.sin(2 * Math.PI * (walkDist / STEP)) * 0.5
    const bodyX = nx * (BODYLIFT + bob)
    const bodyY = 0

    const headingDeg = Math.atan2(fy, fx) * 180 / Math.PI
    bodyG.setAttribute("transform", `translate(${bodyX.toFixed(2)} ${bodyY.toFixed(2)}) rotate(${headingDeg.toFixed(1)})`)

    for (let i = 0; i < 8; i++) {
      const lg = LEGS[i]

      const hx = bodyX + fx * lg.fore * 0.45 + nx * lg.side * 1.7
      const hy = bodyY + fy * lg.fore * 0.45 + ny * lg.side * 1.7

      const ntx = bodyX + fx * lg.fore + nx * lg.side * lg.reach
      const nty = bodyY + fy * lg.fore + ny * lg.side * lg.reach

      const ph = ((walkDist / STEP) + lg.phase) % 1
      let foreOff, liftAmt
      if (ph < DUTY) {
        const u = ph / DUTY
        foreOff = (0.5 - u) * STEP
        liftAmt = 0
      } else {
        const w = (ph - DUTY) / (1 - DUTY)
        foreOff = (w - 0.5) * STEP
        liftAmt = Math.sin(w * Math.PI) * LIFT
      }

      const fxw = ntx + fx * foreOff - (ntx - hx) / lg.reach * liftAmt
      const fyw = nty + fy * foreOff - (nty - hy) / lg.reach * liftAmt

      let dx = fxw - hx, dy = fyw - hy
      let d = Math.hypot(dx, dy)
      const dmax = FEMUR + TIBIA - 0.2
      const dmin = Math.abs(FEMUR - TIBIA) + 0.2
      if (d > dmax) d = dmax
      if (d < dmin) d = dmin
      const ux = dx / (Math.hypot(dx, dy) || 1)
      const uy = dy / (Math.hypot(dx, dy) || 1)
      const px = ux * d, py = uy * d
      const xk = (d * d + FEMUR * FEMUR - TIBIA * TIBIA) / (2 * d)
      const yk = Math.sqrt(Math.max(0, FEMUR * FEMUR - xk * xk)) * lg.side
      const vx = -uy, vy = ux
      const kx = hx + ux * xk + vx * yk
      const ky = hy + uy * xk + vy * yk
      const fxc = hx + px, fyc = hy + py

      legEls[i].setAttribute("d", `M${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)} L${fxc.toFixed(1)} ${fyc.toFixed(1)}`)
    }

    spEl.style.top = yPos + "%"
  }

  const endOffset = workSection.scrollHeight
  timeline.style.height = endOffset + "px"
  timeline.style.bottom = "auto"

  const spiderEndEl = workSection.querySelector(".row--2021")
  const spiderEndOffset = spiderEndEl ? spiderEndEl.offsetTop + spiderEndEl.offsetHeight : endOffset

  ScrollTrigger.create({
    trigger: workSection,
    start: "top 85%",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress
      const scrollPos = p * endOffset
      progress.style.height = Math.min(scrollPos / spiderEndOffset, 1) * 100 + "%"
      if (scrollPos < spiderEndOffset) {
        updateSpider(scrollPos / spiderEndOffset)
        spEl.style.display = "block"
      } else {
        spEl.style.display = "none"
      }
    },
  })
}

initWorkTimeline()

if (document.querySelector(".work-items")) {
  document.querySelectorAll(".work-items .row").forEach((row) => {
    const content = row.querySelector(".row-content")

    const tl = gsap.timeline({ paused: true })
    if (content) {
      const split = new SplitText(content, { type: "words", wordsClass: "highlight-word" })
      tl.to(split.words, {
        "--highlight-offset": "100%",
        duration: 0.4,
        stagger: 0.02,
        ease: "power3.out",
      }, "-=0.3")
    }

    const contentTitle = row.querySelector(".row-content-title")
    if (contentTitle) {
      const titleSplit = new SplitText(contentTitle, { type: "words", wordsClass: "highlight-word" })
      tl.to(titleSplit.words, {
        "--highlight-offset": "100%",
        duration: 0.4,
        stagger: 0.02,
        ease: "power3.out",
      }, "-=0.3")
    }

    ScrollTrigger.create({
      trigger: row,
      start: "top 80%",
      once: true,
      onEnter: () => tl.play(),
    })
  })

  ScrollTrigger.refresh()
}
