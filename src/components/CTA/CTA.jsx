"use client";
import "./CTA.css";
import Link from "next/link";

import Copy from "../Copy/Copy";

const CTA = ({ blocks = [1, 2] }) => {
  return (
    <section className="cta">
      {blocks.includes(1) && (
        <>
          <div className="container cta-block--default">
            <h2 className="cta-title">Club Atlético Calchín (2016)</h2>
            <div className="cta-gallery">
              <div className="cta-gallery-img cta-gallery-img--left">
                <img src="/bio/2.jpeg" alt="" />
              </div>
              <div className="cta-gallery-img cta-gallery-img--right">
                <img src="/bio/1.jpeg" alt="" />
              </div>
            </div>
            <div className="cta-header">
              <Copy>
                <h5>“Mi pueblo, mis amigos, el potrero. Acá nació todo: la pasión por el fútbol y las ganas de ir siempre un paso más allá. Acá aprendí a soñar en grande.”</h5>
              </Copy>
            </div>
          </div>
        </>
      )}
      {blocks.includes(2) && (
        <>
          <div className="container cta-block--doble">
            <h2 className="cta-title">El Doble Salto (2018)</h2>
            <div className="cta-doble-row">
              <div className="cta-doble-item">
                <div className="cta-doble-img">
                  <img src="/bio/3.jpeg" alt="" />
                </div>
                <div className="cta-doble-text">
                  <Copy>
                    <h5>“Llegar a River fue cumplir el sueño que tenía desde chico… y viví noches que quedan para siempre, como aquella final histórica en Madrid.”</h5>
                  </Copy>
                </div>
              </div>
              <div className="cta-doble-item">
                <div className="cta-doble-img">
                  <img src="/bio/4.jpg" className="img-focus-4" alt="" />
                </div>
                <div className="cta-doble-text">
                  <Copy>
                    <h5>“El primer llamado para vestir la camiseta de Argentina fue un momento único… un orgullo enorme y una responsabilidad que te marca para siempre.”</h5>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </section>
  );
};

export default CTA;
