/* ================================================================
   KANDIL INDUSTRIES v2 — main2.js
   Lenis smooth scroll + GSAP ScrollTrigger animations
   Nav: transparent → hide on scroll-down → solid on scroll-up
   ================================================================ */
(function () {
  'use strict';

  /* ── Lenis smooth scroll ────────────────────────────────────────── */
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      direction: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2.0,
    });

    /* Connect Lenis to GSAP's tick for ScrollTrigger */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      /* Fallback RAF loop if GSAP isn't ready */
      requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      });
    }
  }

  /* ── GSAP + ScrollTrigger animations ───────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {

      /* ── Stats band — stagger up ──────────────────────────────── */
      gsap.from('.stat2-item', {
        y: 36, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats2-band', start: 'top 82%' },
      });

      /* ── About section ────────────────────────────────────────── */
      /* Heading: clip-path reveal from bottom */
      gsap.fromTo('.about2-heading',
        { clipPath: 'inset(0 0 100% 0)', y: 20, opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)',   y: 0,  opacity: 1,
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about2', start: 'top 75%' } }
      );

      /* Body text + CTA: fade up */
      gsap.from('.about2-body', {
        y: 24, opacity: 0,
        duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.about2', start: 'top 68%' },
      });

      /* Blue rule: toggle CSS class (pseudo-elements can't be GSAP targets) */
      ScrollTrigger.create({
        trigger: '.about2-text',
        start: 'top 70%',
        onEnter: function () {
          var el = document.querySelector('.about2-text');
          if (el) el.classList.add('about2-text--revealed');
        }
      });

      /* About image — subtle scale-in */
      gsap.from('.about2-img-wrap img', {
        scale: 1.06, opacity: 0,
        duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.about2-visual', start: 'top 78%' },
      });

      gsap.from('.about2-badge', {
        x: -20, opacity: 0,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.about2-badge', start: 'top 90%' },
      });

      /* ── Products header ──────────────────────────────────────── */
      gsap.fromTo('.products2-hd h2',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.products2-hd', start: 'top 85%' } }
      );
      gsap.fromTo('.products2-hd p',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: '.products2-hd', start: 'top 85%' } }
      );

      /* ── Product Lines Explorer ───────────────────────────────── */
      /* Strips: each slides in from left with stagger */
      gsap.fromTo('.pl-strip',
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1,
          stagger: 0.09, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.pl-explorer', start: 'top 78%' } }
      );
      /* Stage: slides in from right */
      gsap.fromTo('.pl-stage',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1,
          duration: 0.75, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: '.pl-explorer', start: 'top 78%' },
          clearProps: 'transform,opacity' }
      );

      /* ── Projects heading — clip-path reveal ──────────────────── */
      gsap.fromTo('.projects2-hd h2',
        { clipPath: 'inset(0 0 100% 0)', y: 16, opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)',   y: 0,  opacity: 1,
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects2-hd', start: 'top 82%' } }
      );
      gsap.from('.projects2-hd p', {
        y: 14, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects2-hd', start: 'top 78%' },
      });

      /* Mosaic items — scale + stagger */
      gsap.from('.mosaic2-item', {
        scale: 0.94, opacity: 0, stagger: 0.12,
        duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects2-grid', start: 'top 78%' },
      });

      /* ── Partners ─────────────────────────────────────────────── */
      gsap.from('.partners2-intro', {
        y: 16, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.partners2', start: 'top 82%' },
      });

      /* ── Latest News ──────────────────────────────────────────── */
      /* Kicker + heading: clip-path reveal */
      gsap.fromTo('.news2-kicker',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.news2-hd', start: 'top 85%' } }
      );
      gsap.fromTo('.news2-hd h2',
        { clipPath: 'inset(0 0 100% 0)', y: 20, opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)',   y: 0,  opacity: 1,
          duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: '.news2-hd', start: 'top 85%' } }
      );
      gsap.fromTo('.news2-all',
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.25,
          scrollTrigger: { trigger: '.news2-hd', start: 'top 85%' } }
      );

      /* Featured card: scale-in from slight offset */
      gsap.fromTo('.news2-card--featured',
        { y: 48, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1,
          duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: '.news2-grid', start: 'top 80%' } }
      );

      /* Secondary cards: stagger up */
      gsap.fromTo('.news2-secondary .news2-card',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1,
          stagger: 0.12, duration: 0.75, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: '.news2-grid', start: 'top 80%' } }
      );

      /* ── Contact — info from left, form from right ────────────── */
      gsap.from('.contact2-info', {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact2-grid', start: 'top 78%' },
      });
      gsap.from('.contact2-form', {
        x: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact2-grid', start: 'top 78%' },
      });

    } /* end if !reducedMotion */

  } /* end if gsap */

  /* ── Navigation: transparent → hide/show with solid bg ─────────── */
  var nav2 = document.getElementById('nav2');
  var lastScrollY = window.scrollY || 0;
  var ticking = false;

  function updateNav() {
    var currentY = window.scrollY;
    if (currentY < 0) currentY = 0; /* Ignore rubber-banding at the top */

    var atTop = currentY < 80;

    if (atTop) {
      /* At the top: transparent and visible */
      nav2.classList.remove('nav2--solid', 'nav2--hidden');
      lastScrollY = currentY;
    } else {
      /* Past the top: always solid background */
      nav2.classList.add('nav2--solid');

      /* Hide or show based on scroll direction with a small threshold to prevent flickering */
      if (currentY > lastScrollY + 12) {
        nav2.classList.add('nav2--hidden');
        lastScrollY = currentY;
      } else if (currentY < lastScrollY - 12) {
        nav2.classList.remove('nav2--hidden');
        lastScrollY = currentY;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  /* Initial state check (in case page loaded scrolled) */
  updateNav();

  /* ── Mobile drawer ──────────────────────────────────────────────── */
  var toggle2 = document.querySelector('.nav2-toggle');
  var drawer2 = document.getElementById('nav2-drawer');

  function closeDrawer2() {
    if (!toggle2 || !drawer2) return;
    toggle2.setAttribute('aria-expanded', 'false');
    drawer2.setAttribute('aria-hidden', 'true');
    drawer2.classList.remove('open');
    nav2.classList.remove('nav2--drawer-open');
    document.documentElement.style.overflow = '';
  }

  if (toggle2 && drawer2) {
    toggle2.addEventListener('click', function () {
      var isOpen = this.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDrawer2();
      } else {
        this.setAttribute('aria-expanded', 'true');
        drawer2.setAttribute('aria-hidden', 'false');
        drawer2.classList.add('open');
        nav2.classList.add('nav2--drawer-open');
        document.documentElement.style.overflow = 'hidden';
      }
    });

    drawer2.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer2);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer2.classList.contains('open')) closeDrawer2();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && drawer2.classList.contains('open')) closeDrawer2();
    }, { passive: true });
  }

  /* ── Smooth anchor scroll via Lenis (for nav links) ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target && lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      }
    });
  });

  /* ── Product Lines Explorer ──────────────────────────────────────── */
  (function initProductExplorer() {
    var strips  = Array.from(document.querySelectorAll('.pl-strip'));
    var panels  = Array.from(document.querySelectorAll('.pl-panel'));
    var bgA     = document.querySelector('.pl-strips__bg--a');
    var bgB     = document.querySelector('.pl-strips__bg--b');
    if (!strips.length || !panels.length) return;

    var activeBgLayer = 'a'; /* which layer is currently visible */

    /* Cross-fade the full-column background to a new image */
    function crossfadeBg(url) {
      var incoming = activeBgLayer === 'a' ? bgB : bgA;
      var outgoing = activeBgLayer === 'a' ? bgA : bgB;
      if (!incoming || !outgoing) return;

      incoming.style.backgroundImage = "url('" + url + "')";
      incoming.style.opacity = '1';
      outgoing.style.opacity = '0';
      activeBgLayer = activeBgLayer === 'a' ? 'b' : 'a';
    }

    /* Stagger-animate cards in the newly-active panel */
    function animateCardsIn(panel) {
      var cards = Array.from(panel.querySelectorAll('.pl-card'));
      if (!cards.length) return;

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(cards,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1,
            duration: 0.52, ease: 'power3.out',
            stagger: 0.08, delay: 0.1,
            clearProps: 'transform,opacity' }
        );
      }
    }

    function activateLine(targetId) {
      /* Update strips */
      strips.forEach(function (s) {
        var active = s.getAttribute('aria-controls') === targetId;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-selected', String(active));

        /* Crossfade full-column bg to the active strip's image */
        if (active) {
          var bg = s.getAttribute('data-bg');
          if (bg) crossfadeBg(bg);
        }
      });

      /* Update panels */
      panels.forEach(function (p) {
        var active = p.id === targetId;
        var wasActive = p.classList.contains('is-active');
        p.classList.toggle('is-active', active);

        if (active) {
          var track = p.querySelector('[data-track]');
          if (track) track.scrollLeft = 0;
          if (!wasActive) animateCardsIn(p);
        }
      });
    }

    /* Strip click & keyboard nav */
    strips.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateLine(this.getAttribute('aria-controls'));
      });
      btn.addEventListener('keydown', function (e) {
        var idx = strips.indexOf(this);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          var next = strips[(idx + 1) % strips.length];
          next.focus(); activateLine(next.getAttribute('aria-controls'));
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var prev = strips[(idx - 1 + strips.length) % strips.length];
          prev.focus(); activateLine(prev.getAttribute('aria-controls'));
        }
      });
    });

    /* Slider prev / next */
    panels.forEach(function (panel) {
      var track   = panel.querySelector('[data-track]');
      var prevBtn = panel.querySelector('[data-prev]');
      var nextBtn = panel.querySelector('[data-next]');
      if (!track || !prevBtn || !nextBtn) return;

      function cardAmt() {
        var card = track.querySelector('.pl-card');
        if (!card) return 300;
        return card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0);
      }
      function updateNav() {
        prevBtn.disabled = track.scrollLeft <= 1;
        nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      }

      prevBtn.addEventListener('click', function () { track.scrollBy({ left: -cardAmt(), behavior: 'smooth' }); });
      nextBtn.addEventListener('click', function () { track.scrollBy({ left:  cardAmt(), behavior: 'smooth' }); });
      track.addEventListener('scroll', updateNav, { passive: true });
      requestAnimationFrame(updateNav);

      /* Mouse drag-to-scroll */
      var isDragging = false, startX = 0, startScroll = 0;
      track.addEventListener('mousedown', function (e) {
        isDragging = true; startX = e.pageX; startScroll = track.scrollLeft;
        track.style.scrollBehavior = 'auto';
      });
      window.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        track.scrollLeft = startScroll - (e.pageX - startX);
      });
      window.addEventListener('mouseup', function () {
        isDragging = false;
        track.style.scrollBehavior = '';
      });
      track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    });

    /* Animate initial active panel's cards on load */
    var initialPanel = document.querySelector('.pl-panel.is-active');
    if (initialPanel) animateCardsIn(initialPanel);
  })();

  /* ── Hover parallax on product cards ────────────────────────────── */
  document.querySelectorAll('.pl-card').forEach(function (card) {
    var img = card.querySelector('.pl-card__img img');
    if (!img) return;
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var xShift = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      var yShift = ((e.clientY - rect.top)  / rect.height - 0.5) * 5;
      img.style.transform = 'scale(1.05) translate(' + xShift + 'px, ' + yShift + 'px)';
    });
    card.addEventListener('mouseleave', function () { img.style.transform = ''; });
  });

  /* ── Contact form ───────────────────────────────────────────────── */
  var form2 = document.getElementById('contact2-form');
  var formNote2 = document.getElementById('form2-note');

  if (form2) {
    form2.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form2.querySelector('.btn2-submit');
      if (submitBtn.disabled) return;

      /* Validate */
      var required = form2.querySelectorAll('[required]');
      var hasError = false;
      required.forEach(function (field) {
        field.classList.remove('field-error');
        var empty = !field.value.trim();
        var badEmail = field.type === 'email' && field.value && !field.value.includes('@');
        if (empty || badEmail) {
          field.classList.add('field-error');
          hasError = true;
        }
      });
      if (hasError) {
        var first = form2.querySelector('.field-error');
        if (first) first.focus();
        return;
      }

      /* Loading */
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      /* Simulate async — replace with real fetch() */
      setTimeout(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form2.reset();
        formNote2.textContent = 'Enquiry sent — we\u2019ll be in touch within 2 business days.';
        formNote2.classList.add('success');
        setTimeout(function () {
          formNote2.textContent = 'We respond to all procurement enquiries within 2 business days.';
          formNote2.classList.remove('success');
        }, 6000);
      }, 1400);
    });

    form2.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.classList.remove('field-error');
      });
    });
  }

})();
