/* ─── TYPING ANIMATION ──────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Game Developer',
    'Web Developer',
    'Data Scientist',
    'ML Researcher',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; requestAnimationFrame(loop); }, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    requestAnimationFrame(loop);
  }

  let lastTime = 0;
  function loop(ts) {
    if (paused) return;
    const delay = deleting ? 50 : 90;
    if (ts - lastTime >= delay) {
      lastTime = ts;
      tick();
    } else {
      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
})();

/* ─── HAMBURGER MENU ────────────────────────────────────────── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // close on nav link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ─── ACTIVE NAV LINK (IntersectionObserver) ────────────────── */
(function initActiveNav() {
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
  const navLinks   = document.querySelectorAll('.nav-links a');

  function setActive(id) {
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  }

  const observers = new Map();

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(id); },
      { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim()} 0px -50% 0px` }
    );
    obs.observe(el);
    observers.set(id, obs);
  });
})();

/* ─── NAV BACKGROUND on SCROLL ──────────────────────────────── */
(function initNavScroll() {
  const nav = document.querySelector('.nav-wrapper');
  if (!nav) return;

  function update() {
    nav.style.background = window.scrollY > 20
      ? 'rgba(13,13,13,0.97)'
      : 'rgba(13,13,13,0.85)';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─── FADE-IN ON SCROLL (subtle reveal) ────────────────────── */
(function initReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.project-card, .timeline-item, .skill-group, .about-grid'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  targets.forEach(el => obs.observe(el));
})();
