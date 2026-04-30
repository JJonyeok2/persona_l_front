/**
 * @file InsightReportSection.tsx
 * @description AI 인터뷰 결과를 바탕으로 사용자의 향기 아우라를 분석하여 시각화해 주는 섹션입니다.
 * 방사형 차트(Radar Chart)와 분석 로직, 유사 아우라 정보를 포함합니다.
 */

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import { Plus, Equal } from "lucide-react";

/**
 * 방사형 차트용 데이터 (향기 노트별 분석 수치)
 */
const radarData = [
  { axis: "플로랄", value: 0.3 },
  { axis: "우디", value: 0.75 },
  { axis: "오리엔탈", value: 0.45 },
  { axis: "프레시", value: 0.6 },
  { axis: "구르망", value: 0.2 },
];

/**
 * 유사한 스타일의 페르소나 데이터
 */
const auras = [
  { name: "어반 미니멀리스트", match: 94, image: "/persona_1.jpg" },
  { name: "아방가르드 크리에이터", match: 87, image: "/persona_2.jpg" },
  { name: "내추럴 컨템플레이터", match: 81, image: "/persona_3.jpg" },
];

/**
 * @component RadarChart
 * @description SVG를 이용해 직접 구현한 커스텀 방사형(레이더) 차트 컴포넌트입니다.
 */
