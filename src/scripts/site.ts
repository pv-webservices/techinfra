// Site-wide progressive enhancements. Every effect degrades to fully visible,
// static content when JavaScript is unavailable or the user prefers reduced motion.

const reduceMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;

function hideLoader(): void {
  const done = (): void => document.documentElement.classList.add('is-loaded');
  if (document.readyState === 'complete') { done(); return; }
  window.addEventListener('load', done, { once: true });
  window.setTimeout(done, 900); // never hold the page longer than this
}

function revealOnScroll(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion()) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  document.documentElement.classList.add('motion');
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    io.unobserve(entry.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => io.observe(el));
}

function countUp(): void {
  const nums = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!nums.length || reduceMotion() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target as HTMLElement;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const tick = (now: number): void => {
      const p = Math.min(1, (now - start) / 1100);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    io.unobserve(el);
  }), { threshold: 0.6 });
  nums.forEach((el) => io.observe(el));
}

function parallax(): void {
  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!layers.length || reduceMotion()) return;
  let ticking = false;
  const update = (): void => {
    const vh = window.innerHeight;
    layers.forEach((el) => {
      const box = el.parentElement!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      const progress = (box.top + box.height / 2 - vh / 2) / vh; // -1 … 1
      el.style.transform = `translate3d(0, ${(progress * -40).toFixed(1)}px, 0) scale(1.12)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// Horizontal sliders with prev/next controls (sectors, gallery).
function sliders(): void {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-track]');
    const prev = wrap.querySelector<HTMLButtonElement>('[data-prev]');
    const next = wrap.querySelector<HTMLButtonElement>('[data-next]');
    if (!track) return;
    const step = (): number => {
      const card = track.firstElementChild as HTMLElement | null;
      return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || '16') : track.clientWidth * 0.8;
    };
    const sync = (): void => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion() ? 'auto' : 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion() ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });
}

export function initSite(): void {
  hideLoader();
  revealOnScroll();
  countUp();
  parallax();
  sliders();
}
