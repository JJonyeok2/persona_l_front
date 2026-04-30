/**
 * @file reportData.ts
 * @description 진단 리포트 섹션에서 사용되는 정적 데이터들입니다.
 * 유사 페르소나 정보 및 방사형 차트의 기본 축 데이터를 포함합니다.
 */

/**
 * 유사한 스타일의 페르소나 데이터
 */
export const auras = [
  { 
    name: "어반 미니멀리스트", 
    match: 94, 
    image: "/persona_1.jpg" 
  },
  { 
    name: "아방가르드 크리에이터", 
    match: 87, 
    image: "/persona_2.jpg" 
  },
  { 
    name: "내추럴 컨템플레이터", 
    match: 81, 
    image: "/persona_3.jpg" 
  },
];

/**
 * 방사형 차트용 초기 데이터 (향기 노트별 분석 수치)
 */
export const radarData = [
  { axis: "플로랄", value: 0.3 },
  { axis: "우디", value: 0.75 },
  { axis: "오리엔탈", value: 0.45 },
  { axis: "프레시", value: 0.6 },
  { axis: "구르망", value: 0.2 },
];
