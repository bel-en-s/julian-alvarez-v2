import"./modulepreload-polyfill-B5Qt9EMX.js";import{g as c,S as D}from"./menu-DW9AgvVT.js";/* empty css             *//* empty css             */import{S as me}from"./SplitText-C-wHGKK9.js";import{i as yt}from"./anime-DxQ3yJ8I.js";import"./cursor-web-BldBBD09.js";import{O as wt,W as bt,a as Ve,F as Ge,R as Xe,L as qe,S as _e,V as xt,b as je,c as Fe,P as St,M as Ze}from"./three.module-FvbYFgPc.js";c.registerPlugin(D);function Qe(e){const o=new Date(e).getTime()-Date.now();return o<=0?{days:"00",hours:"00",minutes:"00",seconds:"00"}:{days:String(Math.floor(o/864e5)).padStart(2,"0"),hours:String(Math.floor(o%864e5/36e5)).padStart(2,"0"),minutes:String(Math.floor(o%36e5/6e4)).padStart(2,"0"),seconds:String(Math.floor(o%6e4/1e3)).padStart(2,"0")}}const Mt={kickoff:new Date(Date.now()+4*864e5),home:"Atlético de Madrid",away:"Real Madrid",competition:"LaLiga",extra:"Metropolitano",startMinimized:!1,container:null};function kt(e){const o=document.createElement("article");return o.className="next-match"+(e.startMinimized?" is-min":""),o.innerHTML=`
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
  `,o}function Et(e,o){const t=o.getContext("2d");let r=0,n=0;const s=window.devicePixelRatio||1;let h=[],l=null,d=!1;function y(){const g=e.getBoundingClientRect();r=g.width,n=g.height,o.width=Math.floor(r*s),o.height=Math.floor(n*s),o.style.width=r+"px",o.style.height=n+"px",t.setTransform(s,0,0,s,0,0);const A=r/2,C=n/2,b=r*.55,z=n*.6;h=[];for(let S=0;S<8;S++){const W=S/8*Math.PI*2-Math.PI/2;h.push({x:A+Math.cos(W)*b,y:C+Math.sin(W)*z})}t.clearRect(0,0,r,n)}y();const f=new ResizeObserver(y);f.observe(e);function u(g,A,C,b,z){t.strokeStyle="rgba(216, 200, 245, "+z+")",t.lineWidth=.6,t.lineCap="round",t.beginPath(),t.moveTo(g,A),t.lineTo(C,b),t.stroke()}function p(g){const A=e.getBoundingClientRect(),C=g.clientX-A.left,b=g.clientY-A.top;t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.04)",t.fillRect(0,0,r,n),t.restore();const z=h.slice().sort((S,W)=>(S.x-C)*(S.x-C)+(S.y-b)*(S.y-b)-((W.x-C)*(W.x-C)+(W.y-b)*(W.y-b)));u(z[0].x,z[0].y,C,b,.55),u(z[1].x,z[1].y,C,b,.32),l&&d&&u(l.x,l.y,C,b,.7),l={x:C,y:b}}function w(){d=!0,l=null}function E(){d=!1;let g=0;const A=setInterval(()=>{g++,t.save(),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(0,0,r,n),t.restore(),g>14&&(clearInterval(A),t.clearRect(0,0,r,n))},30)}return window.innerWidth>=768&&(e.addEventListener("pointerenter",w),e.addEventListener("pointermove",p),e.addEventListener("pointerleave",E)),()=>{f.disconnect(),window.innerWidth>=768&&(e.removeEventListener("pointerenter",w),e.removeEventListener("pointermove",p),e.removeEventListener("pointerleave",E))}}function At(e){const o=Object.assign({},Mt,e||{}),t=o.kickoff instanceof Date?o.kickoff:new Date(o.kickoff),r=kt(o);(o.container||document.body).appendChild(r);let n=o.startMinimized;const s=r.querySelector(".toggle"),h=r.querySelector(".n-d"),l=r.querySelector(".n-h"),d=r.querySelector(".n-m"),y=r.querySelector(".n-s"),f=window.innerWidth<760;let u=null,p=null,w=null,E=null;if(f){let $=function(){const L=Qe(t);b.textContent=L.days,z.textContent=L.hours,S.textContent=L.minutes,W.textContent=L.seconds,u.classList.add("is-open"),document.body.style.overflow="hidden"},J=function(){u.classList.remove("is-open"),document.body.style.overflow=""};u=document.createElement("div"),u.className="nm-overlay",u.innerHTML=`
      <div class="nm-backdrop"></div>
      <div class="nm-popup next-match">
        <div class="watermark" aria-hidden="true"></div>
        <header class="head">
          <div class="eyebrow">Próximo partido</div>
          <button type="button" class="nm-close" aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>
        <div class="countdown" aria-live="polite">
          <div class="unit"><span class="n n-d">00</span><span class="u">Días</span></div>
          <span class="sep">:</span>
          <div class="unit"><span class="n n-h">00</span><span class="u">Horas</span></div>
          <span class="sep">:</span>
          <div class="unit"><span class="n n-m">00</span><span class="u">Min</span></div>
          <span class="sep">:</span>
          <div class="unit"><span class="n n-s">00</span><span class="u">Seg</span></div>
        </div>
        <div class="nm-extra">
          <div class="teams">
            <span class="t home">${o.home}</span>
            <span class="vs">vs</span>
            <span class="t away">${o.away}</span>
          </div>
          <div class="meta">
            <span class="comp">${o.competition}</span>
            <span class="dot">·</span>
            <span class="extra">${o.extra}</span>
          </div>
        </div>
      </div>
    `,document.body.appendChild(u),p=u.querySelector(".nm-popup"),w=u.querySelector(".nm-close"),E=u.querySelector(".nm-backdrop");const b=p.querySelector(".n-d"),z=p.querySelector(".n-h"),S=p.querySelector(".n-m"),W=p.querySelector(".n-s");w.addEventListener("click",()=>{n=!0,r.classList.add("is-min"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-label","Ampliar tarjeta"),J()}),E.addEventListener("click",()=>{n=!0,r.classList.add("is-min"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-label","Ampliar tarjeta"),J()}),document.addEventListener("keydown",L=>{L.key==="Escape"&&u.classList.contains("is-open")&&(n=!0,r.classList.add("is-min"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-label","Ampliar tarjeta"),J())}),s.addEventListener("click",()=>{n&&$()})}f||s.addEventListener("click",()=>{n=!n,r.classList.toggle("is-min",n),s.setAttribute("aria-expanded",n?"false":"true"),s.setAttribute("aria-label",n?"Ampliar tarjeta":"Minimizar tarjeta")});function g(){const b=Qe(t);if(h.textContent=b.days,l.textContent=b.hours,d.textContent=b.minutes,y.textContent=b.seconds,f&&p){const z=p.querySelector(".n-d"),S=p.querySelector(".n-h"),W=p.querySelector(".n-m"),$=p.querySelector(".n-s");z.textContent=b.days,S.textContent=b.hours,W.textContent=b.minutes,$.textContent=b.seconds}}g();const A=setInterval(g,1e3),C=Et(r,r.querySelector(".web"));return D.create({trigger:".hero",start:"bottom top",onLeave:()=>{f?(n=!0,r.classList.add("is-min"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-label","Ampliar tarjeta"),u&&u.classList.remove("is-open"),document.body.style.overflow==="hidden"&&(document.body.style.overflow="")):n||(n=!0,r.classList.add("is-min"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-label","Ampliar tarjeta"))},onEnter:()=>{f||n&&(n=!1,r.classList.remove("is-min"),s.setAttribute("aria-expanded","true"),s.setAttribute("aria-label","Minimizar tarjeta"))}}),{element:r,minimize(){n||s.click()},expand(){n&&s.click()},destroy(){clearInterval(A),C(),r.remove(),u&&u.remove()}}}window.NextMatch={mount:At};c.registerPlugin(D);(function(){const e=document.getElementById("df-stage");if(!e)return;const o=e.closest(".dentro-fuera"),t=document.getElementById("df-banner"),r=e.querySelector(".df-blobs"),n=e.querySelector(".df-smudge"),s="http://www.w3.org/2000/svg",h=e.querySelector(".df-grain");if(h){const a=document.createElementNS(s,"defs"),i=document.createElementNS(s,"filter");i.id="df-noise";const m=document.createElementNS(s,"feTurbulence");m.setAttribute("type","fractalNoise"),m.setAttribute("baseFrequency","0.85"),m.setAttribute("numOctaves","2"),m.setAttribute("stitchTiles","stitch"),i.appendChild(m);const x=document.createElementNS(s,"feColorMatrix");x.setAttribute("type","saturate"),x.setAttribute("values","0"),i.appendChild(x),a.appendChild(i),h.prepend(a)}function l(a){return function(){a|=0,a=a+1831565813|0;var i=Math.imul(a^a>>>15,1|a);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function d(a,i){for(var m=i.hx,x=i.hy,v=i.sx,T=i.sy,B=i.N,q=i.maxR,N=i.factor,F=i.start,M=l(i.seed),k=function(ae){return(M()*2-1)*ae},G=2.6+(i.irreg||0)*7,P=[],I=[],H=0;H<B;H++){var he=4+82*(H/(B-1)),ve=(he+k(G))*Math.PI/180;P.push([Math.cos(ve),Math.sin(ve)]),I.push(1+k(.13*(i.irreg||0)))}var X=function(ae,j){return[(m+v*j*P[ae][0]).toFixed(1),(x+T*j*P[ae][1]).toFixed(1)]};P.forEach(function(ae,j){var Ee=q*I[j]*(.86+M()*.2),oe=document.createElementNS(s,"line");oe.setAttribute("x1",m),oe.setAttribute("y1",x);var Ae=X(j,Ee);oe.setAttribute("x2",Ae[0]),oe.setAttribute("y2",Ae[1]),oe.setAttribute("class","spoke"),oe.setAttribute("stroke-width",(.7+M()*.35).toFixed(2)),a.appendChild(oe)});for(var ne=[],se=F;se<q*.96;)ne.push(se),se*=N+M()*.08;ne.forEach(function(ae){for(var j=0;j<B-1;j++)if(!(M()<.06+(i.irreg||0)*.1)){var Ee=.05+(i.irreg||0)*.13,oe=ae*I[j]*(1+k(Ee)),Ae=ae*I[j+1]*(1+k(Ee)),Ce=X(j,oe),Le=X(j+1,Ae),$e=(+Ce[0]+ +Le[0])/2,Ue=(+Ce[1]+ +Le[1])/2,Ye=.06+M()*.06+k(.06*(i.irreg||0)),vt=($e+(m-$e)*Ye).toFixed(1),gt=(Ue+(x-Ue)*Ye).toFixed(1),Te=document.createElementNS(s,"path");Te.setAttribute("d","M"+Ce[0]+" "+Ce[1]+" Q"+vt+" "+gt+" "+Le[0]+" "+Le[1]),Te.setAttribute("class",M()<.1?"glint":"capture"),Te.setAttribute("stroke-width",(.55+M()*.3).toFixed(2)),a.appendChild(Te)}});for(var ie=0;ie<2;ie++){var le=1+ie*3,ce=q*(.74+ie*.12),ge=X(le,ce),ye=X(Math.min(le+3,B-1),ce*1.02),we=(+ge[0]+ +ye[0])/2,Oe=(+ge[1]+ +ye[1])/2,pt=(we+(m-we)*.04).toFixed(1),ht=(Oe+(x-Oe)*.04).toFixed(1),ke=document.createElementNS(s,"path");ke.setAttribute("d","M"+ge[0]+" "+ge[1]+" Q"+pt+" "+ht+" "+ye[0]+" "+ye[1]),ke.setAttribute("class","frame-thread"),ke.setAttribute("stroke-width","0.9"),a.appendChild(ke)}}var y=e.querySelector(".df-web-tl"),f=e.querySelector(".df-web-br");if(y&&d(y,{hx:0,hy:0,sx:1,sy:1,seed:7,N:9,maxR:900,factor:1.3,start:52,irreg:.22}),f&&d(f,{hx:1366,hy:768,sx:-1,sy:-1,seed:41,N:12,maxR:660,factor:1.24,start:40,irreg:.92}),function(){var a=e.querySelector(".df-dots");if(a){for(var i=l(91),m=1366,x=768,v=[],T=0;T<14;T++){var B=i()*m,q=i()*x*.92;v.push([B,q]);var N=document.createElementNS(s,"circle");N.setAttribute("cx",B.toFixed(1)),N.setAttribute("cy",q.toFixed(1)),N.setAttribute("r",(i()*1.1+.6).toFixed(2)),N.setAttribute("class","dot"),a.appendChild(N)}for(var T=0;T<v.length;T++)for(var F=T+1;F<v.length;F++){var M=v[T][0]-v[F][0],k=v[T][1]-v[F][1];if(Math.hypot(M,k)<150&&i()<.25){var G=document.createElementNS(s,"line");G.setAttribute("x1",v[T][0].toFixed(1)),G.setAttribute("y1",v[T][1].toFixed(1)),G.setAttribute("x2",v[F][0].toFixed(1)),G.setAttribute("y2",v[F][1].toFixed(1)),G.setAttribute("class","dot-link"),a.appendChild(G)}}}}(),function(){var a=e.querySelector(".df-rings");if(a)for(var i=70;i<440;){var m=document.createElementNS(s,"circle");m.setAttribute("cx",450),m.setAttribute("cy",450),m.setAttribute("r",i),m.setAttribute("stroke-width",(.6+Math.random()*.4).toFixed(2)),a.appendChild(m),i*=1.34}}(),!t||!r||!n)return;var u=window.innerWidth<768,p={x:0,y:0},w={x:0,y:0},E=!1,g=null,A=[],C=u?60:120,b=0,z=u?40:12,S={smoothing:u?.2:.1,threshold:u?.3:.01,sizeFromSpeed:u?.15:.2,expandMultiplier:2.5,expandTime:900,dissolveStart:700,dissolveTime:1200,burstRadius:u?10:16};function W(a,i,m){if(m||(m=S.burstRadius),!(A.length>=C)){var x=performance.now();if(!(x-b<z)){b=x;var v=document.createElementNS(s,"circle");v.setAttribute("cx",a),v.setAttribute("cy",i),v.setAttribute("r",m),v.setAttribute("fill","#fff"),r.prepend(v),A.push({el:v,start:x,radius:m})}}}function $(a,i){for(var m=u?[8,12,6,10,5,8,7,10,9,7]:[13,18,10,16,8,14,12,17,15,11],x=u?[[0,0],[-8,-5],[8,-4],[-5,8],[5,5],[-10,3],[4,-8],[-4,-9],[9,4],[-6,-3]]:[[0,0],[-12,-8],[12,-6],[-8,10],[8,8],[-14,4],[6,-12],[-5,-14],[14,6],[-9,-4]],v=0;v<m.length;v++)W(a+x[v][0],i+x[v][1],m[v])}function J(){for(A.length=0;r.firstChild;)r.removeChild(r.firstChild)}function L(a,i){var m=t.getBoundingClientRect();return{x:a-m.left,y:i-m.top}}function Y(a){var i=L(a.clientX,a.clientY);if(!E){p.x=w.x=i.x,p.y=w.y=i.y,E=!0;return}p.x=i.x,p.y=i.y}function fe(a){Y(a)}function K(a){var i=L(a.clientX,a.clientY);$(i.x,i.y)}t.addEventListener("mousemove",fe),t.addEventListener("click",K);function V(a){var i=a.touches?a.touches[0]:a.changedTouches[0];if(i){var m=L(i.clientX,i.clientY);if(!E){p.x=w.x=m.x,p.y=w.y=m.y,E=!0;return}p.x=m.x,p.y=m.y}}t.addEventListener("touchmove",V,{passive:!0}),t.addEventListener("touchstart",function(a){V(a),window.innerWidth<768&&window.lenis&&window.lenis.stop()},{passive:!0}),t.addEventListener("touchend",function(){window.innerWidth<768&&window.lenis&&window.lenis.start()},{passive:!0});function Z(a){if(E){w.x+=(p.x-w.x)*S.smoothing,w.y+=(p.y-w.y)*S.smoothing;var i=Math.hypot(p.x-w.x,p.y-w.y);i>S.threshold&&W(w.x,w.y,i*S.sizeFromSpeed)}for(var m=S.expandTime,x=S.dissolveStart,v=x+S.dissolveTime,T=S.expandMultiplier,B=A.length-1;B>=0;B--){var q=A[B],N=a-q.start;if(N>=v){q.el.parentNode&&q.el.parentNode.removeChild(q.el),A.splice(B,1);continue}var F=q.radius;if(N<m){var M=N/m;M=M<.5?2*M*M:-1+(4-2*M)*M,F=q.radius+(q.radius*T-q.radius)*M}if(N>=x){var k=(N-x)/S.dissolveTime;k=k*k*k,F*=1-Math.min(k,1)}q.el.setAttribute("r",Math.max(0,F))}g=requestAnimationFrame(Z)}g=requestAnimationFrame(Z);function ee(){var a=t.getBoundingClientRect();n.setAttribute("viewBox","0 0 "+a.width+" "+a.height),n.style.width=a.width+"px",n.style.height=a.height+"px"}ee(),window.addEventListener("resize",ee),u&&function(){var a=t.getBoundingClientRect(),i=a.width,m=a.height,x=0,v=0,T=i/2,B=m/2,q=1,N=4;function F(){x=(x+1)%N,v=0}function M(){var P,I,H;switch(x){case 0:H=v/60,P=10+H*(i-20),I=10+H*(m-20),$(P,I),v++,v>60&&F(),k=setTimeout(M,55);break;case 1:H=v/60,P=i-10-H*(i-20),I=10+H*(m-20),$(P,I),v++,v>60&&(F(),q*=-1),k=setTimeout(M,55);break;case 2:H=v/100;var he=10,ve=Math.min(i,m)*.4,X=v*.1*q,ne=he+(ve-he)*(1-Math.abs(H*2-1));P=T+Math.cos(X)*ne,I=B+Math.sin(X)*ne,P=Math.max(5,Math.min(i-5,P)),I=Math.max(5,Math.min(m-5,I)),$(P,I),v++,v>100&&F(),k=setTimeout(M,50);break;case 3:H=v/100;var se=10,ie=Math.min(i,m)*.4,le=v*.1*-q,ce=se+(ie-se)*(1-Math.abs(H*2-1));P=T+Math.cos(le)*ce,I=B+Math.sin(le)*ce,P=Math.max(5,Math.min(i-5,P)),I=Math.max(5,Math.min(m-5,I)),$(P,I),v++,v>100&&F(),k=setTimeout(M,50);break}}var k=setTimeout(M,300),G=new IntersectionObserver(function(P){P[0].isIntersecting?(a=t.getBoundingClientRect(),i=a.width,m=a.height,T=i/2,B=m/2,k=setTimeout(M,100)):clearTimeout(k)},{threshold:0});G.observe(o)}();var Q=document.getElementById("df-dentro"),_=document.getElementById("df-fuera");function U(a){a?e.setAttribute("data-side",a):e.removeAttribute("data-side")}Q&&(Q.addEventListener("mouseenter",function(){U("dentro"),J()}),Q.addEventListener("mouseleave",function(){U(null)}),Q.addEventListener("focus",function(){U("dentro")}),Q.addEventListener("blur",function(){U(null)})),_&&(_.addEventListener("mouseenter",function(){U("fuera")}),_.addEventListener("mouseleave",function(){U(null)}),_.addEventListener("focus",function(){U("fuera")}),_.addEventListener("blur",function(){U(null)}));var pe=e.querySelectorAll(".df-lockup"),te=e.querySelector(".df-hint"),R=e.querySelectorAll(".df-web, .df-rings, .df-dots");c.set(t,{opacity:0,scale:.92}),c.set(pe,{opacity:0,y:30}),c.set(R,{opacity:0}),c.set(te,{opacity:0}),D.create({trigger:o,start:"top 85%",once:!0,onEnter:function(){var a=c.timeline({defaults:{ease:"power3.out"}});a.to(R,{opacity:1,duration:.6},0),a.to(t,{opacity:1,scale:1,duration:.9},0),a.to(pe,{opacity:1,y:0,duration:.7,stagger:.15},.15),a.to(te,{opacity:1,duration:.5},.5)}}),o&&window.innerWidth>=768&&D.create({trigger:o,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:a=>{document.documentElement.style.setProperty("--df-lockup-scale",1+a.progress*.15)}}),window.addEventListener("beforeunload",function(){t.removeEventListener("mousemove",fe),t.removeEventListener("click",K),t.removeEventListener("touchmove",V),t.removeEventListener("touchstart",V),window.removeEventListener("resize",ee),g&&cancelAnimationFrame(g),A.length=0})})();function dt(e,o=0){if(!e)return;let t=[...e.querySelectorAll(":scope > .hero-char")];if(!(t.length>0)){const d=new me(e,{type:"chars",charsClass:"hero-char"});if(!d.chars||!d.chars.length)return;t=d.chars,e.style.background="none",e.style.webkitBackgroundClip="unset",e.style.backgroundClip="unset",e.style.webkitTextFillColor="unset",e.closest(".hero-name")&&Ct(e)}const n=e.textContent||"",s=[...new Set(n.toUpperCase().split(""))].filter(Boolean),h=s.length>1?s:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",l=t.map(d=>d.textContent);t.forEach(d=>{d.textContent=h[Math.floor(Math.random()*h.length)]}),t.forEach((d,y)=>{const f=Math.floor(Math.random()*5)+4;let u=0;setTimeout(()=>{const p=setInterval(()=>{d.textContent=h[Math.floor(Math.random()*h.length)],u++,u>=f&&(clearInterval(p),d.textContent=l[y])},50)},o*1e3+y*40)})}function ut(e=!1){const o=document.querySelectorAll(".hero-name-text");if(o.length){const n=e?.4:0;o.forEach((s,h)=>{dt(s,n+h*.15)})}const t=document.querySelector(".hero-header-img");t&&window.innerWidth>=768?(e&&(t.style.animationDelay="0.5s"),t.classList.add("hero-header-img--enter"),t.addEventListener("animationend",()=>{t.classList.remove("hero-header-img--enter"),t.style.animationDelay="",t.style.transform="translateY(0)"},{once:!0})):t&&c.fromTo(t,{y:"100%",opacity:0},{y:"0%",opacity:1,duration:.8,delay:e?.6:.1,ease:"power2.out",onComplete:()=>{t.style.transform="translateY(0)"}});var r=document.querySelectorAll(".hero .hero-cards .card");r.length&&(c.set(r,{transformOrigin:"center center"}),c.to(r,{scale:1,duration:.8,delay:.1,stagger:.05,ease:"power4.out",onComplete:()=>{var n=document.querySelector("#hero-card-1"),s=document.querySelector("#hero-card-3");n&&c.set(n,{transformOrigin:"top right"}),s&&c.set(s,{transformOrigin:"top left"})}}))}function mt(e,o){const t=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=o%2===0?-1:1;let n=null;c.set(e,{rotateZ:0,scale:1,willChange:"transform",transformOrigin:"50% 50%"});const s=()=>{t||(c.to(e,{rotateZ:r*8,scale:1.04,y:-1,duration:.32,ease:"expo.out",overwrite:"auto"}),n?.kill(),n=c.to(e,{rotateZ:r*10,duration:.9,ease:"sine.inOut",repeat:-1,yoyo:!0,overwrite:"auto"}))},h=()=>{t||(n?.kill(),n=null,c.to(e,{rotateZ:0,scale:1,y:0,duration:.55,ease:"expo.out",overwrite:"auto"}))};e.addEventListener("pointerenter",s),e.addEventListener("pointerleave",h)}function Ct(e){const o=e.querySelectorAll(".hero-char");if(!o.length)return;const t=e.getBoundingClientRect().height;t&&o.forEach(r=>{r.style.backgroundImage="linear-gradient(to bottom, #FFFFFF, var(--ja-amethyst-300))",r.style.backgroundSize="100% "+t+"px",r.style.backgroundPosition="0 0",r.style.backgroundClip="text",r.style.webkitBackgroundClip="text",r.style.webkitTextFillColor="transparent",r.style.color="transparent",r.style.paddingLeft="0.03em",r.style.paddingRight="0.03em",r.style.paddingTop="0.15em",r.style.paddingBottom="0.05em",r.style.marginLeft="-0.01em",r.style.marginRight="-0.01em",r.style.marginTop="-0.1em",r.style.marginBottom="-0.03em"})}function ft(){document.querySelectorAll(".hero-name .hero-char").forEach((o,t)=>mt(o,t))}c.registerPlugin(D,me);document.addEventListener("preloader:complete",()=>{ut(!1),ft(),D.refresh()},{once:!0});sessionStorage.getItem("ja_preloader_shown")==="1"&&(ut(!0),ft());yt();const Je=document.querySelector(".hero-scroll-wrapper");if(Je&&window.innerWidth>=768){let e=0,o=0,t=0,r=0;document.addEventListener("mousemove",n=>{e=n.clientX+140,o=n.clientY+140}),c.ticker.add(()=>{t+=(e-t)*.04,r+=(o-r)*.04,c.set(Je,{x:t,y:r})})}const Ke=document.querySelector(".about"),et=document.querySelector(".slide-description h1"),tt=document.querySelector(".slide-title h1");if(Ke&&(window.innerWidth>=768&&D.create({trigger:Ke,start:"top top",end:"+=800",pin:!0,scrub:!0,onUpdate:o=>{document.documentElement.style.setProperty("--video-scale",1+o.progress*.2)}}),[et,tt].forEach(o=>{o&&me.create(o,{type:"words",wordsClass:"about-word"})}),document.querySelectorAll(".slide-title .about-word").forEach(o=>{o.textContent.trim().toLowerCase().includes("soñando")&&o.classList.add("about-word--textured")}),et||tt)){const o=document.querySelector(".about-video-wrapper");o&&c.fromTo(o,{scale:.8,opacity:0},{scale:1,opacity:1,duration:1.2,ease:"power3.out",scrollTrigger:{trigger:".about",start:"top 90%",once:!0}}),c.to(".about-word",{"--highlight-offset":"100%",stagger:.4,scrollTrigger:{trigger:".about",scrub:1,start:"top top",end:"+=400"}})}const Pe=document.querySelector(".row--video-gray");if(Pe&&window.innerWidth>=768){D.create({trigger:Pe,start:"top bottom",end:"bottom top",scrub:!0,onUpdate:o=>{document.documentElement.style.setProperty("--video-gray-scale",1+o.progress*.2)}});const e=Pe.querySelectorAll(".video-quote h2, .video-quote p");e.length&&c.fromTo(e,{"--highlight-offset":"0%"},{"--highlight-offset":"100%",stagger:.3,ease:"none",scrollTrigger:{trigger:Pe,scrub:1,start:"top bottom",end:"bottom top"}})}const re=e=>e*e*(3-2*e);window.innerWidth>768&&(D.create({trigger:".home-services",start:"top top",end:`+=${window.innerHeight*4}px`,pin:".home-services",pinSpacing:!0}),D.create({trigger:".home-services",start:"top bottom",end:`+=${window.innerHeight*4}`,scrub:1,onUpdate:e=>{const o=e.progress,t=c.utils.clamp(0,1,o/.9),r=c.utils.interpolate("300%","0%",re(t));c.set(".home-services-header",{y:r}),["#card-1","#card-2","#card-3"].forEach((n,s)=>{const h=s*.5,l=c.utils.clamp(0,1,(o-h*.1)/(.9-h*.1)),d=document.querySelector(`${n} .flip-card-inner`);let y;if(l<.4){const g=l/.4;y=c.utils.interpolate("-100%","50%",re(g))}else if(l<.6){const g=(l-.4)/.2;y=c.utils.interpolate("50%","0%",re(g))}else y="0%";let f;if(l<.4){const g=l/.4;f=c.utils.interpolate(.25,.75,re(g))}else if(l<.6){const g=(l-.4)/.2;f=c.utils.interpolate(.75,1,re(g))}else f=1;let u;if(l<.2){const g=l/.2;u=re(g)}else u=1;let p,w,E;if(l<.6)p=s===0?"100%":s===1?"0%":"-100%",w=s===0?-5:s===1?0:5,E=0;else if(l<1){const g=(l-.6)/.4;p=c.utils.interpolate(s===0?"100%":s===1?"0%":"-100%","0%",re(g)),w=c.utils.interpolate(s===0?-5:s===1?0:5,0,re(g)),E=re(g)*180}else p="0%",w=0,E=180;c.set(n,{opacity:u,y,x:p,rotate:w,scale:f}),c.set(d,{rotationY:E})})}}));const He=document.querySelector(".home-spotlight-images");if(He&&window.innerWidth>=768){const e=He.offsetHeight,o=window.innerHeight,t=e*.05,r=e+t+o,n=document.querySelector(".spotlight-mask-header h3");let s=null;n&&(s=me.create(n,{type:"words",wordsClass:"spotlight-word"}),c.set(s.words,{opacity:0})),D.create({trigger:".home-spotlight",start:"top top",end:`+=${window.innerHeight*7}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:h=>{const l=h.progress;if(l<=.5){const f=l/.5,u=5,p=-(r/e)*100,w=u+(p-u)*f;c.set(He,{y:`${w}%`})}const d=document.querySelector(".spotlight-mask-image-container"),y=document.querySelector(".spotlight-mask-image");if(d&&y)if(l>=.25&&l<=.75){const f=(l-.25)/.5,u=`${f*475}%`,p=1.25-f*.25;d.style.setProperty("-webkit-mask-size",u),d.style.setProperty("mask-size",u),c.set(y,{scale:p})}else l<.25?(d.style.setProperty("-webkit-mask-size","0%"),d.style.setProperty("mask-size","0%"),c.set(y,{scale:1.25})):l>.75&&(d.style.setProperty("-webkit-mask-size","475%"),d.style.setProperty("mask-size","475%"),c.set(y,{scale:1}));if(s&&s.words.length>0)if(l>=.75&&l<=.95){const f=(l-.75)/.2,u=s.words.length;s.words.forEach((p,w)=>{const E=w/u;f>=E?c.set(p,{opacity:1}):c.set(p,{opacity:0})})}else l<.75?c.set(s.words,{opacity:0}):l>.95&&c.set(s.words,{opacity:1})}})}var Lt=document.querySelector(".outro");if(Lt&&window.innerWidth>=768){const e=document.querySelector(".outro h3");let o=null;e&&(o=me.create(e,{type:"words",wordsClass:"outro-word"}),c.set(o.words,{opacity:0}));const t=document.querySelectorAll(".outro-strip"),r=[.3,.4,.25,.35,.2,.25];D.create({trigger:".outro",start:"top top",end:`+=${window.innerHeight*3}px`,pin:!0,pinSpacing:!0,scrub:1,onUpdate:n=>{const s=n.progress;if(o&&o.words.length>0)if(s>=.25&&s<=.75){const h=(s-.25)/.5,l=o.words.length;o.words.forEach((d,y)=>{const f=y/l;h>=f?c.set(d,{opacity:1}):c.set(d,{opacity:0})})}else s<.25?c.set(o.words,{opacity:0}):s>.75&&c.set(o.words,{opacity:1})}}),D.create({trigger:".outro",start:"top bottom",end:`+=${window.innerHeight*6}px`,scrub:1,onUpdate:n=>{const s=n.progress;t.forEach((h,l)=>{if(r[l]!==void 0){const d=r[l],y=s*100*d;c.set(h,{x:`${y}%`})}})}})}document.querySelector(".work-items")&&D.refresh();if(window.innerWidth>=768&&document.querySelector(".work-header")){c.set(".work-header-arrow-icon",{scale:0});const e=me.create(".work-header-content p",{type:"lines",mask:"lines"}),o=me.create(".work-header-title h1",{type:"lines",mask:"lines"});c.set([e.lines,o.lines],{y:"120%"});const t=c.timeline({delay:.75});t.to(e.lines,{y:"0%",duration:1,ease:"power4.out"},"-=0.9"),t.to(o.lines,{y:"0%",duration:1,ease:"power4.out",stagger:.1},"-=0.9"),t.to(".work-header-arrow-icon",{scale:1,duration:.75,ease:"power4.out"},"-=0.9")}if(window.innerWidth>=768){const e=[-200,-280,-150,-320,-220,-180,-300,-160,-260,-350].map(function(t){return t*.15}),o=[.2,.5,.8,.35,.65,.95,.3,.55,.85,.4];c.utils.toArray(".work-items .work-item-img").forEach((t,r)=>{const n=t.querySelector("img"),s=t.querySelector("video"),h=n?.getAttribute("src")||"";if(s||h.includes("/bio/1.webp")||h.includes("Anexo 9")||h.includes("Anexo 6")||h.includes("Anexo 8"))return;let l=e[r%e.length];h.includes("Anexo 11")&&(l=Math.abs(l)*2),h.includes("Anexo 5")&&(l=-Math.abs(l)*12),h.includes("Anexo 7")&&(l=-Math.abs(l)*12),h.includes("/bio/4.webp")&&(l=-Math.abs(l)),h.includes("/bio/3.webp")&&(l=Math.abs(l)*1.5),h.includes("/bio/2.webp")&&(l=-Math.abs(l)),t.classList.contains("work-item-img--bio3")&&(l=Math.abs(l));const d=o[r%o.length];c.to(t,{y:l,ease:"none",scrollTrigger:{trigger:t,start:"top bottom",end:"bottom top",scrub:d}});const f=t.closest(".work-item").querySelector(".work-item-content");f&&!f.classList.contains("no-parallax")&&c.to(f,{y:l*.7,ease:"none",scrollTrigger:{trigger:t,start:"top 85%",end:"bottom top",scrub:Math.min(d*2,1.5)}})})}c.utils.toArray(".work-items .row-content, .work-items .row-content-title").forEach(e=>{e.classList.contains("no-parallax")||c.to(e,{y:window.innerWidth<768?-10:-30,ease:"none",scrollTrigger:{trigger:e.closest(".row"),start:"top bottom",end:"bottom top",scrub:window.innerWidth<768?.5:1}})});const Re=document.getElementById("mi-historia-text");if(Re&&window.innerWidth>=768){const e=Re.closest(".behind-the-lock");if(e){const o=new IntersectionObserver(t=>{t.forEach(r=>{r.isIntersecting&&r.intersectionRatio>.3&&(dt(Re,0),setTimeout(()=>{Re.querySelectorAll(".hero-char").forEach((s,h)=>mt(s,h))},600),o.unobserve(r.target))})},{threshold:[0,.1,.3,.5]});o.observe(e)}}const Be=document.querySelector(".btl-header-text");Be&&(c.set(Be,{opacity:0,y:30}),c.to(Be,{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:Be,start:"top bottom",end:"top 30%",scrub:1}}));document.querySelectorAll(".hero-gradient-text").forEach(e=>{/^\d{4}$/.test(e.textContent.trim())&&(e.classList.add("highlight-word"),c.set(e,{"--highlight-offset":"0%"}),D.create({trigger:e,start:"top 85%",once:!0,onEnter:()=>{c.to(e,{"--highlight-offset":"100%",duration:1.2,ease:"power3.out",overwrite:"auto"})}}))});document.querySelectorAll(".row--2026 .meta-text").forEach(e=>{c.set(e,{opacity:0,y:20}),D.create({trigger:e,start:"top 85%",once:!0,onEnter:()=>{c.to(e,{opacity:1,y:0,duration:1,ease:"power3.out"})}})});if(window.innerWidth<768){const e=document.querySelector("#trigger-bg-2021"),o=document.querySelector(".work-story"),t=document.querySelector("#frase-goleador"),r=document.querySelector("#frase-seisgoles");if(e&&o){const n=c.timeline({scrollTrigger:{trigger:e,start:"bottom top+=50",end:"bottom top+=40000",scrub:1.5}}).to(o,{backgroundColor:"#2a2a2a",duration:1,ease:"none"},0).to(o,{backgroundColor:"#444444",duration:1,ease:"none"},1).to(o,{backgroundColor:"#555555",duration:1,ease:"none"},2).to(o,{backgroundColor:"#777777",duration:.5,ease:"none"},3).to(o,{backgroundColor:"#999999",duration:.3,ease:"none"},3.5).to(o,{backgroundColor:"#d4d4d4",duration:.2,ease:"none"},3.8);t&&n.to(t,{color:"#000","-webkit-text-fill-color":"#000",duration:.3,ease:"none"},2.8),r&&n.to(r,{color:"#000","-webkit-text-fill-color":"#000",duration:.3,ease:"none"},2.8)}}window.innerWidth>=768&&Tt();function Tt(){const e=document.querySelector(".work-timeline"),o=e?.querySelector(".work-timeline-progress"),t=document.querySelector(".work-items");if(!e||!o||!t)return;const r=t.querySelector(".row--first"),n=t.querySelector(".row--2021");if(!r||!n)return;const s=r.offsetTop,l=n.offsetTop-r.offsetTop+80;e.style.top=s+"px",e.style.height=l+"px",e.style.bottom="auto";const d=document.createElement("div");d.style.position="absolute",d.style.left="50%",d.style.top="0",d.style.width="60px",d.style.height="60px",d.style.transform="translate(-50%, -50%)",d.style.pointerEvents="none",d.style.zIndex="3",d.style.filter="drop-shadow(0 0 4px rgba(216,200,245,.4))",e.appendChild(d);const y="http://www.w3.org/2000/svg",f=document.createElementNS(y,"svg");f.setAttribute("viewBox","-30 -30 60 60"),f.setAttribute("width","100%"),f.setAttribute("height","100%"),f.style.display="block",f.style.opacity="1",d.appendChild(f);const u=document.createElementNS(y,"defs");u.innerHTML=`<style>
      .s-leg{stroke:rgba(200,180,235,.75);stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;fill:none;}
      .s-body{fill:rgba(180,160,230,.85);stroke:none;}
    </style>`,f.appendChild(u);const p=[];for(let L=0;L<8;L++){const Y=document.createElementNS(y,"path");Y.setAttribute("class","s-leg"),f.appendChild(Y),p.push(Y)}const w=document.createElementNS(y,"g");w.innerHTML='<ellipse class="s-body" cx="0" cy="0" rx="3.1" ry="4.2"/><ellipse class="s-body" cx="0" cy="-4.2" rx="2.1" ry="2.4"/><path class="s-leg" d="M-1.1 -6 C-2.4 -8 -2.6 -9.2 -2.2 -10.3"/><path class="s-leg" d="M1.1 -6 C2.4 -8 2.6 -9.2 2.2 -10.3"/>',f.appendChild(w);const E=[{side:1,fore:5.2,reach:12,phase:0},{side:1,fore:1.4,reach:14,phase:.5},{side:1,fore:-2.2,reach:14,phase:0},{side:1,fore:-5.6,reach:12,phase:.5},{side:-1,fore:5.2,reach:12,phase:.5},{side:-1,fore:1.4,reach:14,phase:0},{side:-1,fore:-2.2,reach:14,phase:.5},{side:-1,fore:-5.6,reach:12,phase:0}],g=8.6,A=9.2,C=13,b=.6,z=3.4,S=1.6;let W=0,$=0;function J(L){const Y=L-$;$=L,W+=Y*280;const fe=L*100,K=0,V=1,Z=1,ee=0,Q=Math.sin(2*Math.PI*(W/C))*.5,_=Z*(S+Q),U=0,pe=Math.atan2(V,K)*180/Math.PI;w.setAttribute("transform",`translate(${_.toFixed(2)} ${U.toFixed(2)}) rotate(${pe.toFixed(1)})`);for(let te=0;te<8;te++){const R=E[te],a=_+K*R.fore*.45+Z*R.side*1.7,i=U+V*R.fore*.45+ee*R.side*1.7,m=_+K*R.fore+Z*R.side*R.reach,x=U+V*R.fore+ee*R.side*R.reach,v=(W/C+R.phase)%1;let T,B;if(v<b)T=(.5-v/b)*C,B=0;else{const we=(v-b)/(1-b);T=(we-.5)*C,B=Math.sin(we*Math.PI)*z}const q=m+K*T-(m-a)/R.reach*B,N=x+V*T-(x-i)/R.reach*B;let F=q-a,M=N-i,k=Math.hypot(F,M);const G=g+A-.2,P=Math.abs(g-A)+.2;k>G&&(k=G),k<P&&(k=P);const I=F/(Math.hypot(F,M)||1),H=M/(Math.hypot(F,M)||1),he=I*k,ve=H*k,X=(k*k+g*g-A*A)/(2*k),ne=Math.sqrt(Math.max(0,g*g-X*X))*R.side,se=-H,ie=I,le=a+I*X+se*ne,ce=i+H*X+ie*ne,ge=a+he,ye=i+ve;p[te].setAttribute("d",`M${a.toFixed(1)} ${i.toFixed(1)} L${le.toFixed(1)} ${ce.toFixed(1)} L${ge.toFixed(1)} ${ye.toFixed(1)}`)}d.style.top=fe+"%"}D.create({trigger:r,start:"top 87%",endTrigger:e,end:"bottom bottom",scrub:!0,onUpdate:L=>{const Y=L.progress;o.style.height=Y*100+"%",J(Y),d.style.display="block"}})}const Ne=.15,Se=document.querySelector(".about-video-wrapper"),O=Se?.querySelector("video");if(O&&Se){let e="muted",o=0,t=!1;const r=Se.querySelector(".video-play-btn"),n=Se.querySelector(".video-sound-btn"),s='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>',l='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="#fff" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="#fff" stroke-width="2"/></svg>',d='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/></svg>',y='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" stroke-width="2" fill="none"/></svg>';O.muted=!0,O.play().catch(()=>{});const f=()=>{O.paused?(O.play(),r&&(r.innerHTML=s)):(O.pause(),r&&(r.innerHTML=h))},u=()=>{e!=="muted"?(O.muted=!0,e="muted",n&&(n.innerHTML=l)):(O.muted=!1,O.volume=o>0?o:Ne,o=O.volume,e=o===Ne?"low":"high",n&&(n.innerHTML=e==="low"?d:y))},p=()=>{t=!0,f()},w=()=>{if(t){t=!1;return}f()};O.addEventListener("touchstart",p),O.addEventListener("click",w),r&&r.addEventListener("click",C=>{C.stopPropagation(),f()}),n&&n.addEventListener("click",C=>{C.stopPropagation(),u()});let E=null,g=0;const A=Se.closest(".about");A&&new IntersectionObserver(b=>{b.forEach(z=>{if(!z.isIntersecting)e!=="muted"&&(E=e,g=o,O.muted=!0,e="muted",n&&(n.innerHTML=l));else if(E&&E!=="muted"){const S=g>0?g:Ne;O.muted=!1,O.volume=S,o=S,e=E,n&&(n.innerHTML=E==="low"?d:y),E=null,g=0}})},{threshold:0}).observe(A)}const ot=document.querySelector(".video-expand-btn"),ue=document.getElementById("video-modal"),be=ue?.querySelector("video"),rt=ue?.querySelector(".video-modal-close"),nt=ue?.querySelector(".video-modal-backdrop"),xe=document.querySelector(".work-item--video video");if(ot&&ue&&be){const e=()=>{ue.classList.add("is-open"),document.body.style.overflow="hidden",be.currentTime=xe?.currentTime||0,be.muted=!1,be.volume=.3,be.play().catch(()=>{}),xe&&xe.pause()},o=()=>{ue.classList.remove("is-open"),document.body.style.overflow="",be.pause(),xe&&xe.play().catch(()=>{})};ot.addEventListener("click",e),rt&&rt.addEventListener("click",o),nt&&nt.addEventListener("click",o),document.addEventListener("keydown",t=>{t.key==="Escape"&&ue.classList.contains("is-open")&&o()})}c.registerPlugin(D);const De=document.querySelector(".curtain"),st=De?.querySelector(".curtain-img"),de=De?.querySelector(".curtain-ball");if(De&&st&&de){const e=window.innerWidth<=999;e||c.set(de,{x:window.innerWidth+300,y:window.innerHeight*.08,rotation:0,scale:1});const o=c.timeline({paused:!0});e||(o.to(de,{x:window.innerWidth*.58,y:window.innerHeight*.45,rotation:540,ease:"power2.in",duration:.42}),o.to(de,{x:window.innerWidth*.25,y:window.innerHeight*.1,rotation:900,ease:"power2.out",duration:.18}),o.to(de,{x:window.innerWidth*.05,y:window.innerHeight*.4,rotation:1180,ease:"power2.in",duration:.15}),o.to(de,{x:-250,y:window.innerHeight*.2,rotation:1500,ease:"power2.out",duration:.25})),D.create({trigger:De,start:e?"top 75%":"top top",end:`+=${e?window.innerHeight*5:window.innerHeight*3}`,scrub:!0,invalidateOnRefresh:!0,refreshPriority:10,onUpdate:t=>{const r=t.progress,n=c.parseEase("power3.out")(r);c.set(st,{rotation:e?-6+12*n:18*(1-n),scale:.75+.25*n,y:e?20*n:0}),e?c.set(de,{x:Math.sin(n*Math.PI)*-40,y:n*140,rotation:n*-120}):o.progress(r)}})}const it=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,qt=`
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
`,Ft=`
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
`;function Ie(e){const o=parseInt(e.slice(1,3),16)/255,t=parseInt(e.slice(3,5),16)/255,r=parseInt(e.slice(5,7),16)/255;return[o,t,r]}const ze=document.querySelector(".hero");if(ze&&window.innerWidth>=768&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const e=document.createElement("div");e.className="dot-matrix-wrapper",ze.prepend(e);const o=new wt(-1,1,1,-1,0,1),t=new bt({antialias:!0,alpha:!0});t.setSize(window.innerWidth,window.innerHeight),t.setPixelRatio(Math.min(devicePixelRatio,2)),e.appendChild(t.domElement);const r=.5,n=Math.floor(window.innerWidth*r),s=Math.floor(window.innerHeight*r),h=new Ve(n,s,{minFilter:qe,magFilter:qe,format:Xe,type:Ge}),l=new Ve(n,s,{minFilter:qe,magFilter:qe,format:Xe,type:Ge});let d=h,y=l,f=0;const u=new _e({uniforms:{iTime:{value:0},iResolution:{value:new je(n,s)},iMouse:{value:new xt(0,0,0,0)},iFrame:{value:0},iPreviousFrame:{value:null},uBrushSize:{value:25},uBrushStrength:{value:.3},uFluidDecay:{value:.98},uTrailLength:{value:.8},uStopDecay:{value:.85}},vertexShader:it,fragmentShader:qt}),[p,w,E]=Ie("#51398D"),[g,A,C]=Ie("#7c5cbf"),[b,z,S]=Ie("#3d2a6b"),[W,$,J]=Ie("#9b7fd4"),L=new _e({uniforms:{iTime:{value:0},iResolution:{value:new je(window.innerWidth,window.innerHeight)},iFluid:{value:null},uDistortionAmount:{value:1.5},uColor1:{value:new Fe(p,w,E)},uColor2:{value:new Fe(g,A,C)},uColor3:{value:new Fe(b,z,S)},uColor4:{value:new Fe(W,$,J)},uColorIntensity:{value:.4},uSoftness:{value:2}},vertexShader:it,fragmentShader:Ft}),Y=new St(2,2),fe=new Ze(Y,u),K=new Ze(Y,L);let V=0,Z=0,ee=0,Q=0,_=0;const U=a=>{const i=ze.getBoundingClientRect();ee=V,Q=Z,V=a.clientX-i.left,Z=i.height-(a.clientY-i.top),_=performance.now(),u.uniforms.iMouse.value.set(V,Z,ee,Q)},pe=()=>{u.uniforms.iMouse.value.set(0,0,0,0)};document.addEventListener("mousemove",U),document.addEventListener("mouseleave",pe);const te=()=>{const a=window.innerWidth,i=window.innerHeight,m=Math.floor(a*r),x=Math.floor(i*r);t.setSize(a,i),u.uniforms.iResolution.value.set(m,x),L.uniforms.iResolution.value.set(a,i),h.setSize(m,x),l.setSize(m,x),f=0};window.addEventListener("resize",te);const R=()=>{if(!We)return;requestAnimationFrame(R);const a=performance.now()*.001;u.uniforms.iTime.value=a,L.uniforms.iTime.value=a,u.uniforms.iFrame.value=f,performance.now()-_>100&&u.uniforms.iMouse.value.set(0,0,0,0),u.uniforms.iPreviousFrame.value=y.texture,t.setRenderTarget(d),t.render(fe,o),L.uniforms.iFluid.value=d.texture,t.setRenderTarget(null),t.render(K,o);const i=d;d=y,y=i,f++};var We=!0,Pt=new IntersectionObserver(function(a){a[0].isIntersecting?We||(We=!0,requestAnimationFrame(R)):We=!1},{threshold:0});Pt.observe(ze),R()}const at="ja_preloader_shown",Rt=window.innerWidth<768,Bt=Rt?6e3:4e3,lt=1800,It=2,zt=.4;function ct(e){c.set(e,{display:"none"}),e.style.pointerEvents="none",e.style.touchAction="",document.body.style.overflow="",document.documentElement.style.overflow="",document.body.style.position=""}function Wt(){window.lenis&&window.lenis.start()}const Me=document.querySelector(".preloader-wrapper");if(!Me)throw new Error("Preloader wrapper not found");if(sessionStorage.getItem(at)==="1")ct(Me);else{let s=function(){if(r||n)return;const h=performance.now()-o;if(h<lt){setTimeout(s,lt-h+100);return}r=!0;const l=c.timeline({delay:.1,onComplete:t}),d=5;let y=0;for(let f=0;f<d;f++){const p=f===d-1?1:Math.min(y+Math.random()*.3+.1,.9);y=p,l.to(".preloader-progress-bar",{scaleX:p,duration:It/d,ease:"power2.out"})}l.to(".preloader-wrapper",{y:"-100%",duration:zt,ease:"power4.inOut"})},e=!1;const o=performance.now(),t=()=>{e||(e=!0,sessionStorage.setItem(at,"1"),ct(Me),document.dispatchEvent(new CustomEvent("preloader:complete")),requestAnimationFrame(()=>{requestAnimationFrame(Wt)}))};document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",document.body.style.position="fixed",Me.style.pointerEvents="auto",Me.style.touchAction="none",window.lenis&&window.lenis.stop();let r=!1,n=!1;setTimeout(()=>{n=!0,s()},Bt),document.readyState==="complete"?s():window.addEventListener("load",s)}
