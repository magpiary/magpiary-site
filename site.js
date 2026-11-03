const q=new URLSearchParams(location.search);
const OPT={word:'letters',view:'full'}; /* roll and blur stay below, to be reused elsewhere on the page */
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches||q.has('still');
const SMALL=matchMedia('(max-width:760px)').matches;
/* how it works: the Mac zoomed in with the text beside it (default on desktop), or full screens with ?view=full */
const VIEW=(!REDUCE&&innerWidth>=900&&q.get('view')!=='full')?'beside':'full',ZOOM=VIEW!=='full';OPT.view=VIEW;document.body.dataset.view=VIEW;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const GOOD=[2,11,13,0,14,20,23,17,4,21,22,32,18,36,39,3,5,12,15,24,26,28,30,31,35,37,38,40,41,42,1,6,9,10];
const tile=i=>`screens/tiles/t${String(GOOD[i%GOOD.length]).padStart(2,'0')}.webp`;

/* the app's logo: the bird mark beside lowercase "magpiary" */
const MARK=`<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M207.35 77.86 L172.08 65.02 L171.85 57.5 L170.65 51.04 L169.3 46.87 L167.52 42.87 L164.08 37.26 L161.33 33.86 L158.23 30.76 L153.01 26.76 L149.22 24.56 L145.21 22.78 L138.91 20.92 L134.58 20.23 L130.2 20 L123.65 20.52 L119.37 21.43 L115.2 22.78 L111.19 24.56 L107.4 26.76 L102.18 30.76 L99.08 33.86 L96.32 37.26 L93.94 40.94 L91.95 44.84 L89.53 51.98 L98.29 52.57 L105.86 54.38 L113.05 57.36 L119.68 61.43 L123.72 64.7 L129.07 70.34 L132.12 74.54 L134.72 79.04 L136.83 83.78 L138.44 88.72 L139.51 93.79 L140.07 99.27 L172.08 110.93 L172.08 90.69Z M140.12 135.77 L140.12 164.37 L172.08 196.33 L172.08 124.14Z" fill="#ff2e93"/><path d="M132.41 236 L132.41 130.37 L167.67 117.53 L132.41 104.7 L132.35 99.36 L131.49 92.84 L130.36 88.61 L127.84 82.54 L124.41 76.94 L121.65 73.53 L116.89 69.01 L113.34 66.43 L109.54 64.24 L105.54 62.45 L101.37 61.1 L97.08 60.19 L90.53 59.67 L86.15 59.9 L81.82 60.59 L77.59 61.72 L73.5 63.29 L67.72 66.43 L62.51 70.43 L57.99 75.2 L54.26 80.61 L52.27 84.52 L50.08 90.71 L49.17 95 L48.65 101.55 L48.65 236 L90.53 194.12Z M101.69 102.79 L98.24 118.08 L94.8 102.79 L79.51 99.35 L94.8 95.9 L98.24 80.61 L101.69 95.9 L116.98 99.35Z" fill="#F7F3E8" fill-rule="evenodd"/><path d="M101.69 102.79 L98.24 118.08 L94.8 102.79 L79.51 99.35 L94.8 95.9 L98.24 80.61 L101.69 95.9 L116.98 99.35Z" fill="#ff2e93"/></svg>`;
$$('[data-logo]').forEach(e=>e.innerHTML=MARK+'magpiary');
const SEARCH='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';

/* two pill buttons with the install command below */
const APPLE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.8 1.3 10.35.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.14-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.04-2.74-4.14zM14.47 4.9c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 1.99-1.09 3.17 1.15.09 2.32-.58 3.04-1.44z"/></svg>';
const GH='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>';
const CTA=`<div class="ctawrap"><div class="ctas"><a class="btn main" href="downloads/Magpiary.dmg" download>${APPLE}Download for Mac</a><a class="btn alt" href="https://github.com/magpiary/magpiary">${GH}View on GitHub</a></div></div>`;
$('#cta').innerHTML=$('#cta2').innerHTML=CTA;
/* the same bird lands on the first button in the footer section */
(function(){const a=$('#cta2 .ctas>*');if(!a)return;const w=document.createElement('span');w.className='perchw';a.parentNode.insertBefore(w,a);w.append(a);const hero=$('#lander').cloneNode(true);hero.removeAttribute('id');hero.classList.add('lander2');w.append(hero)})();

/* shader: deep cobalt, grainy clouds in the corners, a clean centre, sparkles and squiggles */
const DARK=.84;
const S={c1:[.055,.055,.46],c2:[.17,.17,.72],mx:.5,my:.5};
(function(){
  const c=$('#bg'),gl=c.getContext('webgl',{alpha:false,antialias:false});
  if(!gl){c.style.background='#0c0c60';S.draw=()=>{};return;}
  const frag=`precision highp float;uniform vec2 r,m;uniform float t,dk;uniform vec3 c1,c2;
float h(vec2 q){q=fract(q*vec2(123.34,456.21));q+=dot(q,q+45.32);return fract(q.x*q.y);}
vec3 col;vec2 Q;float gr;
void cl(vec2 c,float R){vec2 d=Q-c;float l=length(d);float e=1.-smoothstep(R-.004,R+.004,l);
 float lit=clamp(.5+.5*dot(d/max(l,.001),normalize(vec2(-.35,.95))),0.,1.);
 float rim=smoothstep(R*.35,R,l);
 vec3 s=mix(c1*1.08,c2,lit*rim*.92);s+=(gr-.5)*.11*lit;col=mix(col,s,e);}
float star(vec2 d,float s){d=abs(d)/s;return clamp(exp(-d.x*7.)*exp(-d.y*70.)+exp(-d.y*7.)*exp(-d.x*70.)+exp(-length(d)*12.),0.,2.);}
void sq(vec2 a,float w,float y,float f,float ph){float x=Q.x-a.x;if(x<0.||x>w)return;float d=abs(Q.y-(a.y+y*sin(x*f+ph)));col=mix(col,c2*.95,(1.-smoothstep(.0015,.004,d))*.8);}
void main(){vec2 u=gl_FragCoord.xy/r;float a=r.x/r.y;Q=vec2(u.x*a,u.y);gr=h(gl_FragCoord.xy*.73+fract(t*.5)*7.);
 float dc=length((u-.5)*vec2(1.,1.1));
 col=mix(c1*.72,c1*1.16,smoothstep(.15,.85,dc));
 vec2 mm=(m-.5)*.018;vec2 D=vec2(sin(t*.09),cos(t*.07))*.012;
 Q-=mm;
 cl(vec2(.02,.0)+D,.2);cl(vec2(.2,-.04)-D,.17);cl(vec2(.0,.2)-D,.11);cl(vec2(.42,-.1)+D,.17);cl(vec2(.62,-.11)-D,.2);
 cl(vec2(a-.02,.02)-D,.24);cl(vec2(a-.26,-.03)+D,.2);cl(vec2(a-.5,-.1)-D,.17);cl(vec2(a,.28)+D,.12);
 cl(vec2(a-.1,.98)+D,.2);cl(vec2(a-.36,1.04)-D,.21);cl(vec2(a-.6,1.08)+D,.15);cl(vec2(.0,1.02)-D,.15);cl(vec2(.2,1.09)+D,.13);
 sq(vec2(.08,.28),.32,.035,22.,t*.25);sq(vec2(a-.42,.13),.3,.03,26.,-t*.2);sq(vec2(.33,.92),.3,.025,30.,t*.2);
 col+=(gr-.5)*.035;
 Q+=mm;
 col*=dk;
 vec3 g=vec3(1.,.82,.5),pk=vec3(1.,.72,.9);
 col+=pk*star(Q-vec2(a-.13,.86),.05)*(.55+.45*sin(t*1.1));
 col+=g*star(Q-vec2(.16,.16),.035)*(.55+.45*sin(t*.8+2.));
 col+=g*star(Q-vec2(a-.1,.2),.04)*(.55+.45*sin(t*1.3+4.));
 gl_FragColor=vec4(col,1.);}`;
  const mk=(ty,s)=>{const o=gl.createShader(ty);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(o));return o};
  const pr=gl.createProgram();gl.attachShader(pr,mk(gl.VERTEX_SHADER,'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));gl.attachShader(pr,mk(gl.FRAGMENT_SHADER,frag));gl.bindAttribLocation(pr,0,'a');gl.linkProgram(pr);gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  const U={};['r','m','t','dk','c1','c2'].forEach(n=>U[n]=gl.getUniformLocation(pr,n));
  let tx=.5,ty=.5;addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight},{passive:true});
  const t0=performance.now(),md=SMALL?.75:.9; /* soft gradient: render below device resolution, the browser scales it up */
  S.draw=now=>{const d=Math.min(devicePixelRatio,md),w=innerWidth*d|0,hh=innerHeight*d|0;if(c.width!==w||c.height!==hh){c.width=w;c.height=hh;gl.viewport(0,0,w,hh)}
    S.mx+=(tx-S.mx)*.04;S.my+=(ty-S.my)*.04;gl.uniform2f(U.r,w,hh);gl.uniform2f(U.m,S.mx,S.my);gl.uniform1f(U.t,REDUCE?10:(now-t0)/1000);gl.uniform1f(U.dk,DARK);gl.uniform3fv(U.c1,S.c1);gl.uniform3fv(U.c2,S.c2);gl.drawArrays(gl.TRIANGLES,0,3)};
  if(REDUCE){S.draw(0);addEventListener('resize',()=>S.draw(0))}else{let last=0;const lp=n=>{requestAnimationFrame(lp);if(n-last<33)return;last=n;S.draw(n)};S.draw(performance.now());requestAnimationFrame(lp)}
})();
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
function tint(a,b){if(REDUCE||S.ta===a)return;S.ta=a;const A=hx(a),B=hx(b),f={v:0},s1=[...S.c1],s2=[...S.c2];gsap.to(f,{v:1,duration:.9,ease:'power2.inOut',overwrite:true,onUpdate(){S.c1=s1.map((x,i)=>x+(A[i]-x)*f.v);S.c2=s2.map((x,i)=>x+(B[i]-x)*f.v)}})}

/* the post the whole story follows, drawn in code so it stays sharp at any size */
const POST={title:'5 AI agent repos worth your weekend',who:'devon.builds',ini:'DB'};
const ART={reel:'<img class="art cover" src="art/cover.webp" alt="">'};

/* saved wall: counter first, then the search */
const COLS=SMALL?4:8,ROWS=SMALL?6:4;
$('#why').innerHTML=`<div class="wpin" id="wpin"><div class="wall" id="wall">${Array.from({length:COLS*ROWS},(_,i)=>`<img src="${tile(i)}" alt="" loading="lazy" decoding="async">`).join('')}</div><div class="pool" id="pool"></div>
 <div class="wcol"><h2 class="whyhead">You saved hundreds. Opened how many?</h2>
 <div class="swap"><div class="count" id="count2"><div><b id="c1">0</b><span>saved</span></div><div class="op"><b id="c2">0</b><span>opened again</span></div><p class="small">Your numbers may vary. Ours weren't pretty.</p></div>
 <div class="search" id="wsearch" style="opacity:0">${SEARCH}<span id="wq">&nbsp;</span></div><div class="found" id="found"><div class="pic">${ART.reel}</div><span class="srcp"><i></i>Instagram</span><span class="durp">0:58</span><div class="lab"><div class="tt">${POST.title}</div><div class="me"><i class="av">${POST.ini}</i><span class="step">${POST.who}</span><span class="kd"><i style="background:#8a3ffc"></i>Tool</span></div></div></div></div></div>
 <p class="payoff" id="payoff">Now it's found.</p><h2 class="zoomt" id="zoomt">Here's how.</h2></div>`;

