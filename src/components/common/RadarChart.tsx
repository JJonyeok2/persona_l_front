import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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

interface RadarChartProps {
  forceDraw?: boolean;
}

export default function RadarChart({ forceDraw }: RadarChartProps) {
  const { ref, isVisible } = useIntersectionObserver();
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (isVisible || forceDraw) {
      const timer = setTimeout(() => setDrawn(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, forceDraw]);

  const size = 300; // 기준 좌표 크기 (viewBox용)
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
    <div ref={ref} className="w-full max-w-[320px] mx-auto aspect-square flex items-center justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
        {/* 그리드 가이드 원들 */}
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
        {/* 축 라벨 */}
        {radarData.map((d, i) => {
          const p = getPoint(i, 1.25);
          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[12px] md:text-[11px] fill-wood/50 font-medium uppercase tracking-wider"
            >
              {d.axis}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
