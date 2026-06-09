(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74647,e=>{"use strict";e.i(47167);var t=e.i(43476),r=e.i(71645),a=e.i(55667),s=e.i(89970),i=e.i(75324),l=e.i(65747);s.default.registerPlugin(i.SplitText);let n=!0,o=()=>{let[e,o]=(0,r.useState)(n),[c,d]=(0,r.useState)(n),u=(0,r.useRef)(null),m=(0,a.useLenis)();return((0,r.useEffect)(()=>()=>{n=!1},[]),(0,r.useEffect)(()=>{c?(m&&m.stop(),document.body.style.overflow="hidden"):(m&&m.start(),document.body.style.overflow="")},[m,c]),(0,l.useGSAP)(()=>{e&&document.fonts.ready.then(()=>{let e=i.SplitText.create(".preloader-logo h1",{type:"chars",charsClass:"char",mask:"chars"});s.default.set(e.chars,{x:"110%"}),s.default.set(".preloader-logo h1",{opacity:1});let t=window.innerWidth<1e3;s.default.timeline({delay:.5,onComplete:()=>{d(!1),setTimeout(()=>{o(!1)},100)}}).to(e.chars,{x:"0%",stagger:.05,ease:"power4.out",duration:1}).add(function(e=4.75){let t=s.default.timeline(),r=0;for(let a=0;a<5;a++){let s=4===a?1:Math.min(r+.3*Math.random()+.1,.9);r=s,t.to(".preloader-progress-bar",{scaleX:s,duration:e/5,ease:"power2.out"})}return t}(),"<").set(".preloader-progress-bar",{backgroundColor:"var(--violet)"}).to(e.chars,{x:"-110%",stagger:.05,duration:1,ease:"power4.out"},"-=0.5").to(".preloader-progress",{opacity:0,duration:.3,ease:"power3.out"},"-=0.5").to(".preloader-video",{opacity:0,duration:.3,ease:"power3.out"},"-=0.5").to(".preloader-mask",{scale:t?25:15,duration:1.25,ease:"power3.out"},"-=0.5").to(".preloader-bg",{opacity:0,duration:.3,ease:"power3.out"},"-=0.2").to({},{duration:1})})},{scope:u,dependencies:[e]}),e)?(0,t.jsxs)("div",{className:"preloader-wrapper",ref:u,children:[(0,t.jsx)("div",{className:"preloader-bg"}),(0,t.jsx)("video",{className:"preloader-video",src:"/loader/loader.mp4",autoPlay:!0,muted:!0,loop:!0,playsInline:!0}),(0,t.jsx)("div",{className:"preloader-progress",children:(0,t.jsx)("div",{className:"preloader-progress-bar"})}),(0,t.jsx)("div",{className:"preloader-logo"}),(0,t.jsx)("div",{className:"preloader-mask"})]}):null};var c=e.i(32009);let d=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,u=`
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
`,m=`
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

    gl_FragColor = vec4(col, 0.35);
  }
`;function h(e){return[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255]}let v=({color1:e="#c4b5d9",color2:a="#d4c4e8",color3:s="#e0d6ef",color4:i="#b8a8d0",colorIntensity:l=.35,softness:n=2,distortionAmount:o=1.5,brushSize:v=25,brushStrength:x=.3,fluidDecay:f=.98,trailLength:p=.8,stopDecay:g=.85,downsample:j=.5})=>{let y=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t,r=y.current;if(!r||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let w=new c.OrthographicCamera(-1,1,1,-1,0,1),b=new c.WebGLRenderer({antialias:!0,alpha:!0});b.setSize(window.innerWidth,window.innerHeight),b.setPixelRatio(Math.min(devicePixelRatio,2)),r.appendChild(b.domElement);let N=Math.floor(window.innerWidth*j),M=Math.floor(window.innerHeight*j),C=new c.WebGLRenderTarget(N,M,{minFilter:c.LinearFilter,magFilter:c.LinearFilter,format:c.RGBAFormat,type:c.FloatType}),F=new c.WebGLRenderTarget(N,M,{minFilter:c.LinearFilter,magFilter:c.LinearFilter,format:c.RGBAFormat,type:c.FloatType}),R=C,S=F,A=0,P=new c.ShaderMaterial({uniforms:{iTime:{value:0},iResolution:{value:new c.Vector2(N,M)},iMouse:{value:new c.Vector4(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:v},uBrushStrength:{value:x},uFluidDecay:{value:f},uTrailLength:{value:p},uStopDecay:{value:g}},vertexShader:d,fragmentShader:u}),E=new c.ShaderMaterial({uniforms:{iTime:{value:0},iResolution:{value:new c.Vector2(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:o},uColor1:{value:new c.Vector3(...h(e))},uColor2:{value:new c.Vector3(...h(a))},uColor3:{value:new c.Vector3(...h(s))},uColor4:{value:new c.Vector3(...h(i))},uColorIntensity:{value:l},uSoftness:{value:n}},vertexShader:d,fragmentShader:m}),L=new c.PlaneGeometry(2,2),T=new c.Mesh(L,P),k=new c.Mesh(L,E),q=0,z=0,D=0,B=0,I=0,$=e=>{let t=r.getBoundingClientRect();D=q,B=z,q=e.clientX-t.left,z=t.height-(e.clientY-t.top),I=performance.now(),P.uniforms.iMouse.value.set(q,z,D,B)},U=()=>{P.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",$),document.addEventListener("mouseleave",U);let W=()=>{let e=window.innerWidth,t=window.innerHeight,r=Math.floor(e*j),a=Math.floor(t*j);b.setSize(e,t),P.uniforms.iResolution.value.set(r,a),E.uniforms.iResolution.value.set(e,t),C.setSize(r,a),F.setSize(r,a),A=0};window.addEventListener("resize",W);let X=()=>{t=requestAnimationFrame(X);let e=.001*performance.now();P.uniforms.iTime.value=e,E.uniforms.iTime.value=e,P.uniforms.iFrame.value=A,performance.now()-I>100&&P.uniforms.iMouse.value.set(0,0,0,0),P.uniforms.iPreviousFrame.value=S.texture,b.setRenderTarget(R),b.render(T,w),E.uniforms.iFluid.value=R.texture,b.setRenderTarget(null),b.render(k,w);let r=R;R=S,S=r,A++};return X(),()=>{cancelAnimationFrame(t),document.removeEventListener("mousemove",$),document.removeEventListener("mouseleave",U),window.removeEventListener("resize",W),b.dispose(),L.dispose(),P.dispose(),E.dispose(),C.dispose(),F.dispose(),r.contains(b.domElement)&&r.removeChild(b.domElement)}},[]),(0,t.jsx)("div",{className:"dot-matrix-wrapper",ref:y})};var x=e.i(49307),f=e.i(83495);s.default.registerPlugin(f.ScrollTrigger);let p=()=>{let e=(0,r.useRef)(null),a=(0,r.useRef)(null),i=(0,r.useRef)(null),n=(0,r.useRef)(null),o=(0,r.useRef)(null),c=(0,r.useRef)(null);return(0,l.useGSAP)(()=>{f.ScrollTrigger.create({trigger:e.current,start:"top bottom",end:"150% top",scrub:!0,onUpdate:e=>{let t=e.progress;s.default.set(a.current,{x:`${25-50*t}%`}),s.default.set(i.current,{x:`${-25+50*t}%`})}})},{scope:e}),(0,r.useEffect)(()=>{let e=c.current,t=n.current,r=o.current;if(!e||!t||!r)return;let a={x:0,y:0,lx:0,ly:0},i=!1,l=0,d=null,u=(e,t)=>{if(!i){a.x=a.lx=e,a.y=a.ly=t,i=!0;return}a.x=e,a.y=t},m=(t,r)=>{let a=e.getBoundingClientRect();return{x:t-a.left,y:r-a.top}},h=e=>{let t=m(e.clientX,e.clientY);u(t.x,t.y)};e.addEventListener("mousemove",h),e.addEventListener("touchstart",e=>{e.preventDefault();let t=m(e.touches[0].clientX,e.touches[0].clientY);u(t.x,t.y)},{passive:!1}),e.addEventListener("touchmove",e=>{e.preventDefault();let t=m(e.touches[0].clientX,e.touches[0].clientY);u(t.x,t.y)},{passive:!1});let v=()=>{let t=e.getBoundingClientRect();r.style.width=t.width+"px",r.style.height=t.height+"px",r.setAttribute("viewBox",`0 0 ${t.width} ${t.height}`)};v(),window.addEventListener("resize",v);let x=(e,r,a)=>{for(let i=0;i<10;i++){let i=(Math.random()-.5)*4,l=(Math.random()-.5)*4,n=a*(.4+.6*Math.random()),o=document.createElementNS("http://www.w3.org/2000/svg","ellipse"),c=.5+.5*Math.random(),d=Math.random()*Math.PI*2;o.setAttribute("cx",e+i),o.setAttribute("cy",r+l),o.setAttribute("rx",n),o.setAttribute("ry",n*c),o.setAttribute("fill","#fff"),o.setAttribute("transform",`rotate(${180/Math.PI*d} ${e+i} ${r+l})`),t.prepend(o);let u={current:n},m=s.default.timeline({onUpdate(){let e=Math.max(0,u.current);o.setAttribute("rx",e),o.setAttribute("ry",e*c)},onComplete(){m.kill(),o.remove()}});m.to(u,{current:+n,duration:.2,ease:"power2.out"}),m.to(u,{current:0,duration:1.5,ease:"power2.inOut"},.2)}},f=()=>{if(i){let e=a.x-a.lx,t=a.y-a.ly,r=Math.hypot(e,t);if(a.lx=a.x,a.ly=a.y,r>0){l+=r;for(;l>=8;){let s=1-(l-=8)/r;x(a.x-e*s,a.y-t*s,55+.06*r)}}}d=requestAnimationFrame(f)};return d=requestAnimationFrame(f),()=>{e.removeEventListener("mousemove",h),window.removeEventListener("resize",v),d&&cancelAnimationFrame(d)}},[]),(0,t.jsxs)("section",{className:"marquee-banner",ref:e,children:[(0,t.jsxs)("div",{className:"banner-content",children:[(0,t.jsx)(x.default,{type:"flicker",children:(0,t.jsx)("p",{children:"[ Las dos caras ]"})}),(0,t.jsx)(x.default,{children:(0,t.jsx)("h4",{children:"Dentro y fuera de las canchas"})})]}),(0,t.jsxs)("div",{className:"marquees",children:[(0,t.jsx)("div",{className:"marquee-header marquee-header-1",ref:a,children:(0,t.jsx)("h1",{children:"Cada partido cuenta una historia. Acá están los míos."})}),(0,t.jsx)("div",{className:"marquee-header marquee-header-2",ref:i,children:(0,t.jsx)("h1",{children:" Mi vida lejos del campo"})})]}),(0,t.jsxs)("div",{className:"banner",ref:c,children:[(0,t.jsx)("div",{className:"banner-img banner-img--face"}),(0,t.jsx)("div",{className:"banner-img banner-img--reveal"}),(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",className:"smudge-revealer",ref:o,children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("filter",{id:"smudge-goo",children:[(0,t.jsx)("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"50"}),(0,t.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 4 -0.35"})]})}),(0,t.jsx)("mask",{id:"smudge-mask",children:(0,t.jsx)("g",{className:"smudge-blobs",ref:n,filter:"url(#smudge-goo)"})})]})]})]})};var g=e.i(29748);s.gsap.registerPlugin(f.ScrollTrigger,i.SplitText),e.i(22016);let j=({blocks:e=[1,2]})=>(0,t.jsxs)("section",{className:"cta",children:[e.includes(1)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"container cta-block--default",children:[(0,t.jsxs)("div",{className:"cta-col",children:[(0,t.jsx)("div",{className:"cta-side-img"}),(0,t.jsx)("div",{className:"cta-col-copy",children:(0,t.jsx)(x.default,{})})]}),(0,t.jsxs)("div",{className:"cta-col",children:[(0,t.jsx)("h2",{className:"cta-title",children:"Club Atlético Calchín (2016) "}),(0,t.jsx)("div",{className:"cta-main-img",children:(0,t.jsx)("img",{src:"/bio/2.jpeg",alt:""})}),(0,t.jsx)("div",{className:"cta-header",children:(0,t.jsx)(x.default,{children:(0,t.jsx)("h5",{children:"“Mi pueblo, mis amigos, el potrero. Acá nació todo: la pasión por el fútbol y las ganas de ir siempre un paso más allá. Acá aprendí a soñar en grande.”  "})})})]}),(0,t.jsx)("div",{className:"cta-col",children:(0,t.jsx)("div",{className:"cta-side-img",children:(0,t.jsx)("img",{src:"/bio/1.jpeg",alt:""})})})]}),(0,t.jsx)("div",{className:"container",children:(0,t.jsx)("div",{className:"cta-main-copy"})})]}),e.includes(2)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"container cta-block--split",children:[(0,t.jsx)("h2",{className:"cta-title",children:"El Doble Salto (2018)"}),(0,t.jsxs)("div",{className:"cta-images-row",children:[(0,t.jsxs)("div",{className:"cta-side",children:[(0,t.jsx)("div",{className:"cta-img cta-img-left",children:(0,t.jsx)("img",{src:"/bio/Anexo-4.jpg",alt:""})}),(0,t.jsx)("div",{className:"cta-side-text",children:(0,t.jsx)(x.default,{children:(0,t.jsx)("h5",{children:"“Llegar a River fue cumplir el sueño que tenía desde chico… y viví noches que quedan para siempre, como aquella final histórica en Madrid.”"})})})]}),(0,t.jsxs)("div",{className:"cta-side",children:[(0,t.jsx)("div",{className:"cta-img cta-img-right",children:(0,t.jsx)("img",{src:"/bio/Anexo-3.jpeg",alt:""})}),(0,t.jsx)("div",{className:"cta-side-text",children:(0,t.jsx)(x.default,{children:(0,t.jsx)("h5",{children:"“El primer llamado para vestir la camiseta de Argentina fue un momento único… un orgullo enorme y una responsabilidad que te marca para siempre.”"})})})]})]})]}),(0,t.jsx)("div",{className:"container",children:(0,t.jsx)("div",{className:"cta-main-copy"})})]})]});function y(e){let t=new Date(e).getTime()-Date.now();return t<=0?{days:"00",hours:"00",minutes:"00"}:{days:String(Math.floor(t/864e5)).padStart(2,"0"),hours:String(Math.floor(t%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(t%36e5/6e4)).padStart(2,"0")}}let w=({kickoff:e="2026-06-15T21:00:00+02:00",home:a="Atlético de Madrid",away:s="Real Madrid",competition:i="LaLiga",extra:l="Metropolitano"})=>{let[n,o]=(0,r.useState)(!1),[c,d]=(0,r.useState)(()=>y(e)),u=(0,r.useRef)(null),m=(0,r.useRef)(null);return(0,r.useLayoutEffect)(()=>{window.innerWidth<1e3&&o(!0)},[]),(0,r.useEffect)(()=>{let t=()=>d(y(e));t();let r=setInterval(t,1e4);return()=>clearInterval(r)},[e]),(0,r.useEffect)(()=>{let e=u.current,t=m.current;if(!e||!t)return;let r=e.getContext("2d"),a=0,s=0,i=window.devicePixelRatio||1,l=[],n=null,o=!1,c=()=>{let n=t.getBoundingClientRect();a=n.width,s=n.height,e.width=Math.floor(a*i),e.height=Math.floor(s*i),e.style.width=a+"px",e.style.height=s+"px",r.setTransform(i,0,0,i,0,0);let o=a/2,c=s/2,d=.55*a,u=.6*s;l=[];for(let e=0;e<8;e++){let t=e/8*Math.PI*2-Math.PI/2;l.push({x:o+Math.cos(t)*d,y:c+Math.sin(t)*u})}r.clearRect(0,0,a,s)};c();let d=new ResizeObserver(c);d.observe(t);let h=(e,t,a,s,i)=>{r.strokeStyle="rgba(216, 200, 245, "+i+")",r.lineWidth=.6,r.lineCap="round",r.beginPath(),r.moveTo(e,t),r.lineTo(a,s),r.stroke()},v=e=>{let i=t.getBoundingClientRect(),c=e.clientX-i.left,d=e.clientY-i.top;r.save(),r.globalCompositeOperation="destination-out",r.fillStyle="rgba(0,0,0,0.04)",r.fillRect(0,0,a,s),r.restore();let u=l.slice().sort((e,t)=>(e.x-c)*(e.x-c)+(e.y-d)*(e.y-d)-((t.x-c)*(t.x-c)+(t.y-d)*(t.y-d)));h(u[0].x,u[0].y,c,d,.55),h(u[1].x,u[1].y,c,d,.32),n&&o&&h(n.x,n.y,c,d,.7),n={x:c,y:d}},x=()=>{o=!0,n=null},f=()=>{o=!1;let e=0,t=setInterval(()=>{e++,r.save(),r.globalCompositeOperation="destination-out",r.fillStyle="rgba(0,0,0,0.18)",r.fillRect(0,0,a,s),r.restore(),e>14&&(clearInterval(t),r.clearRect(0,0,a,s))},30)};return t.addEventListener("pointerenter",x),t.addEventListener("pointermove",v),t.addEventListener("pointerleave",f),()=>{d.disconnect(),t.removeEventListener("pointerenter",x),t.removeEventListener("pointermove",v),t.removeEventListener("pointerleave",f)}},[]),(0,t.jsxs)("article",{className:`next-match${n?" is-min":""}`,ref:m,children:[(0,t.jsx)("div",{className:"watermark","aria-hidden":"true"}),(0,t.jsx)("canvas",{className:"web",ref:u,"aria-hidden":"true"}),(0,t.jsxs)("header",{className:"head",children:[(0,t.jsx)("div",{className:"eyebrow",children:"Próximo partido"}),(0,t.jsx)("button",{type:"button",className:"toggle","aria-label":n?"Expandir tarjeta":"Minimizar tarjeta","aria-expanded":!n,onClick:()=>o(e=>!e),children:(0,t.jsx)("span",{className:"bar"})})]}),(0,t.jsxs)("div",{className:"countdown","aria-live":"polite",children:[(0,t.jsxs)("div",{className:"unit",children:[(0,t.jsx)("span",{className:"n n-d",children:c.days}),(0,t.jsx)("span",{className:"u",children:"Días"})]}),(0,t.jsx)("span",{className:"sep",children:":"}),(0,t.jsxs)("div",{className:"unit",children:[(0,t.jsx)("span",{className:"n n-h",children:c.hours}),(0,t.jsx)("span",{className:"u",children:"Horas"})]}),(0,t.jsx)("span",{className:"sep",children:":"}),(0,t.jsxs)("div",{className:"unit",children:[(0,t.jsx)("span",{className:"n n-m",children:c.minutes}),(0,t.jsx)("span",{className:"u",children:"Min"})]})]}),(0,t.jsxs)("div",{className:"nm-extra",children:[(0,t.jsxs)("div",{className:"teams",children:[(0,t.jsx)("span",{className:"t home",children:a}),(0,t.jsx)("span",{className:"vs",children:"vs"}),(0,t.jsx)("span",{className:"t away",children:s})]}),(0,t.jsxs)("div",{className:"meta",children:[(0,t.jsx)("span",{className:"comp",children:i}),(0,t.jsx)("span",{className:"dot",children:"·"}),(0,t.jsx)("span",{className:"extra",children:l})]})]})]})};function b(){let e=[110,200,300,420,540],r=Array.from({length:8},(e,t)=>t/7*90*Math.PI/180),a=r.map(e=>`M 0 0 L ${(588*Math.cos(e)).toFixed(1)} ${(588*Math.sin(e)).toFixed(1)}`),s=e.map(e=>{let t="";return r.forEach((a,s)=>{let i=Math.cos(a)*e,l=Math.sin(a)*e;if(0===s){t+=`M ${i.toFixed(1)} ${l.toFixed(1)}`;return}let n=(a+r[s-1])/2,o=Math.cos(n)*e*.94,c=Math.sin(n)*e*.94;t+=` Q ${o.toFixed(1)} ${c.toFixed(1)} ${i.toFixed(1)} ${l.toFixed(1)}`}),t}),i=[[2,1],[2,4],[2,6],[3,1],[3,4],[3,6]].map(([t,a])=>{let s=e[t],i=r[a];return{cx:Math.cos(i)*s,cy:Math.sin(i)*s}});return(0,t.jsxs)("svg",{viewBox:"0 0 600 600",children:[a.map((e,r)=>(0,t.jsx)("path",{className:"web-ray",d:e},`ray-${r}`)),s.map((e,r)=>(0,t.jsx)("path",{className:"web-arc",d:e},`arc-${r}`)),i.map((e,r)=>(0,t.jsx)("circle",{className:"web-dew",cx:e.cx.toFixed(1),cy:e.cy.toFixed(1),r:"1.4"},`dew-${r}`))]})}function N(){return(0,r.useEffect)(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=0,t=0,r=0,a=0,s=null,i=r=>{e=(r.clientX/window.innerWidth-.5)*2,t=(r.clientY/window.innerHeight-.5)*2},l=()=>{r+=(e-r)*.06,a+=(t-a)*.06,document.documentElement.style.setProperty("--mx",r.toFixed(4)),document.documentElement.style.setProperty("--my",a.toFixed(4)),s=requestAnimationFrame(l)};return window.addEventListener("mousemove",i,{passive:!0}),s=requestAnimationFrame(l),()=>{window.removeEventListener("mousemove",i),s&&cancelAnimationFrame(s)}},[]),(0,t.jsxs)("div",{className:"hero-atmos",children:[(0,t.jsx)("span",{className:"ha-fog f1"}),(0,t.jsx)("span",{className:"ha-fog f2"}),(0,t.jsx)("span",{className:"ha-fog f3"}),(0,t.jsx)("span",{className:"ha-vignette"}),(0,t.jsx)("div",{className:"ha-halo"}),(0,t.jsx)("div",{className:"ha-webs","aria-hidden":"true",children:["tl","tr","bl","br"].map(e=>(0,t.jsx)("div",{className:`ha-corner ${e}`,children:(0,t.jsx)(b,{})},e))})]})}let M=[{name:"Kai Tanaka",role:"Creative Director",img:"/curtain/balon.png"}];function C(){let e=(0,r.useRef)(null),a=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current,r=a.current,i=()=>{let e=t||r;if(!e)return;let a=parseFloat(getComputedStyle(e).getPropertyValue("--h-progress"))||0,i=window.innerWidth;if(r){let e=Math.min(a/.45,1),t=Math.max(0,Math.min((a-.35)/.25,1));s.default.set(r,{xPercent:-50,yPercent:-50,scale:(.3+1.2*e)*(1-.6*t),opacity:1-t,y:-80*t})}if(t){let e=Math.max(0,Math.min((a-.35)/.65,1));s.default.set(t,{xPercent:-50,yPercent:-50,x:(1-e)*i,y:(1-e)*200-e*(1-e)*300,rotation:(1-e)*720,scale:.5+.5*e,opacity:.3+.7*e})}};return s.default.ticker.add(i),()=>s.default.ticker.remove(i)},[]),(0,t.jsxs)("section",{className:"behind-the-lock",children:[(0,t.jsx)("div",{className:"btl-header",children:(0,t.jsxs)(x.default,{children:[(0,t.jsx)("h2",{children:"MI HISTORIA"}),(0,t.jsx)("h3",{children:"“Antes de los estadios llenos, los títulos y las finales, hubo un sueño. Desde chico fui hincha de River. Esa camiseta no era solo un club, era una ilusión que me acompañó desde el primer día que toqué una pelota.” "})]})}),(0,t.jsx)("img",{ref:a,className:"btl-cuerpo",src:"/curtain/cuerpo.png",alt:""}),(0,t.jsx)("div",{className:"btl-cards",children:M.map((r,a)=>(0,t.jsxs)("div",{className:"btl-card",ref:e,children:[(0,t.jsx)("div",{className:"btl-card-img",children:(0,t.jsx)("img",{src:r.img,alt:r.name})}),(0,t.jsxs)("div",{className:"btl-card-content",children:[(0,t.jsx)("p",{className:"lg",children:r.name}),(0,t.jsx)("p",{className:"mono",children:r.role})]})]},r.name))})]})}function F(){let e=(0,r.useRef)(null),[a,s]=(0,r.useState)(!0),[i,l]=(0,r.useState)(!0),n=(0,r.useCallback)(t=>{t.stopPropagation();let r=e.current;r&&(r.muted=!r.muted,s(r.muted),r.muted||r.play())},[]),o=(0,r.useCallback)(()=>{let t=e.current;t&&(t.paused?(t.play(),l(!0)):(t.pause(),l(!1)))},[]);return(0,t.jsxs)("div",{className:"about-video-wrapper",children:[(0,t.jsx)("video",{ref:e,src:"/julian-alvarez-v2/home/julian-chiquito.mp4",autoPlay:!0,loop:!0,muted:!0,playsInline:!0,onClick:o}),(0,t.jsxs)("div",{className:"about-video-controls",children:[(0,t.jsx)("button",{onClick:o,"aria-label":i?"Pausar":"Reproducir",children:i?(0,t.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:[(0,t.jsx)("rect",{x:"6",y:"4",width:"4",height:"16"}),(0,t.jsx)("rect",{x:"14",y:"4",width:"4",height:"16"})]}):(0,t.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:(0,t.jsx)("polygon",{points:"5 3 19 12 5 21 5 3"})})}),(0,t.jsx)("button",{onClick:n,"aria-label":a?"Activar sonido":"Silenciar",children:a?(0,t.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),(0,t.jsx)("line",{x1:"23",y1:"9",x2:"17",y2:"15"}),(0,t.jsx)("line",{x1:"17",y1:"9",x2:"23",y2:"15"})]}):(0,t.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),(0,t.jsx)("path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"}),(0,t.jsx)("path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"})]})})]})]})}function R(){let[e,a]=(0,r.useState)(n),i=(0,r.useRef)(null),c=(0,r.useRef)(null),d=(0,r.useRef)(null),u=(0,r.useRef)(null),m=(0,r.useRef)(null),h=(0,r.useRef)(null),y=(0,r.useRef)(null),b=(0,r.useRef)(null);return(0,l.useGSAP)(()=>{if(!i.current||!c.current)return;s.default.set(i.current,{y:1e3}),s.default.to(i.current,{y:0,duration:.75,ease:"power3.out",delay:n?5.75:1});let e=h.current;e&&f.ScrollTrigger.create({trigger:e,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:e=>{document.documentElement.style.setProperty("--video-scale",.88+.14*e.progress)}});let t=y.current,r=b.current;if(t&&r){let e=()=>{let a=r.scrollWidth;a<=0?requestAnimationFrame(e):f.ScrollTrigger.create({trigger:t,pin:!0,start:"top top",end:()=>`+=${a-window.innerWidth}`,scrub:1,invalidateOnRefresh:!0,onUpdate:e=>{let t=e.progress,i=-(a-window.innerWidth)*t;s.default.set(r,{x:i}),r.querySelectorAll(".h-panel").forEach(e=>{let r=e.offsetLeft,s=e.offsetWidth,i=r/a,l=(r+s)/a;e.style.setProperty("--h-progress",t<=i?0:t>=l?1:(t-i)/(l-i))})}})};requestAnimationFrame(e)}}),(0,r.useEffect)(()=>{let e=u.current;if(!e)return;let t=e.getContext("2d"),r=window.devicePixelRatio||1,a=0,s=0,i=[],l=null,n=null,o=[],c=()=>{a=window.innerWidth,s=window.innerHeight,e.width=Math.floor(a*r),e.height=Math.floor(s*r),e.style.width=a+"px",e.style.height=s+"px",t.setTransform(r,0,0,r,0,0),l=null,o=[];let n=.3*a,c=.35*s;i=[];for(let e=0;e<8;e++){let t=e/8*Math.PI*2-Math.PI/2;i.push({x:a/2+Math.cos(t)*n,y:s/2+Math.sin(t)*c})}};c(),window.addEventListener("resize",c);let d=e=>{t.clearRect(0,0,a,s);let r=e-900,i=0;for(let a=0;a<o.length;a++){let s=o[a];s.t<r||(o[i++]=s,t.strokeStyle="rgba(216, 200, 245, "+(1-(e-s.t)/900)*s.opacity+")",t.lineWidth=.6,t.lineCap="round",t.beginPath(),t.moveTo(s.x1,s.y1),t.lineTo(s.x2,s.y2),t.stroke())}o.length=i,n=requestAnimationFrame(d)};n=requestAnimationFrame(d);let m=(e,t,r,a,s)=>{o.push({x1:e,y1:t,x2:r,y2:a,t:performance.now(),opacity:s}),o.length>400&&o.splice(0,o.length-400)},h=e=>{let t=i.slice().sort((t,r)=>(t.x-e.clientX)*(t.x-e.clientX)+(t.y-e.clientY)*(t.y-e.clientY)-((r.x-e.clientX)*(r.x-e.clientX)+(r.y-e.clientY)*(r.y-e.clientY)));m(t[0].x,t[0].y,e.clientX,e.clientY,.55),m(t[1].x,t[1].y,e.clientX,e.clientY,.32),l&&m(l.x,l.y,e.clientX,e.clientY,.7),l={x:e.clientX,y:e.clientY}};return document.addEventListener("pointermove",h),()=>{window.removeEventListener("resize",c),document.removeEventListener("pointermove",h),n&&cancelAnimationFrame(n)}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{onAnimationComplete:()=>{a(!1)}}),(0,t.jsxs)("section",{className:"hero",ref:d,children:[(0,t.jsx)(N,{}),(0,t.jsx)(v,{color1:"#51398D",color2:"#7c5cbf",color3:"#3d2a6b",color4:"#9b7fd4",colorIntensity:.4,softness:2}),(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("div",{className:"hero-header",ref:c,children:(0,t.jsxs)(x.default,{animateOnScroll:!1,delay:n?5.5:.65,children:[(0,t.jsx)("span",{className:"hero-name hero-name--julian",children:"Julián"}),(0,t.jsx)("span",{className:"hero-header-img",ref:i,children:(0,t.jsx)("img",{src:"/julian-alvarez-v2/home/test.png",alt:""})}),(0,t.jsx)("span",{className:"hero-name hero-name--alvarez",ref:m,children:"Alvarez"})]})}),(0,t.jsx)("div",{className:"hero-gradient"}),(0,t.jsx)("canvas",{className:"hero-alvarez-canvas",ref:u,"aria-hidden":"true"})]})]}),(0,t.jsx)(w,{}),(0,t.jsx)("div",{className:"scroll-track",ref:h,children:(0,t.jsxs)("section",{className:"about",children:[(0,t.jsx)("div",{className:"about-bg",children:(0,t.jsx)(F,{})}),(0,t.jsxs)("div",{className:"slide-content",children:[(0,t.jsx)("div",{className:"slide-title",children:(0,t.jsx)(x.default,{children:(0,t.jsxs)("h1",{children:['"Sigan ',(0,t.jsx)("br",{}),"soñando."]})})}),(0,t.jsx)("div",{className:"slide-description",children:(0,t.jsx)(x.default,{children:(0,t.jsxs)("h1",{children:[(0,t.jsx)("br",{}),'Con trabajo, sacrificio y siendo buenas personas, los sueños se acercan cada día."']})})})]})]})}),(0,t.jsx)("div",{className:"h-scroll",ref:y,children:(0,t.jsxs)("div",{className:"h-scroll__track",ref:b,children:[(0,t.jsx)("div",{className:"h-scroll__panel h-panel",children:(0,t.jsx)(C,{})}),(0,t.jsx)("div",{className:"h-scroll__panel h-panel",children:(0,t.jsx)(j,{blocks:[1]})}),(0,t.jsx)("div",{className:"h-scroll__panel h-panel",children:(0,t.jsx)(j,{blocks:[2]})})]})}),(0,t.jsx)(p,{}),(0,t.jsx)(g.default,{})]})}s.default.registerPlugin(f.ScrollTrigger),e.s(["default",()=>R],74647)}]);