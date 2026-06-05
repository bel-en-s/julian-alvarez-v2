"use client";
import "./MiHistoria.css";

export default function MiHistoria() {
  return (
    <section className="mi-historia">
      <div className="mh-desktop">
        <div className="mh-header">
          <h1>Mi historia</h1>
        </div>
        <div className="mh-card" data-card={0}>
          <div className="mh-card-img">
            <img src="/curtain/balon.png" alt="" />
          </div>
        </div>
      </div>

      <div className="mh-mobile">
        <div className="mh-mobile-video">
          <video src="/home/julian-chiquito.mp4" autoPlay loop muted playsInline />
        </div>
        <div className="mh-mobile-header">
          <h1>Mi historia</h1>
        </div>
        <div className="mh-card">
          <div className="mh-card-img">
            <img src="/curtain/balon.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
