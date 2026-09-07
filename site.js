/* Tenn Renovation — shared behaviour: mobile navigation + reveal-on-scroll */
(function(){
  // mobile menu
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

  // reveal on scroll
  const els = Array.from(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)){ els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold:.14, rootMargin:'0px 0px -8% 0px' });
  els.forEach((el,i) => { el.style.transitionDelay = (Math.min(i%4,3)*70) + 'ms'; io.observe(el); });
})();
