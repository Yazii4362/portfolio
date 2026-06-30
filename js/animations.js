(function () {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'power3.out';
  var EASE_IO = 'power2.inOut';

  function dur(value) {
    return reduced ? 0.01 : value;
  }

  function initHero() {
    var targets = [
      '.gnb-brand-pill',
      '.gnb-links .gnb-link',
      '.hero-headline',
      '.hero-tagline',
      '.hero-sub'
    ];

    gsap.set(targets.join(','), { autoAlpha: 0, y: reduced ? 0 : 24 });

    if (reduced) {
      gsap.set(targets.join(','), { autoAlpha: 1, y: 0 });
      return;
    }

    var tl = gsap.timeline({ defaults: { ease: EASE } });
    tl.to('.gnb-brand-pill', { autoAlpha: 1, y: 0, duration: dur(0.75) })
      .to('.gnb-links .gnb-link', { autoAlpha: 1, y: 0, duration: dur(0.45), stagger: 0.07 }, '-=0.45')
      .to('.hero-headline', { autoAlpha: 1, y: 0, duration: dur(0.85) }, '-=0.25')
      .to('.hero-tagline', { autoAlpha: 1, y: 0, duration: dur(0.6) }, '-=0.5')
      .to('.hero-sub', { autoAlpha: 1, y: 0, duration: dur(0.65) }, '-=0.48');
  }

  function initSections() {
    gsap.utils.toArray('section.section:not(.hero-section)').forEach(function (section) {
      var head = section.querySelector('.section-head');
      var lead = section.querySelector('.section-lead');
      var blocks;

      if (section.id === 'contact') {
        blocks = gsap.utils.toArray(section.querySelectorAll('.contact-top, .contact-footer, .copyright'));
        head = null;
        lead = null;
      } else {
        blocks = gsap.utils.toArray(section.querySelectorAll(
          '.chip-row, .about-grid, .career-block, .work-project-head, .work-desc, #workProjectChips, .work-display, .project-list, .work-link'
        ));
      }

      var items = [head, lead].concat(blocks).filter(Boolean);
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: reduced ? 0 : 28 });

      if (reduced) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          var tl = gsap.timeline({ defaults: { ease: EASE } });
          if (head) tl.to(head, { autoAlpha: 1, y: 0, duration: dur(0.7) });
          if (lead) tl.to(lead, { autoAlpha: 1, y: 0, duration: dur(0.55) }, head ? '-=0.45' : 0);
          if (blocks.length) {
            tl.to(blocks, { autoAlpha: 1, y: 0, duration: dur(0.7), stagger: 0.1 }, head || lead ? '-=0.35' : 0);
          }
        }
      });
    });
  }

  function initBatches() {
    var batches = [
      { sel: '.box-card', y: 32, stagger: 0.06 },
      { sel: '.stack-item', y: 12, stagger: 0.04 },
      { sel: '.project-row', y: 16, stagger: 0.07 }
    ];

    batches.forEach(function (cfg) {
      var els = gsap.utils.toArray(cfg.sel);
      if (!els.length) return;

      gsap.set(els, { autoAlpha: reduced ? 1 : 0, y: reduced ? 0 : cfg.y });

      if (reduced) return;

      ScrollTrigger.batch(cfg.sel, {
        start: 'top 88%',
        once: true,
        onEnter: function (batch) {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: dur(0.65),
            stagger: cfg.stagger,
            ease: EASE,
            overwrite: true
          });
        }
      });
    });
  }

  function initSkillDots() {
    gsap.utils.toArray('.skill-dots').forEach(function (dots) {
      var level = parseInt(dots.getAttribute('data-level'), 10) || 0;
      var dotEls = dots.querySelectorAll('.skill-dot');

      if (reduced) return;

      gsap.set(dotEls, { scale: 0.5, backgroundColor: '#ECECEC' });

      ScrollTrigger.create({
        trigger: dots,
        start: 'top 92%',
        once: true,
        onEnter: function () {
          gsap.to(dotEls, {
            scale: 1,
            duration: dur(0.4),
            stagger: 0.07,
            ease: 'back.out(2)',
            backgroundColor: function (i) {
              return i < level ? '#FF5722' : '#ECECEC';
            }
          });
        }
      });
    });
  }

  function initGnbPanel() {
    var btn = document.getElementById('gnbMenuBtn');
    var panel = document.getElementById('gnbPanel');
    if (!btn || !panel || reduced) return;

    btn.addEventListener('click', function () {
      setTimeout(function () {
        if (panel.hidden) return;

        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: -10, scale: 0.98, transformOrigin: 'top left' },
          { autoAlpha: 1, y: 0, scale: 1, duration: dur(0.35), ease: EASE }
        );

        gsap.fromTo(
          panel.querySelectorAll('.gnb-panel-link'),
          { autoAlpha: 0, x: -8 },
          { autoAlpha: 1, x: 0, duration: dur(0.35), stagger: 0.05, ease: EASE, delay: 0.05 }
        );
      }, 0);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = anchor.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target || reduced) return;

        e.preventDefault();
        gsap.to(window, {
          duration: dur(1.1),
          scrollTo: { y: target, offsetY: 72, autoKill: true },
          ease: EASE_IO
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initSections();
    initBatches();
    initSkillDots();
    initGnbPanel();

    if (!reduced) initSmoothScroll();

    ScrollTrigger.refresh();
  });

  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
