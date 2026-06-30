window.PROJECT_ORDER = [
  'brand',
  'babpool',
  'muda',
  'strawberryfields',
  'pairchive'
];

window.PROJECT_LIST_ORDER = [
  'pairchive',
  'strawberryfields',
  'muda',
  'babpool',
  'brand'
];

window.PROJECT_ASSETS = {
  babpool: {
    thumb: 'assets/projects/babpool-cover.svg',
    cover: 'assets/projects/babpool-cover.svg',
    screens: [
      'assets/projects/babpool-cover.svg',
      'assets/projects/babpool-mobile.svg',
      'assets/projects/babpool-match.svg'
    ],
    gallery: [
      'assets/projects/babpool-mobile.svg',
      'assets/projects/babpool-match.svg'
    ]
  },
  muda: {
    thumb: 'assets/projects/muda-thumb.jpg',
    cover: 'assets/projects/muda-cover.png',
    screens: [
      'assets/projects/muda-cover.png',
      'assets/projects/muda-02.jpg',
      'assets/projects/muda-thumb.jpg'
    ],
    gallery: [
      'assets/projects/muda-02.jpg'
    ]
  },
  pairchive: {
    thumb: 'assets/projects/pairchive-logo.svg',
    cover: 'assets/projects/pairchive-home.svg',
    coverFallback: 'assets/projects/pairchive-logo.svg',
    screens: [
      'assets/projects/pairchive-home.svg',
      'assets/projects/pairchive-mobile.svg',
      'assets/projects/pairchive-archive.svg'
    ],
    gallery: [
      'assets/projects/pairchive-home.svg',
      'assets/projects/pairchive-mobile.svg',
      'assets/projects/pairchive-archive.svg'
    ]
  },
  strawberryfields: {
    thumb: 'assets/projects/strawberryfields-thumb.jpg',
    cover: 'assets/projects/strawberryfields-storefront.jpg',
    screens: [
      'assets/projects/strawberryfields-storefront.jpg',
      'assets/projects/strawberryfields-02.jpg',
      'assets/projects/strawberryfields-04.jpg'
    ],
    gallery: [
      'assets/projects/strawberryfields-05.jpg',
      'assets/projects/strawberryfields-01.jpg',
      'assets/projects/strawberryfields-02.jpg',
      'assets/projects/strawberryfields-04.jpg'
    ]
  },
  brand: {
    thumb: 'assets/projects/brand-cover.svg',
    cover: 'assets/projects/brand-cover.svg',
    screens: [
      'assets/projects/brand-cover.svg',
      'assets/projects/brand-poster.svg',
      'assets/projects/brand-guide.svg'
    ],
    gallery: [
      'assets/projects/brand-cover.svg',
      'assets/projects/brand-poster.svg',
      'assets/projects/brand-guide.svg'
    ]
  }
};

window.PROJECT_REGISTRY = {
  pairchive: {
    name: 'Pairchive',
    listName: 'pairchive',
    year: '2026',
    descKey: 'work.pairchive',
    rowTag: { key: 'tag.founderDesign', color: 'purple' },
    tags: [
      { key: 'tag.founderDesign', color: 'purple' },
      { key: 'chip.uiux', color: 'slate' },
      { key: 'chip.figma', color: 'navy' }
    ],
    thumbType: 'pairchive'
  },
  strawberryfields: {
    name: 'Strawberry Fields',
    listName: 'strawberry fields',
    year: '2025',
    descKey: 'work.strawberryfields',
    rowTag: { key: 'tag.businessPlanning', color: 'teal' },
    tags: [
      { key: 'tag.businessPlanning', color: 'teal' },
      { key: 'tag.businessOperations', color: 'green' },
      { key: 'chip.product', color: 'amber' }
    ],
    thumbType: 'photo'
  },
  muda: {
    name: 'MUDA',
    listName: 'muda',
    year: '2024',
    descKey: 'work.muda',
    rowTag: { key: 'tag.productOwner', color: 'green' },
    tags: [
      { key: 'tag.productOwner', color: 'green' },
      { key: 'chip.product', color: 'slate' },
      { key: 'chip.prototype', color: 'amber' }
    ],
    thumbType: 'photo'
  },
  babpool: {
    name: 'Babpool',
    listName: 'babpool',
    year: '2024',
    descKey: 'work.babpool',
    rowTag: { key: 'tag.swypWinner', color: 'amber' },
    tags: [
      { key: 'tag.swypWinner', color: 'amber' },
      { key: 'chip.product', color: 'slate' },
      { key: 'chip.uiux', color: 'green' }
    ],
    thumbType: 'babpool'
  },
  brand: {
    name: 'Brand Identity',
    listName: 'brand identity',
    year: '2022–25',
    descKey: 'work.brand',
    rowTag: { key: 'tag.graphicDesign', color: 'olive' },
    tags: [
      { key: 'tag.graphicDesign', color: 'olive' },
      { key: 'chip.brand', color: 'amber' }
    ],
    thumbType: 'brand'
  }
};
