import { useState } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  size: string;
  image: string;
  notes: string;
  family: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  isVisible: boolean;
  index: number;
}

export default function ProductCard({ product, isVisible, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className="mt-4 md:mt-5 px-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-wood/40 mb-1">{product.brand}</p>
            <h4 className="text-[14px] md:text-[15px] font-medium text-wood">{product.name}</h4>
          </div>
          <p className="text-[13px] md:text-[14px] font-light text-wood">{product.price}</p>
        </div>
        <p className="text-[11px] text-wood/40 mt-1">{product.size}</p>
      </div>
    </div>
  );
}
