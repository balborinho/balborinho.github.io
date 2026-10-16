(function () {
  'use strict';

  /* ---------- Navegação móvel ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-menu');

  if (toggle && menu) {
    var label = toggle.querySelector('.nav-toggle-label');
    var labelOpen = toggle.getAttribute('data-label-open');
    var labelClosed = toggle.getAttribute('data-label-closed');
    var mobile = window.matchMedia('(max-width: 760px)');

    var setOpen = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) { label.textContent = open ? labelOpen : labelClosed; }
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Ao passar para o desktop, repõe o estado fechado.
    var onChange = function (event) { if (!event.matches) { setOpen(false); } };
    if (mobile.addEventListener) { mobile.addEventListener('change', onChange); }
    else if (mobile.addListener) { mobile.addListener(onChange); }
  }

  /* ---------- Filtros por categoria ---------- */
  var bar = document.querySelector('[data-filter-bar]');
  var grid = document.querySelector('[data-project-grid]');

  if (bar && grid) {
    var buttons = Array.prototype.slice.call(bar.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.project-card'));
    var status = document.querySelector('[data-filter-status]');
    var wordOne = bar.getAttribute('data-count-one');
    var wordOther = bar.getAttribute('data-count-other');
    var known = buttons.map(function (b) { return b.getAttribute('data-filter'); });

    var apply = function (filter, userAction) {
      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-categories') || '').split(/\s+/);
        var match = filter === 'all' || cats.indexOf(filter) !== -1;
        card.hidden = !match;
        card.classList.remove('is-entering');
        if (match) {
          if (userAction) {
            // reinicia a animação de entrada, com pequeno desfasamento entre cartões
            card.style.setProperty('--i', Math.min(shown, 8));
            void card.offsetWidth;
            card.classList.add('is-entering');
          }
          shown += 1;
        }
      });
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter ? 'true' : 'false');
      });
      if (status && (userAction || filter !== 'all')) {
        status.textContent = shown + ' ' + (shown === 1 ? wordOne : wordOther);
      }
      if (userAction && window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        if (filter === 'all') { url.searchParams.delete('cat'); }
        else { url.searchParams.set('cat', filter); }
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    };

    bar.hidden = false; // sem JS os botões ficam escondidos (e todos os projetos visíveis)

    bar.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (button) { apply(button.getAttribute('data-filter'), true); }
    });

    var initial = new URLSearchParams(window.location.search).get('cat');
    apply(known.indexOf(initial) !== -1 ? initial : 'all', false);
  }
})();
