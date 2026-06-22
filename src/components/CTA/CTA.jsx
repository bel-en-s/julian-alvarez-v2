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
            <Copy><h2 className="cta-title">Club Atlético Calchín (2016)</h2></Copy>
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
            <Copy><h2 className="cta-title">El Doble Salto (2018)</h2></Copy>
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

      {blocks.includes(3) && (
        <>
          <div className="container cta-block--triple">
            <Copy><h2 className="cta-title">Un año inolvidable (2021)</h2></Copy>
            <div className="cta-triple-row">
              <div className="cta-triple-card">
                <img src="/bio/Anexo 5.jpeg" alt="" />
                <div className="cta-triple-text">
                  <Copy>



                    <h5>Máximo goleador de la Primera División. </h5>
                  </Copy>
                </div>
              </div>
              <div className="cta-triple-card">
                <img src="/bio/Anexo 6.webp" alt="" />
                <div className="cta-triple-text">
                  <Copy>
                    <h5>Mejor Jugador de América.</h5>
                  </Copy>
                </div>
              </div>
              <div className="cta-triple-card">
                 <img src="/bio/Anexo 7.jpg" alt="" />
                <div className="cta-triple-text">
                  <Copy>
                    <h5>La noche de los seis goles. </h5>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {blocks.includes(4) && (
        <>
          <div className="container cta-block--europa">
            <Copy><h2 className="cta-title">Europa & El Mundo (2022)</h2></Copy>
            <div className="cta-europa-row">
              <div className="cta-europa-item">
                <div className="cta-europa-img">
                  <img src="/bio/Anexo 8.webp" alt="" />
                </div>
                <div className="cta-europa-text">
                  <Copy>
                    <h5>“Desde las juveniles hasta levantar la Copa del Mundo… Es dejarlo todo por una camiseta que representa a millones.”</h5>
                  </Copy>
                </div>
              </div>
              <div className="cta-europa-item">
                <div className="cta-europa-img">
                  <img src="/bio/Anexo 9.jpg" alt="" />
                </div>
                <div className="cta-europa-text">
                  <Copy>
                    <h5>“Crecer al lado de los mejores del mundo fue un privilegio. Cada entrenamiento y cada partido fueron una enseñanza para mejorar, adaptarme y entender el fútbol de otra manera.”</h5>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {blocks.includes(5) && (
        <>
          <div className="container cta-block--presente">
            <Copy><h2 className="cta-title">Presente (2024)</h2></Copy>
            <div className="cta-presente-row">
              <div className="cta-presente-card">
                <img src="/bio/Anexo 10.jpg" alt="" />
                <div className="cta-presente-text">
                  <Copy>
                    <h5>“Llegar al Atlético es aceptar un desafío enorme. Acá se juega con carácter, compromiso y corazón… Estoy listo para dejarlo todo.”</h5>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}

    </section>
  );
};

export default CTA;
