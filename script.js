// ---------- scroll reveal ----------
const els = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
els.forEach(el => io.observe(el));

// ---------- mobile nav toggle (progressive enhancement) ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('nav.links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- hero photo 3D tilt (mouse-follow parallax) ----------
const heroPhoto3d = document.getElementById('heroPhoto3d');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroPhoto3d && !prefersReducedMotion && window.matchMedia('(min-width: 761px)').matches) {
  const cards = heroPhoto3d.querySelectorAll('.hero-photo-card');
  const baseZ = { back: -70, mid: -35, front: 0 };
  const baseOffset = { back: [-22, 22], mid: [-11, 11], front: [0, 0] };

  const cardKey = (card) =>
    card.classList.contains('back') ? 'back' : card.classList.contains('mid') ? 'mid' : 'front';

  heroPhoto3d.addEventListener('mousemove', (e) => {
    const rect = heroPhoto3d.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = -9 + px * 14;
    const rotX = 3 - py * 14;
    cards.forEach(card => {
      const key = cardKey(card);
      const [ox, oy] = baseOffset[key];
      card.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translate3d(${ox}px, ${oy}px, ${baseZ[key]}px)`;
    });
  });

  heroPhoto3d.addEventListener('mouseleave', () => {
    cards.forEach(card => {
      const key = cardKey(card);
      const [ox, oy] = baseOffset[key];
      card.style.transform = `rotateY(-9deg) rotateX(3deg) translate3d(${ox}px, ${oy}px, ${baseZ[key]}px)`;
    });
  });
}
