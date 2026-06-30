(function () {
  var STORAGE_KEY = 'portfolio-lang';

  var STRINGS = {
    ko: {
      'nav.about': 'About',
      'nav.career': 'Career',
      'nav.stack': 'Stack',
      'nav.work': 'Work',
      'nav.contact': 'Contact',
      'hero.headline': 'Think fast,<br><em>Build Faster</em>',
      'hero.tagline': '빠르게 생각하고 빠르게 검증하는 디자이너 임예지입니다.',
      'hero.sub': 'AI를 워크플로우에 녹여 Figma 설계부터 코드 구현까지, 아이디어를 빠르게 결과물로 만듭니다.',
      'chip.uiux': 'UI/UX',
      'chip.ai': 'AI',
      'chip.product': '프로덕트',
      'chip.figma': 'Figma',
      'chip.frontend': 'Frontend',
      'chip.research': 'UX 리서치',
      'chip.designSystem': '디자인 시스템',
      'chip.prototype': '프로토타입',
      'chip.brand': '브랜드',
      'chip.urban': '도시·공공',
      'tag.productDesign': 'product design',
      'tag.founderDesign': 'founder / design',
      'tag.uxIntern': 'ux intern',
      'tag.graphicDesign': 'graphic design',
      'about.lead': '생각은 빠르게, 실행은 더 빠르게.',
      'about.body': '맥락을 빠르게 읽고, AI로 아이디어를 즉시 시각화합니다. Figma로 설계하고 HTML/CSS/JS로 직접 구현해 기획·디자인·퍼블리싱 사이클을 짧게 돌립니다. 완벽을 기다리기보다 빠르게 만들고, 빠르게 개선하는 디자이너입니다.',
      'about.education': '서울시립대학교 도시행정학과 졸업',
      'career.educationAwards': 'education & awards',
      'career.cardDesc': '빠른 사고와 AI 활용으로 기획·디자인·구현 사이클을 단축하며, UI/UX 디자이너로 성장 중입니다.',
      'career.letsTalk': "let's talk",
      'stack.lead': '디자인과 구현, 그 사이의 도구들.',
      'stack.codeDesc': 'Figma Auto Layout, Design Token, Component System을 HTML/CSS/JS로 직접 구현합니다.',
      'stack.viewProjects': 'view projects',
      'work.viewProject': 'View Project',
      'work.muda': '감정을 기록하고 돌아보는 다이어리 앱. 프로덕트 디자이너로 참여하여 텀블벅 크라우드펀딩 266% 달성에 기여했습니다.',
      'work.pairchive': '둘이서 한 달간 링크를 모아 하나의 책을 완성하는 페어링 웹 서비스. 기획부터 UI/UX 디자인, 프론트엔드 구현까지 전 과정을 담당했습니다.',
      'work.impactsquare': '영주 딸기밭 프로젝트의 현장 리서치 및 UX 인턴 경험. 사용자 인터뷰와 서비스 기획에 참여했습니다.',
      'work.brand': '다양한 브랜드 아이덴티티 및 그래픽 디자인 프로젝트. 로고, 타이포그래피, 비주얼 시스템을 설계했습니다.',
      'contact.headline': '함께 만들어요<span class="dot">.</span>',
      'contact.resume': 'Resume',
      'contact.copyright': '© 2026 YAZII — Im Ye-ji. All rights reserved.'
    },
    en: {
      'nav.about': 'About',
      'nav.career': 'Career',
      'nav.stack': 'Stack',
      'nav.work': 'Work',
      'nav.contact': 'Contact',
      'hero.headline': 'Think fast,<br><em>Build Faster</em>',
      'hero.tagline': 'A designer who thinks fast and validates faster — Im Ye-ji.',
      'hero.sub': 'AI across the workflow—from Figma to code—turning ideas into shipped interfaces, fast.',
      'chip.uiux': 'UI/UX',
      'chip.ai': 'AI',
      'chip.product': 'Product',
      'chip.figma': 'Figma',
      'chip.frontend': 'Frontend',
      'chip.research': 'UX Research',
      'chip.designSystem': 'Design System',
      'chip.prototype': 'Prototype',
      'chip.brand': 'Brand',
      'chip.urban': 'Urban / Public',
      'tag.productDesign': 'product design',
      'tag.founderDesign': 'founder / design',
      'tag.uxIntern': 'ux intern',
      'tag.graphicDesign': 'graphic design',
      'about.lead': 'Fast thinking. Faster building.',
      'about.body': 'I read context quickly and use AI to visualize ideas on the spot. I design in Figma and implement in HTML/CSS/JS, keeping the plan–design–build loop tight. I ship fast, iterate faster—not waiting for perfect.',
      'about.education': 'B.A. Urban Administration, Univ. of Seoul',
      'career.educationAwards': 'education & awards',
      'career.cardDesc': 'Shortening the plan–design–build cycle with fast thinking and AI—growing as a UI/UX designer.',
      'career.letsTalk': "let's talk",
      'stack.lead': 'Tools between design and implementation.',
      'stack.codeDesc': 'I implement Figma Auto Layout, design tokens, and component systems in HTML/CSS/JS.',
      'stack.viewProjects': 'view projects',
      'work.viewProject': 'View Project',
      'work.muda': 'An emotion diary app. As product designer, contributed to 266% Kickstarter funding.',
      'work.pairchive': 'A pairing web service that collects links into a monthly book. Led planning, UI/UX, and front-end.',
      'work.impactsquare': 'Field research and UX internship for the Yeongju strawberry farm project.',
      'work.brand': 'Brand identity and graphic design—logo, typography, and visual systems.',
      'contact.headline': "Let's build together<span class=\"dot\">.</span>",
      'contact.resume': 'Resume',
      'contact.copyright': '© 2026 YAZII — Im Ye-ji. All rights reserved.'
    }
  };

  var currentLang = localStorage.getItem(STORAGE_KEY) || 'ko';

  function t(key) {
    return (STRINGS[currentLang] && STRINGS[currentLang][key]) || STRINGS.ko[key] || '';
  }

  function applyElement(el) {
    var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
    if (!key) return;
    var value = t(key);
    if (!value) return;
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  }

  function applyAll() {
    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(applyElement);
    document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (!STRINGS[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.querySelectorAll('.gnb-lang-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    applyAll();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.gnb-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
    setLang(currentLang);
  });

  window.PortfolioI18n = {
    t: t,
    getLang: function () { return currentLang; },
    setLang: setLang,
    applyElement: applyElement
  };
})();
