// ===== Theme toggle (light/dark, remembered via localStorage) =====
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'dark') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', next);
});

// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after clicking a link
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll-reveal animation for sections =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Contact form (no backend yet — validates and shows a confirmation) =====
// To make this form actually send you emails, connect it to a free service
// such as Formspree (formspree.io) or Netlify Forms, or build your own
// small backend once you reach that part of your roadmap.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    status.textContent = 'Please fill in your name, a valid email, and a message.';
    status.style.color = '#e5635b';
    return;
  }

  // Placeholder success behavior — replace once a real backend/service is connected.
  status.textContent = `Thanks, ${name}! Your message is ready to send — connect a form service or backend to deliver it.`;
  status.style.color = '';
  form.reset();
});