/* how it works: seven steps, one story */
const BE=[
 ['Save it from your phone','Tap share and pick Magpiary. Tracking is stripped before the link goes anywhere.'],
 ['It travels home','Straight to your Mac over your own Wi-Fi. No cloud in between.'],
 ['Your Mac does the watching','It downloads the post, listens to every word and picks the frames that matter.'],
 ['Only frames and words go to AI','The video stays on your Mac. A few frames and the transcript go to the AI you chose, with your own key. Private mode sends nothing.'],
 ['Filed, and actually useful','A summary, every repo it mentioned with a working link, and the moments worth jumping to.'],
 ['Then ask it anything','Ask Magpiary answers from the post itself, with a link to the second it came from.'],
];
const N=BE.length;
/* How it works backgrounds: dark indigo, blue and purple only (no light blue or teal) */
const TINTS=[['#0C0C5A','#2626A8'],['#14126A','#3A34B8'],['#0E1E6E','#2A3FB0'],['#2A1070','#6234C8'],['#1E1068','#4A32B8'],['#220E66','#5A32B8']];
const ic={plane:'<svg viewBox="0 0 24 24"><path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z"/></svg>',heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/></svg>',com:'<svg viewBox="0 0 24 24"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z"/></svg>',rep:'<svg viewBox="0 0 24 24"><path d="M17 3l4 4-4 4M21 7H8a4 4 0 0 0-4 4v1M7 21l-4-4 4-4M3 17h13a4 4 0 0 0 4-4v-1"/></svg>',dots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/></svg>',find:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>',add:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/></svg>',clip:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M10 9l5 3-5 3z"/></svg>',cam:'<svg viewBox="0 0 24 24"><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/></svg>',copy:'<svg viewBox="0 0 24 24"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',star:'<svg viewBox="0 0 24 24"><path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.4l-5.5 3 1-6.3L3 9.7l6.2-.9z"/></svg>',book:'<svg viewBox="0 0 24 24"><path d="M12 6c-2-1.5-5-2-9-2v15c4 0 7 .5 9 2 2-1.500 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v15"/></svg>',stack:'<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/></svg>',x:'<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>',up:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7 8l5-5 5 5M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/></svg>',msg:'<svg viewBox="0 0 24 24"><path d="M12 4c5 0 9 3.200 9 7.500S17 19 12 19c-1 0-2-.1-3-.4L4 20l1.300-3.700C4 15 3 13.300 3 11.500 3 7.200 7 4 12 4z"/></svg>',env:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>',note:'<svg viewBox="0 0 24 24"><path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h5"/></svg>'};
const SHORT='<svg viewBox="0 0 26 26" aria-hidden="true"><defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3F3FD8"/><stop offset="1" stop-color="#23237E"/></linearGradient></defs><rect width="26" height="26" rx="5.8" fill="url(#sg)"/><path d="M13 5l7.500 4-7.500 4-7.500-4z" fill="#fff"/><path d="M5.500 13l7.500 4 7.500-4M5.500 17l7.500 4 7.500-4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round" opacity=".8"/></svg>';
const STATUS='<div class="stat-bar"><b>9:41</b><span><svg viewBox="0 0 19 12"><rect y="8" width="3.200" height="4" rx=".8"/><rect x="5" y="5.500" width="3.200" height="6.500" rx=".8"/><rect x="10" y="3" width="3.200" height="9" rx=".8"/><rect x="15" width="3.200" height="12" rx=".8"/></svg><svg viewBox="0 0 17 12"><path d="M8.500 2.300c2.400 0 4.600 1 6.200 2.500l1.200-1.300A10.700 10.700 0 0 0 8.500.5C5.600.5 3 1.600 1.100 3.500l1.200 1.300a9 9 0 0 1 6.200-2.500zm0 3.800c1.400 0 2.700.5 3.600 1.400l1.200-1.300a7 7 0 0 0-9.600 0l1.200 1.300c.9-.9 2.200-1.400 3.600-1.400zm0 3.700c-.7 0-1.300.3-1.700.7l1.700 1.800 1.700-1.800c-.4-.4-1-.7-1.700-.7z"/></svg><i class="batt"><i></i></i></span></div>';
const PHONE=()=>`<div class="phonew"><div class="phone"><div class="island"></div><div class="scr"><div class="ios">
  <div class="layer on reel" data-l="0">${ART.reel}<div class="shade"></div>
    ${STATUS}
    <div class="rtop"><b>Reels</b><span class="rcam">${ic.cam}</span></div>
    <div class="rail"><div>${ic.heart}9.1K</div><div>${ic.com}212</div><div>${ic.rep}84</div><div class="pl">${ic.plane}1.2K</div><div>${ic.dots}</div></div>
    <div class="who"><div class="whoa"><i class="wav">${POST.ini}</i><b>${POST.who}</b><span class="fol">Follow</span></div><p>The five I would actually set up this weekend</p><small>♪ devon.builds · Original audio</small></div>
    <div class="igtabs">${ic.home}${ic.find}${ic.add}${ic.clip}<i class="wav me2">${POST.ini}</i></div><div class="homeb"></div>
    <div class="shsheet" data-sheet>
      <div class="shhead"><div class="shth">${ART.reel}</div><div class="sht"><b>${POST.title}</b><span>instagram.com</span><em>Options ›</em></div><i class="shx">${ic.x}</i></div>
      <div class="shppl">${[['MK','Maya','#8E8E93'],['SO','Sam','#7C8A9C'],['PR','Priya','#9A8C7C'],['LT','Leo','#7C9A8C']].map(p=>`<div><i style="background:linear-gradient(#b5b5ba,${p[2]})">${p[0]}</i>${p[1]}</div>`).join('')}</div>
      <div class="shapps">${[['up','AirDrop'],['msg','Messages'],['env','Mail'],['note','Notes']].map(a=>`<div><i>${ic[a[0]]}</i>${a[1]}</div>`).join('')}</div>
      <div class="shlist"><div class="shrow">Copy${ic.copy}</div><div class="shrow me">Save to Magpiary${ic.stack}</div><div class="shrow">Add to Reading List${ic.book}</div><div class="shrow">Add to Favourites${ic.star}</div></div>
      <div class="shedit">Edit Actions…</div><div class="homeb dk"></div></div></div>
  <div class="banner" data-banner><div class="bic">${SHORT}</div><div class="btx"><b>Save to Magpiary</b><span>Saved to Magpiary ✅</span></div><em>now</em><div class="qart">${ART.reel}</div></div>
  </div><i class="pulse" data-pulse></i>
</div><div class="finger" data-finger><img src="art/finger-photo.webp" alt=""></div></div></div>`;

/* the Mac: the real hub's layout rebuilt at a fixed design size, then scaled to fit */
const DW=SMALL?760:1440,DH=SMALL?1000:ZOOM?1080:900,TCOLS=SMALL?3:5,GAP=16,PAD=SMALL?40:120,TW=(DW-PAD*2-GAP*(TCOLS-1))/TCOLS,TH=TW*1.335,GY=SMALL?400:408;
const FEAT=!SMALL;/* desktop: the big Featured tile takes the top-left 2x2 cells, like the app */
const slot=k=>{const sz={width:TW,height:TH};if(!FEAT)return{x:PAD+(k%TCOLS)*(TW+GAP),y:GY+Math.floor(k/TCOLS)*(TH+GAP),...sz};
  if(k===0)return{x:PAD,y:GY,width:TW*2+GAP,height:TH*2+GAP};const i=k-1;
  if(i<6)return{x:PAD+(2+i%3)*(TW+GAP),y:GY+Math.floor(i/3)*(TH+GAP),...sz};const j=i-6;return{x:PAD+(j%5)*(TW+GAP),y:GY+(2+Math.floor(j/5))*(TH+GAP),...sz}};
const TILEN=FEAT?26:TCOLS*3;
const WALLT=Array.from({length:TILEN},(_,i)=>TILES[i%TILES.length]);
const NESTI='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h4l3-8 4 15 3-7h4"/></svg>';
const tileLab=t=>`<div class="lab"><div class="tt">${t.title}</div><div class="me">${t.hasAv?`<i class="av">${t.ini}</i>`:''}<span class="step">${t.who}</span><span class="kd"><i style="background:${t.kc}"></i>${t.kind}</span></div></div>`;
const labelH=t=>`<div class="lab"><div class="tt">${t.title}</div><div class="me"><i class="av">${t.ini}</i><span class="step">${t.who}</span><span class="kd"><i style="background:${t.dot}"></i>${t.kind}</span></div></div>`;
const MI={arch:'<svg viewBox="0 0 24 24"><path d="M4 8h16v12H4zM3 4h18v4H3zM10 12h4"/></svg>',bin:'<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/></svg>',filt:'<svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4"/></svg>',chk:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.500 12l2.500 2.500 4.500-5"/></svg>',gr:'<svg viewBox="0 0 24 24"><path d="M5 5h3v3H5zM10.500 5h3v3h-3zM16 5h3v3h-3zM5 10.500h3v3H5zM10.500 10.500h3v3h-3zM16 10.500h3v3h-3zM5 16h3v3H5zM10.500 16h3v3h-3zM16 16h3v3h-3z"/></svg>',back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',out:'<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>',fold:'<svg viewBox="0 0 24 24"><path d="M3 6h7l2 2h9v11H3z"/></svg>',lnk:'<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/></svg>',more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.300"/><circle cx="12" cy="12" r="1.300"/><circle cx="19" cy="12" r="1.300"/></svg>',book:'<svg viewBox="0 0 24 24"><path d="M12 6c-2-1.500-5-2-9-2v15c4 0 7 .5 9 2 2-1.500 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v15"/></svg>',heart:'<svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11z"/></svg>',com:'<svg viewBox="0 0 24 24"><path d="M21 12a8.500 8.500 0 0 1-12.600 7.400L3 21l1.600-5.400A8.500 8.500 0 1 1 21 12z"/></svg>',mute:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6"/></svg>',full:'<svg viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>',cop:'<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg>',globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>'};
const MACL=()=>`<div class="app">
 <div class="mbar"><i></i><i></i><i></i></div>
 <div class="abar"><span class="logo">${MARK}magpiary</span><span class="grow"></span><i class="aplus">+</i><span class="seg"><b>Library</b>${MI.arch}${MI.bin}</span><span class="grow"></span>
  <span class="nestp" data-nest>${NESTI}<span class="lbl">Nest</span><span class="nline"></span></span><span class="set">${MI.gear}Settings</span></div>
 <div class="ahd" data-hd><h4>Shiny things, safely <em>kept</em><img class="abird" src="art/appbird.webp" alt=""></h4><div class="asb" data-sb>${SEARCH}<span>Search what was said, shown or written</span><kbd>/</kbd></div><span><b>2 new today</b> Sort them into piles, or see everything by when you saved it.</span></div>
 <div class="atabs"><b>Everything</b><span>Piles</span><span>Boards</span><div class="atool">${MI.filt}${MI.chk}${MI.gr}</div></div>
 <div class="agrid">
  ${WALLT.map((t,i)=>`<div class="t" data-i="${i}"><div class="sq"><img src="${t.file}" alt="" loading="lazy" decoding="async"><span class="srcp"><i style="background:${t.sc}"></i>${t.src}</span>${t.dur?`<span class="durp">${t.dur}</span>`:''}</div>${tileLab(t)}</div>`).join('')}
  <div class="t new" data-new><div class="sq"><div class="pic">${ART.reel}</div><span class="srcp"><i style="background:rgb(193,53,132)"></i>Instagram</span><span class="durp">0:58</span></div>${labelH({title:POST.title,who:POST.who,ini:POST.ini,kind:'Tool',dot:'#8a3ffc'})}<div class="tbar"><i></i></div><div class="lockb">Video stays here</div></div>
 </div>
 <div class="ahelp">${MI.book}Help</div><div class="askb" data-askb><i class="aspark"></i>Ask Magpiary<svg viewBox="0 0 24 24" class="chev"><path d="M6 15l6-6 6 6"/></svg></div>
 <div class="pv" data-pv>
  <div class="pcrumb"><span class="pback">${MI.back}Back to Library</span><span class="pbc">Library <u>›</u> <b>${POST.title}</b></span><span class="grow"></span><span class="pnav"><i>${MI.back}</i><small>1 of 68</small><i>${MI.next}</i><i>${MI.out}</i><i>${MI.fold}</i><i>${MI.lnk}</i><i>${MI.more}</i></span></div>
  <div class="pvl"><div class="pvm"><div class="pvv">${ART.reel}</div><div class="pauto">Autoplay<i></i></div><div class="pplay"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
    <div class="pctl"><svg viewBox="0 0 24 24" class="f"><path d="M8 5v14l11-7z"/></svg><span>0:00 / 0:58</span><div class="pvc"><i></i></div>${MI.mute}${MI.full}</div></div>
   <div class="pvsrc"><span>Instagram · 0:58</span><span>Open original ↗</span></div>
   <div class="pvwho"><i class="av">${POST.ini}</i><div><b>Devon Hale</b><span>@${POST.who}</span></div></div>
   <p class="pvcap">The five I would actually set up this weekend <u>#aiagents</u> <u>#opensource</u> <u>#github</u></p><div class="pvpost">Instagram · posted 28 Oct</div></div>
  <div class="pvr"><div class="ptag"><span class="tagp">Tool</span><span>Saved just now</span></div><h4>${POST.title}</h4>
   <div class="pstat"><span>${MI.heart}9.1K</span><span>${MI.com}212</span></div>
   <div class="sumh" data-pw>AI summary · Gemini</div><p class="sump" data-sum></p>
   <div class="pact" data-pw><div class="pcopy">${MI.cop}<u>Copy with source</u></div><div class="pbtns"><span class="aka" data-askp><i class="aspark"></i>Ask Magpiary</span>${['codewren','taskloom'].map(r=>`<span class="plink">${MI.globe}<span>Open ${r}<small>github.com</small></span>${MI.out}</span>`).join('')}</div><div class="pchips">${['codewren','taskloom','agentdock','loopsmith','fieldnotes'].map(r=>`<span class="rchip">${r}</span>`).join('')}<span class="rchip add">+ Add note</span></div></div>
   <div class="ptabs" data-pw><b>Summary</b><span>Links <em>5</em></span><span>Related <em>6</em></span><span>Transcript</span><span>Details</span></div>
   <div class="ptab" data-pw><div class="lkh">Tags <small>· added by the AI, yours to change</small></div><div class="ptags">${['ai agents','coding','github','open source'].map(t=>`<span>#${t} <u>×</u></span>`).join('')}<span class="add">+ Add tag</span></div>
    <div class="lkh">Key moments <small>· click to jump</small></div><ol class="kms">${[['0:06','Why agents beat autocomplete'],['0:42','codewren writes and tests code on its own'],['0:51','Which one to set up first']].map((k,i)=>`<li><i>${i+1}</i>${k[1]}<b>${k[0]}</b></li>`).join('')}</ol></div></div>
 </div>
 <div class="asks" data-asks><div class="ah"><i class="aspark"></i><div>Ask Magpiary<div class="asub">${POST.title}</div></div></div>
   <div class="athread"><div class="aq"></div><div class="aa"><span class="aat"></span><br><span class="acite">▶ Jump to 0:42</span></div></div>
   <div class="ain"><b data-ain>Ask about this post</b><span class="asend">↑</span></div></div>
 <svg class="mcur" viewBox="0 0 24 34" aria-hidden="true"><path d="M2 2v26l7-6 5 11 5-2-5-11h9z" fill="#fff" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/></svg><i class="mclick"></i>
</div>`;
const AIL=()=>`<div class="ais" data-ais><div class="aih">The AI you chose</div>${[['Gemini','#4C8DF6'],['OpenRouter','#FF7A5C'],['Claude','#E8A26B'],['OpenAI','#2BC48A']].map((b,i)=>`<div class="aib${i?'':' pick'}" data-b="${i}"><i style="background:${b[1]}"></i>${b[0]}${i?'':'<small>your key</small>'}</div>`).join('')}<div class="ainote">The video is never sent.</div></div>`;
const FLY=()=>`<div class="pieces" data-pieces><div class="pc fr" data-pc>${ART.reel}</div><div class="pc fr" data-pc>${ART.reel}</div><div class="pc fr" data-pc>${ART.reel}</div><div class="pc wd" data-pc>“…agents that write code…”</div><div class="pc sm" data-sumchip><i class="aspark"></i>Summary</div></div>`;
const CARD=`<div class="card" data-card>${ART.reel}</div>`;

const how=$('#how');
const HORIZ=REDUCE; /* reduced motion: the steps stacked as panels */
if(HORIZ){
  const panel=(i,inner,cls='')=>`<div class="cpan ${cls}" data-p="${i}">${inner}<div class="pcap"><h3>${BE[i][0]}</h3><p>${BE[i][1]}</p></div></div>`;
  const mac=x=>`<div class="macw" data-mac>${MACL()}</div>${x||''}`;
  how.innerHTML=`<div class="stageC" id="hstage"><div class="ctrack" id="ctrack">
   ${panel(0,`<div class="pa">${PHONE()}</div>`,'ph')}
   ${panel(1,`<div class="duo"><div class="pa">${PHONE()}</div><div class="mb">${mac()}</div></div>${CARD}`,'tr')}
   ${panel(2,mac())}
   ${panel(3,`<div class="duo ai"><div class="mb">${mac()}</div>${AIL()}</div>${FLY()}`,'pai')}
   ${panel(4,mac())}${panel(5,mac())}
  </div><div class="pline"><i id="pfill"></i></div></div>`;
}else{
  how.innerHTML=`<div class="stageA" id="hstage"><div class="cap"><h3 id="capt"></h3><p id="capd"></p></div><div class="pa">${PHONE()}</div><div class="mb"><div class="macw" data-mac>${MACL()}</div></div>${AIL()}${CARD}${FLY()}<div class="pline"><i id="pfill"></i></div></div>`;
}
function sizePhone(){const H=innerHeight,cap=ZOOM?0:Math.min(200,Math.max(130,H*.22));document.documentElement.style.setProperty('--ps',Math.min(1.5,Math.max(.46,Math.min(H*.648,SMALL?H-Math.min(300,Math.max(170,Math.min(132,Math.max(84,H*.125))+H*.16))-104:H-cap-34)/650)).toFixed(3));document.documentElement.style.setProperty('--ps2',Math.min(.8,Math.max(.42,(H*.56)/650)).toFixed(3));
  $$('.macw').forEach(m=>{const a=$('.app',m);a.style.transform=`scale(${m.offsetWidth/DW})`})}
if(ZOOM)document.documentElement.style.setProperty('--dh',DH+'px');
$$('.app').forEach(a=>{a.style.setProperty('--pad',PAD+'px');a.style.width=DW+'px';a.style.height=DH+'px';a.parentNode.style.aspectRatio=DW+'/'+DH;$$('.t',a).forEach(t=>{t.style.width=TW+'px';t.style.height=TH+'px'})});
sizePhone();addEventListener('resize',sizePhone);

/* --- app states: every step starts from a known state, so scrolling either way is safe --- */
function grid(app,mode,dur,skipNew){/* mode: wall = no new post, shift = post first */
  const nw=$('[data-new]',app),ts=$$('.t[data-i]',app);
  const put=(el,s)=>{gsap.killTweensOf(el);el.classList.toggle('feat',FEAT&&s===0);const p=Object.assign({},slot(s),{opacity:1});dur?gsap.to(el,{...p,duration:dur,ease:'power3.inOut'}):gsap.set(el,p)};
  ts.forEach(t=>put(t,+t.dataset.i+(mode==='wall'?0:1)));
  if(skipNew)return;
  mode==='wall'?(gsap.killTweensOf(nw),(nw.classList.add('feat'),gsap.set(nw,{...slot(0),opacity:0,scale:1}))):put(nw,0);
}
function pill(app,txt){const n=$('[data-nest]',app),l=$('.nline',n);if(!txt){n.dataset.mood='quiet';return}n.dataset.mood='working';if(l.textContent!==txt){l.textContent=txt;gsap.fromTo(l,{y:5,opacity:0},{y:0,opacity:1,duration:.22})}}
function tileStep(app,txt,pct){const t=$('[data-new]',app);t.classList.add('pend');$('.tt',t).textContent='Saving a new post…';$('.step',t).textContent=txt;gsap.to($('.tbar i',t),{scaleX:pct,duration:.4,ease:'power1.out'})}
function tileDone(app){const t=$('[data-new]',app);t.classList.remove('pend','locked');$('.tt',t).textContent=POST.title;$('.step',t).textContent=POST.who}
const SUMTXT='Five open repos for running AI coding agents. codewren writes and tests code on its own, taskloom plans the steps, and agentdock runs them safely.';
function appReset(app,mode,dur=0){
  $$('[data-pv],[data-asks]',app).forEach(e=>e.classList.remove('on'));gsap.set($('.mcur',app),{opacity:0});
  $('[data-sum]',app).textContent='';$$('[data-pw]',app).forEach(e=>e.classList.remove('on'));
  const a=$('[data-asks]',app);$('.aq',a).textContent='';$('.aat',a).textContent='';$('.acite',a).style.opacity=0;$('[data-ain]',a).textContent='Ask about this post';
  gsap.set($('[data-new]',app),{scale:1});
  if(mode==='wall'){tileDone(app);grid(app,'wall',dur);pill(app)}
  else if(mode==='pend'){grid(app,'shift',dur);tileStep(app,'Reading details',.08);pill(app,'Reading details')}
  else{grid(app,'shift',dur);tileDone(app);pill(app)}
  if(mode==='open'){$('[data-pv]',app).classList.add('on');$('[data-sum]',app).textContent=SUMTXT;$$('[data-pw]',app).forEach(e=>e.classList.add('on'))}
}
/* everything a step starts is registered here, so a fast scroll can stop it all at once */
const LIVE=[];const own=t=>(LIVE.push(t),t);
const pop=el=>own(gsap.fromTo(el,{scale:.9},{scale:1,duration:.45,ease:'back.out(2)'}));
/* cursor helpers: positions are design pixels, so targets are the real elements */
const elPos=(app,el,fx=.5,fy=.5)=>{const a=app.getBoundingClientRect(),r=el.getBoundingClientRect(),s=a.width/DW;return {x:(r.left-a.left+r.width*fx)/s,y:(r.top-a.top+r.height*fy)/s}};
function curTo(tl,app,getEl,opt={}){const c=$('.mcur',app);tl.add(()=>{const p=elPos(app,getEl(),opt.fx??.5,opt.fy??.5);own(gsap.to(c,{x:p.x,y:p.y,duration:opt.d??.55,ease:'power2.inOut'}))});tl.to({}, {duration:opt.d??.55})}
function clickNow(tl,app){tl.add(()=>{const c=$('.mcur',app),r=$('.mclick',app);gsap.set(r,{x:gsap.getProperty(c,'x'),y:gsap.getProperty(c,'y')});own(gsap.fromTo(r,{scale:.4,opacity:.9},{scale:1.7,opacity:0,duration:.42,ease:'power2.out'}));own(gsap.fromTo(c,{scale:.86},{scale:1,duration:.22}))})}
function typeInto(tl,el,text,dur){const o={v:0};tl.to(o,{v:text.length,duration:dur,ease:'none',onUpdate(){el.textContent=text.slice(0,Math.round(o.v))}})}
/* flight between two live elements, in the root's own coordinates, so moving layouts stay accurate */
function fly(root,el,from,to,opt={}){const lift=opt.lift||0,o={p:0},w0=opt.w0,w1=opt.w1;
  const pos=()=>{const R=root.getBoundingClientRect(),a=from(),b=to(),e=opt.ease?gsap.parseEase(opt.ease)(o.p):o.p;
    const cw=w0!=null?w0+(w1()-w0)*e:el.offsetWidth;
    const ax=a.left+a.width/2,ay=a.top+a.height/2,bx=b.left+b.width/2,by=b.top+b.height/2;
    gsap.set(el,{x:ax+(bx-ax)*e-R.left-el.offsetWidth/2,y:ay+(by-ay)*e-R.top-el.offsetHeight/2-Math.sin(Math.PI*e)*lift,scale:cw/el.offsetWidth})};
  return own(gsap.to(o,{p:1,duration:opt.dur||1,ease:'none',onStart(){gsap.set(el,{opacity:1});pos()},onUpdate:pos,onComplete(){opt.keep||gsap.set(el,{opacity:0})}}))}
const rect=el=>()=>el.getBoundingClientRect();

/* phone */
function fingerTo(tl,root,getT){const f=$('[data-finger]',root);tl.add(()=>{const t=getT();own(gsap.to(f,{x:t[0]-430*.479,y:t[1]-645*.0885,opacity:1,duration:.5,ease:'power3.out'}))});tl.to({}, {duration:.5})}
function fingerTap(tl,root,getT,fn){const f=$('[data-finger]',root),pulse=$('[data-pulse]',root);
  tl.to(f,{scale:.95,duration:.1,ease:'power2.in'});
  tl.add(()=>{const t=getT();own(gsap.fromTo(pulse,{left:t[0]-7,top:t[1]-7,scale:.4,opacity:.85},{scale:2,opacity:0,duration:.45,ease:'power2.out'}));fn&&fn()});
  tl.to(f,{scale:1,duration:.14,ease:'back.out(2)'})}
function phoneTargets(root){const ph=$('.phone',root),P=ph.getBoundingClientRect(),s=P.width/300,c=el=>{const r=el.getBoundingClientRect();return [(r.left+r.width/2-P.left)/s,(r.top+r.height/2-P.top)/s]};
  /* the sheet may still be sliding up, so aim for where the row ends up */
  const sh=$('[data-sheet]',root),me=$('.shrow.me',root),S=sh.getBoundingClientRect(),M=me.getBoundingClientRect(),B=$('.scr',root).getBoundingClientRect();
  return {share:c($('.pl svg',root)),me:[150,(B.bottom-S.height+(M.top-S.top)+M.height/2-P.top)/s]}}

/* --- the six steps. Each returns one timeline and can be killed at any moment --- */
const SCENE=[
 function share(root){const f=$('[data-finger]',root),sh=$('[data-sheet]',root),bn=$('[data-banner]',root);sh.classList.remove('on');bn.classList.remove('on');$('.shrow.me',root).classList.remove('press');
   const tl=gsap.timeline();const T=()=>phoneTargets(root);
   tl.add(()=>{const t=T().share;gsap.set(f,{x:t[0]-206+70,y:t[1]-57+560,opacity:1,scale:1})});
   fingerTo(tl,root,()=>T().share);tl.to({}, {duration:.12});fingerTap(tl,root,()=>T().share,()=>sh.classList.add('on'));tl.to({}, {duration:.42});
   fingerTo(tl,root,()=>T().me);tl.to({}, {duration:.1});fingerTap(tl,root,()=>T().me,()=>$('.shrow.me',root).classList.add('press'));
   tl.to(f,{y:'+=620',opacity:0,duration:.4,ease:'power2.in'},'+=.08');
   tl.add(()=>{sh.classList.remove('on');bn.classList.add('on')},'-=.3');
   /* the phone hands over by itself, only when moving forward, so scrolling back never traps anyone */
   tl.add(()=>{if(FORWARD&&window.__stepTo)window.__stepTo(1)},'+=.95');return tl},
 function travel(root){const app=$('.app',root),card=$('[data-card]',root),nw=$('[data-new]',app),qa=$('.qart',root);$('[data-sheet]',root).classList.remove('on');$('[data-banner]',root).classList.add('on');gsap.set($('[data-finger]',root),{opacity:0});appReset(app,'wall');gsap.set(card,{opacity:0});
   const tl=gsap.timeline();
   tl.add(()=>fly(root,card,rect(qa),rect(nw),{lift:innerHeight*.2,dur:1.15,ease:'sine.inOut',w0:qa.getBoundingClientRect().width,w1:()=>nw.getBoundingClientRect().width,keep:true}),.35);
   tl.add(()=>grid(app,'shift',.5,true),1.0);
   /* lands in colour under the flying card, then fades once to the in-progress look */
   tl.add(()=>{gsap.set(nw,{opacity:1});gsap.set(card,{opacity:0});tileStep(app,'Reading details',.08);pill(app,'Reading details');pop(nw)},1.52);
   return tl},
 function watch(root){const app=$('.app',root);appReset(app,'pend');const tl=gsap.timeline();
   [['Downloading',.3],['Transcribing',.55],['Picking frames',.78]].forEach((s,i)=>tl.add(()=>{tileStep(app,s[0],s[1]);pill(app,s[0])},.3+i*1));
   return tl},
 function ai(root){const app=$('.app',root),nw=$('[data-new]',app),P=$('[data-pieces]',root),pcs=$$('[data-pc]',P),sum=$('[data-sumchip]',P),bk=$('.aib.pick',root),all=$$('.aib',root);
   appReset(app,'pend');tileStep(app,'Summarising',.86);pill(app,'Summarising');gsap.set([...pcs,sum],{opacity:0});all.forEach(b=>b.classList.remove('hit'));
   const tl=gsap.timeline();tl.add(()=>nw.classList.add('locked'),.5);
   pcs.forEach((pc,i)=>tl.add(()=>fly(root,pc,rect(nw),rect(bk),{lift:70+i*12,dur:.8,ease:'power2.inOut'}),.75+i*.17));
   tl.add(()=>bk.classList.add('hit'),1.8);
   tl.add(()=>fly(root,sum,rect(bk),rect(nw),{lift:-60,dur:.8,ease:'power2.inOut'}),2.45);
   tl.add(()=>{bk.classList.remove('hit');tileStep(app,'Finding links',.95);pill(app,'Finding links')},3.2);
   tl.add(()=>{nw.classList.remove('locked');tileDone(app);pill(app);pop(nw)},3.85);
   return tl},
 function summary(root){const app=$('.app',root),nw=$('[data-new]',app),pv=$('[data-pv]',app),sm=$('[data-sum]',app),pw=$$('[data-pw]',app);appReset(app,'done',.3);
   const tl=gsap.timeline();
   tl.set($('.mcur',app),{x:DW*.72,y:DH*.72,opacity:1});curTo(tl,app,()=>nw,{fy:.45,d:.5});clickNow(tl,app);
   tl.add(()=>pv.classList.add('on'),'+=.1');tl.add(()=>shot('sum'));tl.to({}, {duration:.35});tl.to($('.mcur',app),{opacity:0,duration:.2});
   tl.add(()=>pw[0].classList.add('on'));typeInto(tl,sm,SUMTXT,.95);
   pw.slice(1).forEach(e=>tl.add(()=>e.classList.add('on'),'+=.07'));return tl},
 function ask(root){const app=$('.app',root),b=$('[data-askp]',app),a=$('[data-asks]',app),ain=$('[data-ain]',a),th=$('.athread',a);appReset(app,'open');
   const Q='Which is easiest to set up?',A='codewren. The reel says it takes about ten minutes, the quickest of the five.';
   const tl=gsap.timeline();tl.set($('.mcur',app),{x:DW*.62,y:DH*.8,opacity:1});curTo(tl,app,()=>b,{d:.5});clickNow(tl,app);
   tl.add(()=>a.classList.add('on'),'+=.08');tl.add(()=>shot('ask'));tl.to({}, {duration:.3});tl.to($('.mcur',app),{opacity:0,duration:.2});
   typeInto(tl,ain,Q,.75);tl.add(()=>{$('.aq',th).textContent=Q;ain.textContent='Ask about this post'},'+=.12');
   typeInto(tl,$('.aat',th),A,.9);tl.add(()=>{$('.acite',th).style.opacity=1});return tl},
];

/* --- the camera: Mac at design size, moved so the part being shown sits at a fixed spot, the rest dimmed --- */
const ASKBOX={x:DW-434,y:48,w:420,h:DH-62};
const pvrBox=()=>{const m=$('.macw .pvr');if(!m)return{x:0,y:0,w:1,h:1};return{x:m.parentNode.offsetLeft+m.offsetLeft,y:m.parentNode.offsetTop+m.offsetTop,w:m.offsetWidth,h:540}};
const askBtn=()=>{const m=$('.macw .pvr');return{...pvrBox(),y:pvrBox().y+250,h:210}};
const fullBox=()=>({x:0,y:0,w:DW,h:DH});
const tileBox=()=>{const s=slot(0);return{x:s.x,y:s.y,w:s.width,h:s.height}};
/* whole window on screen: w = share of the screen width it fills */
const CAMS={1:{side:'l',at:[.745,.5],box:fullBox,w:.49},2:{side:'r',at:[.32,.5],box:fullBox,w:.58},3:{side:'l',at:[.555,.5],box:fullBox,w:.44},4:{side:'r',at:[.32,.5],box:fullBox,w:.58},5:{side:'l',at:[.68,.5],box:askBtn,k:.5}};
const postBox=()=>({x:30,y:50,w:1180,h:760});/* the post view whole, video and details, so nothing is cut off at the left */
const SHOTS={sum:{side:'r',at:[.33,.5],box:postBox,w:.6},ask:{side:'l',at:[.72,.5],box:()=>ASKBOX,k:.66}};
function shoot(key,dur=.9){if(!ZOOM)return;const c=CAMS[key]||SHOTS[key];if(!c)return;const m=$('.macw'),b=c.box(),W=innerWidth,H=innerHeight;
  const at=c.at,kw=.56,kh=.84;
  const z=c.w?Math.min(W*c.w/b.w,H*.88/b.h):Math.min(W*kw*(c.k>.6?1:.8)/b.w,H*kh*c.k/.8/b.h,2.6)*(c.f||1);
  const p={x:W*at[0]-(b.x+b.w/2)*z,y:H*at[1]-(b.y+b.h/2)*z,scale:z};
  if(dur)own(gsap.to(m,{...p,duration:dur,ease:'power3.inOut',overwrite:'auto'}));else gsap.set(m,p)}
let lastShot=1;const shot=k=>{lastShot=k;shoot(k)};
if(ZOOM)addEventListener('resize',()=>shoot(lastShot,0));

/* --- step engine: same steps for both layouts --- */
let cur=-1,active,FORWARD=true;
const rootOf=i=>HORIZ?$(`.cpan[data-p="${i}"]`):$('#hstage');
function go(i){if(i===cur)return;const was=cur;FORWARD=i>was;cur=i;active&&active.kill();
  /* scrolling always wins: stop whatever was moving and clear anything in flight */
  LIVE.splice(0).forEach(t=>t.kill());
  gsap.set($$('[data-card],[data-pc],[data-sumchip]'),{opacity:0});gsap.set($$('.mcur'),{opacity:0});
  if(i!==0){const f=$$('[data-finger]');gsap.killTweensOf(f);gsap.set(f,{opacity:0})}
  gsap.to('#pfill',{scaleX:(i+1)/N,duration:.45,ease:'power2.out'});tint(TINTS[i][0],TINTS[i][1]);
  if(HORIZ){const tr=$('#ctrack'),p=rootOf(i);gsap.to(tr,{x:()=>-(p.offsetLeft+p.offsetWidth/2-innerWidth/2),duration:.75,ease:'power3.inOut',overwrite:true})}
  else{how.dataset.s=i;const c=$('.cap'),side=()=>{how.dataset.side=i?CAMS[i].side:'l'},t=()=>{$('#capt').textContent=BE[i][0];$('#capd').textContent=BE[i][1];side()};if(ZOOM&&i){lastShot=i;shoot(i,was<0?0:.9)}else if(ZOOM&&was<0)shoot(1,0);
    if(was<0)t();else gsap.timeline({overwrite:true}).to(c,{opacity:0,y:-8,duration:.16,ease:'power1.in',onComplete:t}).fromTo(c,{y:10},{opacity:1,y:0,duration:.32,ease:'power2.out'})}
  active=SCENE[i](rootOf(i));window.__stepUI&&window.__stepUI(i);}

/* folders, strip, stats, faq */
const BOARDS=[['Coffee nerd','#2BA84A',[24,25,26],[0,1,4],2],['Lisbon in May','#E8862A',[4,11,14],[2,3,0],1],['Mac apps to try','#6C4DE0',[17,3,1],[3,4,1],4]];
$('#folders').innerHTML=BOARDS.map(b=>`<a class="folder" href="#boards" style="--c:${b[1]}"><div class="back"></div>${b[2].map(i=>`<img src="${tile(i)}" alt="" loading="lazy" decoding="async">`).join('')}<div class="front"><div class="faces">${b[3].map(f=>`<img src="art/face${f}.webp" alt="" loading="lazy" decoding="async">`).join('')}<span>+${b[4]} more</span></div><b>${b[0]}</b><span class="n">${6+b[2][0]%7} cards</span></div></a>`).join('');
$('#stats').innerHTML=[['0','servers we run'],['0','accounts to make'],['1','folder that holds it all'],['2','AI modes, one with no AI']].map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');
const REPO='https://github.com/magpiary/magpiary',lk=(u,t)=>`<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
$('#faqs').innerHTML=[
['Getting started',[
 ['Why does my Mac say it cannot open Magpiary?','The first version is not signed with an Apple developer certificate, so macOS blocks it the first time. Open System Settings, go to Privacy &amp; Security, scroll down and click Open Anyway next to Magpiary. Right-click and Open does not work on recent macOS. For now it installs for one Mac account only.'],
 ['What do I need?','A Mac, and either an iPhone on the same home Wi-Fi or Chrome on that Mac. An Apple Silicon Mac is best, because that is where transcription is fast. There is no account to make, and you only need an AI key if you want summaries.'],
 ['Is there an Android or Windows version?',`No, and we are not working on one right now. Magpiary is built around a Mac doing the work, with the iPhone share button or Chrome as the ways in. If you would want one, tell us in ${lk(REPO+'/discussions','GitHub Discussions')} so we can see how many people are asking.`],
 ['Can I save from Chrome on my Mac?','Yes, with the Chrome extension. In a feed, press "Pick a post on this page", then click the post you mean. It saves over localhost to your own Mac, never reads cookies, and has no standing access to any site. It only runs when you press its button. No page can promise it is invisible to a website, so we do not claim that.'],
 ['How do I install the Chrome extension?','It is not on the Chrome Web Store yet, so you install it by hand. In Terminal run <code>magpiary extension</code>, which copies it to a folder and shows the steps. In Chrome open Extensions, turn on Developer mode, press Load unpacked and choose that folder. Then in Magpiary open Settings, Phones &amp; this Mac, press Pair Chrome, and paste the one-time code into the extension. The code lasts 15 minutes and works once.'],
 ['Can my AI assistant use my library?','Yes, if you turn it on. A command line (<code>magpiary search</code>, <code>show</code>, <code>list</code>, <code>status</code>, <code>add</code>, <code>note</code>), an MCP server and a skill let tools like Claude Code or Codex read your saves. It is off by default. In Settings, AI agents you choose what they may do, set daily limits, hide posts by tag and see an activity log. Reading is cooperative, because your library is a file on your Mac, so only give it to assistants you trust.'],
 ['What are goals, Most popular and Trending?','Goals are a private note about what you are working towards. The Digest, Ask and your AI assistants read them, and they are never sent to a board. Most popular and Trending are extra ways to order your library, with bigger tiles for the standouts.'],
 ['Which apps can I save from?','Instagram reels and posts, Threads, YouTube videos and Shorts, Reddit, X and LinkedIn. Any other link is kept too, with whatever can be read from it. On the iPhone you share to Magpiary the same way from all of them, and in Chrome the extension covers the same sites.'],
 ['What does it cost?','Magpiary is free and open source. Summaries use your own AI key, and free keys from Google Gemini or OpenRouter work within their daily limits. In Private mode you need no key at all.'],
 ['Why does macOS warn about it?','Magpiary is not signed with a paid Apple developer account, which is what stops macOS recognising the developer. The main install runs from Terminal. If a disk image is offered, the download page will walk you through the "unidentified developer" step.'],
]],
['Using it',[
 ['Does my Mac need to be on?','No. Your phone keeps your saves and hands them over the next time it is on Wi-Fi with your Mac. Nothing is lost if your Mac is asleep or you are out, and Magpiary runs in the background whenever your Mac is on.'],
 ['I shared something away from home. Is it lost?','No. The phone holds it and sends it when it is next on a Wi-Fi with your Mac. You can also send it by tapping Magpiary in the Shortcuts app.'],
 ['Can I search for an idea, not just a word?','Yes. Search looks through what was said, what was shown on screen, the caption and the summary. It also finds saves about the same idea even when they never use your words, and that part runs on your Mac and uses no AI quota.'],
 ['Can I open my library on my phone?','Not yet. The library only opens on your Mac for now. Your phone is one way posts get saved, and Chrome on your Mac is the other. Opening it from your phone is planned for later.'],
 ['Can it save private or blocked posts?','Only if you ask it to. Magpiary fetches posts without an account by default, and a blocked post gets a button to try with your own Instagram login. That login carries a small risk to your account, so it is never used for normal fetching.'],
 ['What if Instagram changes something?','Fetching can break until an update arrives, because it depends on how those sites work today. Magpiary checks for a new version once a day and tells you. Posts you already saved stay safe on your Mac either way.'],
]],
['AI and privacy',[
 ['What is sent to the AI?','In Smart mode, only the caption, the transcript and a few frames of each post, and only to the service whose key you added. The video itself never leaves your Mac. In Private mode nothing is sent.'],
 ['What is Private mode?','Magpiary with no AI at all. Posts are still downloaded, transcribed on your Mac, grouped into piles and searchable. You just do not get written summaries.'],
 ['Is a free AI key good enough?','Yes. Free keys have a daily limit, and Magpiary paces itself to stay within it and carries on the next day. If you add a second key, it moves on to that one first.'],
 ['Does Google see my posts with a free key?','With a free Gemini key, Google may use what is sent to improve its products. With billing turned on, Google says it does not. If that matters to you, use another provider or Private mode, which sends nothing.'],
 ['Why is there no summary on a post?','You are in Private mode, you have not added a key yet, or every key has reached its daily limit and comes back tomorrow. The post is still searchable by what was said. You can run the summary again from the post once a key works.'],
 ['Is there any tracking?','No. Magpiary sends no usage data and has no account and no server. The only routine call of its own is the daily check on GitHub for a newer version.'],
 ['Is it safe to use my Instagram login?','It is optional and carries a small risk to your account. The login is copied to a private file on your Mac and used only when you press the button on a blocked post. You can disconnect in Settings at any time, and Magpiary deletes its copy.'],
]],
['Your data',[
 ['Where is my library?','In one Magpiary folder in your home folder. It holds a database, the videos and photos, and a Markdown note for every post, so you can read your library without Magpiary.'],
 ['Can I back it up?','Yes. Back up the Magpiary folder with Time Machine or any copy, because it holds everything. Your keys are kept separately in a private settings file on your Mac.'],
 ['How do I delete everything?','In Settings, under Privacy, you can forget your Instagram login, remove all keys or empty the Trash. To remove the app, run <code>magpiary uninstall</code> in Terminal, and your library stays. Add <code>--delete-library</code> to remove the library as well.'],
]],
['Boards and the project',[
 ['What do friends see on a board?','Your name, photo, colour, about line, links and topics, and the posts you add to a board you share with them. Only people on a board with you can open your profile. The rest of your library stays private.'],
 ['Can anyone else read my boards?','No. Board posts are sealed on your Mac with the board\'s key before they leave it, so relays and storage services see only sealed data. Relays can see that your key posts to a board, but not what is in it.'],
 ['Is it open source?',`Yes, under the MIT license. All the code is ${lk(REPO,'on GitHub')}, so you can read exactly what it does, change it, or keep it running without us.`],
 ['Is it finished?',`It is young software, so expect some rough edges. Report what you find ${lk(REPO+'/issues','on GitHub')}, and tell us what you would like in ${lk(REPO+'/discussions','Discussions')}.`],
]],
].map((g,i)=>`<div class="fg${i?'':' open'}"><button type="button" class="fgh" aria-expanded="${!i}"><span>${g[0]}</span><small>${g[1].length} questions</small></button><div class="fgb"><div class="fgi"${i?' inert':''}>${g[1].map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div></div></div>`).join('');
/* one group open at a time, one answer open at a time, and the opened group stays in view */
(function(){const G=$$('.fg');G.forEach(g=>{const b=$('.fgh',g),box=$('.fgb',g);
  b.addEventListener('click',()=>{const on=!g.classList.contains('open');G.forEach(o=>{o.classList.remove('open');$('.fgh',o).setAttribute('aria-expanded','false');$('.fgi',o).inert=true});
    if(on){g.classList.add('open');b.setAttribute('aria-expanded','true');$('.fgi',g).inert=false}
    const settle=()=>{const top=b.getBoundingClientRect().top;if(top<90)scrollTo(0,scrollY+top-96);window.ScrollTrigger&&ScrollTrigger.refresh()};setTimeout(settle,REDUCE?0:460)})});
  $$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq details').forEach(o=>{if(o!==d)o.open=false});setTimeout(()=>window.ScrollTrigger&&ScrollTrigger.refresh(),60)}))})();

/* privacy: four layouts and four kinds of motion to compare */
const PV=(p=>{const i=d=>`<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;return{
 phone:i('<rect x="7" y="2.500" width="10" height="19" rx="2.500"/><path d="M11 18.500h2"/>'),mac:i('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20M9 16l-.5 4M15 16l.5 4"/>'),wifi:i('<path d="M3 9.500a13 13 0 0 1 18 0M6.500 13a8 8 0 0 1 11 0M10 16.500a3 3 0 0 1 4 0"/><circle cx="12" cy="19.500" r=".6"/>'),
 spark:i('<path d="M12 3l1.800 6.200L20 11l-6.200 1.800L12 19l-1.800-6.200L4 11l6.200-1.800z"/>'),lock:i('<rect x="5" y="11" width="14" height="10" rx="2"/><path class="shk" d="M8 11V7a4 4 0 0 1 8 0v4"/>'),srv:i('<rect x="4" y="4" width="16" height="6" rx="1.500"/><rect x="4" y="14" width="16" height="6" rx="1.500"/><path class="cut" d="M3 21L21 3"/>'),
 eye:i('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/><path class="cut" d="M4 20L20 4"/>'),fold:i('<path d="M3 6h7l2 2h9v11H3z"/>'),brush:i('<path d="M4 7h16M7 12h10M10 17h4"/><path class="cut" d="M4 20L20 4"/>'),
 user:i('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'),key:i('<circle cx="8" cy="15" r="4"/><path class="shk" d="M11 12l9-9M16 7l3 3"/>'),seal:i('<path d="M12 3l8 3v6c0 4.500-3.500 8-8 9-4.500-1-8-4.500-8-9V6z"/><path class="shk" d="M9 12l2 2 4-4"/>'),tag:i('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8" r="1"/>'),video:i('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>'),search:i('<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>'),glob:i('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>')}})();
const PPOINTS=[['srv','No server','We do not run one, so there is nothing of yours on it. Your phone talks straight to your Mac.'],['eye','No account or tracking','Nothing to sign up for. Magpiary sends no usage data at all.'],['fold','One folder','A database, your videos and a Markdown note per post. Back it up, or delete it with one command.'],
 ['brush','No tracking tags','Share IDs and tracking tags come off on your phone, before the link is stored anywhere.'],['user','Logged out by default','Posts are fetched without an account. Your Instagram login is used only if you press the button on a blocked post.'],['key','Keys stay local','AI keys sit in a file on your Mac that only you can read, and are never shown again after saving.'],
 ['seal','Boards are sealed','Board posts are sealed on your Mac first. Relays and storage see only sealed data, and only board items ever leave.'],['tag','Links get names only','Directories and web search get only the names a post mentions, never the post or its words.'],['spark','AI is your choice','Smart sends the caption, transcript and a few frames to your own key. Private sends nothing.']];
const SWITCHER=`<div class="psw" role="group" aria-label="AI mode"><button type="button" data-mode="smart" class="on">Smart</button><button type="button" data-mode="private">Private</button></div>`;
const JR=`<div class="jr" id="jr" data-mode="smart"><div class="jn" data-n="phone">${PV.phone}<b>Your iPhone</b><span>Strips tracking</span></div><div class="jl" data-n="wifi"><i></i><em>Your Wi-Fi</em></div><div class="jn main" data-n="mac">${PV.mac}<b>Your Mac</b><span>Does all the work</span><u class="jlock">${PV.lock}</u></div><div class="jl second" data-n="out"><i></i><em class="smart">Frames + words</em><em class="priv">Nothing sent</em></div><div class="jn" data-n="ai">${PV.spark}<b>Your AI key</b><span class="smart">Smart mode only</span><span class="priv">Private: no AI</span></div>
 <span class="tk link" data-t="link">link<s>?igsh=…</s></span><span class="tk bit" data-t="b1">igsh</span><span class="tk bit" data-t="b2">utm</span><span class="tk vid" data-t="vid">Video</span><span class="tk fr" data-t="fr">Frames</span><span class="tk wd" data-t="wd">Words</span></div>`;
const HASTR=!REDUCE;
const PHEAD=`<p class="peyebrow">Nothing hidden</p><h2 class="big" data-rise>The video never leaves your Mac.</h2><p class="lead">No server of ours is involved, because there isn't one. Here is exactly what leaves your Mac, and what never does.</p>`;
$('#privacy').innerHTML=PHEAD+SWITCHER+JR+`<ul class="pts">${PPOINTS.map((p,i)=>`<li><button type="button" class="pt" aria-expanded="false" aria-describedby="pt${i}">${PV[p[0]]}<span>${p[1]}</span></button><span class="ptip" id="pt${i}" role="tooltip">${p[2]}</span></li>`).join('')}</ul>`;
$$('.pt').forEach(b=>b.addEventListener('click',()=>{if(matchMedia('(hover:hover)').matches&&!SMALL)return;const li=b.parentNode,on=!li.classList.contains('open');$$('.pts li').forEach(l=>{l.classList.remove('open');$('.pt',l).setAttribute('aria-expanded','false')});if(on){li.classList.add('open');b.setAttribute('aria-expanded','true')}}));
(function(){const b=document.createElement('button');b.type='button';b.id='totop';b.setAttribute('aria-label','Back to top');b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';document.body.append(b);
  addEventListener('scroll',()=>b.classList.toggle('on',scrollY>innerHeight*1.2),{passive:true});
  b.addEventListener('click',()=>{window.__releaseHold&&window.__releaseHold();window.__lenis?window.__lenis.scrollTo(0,{duration:1.5,force:true}):scrollTo({top:0,behavior:REDUCE?'auto':'smooth'})})})();
function privacyMotion(){const sec=$('#privacy'),jr=$('#jr'),sw=$('.psw');let mode='smart',auto;
  const setMode=m=>{mode=m;jr&&(jr.dataset.mode=m);$$('.psw button').forEach(b=>b.classList.toggle('on',b.dataset.mode===m));};
  if(sw){sw.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;clearInterval(auto);setMode(b.dataset.mode)});
    if(!REDUCE)auto=setInterval(()=>{const r=sec.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)setMode(mode==='smart'?'private':'smart')},9000)}
  if(REDUCE)return;
  let tl;const build=()=>{tl&&tl.kill();if(!jr||!HASTR)return;const J=jr.getBoundingClientRect(),c=n=>{const r=$(`[data-n=${n}]`,jr).getBoundingClientRect();return{x:r.left-J.left+r.width/2,y:r.top-J.top+r.height/2}},t=n=>$(`[data-t=${n}]`,jr),P=c('phone'),M=c('mac'),A=c('ai'),O=c('out'),W=c('wifi');
    gsap.set($$('.tk',jr),{xPercent:-50,yPercent:-50,opacity:0,scale:1});const lk=t('link'),s=$('s',lk);
    tl=gsap.timeline({repeat:-1,repeatDelay:.5,paused:true,onRepeat(){s.style.display=''}});
    tl.set(lk,{x:P.x,y:P.y,opacity:1}).add(()=>{s.style.display=''}).to(lk,{x:W.x-(W.x-P.x)*.45,y:W.y-(W.y-P.y)*.45,duration:.5,ease:'power1.inOut'})
      .add(()=>{s.style.display='none'}).set([t('b1'),t('b2')],{x:W.x-(W.x-P.x)*.45,y:W.y-(W.y-P.y)*.45,opacity:1})
      .to(t('b1'),{x:'-=18',y:'+=52',rotation:-24,opacity:0,duration:.6,ease:'power1.in'},'<').to(t('b2'),{x:'+=18',y:'+=60',rotation:22,opacity:0,duration:.65,ease:'power1.in'},'<')
      .to(lk,{x:M.x,y:M.y,duration:.8,ease:'power1.inOut'},'-=.45').to(lk,{opacity:0,scale:.6,duration:.2}).add(()=>$('[data-n=mac]',jr).classList.add('ping')).add(()=>$('[data-n=mac]',jr).classList.remove('ping'),'+=.5')
      .set(t('vid'),{x:M.x,y:M.y,opacity:1}).to(t('vid'),{x:M.x+(O.x-M.x)*.62,y:M.y+(O.y-M.y)*.62,duration:.55,ease:'power2.in'}).add(()=>{const l=$('.jlock',jr);gsap.fromTo(l,{scale:1},{scale:1.35,duration:.14,yoyo:true,repeat:1})})
      .to(t('vid'),{x:M.x,y:M.y,opacity:0,duration:.5,ease:'back.in(1)'});
    ['fr','wd'].forEach((k,i)=>{tl.set(t(k),{x:M.x,y:M.y,opacity:0},i?'-=.72':'+=.1').add(()=>{gsap.set(t(k),{opacity:mode==='smart'?1:0})}).to(t(k),{x:A.x,y:A.y+(i?16:-16),duration:.95,ease:'power1.inOut'}).to(t(k),{opacity:0,duration:.18})});
  };
  document.fonts&&document.fonts.ready.then(build);build();addEventListener('resize',()=>{const p=tl&&tl.isActive();build();p&&tl&&tl.play()});
  if(jr&&HASTR)ScrollTrigger.create({trigger:jr,start:'top 90%',end:'bottom 5%',onToggle(s){tl&&(s.isActive?tl.play():tl.pause())}});
  gsap.from('.pts li',{opacity:0,y:18,stagger:.04,duration:.55,ease:'power2.out',scrollTrigger:{trigger:'.pts',start:'top 88%'}});
}

/* review bar: only what is still undecided, plus the darkness */
/* the switcher stays hidden; ?view=full or ?view=beside picks the view, and ?switcher shows the pill */
(function(){const G=innerWidth>=900&&q.has('switcher')?[['view','How it works',[['full','Full screens'],['beside','Zoom beside']]]]:[];
  $('#review').innerHTML=G.map(g=>`<div class="g"><b>${g[1]}</b>${g[2].map(o=>`<button type="button" data-k="${g[0]}" data-v="${o[0]}" class="${OPT[g[0]]===o[0]?'on':''}">${o[1]}</button>`).join('')}</div>`).join(''); 
  if(!G.length)$('#review').remove();else $('#review').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;q.set(b.dataset.k,b.dataset.v);try{sessionStorage.setItem('mp-y',scrollY)}catch(_){}location.search=q.toString()});
})();

