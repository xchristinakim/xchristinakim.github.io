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
const projectItems = document.querySelectorAll('[data-category]');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    projectItems.forEach(item => {
      const show = item.dataset.category === tab;
      item.style.display = show ? '' : 'none';
      if (show) setTimeout(() => item.classList.add('in-view'), 50);
    });
  });
});

// init: show medical, hide design
projectItems.forEach(item => {
  if (item.dataset.category === 'design') item.style.display = 'none';
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      contactForm.hidden = true;
      formSuccess.hidden = false;
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  });
}

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
