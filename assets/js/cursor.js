(() => {
  const source = document.currentScript.dataset.cursorSrc;
  if (!source) return;

  const root = document.documentElement;
  const enabled = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)');
  const cursor = document.createElement('img');
  cursor.className = 'balloon-cursor';
  cursor.alt = '';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.draggable = false;
  cursor.hidden = true;
  let loaded = false;

  const hide = () => {
    cursor.hidden = true;
    root.classList.remove('balloon-cursor-active');
  };

  const move = (event) => {
    // Keep normal touch, pen, text editing and embedded-frame behavior.
    if (!loaded || !enabled.matches || event.pointerType !== 'mouse' ||
        event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe')) {
      hide();
      return;
    }

    // Align the arrow tip in the original 42 × 50 GIF with the click position.
    cursor.style.transform = `translate3d(${event.clientX - 2}px, ${event.clientY - 28}px, 0)`;
    cursor.hidden = false;
    root.classList.add('balloon-cursor-active');
  };

  cursor.addEventListener('load', () => { loaded = true; });
  cursor.addEventListener('error', () => { loaded = false; hide(); });
  document.body.append(cursor);
  cursor.src = source;

  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerover', move, { passive: true });
  document.addEventListener('pointerdown', move, { passive: true });
  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) hide();
  }, { passive: true });
  document.addEventListener('dragstart', hide);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hide();
  });
  window.addEventListener('blur', hide);
  window.addEventListener('pagehide', hide);
  enabled.addEventListener('change', hide);
})();
