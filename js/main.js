(function () {
  'use strict';

  // ── Sticky header shadow on scroll ──────────────────────────
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Vollbild-Nav-Overlay: öffnen/schließen ──────────────────────
  var toggle = document.getElementById('nav-toggle');
  var closeBtn = document.getElementById('nav-close');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var openNav = function () {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', openNav);
    if (closeBtn) { closeBtn.addEventListener('click', closeNav); }
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeNav(); }
    });
  }

  // ── Jahr im Footer ───────────────────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // ── Aktuelle Seite in der Navigation markieren ──────────────
  var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.site-nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  // ── Scroll-Reveal ─────────────────────────────────────────────
  // Die .reveal-Klasse wird per CSS nur unsichtbar, wenn <html> die
  // Klasse "js" trägt (siehe Inline-Script im <head>). Ein Sicherheits-
  // Timeout sorgt dafür, dass nach spätestens 2s ohnehin alles sichtbar
  // ist, falls der Observer aus irgendeinem Grund nicht auslöst.
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('reveal--visible'); });
    }
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('reveal--visible'); });
    }, 2000);
  }

})();
