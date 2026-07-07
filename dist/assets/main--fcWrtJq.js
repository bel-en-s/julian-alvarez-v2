import{g as o,S as I}from"./menu-B9qiF-MQ.js";/* empty css             *//* empty css             *//* empty css                     */import{S as ie}from"./SplitText-Cpc1cBKW.js";import{i as nt}from"./anime-DFv7vVfx.js";import{O as it,W as st,a as Oe,F as Ne,R as Ue,L as Ce,S as $e,V as at,b as Ve,c as Te,P as lt,M as Ye}from"./three.module-BcibPuIU.js";o.registerPlugin(I);function ct(e){const l=new Date(e).getTime()-Date.now();return l<=0?{days:"00",hours:"00",minutes:"00",seconds:"00"}:{days:String(Math.floor(l/864e5)).padStart(2,"0"),hours:String(Math.floor(l%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(l%36e5/6e4)).padStart(2,"0"),seconds:String(Math.floor(l%6e4/1e3)).padStart(2,"0")}}const dt={kickoff:new Date(Date.now()+4*864e5),home:"Atlético de Madrid",away:"Real Madrid",competition:"LaLiga",extra:"Metropolitano",startMinimized:!1,container:null};function ut(e){const l=document.createElement("article");return l.className="next-match"+(e.startMinimized?" is-min":""),l.innerHTML=`
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
  `,l}function ft(e,l){const t=l.getContext("2d");let i=0,c=0;const g=window.devicePixelRatio||1;let R=[],M=null,b=!1;function C(){const h=e.getBoundingClientRect();i=h.width,c=h.height,l.width=Math.floor(i*g),l.height=Math.floor(c*g),l.style.width=i+"px",l.style.height=c+"px",t.setTransform(g,0,0,g,0,0);const v=i/2,d=c/2,m=i*.55,a=c*.6;R=[];for(let y=0;y<8;y++){const A=y/8*Math.PI*2-Math.PI/2;R.push({x:v+Math.cos(A)*m,y:d+Math.sin(A)*a})}t.clearRect(0,0,i,c)}C();const x=new ResizeObserver(C);x.observe(e);function w(h,v,d,m,a){t.strokeStyle="rgba(216, 200, 245, "+a+")",t.lineWidth=.6,t.lineCap="round",t.beginPath(),t.moveTo(h,v),t.lineTo(d,m),t.stroke()}function u(h){const v=e.getBoundingClientRect(),d=h.clientX-v.left,m=h.clientY-v.top;t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.04)",t.fillRect(0,0,i,c),t.restore();const a=R.slice().sort((y,A)=>(y.x-d)*(y.x-d)+(y.y-m)*(y.y-m)-((A.x-d)*(A.x-d)+(A.y-m)*(A.y-m)));w(a[0].x,a[0].y,d,m,.55),w(a[1].x,a[1].y,d,m,.32),M&&b&&w(M.x,M.y,d,m,.7),M={x:d,y:m}}function s(){b=!0,M=null}function f(){b=!1;let h=0;const v=setInterval(()=>{h++,t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(0,0,i,c),t.restore(),h>14&&(clearInterval(v),t.clearRect(0,0,i,c))},30)}return window.innerWidth>=768&&(e.addEventListener("pointerenter",s),e.addEventListener("pointermove",u),e.addEventListener("pointerleave",f)),()=>{x.disconnect(),window.innerWidth>=768&&(e.removeEventListener("pointerenter",s),e.removeEventListener("pointermove",u),e.removeEventListener("pointerleave",f))}}function mt(e){const l=Object.assign({},dt,e||{}),t=l.kickoff instanceof Date?l.kickoff:new Date(l.kickoff),i=ut(l);(l.container||document.body).appendChild(i);let c=l.startMinimized;const g=i.querySelector(".toggle"),R=i.querySelector(".n-d"),M=i.querySelector(".n-h"),b=i.querySelector(".n-m"),C=i.querySelector(".n-s");g.addEventListener("click",()=>{c=!c,i.classList.toggle("is-min",c),g.setAttribute("aria-expanded",c?"false":"true"),g.setAttribute("aria-label",c?"Ampliar tarjeta":"Minimizar tarjeta"),o.to(i,{scale:c?.92:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"})});function x(){const s=ct(t);R.textContent=s.days,M.textContent=s.hours,b.textContent=s.minutes,C.textContent=s.seconds}x();const w=setInterval(x,1e3),u=ft(i,i.querySelector(".web"));return I.create({trigger:".hero",start:"bottom top",onLeave:()=>{c||(c=!0,i.classList.add("is-min"),g.setAttribute("aria-expanded","false"),g.setAttribute("aria-label","Ampliar tarjeta"),o.to(i,{scale:.92,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))},onEnter:()=>{c&&(c=!1,i.classList.remove("is-min"),g.setAttribute("aria-expanded","true"),g.setAttribute("aria-label","Minimizar tarjeta"),o.to(i,{scale:1,transformOrigin:"bottom left",duration:.45,ease:"power3.out",overwrite:"auto"}))}}),{element:i,minimize(){c||g.click()},expand(){c&&g.click()},destroy(){clearInterval(w),u(),i.remove()}}}window.NextMatch={mount:mt};o.registerPlugin(I);(function(){const e=document.getElementById("df-stage");if(!e)return;const l=e.closest(".dentro-fuera"),t=document.getElementById("df-banner"),i=e.querySelector(".df-blobs"),c=e.querySelector(".df-smudge"),g="http://www.w3.org/2000/svg",R=e.querySelector(".df-grain");if(R){const r=document.createElementNS(g,"defs"),n=document.createElementNS(g,"filter");n.id="df-noise";const p=document.createElementNS(g,"feTurbulence");p.setAttribute("type","fractalNoise"),p.setAttribute("baseFrequency","0.85"),p.setAttribute("numOctaves","2"),p.setAttribute("stitchTiles","stitch"),n.appendChild(p);const k=document.createElementNS(g,"feColorMatrix");k.setAttribute("type","saturate"),k.setAttribute("values","0"),n.appendChild(k),r.appendChild(n),R.prepend(r)}function M(r){return function(){r|=0,r=r+1831565813|0;var n=Math.imul(r^r>>>15,1|r);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function b(r,n){for(var p=n.hx,k=n.hy,S=n.sx,W=n.sy,O=n.N,B=n.maxR,U=n.factor,N=n.start,L=M(n.seed),F=function(oe){return(L()*2-1)*oe},X=2.6+(n.irreg||0)*7,re=[],te=[],ne=0;ne<O;ne++){var ze=4+82*(ne/(O-1)),ye=(ze+F(X))*Math.PI/180;re.push([Math.cos(ye),Math.sin(ye)]),te.push(1+F(.13*(n.irreg||0)))}var J=function(oe,G){return[(p+S*G*re[oe][0]).toFixed(1),(k+W*G*re[oe][1]).toFixed(1)]};re.forEach(function(oe,G){var Se=B*te[G]*(.86+L()*.2),ee=document.createElementNS(g,"line");ee.setAttribute("x1",p),ee.setAttribute("y1",k);var Me=J(G,Se);ee.setAttribute("x2",Me[0]),ee.setAttribute("y2",Me[1]),ee.setAttribute("class","spoke"),ee.setAttribute("stroke-width",(.7+L()*.35).toFixed(2)),r.appendChild(ee)});for(var pe=[],he=N;he<B*.96;)pe.push(he),he*=U+L()*.08;pe.forEach(function(oe){for(var G=0;G<O-1;G++)if(!(L()<.06+(n.irreg||0)*.1)){var Se=.05+(n.irreg||0)*.13,ee=oe*te[G]*(1+F(Se)),Me=oe*te[G+1]*(1+F(Se)),Ee=J(G,ee),ke=J(G+1,Me),De=(+Ee[0]+ +ke[0])/2,Ie=(+Ee[1]+ +ke[1])/2,He=.06+L()*.06+F(.06*(n.irreg||0)),ot=(De+(p-De)*He).toFixed(1),rt=(Ie+(k-Ie)*He).toFixed(1),Ae=document.createElementNS(g,"path");Ae.setAttribute("d","M"+Ee[0]+" "+Ee[1]+" Q"+ot+" "+rt+" "+ke[0]+" "+ke[1]),Ae.setAttribute("class",L()<.1?"glint":"capture"),Ae.setAttribute("stroke-width",(.55+L()*.3).toFixed(2)),r.appendChild(Ae)}});for(var le=0;le<2;le++){var we=1+le*3,be=B*(.74+le*.12),ce=J(we,be),de=J(Math.min(we+3,O-1),be*1.02),ue=(+ce[0]+ +de[0])/2,Be=(+ce[1]+ +de[1])/2,et=(ue+(p-ue)*.04).toFixed(1),tt=(Be+(k-Be)*.04).toFixed(1),xe=document.createElementNS(g,"path");xe.setAttribute("d","M"+ce[0]+" "+ce[1]+" Q"+et+" "+tt+" "+de[0]+" "+de[1]),xe.setAttribute("class","frame-thread"),xe.setAttribute("stroke-width","0.9"),r.appendChild(xe)}}var C=e.querySelector(".df-web-tl"),x=e.querySelector(".df-web-br");if(C&&b(C,{hx:0,hy:0,sx:1,sy:1,seed:7,N:9,maxR:900,factor:1.3,start:52,irreg:.22}),x&&b(x,{hx:1366,hy:768,sx:-1,sy:-1,seed:41,N:12,maxR:660,factor:1.24,start:40,irreg:.92}),function(){var r=e.querySelector(".df-dots");if(r){for(var n=M(91),p=1366,k=768,S=[],W=0;W<14;W++){var O=n()*p,B=n()*k*.92;S.push([O,B]);var U=document.createElementNS(g,"circle");U.setAttribute("cx",O.toFixed(1)),U.setAttribute("cy",B.toFixed(1)),U.setAttribute("r",(n()*1.1+.6).toFixed(2)),U.setAttribute("class","dot"),r.appendChild(U)}for(var W=0;W<S.length;W++)for(var N=W+1;N<S.length;N++){var L=S[W][0]-S[N][0],F=S[W][1]-S[N][1];if(Math.hypot(L,F)<150&&n()<.25){var X=document.createElementNS(g,"line");X.setAttribute("x1",S[W][0].toFixed(1)),X.setAttribute("y1",S[W][1].toFixed(1)),X.setAttribute("x2",S[N][0].toFixed(1)),X.setAttribute("y2",S[N][1].toFixed(1)),X.setAttribute("class","dot-link"),r.appendChild(X)}}}}(),function(){var r=e.querySelector(".df-rings");if(r)for(var n=70;n<440;){var p=document.createElementNS(g,"circle");p.setAttribute("cx",450),p.setAttribute("cy",450),p.setAttribute("r",n),p.setAttribute("stroke-width",(.6+Math.random()*.4).toFixed(2)),r.appendChild(p),n*=1.34}}(),!t||!i||!c)return;var w=window.innerWidth<768,u={x:0,y:0},s={x:0,y:0},f=!1,h=null,v=[],d=w?60:120,m=0,a=w?40:12,y={smoothing:w?.2:.1,threshold:w?.3:.01,sizeFromSpeed:w?.15:.2,expandMultiplier:2.5,expandTime:900,dissolveStart:700,dissolveTime:1200,burstRadius:w?10:16};function A(r,n,p){if(p||(p=y.burstRadius),!(v.length>=d)){var k=performance.now();if(!(k-m<a)){m=k;var S=document.createElementNS(g,"circle");S.setAttribute("cx",r),S.setAttribute("cy",n),S.setAttribute("r",p),S.setAttribute("fill","#fff"),i.prepend(S),v.push({el:S,start:k,radius:p})}}}function q(r,n){for(var p=w?[8,12,6,10,5,8,7,10,9,7]:[13,18,10,16,8,14,12,17,15,11],k=w?[[0,0],[-8,-5],[8,-4],[-5,8],[5,5],[-10,3],[4,-8],[-4,-9],[9,4],[-6,-3]]:[[0,0],[-12,-8],[12,-6],[-8,10],[8,8],[-14,4],[6,-12],[-5,-14],[14,6],[-9,-4]],S=0;S<p.length;S++)A(r+k[S][0],n+k[S][1],p[S])}function H(){for(v.length=0;i.firstChild;)i.removeChild(i.firstChild)}function E(r,n){var p=t.getBoundingClientRect();return{x:r-p.left,y:n-p.top}}function P(r){var n=E(r.clientX,r.clientY);if(!f){u.x=s.x=n.x,u.y=s.y=n.y,f=!0;return}u.x=n.x,u.y=n.y}function V(r){P(r)}function T(r){var n=E(r.clientX,r.clientY);q(n.x,n.y)}t.addEventListener("mousemove",V),t.addEventListener("click",T);function Y(r){var n=r.touches?r.touches[0]:r.changedTouches[0];if(n){var p=E(n.clientX,n.clientY);if(!f){u.x=s.x=p.x,u.y=s.y=p.y,f=!0;return}u.x=p.x,u.y=p.y}}t.addEventListener("touchmove",Y,{passive:!0}),t.addEventListener("touchstart",function(r){Y(r),window.innerWidth<768&&window.lenis&&window.lenis.stop()},{passive:!0}),t.addEventListener("touchend",function(){window.innerWidth<768&&window.lenis&&window.lenis.start()},{passive:!0});function j(r){if(f){s.x+=(u.x-s.x)*y.smoothing,s.y+=(u.y-s.y)*y.smoothing;var n=Math.hypot(u.x-s.x,u.y-s.y);n>y.threshold&&A(s.x,s.y,n*y.sizeFromSpeed)}for(var p=y.expandTime,k=y.dissolveStart,S=k+y.dissolveTime,W=y.expandMultiplier,O=v.length-1;O>=0;O--){var B=v[O],U=r-B.start;if(U>=S){B.el.parentNode&&B.el.parentNode.removeChild(B.el),v.splice(O,1);continue}var N=B.radius;if(U<p){var L=U/p;L=L<.5?2*L*L:-1+(4-2*L)*L,N=B.radius+(B.radius*W-B.radius)*L}if(U>=k){var F=(U-k)/y.dissolveTime;F=F*F*F,N*=1-Math.min(F,1)}B.el.setAttribute("r",Math.max(0,N))}h=requestAnimationFrame(j)}h=requestAnimationFrame(j);function K(){var r=t.getBoundingClientRect();c.setAttribute("viewBox","0 0 "+r.width+" "+r.height),c.style.width=r.width+"px",c.style.height=r.height+"px"}K(),window.addEventListener("resize",K);var Q=document.getElementById("df-dentro"),_=document.getElementById("df-fuera");function $(r){r?e.setAttribute("data-side",r):e.removeAttribute("data-side")}Q&&(Q.addEventListener("mouseenter",function(){$("dentro"),H()}),Q.addEventListener("mouseleave",function(){$(null)}),Q.addEventListener("focus",function(){$("dentro")}),Q.addEventListener("blur",function(){$(null)})),_&&(_.addEventListener("mouseenter",function(){$("fuera")}),_.addEventListener("mouseleave",function(){$(null)}),_.addEventListener("focus",function(){$("fuera")}),_.addEventListener("blur",function(){$(null)}));var ae=e.querySelectorAll(".df-lockup"),Z=e.querySelector(".df-hint"),z=e.querySelectorAll(".df-web, .df-rings, .df-dots");o.set(t,{opacity:0,scale:.92}),o.set(ae,{opacity:0,y:30}),o.set(z,{opacity:0}),o.set(Z,{opacity:0}),I.create({trigger:l,start:"top 85%",once:!0,onEnter:function(){var r=o.timeline({defaults:{ease:"power3.out"}});r.to(z,{opacity:1,duration:.6},0),r.to(t,{opacity:1,scale:1,duration:.9},0),r.to(ae,{opacity:1,y:0,duration:.7,stagger:.15},.15),r.to(Z,{opacity:1,duration:.5},.5)}}),l&&window.innerWidth>=768&&I.create({trigger:l,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:r=>{document.documentElement.style.setProperty("--df-lockup-scale",1+r.progress*.15)}}),window.addEventListener("beforeunload",function(){t.removeEventListener("mousemove",V),t.removeEventListener("click",T),t.removeEventListener("touchmove",Y),t.removeEventListener("touchstart",Y),window.removeEventListener("resize",K),h&&cancelAnimationFrame(h),v.length=0})})();function _e(e=!1){const l=document.querySelectorAll(".hero-name");if(l.length)if(window.innerWidth>=768){const i=[];l.forEach(c=>{const g=new ie(c,{type:"chars",charsClass:"hero-char"});i.push(...g.chars)}),o.set(i,{y:()=>-(window.innerHeight+200),visibility:"visible"}),o.to(i,{y:0,duration:.8,stagger:.04,delay:e?.5:0,ease:"power4.out",onComplete:()=>{o.set(i,{clearProps:"transform"})}})}else o.fromTo(l,{opacity:0,y:40,visibility:"visible"},{opacity:1,y:0,duration:.8,stagger:.15,delay:e?.5:0,ease:"power3.out"});const t=document.querySelector(".hero-header-img");t&&window.innerWidth>=768?(e&&(t.style.animationDelay="0.5s"),t.classList.add("hero-header-img--enter"),t.addEventListener("animationend",()=>{t.classList.remove("hero-header-img--enter"),t.style.animationDelay="",t.style.transform="translateY(0)"},{once:!0})):t&&o.fromTo(t,{y:"100%",opacity:0},{y:"0%",opacity:1,duration:.8,delay:e?.6:.1,ease:"power2.out",onComplete:()=>{t.style.transform="translateY(0)"}}),o.set(".hero .hero-cards .card",{transformOrigin:"center center"}),o.to(".hero .hero-cards .card",{scale:1,duration:.8,delay:.1,stagger:.05,ease:"power4.out",onComplete:()=>{o.set("#hero-card-1",{transformOrigin:"top right"}),o.set("#hero-card-3",{transformOrigin:"top left"})}})}document.addEventListener("DOMContentLoaded",()=>{o.registerPlugin(I,ie),document.addEventListener("preloader:complete",()=>{_e(!1),I.refresh()},{once:!0}),sessionStorage.getItem("ja_preloader_shown")==="1"&&_e(!0),nt();const e=document.querySelector(".about"),l=document.querySelector(".slide-description h1"),t=document.querySelector(".slide-title h1");if(e&&(window.innerWidth>=768&&I.create({trigger:e,start:"top top",end:"+=800",pin:!0,scrub:!0,onUpdate:s=>{document.documentElement.style.setProperty("--video-scale",1+s.progress*.2)}}),[l,t].forEach(s=>{s&&ie.create(s,{type:"words",wordsClass:"about-word"})}),document.querySelectorAll(".slide-title .about-word").forEach(s=>{s.textContent.trim().toLowerCase().includes("soñando")&&s.classList.add("about-word--textured")}),l||t))if(window.innerWidth>=768)o.to(".about-word",{"--highlight-offset":"100%",stagger:.4,scrollTrigger:{trigger:".about",scrub:1,start:"top top",end:"+=800"}});else{const s=document.querySelector(".about-video-wrapper");s&&o.fromTo(s,{scale:.8,opacity:0},{scale:1,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".about",start:"top 90%",once:!0}}),o.fromTo(".about-word",{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.15,ease:"power2.out",scrollTrigger:{trigger:".about",start:"top 80%",once:!0}})}const i=document.querySelector(".row--video-gray");if(i&&window.innerWidth>=768){I.create({trigger:i,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:s=>{document.documentElement.style.setProperty("--video-gray-scale",1+s.progress*.2)}});const u=i.querySelectorAll(".video-quote h2, .video-quote p");u.length&&o.fromTo(u,{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.3,ease:"none",scrollTrigger:{trigger:i,scrub:1,start:"top bottom",end:"bottom top"}})}const c=u=>u*u*(3-2*u);window.innerWidth>768&&(I.create({trigger:".home-services",start:"top top",end:`+=${window.innerHeight*4}px`,pin:".home-services",pinSpacing:!0}),I.create({trigger:".home-services",start:"top bottom",end:`+=${window.innerHeight*4}`,scrub:1,onUpdate:u=>{const s=u.progress,f=o.utils.clamp(0,1,s/.9),h=o.utils.interpolate("300%","0%",c(f));o.set(".home-services-header",{y:h}),["#card-1","#card-2","#card-3"].forEach((v,d)=>{const m=d*.5,a=o.utils.clamp(0,1,(s-m*.1)/(.9-m*.1)),y=document.querySelector(`${v} .flip-card-inner`);let A;if(a<.4){const T=a/.4;A=o.utils.interpolate("-100%","50%",c(T))}else if(a<.6){const T=(a-.4)/.2;A=o.utils.interpolate("50%","0%",c(T))}else A="0%";let q;if(a<.4){const T=a/.4;q=o.utils.interpolate(.25,.75,c(T))}else if(a<.6){const T=(a-.4)/.2;q=o.utils.interpolate(.75,1,c(T))}else q=1;let H;if(a<.2){const T=a/.2;H=c(T)}else H=1;let E,P,V;if(a<.6)E=d===0?"100%":d===1?"0%":"-100%",P=d===0?-5:d===1?0:5,V=0;else if(a<1){const T=(a-.6)/.4;E=o.utils.interpolate(d===0?"100%":d===1?"0%":"-100%","0%",c(T)),P=o.utils.interpolate(d===0?-5:d===1?0:5,0,c(T)),V=c(T)*180}else E="0%",P=0,V=180;o.set(v,{opacity:H,y:A,x:E,rotate:P,scale:q}),o.set(y,{rotationY:V})})}}));const g=document.querySelector(".home-spotlight-images");if(g){const u=g.offsetHeight,s=window.innerHeight,f=u*.05,h=u+f+s,v=document.querySelector(".spotlight-mask-header h3");let d=null;v&&(d=ie.create(v,{type:"words",wordsClass:"spotlight-word"}),o.set(d.words,{opacity:0})),I.create({trigger:".home-spotlight",start:"top top",end:`+=${window.innerHeight*7}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:m=>{const a=m.progress;if(a<=.5){const q=a/.5,H=5,E=-(h/u)*100,P=H+(E-H)*q;o.set(g,{y:`${P}%`})}const y=document.querySelector(".spotlight-mask-image-container"),A=document.querySelector(".spotlight-mask-image");if(y&&A)if(a>=.25&&a<=.75){const q=(a-.25)/.5,H=`${q*475}%`,E=1.25-q*.25;y.style.setProperty("-webkit-mask-size",H),y.style.setProperty("mask-size",H),o.set(A,{scale:E})}else a<.25?(y.style.setProperty("-webkit-mask-size","0%"),y.style.setProperty("mask-size","0%"),o.set(A,{scale:1.25})):a>.75&&(y.style.setProperty("-webkit-mask-size","475%"),y.style.setProperty("mask-size","475%"),o.set(A,{scale:1}));if(d&&d.words.length>0)if(a>=.75&&a<=.95){const q=(a-.75)/.2,H=d.words.length;d.words.forEach((E,P)=>{const V=P/H;q>=V?o.set(E,{opacity:1}):o.set(E,{opacity:0})})}else a<.75?o.set(d.words,{opacity:0}):a>.95&&o.set(d.words,{opacity:1})}})}const R=document.querySelector(".outro h3");let M=null;R&&(M=ie.create(R,{type:"words",wordsClass:"outro-word"}),o.set(M.words,{opacity:0}));const b=document.querySelectorAll(".outro-strip"),C=[.3,.4,.25,.35,.2,.25];if(I.create({trigger:".outro",start:"top top",end:`+=${window.innerHeight*3}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:u=>{const s=u.progress;if(M&&M.words.length>0)if(s>=.25&&s<=.75){const f=(s-.25)/.5,h=M.words.length;M.words.forEach((v,d)=>{const m=d/h;f>=m?o.set(v,{opacity:1}):o.set(v,{opacity:0})})}else s<.25?o.set(M.words,{opacity:0}):s>.75&&o.set(M.words,{opacity:1})}}),I.create({trigger:".outro",start:"top bottom",end:`+=${window.innerHeight*6}px`,scrub:1,onUpdate:u=>{const s=u.progress;b.forEach((f,h)=>{if(C[h]!==void 0){const v=C[h],d=s*100*v;o.set(f,{x:`${d}%`})}})}}),document.querySelector(".work-items")&&I.refresh(),window.innerWidth>=768&&document.querySelector(".work-header")){o.set(".work-header-arrow-icon",{scale:0});const u=ie.create(".work-header-content p",{type:"lines",mask:"lines"}),s=ie.create(".work-header-title h1",{type:"lines",mask:"lines"});o.set([u.lines,s.lines],{y:"120%"});const f=o.timeline({delay:.75});f.to(u.lines,{y:"0%",duration:1,ease:"power4.out"},"-=0.9"),f.to(s.lines,{y:"0%",duration:1,ease:"power4.out",stagger:.1},"-=0.9"),f.to(".work-header-arrow-icon",{scale:1,duration:.75,ease:"power4.out"},"-=0.9")}if(window.innerWidth>=768){const u=[-200,-280,-150,-320,-220,-180,-300,-160,-260,-350].map(function(f){return f*.15}),s=[.2,.5,.8,.35,.65,.95,.3,.55,.85,.4];o.utils.toArray(".work-items .work-item-img").forEach((f,h)=>{const v=f.querySelector("img"),d=f.querySelector("video"),m=v?.getAttribute("src")||"";if(d||m.includes("/bio/1.webp")||m.includes("Anexo 9")||m.includes("Anexo 6")||m.includes("Anexo 8"))return;let a=u[h%u.length];m.includes("Anexo 11")&&(a=Math.abs(a)*2),m.includes("Anexo 5")&&(a=-Math.abs(a)*12),m.includes("Anexo 7")&&(a=-Math.abs(a)*12),m.includes("/bio/4.webp")&&(a=-Math.abs(a)),m.includes("/bio/3.webp")&&(a=Math.abs(a)*1.5),m.includes("/bio/2.webp")&&(a=Math.abs(a)),f.classList.contains("work-item-img--bio3")&&(a=Math.abs(a));const y=s[h%s.length];o.to(f,{y:a,ease:"none",scrollTrigger:{trigger:f,start:"top bottom",end:"bottom top",scrub:y}});const q=f.closest(".work-item").querySelector(".work-item-content");q&&!q.classList.contains("no-parallax")&&o.to(q,{y:a*.7,ease:"none",scrollTrigger:{trigger:f,start:"top 85%",end:"bottom top",scrub:Math.min(y*2,1.5)}})}),o.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach(f=>{f.classList.contains("no-parallax")||o.to(f,{y:-30,ease:"none",scrollTrigger:{trigger:f.closest(".row"),start:"top bottom",end:"bottom top",scrub:1}})})}const x=document.getElementById("mi-historia-text");if(x&&window.innerWidth>=768){const u=x.textContent;x.textContent="";const s=x.closest(".behind-the-lock");if(s){const f=new IntersectionObserver(h=>{h.forEach(v=>{if(v.isIntersecting&&v.intersectionRatio>.3){const d=o.timeline();u.split("").forEach((m,a)=>{d.call(()=>{x.textContent+=m},[],a*.05)}),f.unobserve(v.target)}})},{threshold:[0,.1,.3,.5]});f.observe(s)}}const w=document.querySelector(".btl-header-text");w&&(o.set(w,{opacity:0,y:30}),o.to(w,{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:w,start:"top bottom",end:"top 30%",scrub:1}})),pt()});function pt(){const e=document.querySelector(".work-timeline"),l=e?.querySelector(".work-timeline-progress"),t=document.querySelector(".work-items");if(!e||!l||!t)return;const i=t.querySelector(".row--first"),c=t.querySelector(".row--2021");if(!i||!c)return;const g=i.offsetTop,M=c.offsetTop-i.offsetTop+80;e.style.top=g+"px",e.style.height=M+"px",e.style.bottom="auto";const b=document.createElement("div");b.style.position="absolute",b.style.left="50%",b.style.top="0",b.style.width="60px",b.style.height="60px",b.style.transform="translate(-50%, -50%)",b.style.pointerEvents="none",b.style.zIndex="3",b.style.filter="drop-shadow(0 0 4px rgba(216,200,245,.4))",e.appendChild(b);const C="http://www.w3.org/2000/svg",x=document.createElementNS(C,"svg");x.setAttribute("viewBox","-30 -30 60 60"),x.setAttribute("width","100%"),x.setAttribute("height","100%"),x.style.display="block",x.style.opacity="1",b.appendChild(x);const w=document.createElementNS(C,"defs");w.innerHTML=`<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`,x.appendChild(w);const u=[];for(let E=0;E<8;E++){const P=document.createElementNS(C,"path");P.setAttribute("class","s-leg"),x.appendChild(P),u.push(P)}const s=document.createElementNS(C,"g");s.innerHTML='<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/><ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/><path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/><path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>',x.appendChild(s);const f=[{side:1,fore:5.2,reach:12,phase:0},{side:1,fore:1.4,reach:14,phase:.5},{side:1,fore:-2.2,reach:14,phase:0},{side:1,fore:-5.6,reach:12,phase:.5},{side:-1,fore:5.2,reach:12,phase:.5},{side:-1,fore:1.4,reach:14,phase:0},{side:-1,fore:-2.2,reach:14,phase:.5},{side:-1,fore:-5.6,reach:12,phase:0}],h=8.6,v=9.2,d=13,m=.6,a=3.4,y=1.6;let A=0,q=0;function H(E){const P=E-q;q=E,A+=P*280;const V=E*100,T=0,Y=1,j=1,K=0,Q=Math.sin(2*Math.PI*(A/d))*.5,_=j*(y+Q),$=0,ae=Math.atan2(Y,T)*180/Math.PI;s.setAttribute("transform",`translate(${_.toFixed(2)} ${$.toFixed(2)}) rotate(${ae.toFixed(1)})`);for(let Z=0;Z<8;Z++){const z=f[Z],r=_+T*z.fore*.45+j*z.side*1.7,n=$+Y*z.fore*.45+K*z.side*1.7,p=_+T*z.fore+j*z.side*z.reach,k=$+Y*z.fore+K*z.side*z.reach,S=(A/d+z.phase)%1;let W,O;if(S<m)W=(.5-S/m)*d,O=0;else{const ue=(S-m)/(1-m);W=(ue-.5)*d,O=Math.sin(ue*Math.PI)*a}const B=p+T*W-(p-r)/z.reach*O,U=k+Y*W-(k-n)/z.reach*O;let N=B-r,L=U-n,F=Math.hypot(N,L);const X=h+v-.2,re=Math.abs(h-v)+.2;F>X&&(F=X),F<re&&(F=re);const te=N/(Math.hypot(N,L)||1),ne=L/(Math.hypot(N,L)||1),ze=te*F,ye=ne*F,J=(F*F+h*h-v*v)/(2*F),pe=Math.sqrt(Math.max(0,h*h-J*J))*z.side,he=-ne,le=te,we=r+te*J+he*pe,be=n+ne*J+le*pe,ce=r+ze,de=n+ye;u[Z].setAttribute("d",`M${r.toFixed(1)} ${n.toFixed(1)} L${we.toFixed(1)} ${be.toFixed(1)} L${ce.toFixed(1)} ${de.toFixed(1)}`)}b.style.top=V+"%"}I.create({trigger:i,start:"top 87%",endTrigger:e,end:"bottom bottom",scrub:!0,onUpdate:E=>{const P=E.progress;l.style.height=P*100+"%",H(P),b.style.display="block"}})}const Re=.15,ge=document.querySelector(".about-video-wrapper"),D=ge?.querySelector("video");if(D&&ge){let e="muted",l=0,t=!1;const i=ge.querySelector(".video-play-btn"),c=ge.querySelector(".video-sound-btn"),g='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',R='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>',M='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>',C='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';D.muted=!0,D.play().catch(()=>{});const x=()=>{D.paused?(D.play(),i&&(i.innerHTML=g)):(D.pause(),i&&(i.innerHTML=R))},w=()=>{if(o.killTweensOf(D),e!=="muted")l=D.volume||0,o.to(D,{volume:0,duration:.2,ease:"power2.out",onComplete:()=>{e="muted",c&&(c.innerHTML=M)}});else{const d=l>0?l:Re;D.muted=!1,l=d,o.to(D,{volume:d,duration:.3,ease:"power2.out"}),e=d===Re?"low":"high",c&&(c.innerHTML=e==="low"?b:C)}},u=()=>{t=!0,x()},s=()=>{if(t){t=!1;return}x()};D.addEventListener("touchstart",u),D.addEventListener("click",s),i&&i.addEventListener("click",d=>{d.stopPropagation(),x()}),c&&c.addEventListener("click",d=>{d.stopPropagation(),w()});let f=null,h=0;const v=ge.closest(".about");v&&new IntersectionObserver(m=>{m.forEach(a=>{if(!a.isIntersecting)e!=="muted"&&(f=e,h=l,o.killTweensOf(D),o.to(D,{volume:0,duration:.15,ease:"power2.out",onComplete:()=>{e="muted",c&&(c.innerHTML=M)}}));else if(f&&f!=="muted"){const y=h>0?h:Re;D.muted=!1,l=y,e=f,o.killTweensOf(D),o.to(D,{volume:y,duration:.3,ease:"power2.out"}),c&&(c.innerHTML=f==="low"?b:C),f=null,h=0}})},{threshold:0}).observe(v)}const Ge=document.querySelector(".video-expand-btn"),se=document.getElementById("video-modal"),fe=se?.querySelector("video"),Xe=se?.querySelector(".video-modal-close"),je=se?.querySelector(".video-modal-backdrop"),ve=document.querySelector(".work-item--video video");if(Ge&&se&&fe){const e=()=>{se.classList.add("is-open"),document.body.style.overflow="hidden",fe.currentTime=ve?.currentTime||0,fe.muted=!1,fe.volume=.3,fe.play().catch(()=>{}),ve&&ve.pause()},l=()=>{se.classList.remove("is-open"),document.body.style.overflow="",fe.pause(),ve&&ve.play().catch(()=>{})};Ge.addEventListener("click",e),Xe&&Xe.addEventListener("click",l),je&&je.addEventListener("click",l),document.addEventListener("keydown",t=>{t.key==="Escape"&&se.classList.contains("is-open")&&l()})}o.registerPlugin(I);const Pe=document.querySelector(".curtain"),Qe=Pe?.querySelector(".curtain-img"),me=Pe?.querySelector(".curtain-ball");if(Pe&&Qe&&me){const e=window.innerWidth<=999;e||o.set(me,{x:window.innerWidth+300,y:window.innerHeight*.08,rotation:0,scale:1});const l=o.timeline({paused:!0});e||(l.to(me,{x:window.innerWidth*.58,y:window.innerHeight*.45,rotation:540,ease:"power2.in",duration:.42}),l.to(me,{x:window.innerWidth*.25,y:window.innerHeight*.1,rotation:900,ease:"power2.out",duration:.18}),l.to(me,{x:window.innerWidth*.05,y:window.innerHeight*.4,rotation:1180,ease:"power2.in",duration:.15}),l.to(me,{x:-250,y:window.innerHeight*.2,rotation:1500,ease:"power2.out",duration:.25})),I.create({trigger:Pe,start:"top top",end:`+=${e?window.innerHeight*5:window.innerHeight*3}`,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:t=>{const i=t.progress,c=o.parseEase("power3.out")(i);e||(o.set(Qe,{rotation:30*(1-c),scale:.75+.25*c}),l.progress(i))}})}const Je=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ht=`
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
`,vt=`
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
`;function Le(e){const l=parseInt(e.slice(1,3),16)/255,t=parseInt(e.slice(3,5),16)/255,i=parseInt(e.slice(5,7),16)/255;return[l,t,i]}const Fe=document.querySelector(".hero");if(Fe&&window.innerWidth>=768&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const e=document.createElement("div");e.className="dot-matrix-wrapper",Fe.prepend(e);const l=new it(-1,1,1,-1,0,1),t=new st({antialias:!0,alpha:!0});t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(Math.min(devicePixelRatio,2)),e.appendChild(t.domElement);const i=.5,c=Math.floor(window.innerWidth*i),g=Math.floor(window.innerHeight*i),R=new Oe(c,g,{minFilter:Ce,magFilter:Ce,format:Ue,type:Ne}),M=new Oe(c,g,{minFilter:Ce,magFilter:Ce,format:Ue,type:Ne});let b=R,C=M,x=0;const w=new $e({uniforms:{iTime:{value:0},iResolution:{value:new Ve(c,g)},iMouse:{value:new at(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:Je,fragmentShader:ht}),[u,s,f]=Le("#51398D"),[h,v,d]=Le("#7c5cbf"),[m,a,y]=Le("#3d2a6b"),[A,q,H]=Le("#9b7fd4"),E=new $e({uniforms:{iTime:{value:0},iResolution:{value:new Ve(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new Te(u,s,f)},uColor2:{value:new Te(h,v,d)},uColor3:{value:new Te(m,a,y)},uColor4:{value:new Te(A,q,H)},uColorIntensity:{value:.4},uSoftness:{value:2}},vertexShader:Je,fragmentShader:vt}),P=new lt(2,2),V=new Ye(P,w),T=new Ye(P,E);let Y=0,j=0,K=0,Q=0,_=0;const $=r=>{const n=Fe.getBoundingClientRect();K=Y,Q=j,Y=r.clientX-n.left,j=n.height-(r.clientY-n.top),_=performance.now(),w.uniforms.iMouse.value.set(Y,j,K,Q)},ae=()=>{w.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",$),document.addEventListener("mouseleave",ae);const Z=()=>{const r=window.innerWidth,n=window.innerHeight,p=Math.floor(r*i),k=Math.floor(n*i);t.setSize(r,n),w.uniforms.iResolution.value.set(p,k),E.uniforms.iResolution.value.set(r,n),R.setSize(p,k),M.setSize(p,k),x=0};window.addEventListener("resize",Z);const z=()=>{if(!qe)return;requestAnimationFrame(z);const r=performance.now()*.001;w.uniforms.iTime.value=r,E.uniforms.iTime.value=r,w.uniforms.iFrame.value=x,performance.now()-_>100&&w.uniforms.iMouse.value.set(0,0,0,0),w.uniforms.iPreviousFrame.value=C.texture,t.setRenderTarget(b),t.render(V,l),E.uniforms.iFluid.value=b.texture,t.setRenderTarget(null),t.render(T,l);const n=b;b=C,C=n,x++};var qe=!0,gt=new IntersectionObserver(function(r){r[0].isIntersecting?qe||(qe=!0,requestAnimationFrame(z)):qe=!1},{threshold:0});gt.observe(Fe),z()}const Ke="ja_preloader_shown",yt=4e3;function Ze(e){o.set(e,{display:"none"}),document.body.style.overflow="",document.documentElement.style.overflow="",window.lenis&&window.lenis.start()}const We=document.querySelector(".preloader-wrapper");if(!We)throw new Error("Preloader wrapper not found");if(sessionStorage.getItem(Ke)==="1")Ze(We);else{let t=function(){if(e)return;function i(g=2){const R=o.timeline(),M=5;let b=0;for(let C=0;C<M;C++){const w=C===M-1?1:Math.min(b+Math.random()*.3+.1,.9);b=w,R.to(".preloader-progress-bar",{scaleX:w,duration:g/M,ease:"power2.out"})}return R}o.timeline({delay:.2,onComplete:l}).add(i(),"0").to(".preloader-wrapper",{y:"-100%",duration:.4,ease:"power4.inOut"})},e=!1;const l=()=>{e||(e=!0,sessionStorage.setItem(Ke,"1"),Ze(We),document.dispatchEvent(new CustomEvent("preloader:complete")))};setTimeout(l,yt),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",window.lenis&&window.lenis.stop(),document.readyState==="complete"?t():window.addEventListener("load",t)}
