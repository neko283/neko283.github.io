(() => {
  const root = document.documentElement;
  const storageKey = 'digio-theme';
  let theme = 'dark';

  try {
    if (localStorage.getItem(storageKey) === 'light') theme = 'light';
  } catch {
    // The switch still works when browser storage is unavailable.
  }

  // Apply the saved palette before the first paint.
  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const updateToggle = () => {
      const isDark = root.dataset.theme === 'dark';
      toggle.setAttribute('aria-checked', String(isDark));
      toggle.title = isDark ? '切换到白天模式' : '切换到黑夜模式';
    };

    updateToggle();
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      updateToggle();
      try {
        localStorage.setItem(storageKey, root.dataset.theme);
      } catch {
        // Keep the selection for this page even if it cannot be saved.
      }
    });
  });
})();
