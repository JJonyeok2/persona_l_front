import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";

const radarData = [
  { axis: "플로랄", value: 0.3 },
  { axis: "우디", value: 0.75 },
  { axis: "오리엔탈", value: 0.45 },
  { axis: "프레시", value: 0.6 },
  { axis: "구르망", value: 0.2 },
];

const auras = [
  { name: "어반 미니멀리스트", match: 94, image: "/persona_1.jpg" },
  { name: "아방가르드 크리에이터", match: 87, image: "/persona_2.jpg" },
  { name: "내추럴 컨템플레이터", match: 81, image: "/persona_3.jpg" },
];

const logicSteps = [
  "미니멀 실루엣 → 투명하고 정제된 알데하이드 노트 치환",
  "서늘한 공간의 온도 → 메탈릭한 실버 앰버와 화이트 티 배합",
  "지적인 아우라 → 드라이한 시더우드와 아이리스의 논리적 결합",
  "도시의 금속 질감 → 차가운 오조닉 노트와 스파이시한 블랙 페퍼 레이어링",
];

function RadarChart() {
  const { ref, isVisible } = useIntersectionObserver();
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setDrawn(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const size = 280;
  const center = size / 2;
  const radius = 100;
  const angleStep = (Math.PI * 2) / radarData.length;

  const getPoint = (i: number, value: number) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + radius * value * Math.cos(angle),
      y: center + radius * value * Math.sin(angle),
    };
  };

  const polygonPoints = radarData
    .map((d, i) => {
      const p = getPoint(i, d.value);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
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
        {/* Axis lines */}
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
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(107, 68, 35, 0.06)"
          stroke="#6B4423"
          strokeWidth={1.5}
          className={`transition-all duration-1000 ${drawn ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        />
        {/* Data points */}
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
        {/* Labels */}
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

export default function InsightReportSection() {
  const { ref: ref1, isVisible: vis1 } = useIntersectionObserver();
  const { ref: ref2, isVisible: vis2 } = useIntersectionObserver();
  const { ref: ref3, isVisible: vis3 } = useIntersectionObserver();

  return (
    <section id="report" className="bg-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div ref={ref1} className={`text-center mb-20 transition-all duration-800 ${vis1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="label-upper text-wood/40 mb-4">Diagnosis Report</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            당신의 아우라 진단
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Radar Chart */}
          <div ref={ref2} className={`transition-all duration-800 delay-100 ${vis2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[11px] font-medium uppercase tracking-widest text-wood/40 mb-8 text-center">
              Olfactory Silhouette
            </p>
            <RadarChart />
            <div className="flex justify-center gap-8 mt-8">
              {radarData.map((d) => (
                <div key={d.axis} className="text-center">
                  <p className="text-lg font-light">{Math.round(d.value * 100)}%</p>
                  <p className="text-[10px] uppercase tracking-widest text-wood/40 mt-1">{d.axis}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logic breakdown */}
          <div ref={ref3} className={`transition-all duration-800 delay-200 ${vis3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[11px] font-medium uppercase tracking-widest text-wood/40 mb-8">
              Translation Logic
            </p>
            <div className="space-y-0">
              {logicSteps.map((step, i) => (
                <div
                  key={i}
                  className="group py-5 border-b border-wood/10 flex items-start gap-4 hover:bg-wood/[0.01] transition-colors duration-300 px-2 -mx-2"
                >
                  <span className="text-[11px] font-medium text-wood/30 mt-0.5 font-mono">
                    0{i + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed text-wood/70 group-hover:text-wood transition-colors duration-300">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Perfumer's Note */}
            <div className="mt-10 p-6 bg-wood/5 border-l-2 border-wood/20 italic">
              <p className="text-[13px] text-wood/70 leading-relaxed">
                "당신이 지향하는 절제된 실루엣과 지적인 분위기를 현대적인 후각 언어로 치환했습니다. 
                차가운 금속의 질감 끝에 남는 잔잔한 시더우드의 잔향은 당신의 아우라를 더욱 선명하게 완성할 것입니다."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-wood/40 mt-4 not-italic">— Senior Perfumer L</p>
            </div>
          </div>
        </div>

        {/* Similar auras */}
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
                <div className="aspect-square bg-stone-50 mb-5 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium">{p.name}</p>
                    <p className="text-[11px] text-wood/40 mt-0.5">스타일 유사도</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light">{p.match}%</p>
                  </div>
                </div>
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
      </div>
    </section>
  );
}
