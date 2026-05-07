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
    origin: "이탈리아산 감귤류 과일"
  },
  {
    name: "앰버",
    enName: "Amber",
    category: "Base",
    description: "따뜻하고 달콤한 수지의 향. 피부 위에 오래 머무는 포근한 온기와 성숙한 관능미를 동시에 표현합니다.",
    origin: "나무 수지(Resin)에서 유래"
  },
  {
    name: "베티버",
    enName: "Vetiver",
    category: "Base",
    description: "비 온 뒤의 흙 내음과 쌉싸름한 연기 향. 중성적이고 이성적인 매력을 가진 묵직한 우디 향의 핵심입니다.",
    origin: "열대 지방 풀의 뿌리"
  },
  {
    name: "머스크",
    enName: "Musk",
    category: "Base",
    description: "살결처럼 부드럽고 깨끗한 잔향. 모든 향기를 포근하게 감싸 안으며 신비로운 안정감을 선사합니다.",
    origin: "식물성 및 합성 향료 원료"
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
    origin: "동남아 원산 꿀풀과 식물"
  },
  {
    name: "샌달우드",
    enName: "Sandalwood",
    category: "Base",
    description: "포근하고 크리미한 우유빛 나무 향. 마음을 차분하게 가라앉히는 명상적인 분위기와 고급스러운 세련미를 줍니다.",
    origin: "인도산 백단향 나무"
  },
  {
    name: "시더우드",
    enName: "Cedarwood",
    category: "Base",
    description: "건조하고 깨끗한 연필 향. 숲속에 있는 듯한 지적이고 이성적인 느낌을 주며 향기의 골격을 튼튼하게 잡아줍니다.",
    origin: "북미 및 히말라야산 향나무"
  },
  {
    name: "로즈",
    enName: "Rose",
    category: "Middle",
    description: "화려하고 우아한 꽃의 여왕. 클래식한 로맨틱함부터 현대적인 시크함까지 다양한 매력을 지닌 절대적인 원료입니다.",
    origin: "터키 및 불가리아산 장미"
  },
  {
    name: "자스민",
    enName: "Jasmine",
    category: "Middle",
    description: "관능적이고 풍성한 화이트 플로럴 향. 밤의 공기처럼 신비롭고 깊은 달콤함이 향기에 입체감을 더합니다.",
    origin: "이집트 및 인도산 자스민 꽃"
  },
  {
    name: "바닐라",
    enName: "Vanilla",
    category: "Base",
    description: "달콤하고 부드러운 위로의 향. 포근한 안정감과 함께 고급스러운 미식가(Gourmand)적인 매력을 완성합니다.",
    origin: "마다가스카르산 바닐라 빈"
  },
  {
    name: "우드",
    enName: "Oud",
    category: "Base",
    description: "침향나무에서 얻는 가장 진귀한 향료. 묵직하고 어두운 나무 향과 동물적인 관능미가 어우러진 신비로운 향입니다.",
    origin: "동남아시아의 침향나무"
  },
  {
    name: "핑크 페퍼",
    enName: "Pink Pepper",
    category: "Top",
    description: "톡 쏘는 발랄함과 섬세한 스파이스 향. 향기의 시작에 생동감 넘치는 위트와 현대적인 리듬을 부여합니다.",
    origin: "브라질산 페퍼 트리 열매"
  },
  {
    name: "레몬",
    enName: "Lemon",
    category: "Top",
    description: "날카롭고 선명한 산미가 느껴지는 향. 지친 감각에 즉각적인 리프레시와 밝은 에너지를 선사합니다.",
    origin: "시칠리아산 레몬 껍질"
  }
];
