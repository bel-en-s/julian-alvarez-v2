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


    </section>
  );
};

export default CTA;
