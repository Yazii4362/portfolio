(function () {
  var PROJECTS = {
    pairchive: {
      index: '01',
      title: 'Pairchive',
      subtitle: '둘이서 한 달간 링크를 모아<br>하나의 책을 완성하는 페어링 서비스',
      role: 'Founder / Designer',
      period: '2026',
      tools: 'Figma, HTML/CSS/JS',
      heroBg: 'linear-gradient(160deg, #6EC4E8, #4AABD4)',
      points: [
        '최대 3개 동시 진행 + 1개월 자동 완성 규칙으로 페어 간 몰입을 설계했습니다.',
        '1F 진행 중 / 2F 보관함의 책장 메타포로 직관적인 정보구조를 만들었습니다.',
        'User ↔ Pair ↔ User 구조로 SNS형 소셜그래프와 차별화했습니다.'
      ],
      prev: null,
      next: 'muda'
    },
    muda: {
      index: '02',
      title: 'MUDA',
      subtitle: '감정을 기록하고 돌아보는<br>다이어리 앱',
      role: 'Product Designer',
      period: '2025',
      tools: 'Figma, Prototyping',
      heroBg: 'linear-gradient(160deg, #FDF9F6, #EADAD2)',
      points: [
        '감정 이모지 기반의 직관적인 다이어리 입력 UX를 설계했습니다.',
        '월간/연간 감정 트래킹 대시보드를 디자인했습니다.',
        '텀블벅 크라우드펀딩 266% 달성에 기여했습니다.'
      ],
      prev: 'pairchive',
      next: 'impactsquare'
    },
    impactsquare: {
      index: '03',
      title: 'ImpactSquare',
      subtitle: '영주 딸기밭 프로젝트<br>현장 리서치 & UX',
      role: 'UX Intern',
      period: '2024',
      tools: 'Figma, Field Research',
      heroBg: 'linear-gradient(160deg, #F0F7F0, #95D5B2)',
      points: [
        '현장 인터뷰와 관찰 리서치를 통해 사용자 니즈를 파악했습니다.',
        '농가-소비자 연결 서비스의 UX 플로우를 설계했습니다.',
        '리서치 결과를 기반으로 와이어프레임과 프로토타입을 제작했습니다.'
      ],
      prev: 'muda',
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
      prev: 'impactsquare',
      next: null
    }
  };

  var ORDER = ['pairchive', 'muda', 'impactsquare', 'brand'];

  function getProjectKey() {
    var params = new URLSearchParams(window.location.search);
    var key = params.get('project');
    return PROJECTS[key] ? key : 'pairchive';
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

    document.getElementById('detailMeta').innerHTML =
      '<div class="detail-meta-row"><span class="meta-label">Role</span><span class="meta-value">' + data.role + '</span></div>' +
      '<div class="detail-meta-row"><span class="meta-label">Period</span><span class="meta-value">' + data.period + '</span></div>' +
      '<div class="detail-meta-row"><span class="meta-label">Tools</span><span class="meta-value">' + data.tools + '</span></div>';

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
