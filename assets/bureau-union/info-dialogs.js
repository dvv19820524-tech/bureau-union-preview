(() => {
  'use strict';
  document.querySelectorAll('[data-info-dialog]').forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.infoDialog);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    trigger.addEventListener('click', () => dialog.showModal());
    dialog.querySelectorAll('[data-info-close]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    });
    dialog.addEventListener('close', () => trigger.focus());
  });
})();
