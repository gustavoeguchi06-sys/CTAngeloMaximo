(function () {
  'use strict';

  var doc = document;
  var $ = function (selector, root) { return (root || doc).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(selector)); };
  var hasObserver = 'IntersectionObserver' in window;

  /* Cabeçalho: borda aparece ao rolar. */
  var nav = $('[data-nav]');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Menu mobile. */
  var toggle = $('[data-menu-toggle]');
  var menu = $('[data-menu]');
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('is-open', open);
      doc.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('is-open')); });
    menu.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1240px)').addEventListener('change', function (event) { if (event.matches) setOpen(false); });
  }

  /* WhatsApp flutuante: escondido enquanto o hero (que já tem o botão) está visível. */
  var floatButton = $('.wa-float');
  var hero = $('#inicio');
  if (floatButton && hero && hasObserver) {
    floatButton.classList.add('is-hidden');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { floatButton.classList.toggle('is-hidden', entry.intersectionRatio > 0.35); });
    }, { threshold: [0, 0.35, 0.7, 1] }).observe(hero);
  }

  /* Link do menu da seção visível. */
  var links = $$('[data-nav-link]');
  if (hasObserver && links.length) {
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.removeAttribute('aria-current'); });
        var active = byId[entry.target.id];
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var section = doc.getElementById(id); if (section) spy.observe(section); });
  }

  /* Revelar ao rolar, com pequena escada entre irmãos. */
  var reveals = $$('[data-reveal]');
  $$('[data-reveal-group]').forEach(function (group) {
    $$('[data-reveal]', group).forEach(function (item, index) { item.style.transitionDelay = Math.min(index, 5) * 70 + 'ms'; });
  });
  if (hasObserver) {
    var reveal = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (item) { reveal.observe(item); });
  } else {
    reveals.forEach(function (item) { item.classList.add('is-visible'); });
  }

  /* Horários: destaca o dia de hoje e, no celular, abre a aba dele. */
  var schedule = $('[data-schedule]');
  if (schedule) {
    var tabs = $$('[role="tab"]', schedule);
    var days = $$('.day', schedule);
    var ids = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    var todayId = ids[(new Date().getDay() + 6) % 7]; /* domingo não tem aula: fica undefined */

    var select = function (id) {
      tabs.forEach(function (tab) {
        var on = tab.dataset.day === id;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
      });
      days.forEach(function (day) { day.classList.toggle('is-active', day.dataset.day === id); });
    };

    days.concat(tabs).forEach(function (el) { if (el.dataset.day === todayId) el.classList.add('is-today'); });
    select(todayId || 'seg');

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(tab.dataset.day); });
      tab.addEventListener('keydown', function (event) {
        var step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        var next = tabs[(index + step + tabs.length) % tabs.length];
        select(next.dataset.day);
        next.focus();
      });
    });
  }

  /* Galeria: visualização ampliada. */
  var lightbox = $('[data-lightbox]');
  if (lightbox && typeof lightbox.showModal === 'function') {
    var items = $$('[data-gallery-item]');
    var image = $('img', lightbox);
    var count = $('[data-lightbox-count]', lightbox);
    var current = 0;

    var show = function (index) {
      current = (index + items.length) % items.length;
      image.src = items[current].dataset.full;
      image.alt = items[current].dataset.alt;
      count.textContent = (current + 1) + ' / ' + items.length;
    };

    items.forEach(function (item, index) {
      item.addEventListener('click', function () { show(index); lightbox.showModal(); });
    });
    $('[data-lightbox-close]', lightbox).addEventListener('click', function () { lightbox.close(); });
    $('[data-lightbox-prev]', lightbox).addEventListener('click', function () { show(current - 1); });
    $('[data-lightbox-next]', lightbox).addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (event) { if (event.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') show(current - 1);
      if (event.key === 'ArrowRight') show(current + 1);
    });
  }
})();
