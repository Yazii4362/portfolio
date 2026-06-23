/* main.js */
document.addEventListener("DOMContentLoaded", () => {

  const scrollEl = document.querySelector("#scroll-container");
  let loco = null;

  /* ── Locomotive Scroll (실패 시 일반 스크롤 폴백) ── */
  if (scrollEl && typeof LocomotiveScroll !== "undefined") {
    try {
      loco = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        lerp: 0.075,
      });
    } catch (err) {
      console.warn("Locomotive Scroll 비활성화:", err);
      scrollEl.removeAttribute("data-scroll-container");
      document.documentElement.classList.remove("has-scroll-smooth");
      document.body.style.overflow = "";
    }
  } else if (scrollEl) {
    scrollEl.removeAttribute("data-scroll-container");
  }

  window.__portfolioScroller = loco ? "#scroll-container" : undefined;
  window.__portfolioLoco = loco;

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    if (loco && scrollEl) {
      loco.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          return arguments.length
            ? loco.scrollTo(value, { duration: 0, disableLerp: true })
            : loco.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollEl.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.addEventListener("refresh", () => loco.update());
      ScrollTrigger.refresh();
    }
  }

  function scrollToTarget(target, opts = {}) {
    if (!target) return;
    if (loco) {
      loco.scrollTo(target, { duration: 1.4, easing: [0.25, 0.0, 0.35, 1.0], ...opts });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ── GNB ── */
  const gnbBtn   = document.getElementById("gnbBtn");
  const gnbPanel = document.getElementById("gnbPanel");
  const gnbEl    = document.getElementById("gnb");
  const gnbText  = document.getElementById("gnbText");
  const gnbWrap  = document.getElementById("gnbWrap");

  function updateGnbPosition() {
    if (!gnbWrap || !gnbEl) return;
    const wrapTop = gnbWrap.getBoundingClientRect().top;
    const shouldFix = wrapTop <= 16;

    if (shouldFix && !gnbEl.classList.contains("is-fixed")) {
      gnbWrap.style.minHeight = `${gnbEl.offsetHeight}px`;
      gnbEl.classList.add("is-fixed");
    } else if (!shouldFix && gnbEl.classList.contains("is-fixed")) {
      gnbEl.classList.remove("is-fixed");
      gnbWrap.style.minHeight = "";
    }
  }

  updateGnbPosition();
  window.addEventListener("resize", updateGnbPosition);

  if (gnbBtn && gnbPanel && gnbEl) {
    gnbBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = gnbPanel.classList.toggle("is-open");
      gnbBtn.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (e) => {
      if (!gnbEl.contains(e.target)) {
        gnbPanel.classList.remove("is-open");
        gnbBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.querySelectorAll(".gnb__nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(item.getAttribute("href"));
        scrollToTarget(target);
        const label = item.dataset.label;
        if (label && gnbText) gnbText.textContent = label;
        gnbPanel.classList.remove("is-open");
        gnbBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Hero 스티커 parallax hover ── */
  const heroStage = document.getElementById("heroStage");
  const heroBadge = document.getElementById("heroBadge");
  const BADGE_TILT = -2;
  const BADGE_MOVE = 24;

  if (heroStage && heroBadge) {
    heroStage.addEventListener("mousemove", (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      heroBadge.style.transform = `rotate(${BADGE_TILT}deg) translateX(${x * BADGE_MOVE}px)`;
    });
    heroStage.addEventListener("mouseleave", () => {
      heroBadge.style.transform = `rotate(${BADGE_TILT}deg) translateX(0)`;
    });
  }

  /* 스크롤 시 GNB 고정 + 활성 섹션 */
  const sections = ["hero", "about", "field-notes", "work", "contact"];

  const onScroll = (scrollY = window.scrollY) => {
    updateGnbPosition();
    if (gnbEl) gnbEl.classList.toggle("is-scrolled", scrollY > 80);

    sections.forEach(id => {
      const el  = document.getElementById(id);
      const nav = document.querySelector(`.gnb__nav-item[href="#${id}"]`);
      if (!el || !nav) return;
      const rect = el.getBoundingClientRect();
      nav.classList.toggle("is-active", rect.top <= 100 && rect.bottom > 100);
    });
  };

  if (loco) {
    loco.on("scroll", ({ scroll }) => onScroll(scroll.y));
  } else {
    window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });
    onScroll();
  }

  /* ── 스크롤 진행 핀 트레일 ── */
  const PIN_COLORS = ["c1", "c2", "c3", "c4", "c5"];
  const PIN_SVG = `<svg viewBox="0 0 24 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24C24 5.37 18.63 0 12 0z"/>
    <circle cx="12" cy="12" r="4.5" fill="rgba(255,255,255,0.92)"/>
  </svg>`;

  const PIN_COUNT = 18;
  const trailEl = document.getElementById("footprintTrail");
  const endPin  = document.getElementById("footprintEnd");
  const pinEls = [];

  if (trailEl) {
    for (let i = 0; i < PIN_COUNT; i++) {
      const el = document.createElement("div");
      const side = i % 2 === 0 ? "left" : "right";
      const color = PIN_COLORS[i % PIN_COLORS.length];
      el.className = `footprint footprint--${side} footprint--${color}`;
      el.style.top = `${7 + (i / (PIN_COUNT - 1)) * 82}%`;
      el.innerHTML = PIN_SVG;
      trailEl.appendChild(el);
      pinEls.push(el);
    }
  }

  const updateScrollPins = (pct) => {
    if (!pinEls.length) return;
    const active = Math.min(Math.floor(pct * PIN_COUNT), PIN_COUNT - 1);
    const stopped = pct >= 0.98;

    pinEls.forEach((pin, i) => {
      pin.classList.toggle("is-visible", i <= active);
      pin.classList.toggle("is-current", i === active);
      pin.classList.toggle("is-stopped", stopped && i === active);
    });

    if (endPin) endPin.classList.toggle("is-visible", stopped);
  };

  if (loco) {
    loco.on("scroll", ({ scroll, limit }) => {
      if (!limit.y) return;
      updateScrollPins(Math.min(scroll.y / limit.y, 1));
    });
  } else {
    window.addEventListener("scroll", () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      updateScrollPins(max > 0 ? window.scrollY / max : 0);
    }, { passive: true });
  }

  /* ── Contact 핀 애니메이션 ── */
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: "#contact",
      scroller: window.__portfolioScroller,
      start: "top 65%",
      onEnter: () => {
        const pin = document.querySelector(".contact__pin");
        if (pin) pin.classList.add("animate");
      },
    });
  }

  /* ── 체크리스트 인터랙션 ── */
  document.querySelectorAll(".checklist__item").forEach(item => {
    const btn = item.querySelector(".checklist__box");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCheck(item);
    });

    item.addEventListener("click", () => toggleCheck(item));
  });

  function toggleCheck(item) {
    const isDone = item.classList.contains("checklist__item--done");
    const btn = item.querySelector(".checklist__box");

    if (isDone) {
      item.classList.remove("checklist__item--done");
      btn.setAttribute("aria-pressed", "false");
    } else {
      item.classList.add("checklist__item--done");
      btn.setAttribute("aria-pressed", "true");

      if (typeof gsap !== "undefined") {
        gsap.from(item.querySelector(".checklist__check"), {
          rotation: -20, scale: 0.4, duration: 0.35,
          ease: "back.out(2)",
        });
      }
    }
  }

  /* ── Work 필터 ── */
  document.querySelectorAll(".work-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll(".work-filter").forEach(b => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      document.querySelectorAll(".work-card").forEach(card => {
        const cat = card.dataset.category;
        const show = filter === "all" || cat === filter;
        card.classList.toggle("is-hidden", !show);
      });
      if (loco) loco.update();
      else if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  });

  document.querySelectorAll("[data-scroll-to]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const t = document.querySelector(el.getAttribute("href"));
      scrollToTarget(t);
    });
  });

});
