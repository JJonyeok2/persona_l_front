/**
 * @file LayeringRecipe.tsx
 * @description 퍼스널 향수 분석 결과에 따라 두 가지 향수를 조합하는 레시피를 보여주는 컴포넌트입니다.
 * A + B = Result 도식을 통해 레이어링의 시너지 효과를 시각화합니다.
 */

import { Plus, Equal } from "lucide-react";

interface LayeringRecipeProps {
  /** 사용자가 선택한 패션 스타일 키워드 (설명 문구에 포함됨) */
  fashionStyle: string;
}

export default function LayeringRecipe({ fashionStyle }: LayeringRecipeProps) {
  return (
    <div className="mt-24 pt-24 border-t border-wood/10">
      <div className="text-center mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wood/30 mb-4">Signature Layering</p>
        <h3 className="text-2xl font-light tracking-tight text-wood">나만의 시그니처 레이어링 레시피</h3>
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-8 sm:p-12 md:p-16 rounded-sm border border-wood/5 shadow-sm text-wood">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          <div className="flex flex-row items-center justify-center gap-6 sm:gap-12 lg:flex-1">
            {/* 메인 향수 (Base) */}
            <div className="text-center">
              <div className="aspect-[3/4] w-24 sm:w-32 md:w-40 mx-auto bg-cream mb-4 sm:mb-6 overflow-hidden">
                <img src="/product_1.jpg" alt="Main Scent" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-wood/40 mb-1">Main</p>
              <h4 className="text-sm sm:text-base md:text-lg font-medium line-clamp-1">Noir Absolu</h4>
            </div>

            <Plus className="text-wood/20 flex-shrink-0" size={20} strokeWidth={1} />

            {/* 레이어링 액센트 (Accent) */}
            <div className="text-center">
              <div className="aspect-[3/4] w-24 sm:w-32 md:w-40 mx-auto bg-cream mb-4 sm:mb-6 overflow-hidden">
                <img src="/product_2.jpg" alt="Accent Scent" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-wood/40 mb-1">Accent</p>
              <h4 className="text-sm sm:text-base md:text-lg font-medium line-clamp-1">Verde Breeze</h4>
            </div>
          </div>

          <div className="hidden lg:block">
            <Equal className="text-wood/20" size={24} strokeWidth={1} />
          </div>
          <div className="lg:hidden w-full h-px bg-wood/10" />

          {/* 결과 무드 (Outcome) */}
          <div className="flex-[1.2] text-left lg:pl-12 lg:border-l border-wood/5">
            <div className="inline-block px-3 py-1 bg-wood text-cream text-[9px] uppercase tracking-widest mb-4">
              New Aura Result
            </div>
            <h4 className="text-2xl sm:text-3xl font-light mb-6 tracking-tighter">새벽의 이슬 맺힌 숲</h4>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-wood/70 break-keep">
              {fashionStyle} 스타일의 시크함 위에 Verde의 싱그러운 시트러스를 덧입혀보세요.
              우디 베이스가 중심을 잡아주며, 첫 향의 시트러스가 
              당신의 분위기에 생동감과 신비로운 여운을 더해줄 것입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
