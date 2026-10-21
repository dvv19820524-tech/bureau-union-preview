(() => {
  'use strict';
  const key = 'union-cookie-info-v1';
  const lifetime = 183 * 24 * 60 * 60 * 1000;
  const banner = document.createElement('section');
  banner.className = 'cookie-notice';
  banner.setAttribute('aria-labelledby', 'cookie-notice-title');
  banner.innerHTML = `<div class="cookie-notice-copy"><h2 id="cookie-notice-title">Cookies en privacy</h2><p>Deze website gebruikt geen analytische cookies of marketingcookies. We bewaren alleen in je browser dat je deze melding hebt gesloten, zodat je deze niet bij ieder bezoek opnieuw ziet.</p><p>Voor deze noodzakelijke functionele opslag is geen toestemming nodig: <a href="https://wetten.overheid.nl/BWBR0009950/#Hoofdstuk11_Paragraaf11.1_Artikel11.7a">artikel 11.7a lid 3 onder b Telecommunicatiewet</a>. Voor trackingcookies is vooraf wel toestemming vereist (artikel 11.7a lid 1).</p><a href="privacybeleid.html#cookies">Meer over cookies en privacy</a></div><button type="button" class="cookie-notice-dismiss">Begrepen</button>`;
  const valid = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return (
        saved &&
        saved.version === 1 &&
        Number.isFinite(saved.savedAt) &&
        saved.savedAt <= Date.now() &&
        Date.now() - saved.savedAt < lifetime
      );
    } catch {
      return false;
    }
  };
  banner.hidden = Boolean(valid());
  document.body.append(banner);
  let opener;
  banner.querySelector('button').addEventListener('click', () => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ version: 1, savedAt: Date.now() })
      );
    } catch {
      /* Site remains usable when browser storage is unavailable. */
    }
    banner.hidden = true;
    if (opener) opener.focus();
  });
  document.querySelectorAll('[data-cookie-info]').forEach((button) => {
    button.addEventListener('click', () => {
      opener = button;
      banner.hidden = false;
      banner.querySelector('button').focus();
    });
  });
})();
