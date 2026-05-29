module.exports=[85690,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(88623),e=a.i(26304),f=a.i(87740),g=a.i(16925);e.default.registerPlugin(f.SplitText);let h=!0,i=()=>{let[a,i]=(0,c.useState)(h),[j,k]=(0,c.useState)(h),l=(0,c.useRef)(null),m=(0,d.useLenis)();return((0,c.useEffect)(()=>()=>{h=!1},[]),(0,c.useEffect)(()=>{j?(m&&m.stop(),document.body.style.overflow="hidden"):(m&&m.start(),document.body.style.overflow="")},[m,j]),(0,g.useGSAP)(()=>{a&&document.fonts.ready.then(()=>{let a=f.SplitText.create(".preloader-logo h1",{type:"chars",charsClass:"char",mask:"chars"});e.default.set(a.chars,{x:"110%"}),e.default.set(".preloader-logo h1",{opacity:1});let b=window.innerWidth<1e3;e.default.timeline({delay:.5,onComplete:()=>{k(!1),setTimeout(()=>{i(!1)},100)}}).to(a.chars,{x:"0%",stagger:.05,ease:"power4.out",duration:1}).add(function(a=4.75){let b=e.default.timeline(),c=0;for(let d=0;d<5;d++){let e=4===d?1:Math.min(c+.3*Math.random()+.1,.9);c=e,b.to(".preloader-progress-bar",{scaleX:e,duration:a/5,ease:"power2.out"})}return b}(),"<").set(".preloader-progress",{backgroundColor:"#fff"}).to(a.chars,{x:"-110%",stagger:.05,duration:1,ease:"power4.out"},"-=0.5").to(".preloader-progress",{opacity:0,duration:.5,ease:"power3.out"},"-=0.5").to(".preloader-mask",{scale:b?25:15,duration:1.25,ease:"power3.out"},"<")})},{scope:l,dependencies:[a]}),a)?(0,b.jsxs)("div",{className:"preloader-wrapper",ref:l,children:[(0,b.jsxs)("div",{className:"preloader-progress",children:[(0,b.jsx)("div",{className:"preloader-progress-bar"}),(0,b.jsx)("div",{className:"preloader-logo"})]}),(0,b.jsx)("div",{className:"preloader-mask"})]}):null};var j=a.i(98167);let k=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,l=`
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
`;function n(a){return[parseInt(a.slice(1,3),16)/255,parseInt(a.slice(3,5),16)/255,parseInt(a.slice(5,7),16)/255]}let o=({color1:a="#c4b5d9",color2:d="#d4c4e8",color3:e="#e0d6ef",color4:f="#b8a8d0",colorIntensity:g=.35,softness:h=2,distortionAmount:i=1.5,brushSize:o=25,brushStrength:p=.3,fluidDecay:q=.98,trailLength:r=.8,stopDecay:s=.85,downsample:t=.5})=>{let u=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let b,c=u.current;if(!c||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let v=new j.OrthographicCamera(-1,1,1,-1,0,1),w=new j.WebGLRenderer({antialias:!0,alpha:!0});w.setSize(window.innerWidth,window.innerHeight),w.setPixelRatio(Math.min(devicePixelRatio,2)),c.appendChild(w.domElement);let x=Math.floor(window.innerWidth*t),y=Math.floor(window.innerHeight*t),z=new j.WebGLRenderTarget(x,y,{minFilter:j.LinearFilter,magFilter:j.LinearFilter,format:j.RGBAFormat,type:j.FloatType}),A=new j.WebGLRenderTarget(x,y,{minFilter:j.LinearFilter,magFilter:j.LinearFilter,format:j.RGBAFormat,type:j.FloatType}),B=z,C=A,D=0,E=new j.ShaderMaterial({uniforms:{iTime:{value:0},iResolution:{value:new j.Vector2(x,y)},iMouse:{value:new j.Vector4(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:o},uBrushStrength:{value:p},uFluidDecay:{value:q},uTrailLength:{value:r},uStopDecay:{value:s}},vertexShader:k,fragmentShader:l}),F=new j.ShaderMaterial({uniforms:{iTime:{value:0},iResolution:{value:new j.Vector2(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:i},uColor1:{value:new j.Vector3(...n(a))},uColor2:{value:new j.Vector3(...n(d))},uColor3:{value:new j.Vector3(...n(e))},uColor4:{value:new j.Vector3(...n(f))},uColorIntensity:{value:g},uSoftness:{value:h}},vertexShader:k,fragmentShader:m}),G=new j.PlaneGeometry(2,2),H=new j.Mesh(G,E),I=new j.Mesh(G,F),J=0,K=0,L=0,M=0,N=0,O=a=>{let b=c.getBoundingClientRect();L=J,M=K,J=a.clientX-b.left,K=b.height-(a.clientY-b.top),N=performance.now(),E.uniforms.iMouse.value.set(J,K,L,M)},P=()=>{E.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",O),document.addEventListener("mouseleave",P);let Q=()=>{let a=window.innerWidth,b=window.innerHeight,c=Math.floor(a*t),d=Math.floor(b*t);w.setSize(a,b),E.uniforms.iResolution.value.set(c,d),F.uniforms.iResolution.value.set(a,b),z.setSize(c,d),A.setSize(c,d),D=0};window.addEventListener("resize",Q);let R=()=>{b=requestAnimationFrame(R);let a=.001*performance.now();E.uniforms.iTime.value=a,F.uniforms.iTime.value=a,E.uniforms.iFrame.value=D,performance.now()-N>100&&E.uniforms.iMouse.value.set(0,0,0,0),E.uniforms.iPreviousFrame.value=C.texture,w.setRenderTarget(B),w.render(H,v),F.uniforms.iFluid.value=B.texture,w.setRenderTarget(null),w.render(I,v);let c=B;B=C,C=c,D++};return R(),()=>{cancelAnimationFrame(b),document.removeEventListener("mousemove",O),document.removeEventListener("mouseleave",P),window.removeEventListener("resize",Q),w.dispose(),G.dispose(),E.dispose(),F.dispose(),z.dispose(),A.dispose(),c.contains(w.domElement)&&c.removeChild(w.domElement)}},[]),(0,b.jsx)("div",{className:"dot-matrix-wrapper",ref:u})};var p=a.i(19511),q=a.i(29043),r=a.i(81783);e.default.registerPlugin(r.ScrollTrigger);let s=()=>{let a=(0,c.useRef)(null),d=(0,c.useRef)(null),f=(0,c.useRef)(null);return(0,g.useGSAP)(()=>{r.ScrollTrigger.create({trigger:a.current,start:"top bottom",end:"150% top",scrub:!0,onUpdate:a=>{let b=a.progress;e.default.set(d.current,{x:`${25-50*b}%`}),e.default.set(f.current,{x:`${-25+50*b}%`})}})},{scope:a}),(0,b.jsxs)("section",{className:"marquee-banner",ref:a,children:[(0,b.jsxs)("div",{className:"marquees",children:[(0,b.jsx)("div",{className:"marquee-header marquee-header-1",ref:d,children:(0,b.jsx)("h1",{children:"Transmission lost in neutral space"})}),(0,b.jsx)("div",{className:"marquee-header marquee-header-2",ref:f,children:(0,b.jsx)("h1",{children:"Synthetic forms archive the signal"})})]}),(0,b.jsxs)("div",{className:"banner",children:[(0,b.jsxs)("div",{className:"banner-content",children:[(0,b.jsx)(q.default,{type:"flicker",children:(0,b.jsx)("p",{children:"[ Las dos caras ]"})}),(0,b.jsx)(q.default,{children:(0,b.jsx)("h4",{children:"Dentro y fuera de las canchas"})})]}),(0,b.jsx)("div",{className:"banner-img",children:(0,b.jsx)("img",{src:"/marquee-banner/mask-face.webp",alt:""})}),(0,b.jsx)("div",{className:"banner-logo",children:(0,b.jsx)("img",{src:"public/logo.png",alt:""})})]})]})};var t=a.i(98814);e.gsap.registerPlugin(r.ScrollTrigger,f.SplitText);var u=a.i(38246);e.gsap.registerPlugin(r.ScrollTrigger);let v=()=>{let a=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let b=a.current;if(!b)return;let c=setTimeout(()=>{let a=b.querySelector(".cta-col:nth-child(1) .cta-side-img"),c=b.querySelector(".cta-col:nth-child(3) .cta-side-img"),d=r.ScrollTrigger.create({trigger:b,start:"top bottom",end:"bottom top",scrub:1,onUpdate:b=>{let d=b.progress;e.gsap.set(a,{y:`${20-30*d}rem`}),e.gsap.set(c,{y:`${-(30*d)}rem`})}});return()=>{d.kill()}},500);return()=>{clearTimeout(c)}},[]),(0,b.jsxs)("section",{className:"cta",ref:a,children:[(0,b.jsxs)("div",{className:"container",children:[(0,b.jsxs)("div",{className:"cta-col",children:[(0,b.jsx)("div",{className:"cta-side-img",children:(0,b.jsx)("img",{src:"/bio/3.jpeg",alt:""})}),(0,b.jsx)("div",{className:"cta-col-copy",children:(0,b.jsx)(q.default,{children:(0,b.jsx)("p",{className:"bodyCopy sm",children:"Built to exist outside context, these forms prioritize neutrality, and distortion."})})})]}),(0,b.jsxs)("div",{className:"cta-col",children:[(0,b.jsx)("div",{className:"cta-header",children:(0,b.jsx)(q.default,{children:(0,b.jsx)("h5",{children:"“Llegar a River fue cumplir el sueño que tenía desde chico… y viví noches que quedan para siempre, como aquella final histórica en Madrid.” "})})}),(0,b.jsx)("div",{className:"cta-main-img",children:(0,b.jsx)("img",{src:"/bio/2.jpeg",alt:""})})]}),(0,b.jsx)("div",{className:"cta-col",children:(0,b.jsx)("div",{className:"cta-side-img",children:(0,b.jsx)("img",{src:"/bio/1.jpeg",alt:""})})})]}),(0,b.jsx)("div",{className:"container",children:(0,b.jsx)("div",{className:"cta-main-copy",children:(0,b.jsx)("div",{className:"btn",children:(0,b.jsx)(q.default,{type:"flicker",children:(0,b.jsx)(u.default,{href:"/wardrobe",children:"Enter Wardrobe"})})})})})]})};function w(a){let b=new Date(a).getTime()-Date.now();return b<=0?{days:"00",hours:"00",minutes:"00"}:{days:String(Math.floor(b/864e5)).padStart(2,"0"),hours:String(Math.floor(b%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(b%36e5/6e4)).padStart(2,"0")}}let x=({kickoff:a="2026-06-15T21:00:00+02:00",home:d="Atlético de Madrid",away:e="Real Madrid",competition:f="LaLiga",extra:g="Metropolitano"})=>{let[h,i]=(0,c.useState)(!1),[j,k]=(0,c.useState)(()=>w(a)),l=(0,c.useRef)(null),m=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let b=()=>k(w(a));b();let c=setInterval(b,1e4);return()=>clearInterval(c)},[a]),(0,c.useEffect)(()=>{let a=l.current,b=m.current;if(!a||!b)return;let c=a.getContext("2d"),d=0,e=0,f=window.devicePixelRatio||1,g=[],h=null,i=!1,j=()=>{let h=b.getBoundingClientRect();d=h.width,e=h.height,a.width=Math.floor(d*f),a.height=Math.floor(e*f),a.style.width=d+"px",a.style.height=e+"px",c.setTransform(f,0,0,f,0,0);let i=d/2,j=e/2,k=.55*d,l=.6*e;g=[];for(let a=0;a<8;a++){let b=a/8*Math.PI*2-Math.PI/2;g.push({x:i+Math.cos(b)*k,y:j+Math.sin(b)*l})}c.clearRect(0,0,d,e)};j();let k=new ResizeObserver(j);k.observe(b);let n=(a,b,d,e,f)=>{c.strokeStyle="rgba(216, 200, 245, "+f+")",c.lineWidth=.6,c.lineCap="round",c.beginPath(),c.moveTo(a,b),c.lineTo(d,e),c.stroke()},o=a=>{let f=b.getBoundingClientRect(),j=a.clientX-f.left,k=a.clientY-f.top;c.save(),c.globalCompositeOperation="destination-out",c.fillStyle="rgba(0,0,0,0.04)",c.fillRect(0,0,d,e),c.restore();let l=g.slice().sort((a,b)=>(a.x-j)*(a.x-j)+(a.y-k)*(a.y-k)-((b.x-j)*(b.x-j)+(b.y-k)*(b.y-k)));n(l[0].x,l[0].y,j,k,.55),n(l[1].x,l[1].y,j,k,.32),h&&i&&n(h.x,h.y,j,k,.7),h={x:j,y:k}},p=()=>{i=!0,h=null},q=()=>{i=!1;let a=0,b=setInterval(()=>{a++,c.save(),c.globalCompositeOperation="destination-out",c.fillStyle="rgba(0,0,0,0.18)",c.fillRect(0,0,d,e),c.restore(),a>14&&(clearInterval(b),c.clearRect(0,0,d,e))},30)};return b.addEventListener("pointerenter",p),b.addEventListener("pointermove",o),b.addEventListener("pointerleave",q),()=>{k.disconnect(),b.removeEventListener("pointerenter",p),b.removeEventListener("pointermove",o),b.removeEventListener("pointerleave",q)}},[]),(0,b.jsxs)("article",{className:`next-match${h?" is-min":""}`,ref:m,children:[(0,b.jsx)("div",{className:"watermark","aria-hidden":"true"}),(0,b.jsx)("canvas",{className:"web",ref:l,"aria-hidden":"true"}),(0,b.jsxs)("header",{className:"head",children:[(0,b.jsx)("div",{className:"eyebrow",children:"Próximo partido"}),(0,b.jsx)("button",{type:"button",className:"toggle","aria-label":h?"Expandir tarjeta":"Minimizar tarjeta","aria-expanded":!h,onClick:()=>i(a=>!a),children:(0,b.jsx)("span",{className:"bar"})})]}),(0,b.jsxs)("div",{className:"countdown","aria-live":"polite",children:[(0,b.jsxs)("div",{className:"unit",children:[(0,b.jsx)("span",{className:"n n-d",children:j.days}),(0,b.jsx)("span",{className:"u",children:"Días"})]}),(0,b.jsx)("span",{className:"sep",children:":"}),(0,b.jsxs)("div",{className:"unit",children:[(0,b.jsx)("span",{className:"n n-h",children:j.hours}),(0,b.jsx)("span",{className:"u",children:"Horas"})]}),(0,b.jsx)("span",{className:"sep",children:":"}),(0,b.jsxs)("div",{className:"unit",children:[(0,b.jsx)("span",{className:"n n-m",children:j.minutes}),(0,b.jsx)("span",{className:"u",children:"Min"})]})]}),(0,b.jsxs)("div",{className:"nm-extra",children:[(0,b.jsxs)("div",{className:"teams",children:[(0,b.jsx)("span",{className:"t home",children:d}),(0,b.jsx)("span",{className:"vs",children:"vs"}),(0,b.jsx)("span",{className:"t away",children:e})]}),(0,b.jsxs)("div",{className:"meta",children:[(0,b.jsx)("span",{className:"comp",children:f}),(0,b.jsx)("span",{className:"dot",children:"·"}),(0,b.jsx)("span",{className:"extra",children:g})]})]})]})};var y=a.i(93370);let z=()=>{let a=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let b,c,d,e,f,g=a.current;if(!g)return;let h=new j.Scene,i=new j.PerspectiveCamera(45,1,.1,100);i.position.set(0,0,5);let k=new j.WebGLRenderer({antialias:!0,alpha:!0});k.setSize(150,150),k.setPixelRatio(Math.min(devicePixelRatio,2)),k.toneMapping=j.ACESFilmicToneMapping,k.toneMappingExposure=1,g.appendChild(k.domElement);let l=new j.AmbientLight(5323149,.5);h.add(l);let m=new j.DirectionalLight(9074104,2);m.position.set(5,5,5),h.add(m);let n=new j.DirectionalLight(0xc4b5d9,1.5);n.position.set(-5,3,-5),h.add(n);let o=new j.DirectionalLight(5323149,1);o.position.set(0,-5,3),h.add(o);let p=null,q=0,r=0,s=((c=document.createElement("canvas")).width=512,c.height=512,(e=(d=c.getContext("2d")).createRadialGradient(256,256,0,256,256,256)).addColorStop(0,"#9b7fd4"),e.addColorStop(.3,"#7c5cbf"),e.addColorStop(.6,"#51398D"),e.addColorStop(1,"#3d2a6b"),d.fillStyle=e,d.fillRect(0,0,512,512),(f=new j.CanvasTexture(c)).wrapS=j.RepeatWrapping,f.wrapT=j.RepeatWrapping,f);new y.GLTFLoader().load("/home/mascara.glb",a=>{(p=a.scene).rotation.y=0,h.add(p),p.traverse(a=>{a.isMesh&&(a.material=a.material.clone(),a.material.map=s,a.material.metalness=.3,a.material.roughness=.4,a.material.envMapIntensity=.8,a.material.needsUpdate=!0)})}),window.addEventListener("scroll",()=>{q=.005*window.scrollY});let t=()=>{b=requestAnimationFrame(t),p&&(r+=(q-r)*.08,p.rotation.y=r),k.render(h,i)};return t(),()=>{cancelAnimationFrame(b),k.dispose(),g.contains(k.domElement)&&g.removeChild(k.domElement)}},[]),(0,b.jsx)("div",{ref:a,style:{position:"fixed",bottom:"0",right:"1rem",width:"150px",height:"150px",zIndex:99999,pointerEvents:"none"}})};function A(){let a=[110,200,300,420,540],c=Array.from({length:8},(a,b)=>b/7*90*Math.PI/180),d=c.map(a=>`M 0 0 L ${(588*Math.cos(a)).toFixed(1)} ${(588*Math.sin(a)).toFixed(1)}`),e=a.map(a=>{let b="";return c.forEach((d,e)=>{let f=Math.cos(d)*a,g=Math.sin(d)*a;if(0===e){b+=`M ${f.toFixed(1)} ${g.toFixed(1)}`;return}let h=(d+c[e-1])/2,i=Math.cos(h)*a*.94,j=Math.sin(h)*a*.94;b+=` Q ${i.toFixed(1)} ${j.toFixed(1)} ${f.toFixed(1)} ${g.toFixed(1)}`}),b}),f=[[2,1],[2,4],[2,6],[3,1],[3,4],[3,6]].map(([b,d])=>{let e=a[b],f=c[d];return{cx:Math.cos(f)*e,cy:Math.sin(f)*e}});return(0,b.jsxs)("svg",{viewBox:"0 0 600 600",children:[d.map((a,c)=>(0,b.jsx)("path",{className:"web-ray",d:a},`ray-${c}`)),e.map((a,c)=>(0,b.jsx)("path",{className:"web-arc",d:a},`arc-${c}`)),f.map((a,c)=>(0,b.jsx)("circle",{className:"web-dew",cx:a.cx.toFixed(1),cy:a.cy.toFixed(1),r:"1.4"},`dew-${c}`))]})}function B(){return(0,c.useEffect)(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;let a=0,b=0,c=0,d=0,e=null,f=c=>{a=(c.clientX/window.innerWidth-.5)*2,b=(c.clientY/window.innerHeight-.5)*2},g=()=>{c+=(a-c)*.06,d+=(b-d)*.06,document.documentElement.style.setProperty("--mx",c.toFixed(4)),document.documentElement.style.setProperty("--my",d.toFixed(4)),e=requestAnimationFrame(g)};return window.addEventListener("mousemove",f,{passive:!0}),e=requestAnimationFrame(g),()=>{window.removeEventListener("mousemove",f),e&&cancelAnimationFrame(e)}},[]),(0,b.jsxs)("div",{className:"hero-atmos",children:[(0,b.jsx)("span",{className:"ha-fog f1"}),(0,b.jsx)("span",{className:"ha-fog f2"}),(0,b.jsx)("span",{className:"ha-fog f3"}),(0,b.jsx)("span",{className:"ha-vignette"}),(0,b.jsx)("div",{className:"ha-halo"}),(0,b.jsx)("div",{className:"ha-webs","aria-hidden":"true",children:["tl","tr","bl","br"].map(a=>(0,b.jsx)("div",{className:`ha-corner ${a}`,children:(0,b.jsx)(A,{})},a))})]})}let C=[{name:"Toque Fino",desc:"La pelota nunca se queja. Solo vuelve.",img:"/team-cards/futbol.webp"},{name:"Gol de Media",desc:"Distancia corta, sueño largo.",img:"/team-cards/futbol.webp"},{name:"Doble Amague",desc:"El pie dice una cosa, el alma otra.",img:"/team-cards/futbol.webp"},{name:"Pase al Vacío",desc:"No hay mejor mensaje que el que se adivina.",img:"/team-cards/futbol.webp"},{name:"Jogo Bonito",desc:"Brasil lo inventó. Argentina lo vive.",img:"/team-cards/futbol.webp"},{name:"Eléctrico",desc:"La cancha se achica cuando él aparece.",img:"/team-cards/Anexo-4.webp"},{name:"Instinto",desc:"El gol no se piensa, se siente.",img:"/team-cards/Anexo 9.webp"},{name:"Eternidad",desc:"Cada partido es un recuerdo naciendo.",img:"/team-cards/Anexo 10.webp"}];function D(){return(0,b.jsxs)("section",{className:"mi-historia",children:[(0,b.jsxs)("div",{className:"mh-desktop",children:[(0,b.jsx)("div",{className:"mh-header",children:(0,b.jsx)("h1",{children:"Mi historia"})}),C.map((a,c)=>(0,b.jsxs)("div",{className:"mh-card","data-card":c,children:[(0,b.jsx)("div",{className:"mh-card-img",children:(0,b.jsx)("img",{src:a.img,alt:a.name})}),(0,b.jsxs)("div",{className:"mh-card-content",children:[(0,b.jsx)("div",{className:"mh-card-title",children:(0,b.jsx)("h6",{children:a.name})}),(0,b.jsx)("div",{className:"mh-card-desc",children:(0,b.jsx)("p",{children:a.desc})})]})]},c))]}),(0,b.jsxs)("div",{className:"mh-mobile",children:[(0,b.jsx)("div",{className:"mh-mobile-header",children:(0,b.jsx)("h1",{children:"Mi historia"})}),C.map((a,c)=>(0,b.jsxs)("div",{className:"mh-card",children:[(0,b.jsx)("div",{className:"mh-card-img",children:(0,b.jsx)("img",{src:a.img,alt:a.name})}),(0,b.jsxs)("div",{className:"mh-card-content",children:[(0,b.jsx)("div",{className:"mh-card-title",children:(0,b.jsx)("h6",{children:a.name})}),(0,b.jsx)("div",{className:"mh-card-desc",children:(0,b.jsx)("p",{children:a.desc})})]})]},c))]})]})}function E(){let[a,d]=(0,c.useState)(h),f=(0,c.useRef)(null),j=(0,c.useRef)(null),k=(0,c.useRef)(null),l=(0,c.useRef)(null),m=(0,c.useRef)(null),n=(0,c.useRef)(null);return(0,g.useGSAP)(()=>{if(!f.current||!j.current)return;e.default.set(f.current,{y:1e3}),e.default.to(f.current,{y:0,duration:.75,ease:"power3.out",delay:h?5.75:1}),e.default.to(j.current,{y:150,ease:"none",scrollTrigger:{trigger:k.current,start:"top top",end:"bottom top",scrub:!0}});let a=n.current;a&&e.default.matchMedia().add("(min-width: 1000px)",()=>{r.ScrollTrigger.refresh();let b=r.ScrollTrigger.create({trigger:a,start:"top top",end:`+=${8*window.innerHeight}px`,pin:!0,pinSpacing:!0,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:a=>{let b=a.progress;if(b<.375)e.default.set(".scroll-track .about",{x:-(b/.375*100)+"vw"}),document.documentElement.classList.remove("is-h-scroll");else{let a=(b-.375)/.625;e.default.set(".scroll-track .about",{x:"-100vw"}),document.documentElement.classList.add("is-h-scroll");let c=document.querySelector(".mh-header"),d=document.querySelectorAll(".mh-card");if(c){let b=Math.max(0,c.offsetWidth-window.innerWidth);e.default.set(c,{x:-a*b})}d.forEach((b,c)=>{let d=Math.max(0,Math.min((a-.08*c)*(c<4?1.5:2),1)),f=Math.max(0,Math.min(Math.min(d/.08,1),Math.min((1-d)/.08,1)));if(f>.001){let a=d<.5?2*d*d:1-Math.pow(-2*d+2,2)/2,g=e.default.utils.interpolate(25,-450,a),h=c%2==0?e.default.utils.interpolate(10,-5,a):e.default.utils.interpolate(50,10,a),i=e.default.utils.interpolate(15,-30,a),j=.85+.15*Math.min(d/.15,1);e.default.set(b,{xPercent:g,yPercent:h,rotation:i,opacity:f,scale:j})}else e.default.set(b,{opacity:0})})}}});return()=>b.kill()})}),(0,c.useEffect)(()=>{let a=l.current;if(!a)return;let b=a.getContext("2d"),c=window.devicePixelRatio||1,d=0,e=0,f=[],g=null,h=()=>{d=window.innerWidth,e=window.innerHeight,a.width=Math.floor(d*c),a.height=Math.floor(e*c),a.style.width=d+"px",a.style.height=e+"px",b.setTransform(c,0,0,c,0,0),b.clearRect(0,0,d,e);let g=.3*d,h=.35*e;f=[];for(let a=0;a<8;a++){let b=a/8*Math.PI*2-Math.PI/2;f.push({x:d/2+Math.cos(b)*g,y:e/2+Math.sin(b)*h})}};h(),window.addEventListener("resize",h);let i=(a,c,d,e,f)=>{b.strokeStyle="rgba(216, 200, 245, "+f+")",b.lineWidth=.6,b.lineCap="round",b.beginPath(),b.moveTo(a,c),b.lineTo(d,e),b.stroke()},j=a=>{b.save(),b.globalCompositeOperation="destination-out",b.fillStyle="rgba(0,0,0,0.04)",b.fillRect(0,0,d,e),b.restore();let c=f.slice().sort((b,c)=>(b.x-a.clientX)*(b.x-a.clientX)+(b.y-a.clientY)*(b.y-a.clientY)-((c.x-a.clientX)*(c.x-a.clientX)+(c.y-a.clientY)*(c.y-a.clientY)));i(c[0].x,c[0].y,a.clientX,a.clientY,.55),i(c[1].x,c[1].y,a.clientX,a.clientY,.32),g&&i(g.x,g.y,a.clientX,a.clientY,.7),g={x:a.clientX,y:a.clientY}};return document.addEventListener("pointermove",j),()=>{window.removeEventListener("resize",h),document.removeEventListener("pointermove",j)}},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i,{onAnimationComplete:()=>{d(!1)}}),(0,b.jsxs)("section",{className:"hero",ref:k,children:[(0,b.jsx)(B,{}),(0,b.jsx)(o,{color1:"#51398D",color2:"#7c5cbf",color3:"#3d2a6b",color4:"#9b7fd4",colorIntensity:.4,softness:2}),(0,b.jsxs)("div",{className:"container",children:[(0,b.jsx)("div",{className:"hero-header",ref:j,children:(0,b.jsxs)(q.default,{animateOnScroll:!1,delay:h?5.5:.65,children:[(0,b.jsx)("span",{className:"hero-name hero-name--julian",children:"Julián"}),(0,b.jsx)("span",{className:"hero-name hero-name--alvarez",ref:m,children:"Alvarez"})]})}),(0,b.jsx)("canvas",{className:"hero-alvarez-canvas",ref:l,"aria-hidden":"true"})]}),(0,b.jsx)("div",{className:"hero-img",ref:f,children:(0,b.jsx)("img",{src:"/home/test.png",alt:""})}),(0,b.jsxs)("div",{className:"section-footer",children:[(0,b.jsx)(q.default,{type:"flicker",delay:h?7.5:.65,animateOnScroll:!1,children:(0,b.jsx)("p",{children:"El increíble hombre araña"})}),(0,b.jsx)(q.default,{type:"flicker",delay:h?7.5:.65,animateOnScroll:!1,children:(0,b.jsx)("p",{children:"Model v.23"})})]})]}),(0,b.jsx)(x,{}),(0,b.jsx)(z,{}),(0,b.jsxs)("div",{className:"scroll-track",ref:n,children:[(0,b.jsxs)("section",{className:"about",children:[(0,b.jsx)("div",{className:"container",children:(0,b.jsxs)("div",{className:"about-copy",children:[(0,b.jsx)(q.default,{children:(0,b.jsxs)("h3",{children:['"Sigan soñando.',(0,b.jsx)("br",{}),'Con trabajo, sacrificio y siendo buenas personas, los sueños se acercan cada día."']})}),(0,b.jsx)("div",{className:"about-icon",children:(0,b.jsx)(p.default,{})})]})}),(0,b.jsx)("div",{className:"section-footer light",children:(0,b.jsx)(q.default,{type:"flicker",children:(0,b.jsx)("p",{children:"/ Core State /"})})})]}),(0,b.jsx)(D,{})]}),(0,b.jsx)(s,{}),(0,b.jsx)(t.default,{}),(0,b.jsx)(v,{})]})}e.default.registerPlugin(r.ScrollTrigger),a.s(["default",()=>E],85690)}];

//# sourceMappingURL=src_app_page_e6bfee3a.js.map