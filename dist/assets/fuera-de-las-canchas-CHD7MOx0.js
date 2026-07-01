import{g as y,S as K}from"./menu-BX5mmxiu.js";/* empty css             *//* empty css                              *//* empty css                     */import{S as Q}from"./SplitText-Cpc1cBKW.js";import{O as he,W as ge,a as N,F as O,R as _,L as A,S as k,V as ye,b as j,c as T,P as xe,M as J}from"./three.module-FvbYFgPc.js";y.registerPlugin(K,Q);document.addEventListener("DOMContentLoaded",()=>{document.body.style.backgroundColor="#1E2024",ae(),se();const P=document.querySelector(".fdc");if(!P)return;Z(),$(),ee(),te(),oe();function Z(){const t=P.querySelectorAll(".fdc-hero-inner > [data-copy-wrapper]");if(!t.length)return;y.set(t,{y:60,opacity:0}),y.timeline({delay:.3}).to(t,{y:0,opacity:1,duration:1.2,stagger:.15,ease:"power4.out",overwrite:"auto"})}function $(){document.querySelectorAll("[data-marquee]").forEach(e=>{const r=parseFloat(e.dataset.marquee),n=e.cloneNode(!0);e.parentElement.appendChild(n),y.to([e,n],{xPercent:r===1?-50:50,duration:30,repeat:-1,ease:"none"})}),y.utils.toArray(".band").forEach((e,r)=>{y.to(e,{x:r%2===0?80:-80,ease:"none",scrollTrigger:{trigger:".press-section",start:"top bottom",end:"bottom top",scrub:!0}})})}function ee(){const t=document.querySelector(".partidos"),o=P.querySelectorAll("[data-copy-wrapper]"),e=t?t.querySelectorAll("[data-copy-wrapper]"):[];[...o,...e].forEach(n=>{const a=window.innerWidth<1e3;y.context(()=>{const m=Array.from(n.children),s=[];if(m.forEach(d=>{try{const l=Q.create(d,{type:"lines",linesClass:"line",lineThreshold:.1});s.push(...l.lines)}catch{}}),!s.length)return;y.set(s,{y:"100%"});const g=y.to(s,{y:"0%",duration:a?.5:1,stagger:a?.05:.1,ease:"power4.out",overwrite:"auto",paused:!0});K.create({trigger:n,start:"top 80%",animation:g,once:!0,refreshPriority:-1})},n)})}function te(){const t=document.querySelectorAll("[data-parallax]");!t.length||window.innerWidth<640||t.forEach(o=>{const e=parseFloat(o.dataset.parallax)||40;y.fromTo(o,{y:e*1.5},{y:-e*1.5,ease:"none",scrollTrigger:{trigger:o,start:"top bottom",end:"bottom top",scrub:1}})})}function oe(){const t=document.querySelector(".partidos");if(!t||document.getElementById("galeria-cursor"))return;const o=document.createElement("canvas");o.id="galeria-cursor",o.setAttribute("aria-hidden","true"),Object.assign(o.style,{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"-1",display:"block"}),document.body.prepend(o);const e=o.getContext("2d"),r=window.devicePixelRatio||1;let n=0,a=0,m=[],s=null;const g=1900,d=1400;let l=[];const w=()=>{n=window.innerWidth,a=window.innerHeight,o.width=Math.floor(n*r),o.height=Math.floor(a*r),o.style.width=n+"px",o.style.height=a+"px",e.setTransform(r,0,0,r,0,0),s=null,l=[];const i=n*.3,v=a*.35;m=[];for(let c=0;c<8;c++){const u=c/8*Math.PI*2-Math.PI/2;m.push({x:n/2+Math.cos(u)*i,y:a/2+Math.sin(u)*v})}};w(),window.addEventListener("resize",w);const b=i=>{if(!e)return;e.clearRect(0,0,n,a);const v=i-g;let c=0;for(let u=0;u<l.length;u++){const p=l[u];if(p.t<v)continue;l[c++]=p;const z=(1-(i-p.t)/g)*p.opacity;e.strokeStyle="rgba(216, 200, 245, "+z+")",e.lineWidth=1.2,e.lineCap="round",e.beginPath(),e.moveTo(p.x1,p.y1),e.lineTo(p.x2,p.y2),e.stroke()}l.length=c,f&&requestAnimationFrame(b)},F=(i,v,c,u,p)=>{l.push({x1:i,y1:v,x2:c,y2:u,t:performance.now(),opacity:p}),l.length>d&&l.splice(0,l.length-d)};var f=!1;function E(){f||(f=!0,requestAnimationFrame(b))}E();const q=i=>{const v=m.slice().sort((c,u)=>(c.x-i.clientX)*(c.x-i.clientX)+(c.y-i.clientY)*(c.y-i.clientY)-((u.x-i.clientX)*(u.x-i.clientX)+(u.y-i.clientY)*(u.y-i.clientY)));F(v[0].x,v[0].y,i.clientX,i.clientY,.55),F(v[1].x,v[1].y,i.clientX,i.clientY,.32),s&&F(s.x,s.y,i.clientX,i.clientY,.7),s={x:i.clientX,y:i.clientY}},R=()=>{s=null,l=[]};t.addEventListener("pointermove",q),t.addEventListener("pointerleave",R)}const U=`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,re=`
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
  `,ne=`
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
  `;function C(t){const o=parseInt(t.slice(1,3),16)/255,e=parseInt(t.slice(3,5),16)/255,r=parseInt(t.slice(5,7),16)/255;return[o,e,r]}function ie(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=0,o=0,e=0,r=0,n=null;var a=document.querySelector(".partidos");const m=d=>{t=(d.clientX/window.innerWidth-.5)*2,o=(d.clientY/window.innerHeight-.5)*2},s=()=>{e+=(t-e)*.06,r+=(o-r)*.06,document.documentElement.style.setProperty("--mx",e.toFixed(4)),document.documentElement.style.setProperty("--my",r.toFixed(4)),n=requestAnimationFrame(s)};if(window.addEventListener("mousemove",m,{passive:!0}),a){var g=new IntersectionObserver(function(d){d[0].isIntersecting?n||(n=requestAnimationFrame(s)):n&&(cancelAnimationFrame(n),n=null)},{threshold:0});g.observe(a)}else n=requestAnimationFrame(s)}function ae(){const t=document.querySelector(".partidos");if(!t||document.getElementById("galeria-atmos"))return;const o=document.createElement("div");o.id="galeria-atmos",["f1","f2","f3"].forEach(n=>{const a=document.createElement("span");a.className="ha-fog "+n,o.appendChild(a)});const e=document.createElement("span");e.className="ha-vignette",o.appendChild(e);const r=document.createElement("div");r.className="ha-halo",o.appendChild(r),t.prepend(o),ie()}function se(){const t=document.querySelector(".partidos");if(!t||window.innerWidth<1e3||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const o=document.createElement("div");o.className="dot-matrix-wrapper",o.style.zIndex="-1",t.prepend(o);const e=new he(-1,1,1,-1,0,1),r=new ge({antialias:!0,alpha:!0}),n=t.clientWidth||window.innerWidth,a=t.clientHeight||window.innerHeight;r.setSize(n,a),r.setPixelRatio(Math.min(devicePixelRatio,2)),o.appendChild(r.domElement);const m=.5,s=Math.floor(n*m),g=Math.floor(a*m),d=new N(s,g,{minFilter:A,magFilter:A,format:_,type:O}),l=new N(s,g,{minFilter:A,magFilter:A,format:_,type:O});let w=d,b=l,F=0;const f=new k({uniforms:{iTime:{value:0},iResolution:{value:new j(s,g)},iMouse:{value:new ye(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:U,fragmentShader:re}),[E,q,R]=C("#51398D"),[i,v,c]=C("#7c5cbf"),[u,p,X]=C("#3d2a6b"),[z,le,ce]=C("#9b7fd4"),S=new k({uniforms:{iTime:{value:0},iResolution:{value:new j(n,a)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new T(E,q,R)},uColor2:{value:new T(i,v,c)},uColor3:{value:new T(u,p,X)},uColor4:{value:new T(z,le,ce)},uColorIntensity:{value:.8},uSoftness:{value:2}},vertexShader:U,fragmentShader:ne}),Y=new xe(2,2),ue=new J(Y,f),me=new J(Y,S);let D=0,L=0,V=0,H=0,G=0;const de=h=>{const x=t.getBoundingClientRect();V=D,H=L,D=h.clientX-x.left,L=x.height-(h.clientY-x.top),G=performance.now(),f.uniforms.iMouse.value.set(D,L,V,H)},fe=()=>{f.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",de),document.addEventListener("mouseleave",fe);const ve=()=>{const h=t.clientWidth||window.innerWidth,x=t.clientHeight||window.innerHeight,W=Math.floor(h*m),B=Math.floor(x*m);r.setSize(h,x),f.uniforms.iResolution.value.set(W,B),S.uniforms.iResolution.value.set(h,x),d.setSize(W,B),l.setSize(W,B),F=0};window.addEventListener("resize",ve);const I=()=>{if(!M)return;requestAnimationFrame(I);const h=performance.now()*.001;f.uniforms.iTime.value=h,S.uniforms.iTime.value=h,f.uniforms.iFrame.value=F,performance.now()-G>100&&f.uniforms.iMouse.value.set(0,0,0,0),f.uniforms.iPreviousFrame.value=b.texture,r.setRenderTarget(w),r.render(ue,e),S.uniforms.iFluid.value=w.texture,r.setRenderTarget(null),r.render(me,e);const x=w;w=b,b=x,F++};var M=!0,pe=new IntersectionObserver(function(h){h[0].isIntersecting?M||(M=!0,requestAnimationFrame(I)):M=!1},{threshold:0});pe.observe(t),I()}});
