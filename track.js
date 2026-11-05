/* Cookieless usage counts through Umami (EU-friendly, no cookies, no personal data).
   Named events only: what was clicked and where, never the visitor. Safe if Umami is blocked. */
(function(){
  const send=(name,data)=>{try{window.umami&&window.umami.track(name,data)}catch(_){}};
  const where=el=>{const s=el.closest('section[id],header,footer,dialog');return s?(s.id||s.tagName.toLowerCase()):'page'};
  const classify=a=>{
    const h=a.getAttribute('href')||'';
    if(/\.dmg(\?|$)/.test(h))return['download-click',{file:h.split('/').pop()}];
    if(h.startsWith('mailto:'))return['email-click'];
    if(h.includes('chromewebstore.google.com'))return['chrome-store-click'];
    if(h.includes('/releases'))return['release-click'];
    if(h.includes('/issues'))return['bug-report-click'];
    if(h.includes('/blob/main/LICENSE'))return['licence-click'];
    if(h.includes('github.com/magpiary'))return['github-click'];
    if(h.startsWith('#'))return h.length>1?['nav-click',{target:h.slice(1)}]:null;
    if(/^\/?(privacy|terms)/.test(h))return['legal-click',{page:h.replace(/^\//,'')}];
    if(/^https?:/.test(h)&&new URL(h).host!==location.host)return['outbound-click',{host:new URL(h).host}];
    return null;
  };
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(a){const c=classify(a);if(c)send(c[0],Object.assign({from:where(a)},c[1]));return}
    const g=e.target.closest('.fgh');
    if(g){send('faq-group-click',{group:(g.querySelector('span')||g).textContent.trim().slice(0,60)});return}
    const s=e.target.closest('summary');
    if(s&&!s.parentNode.open)send('faq-question-open',{question:s.textContent.trim().slice(0,80)});
  },true);
  /* how far down the page, once per depth */
  const seen=new Set();
  addEventListener('scroll',()=>{
    const h=document.documentElement.scrollHeight-innerHeight;if(h<=0)return;
    const p=Math.round(scrollY/h*100);
    [25,50,75,100].forEach(m=>{if(p>=m-(m===100?2:0)&&!seen.has(m)){seen.add(m);send('scroll-depth',{percent:m})}});
  },{passive:true});
})();
