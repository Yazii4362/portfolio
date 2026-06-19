/* screens.js */
$(function () {
  /* main.js가 __portfolioScroller 설정 후 실행되도록 한 틱 대기 */
  setTimeout(initScreenAnimations, 0);
});

function initScreenAnimations() {

  if (typeof gsap === "undefined") return;

  const s = window.__portfolioScroller;

  /* 01 HERO — opacity 0 사용 안 함 (CDN 실패 시에도 항상 보이게) */
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

  /* 02 ABOUT */
  gsap.from(".about__card", {
    scrollTrigger: { trigger: "#about", scroller: s, start: "top 65%" },
    y: 36, opacity: 0, duration: 0.85, ease: "power2.out",
  });
  gsap.from(".tool-row", {
    scrollTrigger: { trigger: "#about", scroller: s, start: "top 55%" },
    x: -14, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
  });

  ScrollTrigger.create({
    trigger: "#about", scroller: s, start: "top 60%",
    onEnter: () => {
      document.querySelectorAll(".tool-row__bar").forEach(bar => {
        const w = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => { bar.style.width = w; }, 350);
      });
    },
  });

  /* 03 FIELD NOTES */
  gsap.from(".fn__sec-title", {
    scrollTrigger: { trigger: "#field-notes", scroller: s, start: "top 70%" },
    x: -28, opacity: 0, duration: 0.75, ease: "power2.out",
  });
  gsap.from(".fn-pin", {
    scrollTrigger: { trigger: ".fn__canvas", scroller: s, start: "top 75%" },
    y: 24, opacity: 0, duration: 0.6, stagger: 0.14, ease: "power2.out",
  });

  /* 04 WORK */
  gsap.from(".work-filter, .work__header", {
    scrollTrigger: { trigger: "#work", scroller: s, start: "top 75%" },
    y: 16, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
  });
  gsap.from(".work-card", {
    scrollTrigger: { trigger: ".work__grid", scroller: s, start: "top 80%" },
    y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power2.out",
  });

  /* 05 CONTACT */
  gsap.from(".contact__sec-title", {
    scrollTrigger: { trigger: "#contact", scroller: s, start: "top 70%" },
    y: 22, opacity: 0, duration: 0.75, ease: "power2.out",
  });
  gsap.from(".contact__ctas, .contact__loc, .contact__socials", {
    scrollTrigger: { trigger: "#contact", scroller: s, start: "top 60%" },
    y: 16, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power2.out",
  });

}