/* sparkle: bigger, trails the normal cursor, drifts through the palette, bursts on click */
const SPARK={c:'#FFD27A'};
(function(){if(!matchMedia('(hover:hover) and (pointer:fine)').matches||REDUCE){$('#cur').style.display='none';return}
  const c=$('#cur'),px=gsap.quickTo(c,'x',{duration:.55,ease:'power3.out'}),py=gsap.quickTo(c,'y',{duration:.75,ease:'power3.out'});
  const spin=gsap.to(c,{rotation:360,repeat:-1,duration:7,ease:'none'});
  gsap.to(SPARK,{keyframes:{c:['#FFD27A','#FF8FB8','#8FE5C2','#B59CFF','#FF9A5C','#FFD27A']},duration:14,repeat:-1,ease:'none',onUpdate(){c.style.setProperty('--sc',SPARK.c)}});
  const hot='a,button,summary,.folder,.tilt';let on=false;
  addEventListener('pointermove',e=>{px(e.clientX+26);py(e.clientY+28);const h=!!e.target.closest&&!!e.target.closest(hot);if(h!==on){on=h;gsap.to(c,{scale:h?1.6:1,duration:.3,ease:'back.out(2.2)'});spin.timeScale(h?5:1)}});
  addEventListener('pointerdown',e=>{for(let i=0;i<9;i++){const s=document.createElement('i');s.className='spk';s.style.background=SPARK.c;document.body.append(s);const a=Math.random()*6.28,d=30+Math.random()*50;gsap.fromTo(s,{x:e.clientX,y:e.clientY,scale:1.2,rotation:0},{x:e.clientX+Math.cos(a)*d,y:e.clientY+Math.sin(a)*d,scale:0,rotation:180,duration:.7,ease:'power2.out',onComplete(){s.remove()}})}});
})();

