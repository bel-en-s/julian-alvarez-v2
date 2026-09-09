import"./modulepreload-polyfill-B5Qt9EMX.js";import{g as s,S as N}from"./menu-DW9AgvVT.js";/* empty css             *//* empty css                              */import{S as P}from"./SplitText-C-wHGKK9.js";import"./cursor-web-BldBBD09.js";import{O as pe,W as he,a as L,F as W,R as U,L as F,S as I,V as ge,b as V,c as C,P as ye,M as H}from"./three.module-FvbYFgPc.js";s.registerPlugin(N,P);document.addEventListener("DOMContentLoaded",()=>{document.body.style.backgroundColor="#1E2024";try{J()}catch(e){console.warn("initFdcAtmos error:",e)}try{K()}catch(e){console.warn("initFdcShader error:",e)}const S=document.querySelector(".fdc");if(!S)return;G(),O(),X(),Y();function G(){const e=document.querySelector(".fdc-hero-inner h1");if(e){const t=new P(e,{type:"chars",charsClass:"hero-char"});s.fromTo(t.chars,{y:-400,opacity:0,visibility:"visible"},{y:0,opacity:1,duration:.7,stagger:.035,ease:"power4.out",delay:.3,onComplete:()=>s.set(t.chars,{clearProps:"transform"})})}const o=S.querySelectorAll(".fdc-hero-inner > [data-copy-wrapper]");o.length&&(s.set(o,{y:40,opacity:0}),s.to(o,{y:0,opacity:1,duration:1,stagger:.15,ease:"power4.out",delay:.3}))}function O(){document.querySelectorAll("[data-marquee]").forEach(t=>{const r=parseFloat(t.dataset.marquee),n=t.cloneNode(!0);t.parentElement.appendChild(n),s.to([t,n],{xPercent:r===1?-50:50,duration:30,repeat:-1,ease:"none"})}),s.utils.toArray(".band").forEach((t,r)=>{s.to(t,{x:r%2===0?80:-80,ease:"none",scrollTrigger:{trigger:".press-section",start:"top bottom",end:"bottom top",scrub:!0}})})}function X(){const e=document.querySelector(".partidos"),o=S.querySelectorAll("[data-copy-wrapper]"),t=e?e.querySelectorAll("[data-copy-wrapper]"):[];[...o,...t].forEach(n=>{const i=window.innerWidth<768;s.context(()=>{const a=Array.from(n.children),l=[];if(a.forEach(p=>{try{const h=P.create(p,{type:"lines",linesClass:"line",lineThreshold:.1});l.push(...h.lines)}catch{}}),!l.length)return;s.set(l,{y:"100%"});const v=s.to(l,{y:"0%",duration:i?.5:1,stagger:i?.05:.1,ease:"power4.out",overwrite:"auto",paused:!0});N.create({trigger:n,start:"top 80%",animation:v,once:!0,refreshPriority:-1})},n)})}function Y(){const e=document.querySelectorAll("[data-parallax]");!e.length||window.innerWidth<640||e.forEach(o=>{const t=parseFloat(o.dataset.parallax)||40;o.querySelector("img")&&s.fromTo(o,{y:-t},{y:t,ease:"none",scrollTrigger:{trigger:o,start:"top bottom",end:"bottom top",scrub:1}})})}const D=`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,_=`
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform int iFrame;
    uniform sampler2D iPreviousFrame;
    uniform float uBrushSize;
    uniform float uBrushStrength;
    uniform float uFluidDecay;
    uniform float uTrailLength;
    uniform float uStopDecay;
    varying vec2 vUv;

    vec2 ur, U;

    float ln(vec2 p, vec2 a, vec2 b) {
        return length(p-a-(b-a)*clamp(dot(p-a,b-a)/dot(b-a,b-a),0.,1.));
    }

    vec4 t(vec2 v, int a, int b) {
        return texture2D(iPreviousFrame, fract((v+vec2(float(a),float(b)))/ur));
    }

    vec4 t(vec2 v) {
        return texture2D(iPreviousFrame, fract(v/ur));
    }

    float area(vec2 a, vec2 b, vec2 c) {
        float A = length(b-c), B = length(c-a), C = length(a-b), s = 0.5*(A+B+C);
        return sqrt(s*(s-A)*(s-B)*(s-C));
    }

    void main() {
        U = vUv * iResolution;
        ur = iResolution.xy;

        if (iFrame < 1) {
            float w = 0.5+sin(0.2*U.x)*0.5;
            float q = length(U-0.5*ur);
            gl_FragColor = vec4(0.1*exp(-0.001*q*q),0,0,w);
        } else {
            vec2 v = U,
                 A = v + vec2( 1, 1),
                 B = v + vec2( 1,-1),
                 C = v + vec2(-1, 1),
                 D = v + vec2(-1,-1);

            for (int i = 0; i < 8; i++) {
                v -= t(v).xy;
                A -= t(A).xy;
                B -= t(B).xy;
                C -= t(C).xy;
                D -= t(D).xy;
            }

            vec4 me = t(v);
            vec4 n = t(v, 0, 1),
                e = t(v, 1, 0),
                s = t(v, 0, -1),
                w = t(v, -1, 0);
            vec4 ne = .25*(n+e+s+w);
            me = mix(t(v), ne, vec4(0.15,0.15,0.95,0.));
            me.z = me.z - 0.01*((area(A,B,C)+area(B,C,D))-4.);

            vec4 pr = vec4(e.z,w.z,n.z,s.z);
            me.xy = me.xy + 100.*vec2(pr.x-pr.y, pr.z-pr.w)/ur;

            me.xy *= uFluidDecay;
            me.z *= uTrailLength;

            if (iMouse.z > 0.0) {
                vec2 mousePos = iMouse.xy;
                vec2 mousePrev = iMouse.zw;
                vec2 mouseVel = mousePos - mousePrev;
                float velMagnitude = length(mouseVel);
                float q = ln(U, mousePos, mousePrev);
                vec2 m = mousePos - mousePrev;
                float l = length(m);
                if (l > 0.0) m = min(l, 10.0) * m / l;

                float brushSizeFactor = 1e-4 / uBrushSize;
                float strengthFactor = 0.03 * uBrushStrength;

                float falloff = exp(-brushSizeFactor*q*q*q);
                falloff = pow(falloff, 0.5);

                me.xyw += strengthFactor * falloff * vec3(m, 10.);

                if (velMagnitude < 2.0) {
                    float distToCursor = length(U - mousePos);
                    float influence = exp(-distToCursor * 0.01);
                    float cursorDecay = mix(1.0, uStopDecay, influence);
                    me.xy *= cursorDecay;
                    me.z *= cursorDecay;
                }
            }

            gl_FragColor = clamp(me, -0.4, 0.4);
        }
    }
  `,j=`
    uniform float iTime;
    uniform vec2 iResolution;
    uniform sampler2D iFluid;
    uniform float uDistortionAmount;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform float uColorIntensity;
    uniform float uSoftness;
    varying vec2 vUv;

    void main() {
      vec2 fragCoord = vUv * iResolution;

      vec4 fluid = texture2D(iFluid, vUv);
      vec2 fluidVel = fluid.xy;

      float mr = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

      uv += fluidVel * (0.5 * uDistortionAmount);

      float d = -iTime * 0.5;
      float a = 0.0;
      for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
      }
      d += iTime * 0.5;

      float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
      float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
      float mixer3 = sin(d + a) * 0.5 + 0.5;

      float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
      mixer1 = mix(mixer1, 0.5, smoothAmount);
      mixer2 = mix(mixer2, 0.5, smoothAmount);
      mixer3 = mix(mixer3, 0.5, smoothAmount);

      vec3 col = mix(uColor1, uColor2, mixer1);
      col = mix(col, uColor3, mixer2);
      col = mix(col, uColor4, mixer3 * 0.4);

      col *= uColorIntensity;

      gl_FragColor = vec4(col, 0.55);
    }
  `;function y(e){const o=parseInt(e.slice(1,3),16)/255,t=parseInt(e.slice(3,5),16)/255,r=parseInt(e.slice(5,7),16)/255;return[o,t,r]}function k(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".partidos"),o=document.querySelector("#galeria-atmos .ha-parallax");if(!e||!o)return;let t=0,r=0,n=0,i=0,a=null;const l=12,v=m=>{const f=e.getBoundingClientRect(),g=(m.clientX-f.left)/f.width,c=(m.clientY-f.top)/f.height;t=(g-.5)*2,r=(c-.5)*2},p=()=>{n+=(t-n)*.06,i+=(r-i)*.06,o.style.transform="translate3d("+(n*l).toFixed(1)+"px,"+(i*l).toFixed(1)+"px,0)",a=requestAnimationFrame(p)};window.addEventListener("mousemove",v,{passive:!0});var h=new IntersectionObserver(function(m){m[0].isIntersecting?a||(a=requestAnimationFrame(p)):a&&(cancelAnimationFrame(a),a=null)},{threshold:0});h.observe(e)}function J(){const e=document.querySelector(".partidos");if(!e||document.getElementById("galeria-atmos"))return;const o=document.createElement("div");o.id="galeria-atmos";const t=document.createElement("div");t.className="ha-parallax",["f1","f2","f3"].forEach(i=>{const a=document.createElement("span");a.className="ha-fog "+i,t.appendChild(a)});const r=document.createElement("div");r.className="ha-halo",t.appendChild(r),o.appendChild(t);const n=document.createElement("span");n.className="ha-vignette",o.appendChild(n),e.prepend(o),k()}function K(){const e=document.querySelector(".partidos");if(!e||window.innerWidth<768||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const o=document.createElement("div");o.className="dot-matrix-wrapper",o.style.zIndex="-1",e.prepend(o);const t=new pe(-1,1,1,-1,0,1),r=new he({antialias:!0,alpha:!0}),n=e.clientWidth||window.innerWidth,i=e.clientHeight||window.innerHeight;r.setSize(n,i),r.setPixelRatio(Math.min(devicePixelRatio,2)),o.appendChild(r.domElement);const a=.5,l=Math.floor(n*a),v=Math.floor(i*a),p=new L(l,v,{minFilter:F,magFilter:F,format:U,type:W}),h=new L(l,v,{minFilter:F,magFilter:F,format:U,type:W});let m=p,f=h,g=0;const c=new I({uniforms:{iTime:{value:0},iResolution:{value:new V(l,v)},iMouse:{value:new ge(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:D,fragmentShader:_}),[Q,Z,$]=y("#51398D"),[ee,te,oe]=y("#7c5cbf"),[re,ne,ae]=y("#3d2a6b"),[ie,se,le]=y("#9b7fd4"),x=new I({uniforms:{iTime:{value:0},iResolution:{value:new V(n,i)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new C(Q,Z,$)},uColor2:{value:new C(ee,te,oe)},uColor3:{value:new C(re,ne,ae)},uColor4:{value:new C(ie,se,le)},uColorIntensity:{value:.8},uSoftness:{value:2}},vertexShader:D,fragmentShader:j}),R=new ye(2,2),ue=new H(R,c),ce=new H(R,x);let b=0,M=0,z=0,E=0,B=0;const me=u=>{const d=e.getBoundingClientRect();z=b,E=M,b=u.clientX-d.left,M=d.height-(u.clientY-d.top),B=performance.now(),c.uniforms.iMouse.value.set(b,M,z,E)},de=()=>{c.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",me),document.addEventListener("mouseleave",de);const fe=()=>{const u=e.clientWidth||window.innerWidth,d=e.clientHeight||window.innerHeight,A=Math.floor(u*a),q=Math.floor(d*a);r.setSize(u,d),c.uniforms.iResolution.value.set(A,q),x.uniforms.iResolution.value.set(u,d),p.setSize(A,q),h.setSize(A,q),g=0};window.addEventListener("resize",fe);const T=()=>{if(!w)return;requestAnimationFrame(T);const u=performance.now()*.001;c.uniforms.iTime.value=u,x.uniforms.iTime.value=u,c.uniforms.iFrame.value=g,performance.now()-B>100&&c.uniforms.iMouse.value.set(0,0,0,0),c.uniforms.iPreviousFrame.value=f.texture,r.setRenderTarget(m),r.render(ue,t),x.uniforms.iFluid.value=m.texture,r.setRenderTarget(null),r.render(ce,t);const d=m;m=f,f=d,g++};var w=!0,ve=new IntersectionObserver(function(u){u[0].isIntersecting?w||(w=!0,requestAnimationFrame(T)):w=!1},{threshold:0});ve.observe(e),T()}});
