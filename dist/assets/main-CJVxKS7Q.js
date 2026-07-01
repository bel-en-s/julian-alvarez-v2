import{g as r,S as B}from"./menu-BX5mmxiu.js";/* empty css             *//* empty css             *//* empty css                     */import{S as ce}from"./SplitText-Cpc1cBKW.js";import{i as yt}from"./anime-hAHJP90b.js";import{O as wt,W as bt,a as Je,F as Ke,R as Ze,L as Fe,S as et,V as xt,b as tt,c as Pe,P as St,M as ot}from"./three.module-FvbYFgPc.js";r.registerPlugin(B);function Mt(e){const i=new Date(e).getTime()-Date.now();return i<=0?{days:"00",hours:"00",minutes:"00",seconds:"00"}:{days:String(Math.floor(i/864e5)).padStart(2,"0"),hours:String(Math.floor(i%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(i%36e5/6e4)).padStart(2,"0"),seconds:String(Math.floor(i%6e4/1e3)).padStart(2,"0")}}const Et={kickoff:new Date(Date.now()+4*864e5),home:"Atlético de Madrid",away:"Real Madrid",competition:"LaLiga",extra:"Metropolitano",startMinimized:!1,container:null};function At(e){const i=document.createElement("article");return i.className="next-match"+(e.startMinimized?" is-min":""),i.innerHTML=`
    <div class="watermark" aria-hidden="true"></div>
    <canvas class="web" aria-hidden="true"></canvas>

    <header class="head">
      <div class="eyebrow">Próximo partido</div>
      <button type="button" class="toggle"
              aria-label="${e.startMinimized?"Ampliar tarjeta":"Minimizar tarjeta"}"
              aria-expanded="${e.startMinimized?"false":"true"}">
        <span class="bar"></span>
      </button>
    </header>

    <div class="countdown" aria-live="polite">
      <div class="unit">
        <span class="n n-d">00</span>
        <span class="u">Días</span>
      </div>
      <span class="sep">:</span>
      <div class="unit">
        <span class="n n-h">00</span>
        <span class="u">Horas</span>
      </div>
      <span class="sep">:</span>
      <div class="unit">
        <span class="n n-m">00</span>
        <span class="u">Min</span>
      </div>
      <span class="sep">:</span>
      <div class="unit">
        <span class="n n-s">00</span>
        <span class="u">Seg</span>
      </div>
    </div>

    <div class="nm-extra">
      <div class="teams">
        <span class="t home">${e.home}</span>
        <span class="vs">vs</span>
        <span class="t away">${e.away}</span>
      </div>
      <div class="meta">
        <span class="comp">${e.competition}</span>
        <span class="dot">·</span>
        <span class="extra">${e.extra}</span>
      </div>
    </div>
  `,i}function Ct(e,i){const o=i.getContext("2d");let t=0,n=0;const d=window.devicePixelRatio||1;let A=[],b=null,C=!1;function F(){const v=e.getBoundingClientRect();t=v.width,n=v.height,i.width=Math.floor(t*d),i.height=Math.floor(n*d),i.style.width=t+"px",i.style.height=n+"px",o.setTransform(d,0,0,d,0,0);const g=t/2,f=n/2,m=t*.55,l=n*.6;A=[];for(let S=0;S<8;S++){const k=S/8*Math.PI*2-Math.PI/2;A.push({x:g+Math.cos(k)*m,y:f+Math.sin(k)*l})}o.clearRect(0,0,t,n)}F();const x=new ResizeObserver(F);x.observe(e);function w(v,g,f,m,l){o.strokeStyle="rgba(216, 200, 245, "+l+")",o.lineWidth=.6,o.lineCap="round",o.beginPath(),o.moveTo(v,g),o.lineTo(f,m),o.stroke()}function h(v){const g=e.getBoundingClientRect(),f=v.clientX-g.left,m=v.clientY-g.top;o.save(),o.globalCompositeOperation="destination-out",o.fillStyle="rgba(0,0,0,0.04)",o.fillRect(0,0,t,n),o.restore();const l=A.slice().sort((S,k)=>(S.x-f)*(S.x-f)+(S.y-m)*(S.y-m)-((k.x-f)*(k.x-f)+(k.y-m)*(k.y-m)));w(l[0].x,l[0].y,f,m,.55),w(l[1].x,l[1].y,f,m,.32),b&&C&&w(b.x,b.y,f,m,.7),b={x:f,y:m}}function c(){C=!0,b=null}function u(){C=!1;let v=0;const g=setInterval(()=>{v++,o.save(),o.globalCompositeOperation="destination-out",o.fillStyle="rgba(0,0,0,0.18)",o.fillRect(0,0,t,n),o.restore(),v>14&&(clearInterval(g),o.clearRect(0,0,t,n))},30)}return window.innerWidth>=1e3&&(e.addEventListener("pointerenter",c),e.addEventListener("pointermove",h),e.addEventListener("pointerleave",u)),()=>{x.disconnect(),window.innerWidth>=1e3&&(e.removeEventListener("pointerenter",c),e.removeEventListener("pointermove",h),e.removeEventListener("pointerleave",u))}}function kt(e){const i=Object.assign({},Et,e||{}),o=i.kickoff instanceof Date?i.kickoff:new Date(i.kickoff),t=At(i);(i.container||document.body).appendChild(t);let n=i.startMinimized;const d=t.querySelector(".toggle"),A=t.querySelector(".n-d"),b=t.querySelector(".n-h"),C=t.querySelector(".n-m"),F=t.querySelector(".n-s");d.addEventListener("click",()=>{n=!n,t.classList.toggle("is-min",n),d.setAttribute("aria-expanded",n?"false":"true"),d.setAttribute("aria-label",n?"Ampliar tarjeta":"Minimizar tarjeta"),r.to(t,{scale:n?.92:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"})});function x(){const c=Mt(o);A.textContent=c.days,b.textContent=c.hours,C.textContent=c.minutes,F.textContent=c.seconds}x();const w=setInterval(x,1e3),h=Ct(t,t.querySelector(".web"));return B.create({trigger:".hero",start:"bottom top",onLeave:()=>{n||(n=!0,t.classList.add("is-min"),d.setAttribute("aria-expanded","false"),d.setAttribute("aria-label","Ampliar tarjeta"),r.to(t,{scale:.92,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))},onEnter:()=>{n&&(n=!1,t.classList.remove("is-min"),d.setAttribute("aria-expanded","true"),d.setAttribute("aria-label","Minimizar tarjeta"),r.to(t,{scale:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))}}),{element:t,minimize(){n||d.click()},expand(){n&&d.click()},destroy(){clearInterval(w),h(),t.remove()}}}window.NextMatch={mount:kt};r.registerPlugin(B);(function(){const e=document.getElementById("df-stage");if(!e)return;const i=e.closest(".dentro-fuera"),o=document.getElementById("df-banner"),t=e.querySelector(".df-blobs"),n=e.querySelector(".df-smudge"),d="http://www.w3.org/2000/svg",A=e.querySelector(".df-grain");if(A){const s=document.createElementNS(d,"defs"),a=document.createElementNS(d,"filter");a.id="df-noise";const p=document.createElementNS(d,"feTurbulence");p.setAttribute("type","fractalNoise"),p.setAttribute("baseFrequency","0.85"),p.setAttribute("numOctaves","2"),p.setAttribute("stitchTiles","stitch"),a.appendChild(p);const T=document.createElementNS(d,"feColorMatrix");T.setAttribute("type","saturate"),T.setAttribute("values","0"),a.appendChild(T),s.appendChild(a),A.prepend(s)}function b(s){return function(){s|=0,s=s+1831565813|0;var a=Math.imul(s^s>>>15,1|s);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function C(s,a){for(var p=a.hx,T=a.hy,M=a.sx,W=a.sy,N=a.N,E=a.maxR,Y=a.factor,X=a.start,z=b(a.seed),O=function(ae){return(z()*2-1)*ae},J=2.6+(a.irreg||0)*7,ue=[],re=[],de=0;de<N;de++){var Ne=4+82*(de/(N-1)),be=(Ne+O(J))*Math.PI/180;ue.push([Math.cos(be),Math.sin(be)]),re.push(1+O(.13*(a.irreg||0)))}var le=function(ae,j){return[(p+M*j*ue[ae][0]).toFixed(1),(T+W*j*ue[ae][1]).toFixed(1)]};ue.forEach(function(ae,j){var Ae=E*re[j]*(.86+z()*.2),ne=document.createElementNS(d,"line");ne.setAttribute("x1",p),ne.setAttribute("y1",T);var Ce=le(j,Ae);ne.setAttribute("x2",Ce[0]),ne.setAttribute("y2",Ce[1]),ne.setAttribute("class","spoke"),ne.setAttribute("stroke-width",(.7+z()*.35).toFixed(2)),s.appendChild(ne)});for(var xe=[],ye=X;ye<E*.96;)xe.push(ye),ye*=Y+z()*.08;xe.forEach(function(ae){for(var j=0;j<N-1;j++)if(!(z()<.06+(a.irreg||0)*.1)){var Ae=.05+(a.irreg||0)*.13,ne=ae*re[j]*(1+O(Ae)),Ce=ae*re[j+1]*(1+O(Ae)),ke=le(j,ne),Le=le(j+1,Ce),Ge=(+ke[0]+ +Le[0])/2,je=(+ke[1]+ +Le[1])/2,Qe=.06+z()*.06+O(.06*(a.irreg||0)),vt=(Ge+(p-Ge)*Qe).toFixed(1),gt=(je+(T-je)*Qe).toFixed(1),Te=document.createElementNS(d,"path");Te.setAttribute("d","M"+ke[0]+" "+ke[1]+" Q"+vt+" "+gt+" "+Le[0]+" "+Le[1]),Te.setAttribute("class",z()<.1?"glint":"capture"),Te.setAttribute("stroke-width",(.55+z()*.3).toFixed(2)),s.appendChild(Te)}});for(var fe=0;fe<2;fe++){var me=1+fe*3,Xe=E*(.74+fe*.12),Se=le(me,Xe),Me=le(Math.min(me+3,N-1),Xe*1.02),Ve=(+Se[0]+ +Me[0])/2,_e=(+Se[1]+ +Me[1])/2,ht=(Ve+(p-Ve)*.04).toFixed(1),pt=(_e+(T-_e)*.04).toFixed(1),Ee=document.createElementNS(d,"path");Ee.setAttribute("d","M"+Se[0]+" "+Se[1]+" Q"+ht+" "+pt+" "+Me[0]+" "+Me[1]),Ee.setAttribute("class","frame-thread"),Ee.setAttribute("stroke-width","0.9"),s.appendChild(Ee)}}var F=e.querySelector(".df-web-tl"),x=e.querySelector(".df-web-br");F&&C(F,{hx:0,hy:0,sx:1,sy:1,seed:7,N:9,maxR:900,factor:1.3,start:52,irreg:.22}),x&&C(x,{hx:1366,hy:768,sx:-1,sy:-1,seed:41,N:12,maxR:660,factor:1.24,start:40,irreg:.92}),function(){var s=e.querySelector(".df-dots");if(s){for(var a=b(91),p=1366,T=768,M=[],W=0;W<14;W++){var N=a()*p,E=a()*T*.92;M.push([N,E]);var Y=document.createElementNS(d,"circle");Y.setAttribute("cx",N.toFixed(1)),Y.setAttribute("cy",E.toFixed(1)),Y.setAttribute("r",(a()*1.1+.6).toFixed(2)),Y.setAttribute("class","dot"),s.appendChild(Y)}for(var W=0;W<M.length;W++)for(var X=W+1;X<M.length;X++){var z=M[W][0]-M[X][0],O=M[W][1]-M[X][1];if(Math.hypot(z,O)<150&&a()<.25){var J=document.createElementNS(d,"line");J.setAttribute("x1",M[W][0].toFixed(1)),J.setAttribute("y1",M[W][1].toFixed(1)),J.setAttribute("x2",M[X][0].toFixed(1)),J.setAttribute("y2",M[X][1].toFixed(1)),J.setAttribute("class","dot-link"),s.appendChild(J)}}}}(),function(){var s=e.querySelector(".df-rings");if(s)for(var a=70;a<440;){var p=document.createElementNS(d,"circle");p.setAttribute("cx",450),p.setAttribute("cy",450),p.setAttribute("r",a),p.setAttribute("stroke-width",(.6+Math.random()*.4).toFixed(2)),s.appendChild(p),a*=1.34}}();var w=null;function h(){var s=Math.min(innerWidth/1366,innerHeight/768);!s||!isFinite(s)||s<=0||(e.style.transform="scale("+s+")")}if(window.addEventListener("resize",function(){w&&cancelAnimationFrame(w),w=requestAnimationFrame(h)}),h(),!o||!t||!n)return;var c=window.innerWidth<1e3,u={x:0,y:0},v={x:0,y:0},g=!1,f=null,m=[],l=c?60:120,S=0,k=c?40:12,y={smoothing:c?.2:.1,threshold:c?.3:.01,sizeFromSpeed:c?.15:.2,expandMultiplier:2.5,expandTime:900,dissolveStart:700,dissolveTime:1200,burstRadius:c?10:16};function L(s,a,p){if(p||(p=y.burstRadius),!(m.length>=l)){var T=performance.now();if(!(T-S<k)){S=T;var M=document.createElementNS(d,"circle");M.setAttribute("cx",s),M.setAttribute("cy",a),M.setAttribute("r",p),M.setAttribute("fill","#fff"),t.prepend(M),m.push({el:M,start:T,radius:p})}}}function P(s,a){for(var p=c?[8,12,6,10,5,8,7,10,9,7]:[13,18,10,16,8,14,12,17,15,11],T=c?[[0,0],[-8,-5],[8,-4],[-5,8],[5,5],[-10,3],[4,-8],[-4,-9],[9,4],[-6,-3]]:[[0,0],[-12,-8],[12,-6],[-8,10],[8,8],[-14,4],[6,-12],[-5,-14],[14,6],[-9,-4]],M=0;M<p.length;M++)L(s+T[M][0],a+T[M][1],p[M])}function R(){for(m.length=0;t.firstChild;)t.removeChild(t.firstChild)}function D(s,a){var p=o.getBoundingClientRect();return{x:s-p.left,y:a-p.top}}function I(s){var a=D(s.clientX,s.clientY);if(!g){u.x=v.x=a.x,u.y=v.y=a.y,g=!0;return}u.x=a.x,u.y=a.y}function te(s){I(s)}function ie(s){var a=D(s.clientX,s.clientY);P(a.x,a.y)}o.addEventListener("mousemove",te),o.addEventListener("click",ie);function Q(s){var a=s.touches?s.touches[0]:s.changedTouches[0];if(a){var p=D(a.clientX,a.clientY);if(!g){u.x=v.x=p.x,u.y=v.y=p.y,g=!0;return}u.x=p.x,u.y=p.y}}o.addEventListener("touchmove",Q,{passive:!0}),o.addEventListener("touchstart",Q,{passive:!0});function oe(s){if(g){v.x+=(u.x-v.x)*y.smoothing,v.y+=(u.y-v.y)*y.smoothing;var a=Math.hypot(u.x-v.x,u.y-v.y);a>y.threshold&&L(v.x,v.y,a*y.sizeFromSpeed)}for(var p=y.expandTime,T=y.dissolveStart,M=T+y.dissolveTime,W=y.expandMultiplier,N=m.length-1;N>=0;N--){var E=m[N],Y=s-E.start;if(Y>=M){E.el.parentNode&&E.el.parentNode.removeChild(E.el),m.splice(N,1);continue}var X=E.radius;if(Y<p){var z=Y/p;z=z<.5?2*z*z:-1+(4-2*z)*z,X=E.radius+(E.radius*W-E.radius)*z}if(Y>=T){var O=(Y-T)/y.dissolveTime;O=O*O*O,X*=1-Math.min(O,1)}E.el.setAttribute("r",Math.max(0,X))}f=requestAnimationFrame(oe)}f=requestAnimationFrame(oe);function se(){var s=o.getBoundingClientRect();n.setAttribute("viewBox","0 0 "+s.width+" "+s.height),n.style.width=s.width+"px",n.style.height=s.height+"px"}se(),window.addEventListener("resize",se);var _=document.getElementById("df-dentro"),q=document.getElementById("df-fuera");function U(s){s?e.setAttribute("data-side",s):e.removeAttribute("data-side")}_&&(_.addEventListener("mouseenter",function(){U("dentro"),R()}),_.addEventListener("mouseleave",function(){U(null)}),_.addEventListener("focus",function(){U("dentro")}),_.addEventListener("blur",function(){U(null)})),q&&(q.addEventListener("mouseenter",function(){U("fuera")}),q.addEventListener("mouseleave",function(){U(null)}),q.addEventListener("focus",function(){U("fuera")}),q.addEventListener("blur",function(){U(null)}));var G=e.querySelectorAll(".df-lockup"),H=e.querySelector(".df-hint"),$=e.querySelectorAll(".df-web, .df-rings, .df-dots");r.set(o,{opacity:0,scale:.92}),r.set(G,{opacity:0,y:30}),r.set($,{opacity:0}),r.set(H,{opacity:0}),B.create({trigger:i,start:"top 85%",once:!0,onEnter:function(){var s=r.timeline({defaults:{ease:"power3.out"}});s.to($,{opacity:1,duration:.6},0),s.to(o,{opacity:1,scale:1,duration:.9},0),s.to(G,{opacity:1,y:0,duration:.7,stagger:.15},.15),s.to(H,{opacity:1,duration:.5},.5)}}),i&&window.innerWidth>=1e3&&B.create({trigger:i,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:s=>{document.documentElement.style.setProperty("--df-lockup-scale",1+s.progress*.15)}}),window.addEventListener("beforeunload",function(){o.removeEventListener("mousemove",te),o.removeEventListener("click",ie),o.removeEventListener("touchmove",Q),o.removeEventListener("touchstart",Q),window.removeEventListener("resize",se),f&&cancelAnimationFrame(f),m.length=0})})();function rt(e=!1){const i=document.querySelectorAll(".hero-name");if(i.length)if(window.innerWidth>=1e3){const t=[];i.forEach(n=>{const d=new ce(n,{type:"chars",charsClass:"hero-char"});t.push(...d.chars)}),r.set(t,{y:()=>-(window.innerHeight+200),visibility:"visible"}),r.to(t,{y:0,duration:.8,stagger:.04,delay:e?.5:0,ease:"power4.out",onComplete:()=>{r.set(t,{clearProps:"transform"})}})}else r.fromTo(i,{opacity:0,y:40,visibility:"visible"},{opacity:1,y:0,duration:.8,stagger:.15,delay:e?.5:0,ease:"power3.out"});const o=document.querySelector(".hero-header-img");o&&window.innerWidth>=1e3?(e&&(o.style.animationDelay="0.5s"),o.classList.add("hero-header-img--enter"),o.addEventListener("animationend",()=>{o.classList.remove("hero-header-img--enter"),o.style.animationDelay="",o.style.transform="translateY(0)"},{once:!0})):o&&r.fromTo(o,{y:"100%",opacity:0},{y:"0%",opacity:1,duration:.8,delay:e?.6:.1,ease:"power2.out",onComplete:()=>{o.style.transform="translateY(0)"}}),r.set(".hero .hero-cards .card",{transformOrigin:"center center"}),r.to(".hero .hero-cards .card",{scale:1,duration:.8,delay:.1,stagger:.05,ease:"power4.out",onComplete:()=>{r.set("#hero-card-1",{transformOrigin:"top right"}),r.set("#hero-card-3",{transformOrigin:"top left"})}})}document.addEventListener("DOMContentLoaded",()=>{r.registerPlugin(B,ce),document.addEventListener("preloader:complete",()=>{rt(!1),B.refresh()},{once:!0}),sessionStorage.getItem("ja_preloader_shown")==="1"&&rt(!0),yt();const e=document.querySelector(".about"),i=document.querySelector(".slide-description h1"),o=document.querySelector(".slide-title h1");if(e&&(window.innerWidth>=1e3&&B.create({trigger:e,start:"top top",end:"+=800",pin:!0,scrub:!0,onUpdate:c=>{document.documentElement.style.setProperty("--video-scale",1+c.progress*.2)}}),[i,o].forEach(c=>{c&&ce.create(c,{type:"words",wordsClass:"about-word"})}),document.querySelectorAll(".slide-title .about-word").forEach(c=>{c.textContent.trim().toLowerCase().includes("soñando")&&c.classList.add("about-word--textured")}),i||o))if(window.innerWidth>=1e3)r.to(".about-word",{"--highlight-offset":"100%",stagger:.4,scrollTrigger:{trigger:".about",scrub:1,start:"top top",end:"+=800"}});else{const c=document.querySelector(".about-video-wrapper");c&&r.fromTo(c,{scale:.8,opacity:0},{scale:1,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".about",start:"top 90%",once:!0}}),r.fromTo(".about-word",{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.15,ease:"power2.out",scrollTrigger:{trigger:".about",start:"top 80%",once:!0}})}const t=document.querySelector(".row--video-gray");if(t&&window.innerWidth>=1e3){B.create({trigger:t,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:c=>{document.documentElement.style.setProperty("--video-gray-scale",1+c.progress*.2)}});const h=t.querySelectorAll(".video-quote h2, .video-quote p");h.length&&r.fromTo(h,{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.3,ease:"none",scrollTrigger:{trigger:t,scrub:1,start:"top bottom",end:"bottom top"}})}const n=h=>h*h*(3-2*h);window.innerWidth>1e3&&(B.create({trigger:".home-services",start:"top top",end:`+=${window.innerHeight*4}px`,pin:".home-services",pinSpacing:!0}),B.create({trigger:".home-services",start:"top bottom",end:`+=${window.innerHeight*4}`,scrub:1,onUpdate:h=>{const c=h.progress,u=r.utils.clamp(0,1,c/.9),v=r.utils.interpolate("300%","0%",n(u));r.set(".home-services-header",{y:v}),["#card-1","#card-2","#card-3"].forEach((g,f)=>{const m=f*.5,l=r.utils.clamp(0,1,(c-m*.1)/(.9-m*.1)),S=document.querySelector(`${g} .flip-card-inner`);let k;if(l<.4){const I=l/.4;k=r.utils.interpolate("-100%","50%",n(I))}else if(l<.6){const I=(l-.4)/.2;k=r.utils.interpolate("50%","0%",n(I))}else k="0%";let y;if(l<.4){const I=l/.4;y=r.utils.interpolate(.25,.75,n(I))}else if(l<.6){const I=(l-.4)/.2;y=r.utils.interpolate(.75,1,n(I))}else y=1;let L;if(l<.2){const I=l/.2;L=n(I)}else L=1;let P,R,D;if(l<.6)P=f===0?"100%":f===1?"0%":"-100%",R=f===0?-5:f===1?0:5,D=0;else if(l<1){const I=(l-.6)/.4;P=r.utils.interpolate(f===0?"100%":f===1?"0%":"-100%","0%",n(I)),R=r.utils.interpolate(f===0?-5:f===1?0:5,0,n(I)),D=n(I)*180}else P="0%",R=0,D=180;r.set(g,{opacity:L,y:k,x:P,rotate:R,scale:y}),r.set(S,{rotationY:D})})}}));const d=document.querySelector(".home-spotlight-images");if(d){const h=d.offsetHeight,c=window.innerHeight,u=h*.05,v=h+u+c,g=document.querySelector(".spotlight-mask-header h3");let f=null;g&&(f=ce.create(g,{type:"words",wordsClass:"spotlight-word"}),r.set(f.words,{opacity:0})),B.create({trigger:".home-spotlight",start:"top top",end:`+=${window.innerHeight*7}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:m=>{const l=m.progress;if(l<=.5){const y=l/.5,L=5,P=-(v/h)*100,R=L+(P-L)*y;r.set(d,{y:`${R}%`})}const S=document.querySelector(".spotlight-mask-image-container"),k=document.querySelector(".spotlight-mask-image");if(S&&k)if(l>=.25&&l<=.75){const y=(l-.25)/.5,L=`${y*475}%`,P=1.25-y*.25;S.style.setProperty("-webkit-mask-size",L),S.style.setProperty("mask-size",L),r.set(k,{scale:P})}else l<.25?(S.style.setProperty("-webkit-mask-size","0%"),S.style.setProperty("mask-size","0%"),r.set(k,{scale:1.25})):l>.75&&(S.style.setProperty("-webkit-mask-size","475%"),S.style.setProperty("mask-size","475%"),r.set(k,{scale:1}));if(f&&f.words.length>0)if(l>=.75&&l<=.95){const y=(l-.75)/.2,L=f.words.length;f.words.forEach((P,R)=>{const D=R/L;y>=D?r.set(P,{opacity:1}):r.set(P,{opacity:0})})}else l<.75?r.set(f.words,{opacity:0}):l>.95&&r.set(f.words,{opacity:1})}})}const A=document.querySelector(".outro h3");let b=null;A&&(b=ce.create(A,{type:"words",wordsClass:"outro-word"}),r.set(b.words,{opacity:0}));const C=document.querySelectorAll(".outro-strip"),F=[.3,.4,.25,.35,.2,.25];if(B.create({trigger:".outro",start:"top top",end:`+=${window.innerHeight*3}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:h=>{const c=h.progress;if(b&&b.words.length>0)if(c>=.25&&c<=.75){const u=(c-.25)/.5,v=b.words.length;b.words.forEach((g,f)=>{const m=f/v;u>=m?r.set(g,{opacity:1}):r.set(g,{opacity:0})})}else c<.25?r.set(b.words,{opacity:0}):c>.75&&r.set(b.words,{opacity:1})}}),B.create({trigger:".outro",start:"top bottom",end:`+=${window.innerHeight*6}px`,scrub:1,onUpdate:h=>{const c=h.progress;C.forEach((u,v)=>{if(F[v]!==void 0){const g=F[v],f=c*100*g;r.set(u,{x:`${f}%`})}})}}),document.querySelector(".work-items")&&B.refresh(),window.innerWidth>=1e3&&document.querySelector(".work-header")){r.set(".work-header-arrow-icon",{scale:0});const h=ce.create(".work-header-content p",{type:"lines",mask:"lines"}),c=ce.create(".work-header-title h1",{type:"lines",mask:"lines"});r.set([h.lines,c.lines],{y:"120%"});const u=r.timeline({delay:.75});u.to(h.lines,{y:"0%",duration:1,ease:"power4.out"},"-=0.9"),u.to(c.lines,{y:"0%",duration:1,ease:"power4.out",stagger:.1},"-=0.9"),u.to(".work-header-arrow-icon",{scale:1,duration:.75,ease:"power4.out"},"-=0.9")}if(window.innerWidth>=1e3){const h=[-200,-280,-150,-320,-220,-180,-300,-160,-260,-350].map(function(u){return u*.15}),c=[.2,.5,.8,.35,.65,.95,.3,.55,.85,.4];r.utils.toArray(".work-items .work-item-img").forEach((u,v)=>{const g=u.querySelector("img"),f=u.querySelector("video"),m=g?.getAttribute("src")||"";if(f||m.includes("/bio/1.webp")||m.includes("Anexo 9")||m.includes("Anexo 6")||m.includes("Anexo 8"))return;let l=h[v%h.length];m.includes("Anexo 11")&&(l=Math.abs(l)*2),m.includes("Anexo 5")&&(l=-Math.abs(l)*12),m.includes("Anexo 7")&&(l=-Math.abs(l)*12),m.includes("/bio/4.webp")&&(l=-Math.abs(l)),m.includes("/bio/3.webp")&&(l=Math.abs(l)*1.5),m.includes("/bio/2.webp")&&(l=Math.abs(l)),u.classList.contains("work-item-img--bio3")&&(l=Math.abs(l));const S=c[v%c.length];r.to(u,{y:l,ease:"none",scrollTrigger:{trigger:u,start:"top bottom",end:"bottom top",scrub:S}});const y=u.closest(".work-item").querySelector(".work-item-content");y&&!y.classList.contains("no-parallax")&&r.to(y,{y:l*.7,ease:"none",scrollTrigger:{trigger:u,start:"top 85%",end:"bottom top",scrub:Math.min(S*2,1.5)}})}),r.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach(u=>{u.classList.contains("no-parallax")||r.to(u,{y:-30,ease:"none",scrollTrigger:{trigger:u.closest(".row"),start:"top bottom",end:"bottom top",scrub:1}})})}const x=document.getElementById("mi-historia-text");if(x&&window.innerWidth>=1e3){const h=x.textContent;x.textContent="";const c=x.closest(".behind-the-lock");if(c){const u=new IntersectionObserver(v=>{v.forEach(g=>{if(g.isIntersecting&&g.intersectionRatio>.3){const f=r.timeline();h.split("").forEach((m,l)=>{f.call(()=>{x.textContent+=m},[],l*.05)}),u.unobserve(g.target)}})},{threshold:[0,.1,.3,.5]});u.observe(c)}}const w=document.querySelector(".btl-header-text");w&&(r.set(w,{opacity:0,y:30}),r.to(w,{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:w,start:"top bottom",end:"top 30%",scrub:1}})),Lt()});function Lt(){const e=document.querySelector(".work-timeline"),i=e?.querySelector(".work-timeline-progress"),o=document.querySelector(".work-items");if(!e||!i||!o)return;const t=document.createElement("div");t.style.position="absolute",t.style.left="50%",t.style.top="0",t.style.width="60px",t.style.height="60px",t.style.transform="translate(-50%, -50%)",t.style.pointerEvents="none",t.style.zIndex="3",t.style.filter="drop-shadow(0 0 4px rgba(216,200,245,.4))",e.appendChild(t);const n="http://www.w3.org/2000/svg",d=document.createElementNS(n,"svg");d.setAttribute("viewBox","-30 -30 60 60"),d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.style.display="block",d.style.opacity="1",t.appendChild(d);const A=document.createElementNS(n,"defs");A.innerHTML=`<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`,d.appendChild(A);const b=[];for(let y=0;y<8;y++){const L=document.createElementNS(n,"path");L.setAttribute("class","s-leg"),d.appendChild(L),b.push(L)}const C=document.createElementNS(n,"g");C.innerHTML='<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/><ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/><path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/><path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>',d.appendChild(C);const F=[{side:1,fore:5.2,reach:12,phase:0},{side:1,fore:1.4,reach:14,phase:.5},{side:1,fore:-2.2,reach:14,phase:0},{side:1,fore:-5.6,reach:12,phase:.5},{side:-1,fore:5.2,reach:12,phase:.5},{side:-1,fore:1.4,reach:14,phase:0},{side:-1,fore:-2.2,reach:14,phase:.5},{side:-1,fore:-5.6,reach:12,phase:0}],x=8.6,w=9.2,h=13,c=.6,u=3.4,v=1.6;let g=0,f=0;function m(y){const L=y-f;f=y,g+=L*280;const P=-8+y*116,R=0,D=1,I=1,te=0,ie=Math.sin(2*Math.PI*(g/h))*.5,Q=I*(v+ie),oe=0,se=Math.atan2(D,R)*180/Math.PI;C.setAttribute("transform",`translate(${Q.toFixed(2)} ${oe.toFixed(2)}) rotate(${se.toFixed(1)})`);for(let _=0;_<8;_++){const q=F[_],U=Q+R*q.fore*.45+I*q.side*1.7,G=oe+D*q.fore*.45+te*q.side*1.7,H=Q+R*q.fore+I*q.side*q.reach,$=oe+D*q.fore+te*q.side*q.reach,s=(g/h+q.phase)%1;let a,p;if(s<c)a=(.5-s/c)*h,p=0;else{const me=(s-c)/(1-c);a=(me-.5)*h,p=Math.sin(me*Math.PI)*u}const T=H+R*a-(H-U)/q.reach*p,M=$+D*a-($-G)/q.reach*p;let W=T-U,N=M-G,E=Math.hypot(W,N);const Y=x+w-.2,X=Math.abs(x-w)+.2;E>Y&&(E=Y),E<X&&(E=X);const z=W/(Math.hypot(W,N)||1),O=N/(Math.hypot(W,N)||1),J=z*E,ue=O*E,re=(E*E+x*x-w*w)/(2*E),de=Math.sqrt(Math.max(0,x*x-re*re))*q.side,Ne=-O,be=z,le=U+z*re+Ne*de,xe=G+O*re+be*de,ye=U+J,fe=G+ue;b[_].setAttribute("d",`M${U.toFixed(1)} ${G.toFixed(1)} L${le.toFixed(1)} ${xe.toFixed(1)} L${ye.toFixed(1)} ${fe.toFixed(1)}`)}t.style.top=P+"%"}const l=2809;e.style.height=l+"px",e.style.bottom="auto";const S=o.querySelectorAll(".row--first")[1],k=S?S.offsetTop+S.offsetHeight:l;B.create({trigger:o,start:"top 85%",end:"bottom bottom",scrub:!0,onUpdate:y=>{const P=y.progress*l,R=Math.min(P/k,1);i.style.height=R*100+"%",m(R),t.style.display="block"}})}const nt=.15,We=document.querySelector(".about-video-wrapper"),V=We?.querySelector("video");if(V&&We){let e="muted",i=0,o=!1;const t=We.querySelector(".video-play-btn"),n=We.querySelector(".video-sound-btn"),d='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',A='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>',C='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>',F='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';V.muted=!0,V.play().catch(()=>{});const x=()=>{V.paused?(V.play(),t&&(t.innerHTML=d)):(V.pause(),t&&(t.innerHTML=A))},w=()=>{if(V.volume>0)i=V.volume,r.to(V,{volume:0,duration:.2,ease:"power2.out",onComplete:()=>{e="muted",n&&(n.innerHTML=b)}});else{const u=i>0?i:nt;V.muted=!1,i=u,r.to(V,{volume:u,duration:.3,ease:"power2.out"}),e=u===nt?"low":"high",n&&(n.innerHTML=e==="low"?C:F)}},h=()=>{o=!0,x()},c=()=>{if(o){o=!1;return}x()};V.addEventListener("touchstart",h),V.addEventListener("click",c),t&&t.addEventListener("click",u=>{u.stopPropagation(),x()}),n&&n.addEventListener("click",u=>{u.stopPropagation(),w()})}const Z=document.createElement("canvas");Z.id="cursor-web";Z.setAttribute("aria-hidden","true");Object.assign(Z.style,{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"3",display:"block"});document.body.prepend(Z);const K=Z.getContext("2d"),qe=window.devicePixelRatio||1;let pe=0,ve=0,Ye=[],ge=null,we=null;const it=1900,st=1400;let ee=[];const ft=()=>{pe=window.innerWidth,ve=window.innerHeight,Z.width=Math.floor(pe*qe),Z.height=Math.floor(ve*qe),Z.style.width=pe+"px",Z.style.height=ve+"px",K.setTransform(qe,0,0,qe,0,0),ge=null,ee=[];const e=pe*.3,i=ve*.35;Ye=[];for(let o=0;o<8;o++){const t=o/8*Math.PI*2-Math.PI/2;Ye.push({x:pe/2+Math.cos(t)*e,y:ve/2+Math.sin(t)*i})}};ft();window.addEventListener("resize",ft);const mt=e=>{if(!K)return;K.clearRect(0,0,pe,ve);const i=e-it;let o=0;for(let t=0;t<ee.length;t++){const n=ee[t];if(n.t<i)continue;ee[o++]=n;const A=(1-(e-n.t)/it)*n.opacity;K.strokeStyle="rgba(216, 200, 245, "+A+")",K.lineWidth=1.2,K.lineCap="round",K.beginPath(),K.moveTo(n.x1,n.y1),K.lineTo(n.x2,n.y2),K.stroke()}ee.length=o,De&&(we=requestAnimationFrame(mt))},Oe=(e,i,o,t,n)=>{ee.push({x1:e,y1:i,x2:o,y2:t,t:performance.now(),opacity:n}),ee.length>st&&ee.splice(0,ee.length-st)},Be=[".hero",".dentro-fuera"].map(function(e){return document.querySelector(e)}).filter(Boolean);Be.length||(Z.style.display="none");var De=!1,Ue=0;function at(){De||(De=!0,we=requestAnimationFrame(mt))}function Tt(){De=!1,we&&(cancelAnimationFrame(we),we=null)}if(Be.length){var Ft=new IntersectionObserver(function(e){e.forEach(function(i){i.isIntersecting?Ue++:Ue--}),Ue>0?at():Tt()},{threshold:0});Be.forEach(function(e){Ft.observe(e)})}else at();const Pt=e=>{const i=Ye.slice().sort((o,t)=>(o.x-e.clientX)*(o.x-e.clientX)+(o.y-e.clientY)*(o.y-e.clientY)-((t.x-e.clientX)*(t.x-e.clientX)+(t.y-e.clientY)*(t.y-e.clientY)));Oe(i[0].x,i[0].y,e.clientX,e.clientY,.55),Oe(i[1].x,i[1].y,e.clientX,e.clientY,.32),ge&&Oe(ge.x,ge.y,e.clientX,e.clientY,.7),ge={x:e.clientX,y:e.clientY}},qt=()=>{ge=null,ee=[]};Be.forEach(function(e){e.addEventListener("pointermove",Pt),e.addEventListener("pointerleave",qt)});r.registerPlugin(B);const He=document.querySelector(".curtain"),lt=He?.querySelector(".curtain-img"),he=He?.querySelector(".curtain-ball");if(He&&lt&&he){const e=window.innerWidth<=999;e||r.set(he,{x:window.innerWidth+300,y:window.innerHeight*.08,rotation:0,scale:1});const i=r.timeline({paused:!0});e||(i.to(he,{x:window.innerWidth*.58,y:window.innerHeight*.45,rotation:540,ease:"power2.in",duration:.42}),i.to(he,{x:window.innerWidth*.25,y:window.innerHeight*.1,rotation:900,ease:"power2.out",duration:.18}),i.to(he,{x:window.innerWidth*.05,y:window.innerHeight*.4,rotation:1180,ease:"power2.in",duration:.15}),i.to(he,{x:-250,y:window.innerHeight*.2,rotation:1500,ease:"power2.out",duration:.25})),B.create({trigger:He,start:"top top",end:`+=${e?window.innerHeight*5:window.innerHeight*3}`,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:o=>{const t=o.progress,n=r.parseEase("power3.out")(t);e||(r.set(lt,{rotation:30*(1-n),scale:.75+.25*n}),i.progress(t))}})}const ct=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,zt=`
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
`,Rt=`
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
`;function ze(e){const i=parseInt(e.slice(1,3),16)/255,o=parseInt(e.slice(3,5),16)/255,t=parseInt(e.slice(5,7),16)/255;return[i,o,t]}const Re=document.querySelector(".hero");if(Re&&window.innerWidth>=1e3&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const e=document.createElement("div");e.className="dot-matrix-wrapper",Re.prepend(e);const i=new wt(-1,1,1,-1,0,1),o=new bt({antialias:!0,alpha:!0});o.setSize(window.innerWidth,window.innerHeight),o.setPixelRatio(Math.min(devicePixelRatio,2)),e.appendChild(o.domElement);const t=.5,n=Math.floor(window.innerWidth*t),d=Math.floor(window.innerHeight*t),A=new Je(n,d,{minFilter:Fe,magFilter:Fe,format:Ze,type:Ke}),b=new Je(n,d,{minFilter:Fe,magFilter:Fe,format:Ze,type:Ke});let C=A,F=b,x=0;const w=new et({uniforms:{iTime:{value:0},iResolution:{value:new tt(n,d)},iMouse:{value:new xt(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:ct,fragmentShader:zt}),[h,c,u]=ze("#51398D"),[v,g,f]=ze("#7c5cbf"),[m,l,S]=ze("#3d2a6b"),[k,y,L]=ze("#9b7fd4"),P=new et({uniforms:{iTime:{value:0},iResolution:{value:new tt(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new Pe(h,c,u)},uColor2:{value:new Pe(v,g,f)},uColor3:{value:new Pe(m,l,S)},uColor4:{value:new Pe(k,y,L)},uColorIntensity:{value:.4},uSoftness:{value:2}},vertexShader:ct,fragmentShader:Rt}),R=new St(2,2),D=new ot(R,w),I=new ot(R,P);let te=0,ie=0,Q=0,oe=0,se=0;const _=H=>{const $=Re.getBoundingClientRect();Q=te,oe=ie,te=H.clientX-$.left,ie=$.height-(H.clientY-$.top),se=performance.now(),w.uniforms.iMouse.value.set(te,ie,Q,oe)},q=()=>{w.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",_),document.addEventListener("mouseleave",q);const U=()=>{const H=window.innerWidth,$=window.innerHeight,s=Math.floor(H*t),a=Math.floor($*t);o.setSize(H,$),w.uniforms.iResolution.value.set(s,a),P.uniforms.iResolution.value.set(H,$),A.setSize(s,a),b.setSize(s,a),x=0};window.addEventListener("resize",U);const G=()=>{if(!Ie)return;requestAnimationFrame(G);const H=performance.now()*.001;w.uniforms.iTime.value=H,P.uniforms.iTime.value=H,w.uniforms.iFrame.value=x,performance.now()-se>100&&w.uniforms.iMouse.value.set(0,0,0,0),w.uniforms.iPreviousFrame.value=F.texture,o.setRenderTarget(C),o.render(D,i),P.uniforms.iFluid.value=C.texture,o.setRenderTarget(null),o.render(I,i);const $=C;C=F,F=$,x++};var Ie=!0,It=new IntersectionObserver(function(H){H[0].isIntersecting?Ie||(Ie=!0,requestAnimationFrame(G)):Ie=!1},{threshold:0});It.observe(Re),G()}const ut="ja_preloader_shown",Wt=4e3;function dt(e){r.set(e,{display:"none"}),document.body.style.overflow="",document.documentElement.style.overflow="",window.lenis&&window.lenis.start()}const $e=document.querySelector(".preloader-wrapper");if(!$e)throw new Error("Preloader wrapper not found");if(sessionStorage.getItem(ut)==="1")dt($e);else{let o=function(){if(e)return;function t(d=2){const A=r.timeline(),b=5;let C=0;for(let F=0;F<b;F++){const w=F===b-1?1:Math.min(C+Math.random()*.3+.1,.9);C=w,A.to(".preloader-progress-bar",{scaleX:w,duration:d/b,ease:"power2.out"})}return A}r.timeline({delay:.2,onComplete:i}).add(t(),"0").to(".preloader-wrapper",{y:"-100%",duration:.4,ease:"power4.inOut"})},e=!1;const i=()=>{e||(e=!0,sessionStorage.setItem(ut,"1"),dt($e),document.dispatchEvent(new CustomEvent("preloader:complete")))};setTimeout(i,Wt),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",window.lenis&&window.lenis.stop(),document.readyState==="complete"?o():window.addEventListener("load",o)}