/* rotating hero word, three ways to compare */
const WORDSET=[['found','#FFB020'],[SMALL?'known':'understood','#5CE6B0'],['learned','#FF9A7C'],['read','#7FD4FF'],['used','#C9B6FF']];
(function(){const box=$('#rot'),h=$('#hero h1');h.setAttribute('aria-label','Saved is not the same as found.');
  /* phones: two lines, always. The size comes from the screen width and the longest word */
  if(SMALL){const fit=()=>{const c=getComputedStyle(h),x=document.createElement('canvas').getContext('2d');x.font=`${c.fontWeight} 100px ${c.fontFamily}`;const w=t=>x.measureText(t).width,
      widest=Math.max(w('Saved is not the'),...WORDSET.map(e=>w('same as '+e[0]+'.')));h.style.fontSize=Math.min(56,Math.floor((innerWidth-44)/widest*100))+'px'};fit();document.fonts&&document.fonts.ready.then(fit);addEventListener('resize',fit)}
  box.innerHTML=WORDSET.map(w=>`<span class="w" style="color:${w[1]}">${[...w[0]].map(l=>`<i>${l}</i>`).join('')}</span>`).join('');
  const W=$$('.w',box);let k=0;
  const fit=()=>{const f=W[k];box.style.width=f.offsetWidth+'px'};gsap.set(W,{autoAlpha:0,xPercent:-50});gsap.set(W[0],{autoAlpha:1});fit();addEventListener('resize',fit);document.fonts&&document.fonts.ready.then(fit);
  if(REDUCE)return;
  const change=()=>{if(scrollY>innerHeight*.5)return;const a=W[k];k=(k+1)%W.length;const b=W[k];gsap.to(box,{width:b.offsetWidth,duration:.5,ease:'power3.inOut'});const tl=gsap.timeline();
    if(OPT.word==='letters'){tl.to($$('i',a),{yPercent:-70,opacity:0,stagger:.018,duration:.24,ease:'power2.in'}).set(a,{autoAlpha:0}).set(b,{autoAlpha:1}).fromTo($$('i',b),{yPercent:70,opacity:0},{yPercent:0,opacity:1,stagger:.024,duration:.32,ease:'back.out(1.6)'},'-=.02')}
    else if(OPT.word==='blur'){tl.to(a,{filter:'blur(14px)',autoAlpha:0,duration:.35,ease:'power1.in'}).fromTo(b,{filter:'blur(14px)',autoAlpha:0},{filter:'blur(0px)',autoAlpha:1,duration:.45,ease:'power1.out'},'-=.12')}
    else{tl.to(a,{yPercent:-105,duration:.48,ease:'power3.inOut'}).set(a,{autoAlpha:0,yPercent:0}).fromTo(b,{yPercent:105,autoAlpha:1},{yPercent:0,duration:.5,ease:'power3.out'},'-=.42')}};
  setInterval(change,2600);
})();

