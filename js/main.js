document.addEventListener('DOMContentLoaded', function () {

  var REGISTRY = window.PROJECT_REGISTRY || {};
  var LIST_ORDER = window.PROJECT_LIST_ORDER || Object.keys(REGISTRY);
  var ASSETS = window.PROJECT_ASSETS || {};

  var activeProjectKey = 'pairchive';

  var hasGsap = typeof gsap !== 'undefined';
  var EASE_IO = 'power2.inOut';

  var screenMain = document.getElementById('screenMain');
  var screenPhone1 = document.getElementById('screenPhone1');
  var screenPhone2 = document.getElementById('screenPhone2');
  var workProjectName = document.getElementById('workProjectName');
  var workProjectDesc = document.getElementById('workProjectDesc');
  var workProjectChips = document.getElementById('workProjectChips');
  var workDetailLink = document.getElementById('workDetailLink');
  var projectList = document.getElementById('projectList');
  var screens = [screenMain, screenPhone1, screenPhone2].filter(Boolean);

  function resolveProjectKey(key) {
    if (key === 'impactsquare') return 'strawberryfields';
    return key;
  }

  function getProject(key) {
    key = resolveProjectKey(key);
    return REGISTRY[key] ? Object.assign({ slug: key }, REGISTRY[key]) : null;
  }

  function thumbHtml(key) {
    var meta = REGISTRY[key];
    var asset = ASSETS[key];
    if (!meta || !asset) return '';

    var src = asset.thumb;
    var alt = meta.name;
    var type = meta.thumbType || 'photo';

    if (type === 'pairchive') {
      return (
        '<span class="thumb-preview thumb-preview--pairchive">' +
          '<img src="' + src + '" alt="' + alt + '">' +
        '</span>'
      );
    }

    if (type === 'brand' || type === 'babpool') {
      return (
        '<span class="thumb-preview thumb-preview--brand">' +
          '<img src="' + src + '" alt="' + alt + '">' +
        '</span>'
      );
    }

    return (
      '<span class="thumb-preview thumb-preview--photo">' +
        '<img src="' + src + '" alt="' + alt + '">' +
      '</span>'
    );
  }

  function bindProjectList() {
    if (!projectList) return;

    projectList.querySelectorAll('.project-row').forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        switchProject(row.getAttribute('data-project'));
      });
    });
  }

  function buildProjectList() {
    if (!projectList) return;
    if (projectList.querySelector('.project-row')) {
      bindProjectList();
      return;
    }

    projectList.innerHTML = LIST_ORDER.map(function (key) {
      var project = REGISTRY[key];
      if (!project) return '';

      var isActive = key === activeProjectKey;
      var tag = project.rowTag || {};

      return (
        '<a href="project-detail.html?project=' + key + '" class="project-row' + (isActive ? ' is-active' : '') + '" data-project="' + key + '">' +
          '<span class="project-row-lead">' +
            '<span class="project-row-thumb">' + thumbHtml(key) + '</span>' +
            '<span class="project-row-name">' + project.listName + '</span>' +
          '</span>' +
          '<span class="project-row-cat">' +
            '<span class="cat-chip cat-chip--sm cat-chip--' + tag.color + '" data-i18n="' + tag.key + '"></span>' +
          '</span>' +
          '<span class="project-row-year">' + project.year + '</span>' +
        '</a>'
      );
    }).join('');

    if (window.PortfolioI18n) {
      projectList.querySelectorAll('[data-i18n]').forEach(function (el) {
        window.PortfolioI18n.applyElement(el);
      });
    }

    bindProjectList();
  }

  function renderProjectChips(project) {
    if (!workProjectChips || !project.tags) return;

    workProjectChips.innerHTML = project.tags.map(function (tag) {
      return (
        '<span class="cat-chip cat-chip--sm cat-chip--' + tag.color + '">' +
          '<span data-i18n="' + tag.key + '"></span>' +
        '</span>'
      );
    }).join('');

    if (window.PortfolioI18n) {
      workProjectChips.querySelectorAll('[data-i18n]').forEach(function (el) {
        window.PortfolioI18n.applyElement(el);
      });
    }
  }

  function applyMockup(key) {
    document.querySelectorAll('[data-mockup-project]').forEach(function (screen) {
      screen.classList.toggle('active', screen.getAttribute('data-mockup-project') === key);
    });
  }

  function updateProjectCopy(project) {
    if (workProjectDesc && project.descKey) {
      workProjectDesc.setAttribute('data-i18n', project.descKey);
      if (window.PortfolioI18n) {
        window.PortfolioI18n.applyElement(workProjectDesc);
      }
    }
  }

  function switchProject(key) {
    key = resolveProjectKey(key);
    var project = getProject(key);
    if (!project) return;
    activeProjectKey = key;

    document.querySelectorAll('.project-row').forEach(function (row) {
      var rowKey = resolveProjectKey(row.getAttribute('data-project'));
      row.classList.toggle('is-active', rowKey === key);
    });

    if (workDetailLink) workDetailLink.href = 'project-detail.html?project=' + project.slug;

    if (hasGsap) {
      var tl = gsap.timeline({ defaults: { ease: EASE_IO } });

      if (workProjectName) {
        tl.to(workProjectName, { autoAlpha: 0, y: 8, duration: 0.2 }, 0);
      }
      if (workProjectDesc) {
        tl.to(workProjectDesc, { autoAlpha: 0, y: 6, duration: 0.2 }, 0);
      }
      if (workProjectChips) {
        tl.to(workProjectChips, { autoAlpha: 0, y: 6, duration: 0.2 }, 0);
      }

      tl.to(screens, { autoAlpha: 0, duration: 0.28 }, 0);

      tl.add(function () {
        if (workProjectName) workProjectName.textContent = project.name;
        updateProjectCopy(project);
        renderProjectChips(project);
        applyMockup(key);
      });

      if (workProjectName) {
        tl.to(workProjectName, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.out' });
      }
      if (workProjectDesc) {
        tl.to(workProjectDesc, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.out' }, '-=0.28');
      }
      if (workProjectChips) {
        tl.to(workProjectChips, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.out' }, '-=0.32');
      }
      tl.to(screens, { autoAlpha: 1, duration: 0.38, ease: 'power3.out' }, '-=0.32');

      return;
    }

    if (workProjectName) workProjectName.textContent = project.name;
    updateProjectCopy(project);
    renderProjectChips(project);

    screens.forEach(function (el) {
      el.style.opacity = '0';
    });

    setTimeout(function () {
      applyMockup(key);
      screens.forEach(function (el) {
        el.style.opacity = '1';
      });
    }, 200);
  }

  buildProjectList();

  var initialProject = getProject(activeProjectKey);
  if (initialProject) {
    if (workProjectName) workProjectName.textContent = initialProject.name;
    updateProjectCopy(initialProject);
    renderProjectChips(initialProject);
    applyMockup(activeProjectKey);
    if (workDetailLink) workDetailLink.href = 'project-detail.html?project=' + initialProject.slug;
  }

  if (!hasGsap) {
    screens.forEach(function (el) {
      el.style.transition = 'opacity 0.25s var(--ease-soft)';
    });
  }

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.gnb-link, .gnb-panel-link');
  var gnbMenuBtn = document.getElementById('gnbMenuBtn');
  var gnbPanel = document.getElementById('gnbPanel');

  function closeGnbPanel() {
    if (!gnbPanel || !gnbMenuBtn) return;
    gnbPanel.hidden = true;
    gnbMenuBtn.setAttribute('aria-expanded', 'false');
    gnbMenuBtn.setAttribute('aria-label', '메뉴 열기');
  }

  if (gnbMenuBtn && gnbPanel) {
    gnbMenuBtn.addEventListener('click', function () {
      var isOpen = gnbPanel.hidden;
      gnbPanel.hidden = !isOpen;
      gnbMenuBtn.setAttribute('aria-expanded', String(isOpen));
      gnbMenuBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    gnbPanel.querySelectorAll('.gnb-panel-link').forEach(function (link) {
      link.addEventListener('click', closeGnbPanel);
    });
  }

  function onScroll() {
    var scrollY = window.scrollY;
    var current = 'hero';

    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - window.innerHeight * 0.35) {
        current = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-section') === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.addEventListener('langchange', function () {
    var project = getProject(activeProjectKey);
    if (project) updateProjectCopy(project);
    renderProjectChips(getProject(activeProjectKey));
    if (projectList) {
      projectList.querySelectorAll('[data-i18n]').forEach(function (el) {
        window.PortfolioI18n.applyElement(el);
      });
    }
  });

  if (!hasGsap) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: 'smooth'
        });
        closeGnbPanel();
      });
    });
  } else {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function () {
        closeGnbPanel();
      });
    });
  }

});
