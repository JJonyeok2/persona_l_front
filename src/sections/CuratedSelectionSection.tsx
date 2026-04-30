/**
 * @file CuratedSelectionSection.tsx
 * @description 사용자 맞춤형 추천 제품 리스트를 보여주는 섹션입니다.
 * 필터링 기능(전체, 맞춤, 비건, 에코)과 제품 호버 효과를 포함합니다.
 */

import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ProductCard from "@/components/curated/ProductCard";
import ProductModal from "@/components/curated/ProductModal";
import { products } from "@/data/productData";
import type { Product } from "@/data/productData";

const filters = ["All", "For You", "Vegan", "Eco"] as const;
type Filter = (typeof filters)[number];

export default function CuratedSelectionSection({ results }: { results?: any }) {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState<"Personal" | "Space">("Personal");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (results?.type) {
      const targetCat = results.type === "personal" ? "Personal" : "Space";
      setActiveCategory(targetCat as "Personal" | "Space");
      setActiveFilter("For You");
    }
  }, [results]);

  const handleCategoryChange = (cat: "Personal" | "Space") => {
    setActiveCategory(cat);
    setActiveFilter("All");
  };

  const categoryFiltered = products.filter((p) => p.category === activeCategory);
  const filtered =
    activeFilter === "All"
      ? categoryFiltered
      : categoryFiltered.filter((p) => p.tags.includes(activeFilter as any));

  return (
    <section id="curated" className="bg-[#F7F7F7] py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`mb-12 md:mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="label-upper text-wood/40 mb-4">Curated Selection</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-10 md:mb-12 text-wood">
            당신을 위한 향기 큐레이션
          </h2>

          <div className="flex border-b border-wood/10 mb-8 md:mb-10 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleCategoryChange("Personal")}
              className={`px-6 md:px-8 py-4 text-[12px] md:text-sm font-medium tracking-widest uppercase transition-all duration-300 relative whitespace-nowrap ${
                activeCategory === "Personal" ? "text-wood" : "text-wood/30 hover:text-wood/60"
              }`}
            >
              Personal Scent
              {activeCategory === "Personal" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood" />
              )}
            </button>
            <button
              onClick={() => handleCategoryChange("Space")}
              className={`px-6 md:px-8 py-4 text-[12px] md:text-sm font-medium tracking-widest uppercase transition-all duration-300 relative whitespace-nowrap ${
                activeCategory === "Space" ? "text-wood" : "text-wood/30 hover:text-wood/60"
              }`}
            >
              Space Scent
              {activeCategory === "Space" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative text-[10px] md:text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 pb-2 whitespace-nowrap ${
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isVisible={isVisible} 
              index={i} 
              onClick={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* 제품 상세 모달 */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}
