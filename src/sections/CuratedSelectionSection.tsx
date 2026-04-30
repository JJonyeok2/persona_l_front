/**
 * @file CuratedSelectionSection.tsx
 * @description 사용자 맞춤형 추천 제품 리스트를 보여주는 섹션입니다.
 * 필터링 기능(전체, 맞춤, 비건, 에코)과 제품 호버 효과를 포함합니다.
 */

import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

/**
 * 필터 종류 및 타입 정의
 */
const filters = ["All", "For You", "Space", "Vegan", "Eco"] as const;
type Filter = (typeof filters)[number];

/**
 * 향수 및 공간 향기 제품 데이터베이스
 */
const products: {
  id: number;
  name: string;
  brand: string;
  price: string;
  size: string;
  image: string;
  tags: Filter[];
  notes: string; // 향수/공간 향기 노트 설명
  family: string; // 향기 계열
  featured?: boolean; // 추천 강조 여부
  category: "Personal" | "Space";
}[] = [
  {
    id: 1,
    name: "Noir Absolu",
    brand: "Persona L",
    price: "₩285,000",
    size: "100 ML",
    image: "/product_1.jpg",
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
    image: "/product_2.jpg",
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
    image: "/product_3.jpg",
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
    image: "/product_4.jpg",
    tags: ["Vegan", "Eco"],
    notes: "탑: 화이트 티, 베르가못 / 미들: 백목련, 라일락 / 베이스: 화이트 머스크, 캐시미어",
    family: "플로랄 프레시",
    category: "Personal",
  },
  {
    id: 9,
    name: "Sun-drenched Wood",
    brand: "Persona L Home",
    price: "₩145,000",
    size: "250 ML",
    image: "/product_1.jpg",
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
    image: "/product_2.jpg",
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
    image: "/product_3.jpg",
    tags: ["Space", "Vegan"],
    notes: "탑: 유칼립투스, 오존 / 미들: 라벤더, 물보라 / 베이스: 참나무 이끼",
    family: "프레시 오조닉",
    category: "Space",
  },
  {
    id: 5,
    name: "Verde Breeze",
    brand: "Persona L",
    price: "₩195,000",
    size: "50 ML",
    image: "/product_1.jpg",
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
    image: "/product_2.jpg",
    tags: ["For You"],
    notes: "탑: 알데하이드, 핑크 페퍼 / 미들: 아이리스, 로즈 / 베이스: 화이트 머스크, 샌달우드",
    family: "머스크 파우더리",
    category: "Personal",
  },
];

export default function CuratedSelectionSection({ results }: { results?: any }) {
  const { ref, isVisible } = useIntersectionObserver();
  
  // 메인 카테고리 상태 (Personal vs Space)
  const [activeCategory, setActiveCategory] = useState<"Personal" | "Space">("Personal");
  
  // 현재 선택된 서브 필터 상태
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  // 인터뷰 결과에 따라 자동으로 카테고리 전환
  useEffect(() => {
    if (results?.type) {
      const targetCat = results.type === "personal" ? "Personal" : "Space";
      setActiveCategory(targetCat as "Personal" | "Space");
      setActiveFilter("For You"); // 결과가 있으면 '맞춤' 필터를 기본으로 보여줌
    }
  }, [results]);
  
  // 현재 마우스 호버 중인 제품 ID
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // 카테고리 전환 핸들러
  const handleCategoryChange = (cat: "Personal" | "Space") => {
    setActiveCategory(cat);
    setActiveFilter("All"); // 카테고리 변경 시 필터 초기화
  };

  // 1차 필터링: 카테고리 (Personal / Space)
  const categoryFiltered = products.filter((p) => p.category === activeCategory);

  // 2차 필터링: 서브 필터 (All, For You, Vegan, Eco)
  const filtered =
    activeFilter === "All"
      ? categoryFiltered
      : categoryFiltered.filter((p) => p.tags.includes(activeFilter));

  // 현재 카테고리에 유효한 서브 필터 리스트 (Space 카테고리일 때는 'Space' 필터 제외 등)
  const availableFilters = filters.filter(f => {
    if (activeCategory === "Personal") return f !== "Space";
    if (activeCategory === "Space") return f !== "Space"; // Space 카테고리 자체이므로 중복 필터 제외
    return true;
  });

  return (
    <section id="curated" className="bg-[#F7F7F7] py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* 섹션 헤더 */}
        <div ref={ref} className={`mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="label-upper text-wood/40 mb-4">Curated Selection</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-12">
            당신을 위한 향기 큐레이션
          </h2>

          {/* 메인 카테고리 스위치 (Tab 스타일) */}
          <div className="flex border-b border-wood/10 mb-10">
            <button
              onClick={() => handleCategoryChange("Personal")}
              className={`px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 relative ${
                activeCategory === "Personal" ? "text-wood" : "text-wood/30 hover:text-wood/60"
              }`}
            >
              Personal Scent
              {activeCategory === "Personal" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood animate-in fade-in slide-in-from-left-4" />
              )}
            </button>
            <button
              onClick={() => handleCategoryChange("Space")}
              className={`px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 relative ${
                activeCategory === "Space" ? "text-wood" : "text-wood/30 hover:text-wood/60"
              }`}
            >
              Space Scent
              {activeCategory === "Space" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood animate-in fade-in slide-in-from-left-4" />
              )}
            </button>
          </div>

          {/* 서브 필터 버튼 그룹 */}
          <div className="flex items-center gap-6">
            {availableFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 pb-2 ${
                  activeFilter === f ? "text-wood" : "text-wood/40 hover:text-wood/70"
                }`}
              >
                {f === "All" ? "전체" : f === "For You" ? "맞춤" : f === "Vegan" ? "비건" : "에코"}
                {activeFilter === f && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-wood rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 제품 그리드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((product, i) => {
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  // 제품 카드가 순차적으로 나타나는 애니메이션 설정
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 100}ms`,
                }}
              >
                {/* 이미지 박스 및 호버 오버레이 */}
                <div className="relative bg-cream overflow-hidden aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-600 ${
                      isHovered ? "scale-[1.03]" : "scale-100"
                    }`}
                  />
                  {/* 마우스 호버 시 나타나는 상세 노트 정보 */}
                  <div
                    className={`absolute inset-0 bg-wood/40 flex flex-col justify-end p-5 md:p-6 transition-opacity duration-400 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-cream/80 text-[12px] leading-relaxed mb-2">{product.notes}</p>
                    <p className="text-cream text-[10px] font-medium uppercase tracking-widest">{product.family}</p>
                  </div>
                  {/* 제품 태그 (맞춤, 비건 등) */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[9px] font-medium uppercase tracking-wider px-2 py-1 ${
                          tag === "Space" ? "bg-wood text-cream" : "bg-cream/90 text-wood"
                        }`}
                      >
                        {tag === "For You" ? "맞춤" : tag === "Vegan" ? "비건" : tag === "Space" ? "공간" : "에코"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 하단 제품 정보 정보 (브랜드, 이름, 가격 등) */}
                <div className="pt-4 pb-2">
                  <p className="text-[11px] uppercase tracking-widest text-wood/40 mb-1">{product.brand}</p>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[15px] font-medium">{product.name}</h3>
                    <p className="text-[13px] text-wood/60">{product.price}</p>
                  </div>
                  <p className="text-[11px] text-wood/40 mt-1">{product.size}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
