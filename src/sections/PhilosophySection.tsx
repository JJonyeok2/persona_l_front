/**
 * @file PhilosophySection.tsx
 * @description 브랜드의 철학과 핵심 수치를 설명하는 섹션입니다.
 * 텍스트와 이미지를 교차 배치한 레이아웃과 등장 애니메이션을 포함합니다.
 */

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function PhilosophySection() {
  // 두 개의 서로 다른 시점에 애니메이션을 트리거하기 위해 두 개의 옵저버 사용
  const { ref: ref1, isVisible: vis1 } = useIntersectionObserver();
  const { ref: ref2, isVisible: vis2 } = useIntersectionObserver();

  return (
    <section id="philosophy" className="bg-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* 텍스트 블록 영역 (좌측/상단) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* 제목 영역: 페이드 업 애니메이션 */}
            <div ref={ref1} className={`transition-all duration-800 delay-100 ${vis1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="label-upper text-wood/40 mb-8">Our Philosophy</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15] tracking-tight mb-8">
                당신의 스타일과 공간은
                <br />
                이미 향기를 말하고 있습니다
              </h2>
            </div>
            
            {/* 본문 및 지표 영역: 제목보다 약간 늦게 나타나는 애니메이션 */}
            <div ref={ref2} className={`transition-all duration-800 delay-200 ${vis2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[15px] leading-[1.8] text-wood/60 mb-6 max-w-xl">
                단순 상품 검색을 넘어, 사용자가 추구하는 패션 스타일과 머무는 공간의 인테리어를 분석해<br/>
                최적의 향기를 논리적으로 연결해 주는 토탈 향기 컨설팅 경험을 제공합니다.<br/>
                AI는 전문 조향 지식과 환경 심리학을 결합하여 당신만의 완벽한 향기 세계관을 완성합니다.
              </p>
              
              {/* 핵심 지표 (Stats) 리스트 */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-light tracking-tight">50,000+</p>
                  <p className="text-[11px] uppercase tracking-widest text-wood/40 mt-1">향기 데이터</p>
                </div>
                <div className="w-px h-8 bg-wood/10" />
                <div>
                  <p className="text-2xl font-light tracking-tight">320+</p>
                  <p className="text-[11px] uppercase tracking-widest text-wood/40 mt-1">스타일 & 공간 아우라</p>
                </div>
                <div className="w-px h-8 bg-wood/10" />
                <div>
                  <p className="text-2xl font-light tracking-tight">98.7%</p>
                  <p className="text-[11px] uppercase tracking-widest text-wood/40 mt-1">만족도</p>
                </div>
              </div>
            </div>
          </div>

          {/* 이미지 영역 (우측/하단) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/philosophy_img.jpg"
                alt="Philosophy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