/* motion */
gsap.registerPlugin(ScrollTrigger);
const nav=$('#nav');
addEventListener('scroll',()=>{const on=scrollY>innerHeight*.5;nav.classList.toggle('slim',on);$('#navfade').classList.toggle('on',on)},{passive:true});
const NAVL=$$('.nav .links a'),NAVS=NAVL.map(a=>$(a.getAttribute('href')));
let spyT=0;addEventListener('scroll',()=>{if(spyT)return;spyT=requestAnimationFrame(()=>{spyT=0;let k=-1;NAVS.forEach((e,i)=>{if(e&&e.getBoundingClientRect().top<innerHeight*.4)k=i});NAVL.forEach((a,i)=>a.classList.toggle('on',i===k))})},{passive:true});
gsap.set('#herostage',{xPercent:-50});

/* magpie: one continuous path in, frames carry the landing, feet stay on the same floor in every frame */
function landBird(instant,b=$('#lander')){if(!b)return;const fr=$$('img',b),show=i=>fr.forEach((f,k)=>f.style.opacity=k===i?1:0),PERCH=fr.length-1;
  if(instant){show(PERCH);gsap.set(b,{x:0,y:0,opacity:1});b.classList.add('perched');blink($$('.lid',b));return}
  const sx=-(b.getBoundingClientRect().left+b.offsetWidth+40),sy=-innerHeight*.3,o={i:0};
  gsap.set(b,{x:sx,y:sy,opacity:1,rotation:-5,transformOrigin:'50% 100%'});show(0);
  const flap=gsap.to(o,{i:3,duration:.3,repeat:-1,ease:'none',onUpdate(){show(Math.min(2,Math.floor(o.i)))}});
  const T=1.4;
  gsap.timeline().to(b,{x:0,duration:T,ease:'power2.out'},0).to(b,{y:0,duration:T,ease:'power1.inOut'},0).to(b,{rotation:0,duration:.35,ease:'sine.out'},T-.45)
   .add(()=>{flap.kill();show(3)},T-.34).add(()=>show(4),T-.2).add(()=>show(5),T-.06).add(()=>show(6),T+.08).add(()=>{show(PERCH);b.classList.add('perched');blink($$('.lid',b))},T+.2)
   .to(b,{scaleY:.95,scaleX:1.03,duration:.1,ease:'power1.out'},T-.04).to(b,{scaleY:1,scaleX:1,duration:.4,ease:'back.out(2.5)'},T+.06)
   .add(()=>gsap.to(b,{y:-3,rotation:1,repeat:-1,yoyo:true,duration:1.9,ease:'sine.inOut'}));
}
function blink(lids){const once=()=>gsap.timeline().to(lids,{scaleY:1,duration:.07,ease:'power1.in'}).to(lids,{scaleY:0,duration:.11,ease:'power1.out'});
  const next=()=>gsap.delayedCall(gsap.utils.random(3,6),()=>{const t=once();if(Math.random()<.2)t.add(once(),'+=.12');next()});next()}

