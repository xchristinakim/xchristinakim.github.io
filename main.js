// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== TAB FILTER =====
const tabBtns = document.querySelectorAll('.tab-btn');
// support both card grid and list row layouts
const projectItems = document.querySelectorAll('.project-card, .project-row');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectItems.forEach(item => {
      if (item.dataset.category === tab) {
        item.style.display = '';
        setTimeout(() => item.classList.add('in-view'), 50);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// init: show medical, hide design
projectItems.forEach(item => {
  if (item.dataset.category === 'design') {
    item.style.display = 'none';
  }
});

// ===== NAV ACTIVE STATE =====
const navLinks = document.querySelectorAll('.nav-link');
const current = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
