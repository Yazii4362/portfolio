# Yeji Im — Portfolio

## 폴더 구조

```
portfolio/
├── index.html
├── css/
│   ├── tokens.css        디자인 토큰 (컬러/타이포/스페이싱)
│   ├── common.css        리셋 + 전역 베이스
│   ├── hero.css
│   ├── about.css
│   ├── field-notes.css
│   ├── work.css
│   └── contact.css
├── js/
│   ├── main.js            Locomotive Scroll + GSAP ScrollTrigger 초기화
│   └── screens.js         섹션별 인터랙션
├── images/
│   ├── hero/
│   ├── about/
│   ├── field-notes/
│   └── work/
└── fonts/
```

## 플러그인 (CDN)

index.html에 이미 연결되어 있어요.

- jQuery 3.7.1
- GSAP 3.12.5 + ScrollTrigger
- Locomotive Scroll 4.1.4
- Swiper 11

## 다음 할 일

- [ ] FIELD NOTES 5개 노트(관찰/현장/움직임/실행/연결) 카피 채우기
- [ ] About 스킬 리스트에 실제 텍스트 확정
- [ ] Selected Work 카드 (Pairchive, MUDA) 내용 채우기
- [ ] Bootstrap / Tailwind 도입 여부 결정 — tokens.css 기반 커스텀 시스템과 충돌 가능성 있어서 신중하게