/* stepping: a pinned stretch with one position per step, driven by wheel, touch and keys */
function phoneSteps(lenis){const st=$('#hstage'),b=document.createElement('div');b.className='hbtns';
  b.innerHTML=`<button type="button" class="hback" aria-label="Previous step"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" class="hnext"><span>Next</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>`;st.append(b);
  const leave=()=>{pass=true;held=false;html.classList.remove('held','hfix');const f=$('#features');lenis?lenis.scrollTo(f,{duration:.9,force:true}):f.scrollIntoView({behavior:'smooth'})},bk=$('.hback',b),nx=$('.hnext',b);
  bk.onclick=()=>{if(cur>0)go(cur-1)};nx.onclick=()=>{cur<N-1?go(cur+1):leave()};
  window.__stepUI=i=>{bk.disabled=i===0;$('span',nx).textContent=i===N-1?'Continue':'Next'};window.__stepTo=i=>go(i);
  $('#capt').textContent=BE[0][0];$('#capd').textContent=BE[0][1];how.dataset.s=0;window.__stepUI(0);
  const trg=ScrollTrigger.create({trigger:'#hstage',start:'top top',end:'bottom 45%',onEnter(){if(cur<0)go(0)},onToggle(s){document.body.classList.toggle('inhow',s.isActive)}});
  /* catch: a swipe stops here, however fast. Two swipes in the same direction carry on */
  const H=()=>innerHeight,html=document.documentElement;let held=false,pass=false,prev=scrollY,idle,touching=false,ty0=0,tdy=0,count=0,lastDir=0,fresh=false;
  const programmatic=()=>lenis&&lenis.isScrolling==='smooth';
  /* iOS can't be stopped mid-coast without shaking, so never fight it: the stage is fixed on screen, the page coasts unseen behind it, then lines up once still */
  let settled=true;
  const unfix=()=>{html.classList.remove('hfix');settled=true};
  const settle=()=>{let last=scrollY,still=0,above=scrollY<trg.start-2;const tick=()=>{if(!held)return;const y=scrollY;if(y<trg.start-2)above=true;if(touching||Math.abs(y-last)>.5){still=0;last=y}else still++;
      if(still<6)return requestAnimationFrame(tick);scrollTo(0,trg.start);requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!held)return;if(Math.abs(scrollY-trg.start)>1){still=0;last=scrollY;return requestAnimationFrame(tick)}/* the section above is scroll-driven: let it catch up unseen before showing it again */above?setTimeout(()=>{held&&unfix()},800):unfix()}))};requestAnimationFrame(tick)};
  const hold=()=>{held=true;settled=false;count=0;lastDir=0;const off=trg.start-scrollY;html.classList.add('held','hfix');gsap.fromTo(st,{y:Math.max(-180,Math.min(180,off))},{y:0,duration:.38,ease:'power3.out',overwrite:'auto'});settle()};
  const free=dir=>{held=false;pass=true;unfix();html.classList.remove('held');const y=dir>0?trg.start+H()*.92:trg.start-H()*.7;lenis?lenis.scrollTo(y,{duration:.8,force:true}):scrollTo({top:y,behavior:'smooth'})};
  const nudge=dir=>{gsap.fromTo(st,{y:0},{y:-dir*16,duration:.14,ease:'power2.out',yoyo:true,repeat:1});dir>0&&gsap.fromTo(nx,{scale:1},{scale:1.08,duration:.16,yoyo:true,repeat:1})};
  addEventListener('scroll',()=>{const y=scrollY,a=trg.start;if(Math.abs(y-a)>H()*.6)pass=false;
    if(!held&&!pass&&!programmatic()&&((prev<a-2&&y>=a-2)||(prev>a+2&&y<=a+2)))hold();
    prev=y;clearTimeout(idle);idle=setTimeout(()=>{if(!held&&!pass&&!touching&&!programmatic()&&Math.abs(scrollY-a)<H()*.3)hold()},160)},{passive:true});
  addEventListener('touchstart',e=>{touching=true;fresh=held;ty0=e.touches[0].clientY;tdy=0},{passive:true});
  addEventListener('touchmove',e=>{if(!held)return;if(e.cancelable)e.preventDefault();tdy=ty0-e.touches[0].clientY},{passive:false});
  addEventListener('touchend',()=>{touching=false;if(!held||!settled||!fresh||Math.abs(tdy)<34)return;const dir=Math.sign(tdy);count=dir===lastDir?count+1:1;lastDir=dir;if(count>=2)free(dir);else nudge(dir)},{passive:true});
  window.__releaseHold=()=>{pass=true;held=false;html.classList.remove('held','hfix');settled=true};
  window.__holdState=()=>({held,pass,count,start:trg.start,y:scrollY});
  return trg}
