(() => {
  const header = document.querySelector('.site-topbar');
  if (!header) return;

  const updateHeight = () => {
    document.documentElement.style.setProperty(
      '--site-topbar-height',
      `${Math.ceil(header.getBoundingClientRect().height)}px`
    );
  };

  updateHeight();
  // Menu wrapping, font loading and zoom can all change the header height.
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateHeight).observe(header);
  } else {
    window.addEventListener('resize', updateHeight, { passive: true });
  }
})();
