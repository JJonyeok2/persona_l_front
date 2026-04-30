/**
 * @file productData.ts
 * @description 사이트에서 판매 및 추천하는 향수와 홈 프래그넌스 제품들의 데이터베이스입니다.
 * Personal(향수) 및 Space(디퓨저, 캔들 등) 카테고리로 구분됩니다.
 */

export const products = [
  {
    id: 1,
    name: "Noir Absolu",
    brand: "Persona L",
    price: "₩285,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/5d4c5ef1-a7ee-443d-810b-09c1aa90977e", // 향수 이미지 (9번)
    tags: ["For You", "Vegan"],
    notes: "탑: 베르가못, 핑크 페퍼 / 미들: 장미, 백합 / 베이스: 파출리, 앰버",
    family: "플로랄 우디",
    featured: true,
    category: "Personal",
  },
  {
    id: 2,
    name: "Amber Reserve",
    brand: "Persona L",
    price: "₩320,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/1dcd2cd9-baa1-4386-bfc6-e1e8f5378186", // 향수 이미지 (10번)
    tags: ["For You", "Eco"],
    notes: "탑: 사프란, 자스민 / 미들: 앰버, 시나몬 / 베이스: 바닐라, 샌달우드",
    family: "오리엔탈 스파이시",
    category: "Personal",
  },
  {
    id: 3,
    name: "Midnight Veil",
    brand: "Persona L",
    price: "₩265,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/943ee401-aaf0-40cc-be6d-9f3e088434a1", // 향수 이미지 (11번)
    tags: ["For You"],
    notes: "탑: 블랙 페퍼, 갈바넘 / 미들: 아이리스, 베티버 / 베이스: 머스크, 가이악",
    family: "어시 미네랄",
    featured: true,
    category: "Personal",
  },
  {
    id: 4,
    name: "Blanc Sillage",
    brand: "Persona L",
    price: "₩295,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/c29216a4-306f-449e-a5ed-94c890196655", // 향수 이미지 (12번)
    tags: ["Vegan", "Eco"],
    notes: "탑: 화이트 티, 베르가못 / 미들: 백목련, 라일락 / 베이스: 화이트 머스크, 캐시미어",
    family: "플로랄 프레시",
    category: "Personal",
  },
  {
    id: 5,
    name: "Verde Breeze",
    brand: "Persona L",
    price: "₩195,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/1512af21-6ab3-4700-93c8-188682843654", // 향수 이미지 (13번)
    tags: ["Eco"],
    notes: "탑: 레몬, 페퍼민트 / 미들: 그린 티, 바질 / 베이스: 시더우드, 베티버",
    family: "시트러스 허벌",
    category: "Personal",
  },
  {
    id: 6,
    name: "Velvet Skin",
    brand: "Persona L",
    price: "₩245,000",
    size: "50 ML",
    image: "https://github.com/user-attachments/assets/d28daa39-8231-4997-a12b-4d6980c70473", // 향수 이미지 (14번)
    tags: ["For You"],
    notes: "탑: 알데하이드, 핑크 페퍼 / 미들: 아이리스, 로즈 / 베이스: 화이트 머스크, 샌달우드",
    family: "머스크 파우더리",
    category: "Personal",
  },
  {
    id: 7,
    name: "Ancient Library",
    brand: "Persona L",
    price: "₩310,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/b4a6280a-7608-437b-9b6e-0461189b3b96", // 향수 이미지 (15번)
    tags: ["For You", "Vegan"],
    notes: "탑: 블랙 페퍼, 가죽 / 미들: 파피루스, 시더우드 / 베이스: 앰버, 파출리",
    family: "레더 우디",
    category: "Personal",
  },
  {
    id: 8,
    name: "Herbal Sage",
    brand: "Persona L",
    price: "₩215,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/7af9f3db-b41a-4dcb-9e81-b7b140c0b668", // 향수 이미지 (16번)
    tags: ["Vegan", "Eco"],
    notes: "탑: 클라리 세이지, 베르가못 / 미들: 라벤더, 로즈마리 / 베이스: 참나무 이끼, 머스크",
    family: "아로마틱 푸제르",
    category: "Personal",
  },
  {
    id: 9,
    name: "Sun-drenched Wood",
    brand: "Persona L Home",
    price: "₩145,000",
    size: "250 ML",
    image: "https://github.com/user-attachments/assets/027e55d5-14d5-40ba-8d75-cd6c4ac801ea", // 디퓨저 이미지 (1번)
    tags: ["Space", "For You"],
    notes: "탑: 베르가못, 만다린 / 미들: 코튼, 화이트 티 / 베이스: 샌달우드, 화이트 머스크",
    family: "화이트 우디 시트러스",
    category: "Space",
    featured: true,
  },
  {
    id: 10,
    name: "Minimalist Studio",
    brand: "Persona L Home",
    price: "₩85,000",
    size: "200 G",
    image: "https://github.com/user-attachments/assets/1c163ba8-320b-4d25-80fc-6c2f61a44323", // 디퓨저 이미지 (2번)
    tags: ["Space", "Eco"],
    notes: "탑: 알데하이드 / 미들: 아이리스, 화이트 린넨 / 베이스: 시더우드, 앰버",
    family: "알데하이딕 파우더리",
    category: "Space",
  },
  {
    id: 11,
    name: "Morning Mist Spray",
    brand: "Persona L Home",
    price: "₩65,000",
    size: "100 ML",
    image: "https://github.com/user-attachments/assets/681b7e90-2a76-4719-b7f0-78902566f68b", // 디퓨저 이미지 (3번)
    tags: ["Space", "Vegan"],
    notes: "탑: 유칼립투스, 오존 / 미들: 라벤더, 물보라 / 베이스: 참나무 이끼",
    family: "프레시 오조닉",
    category: "Space",
  },
  {
    id: 12,
    name: "Midnight Candle",
    brand: "Persona L Home",
    price: "₩75,000",
    size: "180 G",
    image: "https://github.com/user-attachments/assets/1a7300d2-f569-4339-9dee-b107adecdb91", // 디퓨저 이미지 (4번)
    tags: ["Space", "For You"],
    notes: "탑: 블랙 티, 담배 / 미들: 시더우드, 인센스 / 베이스: 가죽, 머스크",
    family: "스모키 우디",
    category: "Space",
  },
  {
    id: 13,
    name: "Citrus Room Spray",
    brand: "Persona L Home",
    price: "₩55,000",
    size: "150 ML",
    image: "https://github.com/user-attachments/assets/c9950bcd-dc5d-49c9-8153-5e8ac3299158", // 디퓨저 이미지 (5번)
    tags: ["Space", "Eco"],
    notes: "탑: 자몽, 베르가못 / 미들: 바질, 릴리 / 베이스: 베티버",
    family: "시트러스 그린",
    category: "Space",
  },
];