function buildStepper(lenis){
  /* phones: buttons move the steps, the page itself scrolls normally */
  if(SMALL&&!HORIZ)return phoneSteps(lenis);
  const pin=ScrollTrigger.create({trigger:'#hstage',start:'top top',end:()=>'+='+(N-1)*innerHeight*.7,pin:true,invalidateOnRefresh:true,snap:{snapTo:1/(N-1),duration:{min:.15,max:.45},delay:.08,ease:'power2.out'},snap:{snapTo:1/(N-1),duration:{min:.15,max:.45},delay:.08,ease:'power2.out'},
    onUpdate(s){go(Math.round(s.progress*(N-1)))},onEnter(s){cur=-1;go(Math.round(s.progress*(N-1)))},onEnterBack(s){go(Math.round(s.progress*(N-1)))}});
  if(!HORIZ){$('#capt').textContent=BE[0][0];$('#capd').textContent=BE[0][1];how.dataset.s=0}
  const yOf=i=>pin.start+(pin.end-pin.start)*i/(N-1);
  window.__stepTo=i=>to(i,.6);
  const inside=()=>{const y=scrollY;return y>=pin.start-1&&y<=pin.end+1};
  const to=(i,d=.5)=>{lenis?lenis.scrollTo(yOf(i),{duration:d,force:true,lock:false,easing:t=>1-Math.pow(1-t,3)}):scrollTo(0,yOf(i))};
  /* native scrolling: the pin maps scroll progress to steps, and snaps to the nearest one */
  return pin;
}