function RadarChart({ forceDraw }: { forceDraw?: boolean }) {
  const { ref, isVisible } = useIntersectionObserver();
  const [drawn, setDrawn] = useState(false);

  // 화면에 차트가 나타나거나 강제 그리기 활성화 시 애니메이션 시작
  useEffect(() => {
    if (isVisible || forceDraw) {
      const timer = setTimeout(() => setDrawn(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, forceDraw]);

  const size = 280; // 차트 캔버스 크기
  const center = size / 2; // 중심점 좌표
  const radius = 100; // 최대 반지름
  const angleStep = (Math.PI * 2) / radarData.length; // 각 축 사이의 각도

  /**
   * 인덱스와 값을 기반으로 SVG 좌표 계산
   */
  const getPoint = (i: number, value: number) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + radius * value * Math.cos(angle),
      y: center + radius * value * Math.sin(angle),
    };
  };

  // 데이터 폴리곤의 points 속성 문자열 생성
  const polygonPoints = radarData
    .map((d, i) => {
      const p = getPoint(i, d.value);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* 그리드 가이드 원들 (배경선) */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={radius * r}
            fill="none"
            stroke="rgba(107, 68, 35, 0.08)"
            strokeWidth={1}
          />
        ))}
        {/* 축 라인들 */}
        {radarData.map((_, i) => {
          const p = getPoint(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(107, 68, 35, 0.08)"
              strokeWidth={1}
            />
          );
        })}
        {/* 데이터 영역 폴리곤 */}
        <polygon
          points={polygonPoints}
          fill="rgba(107, 68, 35, 0.06)"
          stroke="#6B4423"
          strokeWidth={1.5}
          className={`transition-all duration-1000 ${drawn ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        />
        {/* 각 꼭짓점 데이터 포인트 */}
        {radarData.map((d, i) => {
          const p = getPoint(i, d.value);
          return (
            <circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="#6B4423"
              className={`transition-all duration-500 ${drawn ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            />
          );
        })}
        {/* 축 라벨 (플로랄, 우디 등) */}
        {radarData.map((d, i) => {
          const p = getPoint(i, 1.18);
          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] fill-wood/50 uppercase tracking-wider"
            >
              {d.axis}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function InsightReportSection({ results }: { results?: any }) {
  const { ref: ref1, isVisible: vis1 } = useIntersectionObserver();
  const { ref: ref2, isVisible: vis2 } = useIntersectionObserver();
  const { ref: ref3, isVisible: vis3 } = useIntersectionObserver();
  const { ref: ref4, isVisible: vis4 } = useIntersectionObserver();

  // 사용자의 선택에 따른 가변적인 로직 생성
  const dynamicLogicSteps = results?.type === "personal" ? [
    `${results.fashionStyle} 스타일 → 그에 어울리는 현대적 텍스처 치환`,
    `${results.personalMood} → 해당 분위기를 극대화하는 향기 노트 배합`,
    "지적인 아우라 → 드라이한 시더우드와 아이리스의 논리적 결합",
    "도시의 금속 질감 → 차가운 오조닉 노트와 스파이시한 블랙 페퍼 레이어링",
  ] : [];

  const dynamicSpaceLogicSteps = results?.type === "space" ? [
    `${results.spaceColor} 공간 → 해당 색감을 시각화하는 화이트 머스크 배합`,
    `${results.spaceTexture} 소재 → 공간의 무게감을 잡아주는 우디 노트`,
    `${results.spaceLight} 분위기 → 빛의 온기를 닮은 싱그러운 네롤리와 베르가못`,
    "미니멀한 가구 배치 → 여백의 미를 완성하는 투명한 오조닉 노트",
  ] : [];

  return (
    <section id="report" className="bg-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* 결과가 없을 때 보여줄 안내 문구 */}
        {!results && (
          <div className="max-w-2xl mx-auto text-center py-20 border border-wood/10 rounded-sm">
            <p className="text-wood/40 uppercase tracking-widest text-[11px] mb-4">Awaiting Analysis</p>
            <h2 className="text-2xl font-light mb-8 break-keep">AI 인터뷰를 완료하면 <br/> 당신만의 아우라 리포트가 생성됩니다.</h2>
            <a href="#interview" className="inline-block border border-wood/30 px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-wood hover:text-cream transition-all duration-400">
              인터뷰 시작하기
            </a>
          </div>
        )}

        {results && (
          <>
            {/* 섹션 타이틀 */}
            <div ref={ref1} className={`text-center mb-20 transition-all duration-800 ${vis1 || results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="label-upper text-wood/40 mb-4">Diagnosis Report</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight break-keep">
                {results.type === "personal" ? "당신의 아우라 진단" : "당신의 공간 진단"}
              </h2>
            </div>

            {/* 01. Personal Aura Section */}
            {results.type === "personal" && (
              <div className="mb-32 animate-in fade-in duration-1000">
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-wood/30">Personal Analysis</span>
                  <h3 className="text-xl font-light tracking-widest uppercase">Personal Aura</h3>
                  <div className="h-px bg-wood/10 flex-1" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                  {/* 좌측: 레이더 차트 및 상세 수치 */}
                  <div ref={ref2} className={`transition-all duration-800 delay-100 ${vis2 || results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-wood/40 mb-8 text-center">
                      Olfactory Silhouette
                    </p>
                    <RadarChart forceDraw={!!results} />
                    <div className="flex justify-center gap-8 mt-8">
                      {radarData.map((d) => (
                        <div key={d.axis} className="text-center">
                          <p className="text-lg font-light">{Math.round(d.value * 100)}%</p>
                          <p className="text-[10px] uppercase tracking-widest text-wood/40 mt-1">{d.axis}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 우측: 개인 번역 로직 및 조향사 노트 */}
                  <div ref={ref3} className={`transition-all duration-800 delay-200 ${vis3 || results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-wood/40 mb-8">
                      Personal Translation Logic
                    </p>
                    <div className="space-y-0">
                      {dynamicLogicSteps.map((step, i) => (
                        <div
                          key={i}
                          className="group py-5 border-b border-wood/10 flex items-start gap-4 hover:bg-wood/[0.01] transition-colors duration-300 px-2 -mx-2"
                        >
                          <span className="text-[11px] font-medium text-wood/30 mt-0.5 font-mono">
                            0{i + 1}
                          </span>
                          <p className="text-[15px] leading-relaxed text-wood/70 group-hover:text-wood transition-colors duration-300 break-keep">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 p-6 bg-wood/5 border-l-2 border-wood/20 italic">
                      <p className="text-[13px] text-wood/70 leading-relaxed break-keep">
                        "당신이 지향하는 {results.fashionStyle} 스타일과 {results.personalMood} 분위기를 현대적인 후각 언어로 치환했습니다. 
                        선택하신 무드가 어우러진 잔향은 당신의 아우라를 더욱 선명하게 완성할 것입니다."
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-wood/40 mt-4 not-italic">— Senior Perfumer L</p>
                    </div>
                  </div>
                </div>

                {/* Signature Layering Recipe Section */}
                <div className="mt-24 pt-24 border-t border-wood/10">
                  <div className="text-center mb-16">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-wood/30 mb-4">Signature Layering</p>
                    <h3 className="text-2xl font-light tracking-tight">나만의 시그니처 레이어링 레시피</h3>
                  </div>

                  <div className="bg-white/50 p-8 md:p-16 rounded-sm border border-wood/5 shadow-sm">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                      {/* 메인 향수 */}
                      <div className="flex-1 text-center">
                        <div className="aspect-[3/4] w-32 md:w-40 mx-auto bg-cream mb-6 overflow-hidden">
                          <img src="/product_1.jpg" alt="Main Scent" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-wood/40 mb-2">Main Fragrance</p>
                        <h4 className="text-lg font-medium">Noir Absolu</h4>
                      </div>

                      <Plus className="text-wood/20" size={24} strokeWidth={1} />

                      {/* 레이어링 액센트 */}
                      <div className="flex-1 text-center">
                        <div className="aspect-[3/4] w-32 md:w-40 mx-auto bg-cream mb-6 overflow-hidden">
                          <img src="/product_2.jpg" alt="Accent Scent" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-wood/40 mb-2">Layering Accent</p>
                        <h4 className="text-lg font-medium">Verde Breeze</h4>
                      </div>

                      <Equal className="text-wood/20" size={24} strokeWidth={1} />

                      {/* 결과 무드 */}
                      <div className="flex-[1.5] text-left lg:pl-12 border-l border-wood/5">
                        <div className="inline-block px-3 py-1 bg-wood text-cream text-[9px] uppercase tracking-widest mb-4">
                          New Aura Result
                        </div>
                        <h4 className="text-3xl font-light mb-6 tracking-tighter">새벽의 이슬 맺힌 숲</h4>
                        <p className="text-[15px] leading-relaxed text-wood/70 break-keep">
                          {results.fashionStyle} 스타일의 시크함 위에 Verde의 싱그러운 시트러스를 덧입혀보세요.
                          묵직한 우디 베이스가 중심을 잡아주면서도, 첫 향에서 터져 나오는 시트러스가 
                          당신의 분위기에 예상치 못한 생동감과 신비로운 여운을 더해줄 것입니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 02. Space Atmosphere Section */}
            {results.type === "space" && (
              <div className="mb-32 animate-in fade-in duration-1000">
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-wood/30">Space Analysis</span>
                  <h3 className="text-xl font-light tracking-widest uppercase">Space Atmosphere</h3>
                  <div className="h-px bg-wood/10 flex-1" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                  {/* 좌측: 공간 번역 로직 */}
                  <div ref={ref4} className={`transition-all duration-800 ${vis4 || results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-wood/40 mb-8">
                      Space Translation Logic
                    </p>
                    <div className="space-y-0">
                      {dynamicSpaceLogicSteps.map((step, i) => (
                        <div
                          key={i}
                          className="group py-5 border-b border-wood/10 flex items-start gap-4 hover:bg-wood/[0.01] transition-colors duration-300 px-2 -mx-2"
                        >
                          <span className="text-[11px] font-medium text-wood/30 mt-0.5 font-mono">
                            0{i + 1}
                          </span>
                          <p className="text-[15px] leading-relaxed text-wood/70 group-hover:text-wood transition-colors duration-300 break-keep">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 우측: 공간 진단 코멘트 */}
                  <div className={`transition-all duration-800 delay-200 ${vis4 || results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="p-8 md:p-12 bg-wood text-cream rounded-sm shadow-editorial">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cream/40 mb-6">Space Recommendation</p>
                      <h4 className="text-2xl font-light mb-6 leading-tight break-keep">
                        {results.spaceLight} <br/>
                        {results.spaceColor} {results.spaceTexture} 스튜디오
                      </h4>
                      <p className="text-[14px] leading-relaxed text-cream/70 mb-8 break-keep">
                        당신의 공간에서 느껴지는 {results.spaceColor}과 {results.spaceTexture}의 질감, 그리고 {results.spaceLight}은 
                        심리적인 안정감과 지적인 평온함을 동시에 제공합니다. <br/><br/>
                        이 공간에는 선택하신 무드가 어우러진 향기가 
                        마치 공기 중에 빛이 부서지는 듯한 느낌을 완성해 줄 것입니다.
                      </p>
                      <div className="pt-6 border-t border-cream/10">
                        <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-2">Recommended Category</p>
                        <p className="text-sm font-medium">Object Candle & Large Diffuser</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 하단: 유사한 아우라 추천 영역 */}
            <div className="border-t border-wood/10 pt-16">
              <p className="text-[11px] font-medium uppercase tracking-widest text-wood/40 mb-10 text-center">
                Similar Auras
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {auras.map((p, i) => (
                  <div
                    key={p.name}
                    className="group cursor-pointer"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {/* 이미지 박스 */}
                    <div className="aspect-square bg-stone-50 mb-5 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                      />
                    </div>
                    {/* 정보 텍스트 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[13px] font-medium">{p.name}</p>
                        <p className="text-[11px] text-wood/40 mt-0.5">스타일 유사도</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-light">{p.match}%</p>
                      </div>
                    </div>
                    {/* 진행 상태 바 스타일의 유사도 그래프 */}
                    <div className="w-full h-px bg-wood/5 mt-4 relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-wood/20 group-hover:bg-wood/40 transition-all duration-600"
                        style={{ width: `${p.match}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
