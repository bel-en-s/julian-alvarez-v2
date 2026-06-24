"use client";
import "./touchpoint.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Copy from "@/components/Copy/Copy";
import ContactForm from "@/components/ContactForm/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    label: "Management",
    line1: "Representación & Contratos",
    line2: "management@julianalvarez.com",
  },
  {
    label: "Prensa",
    line1: "Media & Comunicación",
    line2: "press@julianalvarez.com",
  },
  {
    label: "Partnerships",
    line1: "Sponsorships & Colaboraciones",
    line2: "partners@julianalvarez.com",
  },
];

const SOCIALS = [
  { name: "Instagram", handle: "@julianalvarez", url: "https://www.instagram.com/julianalvarez/" },
  { name: "YouTube", handle: "Julián Álvarez", url: "https://www.youtube.com/@julianalvarez" },
];

export default function Touchpoint() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(".tp-head", { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" });
      },
    });
  }, []);

  return (
    <div className="touchpoint-page" ref={sectionRef}>
      

   
      <section className="tp-section tp-section--alt">
        <div className="tp-section-inner">
          <header className="tp-head">
            <p className="eyebrow">Redes sociales</p>
            <h2>Seguime</h2>
          </header>

          <div className="tp-social-list">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="tp-social-link">
                <span className="tp-social-name">{s.name}</span>
                <span className="tp-social-handle">{s.handle}</span>
                <MdOutlineArrowOutward className="tp-social-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