if(REDUCE){document.body.classList.add('static');landBird(true,$('.lander2'));privacyMotion();$('#load').remove();$('#c1').textContent='328';$('#c2').textContent='3';landBird(true);SCENE.forEach((f,i)=>{const t=f(rootOf(i));t.progress(1);gsap.ticker.tick()})}
else{
  let lenis=null;
  if(window.Lenis){lenis=new Lenis({lerp:.09});window.__lenis=lenis;lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
    document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&a.getAttribute('href').length>1){e.preventDefault();lenis.scrollTo(a.getAttribute('href'))}})}
  /* opening: counter, then a pill softly opens into the hero */
  const c={v:0},n=$('#count'),p=$('#pill');
  gsap.set('#herotext>*',{y:40,opacity:0});gsap.set('.fl',{opacity:0,scale:.6});gsap.set('#stagein',{y:'14svh'});
  const back=(()=>{try{const y=sessionStorage.getItem('mp-y');sessionStorage.removeItem('mp-y');return y}catch(_){return null}})();
  const reveal=t=>t.to('#herotext>*',{y:0,opacity:1,stagger:.09,duration:.8,ease:'power3.out'},'-=.75').to('#stagein',{y:0,duration:1.1,ease:'power3.out',onComplete(){gsap.delayedCall(.15,landBird)}},'-=.9').to('.fl',{opacity:1,scale:1,stagger:.05,duration:.7,ease:'back.out(1.6)'},'-=.8');
  if(back!==null){$('#load').remove();reveal(gsap.timeline()).progress(1);gsap.killTweensOf(landBird);landBird(true);requestAnimationFrame(()=>requestAnimationFrame(()=>{ScrollTrigger.refresh();scrollTo(0,+back)}))}
  else{
    /* opening: pills grow out of the centre, each holding a saved post, the last one fills the screen in the page's own colour */
    const SRC=[12,24,13,6,34].map(i=>`screens/tiles/t${String(i).padStart(2,'0')}.webp`).concat('art/cover.webp');
    p.remove();const L=$('#load'),pills=SRC.map(u=>{const d=document.createElement('div');d.className='lp';d.innerHTML=`<img src="${u}" alt="">`;L.insertBefore(d,n);return d});
    const blue=document.createElement('div');blue.className='lp fill';L.insertBefore(blue,n);
    const ready=Promise.race([Promise.all($$('.lp img',L).map(i=>i.decode().catch(()=>0))),new Promise(r=>setTimeout(r,1400))]);
    gsap.set([...pills,blue],{xPercent:-50,yPercent:-50,scale:0});
    ready.then(()=>{const big=Math.max(innerWidth,innerHeight)*1.5/(innerHeight*.5)*1.5;
      const t=gsap.timeline();
      t.to(c,{v:100,duration:2.1,ease:'power1.inOut',onUpdate(){n.textContent=Math.round(c.v)}},0);
      pills.forEach((d,i)=>{t.to(d,{scale:big,duration:1.9,ease:'expo.inOut'},.05+i*.17);t.fromTo($('img',d),{scale:1.5},{scale:1,duration:1.9,ease:'expo.inOut'},.05+i*.17)});
      t.to(n,{opacity:0,duration:.25},1.75);
      t.to(blue,{scale:big*1.5,duration:1.5,ease:'expo.inOut'},.05+pills.length*.17);
      t.to(L,{opacity:0,duration:.55,ease:'power1.inOut',onComplete(){L.remove()}});
      reveal(t)})}
  /* hero: the text leaves, the full-size window rises and scales down to fit the screen */
  const win=$('#herostage');
  const fit=()=>{const r=(innerHeight*.84)/$('#herowin').offsetHeight;return Math.min(.78,r)};
  const ht=gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'+=130%',pin:true,scrub:1,invalidateOnRefresh:true}});
  ht.to('#herotext',{y:-90,opacity:0,duration:.3,ease:'none'},0)
    .to(win,{y:()=>-(innerHeight*.68-innerHeight*.09),duration:1,ease:'none'},0)
    .to(win,{scale:fit,duration:1,ease:'none'},0);
  $$('.fl').forEach(f=>ht.to(f,{x:()=>+f.dataset.dx*innerWidth*.28*f.dataset.d,y:()=>-innerHeight*.14*f.dataset.d,duration:.8,ease:'none'},.05));
  blink($$('#bird .lid'));const heroLoops=[gsap.to('#bird',{rotation:1.6,repeat:-1,yoyo:true,duration:2.2,ease:'sine.inOut'}),...$$('.fl').map((f,i)=>gsap.to(f,{yPercent:6+i,rotation:'+=2',repeat:-1,yoyo:true,duration:2.6+i*.3,ease:'sine.inOut'}))];
  /* the hero's endless loops sleep once the hero is off screen */
  if(window.IntersectionObserver)new IntersectionObserver(en=>heroLoops.forEach(t=>en[0].isIntersecting?t.resume():t.pause())).observe($('#hero'));
  ScrollTrigger.create({trigger:'#why',start:'top 60%',onEnter(){tint('#1A1468','#4A3CC8')},onLeaveBack(){tint('#10107A','#3030C8')}});
  /* saved wall: tiles arrive, counter climbs, then search clears it down to one */
  const txt='agents that write code',w=$('#wq'),o={v:0},cn={a:0,b:0},imgs='#wall img';
  gsap.timeline({scrollTrigger:{trigger:'#wpin',start:'top top',end:'+=185%',pin:true,scrub:.6}})
    .from(imgs,{scale:.72,opacity:0,stagger:{each:.012,from:'center'},duration:.5},0)
    .to(cn,{a:328,duration:.8,ease:'power1.in',onUpdate(){$('#c1').textContent=Math.round(cn.a)}},.3)
    .to(cn,{b:3,duration:.35,onUpdate(){$('#c2').textContent=Math.round(cn.b)}},.85)
    .to('#count2',{opacity:0,y:-24,duration:.25},1.4)
    .to('#wsearch',{opacity:1,duration:.25},1.55)
    .to(o,{v:txt.length,duration:.5,ease:'none',onUpdate(){w.textContent=txt.slice(0,Math.round(o.v))||' '}},1.65)
    .to(imgs,{opacity:0,scale:.9,stagger:{each:.005,from:'random'},duration:.4},2.15)
    .to('.whyhead',{y:-100,scale:.62,duration:.4},2.2).to('.swap',{y:-140,duration:.4},2.2)
    .fromTo('#found',{opacity:0,y:40,xPercent:-50},{opacity:1,y:0,xPercent:-50,duration:.4},2.5).to('#payoff',{opacity:1,duration:.25},2.75)
    /* no gap: the tile hands straight over to the heading, and How it works appears through the zoom */
    .to(['.wcol','#payoff'],{opacity:0,y:-40,duration:.25,ease:'power1.in'},3.15).to('#pool',{opacity:0,duration:.25},3.2)
    .fromTo('#zoomt',{scale:.05/.085,opacity:0},{scale:1,opacity:1,duration:.3,ease:'none'},3.2)
    .to('#zoomt',{scale:1.5/.085,duration:.75,ease:'power2.in'},3.5)
    .to('#zoomt',{opacity:0,duration:.15},4.1)
    .fromTo('#hstage',{autoAlpha:0},{autoAlpha:1,duration:.2,ease:'none'},4.05);
  /* how it works */
  window.__pin=buildStepper(lenis);
  /* chapter tints */
  [['#features','#0D3F6E','#2090B8'],['#boards','#0E3D5C','#20A090'],['#privacy','#34125E','#8840B0'],['#nums','#10107A','#3030C8'],['#faq','#1A1468','#4A3CC8'],['#install','#10107A','#3838D8']].forEach(t=>ScrollTrigger.create({trigger:t[0],start:'top 55%',end:'bottom 45%',onToggle(s){if(s.isActive)tint(t[1],t[2])}}));
  $$('[data-rise]').forEach(el=>gsap.from(el,{y:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%'}}));
  gsap.from('.tilt',{y:120,opacity:0,stagger:.1,duration:.9,ease:'back.out(1.3)',clearProps:'transform,opacity',scrollTrigger:{trigger:'.tilts',start:'top 82%'}});
  gsap.from('.stat',{y:90,opacity:0,stagger:.1,duration:.9,ease:'back.out(1.4)',scrollTrigger:{trigger:'#stats',start:'top 80%'}});
  gsap.from('.folder',{y:90,rotation:()=>gsap.utils.random(-8,8),opacity:0,stagger:.12,duration:1,ease:'back.out(1.3)',scrollTrigger:{trigger:'#folders',start:'top 82%'}});
  ScrollTrigger.create({trigger:'#cta2',start:'top 74%',once:true,onEnter(){landBird(false,$('.lander2'))}});
  privacyMotion();
  const zt=$('#zoomt'),zfit=()=>{zt.style.fontSize=innerWidth*.085+'px'};zfit();gsap.set(zt,{xPercent:-50,yPercent:-50});addEventListener('resize',zfit);
  ScrollTrigger.sort();ScrollTrigger.refresh();
  addEventListener('load',()=>ScrollTrigger.refresh());
}
