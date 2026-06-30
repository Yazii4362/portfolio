(function () {
  var ASSETS = window.PROJECT_ASSETS || {};
  var ORDER = window.PROJECT_ORDER || [];

  var PROJECTS = {
    brand: {
      title: 'Brand Identity',
      subtitle: '브랜드 아이덴티티 &<br>그래픽 디자인',
      role: 'Graphic Designer',
      period: '2022–2025',
      tools: 'Illustrator, Photoshop',
      heroBg: 'linear-gradient(160deg, #FFF5F0, #FF7043)',
      points: [
        '로고, 타이포그래피, 컬러 시스템을 포함한 BI 가이드를 제작했습니다.',
        '다양한 매체에 적용 가능한 비주얼 시스템을 설계했습니다.',
        '브랜드 톤앤매너에 맞는 그래픽 에셋을 제작했습니다.'
      ]
    },
    babpool: {
      title: 'Babpool',
      subtitle: '밥 약속으로 연결하는<br>관심사·목표 기반 네트워킹',
      role: 'Product Designer',
      period: '2024.01 – 2024.03',
      tools: 'Figma, Product Planning, SWYP',
      link: 'https://bab-pool.com',
      linkLabel: 'Live Site',
      heroBg: 'linear-gradient(160deg, #FFF8F0, #FFCC80)',
      points: [
        '관심사와 목표를 공유하는 사람들과 밥 약속을 잡을 수 있는 네트워킹 플랫폼을 기획·디자인했습니다.',
        '스위프(SWYP) 3기 프로젝트로 MVP 개발·출시까지 참여했습니다.',
        'SWYP 3기 **1위 수상** — 실제 서비스 운영 및 유저 트래픽 경험.'
      ]
    },
    muda: {
      title: 'MUDA',
      subtitle: 'AI 음악 추천 일기앱<br>일기에 배경음악을 입히다',
      role: 'Product Owner (PO)',
      period: '2024',
      tools: 'Figma, Product Planning, Tumblbug',
      link: 'https://tumblbug.com/musicdiary',
      linkLabel: 'Tumblbug',
      heroBg: 'linear-gradient(160deg, #FDF9F6, #EADAD2)',
      points: [
        'PO로서 서비스 기획, UX/UI 방향, 크라우드펀딩 전략을 총괄했습니다.',
        '일기 작성과 AI 음악 추천을 연결하는 핵심 경험을 설계했습니다.',
        '텀블벅 펀딩 266% 달성 — 62명 후원, 130만 원+ 모금 (Team GLOW).'
      ]
    },
    strawberryfields: {
      title: 'Strawberry Fields',
      subtitle: '영주 STAXX 1층 공실에서 시작한<br>100일 편집숍 실험',
      role: 'Business Planning & Operations',
      period: '2025.06 – 2025.12',
      tools: 'Brand Curation, Space Planning, Store Ops',
      link: 'https://www.staxx.co.kr/strawberryfields',
      linkLabel: 'Project Page',
      blogLink: 'https://staxx.tistory.com/269',
      blogLabel: 'STAXX Blog',
      heroBg: 'linear-gradient(160deg, #FFF5F5, #E8A0A8)',
      points: [
        '6월 STAXX 합류 후 스트로베리 필드 프로젝트 기획·운영 전 과정을 전담했습니다.',
        '영주·안동·대구·원주·서울 8개 로컬 브랜드 모집·선발, 공간·프로그램 기획 후 9/30 정식 오픈.',
        '오픈 후 첫 달 방문 540명, 프로그램 9건·참여 45명 — POS·포장·매장 운영 이슈를 현장에서 해결.'
      ]
    },
    pairchive: {
      title: 'Pairchive',
      subtitle: '둘이서 한 달간 링크를 모아<br>하나의 책을 완성하는 페어링 서비스',
      role: 'Founder / Designer',
      period: '2026',
      tools: 'Figma, HTML/CSS/JS',
      heroBg: 'linear-gradient(160deg, #6EC4E8, #4AABD4)',
      points: [
        'Figma에서 로고·UI·디자인 시스템을 설계하고 프로토타입을 제작했습니다.',
        '1F 진행 중 / 2F 보관함의 책장 메타포로 직관적인 정보구조를 만들었습니다.',
        '기획부터 UI/UX 디자인, 프론트엔드 구현까지 전 과정을 담당했습니다.'
      ]
    }
  };

  function padIndex(num) {
    return num < 10 ? '0' + num : String(num);
  }

  function enrichProject(key) {
    var data = PROJECTS[key];
    var assets = ASSETS[key] || {};
    var index = ORDER.indexOf(key);
    return Object.assign({}, data, {
      index: padIndex(index + 1),
      prev: index > 0 ? ORDER[index - 1] : null,
      next: index >= 0 && index < ORDER.length - 1 ? ORDER[index + 1] : null,
      cover: assets.cover || data.cover,
      coverFallback: assets.coverFallback || data.coverFallback,
      gallery: assets.gallery || data.gallery || []
    });
  }

  function getProjectKey() {
    var params = new URLSearchParams(window.location.search);
    var key = params.get('project');
    if (PROJECTS[key]) return key;
    if (key === 'impactsquare') return 'strawberryfields';
    return ORDER[0] || 'brand';
  }

  function render() {
    var key = getProjectKey();
    var data = enrichProject(key);

    document.title = data.title + ' — YAZII';
    document.getElementById('detailEyebrow').textContent = 'work / ' + data.index;
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailSubtitle').innerHTML = data.subtitle;

    var hero = document.getElementById('detailHero');
    hero.style.background = data.heroBg;

    var coverEl = document.getElementById('detailCover');
    var placeholder = document.getElementById('detailHeroPlaceholder');
    var cta = document.getElementById('detailCta');

    if (coverEl && data.cover) {
      coverEl.innerHTML = '<img src="' + data.cover + '" alt="' + data.title + ' project cover" onerror="this.src=\'' + (data.coverFallback || '') + '\'">';
      coverEl.hidden = false;
      if (placeholder) placeholder.hidden = true;
    } else if (coverEl) {
      coverEl.hidden = true;
      if (placeholder) placeholder.hidden = false;
    }

    if (cta) {
      if (data.link) {
        cta.href = data.link;
        var ctaLabel = cta.querySelector('span:not(.link-arrow)');
        if (ctaLabel) ctaLabel.textContent = 'View ' + data.linkLabel;
        cta.hidden = false;
      } else {
        cta.hidden = true;
      }
    }

    var metaHtml =
      '<div class="detail-meta-row"><span class="meta-label">Role</span><span class="meta-value">' + data.role + '</span></div>' +
      '<div class="detail-meta-row"><span class="meta-label">Period</span><span class="meta-value">' + data.period + '</span></div>' +
      '<div class="detail-meta-row"><span class="meta-label">Tools</span><span class="meta-value">' + data.tools + '</span></div>';

    if (data.link) {
      metaHtml += '<div class="detail-meta-row"><span class="meta-label">Link</span><span class="meta-value"><a href="' + data.link + '" target="_blank" rel="noopener">' + data.linkLabel + ' ↗</a></span></div>';
    }

    if (data.blogLink) {
      metaHtml += '<div class="detail-meta-row"><span class="meta-label">Story</span><span class="meta-value"><a href="' + data.blogLink + '" target="_blank" rel="noopener">' + data.blogLabel + ' ↗</a></span></div>';
    }

    document.getElementById('detailMeta').innerHTML = metaHtml;

    var galleryEl = document.getElementById('detailGallery');
    if (galleryEl) {
      var gallery = (data.gallery || []).filter(function (src) {
        return src !== data.cover;
      });

      if (gallery.length) {
        galleryEl.innerHTML = gallery.map(function (src, i) {
          return '<div class="detail-image-sm"><img src="' + src + '" alt="' + data.title + ' detail image ' + (i + 1) + '"></div>';
        }).join('');
        galleryEl.hidden = false;
      } else {
        galleryEl.innerHTML = '';
        galleryEl.hidden = true;
      }
    }

    document.getElementById('detailPoints').innerHTML = data.points
      .map(function (p) { return '<li>' + p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') + '</li>'; })
      .join('');

    var navHtml = '';
    if (data.prev) {
      navHtml += '<a href="project-detail.html?project=' + data.prev + '" class="pn-link pn-prev">' +
        '<span class="link-arrow link-arrow-left">←</span><span>' + PROJECTS[data.prev].title + '</span></a>';
    } else {
      navHtml += '<a href="index.html#work" class="pn-link pn-prev">' +
        '<span class="link-arrow link-arrow-left">←</span><span>All Projects</span></a>';
    }
    if (data.next) {
      navHtml += '<a href="project-detail.html?project=' + data.next + '" class="pn-link pn-next">' +
        '<span>' + PROJECTS[data.next].title + '</span><span class="link-arrow">→</span></a>';
    } else {
      navHtml += '<span></span>';
    }
    document.getElementById('detailNav').innerHTML = navHtml;
  }

  document.addEventListener('DOMContentLoaded', render);
})();
