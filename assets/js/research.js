(() => {
  const choices = [...document.querySelectorAll('[data-research-choice]')];
  const panels = choices.map(choice => document.getElementById(choice.dataset.researchChoice));
  if (!choices.length || panels.some(panel => !panel)) return;

  const select = (id, moveFocus = false) => {
    const selected = panels.find(panel => panel.id === id) || panels[0];
    panels.forEach(panel => {
      panel.hidden = panel !== selected;
      if (panel.hidden) panel.querySelectorAll('video').forEach(video => video.pause());
    });
    choices.forEach(choice => {
      const active = choice.dataset.researchChoice === selected.id;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-expanded', String(active));
      if (active) choice.setAttribute('aria-current', 'true');
      else choice.removeAttribute('aria-current');
    });
    if (moveFocus) {
      selected.tabIndex = -1;
      selected.focus({ preventScroll: true });
      selected.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }
  };

  choices.forEach(choice => choice.addEventListener('click', event => {
    event.preventDefault();
    const id = choice.dataset.researchChoice;
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    select(id, true);
  }));
  document.querySelectorAll('.research-back-to-grid').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', '#research-directions');
    const active = choices.find(choice => choice.classList.contains('is-active'));
    active.focus({ preventScroll: true });
    document.getElementById('research-directions').scrollIntoView({ block: 'start' });
  }));
  window.addEventListener('hashchange', () => {
    if (panels.some(panel => `#${panel.id}` === location.hash)) select(location.hash.slice(1), true);
  });
  select(location.hash.slice(1));

  const previews = [...document.querySelectorAll('.research-choice-video')];
  const toggle = document.querySelector('.research-demo-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  const visiblePreviews = new Set();
  const updatePreviews = () => {
    toggle.textContent = paused ? 'Play previews' : 'Pause previews';
    previews.forEach(video => {
      if (paused || document.hidden || !visiblePreviews.has(video)) {
        video.pause();
        return;
      }
      const source = video.querySelector('source');
      if (!source.hasAttribute('src')) {
        source.src = source.dataset.src;
        video.load();
      }
      video.play().catch(() => {});
    });
  };
  if (previews.length && toggle && 'IntersectionObserver' in window) {
    toggle.hidden = false;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visiblePreviews.add(entry.target) : visiblePreviews.delete(entry.target));
      updatePreviews();
    }, { threshold: 0.1 });
    previews.forEach(video => observer.observe(video));
    toggle.addEventListener('click', () => { paused = !paused; updatePreviews(); });
    document.addEventListener('visibilitychange', updatePreviews);
    reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePreviews(); });
    updatePreviews();
  }
})();
