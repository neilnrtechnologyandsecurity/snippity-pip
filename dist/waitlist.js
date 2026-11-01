(() => {
  const form = document.querySelector('#academy-interest-form');
  if (!form) return;
  const submit = document.querySelector('#interest-submit');
  const feedback = document.querySelector('#interest-feedback');
  const select = document.querySelector('#interest-course');
  let widgetId = null;
  let token = '';
  const message = (text, state = '') => {
    feedback.textContent = text;
    feedback.dataset.state = state;
  };
  document.querySelectorAll('[data-interest-course]').forEach(link => {
    link.addEventListener('click', () => { select.value = link.dataset.interestCourse; });
  });
  async function boot() {
    try {
      const response = await fetch('/api/waitlist/config', { cache: 'no-store' });
      if (!response.ok) throw new Error('Not ready');
      const config = await response.json();
      if (!config.ready || !config.siteKey) throw new Error('Not ready');
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => {
        widgetId = window.turnstile.render('#interest-turnstile', {
          sitekey: config.siteKey,
          theme: 'light',
          callback: value => { token = value; submit.disabled = false; },
          'expired-callback': () => { token = ''; submit.disabled = true; },
          'error-callback': () => { token = ''; submit.disabled = true; }
        });
        message('Complete the security check, then register your interest.');
      };
      script.onerror = () => message('The registration form is temporarily unavailable. Please try again later.', 'error');
      document.head.appendChild(script);
    } catch {
      message('The waiting list is being prepared. Please check back soon.');
    }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || !token) return;
    submit.disabled = true;
    message('Sending your registration…');
    try {
      const payload = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        course: form.elements.course.value,
        consent: form.elements.consent.checked,
        website: form.elements.website.value,
        token
      };
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Please try again.');
      form.reset();
      message('Thanks! You’re on the list. We’ll be in touch with updates about your chosen course.', 'success');
    } catch (error) {
      message(error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
      token = '';
      if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId);
    }
  });
  boot();
})();