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

  /* WhatsApp flutuante: escondido enquanto o topo (que já tem o botão) está visível. */
  var floatButton = $('.wa-float');
  var hero = $('#inicio');
  if (floatButton && hero && hasObserver) {
    floatButton.classList.add('is-hidden');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { floatButton.classList.toggle('is-hidden', entry.intersectionRatio > 0.35); });
    }, { threshold: [0, 0.35, 0.7, 1] }).observe(hero);
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Topo: a palavra gigante desce e some devagar ao rolar (parallax). */
  var giant = $('[data-cine-giant]');
  if (giant && hero && !reduceMotion) {
    var giantTicking = false;
    var giantUpdate = function () {
      giantTicking = false;
      var p = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
      giant.style.transform = 'translate(-50%, ' + (p * 14).toFixed(2) + 'vh) scale(' + (1 + p * 0.08).toFixed(3) + ')';
      giant.style.opacity = (1 - p * 0.9).toFixed(3);
    };
    giant.addEventListener('animationend', function () {
      giant.style.animation = 'none';
      giantUpdate();
      window.addEventListener('scroll', function () { if (!giantTicking) { giantTicking = true; requestAnimationFrame(giantUpdate); } }, { passive: true });
    });
  }

  /* Botões magnéticos: seguem o mouse e voltam com elástico ao sair. */
  if (!reduceMotion) {
    $$('[data-magnetic], .btn').forEach(function (el) {
      var base = 'background 0.4s, border-color 0.4s, color 0.4s, box-shadow 0.4s';
      var strength = el.matches('.cine__pill, .cine__round') ? 0.4 : 0.25;
      el.addEventListener('pointermove', function (event) {
        if (event.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        var x = event.clientX - r.left - r.width / 2, y = event.clientY - r.top - r.height / 2;
        el.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), ' + base;
        el.style.transform = 'perspective(600px) translate(' + (x * strength).toFixed(1) + 'px, ' + (y * strength).toFixed(1) + 'px) rotateX(' + (-y * 0.15).toFixed(2) + 'deg) rotateY(' + (x * 0.1).toFixed(2) + 'deg) scale(1.04)';
      });
      el.addEventListener('pointerleave', function () {
        el.style.transition = 'transform 1s cubic-bezier(0.3, 1.9, 0.5, 1), ' + base;
        el.style.transform = '';
      });
    });
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

  /* Planos: período (mensal, trimestral, semestral, anual), preço animado e confete. */
  var periodGroup = $('[data-period-group]');
  if (periodGroup) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var P = {};
    JSON.parse(periodGroup.dataset.periods).forEach(function (p) { P[p.id] = { n: p.months, per: p.per, word: p.word, bill: p.bill }; });
    var opts = $$('[data-period]', periodGroup);
    var cards = $$('[data-period-plan]');
    var brl = function (v) { return v.toLocaleString('pt-BR', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
    var tween = function (el, to) {
      var from = el._v == null ? to : el._v;
      el._v = to;
      cancelAnimationFrame(el._raf);
      if (reduce || from === to) { el.textContent = brl(to); return; }
      var start = performance.now();
      var step = function (now) {
        var t = Math.min((now - start) / 500, 1), e = 1 - Math.pow(1 - t, 3);
        el.textContent = t < 1 ? brl(Math.round(from + (to - from) * e)) : brl(to);
        if (t < 1) el._raf = requestAnimationFrame(step);
      };
      el._raf = requestAnimationFrame(step);
    };
    var confetti = function (origin, count) {
      if (reduce) return;
      var canvas = doc.createElement('canvas');
      canvas.className = 'confetti';
      doc.body.appendChild(canvas);
      var dpr = window.devicePixelRatio || 1, ctx = canvas.getContext('2d');
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.scale(dpr, dpr);
      var colors = ['#000000', '#262626', '#4d4d4d', '#a3a3a3'];
      var parts = [];
      for (var i = 0; i < count; i++) {
        var ang = (-90 + (Math.random() - 0.5) * 60) * Math.PI / 180, sp = 8 + Math.random() * 8;
        parts.push({ x: origin.x, y: origin.y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: 2.5 + Math.random() * 2.5, c: colors[i % colors.length] });
      }
      var tick = 0;
      var frame = function () {
        tick++;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.globalAlpha = Math.max(0, 1 - tick / 110);
        parts.forEach(function (p) {
          p.vx *= 0.94; p.vy = p.vy * 0.94 + 0.6; p.x += p.vx; p.y += p.vy;
          ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        });
        if (tick < 110) requestAnimationFrame(frame); else canvas.remove();
      };
      requestAnimationFrame(frame);
    };
    var currentPeriod = Object.keys(P)[0];
    var apply = function (key, btn) {
      var prevN = P[currentPeriod].n;
      currentPeriod = key;
      opts.forEach(function (o) { var on = o.dataset.period === key; o.setAttribute('aria-checked', String(on)); o.tabIndex = on ? 0 : -1; });
      var p = P[key];
      cards.forEach(function (card) {
        var adult = JSON.parse(card.dataset.adult)[key], kid = JSON.parse(card.dataset.kid)[key];
        tween($('[data-price]', card), adult);
        $('[data-per]', card).textContent = p.per;
        $('[data-bill]', card).textContent = p.n === 1 ? p.bill : 'equivale a R$ ' + brl(Math.round(adult / p.n * 100) / 100) + '/mês, ' + p.bill;
        $('[data-kid]', card).textContent = brl(kid);
        $('[data-kid-per]', card).textContent = p.per;
        var cta = $('[data-cta]', card);
        cta.href = cta.href.split('?')[0] + '?text=' + encodeURIComponent('Olá! Quero saber mais sobre o plano ' + card.dataset.name + ' ' + p.word + '.');
      });
      if (btn && p.n > prevN) {
        var r = btn.getBoundingClientRect();
        confetti({ x: r.left + r.width / 2, y: r.top + r.height / 2 }, 30 + p.n * 3);
      }
    };
    cards.forEach(function (card) { $('[data-price]', card)._v = JSON.parse(card.dataset.adult)[currentPeriod]; });
    opts.forEach(function (o, index) {
      o.addEventListener('click', function () { if (o.dataset.period !== currentPeriod) apply(o.dataset.period, o); });
      o.addEventListener('keydown', function (event) {
        var stepK = (event.key === 'ArrowRight' || event.key === 'ArrowDown') ? 1 : (event.key === 'ArrowLeft' || event.key === 'ArrowUp') ? -1 : 0;
        if (!stepK) return;
        event.preventDefault();
        var next = opts[(index + stepK + opts.length) % opts.length];
        apply(next.dataset.period, next);
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
