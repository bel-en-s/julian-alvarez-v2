import{g as r,S as B}from"./menu-BX5mmxiu.js";/* empty css             *//* empty css             *//* empty css                     */import{S as se}from"./SplitText-Cpc1cBKW.js";import{i as et}from"./anime-hAHJP90b.js";import{O as tt,W as ot,a as He,F as Ie,R as Ne,L as Me,S as Oe,V as rt,b as Ue,c as Ae,P as nt,M as $e}from"./three.module-Dx4aY3AU.js";r.registerPlugin(B);function it(t){const u=new Date(t).getTime()-Date.now();return u<=0?{days:"00",hours:"00",minutes:"00",seconds:"00"}:{days:String(Math.floor(u/864e5)).padStart(2,"0"),hours:String(Math.floor(u%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(u%36e5/6e4)).padStart(2,"0"),seconds:String(Math.floor(u%6e4/1e3)).padStart(2,"0")}}const st={kickoff:new Date(Date.now()+4*864e5),home:"Atlético de Madrid",away:"Real Madrid",competition:"LaLiga",extra:"Metropolitano",startMinimized:!1,container:null};function at(t){const u=document.createElement("article");return u.className="next-match"+(t.startMinimized?" is-min":""),u.innerHTML=`
    <div class="watermark" aria-hidden="true"></div>
    <canvas class="web" aria-hidden="true"></canvas>

    <header class="head">
      <div class="eyebrow">Próximo partido</div>
      <button type="button" class="toggle"
              aria-label="${t.startMinimized?"Ampliar tarjeta":"Minimizar tarjeta"}"
              aria-expanded="${t.startMinimized?"false":"true"}">
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
        <span class="t home">${t.home}</span>
        <span class="vs">vs</span>
        <span class="t away">${t.away}</span>
      </div>
      <div class="meta">
        <span class="comp">${t.competition}</span>
        <span class="dot">·</span>
        <span class="extra">${t.extra}</span>
      </div>
    </div>
  `,u}function lt(t,u){const o=u.getContext("2d");let e=0,l=0;const d=window.devicePixelRatio||1;let L=[],b=null,E=!1;function P(){const v=t.getBoundingClientRect();e=v.width,l=v.height,u.width=Math.floor(e*d),u.height=Math.floor(l*d),u.style.width=e+"px",u.style.height=l+"px",o.setTransform(d,0,0,d,0,0);const g=e/2,f=l/2,m=e*.55,s=l*.6;L=[];for(let S=0;S<8;S++){const C=S/8*Math.PI*2-Math.PI/2;L.push({x:g+Math.cos(C)*m,y:f+Math.sin(C)*s})}o.clearRect(0,0,e,l)}P();const x=new ResizeObserver(P);x.observe(t);function w(v,g,f,m,s){o.strokeStyle="rgba(216, 200, 245, "+s+")",o.lineWidth=.6,o.lineCap="round",o.beginPath(),o.moveTo(v,g),o.lineTo(f,m),o.stroke()}function p(v){const g=t.getBoundingClientRect(),f=v.clientX-g.left,m=v.clientY-g.top;o.save(),o.globalCompositeOperation="destination-out",o.fillStyle="rgba(0,0,0,0.04)",o.fillRect(0,0,e,l),o.restore();const s=L.slice().sort((S,C)=>(S.x-f)*(S.x-f)+(S.y-m)*(S.y-m)-((C.x-f)*(C.x-f)+(C.y-m)*(C.y-m)));w(s[0].x,s[0].y,f,m,.55),w(s[1].x,s[1].y,f,m,.32),b&&E&&w(b.x,b.y,f,m,.7),b={x:f,y:m}}function a(){E=!0,b=null}function c(){E=!1;let v=0;const g=setInterval(()=>{v++,o.save(),o.globalCompositeOperation="destination-out",o.fillStyle="rgba(0,0,0,0.18)",o.fillRect(0,0,e,l),o.restore(),v>14&&(clearInterval(g),o.clearRect(0,0,e,l))},30)}return window.innerWidth>=1e3&&(t.addEventListener("pointerenter",a),t.addEventListener("pointermove",p),t.addEventListener("pointerleave",c)),()=>{x.disconnect(),window.innerWidth>=1e3&&(t.removeEventListener("pointerenter",a),t.removeEventListener("pointermove",p),t.removeEventListener("pointerleave",c))}}function ct(t){const u=Object.assign({},st,t||{}),o=u.kickoff instanceof Date?u.kickoff:new Date(u.kickoff),e=at(u);(u.container||document.body).appendChild(e);let l=u.startMinimized;const d=e.querySelector(".toggle"),L=e.querySelector(".n-d"),b=e.querySelector(".n-h"),E=e.querySelector(".n-m"),P=e.querySelector(".n-s");d.addEventListener("click",()=>{l=!l,e.classList.toggle("is-min",l),d.setAttribute("aria-expanded",l?"false":"true"),d.setAttribute("aria-label",l?"Ampliar tarjeta":"Minimizar tarjeta"),r.to(e,{scale:l?.92:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"})});function x(){const a=it(o);L.textContent=a.days,b.textContent=a.hours,E.textContent=a.minutes,P.textContent=a.seconds}x();const w=setInterval(x,1e3),p=lt(e,e.querySelector(".web"));return B.create({trigger:".hero",start:"bottom top",onLeave:()=>{l||(l=!0,e.classList.add("is-min"),d.setAttribute("aria-expanded","false"),d.setAttribute("aria-label","Ampliar tarjeta"),r.to(e,{scale:.92,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))},onEnter:()=>{l&&(l=!1,e.classList.remove("is-min"),d.setAttribute("aria-expanded","true"),d.setAttribute("aria-label","Minimizar tarjeta"),r.to(e,{scale:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))}}),{element:e,minimize(){l||d.click()},expand(){l&&d.click()},destroy(){clearInterval(w),p(),e.remove()}}}window.NextMatch={mount:ct};r.registerPlugin(B);(function(){const t=document.getElementById("df-stage");if(!t)return;const u=t.closest(".dentro-fuera"),o=document.getElementById("df-banner"),e=t.querySelector(".df-blobs"),l=t.querySelector(".df-smudge"),d="http://www.w3.org/2000/svg",L=t.querySelector(".df-grain");if(L){const n=document.createElementNS(d,"defs"),i=document.createElementNS(d,"filter");i.id="df-noise";const h=document.createElementNS(d,"feTurbulence");h.setAttribute("type","fractalNoise"),h.setAttribute("baseFrequency","0.85"),h.setAttribute("numOctaves","2"),h.setAttribute("stitchTiles","stitch"),i.appendChild(h);const T=document.createElementNS(d,"feColorMatrix");T.setAttribute("type","saturate"),T.setAttribute("values","0"),i.appendChild(T),n.appendChild(i),L.prepend(n)}function b(n){return function(){n|=0,n=n+1831565813|0;var i=Math.imul(n^n>>>15,1|n);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function E(n,i){for(var h=i.hx,T=i.hy,M=i.sx,D=i.sy,N=i.N,A=i.maxR,$=i.factor,V=i.start,z=b(i.seed),O=function(ne){return(z()*2-1)*ne},J=2.6+(i.irreg||0)*7,ae=[],ee=[],le=0;le<N;le++){var Pe=4+82*(le/(N-1)),me=(Pe+O(J))*Math.PI/180;ae.push([Math.cos(me),Math.sin(me)]),ee.push(1+O(.13*(i.irreg||0)))}var ie=function(ne,j){return[(h+M*j*ae[ne][0]).toFixed(1),(T+D*j*ae[ne][1]).toFixed(1)]};ae.forEach(function(ne,j){var ye=A*ee[j]*(.86+z()*.2),te=document.createElementNS(d,"line");te.setAttribute("x1",h),te.setAttribute("y1",T);var we=ie(j,ye);te.setAttribute("x2",we[0]),te.setAttribute("y2",we[1]),te.setAttribute("class","spoke"),te.setAttribute("stroke-width",(.7+z()*.35).toFixed(2)),n.appendChild(te)});for(var pe=[],fe=V;fe<A*.96;)pe.push(fe),fe*=$+z()*.08;pe.forEach(function(ne){for(var j=0;j<N-1;j++)if(!(z()<.06+(i.irreg||0)*.1)){var ye=.05+(i.irreg||0)*.13,te=ne*ee[j]*(1+O(ye)),we=ne*ee[j+1]*(1+O(ye)),be=ie(j,te),xe=ie(j+1,we),We=(+be[0]+ +xe[0])/2,De=(+be[1]+ +xe[1])/2,Be=.06+z()*.06+O(.06*(i.irreg||0)),Ke=(We+(h-We)*Be).toFixed(1),Ze=(De+(T-De)*Be).toFixed(1),Se=document.createElementNS(d,"path");Se.setAttribute("d","M"+be[0]+" "+be[1]+" Q"+Ke+" "+Ze+" "+xe[0]+" "+xe[1]),Se.setAttribute("class",z()<.1?"glint":"capture"),Se.setAttribute("stroke-width",(.55+z()*.3).toFixed(2)),n.appendChild(Se)}});for(var ce=0;ce<2;ce++){var ue=1+ce*3,qe=A*(.74+ce*.12),he=ie(ue,qe),ve=ie(Math.min(ue+3,N-1),qe*1.02),ze=(+he[0]+ +ve[0])/2,Re=(+he[1]+ +ve[1])/2,Qe=(ze+(h-ze)*.04).toFixed(1),Je=(Re+(T-Re)*.04).toFixed(1),ge=document.createElementNS(d,"path");ge.setAttribute("d","M"+he[0]+" "+he[1]+" Q"+Qe+" "+Je+" "+ve[0]+" "+ve[1]),ge.setAttribute("class","frame-thread"),ge.setAttribute("stroke-width","0.9"),n.appendChild(ge)}}var P=t.querySelector(".df-web-tl"),x=t.querySelector(".df-web-br");P&&E(P,{hx:0,hy:0,sx:1,sy:1,seed:7,N:9,maxR:900,factor:1.3,start:52,irreg:.22}),x&&E(x,{hx:1366,hy:768,sx:-1,sy:-1,seed:41,N:12,maxR:660,factor:1.24,start:40,irreg:.92}),function(){var n=t.querySelector(".df-dots");if(n){for(var i=b(91),h=1366,T=768,M=[],D=0;D<14;D++){var N=i()*h,A=i()*T*.92;M.push([N,A]);var $=document.createElementNS(d,"circle");$.setAttribute("cx",N.toFixed(1)),$.setAttribute("cy",A.toFixed(1)),$.setAttribute("r",(i()*1.1+.6).toFixed(2)),$.setAttribute("class","dot"),n.appendChild($)}for(var D=0;D<M.length;D++)for(var V=D+1;V<M.length;V++){var z=M[D][0]-M[V][0],O=M[D][1]-M[V][1];if(Math.hypot(z,O)<150&&i()<.25){var J=document.createElementNS(d,"line");J.setAttribute("x1",M[D][0].toFixed(1)),J.setAttribute("y1",M[D][1].toFixed(1)),J.setAttribute("x2",M[V][0].toFixed(1)),J.setAttribute("y2",M[V][1].toFixed(1)),J.setAttribute("class","dot-link"),n.appendChild(J)}}}}(),function(){var n=t.querySelector(".df-rings");if(n)for(var i=70;i<440;){var h=document.createElementNS(d,"circle");h.setAttribute("cx",450),h.setAttribute("cy",450),h.setAttribute("r",i),h.setAttribute("stroke-width",(.6+Math.random()*.4).toFixed(2)),n.appendChild(h),i*=1.34}}();var w=null;function p(){var n=Math.min(innerWidth/1366,innerHeight/768);!n||!isFinite(n)||n<=0||(t.style.transform="scale("+n+")")}if(window.addEventListener("resize",function(){w&&cancelAnimationFrame(w),w=requestAnimationFrame(p)}),p(),!o||!e||!l)return;var a=window.innerWidth<1e3,c={x:0,y:0},v={x:0,y:0},g=!1,f=null,m=[],s=a?60:120,S=0,C=a?40:12,y={smoothing:a?.2:.1,threshold:a?.3:.01,sizeFromSpeed:a?.15:.2,expandMultiplier:2.5,expandTime:900,dissolveStart:700,dissolveTime:1200,burstRadius:a?10:16};function k(n,i,h){if(h||(h=y.burstRadius),!(m.length>=s)){var T=performance.now();if(!(T-S<C)){S=T;var M=document.createElementNS(d,"circle");M.setAttribute("cx",n),M.setAttribute("cy",i),M.setAttribute("r",h),M.setAttribute("fill","#fff"),e.prepend(M),m.push({el:M,start:T,radius:h})}}}function F(n,i){for(var h=a?[8,12,6,10,5,8,7,10,9,7]:[13,18,10,16,8,14,12,17,15,11],T=a?[[0,0],[-8,-5],[8,-4],[-5,8],[5,5],[-10,3],[4,-8],[-4,-9],[9,4],[-6,-3]]:[[0,0],[-12,-8],[12,-6],[-8,10],[8,8],[-14,4],[6,-12],[-5,-14],[14,6],[-9,-4]],M=0;M<h.length;M++)k(n+T[M][0],i+T[M][1],h[M])}function R(){for(m.length=0;e.firstChild;)e.removeChild(e.firstChild)}function H(n,i){var h=o.getBoundingClientRect();return{x:n-h.left,y:i-h.top}}function W(n){var i=H(n.clientX,n.clientY);if(!g){c.x=v.x=i.x,c.y=v.y=i.y,g=!0;return}c.x=i.x,c.y=i.y}function K(n){W(n)}function oe(n){var i=H(n.clientX,n.clientY);F(i.x,i.y)}o.addEventListener("mousemove",K),o.addEventListener("click",oe);function Q(n){var i=n.touches?n.touches[0]:n.changedTouches[0];if(i){var h=H(i.clientX,i.clientY);if(!g){c.x=v.x=h.x,c.y=v.y=h.y,g=!0;return}c.x=h.x,c.y=h.y}}o.addEventListener("touchmove",Q,{passive:!0}),o.addEventListener("touchstart",Q,{passive:!0});function Z(n){if(g){v.x+=(c.x-v.x)*y.smoothing,v.y+=(c.y-v.y)*y.smoothing;var i=Math.hypot(c.x-v.x,c.y-v.y);i>y.threshold&&k(v.x,v.y,i*y.sizeFromSpeed)}for(var h=y.expandTime,T=y.dissolveStart,M=T+y.dissolveTime,D=y.expandMultiplier,N=m.length-1;N>=0;N--){var A=m[N],$=n-A.start;if($>=M){A.el.parentNode&&A.el.parentNode.removeChild(A.el),m.splice(N,1);continue}var V=A.radius;if($<h){var z=$/h;z=z<.5?2*z*z:-1+(4-2*z)*z,V=A.radius+(A.radius*D-A.radius)*z}if($>=T){var O=($-T)/y.dissolveTime;O=O*O*O,V*=1-Math.min(O,1)}A.el.setAttribute("r",Math.max(0,V))}f=requestAnimationFrame(Z)}f=requestAnimationFrame(Z);function re(){var n=o.getBoundingClientRect();l.setAttribute("viewBox","0 0 "+n.width+" "+n.height),l.style.width=n.width+"px",l.style.height=n.height+"px"}re(),window.addEventListener("resize",re);var G=document.getElementById("df-dentro"),q=document.getElementById("df-fuera");function U(n){n?t.setAttribute("data-side",n):t.removeAttribute("data-side")}G&&(G.addEventListener("mouseenter",function(){U("dentro"),R()}),G.addEventListener("mouseleave",function(){U(null)}),G.addEventListener("focus",function(){U("dentro")}),G.addEventListener("blur",function(){U(null)})),q&&(q.addEventListener("mouseenter",function(){U("fuera")}),q.addEventListener("mouseleave",function(){U(null)}),q.addEventListener("focus",function(){U("fuera")}),q.addEventListener("blur",function(){U(null)}));var X=t.querySelectorAll(".df-lockup"),I=t.querySelector(".df-hint"),Y=t.querySelectorAll(".df-web, .df-rings, .df-dots");r.set(o,{opacity:0,scale:.92}),r.set(X,{opacity:0,y:30}),r.set(Y,{opacity:0}),r.set(I,{opacity:0}),B.create({trigger:u,start:"top 85%",once:!0,onEnter:function(){var n=r.timeline({defaults:{ease:"power3.out"}});n.to(Y,{opacity:1,duration:.6},0),n.to(o,{opacity:1,scale:1,duration:.9},0),n.to(X,{opacity:1,y:0,duration:.7,stagger:.15},.15),n.to(I,{opacity:1,duration:.5},.5)}}),u&&window.innerWidth>=1e3&&B.create({trigger:u,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:n=>{document.documentElement.style.setProperty("--df-lockup-scale",1+n.progress*.15)}}),window.addEventListener("beforeunload",function(){o.removeEventListener("mousemove",K),o.removeEventListener("click",oe),o.removeEventListener("touchmove",Q),o.removeEventListener("touchstart",Q),window.removeEventListener("resize",re),f&&cancelAnimationFrame(f),m.length=0})})();function Ye(t=!1){const u=document.querySelectorAll(".hero-name");if(u.length)if(window.innerWidth>=1e3){const e=[];u.forEach(l=>{const d=new se(l,{type:"chars",charsClass:"hero-char"});e.push(...d.chars)}),r.set(e,{y:()=>-(window.innerHeight+200),visibility:"visible"}),r.to(e,{y:0,duration:.8,stagger:.04,delay:t?.5:0,ease:"power4.out",onComplete:()=>{r.set(e,{clearProps:"transform"})}})}else r.fromTo(u,{opacity:0,y:40,visibility:"visible"},{opacity:1,y:0,duration:.8,stagger:.15,delay:t?.5:0,ease:"power3.out"});const o=document.querySelector(".hero-header-img");o&&window.innerWidth>=1e3?(t&&(o.style.animationDelay="0.5s"),o.classList.add("hero-header-img--enter"),o.addEventListener("animationend",()=>{o.classList.remove("hero-header-img--enter"),o.style.animationDelay="",o.style.transform="translateY(0)"},{once:!0})):o&&r.fromTo(o,{y:"100%",opacity:0},{y:"0%",opacity:1,duration:.8,delay:t?.6:.1,ease:"power2.out",onComplete:()=>{o.style.transform="translateY(0)"}}),r.set(".hero .hero-cards .card",{transformOrigin:"center center"}),r.to(".hero .hero-cards .card",{scale:1,duration:.8,delay:.1,stagger:.05,ease:"power4.out",onComplete:()=>{r.set("#hero-card-1",{transformOrigin:"top right"}),r.set("#hero-card-3",{transformOrigin:"top left"})}})}document.addEventListener("DOMContentLoaded",()=>{r.registerPlugin(B,se),document.addEventListener("preloader:complete",()=>{Ye(!1),B.refresh()},{once:!0}),sessionStorage.getItem("ja_preloader_shown")==="1"&&Ye(!0),et();const t=document.querySelector(".about"),u=document.querySelector(".slide-description h1"),o=document.querySelector(".slide-title h1");if(t&&(window.innerWidth>=1e3&&B.create({trigger:t,start:"top top",end:"+=800",pin:!0,scrub:!0,onUpdate:a=>{document.documentElement.style.setProperty("--video-scale",1+a.progress*.2)}}),[u,o].forEach(a=>{a&&se.create(a,{type:"words",wordsClass:"about-word"})}),document.querySelectorAll(".slide-title .about-word").forEach(a=>{a.textContent.trim().toLowerCase().includes("soñando")&&a.classList.add("about-word--textured")}),u||o))if(window.innerWidth>=1e3)r.to(".about-word",{"--highlight-offset":"100%",stagger:.4,scrollTrigger:{trigger:".about",scrub:1,start:"top top",end:"+=800"}});else{const a=document.querySelector(".about-video-wrapper");a&&r.fromTo(a,{scale:.8,opacity:0},{scale:1,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".about",start:"top 90%",once:!0}}),r.fromTo(".about-word",{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.15,ease:"power2.out",scrollTrigger:{trigger:".about",start:"top 80%",once:!0}})}const e=document.querySelector(".row--video-gray");if(e&&window.innerWidth>=1e3){B.create({trigger:e,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:a=>{document.documentElement.style.setProperty("--video-gray-scale",1+a.progress*.2)}});const p=e.querySelectorAll(".video-quote h2, .video-quote p");p.length&&r.fromTo(p,{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.3,ease:"none",scrollTrigger:{trigger:e,scrub:1,start:"top bottom",end:"bottom top"}})}const l=p=>p*p*(3-2*p);window.innerWidth>1e3&&(B.create({trigger:".home-services",start:"top top",end:`+=${window.innerHeight*4}px`,pin:".home-services",pinSpacing:!0}),B.create({trigger:".home-services",start:"top bottom",end:`+=${window.innerHeight*4}`,scrub:1,onUpdate:p=>{const a=p.progress,c=r.utils.clamp(0,1,a/.9),v=r.utils.interpolate("300%","0%",l(c));r.set(".home-services-header",{y:v}),["#card-1","#card-2","#card-3"].forEach((g,f)=>{const m=f*.5,s=r.utils.clamp(0,1,(a-m*.1)/(.9-m*.1)),S=document.querySelector(`${g} .flip-card-inner`);let C;if(s<.4){const W=s/.4;C=r.utils.interpolate("-100%","50%",l(W))}else if(s<.6){const W=(s-.4)/.2;C=r.utils.interpolate("50%","0%",l(W))}else C="0%";let y;if(s<.4){const W=s/.4;y=r.utils.interpolate(.25,.75,l(W))}else if(s<.6){const W=(s-.4)/.2;y=r.utils.interpolate(.75,1,l(W))}else y=1;let k;if(s<.2){const W=s/.2;k=l(W)}else k=1;let F,R,H;if(s<.6)F=f===0?"100%":f===1?"0%":"-100%",R=f===0?-5:f===1?0:5,H=0;else if(s<1){const W=(s-.6)/.4;F=r.utils.interpolate(f===0?"100%":f===1?"0%":"-100%","0%",l(W)),R=r.utils.interpolate(f===0?-5:f===1?0:5,0,l(W)),H=l(W)*180}else F="0%",R=0,H=180;r.set(g,{opacity:k,y:C,x:F,rotate:R,scale:y}),r.set(S,{rotationY:H})})}}));const d=document.querySelector(".home-spotlight-images");if(d){const p=d.offsetHeight,a=window.innerHeight,c=p*.05,v=p+c+a,g=document.querySelector(".spotlight-mask-header h3");let f=null;g&&(f=se.create(g,{type:"words",wordsClass:"spotlight-word"}),r.set(f.words,{opacity:0})),B.create({trigger:".home-spotlight",start:"top top",end:`+=${window.innerHeight*7}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:m=>{const s=m.progress;if(s<=.5){const y=s/.5,k=5,F=-(v/p)*100,R=k+(F-k)*y;r.set(d,{y:`${R}%`})}const S=document.querySelector(".spotlight-mask-image-container"),C=document.querySelector(".spotlight-mask-image");if(S&&C)if(s>=.25&&s<=.75){const y=(s-.25)/.5,k=`${y*475}%`,F=1.25-y*.25;S.style.setProperty("-webkit-mask-size",k),S.style.setProperty("mask-size",k),r.set(C,{scale:F})}else s<.25?(S.style.setProperty("-webkit-mask-size","0%"),S.style.setProperty("mask-size","0%"),r.set(C,{scale:1.25})):s>.75&&(S.style.setProperty("-webkit-mask-size","475%"),S.style.setProperty("mask-size","475%"),r.set(C,{scale:1}));if(f&&f.words.length>0)if(s>=.75&&s<=.95){const y=(s-.75)/.2,k=f.words.length;f.words.forEach((F,R)=>{const H=R/k;y>=H?r.set(F,{opacity:1}):r.set(F,{opacity:0})})}else s<.75?r.set(f.words,{opacity:0}):s>.95&&r.set(f.words,{opacity:1})}})}const L=document.querySelector(".outro h3");let b=null;L&&(b=se.create(L,{type:"words",wordsClass:"outro-word"}),r.set(b.words,{opacity:0}));const E=document.querySelectorAll(".outro-strip"),P=[.3,.4,.25,.35,.2,.25];if(B.create({trigger:".outro",start:"top top",end:`+=${window.innerHeight*3}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:p=>{const a=p.progress;if(b&&b.words.length>0)if(a>=.25&&a<=.75){const c=(a-.25)/.5,v=b.words.length;b.words.forEach((g,f)=>{const m=f/v;c>=m?r.set(g,{opacity:1}):r.set(g,{opacity:0})})}else a<.25?r.set(b.words,{opacity:0}):a>.75&&r.set(b.words,{opacity:1})}}),B.create({trigger:".outro",start:"top bottom",end:`+=${window.innerHeight*6}px`,scrub:1,onUpdate:p=>{const a=p.progress;E.forEach((c,v)=>{if(P[v]!==void 0){const g=P[v],f=a*100*g;r.set(c,{x:`${f}%`})}})}}),document.querySelector(".work-items")&&B.refresh(),window.innerWidth>=1e3&&document.querySelector(".work-header")){r.set(".work-header-arrow-icon",{scale:0});const p=se.create(".work-header-content p",{type:"lines",mask:"lines"}),a=se.create(".work-header-title h1",{type:"lines",mask:"lines"});r.set([p.lines,a.lines],{y:"120%"});const c=r.timeline({delay:.75});c.to(p.lines,{y:"0%",duration:1,ease:"power4.out"},"-=0.9"),c.to(a.lines,{y:"0%",duration:1,ease:"power4.out",stagger:.1},"-=0.9"),c.to(".work-header-arrow-icon",{scale:1,duration:.75,ease:"power4.out"},"-=0.9")}if(window.innerWidth>=1e3){const p=[-200,-280,-150,-320,-220,-180,-300,-160,-260,-350].map(function(c){return c*.15}),a=[.2,.5,.8,.35,.65,.95,.3,.55,.85,.4];r.utils.toArray(".work-items .work-item-img").forEach((c,v)=>{const g=c.querySelector("img"),f=c.querySelector("video"),m=g?.getAttribute("src")||"";if(f||m.includes("/bio/1.webp")||m.includes("Anexo 9")||m.includes("Anexo 6")||m.includes("Anexo 8"))return;let s=p[v%p.length];m.includes("Anexo 11")&&(s=Math.abs(s)*2),m.includes("Anexo 5")&&(s=-Math.abs(s)*12),m.includes("Anexo 7")&&(s=-Math.abs(s)*12),m.includes("/bio/4.webp")&&(s=-Math.abs(s)),m.includes("/bio/3.webp")&&(s=Math.abs(s)*1.5),m.includes("/bio/2.webp")&&(s=Math.abs(s)),c.classList.contains("work-item-img--bio3")&&(s=Math.abs(s));const S=a[v%a.length];r.to(c,{y:s,ease:"none",scrollTrigger:{trigger:c,start:"top bottom",end:"bottom top",scrub:S}});const y=c.closest(".work-item").querySelector(".work-item-content");y&&!y.classList.contains("no-parallax")&&r.to(y,{y:s*.7,ease:"none",scrollTrigger:{trigger:c,start:"top 85%",end:"bottom top",scrub:Math.min(S*2,1.5)}})}),r.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach(c=>{c.classList.contains("no-parallax")||r.to(c,{y:-30,ease:"none",scrollTrigger:{trigger:c.closest(".row"),start:"top bottom",end:"bottom top",scrub:1}})})}const x=document.getElementById("mi-historia-text");if(x&&window.innerWidth>=1e3){const p=x.textContent;x.textContent="";const a=x.closest(".behind-the-lock");if(a){const c=new IntersectionObserver(v=>{v.forEach(g=>{if(g.isIntersecting&&g.intersectionRatio>.3){const f=r.timeline();p.split("").forEach((m,s)=>{f.call(()=>{x.textContent+=m},[],s*.05)}),c.unobserve(g.target)}})},{threshold:[0,.1,.3,.5]});c.observe(a)}}const w=document.querySelector(".btl-header-text");w&&(r.set(w,{opacity:0,y:30}),r.to(w,{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:w,start:"top bottom",end:"top 30%",scrub:1}})),ut()});function ut(){const t=document.querySelector(".work-timeline"),u=t?.querySelector(".work-timeline-progress"),o=document.querySelector(".work-items");if(!t||!u||!o)return;const e=document.createElement("div");e.style.position="absolute",e.style.left="50%",e.style.top="0",e.style.width="60px",e.style.height="60px",e.style.transform="translate(-50%, -50%)",e.style.pointerEvents="none",e.style.zIndex="3",e.style.filter="drop-shadow(0 0 4px rgba(216,200,245,.4))",t.appendChild(e);const l="http://www.w3.org/2000/svg",d=document.createElementNS(l,"svg");d.setAttribute("viewBox","-30 -30 60 60"),d.setAttribute("width","100%"),d.setAttribute("height","100%"),d.style.display="block",d.style.opacity="1",e.appendChild(d);const L=document.createElementNS(l,"defs");L.innerHTML=`<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`,d.appendChild(L);const b=[];for(let y=0;y<8;y++){const k=document.createElementNS(l,"path");k.setAttribute("class","s-leg"),d.appendChild(k),b.push(k)}const E=document.createElementNS(l,"g");E.innerHTML='<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/><ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/><path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/><path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>',d.appendChild(E);const P=[{side:1,fore:5.2,reach:12,phase:0},{side:1,fore:1.4,reach:14,phase:.5},{side:1,fore:-2.2,reach:14,phase:0},{side:1,fore:-5.6,reach:12,phase:.5},{side:-1,fore:5.2,reach:12,phase:.5},{side:-1,fore:1.4,reach:14,phase:0},{side:-1,fore:-2.2,reach:14,phase:.5},{side:-1,fore:-5.6,reach:12,phase:0}],x=8.6,w=9.2,p=13,a=.6,c=3.4,v=1.6;let g=0,f=0;function m(y){const k=y-f;f=y,g+=k*280;const F=-8+y*116,R=0,H=1,W=1,K=0,oe=Math.sin(2*Math.PI*(g/p))*.5,Q=W*(v+oe),Z=0,re=Math.atan2(H,R)*180/Math.PI;E.setAttribute("transform",`translate(${Q.toFixed(2)} ${Z.toFixed(2)}) rotate(${re.toFixed(1)})`);for(let G=0;G<8;G++){const q=P[G],U=Q+R*q.fore*.45+W*q.side*1.7,X=Z+H*q.fore*.45+K*q.side*1.7,I=Q+R*q.fore+W*q.side*q.reach,Y=Z+H*q.fore+K*q.side*q.reach,n=(g/p+q.phase)%1;let i,h;if(n<a)i=(.5-n/a)*p,h=0;else{const ue=(n-a)/(1-a);i=(ue-.5)*p,h=Math.sin(ue*Math.PI)*c}const T=I+R*i-(I-U)/q.reach*h,M=Y+H*i-(Y-X)/q.reach*h;let D=T-U,N=M-X,A=Math.hypot(D,N);const $=x+w-.2,V=Math.abs(x-w)+.2;A>$&&(A=$),A<V&&(A=V);const z=D/(Math.hypot(D,N)||1),O=N/(Math.hypot(D,N)||1),J=z*A,ae=O*A,ee=(A*A+x*x-w*w)/(2*A),le=Math.sqrt(Math.max(0,x*x-ee*ee))*q.side,Pe=-O,me=z,ie=U+z*ee+Pe*le,pe=X+O*ee+me*le,fe=U+J,ce=X+ae;b[G].setAttribute("d",`M${U.toFixed(1)} ${X.toFixed(1)} L${ie.toFixed(1)} ${pe.toFixed(1)} L${fe.toFixed(1)} ${ce.toFixed(1)}`)}e.style.top=F+"%"}const s=2809;t.style.height=s+"px",t.style.bottom="auto";const S=o.querySelectorAll(".row--first")[1],C=S?S.offsetTop+S.offsetHeight:s;B.create({trigger:o,start:"top 85%",end:"bottom bottom",scrub:!0,onUpdate:y=>{const F=y.progress*s,R=Math.min(F/C,1);u.style.height=R*100+"%",m(R),e.style.display="block"}})}const Ve=.15,Te=document.querySelector(".about-video-wrapper"),_=Te?.querySelector("video");if(_&&Te){let t="muted",u=0,o=!1;const e=Te.querySelector(".video-play-btn"),l=Te.querySelector(".video-sound-btn"),d='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>',E='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>',P='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';_.muted=!0,_.play().catch(()=>{});const x=()=>{_.paused?(_.play(),e&&(e.innerHTML=d)):(_.pause(),e&&(e.innerHTML=L))},w=()=>{if(_.volume>0)u=_.volume,r.to(_,{volume:0,duration:.2,ease:"power2.out",onComplete:()=>{t="muted",l&&(l.innerHTML=b)}});else{const c=u>0?u:Ve;_.muted=!1,u=c,r.to(_,{volume:c,duration:.3,ease:"power2.out"}),t=c===Ve?"low":"high",l&&(l.innerHTML=t==="low"?E:P)}},p=()=>{o=!0,x()},a=()=>{if(o){o=!1;return}x()};_.addEventListener("touchstart",p),_.addEventListener("click",a),e&&e.addEventListener("click",c=>{c.stopPropagation(),x()}),l&&l.addEventListener("click",c=>{c.stopPropagation(),w()})}r.registerPlugin(B);const Le=document.querySelector(".curtain"),_e=Le?.querySelector(".curtain-img"),de=Le?.querySelector(".curtain-ball");if(Le&&_e&&de){const t=window.innerWidth<=999;t||r.set(de,{x:window.innerWidth+300,y:window.innerHeight*.08,rotation:0,scale:1});const u=r.timeline({paused:!0});t||(u.to(de,{x:window.innerWidth*.58,y:window.innerHeight*.45,rotation:540,ease:"power2.in",duration:.42}),u.to(de,{x:window.innerWidth*.25,y:window.innerHeight*.1,rotation:900,ease:"power2.out",duration:.18}),u.to(de,{x:window.innerWidth*.05,y:window.innerHeight*.4,rotation:1180,ease:"power2.in",duration:.15}),u.to(de,{x:-250,y:window.innerHeight*.2,rotation:1500,ease:"power2.out",duration:.25})),B.create({trigger:Le,start:"top top",end:`+=${t?window.innerHeight*5:window.innerHeight*3}`,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:o=>{const e=o.progress,l=r.parseEase("power3.out")(e);t||(r.set(_e,{rotation:30*(1-l),scale:.75+.25*l}),u.progress(e))}})}const Ge=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,dt=`
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
`,ft=`
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
`;function Ee(t){const u=parseInt(t.slice(1,3),16)/255,o=parseInt(t.slice(3,5),16)/255,e=parseInt(t.slice(5,7),16)/255;return[u,o,e]}const Ce=document.querySelector(".hero");if(Ce&&window.innerWidth>=1e3&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const t=document.createElement("div");t.className="dot-matrix-wrapper",Ce.prepend(t);const u=new tt(-1,1,1,-1,0,1),o=new ot({antialias:!0,alpha:!0});o.setSize(window.innerWidth,window.innerHeight),o.setPixelRatio(Math.min(devicePixelRatio,2)),t.appendChild(o.domElement);const e=.5,l=Math.floor(window.innerWidth*e),d=Math.floor(window.innerHeight*e),L=new He(l,d,{minFilter:Me,magFilter:Me,format:Ne,type:Ie}),b=new He(l,d,{minFilter:Me,magFilter:Me,format:Ne,type:Ie});let E=L,P=b,x=0;const w=new Oe({uniforms:{iTime:{value:0},iResolution:{value:new Ue(l,d)},iMouse:{value:new rt(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:Ge,fragmentShader:dt}),[p,a,c]=Ee("#51398D"),[v,g,f]=Ee("#7c5cbf"),[m,s,S]=Ee("#3d2a6b"),[C,y,k]=Ee("#9b7fd4"),F=new Oe({uniforms:{iTime:{value:0},iResolution:{value:new Ue(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new Ae(p,a,c)},uColor2:{value:new Ae(v,g,f)},uColor3:{value:new Ae(m,s,S)},uColor4:{value:new Ae(C,y,k)},uColorIntensity:{value:.4},uSoftness:{value:2}},vertexShader:Ge,fragmentShader:ft}),R=new nt(2,2),H=new $e(R,w),W=new $e(R,F);let K=0,oe=0,Q=0,Z=0,re=0;const G=I=>{const Y=Ce.getBoundingClientRect();Q=K,Z=oe,K=I.clientX-Y.left,oe=Y.height-(I.clientY-Y.top),re=performance.now(),w.uniforms.iMouse.value.set(K,oe,Q,Z)},q=()=>{w.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",G),document.addEventListener("mouseleave",q);const U=()=>{const I=window.innerWidth,Y=window.innerHeight,n=Math.floor(I*e),i=Math.floor(Y*e);o.setSize(I,Y),w.uniforms.iResolution.value.set(n,i),F.uniforms.iResolution.value.set(I,Y),L.setSize(n,i),b.setSize(n,i),x=0};window.addEventListener("resize",U);const X=()=>{if(!ke)return;requestAnimationFrame(X);const I=performance.now()*.001;w.uniforms.iTime.value=I,F.uniforms.iTime.value=I,w.uniforms.iFrame.value=x,performance.now()-re>100&&w.uniforms.iMouse.value.set(0,0,0,0),w.uniforms.iPreviousFrame.value=P.texture,o.setRenderTarget(E),o.render(H,u),F.uniforms.iFluid.value=E.texture,o.setRenderTarget(null),o.render(W,u);const Y=E;E=P,P=Y,x++};var ke=!0,mt=new IntersectionObserver(function(I){I[0].isIntersecting?ke||(ke=!0,requestAnimationFrame(X)):ke=!1},{threshold:0});mt.observe(Ce),X()}const Xe="ja_preloader_shown",pt=4e3;function je(t){r.set(t,{display:"none"}),document.body.style.overflow="",document.documentElement.style.overflow="",window.lenis&&window.lenis.start()}const Fe=document.querySelector(".preloader-wrapper");if(!Fe)throw new Error("Preloader wrapper not found");if(sessionStorage.getItem(Xe)==="1")je(Fe);else{let o=function(){if(t)return;function e(d=2){const L=r.timeline(),b=5;let E=0;for(let P=0;P<b;P++){const w=P===b-1?1:Math.min(E+Math.random()*.3+.1,.9);E=w,L.to(".preloader-progress-bar",{scaleX:w,duration:d/b,ease:"power2.out"})}return L}r.timeline({delay:.2,onComplete:u}).add(e(),"0").to(".preloader-wrapper",{y:"-100%",duration:.4,ease:"power4.inOut"})},t=!1;const u=()=>{t||(t=!0,sessionStorage.setItem(Xe,"1"),je(Fe),document.dispatchEvent(new CustomEvent("preloader:complete")))};setTimeout(u,pt),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",window.lenis&&window.lenis.stop(),document.readyState==="complete"?o():window.addEventListener("load",o)}
