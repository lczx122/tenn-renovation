/* Tenn Renovation — shared behaviour: analytics, mobile navigation, reveal-on-scroll, floating chat */

/* ---- Settings ---------------------------------------------------------
   GA_MEASUREMENT_ID: paste your Google Analytics 4 measurement ID (looks
   like "G-XXXXXXXXXX") to switch analytics on. Leave empty to load nothing.
   ---------------------------------------------------------------------- */
const GA_MEASUREMENT_ID = '';

(function(){
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
  // every WhatsApp / phone link becomes a "whatsapp_click" event with who + where
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

  // ---- mobile menu ----
  const head = document.getElementById('siteHead');
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
    const mq = window.matchMedia('(min-width:921px)');
    (mq.addEventListener || mq.addListener).call(mq, 'change', e => { if(e.matches) set(false); });
  }

  const hasIO = 'IntersectionObserver' in window;

  // ---- floating WhatsApp button: tuck away while the contact section is on screen ----
  const fab = document.querySelector('.wa-float');
  const contact = document.getElementById('contact');
  if(fab && contact && hasIO){
    new IntersectionObserver(([en]) => fab.classList.toggle('is-hidden', en.isIntersecting), { threshold:.2 }).observe(contact);
  }

  // ---- reveal on scroll ----
  const els = Array.from(document.querySelectorAll('.reveal'));
  if(!hasIO){ els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold:.14, rootMargin:'0px 0px -8% 0px' });
  els.forEach((el,i) => { el.style.transitionDelay = (Math.min(i%4,3)*70) + 'ms'; io.observe(el); });
})();
