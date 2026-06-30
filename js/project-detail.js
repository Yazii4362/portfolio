(function () {
  var PROJECTS = {
    muda: {
      index: '01',
      title: 'MUDA',
      subtitle: 'AI 음악 추천 일기앱<br>일기에 배경음악을 입히다',
      role: 'Product Owner (PO)',
      period: '2024',
      tools: 'Figma, Product Planning, Tumblbug',
      link: 'https://tumblbug.com/musicdiary',
      linkLabel: 'Tumblbug',
      heroBg: 'linear-gradient(160deg, #FDF9F6, #EADAD2)',
      cover: 'assets/projects/muda-cover.png',
      points: [
        'PO로서 서비스 기획, UX/UI 방향, 크라우드펀딩 전략을 총괄했습니다.',
        '일기 작성과 AI 음악 추천을 연결하는 핵심 경험을 설계했습니다.',
        '텀블벅 펀딩 266% 달성 — 62명 후원, 130만 원+ 모금 (Team GLOW).'
      ],
      prev: null,
      next: 'pairchive'
    },
    pairchive: {
      index: '02',
      title: 'Pairchive',
      subtitle: '둘이서 한 달간 링크를 모아<br>하나의 책을 완성하는 페어링 서비스',
      role: 'Founder / Designer',
      period: '2026',
      tools: 'Figma, HTML/CSS/JS',
      heroBg: 'linear-gradient(160deg, #6EC4E8, #4AABD4)',
      cover: 'assets/projects/pairchive-cover.png',
      coverFallback: 'assets/projects/pairchive-logo.svg',
      points: [
        'Figma에서 로고·UI·디자인 시스템을 설계하고 프로토타입을 제작했습니다.',
        '1F 진행 중 / 2F 보관함의 책장 메타포로 직관적인 정보구조를 만들었습니다.',
        '기획부터 UI/UX 디자인, 프론트엔드 구현까지 전 과정을 담당했습니다.'
      ],
      prev: 'muda',
      next: 'strawberryfields'
    },
    strawberryfields: {
      index: '03',
      title: 'Strawberry Fields',
      subtitle: '영주 STAXX 편집숍<br>100일간 8개 로컬 브랜드 큐레이션',
      role: 'Business Planning & Operations',
      period: '2025',
      tools: 'Service Planning, Brand Curation, Operations',
      link: 'https://www.staxx.co.kr/strawberryfields',
      linkLabel: 'STAXX',
      heroBg: 'linear-gradient(160deg, #FFF5F5, #E8A0A8)',
      cover: 'assets/projects/strawberryfields-cover.png',
      points: [
        '경북 영주 STAXX 1층에서 100일간 운영된 편집숍 프로젝트입니다.',
        '사업 기획부터 입점 브랜드 큐레이션, 프로그램·매장 운영까지 전담했습니다.',
        '공예·F&B·도서 등 8개 로컬 브랜드의 팝업·클래스·체험 프로그램을 기획·운영했습니다.'
      ],
      prev: 'pairchive',
      next: 'brand'
    },
    brand: {
      index: '04',
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
      ],
      prev: 'strawberryfields',
      next: null
    }
  };

  function getProjectKey() {
    var params = new URLSearchParams(window.location.search);
    var key = params.get('project');
    if (PROJECTS[key]) return key;
    if (key === 'impactsquare') return 'strawberryfields';
    return 'muda';
  }

  function render() {
    var key = getProjectKey();
    var data = PROJECTS[key];

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
        cta.querySelector('span').textContent = 'View ' + data.linkLabel;
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

    document.getElementById('detailMeta').innerHTML = metaHtml;

    document.getElementById('detailPoints').innerHTML = data.points
      .map(function (p) { return '<li>' + p + '</li>'; })
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
