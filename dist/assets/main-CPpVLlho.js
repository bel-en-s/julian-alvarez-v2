import{g as n,S as B}from"./menu-Cz7_jPK3.js";/* empty css             *//* empty css             *//* empty css                     */import{S as se}from"./SplitText-Cpc1cBKW.js";import{i as Ke}from"./anime-CP2r1NGk.js";import{O as Ze,W as et,a as De,F as Be,R as Ie,L as be,S as He,V as tt,b as Ne,c as xe,P as ot,M as Ue}from"./three.module-BcibPuIU.js";n.registerPlugin(B);function rt(i){const c=new Date(i).getTime()-Date.now();return c<=0?{days:"00",hours:"00",minutes:"00",seconds:"00"}:{days:String(Math.floor(c/864e5)).padStart(2,"0"),hours:String(Math.floor(c%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(c%36e5/6e4)).padStart(2,"0"),seconds:String(Math.floor(c%6e4/1e3)).padStart(2,"0")}}const nt={kickoff:new Date(Date.now()+4*864e5),home:"Atlético de Madrid",away:"Real Madrid",competition:"LaLiga",extra:"Metropolitano",startMinimized:!1,container:null};function it(i){const c=document.createElement("article");return c.className="next-match"+(i.startMinimized?" is-min":""),c.innerHTML=`
    <div class="watermark" aria-hidden="true"></div>
    <canvas class="web" aria-hidden="true"></canvas>

    <header class="head">
      <div class="eyebrow">Próximo partido</div>
      <button type="button" class="toggle"
              aria-label="${i.startMinimized?"Ampliar tarjeta":"Minimizar tarjeta"}"
              aria-expanded="${i.startMinimized?"false":"true"}">
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
        <span class="t home">${i.home}</span>
        <span class="vs">vs</span>
        <span class="t away">${i.away}</span>
      </div>
      <div class="meta">
        <span class="comp">${i.competition}</span>
        <span class="dot">·</span>
        <span class="extra">${i.extra}</span>
      </div>
    </div>
  `,c}function st(i,c){const t=c.getContext("2d");let e=0,l=0;const u=window.devicePixelRatio||1;let T=[],x=null,E=!1;function P(){const w=i.getBoundingClientRect();e=w.width,l=w.height,c.width=Math.floor(e*u),c.height=Math.floor(l*u),c.style.width=e+"px",c.style.height=l+"px",t.setTransform(u,0,0,u,0,0);const v=e/2,m=l/2,g=e*.55,s=l*.6;T=[];for(let p=0;p<8;p++){const A=p/8*Math.PI*2-Math.PI/2;T.push({x:v+Math.cos(A)*g,y:m+Math.sin(A)*s})}t.clearRect(0,0,e,l)}P();const S=new ResizeObserver(P);S.observe(i);function y(w,v,m,g,s){t.strokeStyle="rgba(216, 200, 245, "+s+")",t.lineWidth=.6,t.lineCap="round",t.beginPath(),t.moveTo(w,v),t.lineTo(m,g),t.stroke()}function d(w){const v=i.getBoundingClientRect(),m=w.clientX-v.left,g=w.clientY-v.top;t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.04)",t.fillRect(0,0,e,l),t.restore();const s=T.slice().sort((p,A)=>(p.x-m)*(p.x-m)+(p.y-g)*(p.y-g)-((A.x-m)*(A.x-m)+(A.y-g)*(A.y-g)));y(s[0].x,s[0].y,m,g,.55),y(s[1].x,s[1].y,m,g,.32),x&&E&&y(x.x,x.y,m,g,.7),x={x:m,y:g}}function a(){E=!0,x=null}function f(){E=!1;let w=0;const v=setInterval(()=>{w++,t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(0,0,e,l),t.restore(),w>14&&(clearInterval(v),t.clearRect(0,0,e,l))},30)}return window.innerWidth>=1e3&&(i.addEventListener("pointerenter",a),i.addEventListener("pointermove",d),i.addEventListener("pointerleave",f)),()=>{S.disconnect(),window.innerWidth>=1e3&&(i.removeEventListener("pointerenter",a),i.removeEventListener("pointermove",d),i.removeEventListener("pointerleave",f))}}function at(i){const c=Object.assign({},nt,i||{}),t=c.kickoff instanceof Date?c.kickoff:new Date(c.kickoff),e=it(c);(c.container||document.body).appendChild(e);let l=c.startMinimized;const u=e.querySelector(".toggle"),T=e.querySelector(".n-d"),x=e.querySelector(".n-h"),E=e.querySelector(".n-m"),P=e.querySelector(".n-s");u.addEventListener("click",()=>{l=!l,e.classList.toggle("is-min",l),u.setAttribute("aria-expanded",l?"false":"true"),u.setAttribute("aria-label",l?"Ampliar tarjeta":"Minimizar tarjeta"),n.to(e,{scale:l?.92:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"})});function S(){const a=rt(t);T.textContent=a.days,x.textContent=a.hours,E.textContent=a.minutes,P.textContent=a.seconds}S();const y=setInterval(S,1e3),d=st(e,e.querySelector(".web"));return B.create({trigger:".hero",start:"bottom top",onLeave:()=>{l||(l=!0,e.classList.add("is-min"),u.setAttribute("aria-expanded","false"),u.setAttribute("aria-label","Ampliar tarjeta"),n.to(e,{scale:.92,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))},onEnter:()=>{l&&(l=!1,e.classList.remove("is-min"),u.setAttribute("aria-expanded","true"),u.setAttribute("aria-label","Minimizar tarjeta"),n.to(e,{scale:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))}}),{element:e,minimize(){l||u.click()},expand(){l&&u.click()},destroy(){clearInterval(y),d(),e.remove()}}}window.NextMatch={mount:at};n.registerPlugin(B);(function(){const i=document.getElementById("df-stage");if(!i)return;const c=i.closest(".dentro-fuera"),t=document.getElementById("df-banner"),e=i.querySelector(".df-blobs"),l=i.querySelector(".df-smudge"),u="http://www.w3.org/2000/svg",T=i.querySelector(".df-grain");if(T){const o=document.createElementNS(u,"defs"),r=document.createElementNS(u,"filter");r.id="df-noise";const h=document.createElementNS(u,"feTurbulence");h.setAttribute("type","fractalNoise"),h.setAttribute("baseFrequency","0.85"),h.setAttribute("numOctaves","2"),h.setAttribute("stitchTiles","stitch"),r.appendChild(h);const M=document.createElementNS(u,"feColorMatrix");M.setAttribute("type","saturate"),M.setAttribute("values","0"),r.appendChild(M),o.appendChild(r),T.prepend(o)}function x(o){return function(){o|=0,o=o+1831565813|0;var r=Math.imul(o^o>>>15,1|o);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296}}function E(o,r){for(var h=r.hx,M=r.hy,b=r.sx,W=r.sy,q=r.N,D=r.maxR,N=r.factor,U=r.start,z=x(r.seed),O=function(te){return(z()*2-1)*te},Q=2.6+(r.irreg||0)*7,J=[],ne=[],le=0;le<q;le++){var ke=4+82*(le/(q-1)),de=(ke+O(Q))*Math.PI/180;J.push([Math.cos(de),Math.sin(de)]),ne.push(1+O(.13*(r.irreg||0)))}var ie=function(te,G){return[(h+b*G*J[te][0]).toFixed(1),(M+W*G*J[te][1]).toFixed(1)]};J.forEach(function(te,G){var he=D*ne[G]*(.86+z()*.2),K=document.createElementNS(u,"line");K.setAttribute("x1",h),K.setAttribute("y1",M);var ve=ie(G,he);K.setAttribute("x2",ve[0]),K.setAttribute("y2",ve[1]),K.setAttribute("class","spoke"),K.setAttribute("stroke-width",(.7+z()*.35).toFixed(2)),o.appendChild(K)});for(var ue=[],ce=U;ce<D*.96;)ue.push(ce),ce*=N+z()*.08;ue.forEach(function(te){for(var G=0;G<q-1;G++)if(!(z()<.06+(r.irreg||0)*.1)){var he=.05+(r.irreg||0)*.13,K=te*ne[G]*(1+O(he)),ve=te*ne[G+1]*(1+O(he)),ge=ie(G,K),ye=ie(G+1,ve),ze=(+ge[0]+ +ye[0])/2,Re=(+ge[1]+ +ye[1])/2,We=.06+z()*.06+O(.06*(r.irreg||0)),Qe=(ze+(h-ze)*We).toFixed(1),Je=(Re+(M-Re)*We).toFixed(1),we=document.createElementNS(u,"path");we.setAttribute("d","M"+ge[0]+" "+ge[1]+" Q"+Qe+" "+Je+" "+ye[0]+" "+ye[1]),we.setAttribute("class",z()<.1?"glint":"capture"),we.setAttribute("stroke-width",(.55+z()*.3).toFixed(2)),o.appendChild(we)}});for(var ee=0;ee<2;ee++){var Te=1+ee*3,Pe=D*(.74+ee*.12),fe=ie(Te,Pe),me=ie(Math.min(Te+3,q-1),Pe*1.02),Fe=(+fe[0]+ +me[0])/2,qe=(+fe[1]+ +me[1])/2,Xe=(Fe+(h-Fe)*.04).toFixed(1),je=(qe+(M-qe)*.04).toFixed(1),pe=document.createElementNS(u,"path");pe.setAttribute("d","M"+fe[0]+" "+fe[1]+" Q"+Xe+" "+je+" "+me[0]+" "+me[1]),pe.setAttribute("class","frame-thread"),pe.setAttribute("stroke-width","0.9"),o.appendChild(pe)}}var P=i.querySelector(".df-web-tl"),S=i.querySelector(".df-web-br");if(P&&E(P,{hx:0,hy:0,sx:1,sy:1,seed:7,N:9,maxR:900,factor:1.3,start:52,irreg:.22}),S&&E(S,{hx:1366,hy:768,sx:-1,sy:-1,seed:41,N:12,maxR:660,factor:1.24,start:40,irreg:.92}),function(){var o=i.querySelector(".df-dots");if(o){for(var r=x(91),h=1366,M=768,b=[],W=0;W<14;W++){var q=r()*h,D=r()*M*.92;b.push([q,D]);var N=document.createElementNS(u,"circle");N.setAttribute("cx",q.toFixed(1)),N.setAttribute("cy",D.toFixed(1)),N.setAttribute("r",(r()*1.1+.6).toFixed(2)),N.setAttribute("class","dot"),o.appendChild(N)}for(var W=0;W<b.length;W++)for(var U=W+1;U<b.length;U++){var z=b[W][0]-b[U][0],O=b[W][1]-b[U][1];if(Math.hypot(z,O)<150&&r()<.25){var Q=document.createElementNS(u,"line");Q.setAttribute("x1",b[W][0].toFixed(1)),Q.setAttribute("y1",b[W][1].toFixed(1)),Q.setAttribute("x2",b[U][0].toFixed(1)),Q.setAttribute("y2",b[U][1].toFixed(1)),Q.setAttribute("class","dot-link"),o.appendChild(Q)}}}}(),function(){var o=i.querySelector(".df-rings");if(o)for(var r=70;r<440;){var h=document.createElementNS(u,"circle");h.setAttribute("cx",450),h.setAttribute("cy",450),h.setAttribute("r",r),h.setAttribute("stroke-width",(.6+Math.random()*.4).toFixed(2)),o.appendChild(h),r*=1.34}}(),!t||!e||!l)return;var y=window.innerWidth<1e3,d={x:0,y:0},a={x:0,y:0},f=!1,w=null,v=[],m=y?60:120,g=0,s=y?40:12,p={smoothing:y?.2:.1,threshold:y?.3:.01,sizeFromSpeed:y?.15:.2,expandMultiplier:2.5,expandTime:900,dissolveStart:700,dissolveTime:1200,burstRadius:y?10:16};function A(o,r,h){if(h||(h=p.burstRadius),!(v.length>=m)){var M=performance.now();if(!(M-g<s)){g=M;var b=document.createElementNS(u,"circle");b.setAttribute("cx",o),b.setAttribute("cy",r),b.setAttribute("r",h),b.setAttribute("fill","#fff"),e.prepend(b),v.push({el:b,start:M,radius:h})}}}function C(o,r){for(var h=y?[8,12,6,10,5,8,7,10,9,7]:[13,18,10,16,8,14,12,17,15,11],M=y?[[0,0],[-8,-5],[8,-4],[-5,8],[5,5],[-10,3],[4,-8],[-4,-9],[9,4],[-6,-3]]:[[0,0],[-12,-8],[12,-6],[-8,10],[8,8],[-14,4],[6,-12],[-5,-14],[14,6],[-9,-4]],b=0;b<h.length;b++)A(o+M[b][0],r+M[b][1],h[b])}function R(){for(v.length=0;e.firstChild;)e.removeChild(e.firstChild)}function k(o,r){var h=t.getBoundingClientRect();return{x:o-h.left,y:r-h.top}}function I(o){var r=k(o.clientX,o.clientY);if(!f){d.x=a.x=r.x,d.y=a.y=r.y,f=!0;return}d.x=r.x,d.y=r.y}function Y(o){I(o)}function F(o){var r=k(o.clientX,o.clientY);C(r.x,r.y)}t.addEventListener("mousemove",Y),t.addEventListener("click",F);function _(o){var r=o.touches?o.touches[0]:o.changedTouches[0];if(r){var h=k(r.clientX,r.clientY);if(!f){d.x=a.x=h.x,d.y=a.y=h.y,f=!0;return}d.x=h.x,d.y=h.y}}t.addEventListener("touchmove",_,{passive:!0}),t.addEventListener("touchstart",function(o){_(o),window.innerWidth<768&&window.lenis&&window.lenis.stop()},{passive:!0}),t.addEventListener("touchend",function(){window.innerWidth<768&&window.lenis&&window.lenis.start()},{passive:!0});function Z(o){if(f){a.x+=(d.x-a.x)*p.smoothing,a.y+=(d.y-a.y)*p.smoothing;var r=Math.hypot(d.x-a.x,d.y-a.y);r>p.threshold&&A(a.x,a.y,r*p.sizeFromSpeed)}for(var h=p.expandTime,M=p.dissolveStart,b=M+p.dissolveTime,W=p.expandMultiplier,q=v.length-1;q>=0;q--){var D=v[q],N=o-D.start;if(N>=b){D.el.parentNode&&D.el.parentNode.removeChild(D.el),v.splice(q,1);continue}var U=D.radius;if(N<h){var z=N/h;z=z<.5?2*z*z:-1+(4-2*z)*z,U=D.radius+(D.radius*W-D.radius)*z}if(N>=M){var O=(N-M)/p.dissolveTime;O=O*O*O,U*=1-Math.min(O,1)}D.el.setAttribute("r",Math.max(0,U))}w=requestAnimationFrame(Z)}w=requestAnimationFrame(Z);function X(){var o=t.getBoundingClientRect();l.setAttribute("viewBox","0 0 "+o.width+" "+o.height),l.style.width=o.width+"px",l.style.height=o.height+"px"}X(),window.addEventListener("resize",X);var L=document.getElementById("df-dentro"),$=document.getElementById("df-fuera");function H(o){o?i.setAttribute("data-side",o):i.removeAttribute("data-side")}L&&(L.addEventListener("mouseenter",function(){H("dentro"),R()}),L.addEventListener("mouseleave",function(){H(null)}),L.addEventListener("focus",function(){H("dentro")}),L.addEventListener("blur",function(){H(null)})),$&&($.addEventListener("mouseenter",function(){H("fuera")}),$.addEventListener("mouseleave",function(){H(null)}),$.addEventListener("focus",function(){H("fuera")}),$.addEventListener("blur",function(){H(null)}));var oe=i.querySelectorAll(".df-lockup"),re=i.querySelector(".df-hint"),j=i.querySelectorAll(".df-web, .df-rings, .df-dots");n.set(t,{opacity:0,scale:.92}),n.set(oe,{opacity:0,y:30}),n.set(j,{opacity:0}),n.set(re,{opacity:0}),B.create({trigger:c,start:"top 85%",once:!0,onEnter:function(){var o=n.timeline({defaults:{ease:"power3.out"}});o.to(j,{opacity:1,duration:.6},0),o.to(t,{opacity:1,scale:1,duration:.9},0),o.to(oe,{opacity:1,y:0,duration:.7,stagger:.15},.15),o.to(re,{opacity:1,duration:.5},.5)}}),c&&window.innerWidth>=1e3&&B.create({trigger:c,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:o=>{document.documentElement.style.setProperty("--df-lockup-scale",1+o.progress*.15)}}),window.addEventListener("beforeunload",function(){t.removeEventListener("mousemove",Y),t.removeEventListener("click",F),t.removeEventListener("touchmove",_),t.removeEventListener("touchstart",_),window.removeEventListener("resize",X),w&&cancelAnimationFrame(w),v.length=0})})();function Oe(i=!1){const c=document.querySelectorAll(".hero-name");if(c.length)if(window.innerWidth>=1e3){const e=[];c.forEach(l=>{const u=new se(l,{type:"chars",charsClass:"hero-char"});e.push(...u.chars)}),n.set(e,{y:()=>-(window.innerHeight+200),visibility:"visible"}),n.to(e,{y:0,duration:.8,stagger:.04,delay:i?.5:0,ease:"power4.out",onComplete:()=>{n.set(e,{clearProps:"transform"})}})}else n.fromTo(c,{opacity:0,y:40,visibility:"visible"},{opacity:1,y:0,duration:.8,stagger:.15,delay:i?.5:0,ease:"power3.out"});const t=document.querySelector(".hero-header-img");t&&window.innerWidth>=1e3?(i&&(t.style.animationDelay="0.5s"),t.classList.add("hero-header-img--enter"),t.addEventListener("animationend",()=>{t.classList.remove("hero-header-img--enter"),t.style.animationDelay="",t.style.transform="translateY(0)"},{once:!0})):t&&n.fromTo(t,{y:"100%",opacity:0},{y:"0%",opacity:1,duration:.8,delay:i?.6:.1,ease:"power2.out",onComplete:()=>{t.style.transform="translateY(0)"}}),n.set(".hero .hero-cards .card",{transformOrigin:"center center"}),n.to(".hero .hero-cards .card",{scale:1,duration:.8,delay:.1,stagger:.05,ease:"power4.out",onComplete:()=>{n.set("#hero-card-1",{transformOrigin:"top right"}),n.set("#hero-card-3",{transformOrigin:"top left"})}})}document.addEventListener("DOMContentLoaded",()=>{n.registerPlugin(B,se),document.addEventListener("preloader:complete",()=>{Oe(!1),B.refresh()},{once:!0}),sessionStorage.getItem("ja_preloader_shown")==="1"&&Oe(!0),Ke();const i=document.querySelector(".about"),c=document.querySelector(".slide-description h1"),t=document.querySelector(".slide-title h1");if(i&&(window.innerWidth>=1e3&&B.create({trigger:i,start:"top top",end:"+=800",pin:!0,scrub:!0,onUpdate:a=>{document.documentElement.style.setProperty("--video-scale",1+a.progress*.2)}}),[c,t].forEach(a=>{a&&se.create(a,{type:"words",wordsClass:"about-word"})}),document.querySelectorAll(".slide-title .about-word").forEach(a=>{a.textContent.trim().toLowerCase().includes("soñando")&&a.classList.add("about-word--textured")}),c||t))if(window.innerWidth>=1e3)n.to(".about-word",{"--highlight-offset":"100%",stagger:.4,scrollTrigger:{trigger:".about",scrub:1,start:"top top",end:"+=800"}});else{const a=document.querySelector(".about-video-wrapper");a&&n.fromTo(a,{scale:.8,opacity:0},{scale:1,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".about",start:"top 90%",once:!0}}),n.fromTo(".about-word",{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.15,ease:"power2.out",scrollTrigger:{trigger:".about",start:"top 80%",once:!0}})}const e=document.querySelector(".row--video-gray");if(e&&window.innerWidth>=1e3){B.create({trigger:e,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:a=>{document.documentElement.style.setProperty("--video-gray-scale",1+a.progress*.2)}});const d=e.querySelectorAll(".video-quote h2, .video-quote p");d.length&&n.fromTo(d,{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.3,ease:"none",scrollTrigger:{trigger:e,scrub:1,start:"top bottom",end:"bottom top"}})}const l=d=>d*d*(3-2*d);window.innerWidth>1e3&&(B.create({trigger:".home-services",start:"top top",end:`+=${window.innerHeight*4}px`,pin:".home-services",pinSpacing:!0}),B.create({trigger:".home-services",start:"top bottom",end:`+=${window.innerHeight*4}`,scrub:1,onUpdate:d=>{const a=d.progress,f=n.utils.clamp(0,1,a/.9),w=n.utils.interpolate("300%","0%",l(f));n.set(".home-services-header",{y:w}),["#card-1","#card-2","#card-3"].forEach((v,m)=>{const g=m*.5,s=n.utils.clamp(0,1,(a-g*.1)/(.9-g*.1)),p=document.querySelector(`${v} .flip-card-inner`);let A;if(s<.4){const F=s/.4;A=n.utils.interpolate("-100%","50%",l(F))}else if(s<.6){const F=(s-.4)/.2;A=n.utils.interpolate("50%","0%",l(F))}else A="0%";let C;if(s<.4){const F=s/.4;C=n.utils.interpolate(.25,.75,l(F))}else if(s<.6){const F=(s-.4)/.2;C=n.utils.interpolate(.75,1,l(F))}else C=1;let R;if(s<.2){const F=s/.2;R=l(F)}else R=1;let k,I,Y;if(s<.6)k=m===0?"100%":m===1?"0%":"-100%",I=m===0?-5:m===1?0:5,Y=0;else if(s<1){const F=(s-.6)/.4;k=n.utils.interpolate(m===0?"100%":m===1?"0%":"-100%","0%",l(F)),I=n.utils.interpolate(m===0?-5:m===1?0:5,0,l(F)),Y=l(F)*180}else k="0%",I=0,Y=180;n.set(v,{opacity:R,y:A,x:k,rotate:I,scale:C}),n.set(p,{rotationY:Y})})}}));const u=document.querySelector(".home-spotlight-images");if(u){const d=u.offsetHeight,a=window.innerHeight,f=d*.05,w=d+f+a,v=document.querySelector(".spotlight-mask-header h3");let m=null;v&&(m=se.create(v,{type:"words",wordsClass:"spotlight-word"}),n.set(m.words,{opacity:0})),B.create({trigger:".home-spotlight",start:"top top",end:`+=${window.innerHeight*7}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:g=>{const s=g.progress;if(s<=.5){const C=s/.5,R=5,k=-(w/d)*100,I=R+(k-R)*C;n.set(u,{y:`${I}%`})}const p=document.querySelector(".spotlight-mask-image-container"),A=document.querySelector(".spotlight-mask-image");if(p&&A)if(s>=.25&&s<=.75){const C=(s-.25)/.5,R=`${C*475}%`,k=1.25-C*.25;p.style.setProperty("-webkit-mask-size",R),p.style.setProperty("mask-size",R),n.set(A,{scale:k})}else s<.25?(p.style.setProperty("-webkit-mask-size","0%"),p.style.setProperty("mask-size","0%"),n.set(A,{scale:1.25})):s>.75&&(p.style.setProperty("-webkit-mask-size","475%"),p.style.setProperty("mask-size","475%"),n.set(A,{scale:1}));if(m&&m.words.length>0)if(s>=.75&&s<=.95){const C=(s-.75)/.2,R=m.words.length;m.words.forEach((k,I)=>{const Y=I/R;C>=Y?n.set(k,{opacity:1}):n.set(k,{opacity:0})})}else s<.75?n.set(m.words,{opacity:0}):s>.95&&n.set(m.words,{opacity:1})}})}const T=document.querySelector(".outro h3");let x=null;T&&(x=se.create(T,{type:"words",wordsClass:"outro-word"}),n.set(x.words,{opacity:0}));const E=document.querySelectorAll(".outro-strip"),P=[.3,.4,.25,.35,.2,.25];if(B.create({trigger:".outro",start:"top top",end:`+=${window.innerHeight*3}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:d=>{const a=d.progress;if(x&&x.words.length>0)if(a>=.25&&a<=.75){const f=(a-.25)/.5,w=x.words.length;x.words.forEach((v,m)=>{const g=m/w;f>=g?n.set(v,{opacity:1}):n.set(v,{opacity:0})})}else a<.25?n.set(x.words,{opacity:0}):a>.75&&n.set(x.words,{opacity:1})}}),B.create({trigger:".outro",start:"top bottom",end:`+=${window.innerHeight*6}px`,scrub:1,onUpdate:d=>{const a=d.progress;E.forEach((f,w)=>{if(P[w]!==void 0){const v=P[w],m=a*100*v;n.set(f,{x:`${m}%`})}})}}),document.querySelector(".work-items")&&B.refresh(),window.innerWidth>=1e3&&document.querySelector(".work-header")){n.set(".work-header-arrow-icon",{scale:0});const d=se.create(".work-header-content p",{type:"lines",mask:"lines"}),a=se.create(".work-header-title h1",{type:"lines",mask:"lines"});n.set([d.lines,a.lines],{y:"120%"});const f=n.timeline({delay:.75});f.to(d.lines,{y:"0%",duration:1,ease:"power4.out"},"-=0.9"),f.to(a.lines,{y:"0%",duration:1,ease:"power4.out",stagger:.1},"-=0.9"),f.to(".work-header-arrow-icon",{scale:1,duration:.75,ease:"power4.out"},"-=0.9")}if(window.innerWidth>=1e3){const d=[-200,-280,-150,-320,-220,-180,-300,-160,-260,-350].map(function(f){return f*.15}),a=[.2,.5,.8,.35,.65,.95,.3,.55,.85,.4];n.utils.toArray(".work-items .work-item-img").forEach((f,w)=>{const v=f.querySelector("img"),m=f.querySelector("video"),g=v?.getAttribute("src")||"";if(m||g.includes("/bio/1.webp")||g.includes("Anexo 9")||g.includes("Anexo 6")||g.includes("Anexo 8"))return;let s=d[w%d.length];g.includes("Anexo 11")&&(s=Math.abs(s)*2),g.includes("Anexo 5")&&(s=-Math.abs(s)*12),g.includes("Anexo 7")&&(s=-Math.abs(s)*12),g.includes("/bio/4.webp")&&(s=-Math.abs(s)),g.includes("/bio/3.webp")&&(s=Math.abs(s)*1.5),g.includes("/bio/2.webp")&&(s=Math.abs(s)),f.classList.contains("work-item-img--bio3")&&(s=Math.abs(s));const p=a[w%a.length];n.to(f,{y:s,ease:"none",scrollTrigger:{trigger:f,start:"top bottom",end:"bottom top",scrub:p}});const C=f.closest(".work-item").querySelector(".work-item-content");C&&!C.classList.contains("no-parallax")&&n.to(C,{y:s*.7,ease:"none",scrollTrigger:{trigger:f,start:"top 85%",end:"bottom top",scrub:Math.min(p*2,1.5)}})}),n.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach(f=>{f.classList.contains("no-parallax")||n.to(f,{y:-30,ease:"none",scrollTrigger:{trigger:f.closest(".row"),start:"top bottom",end:"bottom top",scrub:1}})})}const S=document.getElementById("mi-historia-text");if(S&&window.innerWidth>=1e3){const d=S.textContent;S.textContent="";const a=S.closest(".behind-the-lock");if(a){const f=new IntersectionObserver(w=>{w.forEach(v=>{if(v.isIntersecting&&v.intersectionRatio>.3){const m=n.timeline();d.split("").forEach((g,s)=>{m.call(()=>{S.textContent+=g},[],s*.05)}),f.unobserve(v.target)}})},{threshold:[0,.1,.3,.5]});f.observe(a)}}const y=document.querySelector(".btl-header-text");y&&(n.set(y,{opacity:0,y:30}),n.to(y,{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:y,start:"top bottom",end:"top 30%",scrub:1}})),lt()});function lt(){const i=document.querySelector(".work-timeline"),c=i?.querySelector(".work-timeline-progress"),t=document.querySelector(".work-items");if(!i||!c||!t)return;const e=document.createElement("div");e.style.position="absolute",e.style.left="50%",e.style.top="0",e.style.width="60px",e.style.height="60px",e.style.transform="translate(-50%, -50%)",e.style.pointerEvents="none",e.style.zIndex="3",e.style.filter="drop-shadow(0 0 4px rgba(216,200,245,.4))",i.appendChild(e);const l="http://www.w3.org/2000/svg",u=document.createElementNS(l,"svg");u.setAttribute("viewBox","-30 -30 60 60"),u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.style.display="block",u.style.opacity="1",e.appendChild(u);const T=document.createElementNS(l,"defs");T.innerHTML=`<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`,u.appendChild(T);const x=[];for(let s=0;s<8;s++){const p=document.createElementNS(l,"path");p.setAttribute("class","s-leg"),u.appendChild(p),x.push(p)}const E=document.createElementNS(l,"g");E.innerHTML='<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/><ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/><path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/><path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>',u.appendChild(E);const P=[{side:1,fore:5.2,reach:12,phase:0},{side:1,fore:1.4,reach:14,phase:.5},{side:1,fore:-2.2,reach:14,phase:0},{side:1,fore:-5.6,reach:12,phase:.5},{side:-1,fore:5.2,reach:12,phase:.5},{side:-1,fore:1.4,reach:14,phase:0},{side:-1,fore:-2.2,reach:14,phase:.5},{side:-1,fore:-5.6,reach:12,phase:0}],S=8.6,y=9.2,d=13,a=.6,f=3.4,w=1.6;let v=0,m=0;function g(s){const p=s-m;m=s,v+=p*280;const A=s*100,C=0,R=1,k=1,I=0,Y=Math.sin(2*Math.PI*(v/d))*.5,F=k*(w+Y),_=0,Z=Math.atan2(R,C)*180/Math.PI;E.setAttribute("transform",`translate(${F.toFixed(2)} ${_.toFixed(2)}) rotate(${Z.toFixed(1)})`);for(let X=0;X<8;X++){const L=P[X],$=F+C*L.fore*.45+k*L.side*1.7,H=_+R*L.fore*.45+I*L.side*1.7,oe=F+C*L.fore+k*L.side*L.reach,re=_+R*L.fore+I*L.side*L.reach,j=(v/d+L.phase)%1;let o,r;if(j<a)o=(.5-j/a)*d,r=0;else{const ee=(j-a)/(1-a);o=(ee-.5)*d,r=Math.sin(ee*Math.PI)*f}const h=oe+C*o-(oe-$)/L.reach*r,M=re+R*o-(re-H)/L.reach*r;let b=h-$,W=M-H,q=Math.hypot(b,W);const D=S+y-.2,N=Math.abs(S-y)+.2;q>D&&(q=D),q<N&&(q=N);const U=b/(Math.hypot(b,W)||1),z=W/(Math.hypot(b,W)||1),O=U*q,Q=z*q,J=(q*q+S*S-y*y)/(2*q),ne=Math.sqrt(Math.max(0,S*S-J*J))*L.side,le=-z,ke=U,de=$+U*J+le*ne,ie=H+z*J+ke*ne,ue=$+O,ce=H+Q;x[X].setAttribute("d",`M${$.toFixed(1)} ${H.toFixed(1)} L${de.toFixed(1)} ${ie.toFixed(1)} L${ue.toFixed(1)} ${ce.toFixed(1)}`)}e.style.top=A+"%"}B.create({trigger:t,start:"top 85%",end:"bottom bottom",scrub:!0,onUpdate:s=>{const p=s.progress;c.style.height=p*100+"%",g(p),e.style.display="block"}})}const $e=.15,Ee=document.querySelector(".about-video-wrapper"),V=Ee?.querySelector("video");if(V&&Ee){let i="muted",c=0,t=!1;const e=Ee.querySelector(".video-play-btn"),l=Ee.querySelector(".video-sound-btn"),u='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',T='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>',x='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>',E='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>',P='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';V.muted=!0,V.play().catch(()=>{});const S=()=>{V.paused?(V.play(),e&&(e.innerHTML=u)):(V.pause(),e&&(e.innerHTML=T))},y=()=>{if(V.volume>0)c=V.volume,n.to(V,{volume:0,duration:.2,ease:"power2.out",onComplete:()=>{i="muted",l&&(l.innerHTML=x)}});else{const f=c>0?c:$e;V.muted=!1,c=f,n.to(V,{volume:f,duration:.3,ease:"power2.out"}),i=f===$e?"low":"high",l&&(l.innerHTML=i==="low"?E:P)}},d=()=>{t=!0,S()},a=()=>{if(t){t=!1;return}S()};V.addEventListener("touchstart",d),V.addEventListener("click",a),e&&e.addEventListener("click",f=>{f.stopPropagation(),S()}),l&&l.addEventListener("click",f=>{f.stopPropagation(),y()})}n.registerPlugin(B);const Ce=document.querySelector(".curtain"),Ye=Ce?.querySelector(".curtain-img"),ae=Ce?.querySelector(".curtain-ball");if(Ce&&Ye&&ae){const i=window.innerWidth<=999;i||n.set(ae,{x:window.innerWidth+300,y:window.innerHeight*.08,rotation:0,scale:1});const c=n.timeline({paused:!0});i||(c.to(ae,{x:window.innerWidth*.58,y:window.innerHeight*.45,rotation:540,ease:"power2.in",duration:.42}),c.to(ae,{x:window.innerWidth*.25,y:window.innerHeight*.1,rotation:900,ease:"power2.out",duration:.18}),c.to(ae,{x:window.innerWidth*.05,y:window.innerHeight*.4,rotation:1180,ease:"power2.in",duration:.15}),c.to(ae,{x:-250,y:window.innerHeight*.2,rotation:1500,ease:"power2.out",duration:.25})),B.create({trigger:Ce,start:"top top",end:`+=${i?window.innerHeight*5:window.innerHeight*3}`,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:t=>{const e=t.progress,l=n.parseEase("power3.out")(e);i||(n.set(Ye,{rotation:30*(1-l),scale:.75+.25*l}),c.progress(e))}})}const Ve=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ct=`
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
`,dt=`
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
`;function Se(i){const c=parseInt(i.slice(1,3),16)/255,t=parseInt(i.slice(3,5),16)/255,e=parseInt(i.slice(5,7),16)/255;return[c,t,e]}const Me=document.querySelector(".hero");if(Me&&window.innerWidth>=1e3&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const i=document.createElement("div");i.className="dot-matrix-wrapper",Me.prepend(i);const c=new Ze(-1,1,1,-1,0,1),t=new et({antialias:!0,alpha:!0});t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(Math.min(devicePixelRatio,2)),i.appendChild(t.domElement);const e=.5,l=Math.floor(window.innerWidth*e),u=Math.floor(window.innerHeight*e),T=new De(l,u,{minFilter:be,magFilter:be,format:Ie,type:Be}),x=new De(l,u,{minFilter:be,magFilter:be,format:Ie,type:Be});let E=T,P=x,S=0;const y=new He({uniforms:{iTime:{value:0},iResolution:{value:new Ne(l,u)},iMouse:{value:new tt(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:Ve,fragmentShader:ct}),[d,a,f]=Se("#51398D"),[w,v,m]=Se("#7c5cbf"),[g,s,p]=Se("#3d2a6b"),[A,C,R]=Se("#9b7fd4"),k=new He({uniforms:{iTime:{value:0},iResolution:{value:new Ne(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new xe(d,a,f)},uColor2:{value:new xe(w,v,m)},uColor3:{value:new xe(g,s,p)},uColor4:{value:new xe(A,C,R)},uColorIntensity:{value:.4},uSoftness:{value:2}},vertexShader:Ve,fragmentShader:dt}),I=new ot(2,2),Y=new Ue(I,y),F=new Ue(I,k);let _=0,Z=0,X=0,L=0,$=0;const H=o=>{const r=Me.getBoundingClientRect();X=_,L=Z,_=o.clientX-r.left,Z=r.height-(o.clientY-r.top),$=performance.now(),y.uniforms.iMouse.value.set(_,Z,X,L)},oe=()=>{y.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",H),document.addEventListener("mouseleave",oe);const re=()=>{const o=window.innerWidth,r=window.innerHeight,h=Math.floor(o*e),M=Math.floor(r*e);t.setSize(o,r),y.uniforms.iResolution.value.set(h,M),k.uniforms.iResolution.value.set(o,r),T.setSize(h,M),x.setSize(h,M),S=0};window.addEventListener("resize",re);const j=()=>{if(!Ae)return;requestAnimationFrame(j);const o=performance.now()*.001;y.uniforms.iTime.value=o,k.uniforms.iTime.value=o,y.uniforms.iFrame.value=S,performance.now()-$>100&&y.uniforms.iMouse.value.set(0,0,0,0),y.uniforms.iPreviousFrame.value=P.texture,t.setRenderTarget(E),t.render(Y,c),k.uniforms.iFluid.value=E.texture,t.setRenderTarget(null),t.render(F,c);const r=E;E=P,P=r,S++};var Ae=!0,ut=new IntersectionObserver(function(o){o[0].isIntersecting?Ae||(Ae=!0,requestAnimationFrame(j)):Ae=!1},{threshold:0});ut.observe(Me),j()}const _e="ja_preloader_shown",ft=4e3;function Ge(i){n.set(i,{display:"none"}),document.body.style.overflow="",document.documentElement.style.overflow="",window.lenis&&window.lenis.start()}const Le=document.querySelector(".preloader-wrapper");if(!Le)throw new Error("Preloader wrapper not found");if(sessionStorage.getItem(_e)==="1")Ge(Le);else{let t=function(){if(i)return;function e(u=2){const T=n.timeline(),x=5;let E=0;for(let P=0;P<x;P++){const y=P===x-1?1:Math.min(E+Math.random()*.3+.1,.9);E=y,T.to(".preloader-progress-bar",{scaleX:y,duration:u/x,ease:"power2.out"})}return T}n.timeline({delay:.2,onComplete:c}).add(e(),"0").to(".preloader-wrapper",{y:"-100%",duration:.4,ease:"power4.inOut"})},i=!1;const c=()=>{i||(i=!0,sessionStorage.setItem(_e,"1"),Ge(Le),document.dispatchEvent(new CustomEvent("preloader:complete")))};setTimeout(c,ft),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",window.lenis&&window.lenis.stop(),document.readyState==="complete"?t():window.addEventListener("load",t)}
