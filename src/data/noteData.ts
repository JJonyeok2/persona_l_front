/**
 * @file noteData.ts
 * @description 향수의 주요 원료(Notes)에 대한 상세 설명을 담은 데이터베이스입니다.
 * 입문자들이 궁금해할 만한 원료의 유래와 후각적 특징을 정의합니다.
 */

export interface ScentNote {
  name: string;
  enName: string;
  category: "Top" | "Middle" | "Base";
  description: string;
  origin: string;
}

export const scentNotes: ScentNote[] = [
  {
    name: "베르가못",
    enName: "Bergamot",
    category: "Top",
    description: "우아하고 화사한 감귤 향. 얼그레이 홍차의 향긋한 풍미를 만드는 주인공으로, 기분을 밝게 전환해 줍니다.",
    origin: "이탈리아 칼라브리아산 감귤류 과일"
  },
  {
    name: "앰버",
    enName: "Amber",
    category: "Base",
    description: "따뜻하고 달콤한 수지의 향. 피부 위에 오래 머무는 포근한 온기와 성숙한 관능미를 동시에 표현합니다.",
    origin: "나무 수지(Resin)에서 영감을 받은 가상의 향조"
  },
  {
    name: "베티버",
    enName: "Vetiver",
    category: "Base",
    description: "비 온 뒤의 흙 내음과 쌉싸름한 연기 향. 중성적이고 이성적인 매력을 가진 묵직한 우디 향의 핵심입니다.",
    origin: "열대 지방에서 자라는 풀의 뿌리"
  },
  {
    name: "머스크",
    enName: "Musk",
    category: "Base",
    description: "살결처럼 부드럽고 깨끗한 잔향. 모든 향기를 포근하게 감싸 안으며 신비로운 안정감을 선사합니다.",
    origin: "현대에는 식물성 원료와 합성 향료로 대체"
  },
  {
    name: "네롤리",
    enName: "Neroli",
    category: "Top",
    description: "오렌지 꽃에서 추출한 싱그러운 향. 순수한 햇살 아래의 하얀 꽃잎처럼 깨끗하고 로맨틱한 분위기를 만듭니다.",
    origin: "비터 오렌지 나무의 꽃"
  },
  {
    name: "파출리",
    enName: "Patchouli",
    category: "Base",
    description: "깊고 어두운 대지의 향기. 약간의 약초 내음과 흙 향이 어우러져 향수에 깊이감과 빈티지한 아우라를 더합니다.",
    origin: "동남아시아가 원산지인 꿀풀과 식물"
  },
  {
    name: "샌달우드",
    enName: "Sandalwood",
    category: "Base",
    description: "포근하고 크리미한 우유빛 나무 향. 마음을 차분하게 가라앉히는 명상적인 분위기와 고급스러운 세련미를 줍니다.",
    origin: "인도산 백단향 나무의 심재"
  },
  {
    name: "시더우드",
    enName: "Cedarwood",
    category: "Base",
    description: "건조하고 깨끗한 연필 향. 숲속에 있는 듯한 지적이고 이성적인 느낌을 주며 향기의 골격을 튼튼하게 잡아줍니다.",
    origin: "히말라야 및 북미산 향나무"
  }
];
