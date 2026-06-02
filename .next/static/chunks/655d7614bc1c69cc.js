(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,58944,e=>{"use strict";var t=e.i(43476),a=e.i(71645);e.s(["default",0,({width:e,height:i,style:r,showSoundButton:s,...n})=>{let l=(0,a.useRef)(null),[o,c]=(0,a.useState)(!0),d=(0,a.useCallback)(e=>{e.stopPropagation();let t=l.current;t&&(t.muted?(t.muted=!1,t.play(),c(!1)):(t.muted=!0,c(!0)))},[]);return(0,t.jsxs)("div",{style:{position:"relative",width:e||"100%",height:i||"100%",...r},...n,children:[(0,t.jsx)("div",{style:{width:"100%",height:"100%",maskImage:"url(/logo.png)",WebkitMaskImage:"url(/logo.png)",maskSize:"contain",WebkitMaskSize:"contain",maskRepeat:"no-repeat",WebkitMaskRepeat:"no-repeat",maskPosition:"center",WebkitMaskPosition:"center"},children:(0,t.jsx)("video",{ref:l,src:"/home/julian-chiquito.mp4",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}})}),s&&(0,t.jsx)("button",{onClick:d,"aria-label":o?"Activar sonido":"Silenciar",style:{position:"absolute",bottom:"1rem",right:"1rem",width:"2.5rem",height:"2.5rem",borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.55)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",zIndex:10,transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="rgba(0,0,0,0.8)",onMouseLeave:e=>e.currentTarget.style.background="rgba(0,0,0,0.55)",children:o?(0,t.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),(0,t.jsx)("line",{x1:"23",y1:"9",x2:"17",y2:"15"}),(0,t.jsx)("line",{x1:"17",y1:"9",x2:"23",y2:"15"})]}):(0,t.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),(0,t.jsx)("path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"}),(0,t.jsx)("path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"})]})})]})}])},29748,e=>{"use strict";var t=e.i(43476),a=e.i(49307),i=e.i(58944);e.s(["default",0,()=>(0,t.jsx)("section",{className:"text-block",children:(0,t.jsxs)("div",{className:"container",children:[(0,t.jsxs)("div",{className:"text-block-col",children:[(0,t.jsx)(a.default,{children:(0,t.jsx)("h3",{children:"Designed absence, engineered silence."})}),(0,t.jsx)("div",{className:"text-block-logo",children:(0,t.jsx)(i.default,{})})]}),(0,t.jsxs)("div",{className:"text-block-col",children:[(0,t.jsx)("div",{className:"text-block-copy",children:(0,t.jsx)(a.default,{children:(0,t.jsx)("p",{className:"bodyCopy sm",children:"Designed for quiet tension. Built on structure, not spectacle. Each piece functions with intent, nothing more. Neutral in tone, deliberate in volume, uniform for moving through static."})})}),(0,t.jsx)("div",{className:"text-block-copy",children:(0,t.jsx)(a.default,{children:(0,t.jsx)("p",{className:"bodyCopy sm",children:"No ornament. No history. Just form engineered to remain. Indifferent to season, untouched by noise. Modular in cut, detached in presence. A system for those who exit the frame."})})})]})]})})])},74647,e=>{"use strict";var t=e.i(43476),a=e.i(71645),i=e.i(55667),r=e.i(89970),s=e.i(75324),n=e.i(65747);r.default.registerPlugin(s.SplitText);let l=!0,o=()=>{let[e,o]=(0,a.useState)(l),[c,d]=(0,a.useState)(l),u=(0,a.useRef)(null),m=(0,i.useLenis)();return((0,a.useEffect)(()=>()=>{l=!1},[]),(0,a.useEffect)(()=>{c?(m&&m.stop(),document.body.style.overflow="hidden"):(m&&m.start(),document.body.style.overflow="")},[m,c]),(0,n.useGSAP)(()=>{e&&document.fonts.ready.then(()=>{let e=s.SplitText.create(".preloader-logo h1",{type:"chars",charsClass:"char",mask:"chars"});r.default.set(e.chars,{x:"110%"}),r.default.set(".preloader-logo h1",{opacity:1});let t=window.innerWidth<1e3;r.default.timeline({delay:.5,onComplete:()=>{d(!1),setTimeout(()=>{o(!1)},100)}}).to(e.chars,{x:"0%",stagger:.05,ease:"power4.out",duration:1}).add(function(e=4.75){let t=r.default.timeline(),a=0;for(let i=0;i<5;i++){let r=4===i?1:Math.min(a+.3*Math.random()+.1,.9);a=r,t.to(".preloader-progress-bar",{scaleX:r,duration:e/5,ease:"power2.out"})}return t}(),"<").set(".preloader-progress",{backgroundColor:"#fff"}).to(e.chars,{x:"-110%",stagger:.05,duration:1,ease:"power4.out"},"-=0.5").to(".preloader-progress",{opacity:0,duration:.5,ease:"power3.out"},"-=0.5").to(".preloader-mask",{scale:t?25:15,duration:1.25,ease:"power3.out"},"<")})},{scope:u,dependencies:[e]}),e)?(0,t.jsxs)("div",{className:"preloader-wrapper",ref:u,children:[(0,t.jsxs)("div",{className:"preloader-progress",children:[(0,t.jsx)("div",{className:"preloader-progress-bar"}),(0,t.jsx)("div",{className:"preloader-logo"})]}),(0,t.jsx)("div",{className:"preloader-mask"})]}):null};var c=e.i(32009);let d=`
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
`;function h(e){return[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255]}let v=({color1:e="#c4b5d9",color2:i="#d4c4e8",color3:r="#e0d6ef",color4:s="#b8a8d0",colorIntensity:n=.35,softness:l=2,distortionAmount:o=1.5,brushSize:v=25,brushStrength:x=.3,fluidDecay:f=.98,trailLength:p=.8,stopDecay:g=.85,downsample:j=.5})=>{let y=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t,a=y.current;if(!a||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let w=new c.OrthographicCamera(-1,1,1,-1,0,1),b=new c.WebGLRenderer({antialias:!0,alpha:!0});b.setSize(window.innerWidth,window.innerHeight),b.setPixelRatio(Math.min(devicePixelRatio,2)),a.appendChild(b.domElement);let N=Math.floor(window.innerWidth*j),M=Math.floor(window.innerHeight*j),S=new c.WebGLRenderTarget(N,M,{minFilter:c.LinearFilter,magFilter:c.LinearFilter,format:c.RGBAFormat,type:c.FloatType}),C=new c.WebGLRenderTarget(N,M,{minFilter:c.LinearFilter,magFilter:c.LinearFilter,format:c.RGBAFormat,type:c.FloatType}),R=S,F=C,k=0,T=new c.ShaderMaterial({uniforms:{iTime:{value:0},iResolution:{value:new c.Vector2(N,M)},iMouse:{value:new c.Vector4(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:v},uBrushStrength:{value:x},uFluidDecay:{value:f},uTrailLength:{value:p},uStopDecay:{value:g}},vertexShader:d,fragmentShader:u}),E=new c.ShaderMaterial({uniforms:{iTime:{value:0},iResolution:{value:new c.Vector2(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:o},uColor1:{value:new c.Vector3(...h(e))},uColor2:{value:new c.Vector3(...h(i))},uColor3:{value:new c.Vector3(...h(r))},uColor4:{value:new c.Vector3(...h(s))},uColorIntensity:{value:n},uSoftness:{value:l}},vertexShader:d,fragmentShader:m}),P=new c.PlaneGeometry(2,2),L=new c.Mesh(P,T),A=new c.Mesh(P,E),q=0,z=0,D=0,B=0,I=0,W=e=>{let t=a.getBoundingClientRect();D=q,B=z,q=e.clientX-t.left,z=t.height-(e.clientY-t.top),I=performance.now(),T.uniforms.iMouse.value.set(q,z,D,B)},U=()=>{T.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",W),document.addEventListener("mouseleave",U);let $=()=>{let e=window.innerWidth,t=window.innerHeight,a=Math.floor(e*j),i=Math.floor(t*j);b.setSize(e,t),T.uniforms.iResolution.value.set(a,i),E.uniforms.iResolution.value.set(e,t),S.setSize(a,i),C.setSize(a,i),k=0};window.addEventListener("resize",$);let G=()=>{t=requestAnimationFrame(G);let e=.001*performance.now();T.uniforms.iTime.value=e,E.uniforms.iTime.value=e,T.uniforms.iFrame.value=k,performance.now()-I>100&&T.uniforms.iMouse.value.set(0,0,0,0),T.uniforms.iPreviousFrame.value=F.texture,b.setRenderTarget(R),b.render(L,w),E.uniforms.iFluid.value=R.texture,b.setRenderTarget(null),b.render(A,w);let a=R;R=F,F=a,k++};return G(),()=>{cancelAnimationFrame(t),document.removeEventListener("mousemove",W),document.removeEventListener("mouseleave",U),window.removeEventListener("resize",$),b.dispose(),P.dispose(),T.dispose(),E.dispose(),S.dispose(),C.dispose(),a.contains(b.domElement)&&a.removeChild(b.domElement)}},[]),(0,t.jsx)("div",{className:"dot-matrix-wrapper",ref:y})};var x=e.i(58944),f=e.i(49307),p=e.i(83495);r.default.registerPlugin(p.ScrollTrigger);let g=()=>{let e=(0,a.useRef)(null),i=(0,a.useRef)(null),s=(0,a.useRef)(null);return(0,n.useGSAP)(()=>{p.ScrollTrigger.create({trigger:e.current,start:"top bottom",end:"150% top",scrub:!0,onUpdate:e=>{let t=e.progress;r.default.set(i.current,{x:`${25-50*t}%`}),r.default.set(s.current,{x:`${-25+50*t}%`})}})},{scope:e}),(0,t.jsxs)("section",{className:"marquee-banner",ref:e,children:[(0,t.jsxs)("div",{className:"marquees",children:[(0,t.jsx)("div",{className:"marquee-header marquee-header-1",ref:i,children:(0,t.jsx)("h1",{children:"Transmission lost in neutral space"})}),(0,t.jsx)("div",{className:"marquee-header marquee-header-2",ref:s,children:(0,t.jsx)("h1",{children:"Synthetic forms archive the signal"})})]}),(0,t.jsxs)("div",{className:"banner",children:[(0,t.jsxs)("div",{className:"banner-content",children:[(0,t.jsx)(f.default,{type:"flicker",children:(0,t.jsx)("p",{children:"[ Las dos caras ]"})}),(0,t.jsx)(f.default,{children:(0,t.jsx)("h4",{children:"Dentro y fuera de las canchas"})})]}),(0,t.jsx)("div",{className:"banner-img",children:(0,t.jsx)("img",{src:"/marquee-banner/mask-face.webp",alt:""})}),(0,t.jsx)("div",{className:"banner-logo",children:(0,t.jsx)("img",{src:"public/logo.png",alt:""})})]})]})};var j=e.i(29748);r.gsap.registerPlugin(p.ScrollTrigger,s.SplitText);var y=e.i(22016);r.gsap.registerPlugin(p.ScrollTrigger);let w=()=>{let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=e.current;if(!t)return;let a=setTimeout(()=>{let e=t.querySelector(".cta-col:nth-child(1) .cta-side-img"),a=t.querySelector(".cta-col:nth-child(3) .cta-side-img"),i=p.ScrollTrigger.create({trigger:t,start:"top bottom",end:"bottom top",scrub:1,onUpdate:t=>{let i=t.progress;r.gsap.set(e,{y:`${20-30*i}rem`}),r.gsap.set(a,{y:`${-(30*i)}rem`})}});return()=>{i.kill()}},500);return()=>{clearTimeout(a)}},[]),(0,t.jsxs)("section",{className:"cta",ref:e,children:[(0,t.jsxs)("div",{className:"container",children:[(0,t.jsxs)("div",{className:"cta-col",children:[(0,t.jsx)("div",{className:"cta-side-img",children:(0,t.jsx)("img",{src:"/bio/3.jpeg",alt:""})}),(0,t.jsx)("div",{className:"cta-col-copy",children:(0,t.jsx)(f.default,{children:(0,t.jsx)("p",{className:"bodyCopy sm",children:"Built to exist outside context, these forms prioritize neutrality, and distortion."})})})]}),(0,t.jsxs)("div",{className:"cta-col",children:[(0,t.jsx)("div",{className:"cta-main-img",children:(0,t.jsx)("img",{src:"/bio/2.jpeg",alt:""})}),(0,t.jsx)("div",{className:"cta-header",children:(0,t.jsx)(f.default,{children:(0,t.jsx)("h5",{children:"“Llegar a River fue cumplir el sueño que tenía desde chico… y viví noches que quedan para siempre, como aquella final histórica en Madrid.” "})})})]}),(0,t.jsx)("div",{className:"cta-col",children:(0,t.jsx)("div",{className:"cta-side-img",children:(0,t.jsx)("img",{src:"/bio/1.jpeg",alt:""})})})]}),(0,t.jsx)("div",{className:"container",children:(0,t.jsx)("div",{className:"cta-main-copy",children:(0,t.jsx)("div",{className:"btn",children:(0,t.jsx)(f.default,{type:"flicker",children:(0,t.jsx)(y.default,{href:"/wardrobe",children:"Enter Wardrobe"})})})})})]})};function b(e){let t=new Date(e).getTime()-Date.now();return t<=0?{days:"00",hours:"00",minutes:"00"}:{days:String(Math.floor(t/864e5)).padStart(2,"0"),hours:String(Math.floor(t%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(t%36e5/6e4)).padStart(2,"0")}}let N=({kickoff:e="2026-06-15T21:00:00+02:00",home:i="Atlético de Madrid",away:r="Real Madrid",competition:s="LaLiga",extra:n="Metropolitano"})=>{let[l,o]=(0,a.useState)(!1),[c,d]=(0,a.useState)(()=>b(e)),u=(0,a.useRef)(null),m=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=()=>d(b(e));t();let a=setInterval(t,1e4);return()=>clearInterval(a)},[e]),(0,a.useEffect)(()=>{let e=u.current,t=m.current;if(!e||!t)return;let a=e.getContext("2d"),i=0,r=0,s=window.devicePixelRatio||1,n=[],l=null,o=!1,c=()=>{let l=t.getBoundingClientRect();i=l.width,r=l.height,e.width=Math.floor(i*s),e.height=Math.floor(r*s),e.style.width=i+"px",e.style.height=r+"px",a.setTransform(s,0,0,s,0,0);let o=i/2,c=r/2,d=.55*i,u=.6*r;n=[];for(let e=0;e<8;e++){let t=e/8*Math.PI*2-Math.PI/2;n.push({x:o+Math.cos(t)*d,y:c+Math.sin(t)*u})}a.clearRect(0,0,i,r)};c();let d=new ResizeObserver(c);d.observe(t);let h=(e,t,i,r,s)=>{a.strokeStyle="rgba(216, 200, 245, "+s+")",a.lineWidth=.6,a.lineCap="round",a.beginPath(),a.moveTo(e,t),a.lineTo(i,r),a.stroke()},v=e=>{let s=t.getBoundingClientRect(),c=e.clientX-s.left,d=e.clientY-s.top;a.save(),a.globalCompositeOperation="destination-out",a.fillStyle="rgba(0,0,0,0.04)",a.fillRect(0,0,i,r),a.restore();let u=n.slice().sort((e,t)=>(e.x-c)*(e.x-c)+(e.y-d)*(e.y-d)-((t.x-c)*(t.x-c)+(t.y-d)*(t.y-d)));h(u[0].x,u[0].y,c,d,.55),h(u[1].x,u[1].y,c,d,.32),l&&o&&h(l.x,l.y,c,d,.7),l={x:c,y:d}},x=()=>{o=!0,l=null},f=()=>{o=!1;let e=0,t=setInterval(()=>{e++,a.save(),a.globalCompositeOperation="destination-out",a.fillStyle="rgba(0,0,0,0.18)",a.fillRect(0,0,i,r),a.restore(),e>14&&(clearInterval(t),a.clearRect(0,0,i,r))},30)};return t.addEventListener("pointerenter",x),t.addEventListener("pointermove",v),t.addEventListener("pointerleave",f),()=>{d.disconnect(),t.removeEventListener("pointerenter",x),t.removeEventListener("pointermove",v),t.removeEventListener("pointerleave",f)}},[]),(0,t.jsxs)("article",{className:`next-match${l?" is-min":""}`,ref:m,children:[(0,t.jsx)("div",{className:"watermark","aria-hidden":"true"}),(0,t.jsx)("canvas",{className:"web",ref:u,"aria-hidden":"true"}),(0,t.jsxs)("header",{className:"head",children:[(0,t.jsx)("div",{className:"eyebrow",children:"Próximo partido"}),(0,t.jsx)("button",{type:"button",className:"toggle","aria-label":l?"Expandir tarjeta":"Minimizar tarjeta","aria-expanded":!l,onClick:()=>o(e=>!e),children:(0,t.jsx)("span",{className:"bar"})})]}),(0,t.jsxs)("div",{className:"countdown","aria-live":"polite",children:[(0,t.jsxs)("div",{className:"unit",children:[(0,t.jsx)("span",{className:"n n-d",children:c.days}),(0,t.jsx)("span",{className:"u",children:"Días"})]}),(0,t.jsx)("span",{className:"sep",children:":"}),(0,t.jsxs)("div",{className:"unit",children:[(0,t.jsx)("span",{className:"n n-h",children:c.hours}),(0,t.jsx)("span",{className:"u",children:"Horas"})]}),(0,t.jsx)("span",{className:"sep",children:":"}),(0,t.jsxs)("div",{className:"unit",children:[(0,t.jsx)("span",{className:"n n-m",children:c.minutes}),(0,t.jsx)("span",{className:"u",children:"Min"})]})]}),(0,t.jsxs)("div",{className:"nm-extra",children:[(0,t.jsxs)("div",{className:"teams",children:[(0,t.jsx)("span",{className:"t home",children:i}),(0,t.jsx)("span",{className:"vs",children:"vs"}),(0,t.jsx)("span",{className:"t away",children:r})]}),(0,t.jsxs)("div",{className:"meta",children:[(0,t.jsx)("span",{className:"comp",children:s}),(0,t.jsx)("span",{className:"dot",children:"·"}),(0,t.jsx)("span",{className:"extra",children:n})]})]})]})};var M=e.i(23490);let S=()=>{let e=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t,a,i,r,s,n=e.current;if(!n)return;let l=new c.Scene,o=new c.PerspectiveCamera(45,1,.1,100);o.position.set(0,0,5);let d=new c.WebGLRenderer({antialias:!0,alpha:!0});d.setSize(150,150),d.setPixelRatio(Math.min(devicePixelRatio,2)),d.toneMapping=c.ACESFilmicToneMapping,d.toneMappingExposure=1,n.appendChild(d.domElement);let u=new c.AmbientLight(5323149,.5);l.add(u);let m=new c.DirectionalLight(9074104,2);m.position.set(5,5,5),l.add(m);let h=new c.DirectionalLight(0xc4b5d9,1.5);h.position.set(-5,3,-5),l.add(h);let v=new c.DirectionalLight(5323149,1);v.position.set(0,-5,3),l.add(v);let x=null,f=0,p=0,g=((a=document.createElement("canvas")).width=512,a.height=512,(r=(i=a.getContext("2d")).createRadialGradient(256,256,0,256,256,256)).addColorStop(0,"#9b7fd4"),r.addColorStop(.3,"#7c5cbf"),r.addColorStop(.6,"#51398D"),r.addColorStop(1,"#3d2a6b"),i.fillStyle=r,i.fillRect(0,0,512,512),(s=new c.CanvasTexture(a)).wrapS=c.RepeatWrapping,s.wrapT=c.RepeatWrapping,s);new M.GLTFLoader().load("/home/mascara.glb",e=>{(x=e.scene).rotation.y=0,l.add(x),x.traverse(e=>{e.isMesh&&(e.material=e.material.clone(),e.material.map=g,e.material.metalness=.3,e.material.roughness=.4,e.material.envMapIntensity=.8,e.material.needsUpdate=!0)})}),window.addEventListener("scroll",()=>{f=.005*window.scrollY});let j=()=>{t=requestAnimationFrame(j),x&&(p+=(f-p)*.08,x.rotation.y=p),d.render(l,o)};return j(),()=>{cancelAnimationFrame(t),d.dispose(),n.contains(d.domElement)&&n.removeChild(d.domElement)}},[]),(0,t.jsx)("div",{ref:e,style:{position:"fixed",bottom:"0",right:"1rem",width:"150px",height:"150px",zIndex:99999,pointerEvents:"none"}})};function C(){let e=[110,200,300,420,540],a=Array.from({length:8},(e,t)=>t/7*90*Math.PI/180),i=a.map(e=>`M 0 0 L ${(588*Math.cos(e)).toFixed(1)} ${(588*Math.sin(e)).toFixed(1)}`),r=e.map(e=>{let t="";return a.forEach((i,r)=>{let s=Math.cos(i)*e,n=Math.sin(i)*e;if(0===r){t+=`M ${s.toFixed(1)} ${n.toFixed(1)}`;return}let l=(i+a[r-1])/2,o=Math.cos(l)*e*.94,c=Math.sin(l)*e*.94;t+=` Q ${o.toFixed(1)} ${c.toFixed(1)} ${s.toFixed(1)} ${n.toFixed(1)}`}),t}),s=[[2,1],[2,4],[2,6],[3,1],[3,4],[3,6]].map(([t,i])=>{let r=e[t],s=a[i];return{cx:Math.cos(s)*r,cy:Math.sin(s)*r}});return(0,t.jsxs)("svg",{viewBox:"0 0 600 600",children:[i.map((e,a)=>(0,t.jsx)("path",{className:"web-ray",d:e},`ray-${a}`)),r.map((e,a)=>(0,t.jsx)("path",{className:"web-arc",d:e},`arc-${a}`)),s.map((e,a)=>(0,t.jsx)("circle",{className:"web-dew",cx:e.cx.toFixed(1),cy:e.cy.toFixed(1),r:"1.4"},`dew-${a}`))]})}function R(){return(0,a.useEffect)(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=0,t=0,a=0,i=0,r=null,s=a=>{e=(a.clientX/window.innerWidth-.5)*2,t=(a.clientY/window.innerHeight-.5)*2},n=()=>{a+=(e-a)*.06,i+=(t-i)*.06,document.documentElement.style.setProperty("--mx",a.toFixed(4)),document.documentElement.style.setProperty("--my",i.toFixed(4)),r=requestAnimationFrame(n)};return window.addEventListener("mousemove",s,{passive:!0}),r=requestAnimationFrame(n),()=>{window.removeEventListener("mousemove",s),r&&cancelAnimationFrame(r)}},[]),(0,t.jsxs)("div",{className:"hero-atmos",children:[(0,t.jsx)("span",{className:"ha-fog f1"}),(0,t.jsx)("span",{className:"ha-fog f2"}),(0,t.jsx)("span",{className:"ha-fog f3"}),(0,t.jsx)("span",{className:"ha-vignette"}),(0,t.jsx)("div",{className:"ha-halo"}),(0,t.jsx)("div",{className:"ha-webs","aria-hidden":"true",children:["tl","tr","bl","br"].map(e=>(0,t.jsx)("div",{className:`ha-corner ${e}`,children:(0,t.jsx)(C,{})},e))})]})}let F=[{name:"Toque Fino",desc:"La pelota nunca se queja. Solo vuelve.",img:"/team-cards/futbol.webp"},{name:"Gol de Media",desc:"Distancia corta, sueño largo.",img:"/team-cards/futbol.webp"},{name:"Doble Amague",desc:"El pie dice una cosa, el alma otra.",img:"/team-cards/futbol.webp"},{name:"Pase al Vacío",desc:"No hay mejor mensaje que el que se adivina.",img:"/team-cards/futbol.webp"},{name:"Jogo Bonito",desc:"Brasil lo inventó. Argentina lo vive.",img:"/team-cards/futbol.webp"},{name:"Eléctrico",desc:"La cancha se achica cuando él aparece.",img:"/team-cards/Anexo-4.webp"},{name:"Instinto",desc:"El gol no se piensa, se siente.",img:"/team-cards/Anexo 9.webp"},{name:"Eternidad",desc:"Cada partido es un recuerdo naciendo.",img:"/team-cards/Anexo 10.webp"}];function k(){let e=(0,a.useRef)(null),[i,r]=(0,a.useState)(!0),s=(0,a.useCallback)(()=>{let t=e.current;t&&(t.muted?(t.muted=!1,t.play(),r(!1)):(t.muted=!0,r(!0)))},[]);return(0,t.jsxs)("section",{className:"mi-historia",children:[(0,t.jsxs)("div",{className:"mh-desktop",children:[(0,t.jsxs)("div",{className:"mh-header",children:[(0,t.jsxs)("div",{className:"mh-video",onClick:s,children:[(0,t.jsx)("video",{ref:e,src:"/home/julian-chiquito.mp4",autoPlay:!0,loop:!0,muted:!0,playsInline:!0}),!i&&(0,t.jsx)("span",{className:"mh-video-indicator",children:"🔊"})]}),(0,t.jsx)("h1",{children:"Mi historia"})]}),F.map((e,a)=>(0,t.jsxs)("div",{className:"mh-card","data-card":a,children:[(0,t.jsx)("div",{className:"mh-card-img",children:(0,t.jsx)("img",{src:e.img,alt:e.name})}),(0,t.jsxs)("div",{className:"mh-card-content",children:[(0,t.jsx)("div",{className:"mh-card-title",children:(0,t.jsx)("h6",{children:e.name})}),(0,t.jsx)("div",{className:"mh-card-desc",children:(0,t.jsx)("p",{children:e.desc})})]})]},a))]}),(0,t.jsxs)("div",{className:"mh-mobile",children:[(0,t.jsx)("div",{className:"mh-mobile-video",children:(0,t.jsx)("video",{src:"/home/julian-chiquito.mp4",autoPlay:!0,loop:!0,muted:!0,playsInline:!0})}),(0,t.jsx)("div",{className:"mh-mobile-header",children:(0,t.jsx)("h1",{children:"Mi historia"})}),F.map((e,a)=>(0,t.jsxs)("div",{className:"mh-card",children:[(0,t.jsx)("div",{className:"mh-card-img",children:(0,t.jsx)("img",{src:e.img,alt:e.name})}),(0,t.jsxs)("div",{className:"mh-card-content",children:[(0,t.jsx)("div",{className:"mh-card-title",children:(0,t.jsx)("h6",{children:e.name})}),(0,t.jsx)("div",{className:"mh-card-desc",children:(0,t.jsx)("p",{children:e.desc})})]})]},a))]})]})}function T(){let[e,i]=(0,a.useState)(l),s=(0,a.useRef)(null),c=(0,a.useRef)(null),d=(0,a.useRef)(null),u=(0,a.useRef)(null),m=(0,a.useRef)(null),h=(0,a.useRef)(null);return(0,n.useGSAP)(()=>{if(!s.current||!c.current)return;r.default.set(s.current,{y:1e3}),r.default.to(s.current,{y:0,duration:.75,ease:"power3.out",delay:l?5.75:1}),r.default.to(c.current,{y:150,ease:"none",scrollTrigger:{trigger:d.current,start:"top top",end:"bottom top",scrub:!0}});let e=h.current;e&&r.default.matchMedia().add("(min-width: 1000px)",()=>{p.ScrollTrigger.refresh();let t=p.ScrollTrigger.create({trigger:e,start:"top top",end:`+=${8*window.innerHeight}px`,pin:!0,pinSpacing:!0,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:e=>{let t=e.progress;if(t<.375)r.default.set(".scroll-track .about",{x:-(t/.375*100)+"vw"}),document.documentElement.classList.remove("is-h-scroll");else{let e=(t-.375)/.625;r.default.set(".scroll-track .about",{x:"-100vw"}),document.documentElement.classList.add("is-h-scroll");let a=document.querySelector(".mh-header"),i=document.querySelectorAll(".mh-card");if(a){let t=Math.max(0,a.offsetWidth-window.innerWidth);r.default.set(a,{x:-e*t})}let s=document.querySelector(".mh-video video");if(s){let t=0;e<.25?t=e/.25:e<.65&&(t=1-(e-.25)/.4);let a=.4*(t=Math.max(0,Math.min(t,1)));s.volume=.92*s.volume+.08*a,s.muted=t<.01}i.forEach((t,a)=>{let i=Math.max(0,Math.min((e-.08*a)*(a<4?1.5:2),1)),s=Math.max(0,Math.min(Math.min(i/.08,1),Math.min((1-i)/.08,1)));if(s>.001){let e=i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,n=r.default.utils.interpolate(25,-450,e),l=a%2==0?r.default.utils.interpolate(10,-5,e):r.default.utils.interpolate(50,10,e),o=r.default.utils.interpolate(15,-30,e),c=.85+.15*Math.min(i/.15,1);r.default.set(t,{xPercent:n,yPercent:l,rotation:o,opacity:s,scale:c})}else r.default.set(t,{opacity:0})})}}});return()=>t.kill()})}),(0,a.useEffect)(()=>{let e=u.current;if(!e)return;let t=e.getContext("2d"),a=window.devicePixelRatio||1,i=0,r=0,s=[],n=null,l=()=>{i=window.innerWidth,r=window.innerHeight,e.width=Math.floor(i*a),e.height=Math.floor(r*a),e.style.width=i+"px",e.style.height=r+"px",t.setTransform(a,0,0,a,0,0),t.clearRect(0,0,i,r);let n=.3*i,l=.35*r;s=[];for(let e=0;e<8;e++){let t=e/8*Math.PI*2-Math.PI/2;s.push({x:i/2+Math.cos(t)*n,y:r/2+Math.sin(t)*l})}};l(),window.addEventListener("resize",l);let o=(e,a,i,r,s)=>{t.strokeStyle="rgba(216, 200, 245, "+s+")",t.lineWidth=.6,t.lineCap="round",t.beginPath(),t.moveTo(e,a),t.lineTo(i,r),t.stroke()},c=e=>{t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.04)",t.fillRect(0,0,i,r),t.restore();let a=s.slice().sort((t,a)=>(t.x-e.clientX)*(t.x-e.clientX)+(t.y-e.clientY)*(t.y-e.clientY)-((a.x-e.clientX)*(a.x-e.clientX)+(a.y-e.clientY)*(a.y-e.clientY)));o(a[0].x,a[0].y,e.clientX,e.clientY,.55),o(a[1].x,a[1].y,e.clientX,e.clientY,.32),n&&o(n.x,n.y,e.clientX,e.clientY,.7),n={x:e.clientX,y:e.clientY}};return document.addEventListener("pointermove",c),()=>{window.removeEventListener("resize",l),document.removeEventListener("pointermove",c)}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{onAnimationComplete:()=>{i(!1)}}),(0,t.jsxs)("section",{className:"hero",ref:d,children:[(0,t.jsx)(R,{}),(0,t.jsx)(v,{color1:"#51398D",color2:"#7c5cbf",color3:"#3d2a6b",color4:"#9b7fd4",colorIntensity:.4,softness:2}),(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("div",{className:"hero-header",ref:c,children:(0,t.jsxs)(f.default,{animateOnScroll:!1,delay:l?5.5:.65,children:[(0,t.jsx)("span",{className:"hero-name hero-name--julian",children:"Julián"}),(0,t.jsx)("span",{className:"hero-name hero-name--alvarez",ref:m,children:"Alvarez"})]})}),(0,t.jsx)("canvas",{className:"hero-alvarez-canvas",ref:u,"aria-hidden":"true"})]}),(0,t.jsx)("div",{className:"hero-img",ref:s,children:(0,t.jsx)("img",{src:"/home/test.png",alt:""})}),(0,t.jsxs)("div",{className:"section-footer",children:[(0,t.jsx)(f.default,{type:"flicker",delay:l?7.5:.65,animateOnScroll:!1,children:(0,t.jsx)("p",{children:"El increíble hombre araña"})}),(0,t.jsx)(f.default,{type:"flicker",delay:l?7.5:.65,animateOnScroll:!1,children:(0,t.jsx)("p",{children:"Model v.23"})})]})]}),(0,t.jsx)(N,{}),(0,t.jsx)(S,{}),(0,t.jsxs)("div",{className:"scroll-track",ref:h,children:[(0,t.jsxs)("section",{className:"about",children:[(0,t.jsx)("div",{className:"container",children:(0,t.jsxs)("div",{className:"about-copy",children:[(0,t.jsx)(f.default,{children:(0,t.jsxs)("h3",{children:['"Sigan soñando.',(0,t.jsx)("br",{}),'Con trabajo, sacrificio y siendo buenas personas, los sueños se acercan cada día."']})}),(0,t.jsx)("div",{className:"about-icon",children:(0,t.jsx)(x.default,{})})]})}),(0,t.jsx)("div",{className:"section-footer light",children:(0,t.jsx)(f.default,{type:"flicker",children:(0,t.jsx)("p",{children:"/ Core State /"})})})]}),(0,t.jsx)(k,{})]}),(0,t.jsx)(w,{}),(0,t.jsx)(g,{}),(0,t.jsx)(j.default,{})]})}r.default.registerPlugin(p.ScrollTrigger),e.s(["default",()=>T],74647)}]);