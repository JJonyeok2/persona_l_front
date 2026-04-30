/**
 * @file ProductCard.tsx
 * @description 큐레이션 섹션에서 개별 제품의 정보를 표시하는 카드 컴포넌트입니다.
 * 마우스 호버 시 상세 노트를 보여주는 효과와 반응형 애니메이션을 포함합니다.
 */

import { useState } from "react";
import type { Product } from "@/data/productData";

interface ProductCardProps {
  /** 카드에 표시할 제품 객체 */
  product: Product;
  /** 섹션의 가시성 상태 (애니메이션 트리거용) */
  isVisible: boolean;
  /** 그리드 내에서의 인덱스 (순차적 등장 애니메이션 딜레이용) */
  index: number;
  /** 클릭 시 호출될 핸들러 */
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, isVisible, index, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(product)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 80}ms`,
      }}
    >
      <div className="relative bg-cream overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-wood/40 flex flex-col justify-end p-5 md:p-6 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-cream/90 text-[12px] leading-relaxed mb-2 break-keep">{product.notes}</p>
          <p className="text-cream text-[10px] font-medium uppercase tracking-widest">{product.family}</p>
        </div>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-medium uppercase tracking-wider px-2 py-1 bg-cream/90 text-wood"
            >
              {tag === "For You" ? "맞춤" : tag === "Vegan" ? "비건" : tag === "Eco" ? "에코" : tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 md:mt-5 px-1 text-wood">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-wood/40 mb-1">{product.brand}</p>
            <h4 className="text-[14px] md:text-[15px] font-medium">{product.name}</h4>
          </div>
          <p className="text-[13px] md:text-[14px] font-light">{product.price}</p>
        </div>
        <p className="text-[11px] text-wood/40 mt-1">{product.size}</p>
      </div>
    </div>
  );
}
