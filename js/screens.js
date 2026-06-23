/* screens.js */
$(function () {
  setTimeout(initScreenAnimations, 0);
});

function initScreenAnimations() {

  if (typeof gsap === "undefined") return;

  const s = window.__portfolioScroller;

  /* 01 HERO */
  gsap.from(".hero__badge", { scale: 0.94, y: 10, duration: 0.85, ease: "back.out(1.4)" });
  gsap.from(".hero__title", { y: 28, duration: 0.9, ease: "power3.out", delay: 0.1 });
  gsap.from(".hero__subtitle, .gnb-wrap", {
    y: 16, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.22,
  });
  gsap.from(".hero__location, .hero__bottom", {
    y: 14, duration: 0.55, stagger: 0.08, ease: "power2.out", delay: 0.38,
  });
  gsap.from(".hero__origin-pin, .hero__place-chip", {
    scale: 0.92, y: 8, duration: 0.55, stagger: 0.1, ease: "back.out(1.5)", delay: 0.5,
  });

  if (typeof ScrollTrigger === "undefined") return;

  const stDefaults = { scroller: s, once: true };

  /* 02 ABOUT */
  gsap.from(".about__sheet", {
    scrollTrigger: { trigger: "#about", ...stDefaults, start: "top 70%" },
    y: 32, duration: 0.85, ease: "power2.out", immediateRender: false,
  });
  gsap.from(".about__polaroid, .about__id-card, .about__trait, .about__soft-chip", {
    scrollTrigger: { trigger: "#about", ...stDefaults, start: "top 62%" },
    y: 18, scale: 0.94, duration: 0.55, stagger: 0.06, ease: "back.out(1.4)", immediateRender: false,
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
  gsap.from(".contact__sec-title", {
    scrollTrigger: { trigger: "#contact", ...stDefaults, start: "top 75%" },
    y: 18, duration: 0.75, ease: "power2.out", immediateRender: false,
  });
  gsap.from(".contact__ctas, .contact__loc, .contact__socials", {
    scrollTrigger: { trigger: "#contact", ...stDefaults, start: "top 65%" },
    y: 14, duration: 0.55, stagger: 0.1, ease: "power2.out", immediateRender: false,
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
