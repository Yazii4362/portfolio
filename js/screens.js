/* screens.js */
$(function () {
  setTimeout(initScreenAnimations, 0);
});

function initScreenAnimations() {

  if (typeof gsap === "undefined") return;

  const s = window.__portfolioScroller;

  /* 01 HERO */
  gsap.from(".hero__topbar", { y: -16, opacity: 0, duration: 0.7, ease: "power2.out" });
  gsap.from(".hero__bubble", { scale: 0.9, y: 10, duration: 0.65, ease: "back.out(1.5)", delay: 0.15 });
  gsap.from(".hero__character", { y: 24, duration: 0.85, ease: "power3.out", delay: 0.2 });
  gsap.from(".hero__dock", { y: 20, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.35 });
  gsap.from(".hero__map-marker, .hero__map-badge", {
    scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.4)", delay: 0.4,
  });

  if (typeof ScrollTrigger === "undefined") return;

  const stDefaults = { scroller: s, once: true };

  /* 02 ABOUT */
  gsap.from(".about__place", {
    scrollTrigger: { trigger: "#about", ...stDefaults, start: "top 72%" },
    y: 28, duration: 0.8, ease: "power2.out", immediateRender: false,
  });
  gsap.from(".about__photo, .about__action, .about__detail-item", {
    scrollTrigger: { trigger: "#about", ...stDefaults, start: "top 65%" },
    y: 14, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", immediateRender: false,
  });

  /* 03 FIELD NOTES */
  gsap.from(".fn__sec-title", {
    scrollTrigger: { trigger: "#field-notes", ...stDefaults, start: "top 75%" },
    x: -20, duration: 0.75, ease: "power2.out", immediateRender: false,
  });
  gsap.from(".fn-pin", {
    scrollTrigger: { trigger: ".fn__canvas", ...stDefaults, start: "top 80%" },
    y: 20, duration: 0.6, stagger: 0.12, ease: "power2.out", immediateRender: false,
  });

  /* 04 WORK */
  gsap.from(".work-filter, .work__header", {
    scrollTrigger: { trigger: "#work", ...stDefaults, start: "top 78%" },
    y: 14, duration: 0.6, stagger: 0.08, ease: "power2.out", immediateRender: false,
  });
  gsap.from(".work-card", {
    scrollTrigger: { trigger: ".work__grid", ...stDefaults, start: "top 82%" },
    y: 24, duration: 0.65, stagger: 0.1, ease: "power2.out", immediateRender: false,
  });

  /* 05 CONTACT */
  gsap.from(".contact__frame", {
    scrollTrigger: { trigger: "#contact", ...stDefaults, start: "top 78%" },
    y: 32, opacity: 0, duration: 0.85, ease: "power2.out", immediateRender: false,
  });
  gsap.from(".contact__panel > *", {
    scrollTrigger: { trigger: "#contact", ...stDefaults, start: "top 68%" },
    y: 16, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power2.out", immediateRender: false,
  });

  /* Locomotive 레이아웃 반영 후 ScrollTrigger 재계산 */
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (window.__portfolioLoco) window.__portfolioLoco.update();
  });
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
    if (window.__portfolioLoco) window.__portfolioLoco.update();
  }, { once: true });
}
