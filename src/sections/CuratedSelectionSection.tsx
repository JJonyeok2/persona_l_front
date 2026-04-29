import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const filters = ["All", "For You", "Vegan", "Eco"] as const;
type Filter = (typeof filters)[number];

const products: {
  id: number;
  name: string;
  brand: string;
  price: string;
  size: string;
  image: string;
  tags: Filter[];
  notes: string;
  family: string;
  featured?: boolean;
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
  },
  {
    id: 7,
    name: "Ancient Library",
    brand: "Persona L",
    price: "₩310,000",
    size: "100 ML",
    image: "/product_3.jpg",
    tags: ["For You", "Vegan"],
    notes: "탑: 블랙 페퍼, 가죽 / 미들: 파피루스, 시더우드 / 베이스: 앰버, 파출리",
    family: "레더 우디",
  },
  {
    id: 8,
    name: "Herbal Sage",
    brand: "Persona L",
    price: "₩215,000",
    size: "100 ML",
    image: "/product_4.jpg",
    tags: ["Vegan", "Eco"],
    notes: "탑: 클라리 세이지, 베르가못 / 미들: 라벤더, 로즈마리 / 베이스: 참나무 이끼, 머스크",
    family: "아로마틱 푸제르",
  },
];

export default function CuratedSelectionSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="curated" className="bg-[#F7F7F7] py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div ref={ref} className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="label-upper text-wood/40 mb-4">Curated Selection</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
              당신을 위한 향기
            </h2>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-6">
            {filters.map((f) => (
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

        {/* Editorial grid */}
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
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 100}ms`,
                }}
              >
                <div className="relative bg-cream overflow-hidden aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-600 ${
                      isHovered ? "scale-[1.03]" : "scale-100"
                    }`}
                  />
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-wood/40 flex flex-col justify-end p-5 md:p-6 transition-opacity duration-400 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-cream/80 text-[12px] leading-relaxed mb-2">{product.notes}</p>
                    <p className="text-cream text-[10px] font-medium uppercase tracking-widest">{product.family}</p>
                  </div>
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-medium uppercase tracking-wider bg-cream/90 px-2 py-1"
                      >
                        {tag === "For You" ? "맞춤" : tag === "Vegan" ? "비건" : "에코"}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Product info */}
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
