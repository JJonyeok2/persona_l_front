/**
 * @file productData.ts
 * @description 사이트에서 판매 및 추천하는 향수와 홈 프래그넌스 제품들의 데이터베이스입니다.
 */

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  size: string;
  image: string;
  tags: string[];
  notes: string; // 간략한 노트 요약 (호버용)
  family: string;
  featured?: boolean;
  category: "Personal" | "Space";
  /** 클릭 시 모달에 노출될 상세 정보 */
  details: {
    story: string; // 향수의 탄생 스토리 또는 분위기 설명
    topNotes: string; // 탑 노트 상세
    middleNotes: string; // 미들 노트 상세
    baseNotes: string; // 베이스 노트 상세
    bestFor: string; // 추천 어울리는 순간/룩
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "AMBRE NOIR",
    brand: "Persona L",
    price: "₩285,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/5d4c5ef1-a7ee-443d-810b-09c1aa90977e",
    tags: ["For You", "Vegan"],
    notes: "블랙 페퍼의 알싸함 뒤에 찾아오는 다크 앰버의 묵직한 온기",
    family: "우디 오리엔탈",
    featured: true,
    category: "Personal",
    details: {
      story: "한밤중 어둠 속에서 타오르는 작은 불꽃처럼, 비밀스럽고 관능적인 분위기를 자아냅니다. 당신의 존재감을 가장 묵직하고 우아하게 각인시켜줄 향기입니다.",
      topNotes: "블랙 페퍼, 베르가못, 핑크 페퍼",
      middleNotes: "다마스크 로즈, 파출리, 샤프란",
      baseNotes: "다크 앰버, 침향(Oud), 레더, 머스크",
      bestFor: "중요한 저녁 모임이나 나만의 시그니처 아우라가 필요한 순간"
    }
  },
  {
    id: 2,
    name: "Amber Reserve",
    brand: "Persona L",
    price: "₩320,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/1dcd2cd9-baa1-4386-bfc6-e1e8f5378186",
    tags: ["For You", "Eco"],
    notes: "골든 앰버와 시나몬이 빚어내는 황금빛 서사",
    family: "오리엔탈 스파이시",
    category: "Personal",
    details: {
      story: "오랜 시간 숙성된 귀한 위스키처럼 깊고 풍부한 잔향을 남깁니다. 따뜻한 햇살이 내려앉은 듯한 포근함과 성숙한 어른의 여유를 상징합니다.",
      topNotes: "사프란, 너트멕, 오렌지",
      middleNotes: "골든 앰버, 시나몬, 코리앤더",
      baseNotes: "바닐라, 샌달우드, 통카빈, 머스크",
      bestFor: "차분하고 지적인 인상을 주고 싶은 비즈니스 미팅이나 데이트"
    }
  },
  {
    id: 3,
    name: "FLEUR ROSEE",
    brand: "Persona L",
    price: "₩265,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/943ee401-aaf0-40cc-be6d-9f3e088434a1",
    tags: ["For You", "Vegan"],
    notes: "새벽 이슬을 머금은 피오니와 장미의 투명한 하모니",
    family: "소프트 플로랄",
    featured: true,
    category: "Personal",
    details: {
      story: "꽃들이 막 꽃봉오리를 터뜨리는 이른 아침의 정원을 걷는 듯한 청초함을 선사합니다. 부드럽고 맑은 보라색 무드가 당신의 일상에 로맨틱한 생동감을 더합니다.",
      topNotes: "핑크 페퍼, 리치, 배",
      middleNotes: "다마스크 로즈, 피오니, 매그놀리아",
      baseNotes: "화이트 머스크, 시더우드, 꿀",
      bestFor: "봄날의 가벼운 외출이나 사랑스러운 분위기를 연출하고 싶을 때"
    }
  },
  {
    id: 4,
    name: "BERGAMOT & AMBER",
    brand: "Persona L",
    price: "₩295,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/c29216a4-306f-449e-a5ed-94c890196655",
    tags: ["Vegan", "Eco"],
    notes: "지중해의 활력과 대지의 평온함이 공존하는 양면적인 매력",
    family: "앰버 시트러스",
    category: "Personal",
    details: {
      story: "차가운 시트러스의 에너지가 따뜻한 앰버의 품으로 스며드는 순간을 담았습니다. 신선하면서도 가볍지 않은 무게감이 현대적인 우아함을 완성합니다.",
      topNotes: "이탈리안 베르가못, 레몬, 만다린",
      middleNotes: "앰버, 자스민, 라벤더",
      baseNotes: "샌달우드, 화이트 머스크, 베티버",
      bestFor: "세련된 오피스 룩이나 자기관리가 철저한 전문직 스타일"
    }
  },
  {
    id: 5,
    name: "Verde Breeze",
    brand: "Persona L",
    price: "₩195,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/1512af21-6ab3-4700-93c8-188682843654",
    tags: ["Eco", "Vegan"],
    notes: "페퍼민트와 그린 티가 만드는 청량한 숲의 숨결",
    family: "시트러스 허벌",
    category: "Personal",
    details: {
      story: "바람에 흔들리는 초록 잎사귀들 사이로 불어오는 시원한 공기를 표현했습니다. 복잡한 도심 속에서 나만의 작은 숲을 찾고 싶은 이들에게 추천합니다.",
      topNotes: "레몬, 페퍼민트, 유칼립투스",
      middleNotes: "그린 티, 바질, 로즈마리",
      baseNotes: "시더우드, 베티버, 화이트 머스크",
      bestFor: "운동 후의 리프레시나 나른한 주말 오후의 기분 전환"
    }
  },
  {
    id: 6,
    name: "Velvet Skin",
    brand: "Persona L",
    price: "₩245,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/d28daa39-8231-4997-a12b-4d6980c70473",
    tags: ["For You"],
    notes: "내 살결처럼 포근하게 감싸는 머스크의 부드러운 질감",
    family: "머스크 파우더리",
    category: "Personal",
    details: {
      story: "향수를 뿌렸다는 느낌보다 '좋은 살냄새'를 가진 사람으로 기억되게 합니다. 부드러운 벨벳 천이 피부에 닿는 듯한 포근한 안정감을 줍니다.",
      topNotes: "핑크 페퍼, 알데하이드, 화이트 티",
      middleNotes: "아이리스, 로즈, 오렌지 블라썸",
      baseNotes: "스킨 머스크, 샌달우드, 캐시미어 우드",
      bestFor: "편안한 니트 스타일링이나 소중한 사람과의 조용한 시간"
    }
  },
  {
    id: 7,
    name: "Ancient Library",
    brand: "Persona L",
    price: "₩310,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/b4a6280a-7608-437b-9b6e-0461189b3b96",
    tags: ["For You", "Vegan"],
    notes: "오래된 가죽 책과 나무 선반의 깊은 향이 만드는 지적 아우라",
    family: "레더 우디",
    category: "Personal",
    details: {
      story: "오래된 도서관의 묵직한 서가 사이에서 느껴지는 고요함을 담았습니다. 지적인 호기심과 클래식한 취향을 가진 당신을 위한 깊이 있는 향입니다.",
      topNotes: "블랙 페퍼, 카다멈",
      middleNotes: "시더우드, 파피루스, 과이악 우드",
      baseNotes: "앰버, 파출리, 레더, 베티버",
      bestFor: "독서나 명상, 또는 지적인 아우라를 강조하고 싶은 자리에"
    }
  },
  {
    id: 8,
    name: "Herbal Sage",
    brand: "Persona L",
    price: "₩215,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/7af9f3db-b41a-4dcb-9e81-b7b140c0b668",
    tags: ["Vegan", "Eco"],
    notes: "라벤더와 세이지의 허브 향이 주는 이성적이고 차분한 위로",
    family: "아로마틱 푸제르",
    category: "Personal",
    details: {
      story: "야생 허브가 가득한 정원에서 심호흡하는 듯한 해방감을 줍니다. 깔끔하고 이성적인 첫인상을 남기며, 하루를 차분하게 유지해 줍니다.",
      topNotes: "클라리 세이지, 베르가못, 타임",
      middleNotes: "라벤더, 로즈마리, 제라늄",
      baseNotes: "오크모스, 머스크, 파출리",
      bestFor: "정돈된 화이트 셔츠 룩이나 에너지가 필요한 아침 시간"
    }
  },
  {
    id: 9,
    name: "SANTAL + BERGAMOT",
    brand: "Persona L Home",
    price: "₩145,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/027e55d5-14d5-40ba-8d75-cd6c4ac801ea",
    tags: ["Space", "For You", "Vegan"],
    notes: "공간을 따뜻한 나무의 온기와 햇살의 싱그러움으로 채우는 시간",
    family: "우디 시트러스",
    featured: true,
    category: "Space",
    details: {
      story: "샌달우드의 묵직한 안식과 베르가못의 밝은 에너지가 공기 중에 부드럽게 섞입니다. 거실에 들어서는 순간 마음이 놓이는 평온함을 경험해 보세요.",
      topNotes: "칼라브리아 베르가못, 쁘띠그레인",
      middleNotes: "화이트 티, 매그놀리아",
      baseNotes: "오스트레일리아 샌달우드, 앰버그리스",
      bestFor: "가족이나 손님을 맞이하는 거실 또는 다이닝 룸"
    }
  },
  {
    id: 10,
    name: "PALO SANTO & BERGAMOT",
    brand: "Persona L Home",
    price: "₩85,000",
    size: "200 G",
    image: "https://github.com/user-attachments/assets/1c163ba8-320b-4d25-80fc-6c2f61a44323",
    tags: ["Space", "Eco"],
    notes: "신성한 나무 팔로산토의 연기와 밝은 빛의 향으로 공간을 정화",
    family: "우디 시트러스",
    category: "Space",
    details: {
      story: "부정적인 에너지를 씻어내는 팔로산토의 신비로운 향에 상큼한 베르가못을 더했습니다. 공간뿐만 아니라 마음까지 맑게 정화되는 기분을 선사합니다.",
      topNotes: "베르가못, 레몬 껍질",
      middleNotes: "팔로산토 스모크, 드라이 케드르",
      baseNotes: "침향, 머스크, 파출리",
      bestFor: "명상, 요가, 혹은 집중력이 필요한 서재 공간"
    }
  },
  {
    id: 11,
    name: "OUD & AMBER",
    brand: "Persona L Home",
    price: "₩165,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/681b7e90-2a76-4719-b7f0-78902566f68b",
    tags: ["Space", "Vegan"],
    notes: "시간의 깊이를 간직한 침향과 앰버가 만드는 압도적인 아우라",
    family: "우디 오리엔탈",
    category: "Space",
    details: {
      story: "천 년의 시간을 머금은 침향의 묵직함이 앰버의 따뜻함과 만나 공간의 가치를 높여줍니다. 호텔 라운지처럼 고급스럽고 정제된 분위기를 연출합니다.",
      topNotes: "샤프란, 블랙 페퍼",
      middleNotes: "로즈우드, 가이악 우드",
      baseNotes: "프레셔스 오드(Oud), 골든 앰버, 파출리",
      bestFor: "현관 입구나 서재 등 공간의 첫인상을 결정짓는 장소"
    }
  },
  {
    id: 12,
    name: "SANDAL WOOD & AMBER",
    brand: "Persona L Home",
    price: "₩155,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/1a7300d2-f569-4339-9dee-b107adecdb91",
    tags: ["Space", "For You"],
    notes: "부드럽게 공간을 휘감는 샌달우드와 달콤한 앰버의 클래식 무드",
    family: "우디 오리엔탈",
    category: "Space",
    details: {
      story: "누구에게나 사랑받는 클래식한 조합입니다. 부드러운 나무 향과 은은한 달콤함이 조화를 이루어, 어느 공간에서나 이질감 없이 고급스럽게 스며듭니다.",
      topNotes: "오렌지, 자몽",
      middleNotes: "샌달우드, 시더우드",
      baseNotes: "앰버, 바닐라, 화이트 머스크",
      bestFor: "침실이나 휴식 공간 등 편안함이 최우선인 장소"
    }
  },
  {
    id: 13,
    name: "SANDAL WOOD & AMBER",
    brand: "Persona L Home",
    price: "₩135,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/c9950bcd-dc5d-49c9-8153-5e8ac3299158",
    tags: ["Space", "Vegan"],
    notes: "크리미한 샌달우드와 깊은 앰버의 여운이 만드는 아늑한 안식처",
    family: "우디 오리엔탈",
    category: "Space",
    details: {
      story: "기존 샌달우드보다 더 부드럽고 포근한 느낌에 집중했습니다. 우유처럼 크리미한 질감이 공기를 감싸 안아, 긴장된 마음을 부드럽게 녹여줍니다.",
      topNotes: "코튼 플라워, 화이트 티",
      middleNotes: "마이소르 샌달우드, 아이리스",
      baseNotes: "앰버, 벤조인, 바닐라",
      bestFor: "침실이나 욕실 등 하루의 피로를 푸는 프라이빗한 공간"
    }
  },
  {
    id: 14,
    name: "SANTAL & OAK",
    brand: "Persona L Home",
    price: "₩145,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/2e07988e-0fb2-4725-8780-28f6f52205bb",
    tags: ["Space", "Eco"],
    notes: "정제된 산탈과 오크우드가 완성하는 고요한 숲속 서재의 공기",
    family: "리치 우디",
    category: "Space",
    details: {
      story: "드라이하고 정갈한 나무 향의 정수입니다. 불필요한 장식을 걷어낸 미니멀한 인테리어에 가장 잘 어울리며, 공간에 지적인 세련미를 더해줍니다.",
      topNotes: "바이올렛 잎, 카다멈",
      middleNotes: "아이리스, 파피루스",
      baseNotes: "산탈, 오크우드, 시더우드, 레더",
      bestFor: "미니멀한 거실이나 원목 가구가 많은 인테리어 공간"
    }
  },
  {
    id: 15,
    name: "CEDARWOOD & VETIVER",
    brand: "Persona L Home",
    price: "₩125,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/063c8ab0-9dc6-45ca-8e30-1db0f9b1633a",
    tags: ["Space", "Vegan"],
    notes: "건조한 시더우드와 쌉싸름한 베티버가 빚어내는 이성적 고요함",
    family: "드라이 우디",
    category: "Space",
    details: {
      story: "새벽녘 숲의 차갑고 이성적인 무드를 담았습니다. 습기 없는 건조한 나무 향과 흙 내음이 어우러져 공간의 분위기를 차분하고 견고하게 잡아줍니다.",
      topNotes: "자몽, 핑크 페퍼",
      middleNotes: "시더우드, 제라늄",
      baseNotes: "베티버, 파출리, 벤조인",
      bestFor: "작업실, 오피스, 혹은 차가운 금속 소재가 쓰인 모던한 공간"
    }
  },
  {
    id: 16,
    name: "BERGAMOT & AMBER",
    brand: "Persona L Home",
    price: "₩155,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/5b34f7db-2991-4af2-a20e-80f99f6cef67",
    tags: ["Space", "For You"],
    notes: "밝은 베르가못과 따스한 앰버가 만드는 생동감 넘치는 온기",
    family: "앰버 시트러스",
    category: "Space",
    details: {
      story: "창가로 들어오는 햇살처럼 밝고 긍정적인 기운을 줍니다. 시트러스의 화사함이 앰버의 포근함과 만나, 공간 전체를 생기 있게 깨워줍니다.",
      topNotes: "칼라브리아 베르가못, 라임",
      middleNotes: "오렌지 블라썸, 릴리 오브 더 밸리",
      baseNotes: "앰버, 샌달우드, 라이트 머스크",
      bestFor: "채광이 좋은 거실이나 주방 등 활기찬 에너지가 필요한 곳"
    }
  },
  {
    id: 17,
    name: "AZURE WAVE",
    brand: "Persona L",
    price: "₩215,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/5b34f7db-2991-4af2-a20e-80f99f6cef67",
    tags: ["Vegan"],
    notes: "지중해의 푸른 파도와 소금기 머금은 시원한 바다 바람",
    family: "아쿠아틱 마린",
    category: "Personal",
    details: {
      story: "끝없이 펼쳐진 수평선을 바라보며 느끼는 자유로움을 담았습니다. 시원한 마린 노트가 일상의 답답함을 깨끗하게 씻어내 줍니다.",
      topNotes: "씨 솔트, 자몽, 네롤리",
      middleNotes: "로즈마리, 세이지, 해조류",
      baseNotes: "암브록산, 시더우드, 머스크",
      bestFor: "한여름의 화이트 린넨 셔츠 룩이나 휴양지에서의 여유로운 오후"
    }
  },
  {
    id: 18,
    name: "VELVET FIG",
    brand: "Persona L",
    price: "₩255,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/027e55d5-14d5-40ba-8d75-cd6c4ac801ea",
    tags: ["For You", "Eco"],
    notes: "잘 익은 무화과의 달콤함과 잎사귀의 쌉싸름한 그린 노트",
    family: "프루티 우디",
    category: "Personal",
    details: {
      story: "무화과 나무 아래서 느끼는 오후의 나른함을 표현했습니다. 과육의 달콤함과 나무껍질의 거친 질감이 오묘한 조화를 이룹니다.",
      topNotes: "무화과 잎, 핑크 페퍼",
      middleNotes: "무화과 과육, 아이리스, 코코넛",
      baseNotes: "시더우드, 샌달우드, 통카빈",
      bestFor: "세련되면서도 흔하지 않은 나만의 개성을 드러내고 싶을 때"
    }
  },
  {
    id: 19,
    name: "MORNING MOSS",
    brand: "Persona L",
    price: "₩230,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/7af9f3db-b41a-4dcb-9e81-b7b140c0b668",
    tags: ["Eco", "Vegan"],
    notes: "비 온 뒤 숲속의 젖은 흙과 이끼가 만드는 원초적인 생명력",
    family: "그린 어시",
    category: "Personal",
    details: {
      story: "이른 아침, 아무도 밟지 않은 숲길을 걷는 듯한 신선한 충격을 줍니다. 자연의 날것 그대로의 향기가 마음의 안정을 찾아줍니다.",
      topNotes: "갈바넘, 베르가못",
      middleNotes: "바이올렛 잎, 자스민, 제라늄",
      baseNotes: "오크모스, 파출리, 베티버",
      bestFor: "비 오는 날의 차분한 분위기나 자연주의 라이프스타일을 추구하는 분"
    }
  },
  {
    id: 20,
    name: "SPICED VANILLA",
    brand: "Persona L",
    price: "₩275,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/1dcd2cd9-baa1-4386-bfc6-e1e8f5378186",
    tags: ["For You"],
    notes: "관능적인 바닐라와 시나몬 스파이스가 빚어내는 포근한 온기",
    family: "구르망 스파이시",
    category: "Personal",
    details: {
      story: "따뜻한 벽난로 옆에서 마시는 향기로운 차 한 잔의 여유를 담았습니다. 달콤하면서도 알싸한 향기가 당신을 부드럽게 감싸 안습니다.",
      topNotes: "시나몬, 카다멈, 정향",
      middleNotes: "바닐라 빈, 헬리오트로프",
      baseNotes: "벤조인, 화이트 머스크, 캐시미어 우드",
      bestFor: "쌀쌀한 가을과 겨울, 오버사이즈 코트와 함께 연출하는 포근한 무드"
    }
  },
  {
    id: 21,
    name: "MIDNIGHT JASMINE",
    brand: "Persona L Home",
    price: "₩135,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/943ee401-aaf0-40cc-be6d-9f3e088434a1",
    tags: ["Space", "Vegan"],
    notes: "어둠이 내린 정원에서 피어나는 자스민의 은밀하고 매혹적인 향",
    family: "화이트 플로랄",
    category: "Space",
    details: {
      story: "밤에만 꽃을 피우는 자스민의 고혹적인 향기를 공간에 채워보세요. 일상의 평범한 공간이 순식간에 비밀스러운 정원으로 변모합니다.",
      topNotes: "일랑일랑, 베르가못",
      middleNotes: "자스민 삼박, 튜베로즈",
      baseNotes: "화이트 머스크, 앰버",
      bestFor: "침실이나 욕실 등 프라이빗하고 로맨틱한 분위기가 필요한 공간"
    }
  },
  {
    id: 22,
    name: "LEATHER & OUD",
    brand: "Persona L Home",
    price: "₩175,000",
    size: "200 G",
    image: "https://github.com/user-attachments/assets/b4a6280a-7608-437b-9b6e-0461189b3b96",
    tags: ["Space", "For You"],
    notes: "묵직한 가죽의 질감과 귀한 침향이 만드는 압도적인 무게감",
    family: "레더 오리엔탈",
    category: "Space",
    details: {
      story: "클래식한 서재나 가죽 소파가 있는 거실에 완벽하게 어울립니다. 시간이 멈춘 듯한 고요함과 중후한 멋을 공간에 선사합니다.",
      topNotes: "사프란, 블랙 페퍼",
      middleNotes: "레더 어코드, 로즈우드",
      baseNotes: "오드(Oud), 파출리, 샌달우드",
      bestFor: "지적이고 권위 있는 분위기를 연출하고 싶은 오피스나 서재"
    }
  },
  {
    id: 23,
    name: "CASSIS GARDEN",
    brand: "Persona L Home",
    price: "₩145,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/c29216a4-306f-449e-a5ed-94c890196655",
    tags: ["Space", "Eco"],
    notes: "블랙커런트 잎의 싱그러움과 장미 정원의 우아한 조화",
    family: "프루티 플로랄",
    category: "Space",
    details: {
      story: "강가 옆의 푸른 정원을 걷는 듯한 생동감을 줍니다. 상큼한 블랙커런트와 우아한 장미 향이 조화롭게 섞여 공간을 화사하게 만듭니다.",
      topNotes: "블랙커런트 잎, 베르가못",
      middleNotes: "불가리안 로즈, 제라늄",
      baseNotes: "머스크, 시더우드",
      bestFor: "가족들이 모이는 거실이나 활기찬 아침을 맞이하는 주방"
    }
  },
  {
    id: 24,
    name: "TOBACCO & HONEY",
    brand: "Persona L Home",
    price: "₩165,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/681b7e90-2a76-4719-b7f0-78902566f68b",
    tags: ["Space", "Vegan"],
    notes: "쌉싸름한 타바코 잎과 달콤한 꿀이 만드는 짙은 잔향",
    family: "오리엔탈 구르망",
    category: "Space",
    details: {
      story: "달콤함과 쌉싸름함이 공존하는 양면적인 매력을 가졌습니다. 공간에 깊이감을 더해주며 잊히지 않는 강렬한 인상을 남깁니다.",
      topNotes: "허니, 진저",
      middleNotes: "타바코 잎, 아이리스",
      baseNotes: "바닐라, 카카오, 우디 노트",
      bestFor: "라운지 바처럼 세련되고 힙한 무드를 원하는 공간"
    }
  },
];
