"use client";
import "./CTA.css";
import Link from "next/link";

import Copy from "../Copy/Copy";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const CTA = ({ blocks = [1, 2] }) => {
  return (
    <section className="cta">
      {blocks.includes(1) && (
        <>
          <div className="container cta-block--default">
            <div className="cta-col">
              <div className="cta-side-img">
                {/* <img src="/bio/3.jpeg" alt="" /> */}
              </div>
              <div className="cta-col-copy">
                <Copy>
                  {/* <p className="bodyCopy sm">
                    Built to exist outside context, these forms prioritize
                    neutrality, and distortion.
                  </p> */}
                </Copy>
              </div>
            </div>
            <div className="cta-col">
              <h2 className="cta-title">Club Atlético Calchín (2016) </h2>
              <div className="cta-main-img">
                <img src={bp + "/bio/2.jpeg"} alt="" />
                
              </div>
              <div className="cta-header">
                <Copy>
                  <h5>“Mi pueblo, mis amigos, el potrero. Acá nació todo: la pasión por el fútbol y las ganas de ir siempre un paso más allá. Acá aprendí a soñar en grande.”  </h5>
                </Copy>
              </div>
            </div>
            <div className="cta-col">
              <div className="cta-side-img">
                <img src={bp + "/bio/1.jpeg"} alt="" />
              </div>
            </div>
          </div>
          <div className="container">
            
            <div className="cta-main-copy">
              {/* <div className="btn">
                <Copy type="flicker">
                  <Link href="/wardrobe">VEr mas</Link>
                </Copy>
              </div> */}
            </div>
          </div>
        </>
      )}

      {blocks.includes(2) && (
        <>
          <div className="container cta-block--split">
            <h2 className="cta-title">El Doble Salto (2018)</h2>
            <div className="cta-images-row">
              <div className="cta-side">
                <div className="cta-img cta-img-left">
                  <img src={bp + "/bio/Anexo-4.jpg"} alt="" />
                </div>
                <div className="cta-side-text">
                  <Copy>
                    <h5>“Llegar a River fue cumplir el sueño que tenía desde chico… y viví noches que quedan para siempre, como aquella final histórica en Madrid.”</h5>
                  </Copy>
                </div>
              </div>
              <div className="cta-side">
                <div className="cta-img cta-img-right">
                  <img src={bp + "/bio/Anexo-3.jpeg"} alt="" />
                </div>
                <div className="cta-side-text">
                  <Copy>
                    <h5>“El primer llamado para vestir la camiseta de Argentina fue un momento único… un orgullo enorme y una responsabilidad que te marca para siempre.”</h5>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            
            <div className="cta-main-copy">
              {/* <div className="btn">
                <Copy type="flicker">
                  <Link href="/wardrobe">VEr mas</Link>
                </Copy>
              </div> */}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CTA;
