// Behaviour for <Select/>: mouse, touch and full keyboard support (listbox pattern).

export function initSelects(): void {
  document.querySelectorAll<HTMLElement>('[data-select]').forEach(setup);
}

function setup(root: HTMLElement): void {
  const btn = root.querySelector<HTMLButtonElement>('.select__btn')!;
  const list = root.querySelector<HTMLUListElement>('.select__list')!;
  const input = root.querySelector<HTMLInputElement>('input[type=hidden]')!;
  const label = root.querySelector<HTMLElement>('[data-value-label]')!;
  const opts = Array.from(list.querySelectorAll<HTMLLIElement>('[role=option]'));
  let active = -1;

  const isOpen = (): boolean => !list.hidden;
  const highlight = (i: number): void => {
    active = Math.max(0, Math.min(opts.length - 1, i));
    opts.forEach((o, n) => o.classList.toggle('is-active', n === active));
    list.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  };
  const open = (): void => {
    if (isOpen()) return;
    list.hidden = false;
    root.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    // Open upwards when there is not enough room below.
    const room = window.innerHeight - btn.getBoundingClientRect().bottom;
    root.classList.toggle('opens-up', room < Math.min(list.scrollHeight, 300) + 16 && btn.getBoundingClientRect().top > room);
    const selected = opts.findIndex((o) => o.getAttribute('aria-selected') === 'true');
    highlight(selected >= 0 ? selected : 0);
    list.focus({ preventScroll: true });
  };
  const close = (focusButton = true): void => {
    if (!isOpen()) return;
    list.hidden = true;
    root.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    if (focusButton) btn.focus({ preventScroll: true });
  };
  const choose = (i: number): void => {
    opts.forEach((o, n) => o.setAttribute('aria-selected', String(n === i)));
    input.value = opts[i].dataset.value ?? '';
    label.textContent = input.value;
    label.classList.remove('is-placeholder');
    root.classList.remove('has-error');
    btn.removeAttribute('aria-invalid');
    root.querySelector<HTMLElement>('.field__error')!.hidden = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  };

  btn.addEventListener('click', () => (isOpen() ? close() : open()));
  btn.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); }
  });
  opts.forEach((o, i) => {
    o.addEventListener('click', () => choose(i));
    o.addEventListener('mousemove', () => { if (active !== i) highlight(i); });
  });
  list.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); highlight(active + 1); break;
      case 'ArrowUp': e.preventDefault(); highlight(active - 1); break;
      case 'Home': e.preventDefault(); highlight(0); break;
      case 'End': e.preventDefault(); highlight(opts.length - 1); break;
      case 'Enter': case ' ': e.preventDefault(); choose(active); break;
      case 'Escape': e.preventDefault(); close(); break;
      case 'Tab': close(false); break;
      default:
        if (e.key.length === 1) { // type-ahead
          const k = e.key.toLowerCase();
          const start = (active + 1) % opts.length;
          const order = [...opts.slice(start), ...opts.slice(0, start)];
          const hit = order.find((o) => (o.dataset.value ?? '').toLowerCase().startsWith(k));
          if (hit) highlight(opts.indexOf(hit));
        }
    }
  });
  document.addEventListener('pointerdown', (e) => { if (!root.contains(e.target as Node)) close(false); });
}
