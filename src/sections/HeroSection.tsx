/**
 * @file HeroSection.tsx
 * @description 사이트의 첫 인상을 결정하는 메인 히어로 섹션입니다.
 * 배경 이미지, 중앙 로고 애니메이션, 그리고 AI 인터뷰로 유도하는 플로팅 카드를 포함합니다.
 */

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  // 스크롤 시 중앙 로고가 나타나는 애니메이션을 위해 옵저버 사용
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 배경 이미지 영역 */}
      <div className="absolute inset-0">
        <img
          src="/hero_bg.jpg"
          alt="Persona L"
          className="w-full h-full object-cover"
        />
        {/* 이미지 위에 겹쳐지는 그라데이션 오버레이: 상단/중단/하단의 명도를 조절하여 텍스트 가독성 확보 */}
        <div className="absolute inset-0 bg-gradient-to-b from-wood/40 via-wood/10 to-wood/70" />
      </div>

      {/* 중앙 로고 및 서브타이틀 영역 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1
          ref={ref}
          className={`text-cream text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.08em] uppercase transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" // 아래에서 위로 나타나는 페이드 효과
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        >
          Persona L
        </h1>
        <p 
          className={`text-cream/60 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mt-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" // 로고보다 300ms 늦게 나타남
          }`}
        >
          Your Style, Translated into Scent
        </p>
      </div>

      {/* 우측 하단 플로팅 액션 카드 (CTA: Call to Action) */}
      <a
        href="#interview"
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 group z-20"
      >
        <div className="bg-wood/40 backdrop-blur-md p-4 md:p-5 w-[280px] md:w-[320px] border border-cream/10 shadow-2xl hover:shadow-editorial transition-all duration-400 hover:-translate-y-1">
          <div className="flex gap-4">
            {/* 카드 내 썸네일 이미지 */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-cream/10 flex-shrink-0 overflow-hidden">
              <img
                src="/product_1.jpg"
                alt="Personal Consultation"
                className="w-full h-full object-cover mix-blend-lighten opacity-90"
              />
            </div>
            {/* 카드 텍스트 콘텐츠 */}
            <div className="flex flex-col justify-between py-0.5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-cream/60 mb-1">
                  Private Consultation
                </p>
                <p className="text-sm font-medium leading-snug text-cream">
                  당신의 스타일 실루엣을
                  <br />
                  후각적 언어로 번역해 드립니다
                </p>
              </div>
              {/* 시작하기 링크 버튼 */}
              <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-white/70 group-hover:text-white transition-colors duration-300">
                <span>시작하기</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* 중앙 하단 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] font-medium uppercase tracking-widest text-cream/60">
          Scroll
        </span>
        <div className="w-px h-10 bg-cream/30 overflow-hidden">
          {/* 수직으로 박동하는 애니메이션 라인 */}
          <div className="w-full h-full bg-cream origin-top animate-pulse-line" />
        </div>
      </div>
    </section>
  );
}
