(() => {
  'use strict';

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  const form = document.querySelector('form[data-bu-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const organisation = String(data.get('organisation') || '').trim();
    const message = String(data.get('message') || '').trim();
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: organisation ? `Organisatie: ${organisation}\n\n${message}` : message,
      website: String(data.get('website') || ''),
      source: window.location.pathname
    };

    if (submit) submit.disabled = true;
    if (status) status.textContent = 'Je bericht wordt verzonden…';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST', credentials: 'same-origin',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.message || 'Verzenden is niet gelukt.');
      form.reset();
      if (status) status.textContent = result.message || 'Bedankt. Je bericht is verzonden.';
    } catch (error) {
      if (status) status.textContent = `${error.message || 'Verzenden lukt nu niet.'} Je kunt ook mailen naar dvliet@bureau-union.nl.`;
    } finally {
      if (submit) submit.disabled = false;
    }
  });
})();
