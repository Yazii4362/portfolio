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

  /* ── GNB / 상단바 ── */
  const gnbBtn   = document.getElementById("gnbBtn");
  const gnbPanel = document.getElementById("gnbPanel");
  const gnbEl    = document.getElementById("gnb");
  const gnbText  = document.getElementById("gnbText");
  const heroTopbar = document.getElementById("heroTopbar");
  const topbarSpacer = document.getElementById("heroTopbarSpacer");

  function updateTopbarPosition() {
    if (!heroTopbar || !topbarSpacer) return;
    const hero = document.getElementById("hero");
    if (!hero) return;

    const heroRect = hero.getBoundingClientRect();
    const shouldFix = heroRect.top <= 12 && heroRect.bottom > 80;

    if (shouldFix && !heroTopbar.classList.contains("is-fixed")) {
      topbarSpacer.style.height = `${heroTopbar.offsetHeight}px`;
      heroTopbar.classList.add("is-fixed");
    } else if (!shouldFix && heroTopbar.classList.contains("is-fixed")) {
      heroTopbar.classList.remove("is-fixed");
      topbarSpacer.style.height = "";
    }
  }

  updateTopbarPosition();
  window.addEventListener("resize", updateTopbarPosition);

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

  /* ── Hero 캐릭터 parallax ── */
  const heroScene = document.getElementById("heroScene");
  const heroCharacter = document.getElementById("heroCharacter");
  const CHAR_MOVE = 16;

  if (heroScene && heroCharacter) {
    heroScene.style.pointerEvents = "auto";
    heroScene.addEventListener("mousemove", (e) => {
      const rect = heroScene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      heroCharacter.style.transform = `translateX(${x * CHAR_MOVE}px)`;
    });
    heroScene.addEventListener("mouseleave", () => {
      heroCharacter.style.transform = "";
    });
  }

  const heroLocateBtn = document.getElementById("heroLocateBtn");
  if (heroLocateBtn) {
    heroLocateBtn.addEventListener("click", () => {
      scrollToTarget(document.getElementById("hero"));
      if (heroCharacter) {
        heroCharacter.style.animation = "none";
        void heroCharacter.offsetWidth;
        heroCharacter.style.animation = "";
      }
    });
  }

  /* ── ABOUT 바텀시트 ── */
  const aboutSheet = document.getElementById("aboutSheet");
  const aboutSheetBackdrop = document.getElementById("aboutSheetBackdrop");
  const aboutSheetClose = document.getElementById("aboutSheetClose");
  const aboutSheetMount = document.getElementById("aboutSheetMount");
  const heroDirectionsBtn = document.getElementById("heroDirectionsBtn");
  const aboutPlaceSource = document.querySelector("#about .about__place");

  if (aboutSheetMount && aboutPlaceSource && !aboutSheetMount.firstElementChild) {
    const clone = aboutPlaceSource.cloneNode(true);
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    aboutSheetMount.appendChild(clone);
  }

  let aboutSheetOpen = false;

  function openAboutSheet() {
    if (!aboutSheet || aboutSheetOpen) return;
    aboutSheetOpen = true;
    aboutSheet.classList.add("is-open");
    aboutSheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("about-sheet-open");
    if (heroDirectionsBtn) heroDirectionsBtn.setAttribute("aria-expanded", "true");
    if (aboutSheetClose) aboutSheetClose.focus();
    if (loco?.stop) loco.stop();
  }

  function closeAboutSheet() {
    if (!aboutSheet || !aboutSheetOpen) return;
    aboutSheetOpen = false;
    aboutSheet.classList.remove("is-open");
    aboutSheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("about-sheet-open");
    if (heroDirectionsBtn) {
      heroDirectionsBtn.setAttribute("aria-expanded", "false");
      heroDirectionsBtn.focus();
    }
    if (loco?.start) loco.start();
  }

  if (heroDirectionsBtn) {
    heroDirectionsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openAboutSheet();
    });
  }

  if (aboutSheetClose) aboutSheetClose.addEventListener("click", closeAboutSheet);
  if (aboutSheetBackdrop) aboutSheetBackdrop.addEventListener("click", closeAboutSheet);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && aboutSheetOpen) closeAboutSheet();
  });

  if (aboutSheetMount) {
    aboutSheetMount.addEventListener("click", (e) => {
      const routeLink = e.target.closest('a.about__action--primary[href="#field-notes"]');
      if (routeLink) {
        e.preventDefault();
        closeAboutSheet();
        scrollToTarget(document.getElementById("field-notes"));
      }
    });
  }

  /* 스크롤 시 상단바 + 활성 섹션 */
  const sections = ["hero", "about", "field-notes", "work", "contact"];

  const onScroll = (scrollY = window.scrollY) => {
    updateTopbarPosition();
    if (heroTopbar) heroTopbar.classList.toggle("is-scrolled", scrollY > 80);

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

  /* ── Contact 도착 ── */
  const contactFrame = document.getElementById("contactFrame");
  const contactToast = document.getElementById("contactToast");
  let contactArrived = false;

  function showContactToast(msg) {
    if (!contactToast) return;
    contactToast.textContent = msg;
    contactToast.classList.add("is-visible");
    clearTimeout(showContactToast._t);
    showContactToast._t = setTimeout(() => contactToast.classList.remove("is-visible"), 2400);
  }

  function playContactArrival() {
    if (!contactFrame || contactArrived) return;
    contactArrived = true;
    contactFrame.classList.add("is-arrived");
  }

  if (contactFrame && typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: "#contact",
      scroller: window.__portfolioScroller,
      start: "top 70%",
      onEnter: playContactArrival,
    });
  } else if (contactFrame) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        playContactArrival();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(contactFrame);
  }

  const contactLocate = document.getElementById("contactLocate");
  const contactRestart = document.getElementById("contactRestart");
  const scrollToHero = () => scrollToTarget(document.getElementById("hero"));
  if (contactLocate) contactLocate.addEventListener("click", scrollToHero);
  if (contactRestart) contactRestart.addEventListener("click", scrollToHero);

  const contactCopy = document.getElementById("contactCopy");
  const contactEmail = document.getElementById("contactEmail");
  if (contactCopy && contactEmail) {
    contactCopy.addEventListener("click", async () => {
      const email = contactEmail.textContent.trim();
      try {
        if (navigator.clipboard) await navigator.clipboard.writeText(email);
        contactCopy.textContent = "복사됨";
        contactCopy.classList.add("is-copied");
        showContactToast("이메일이 복사됐어요");
        setTimeout(() => {
          contactCopy.textContent = "복사";
          contactCopy.classList.remove("is-copied");
        }, 2000);
      } catch (_) {
        showContactToast("복사에 실패했어요");
      }
    });
  }

  const contactShare = document.getElementById("contactShare");
  if (contactShare) {
    contactShare.addEventListener("click", async () => {
      const shareData = {
        title: "YAZII Portfolio",
        text: "YAZII — UI/UX 디자이너 포트폴리오",
        url: window.location.href,
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (_) { /* cancelled */ }
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showContactToast("링크가 복사됐어요");
      }
    });
  }

  /* ── 체크리스트 (legacy — 요소 있을 때만) ── */
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

  /* ── About Place Details (섹션 + 바텀시트 공통) ── */
  document.addEventListener("click", (e) => {
    const nextBtn = e.target.closest(".about__photos-next");
    if (nextBtn) {
      const place = nextBtn.closest(".about__place");
      const track = place?.querySelector(".about__photos-track");
      if (!track) return;
      const photo = track.querySelector(".about__photo");
      const step = photo ? photo.offsetWidth + 10 : 160;
      track.scrollBy({ left: step, behavior: "smooth" });
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      }
      return;
    }

    const bookmark = e.target.closest(".about__bookmark");
    if (bookmark) {
      const place = bookmark.closest(".about__place");
      const saveBtn = place?.querySelector("button.about__action--outline");
      const saved = bookmark.classList.toggle("is-saved");
      bookmark.setAttribute("aria-pressed", String(saved));
      if (saveBtn) saveBtn.textContent = saved ? "저장됨" : "저장";
      return;
    }

    const saveBtn = e.target.closest("button.about__action--outline");
    if (saveBtn) {
      const label = saveBtn.textContent.trim();
      if (label !== "저장" && label !== "저장됨") return;
      const place = saveBtn.closest(".about__place");
      const bm = place?.querySelector(".about__bookmark");
      const saved = bm?.classList.toggle("is-saved");
      if (bm) bm.setAttribute("aria-pressed", String(!!saved));
      saveBtn.textContent = saved ? "저장됨" : "저장";
    }
  });

});
