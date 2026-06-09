"use client";
import { useEffect, useRef } from "react";
import "./Curtain.css";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Curtain() {
  return (
    <section className="curtain">
      <div className="curtain-img">
        <img src={bp + "/curtain/cuerpo.png"} alt="" />
      </div>
      <div className="curtain-copy">
        <div className="curtain-header"><h1>Sigan</h1></div>
        <div className="curtain-header"><h1>Soñando</h1></div>
      </div>
    </section>
  );
}
