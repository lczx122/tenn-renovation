/* Tenn Renovation — shared behaviour
   analytics · header state · mobile nav · reveal · counters · lightbox · SOP tabs · subnav · floating chat */

/* ---- Settings ---------------------------------------------------------
   GA_MEASUREMENT_ID: paste your Google Analytics 4 measurement ID (looks
   like "G-XXXXXXXXXX") to switch analytics on. Leave empty to load nothing.
   ---------------------------------------------------------------------- */
const GA_MEASUREMENT_ID = '';

(function(){
  const hasIO = 'IntersectionObserver' in window;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- analytics (only loads when an ID is set) ----
  window.tennTrack = function(name, params){
    if(typeof window.gtag === 'function'){ window.gtag('event', name, params || {}); }
  };
  if(GA_MEASUREMENT_ID){
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip:true });
    const s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);
  }
  const PEOPLE = { '60109718663':'Royce', '60163303178':'Lucas' };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="wa.me/"], a[href^="tel:"]');
    if(!a) return;
    const num = (a.getAttribute('href').match(/(\d{9,})/) || [])[1] || '';
    const sec = a.closest('[id]');
    window.tennTrack('whatsapp_click', {
      person: PEOPLE[num] || 'unknown',
      placement: a.dataset.track || (sec && sec.id) || 'page',
      page_path: location.pathname
    });
  });

  // ---- header: transparent over dark heroes, solid once scrolled ----
  const head = document.getElementById('siteHead');
  if(head){
    const overDark = head.classList.contains('over-dark');
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      head.classList.toggle('is-solid', !overDark || y > 24);
    };
    update();
    window.addEventListener('scroll', update, { passive:true });
  }

  // ---- mobile menu ----
  const btn  = document.getElementById('menuBtn');
  const nav  = document.getElementById('siteNav');
  if(head && btn && nav){
    const set = (open) => {
      head.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    const isOpen = () => head.classList.contains('menu-open');
    btn.addEventListener('click', () => set(!isOpen()));
    nav.addEventListener('click', e => { if(e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && isOpen()){ set(false); btn.focus(); } });
    document.addEventListener('click', e => { if(isOpen() && !head.contains(e.target)) set(false); });
    const mq = window.matchMedia('(min-width:961px)');
    (mq.addEventListener || mq.addListener).call(mq, 'change', e => { if(e.matches) set(false); });
  }

  // ---- floating WhatsApp button: tuck away while a contact block is on screen ----
  const fab = document.querySelector('.wa-float');
  const contact = document.getElementById('contact');
  if(fab && contact && hasIO){
    new IntersectionObserver(([en]) => fab.classList.toggle('is-hidden', en.isIntersecting), { threshold:.2 }).observe(contact);
  }

  // ---- animated counters (data-count="300" data-suffix="+") ----
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    if(reduceMotion){ el.innerHTML = prefix + target + (suffix ? '<sup>' + suffix + '</sup>' : ''); return; }
    const dur = 1400; const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = prefix + Math.round(target * eased) + (suffix ? '<sup>' + suffix + '</sup>' : '');
      if(p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if(counters.length){
    if(!hasIO){ counters.forEach(runCounter); }
    else {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(en => { if(en.isIntersecting){ runCounter(en.target); cio.unobserve(en.target); } });
      }, { threshold:.5 });
      counters.forEach(c => cio.observe(c));
    }
  }

  // ---- subnav: highlight the section in view ----
  const subnav = document.querySelector('.subnav');
  if(subnav && hasIO){
    const links = Array.from(subnav.querySelectorAll('a[href^="#"]'));
    const targets = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const sio = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(!en.isIntersecting) return;
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin:'-40% 0px -55% 0px' });
    targets.forEach(t => sio.observe(t));
  }

  // ---- SOP tabs ----
  const tabs = Array.from(document.querySelectorAll('.sop-tab'));
  const panels = Array.from(document.querySelectorAll('.sop-panel'));
  if(tabs.length){
    tabs.forEach(tab => tab.addEventListener('click', () => {
      const key = tab.dataset.sop;
      tabs.forEach(t => { const on = t === tab; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', String(on)); });
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
    }));
  }

  // ---- lightbox: any [data-lb] element, grouped by data-lb-group ----
  const lb = document.getElementById('lightbox');
  if(lb){
    const stage = document.getElementById('lbStage');
    const countEl = document.getElementById('lbCount');
    const allEls = Array.from(document.querySelectorAll('[data-lb]'));
    let items = [], idx = 0, lastFocus = null;
    const render = () => {
      const it = items[idx];
      stage.innerHTML = '';
      if(it.type === 'video'){
        const v = document.createElement('video');
        v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto'; v.src = it.src;
        stage.appendChild(v); v.play().catch(()=>{});
      } else {
        const img = document.createElement('img'); img.src = it.src; img.alt = it.alt || '';
        stage.appendChild(img);
      }
      countEl.textContent = (idx+1) + ' / ' + items.length;
    };
    const open = (n) => { idx = (n+items.length)%items.length; lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; render(); document.getElementById('lbClose').focus(); };
    const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; stage.innerHTML=''; if(lastFocus) lastFocus.focus(); };
    const go = (d) => { idx = (idx+d+items.length)%items.length; render(); };
    allEls.forEach(el => el.addEventListener('click', e => {
      e.preventDefault(); lastFocus = el;
      const group = el.getAttribute('data-lb-group') || '';
      const groupEls = allEls.filter(g => (g.getAttribute('data-lb-group')||'') === group);
      items = groupEls.map(g => ({ src: g.getAttribute('data-lb-src'), type: g.getAttribute('data-lb-type') || 'image', alt: (g.querySelector('img')||{}).alt }));
      open(groupEls.indexOf(el));
    }));
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', () => go(-1));
    document.getElementById('lbNext').addEventListener('click', () => go(1));
    lb.addEventListener('click', e => { if(e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if(!lb.classList.contains('open')) return;
      if(e.key === 'Escape') close();
      else if(e.key === 'ArrowLeft') go(-1);
      else if(e.key === 'ArrowRight') go(1);
    });
  }

  // ---- showcase reel: tap to unmute, pause while off-screen ----
  const reel = document.getElementById('reel');
  const muteBtn = document.getElementById('reelMute');
  if(reel && hasIO){
    new IntersectionObserver(([en]) => { if(en.isIntersecting){ reel.play().catch(()=>{}); } else { reel.pause(); } }, { threshold:.25 }).observe(reel);
  }
  if(reel && muteBtn){
    const icon = document.getElementById('muteIcon');
    const onSvg = '<path d="M11 5 6 9H2v6h4l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18.5 5.5a9 9 0 0 1 0 13"></path>';
    const offSvg = '<path d="M11 5 6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
    muteBtn.addEventListener('click', () => {
      reel.muted = !reel.muted;
      if(!reel.muted){ reel.play().catch(()=>{}); }
      muteBtn.setAttribute('aria-pressed', String(!reel.muted));
      muteBtn.setAttribute('aria-label', reel.muted ? 'Unmute video' : 'Mute video');
      icon.innerHTML = reel.muted ? offSvg : onSvg;
    });
  }

  // ---- reveal on scroll ----
  const els = Array.from(document.querySelectorAll('.reveal'));
  if(!hasIO){ els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold:.12, rootMargin:'0px 0px -6% 0px' });
  els.forEach((el,i) => { el.style.transitionDelay = (Math.min(i%4,3)*70) + 'ms'; io.observe(el); });
})();
