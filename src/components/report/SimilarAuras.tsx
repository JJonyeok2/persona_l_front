/**
 * @file SimilarAuras.tsx
 * @description 사용자의 진단 결과와 유사한 분위기를 가진 페르소나들을 추천하는 컴포넌트입니다.
 * 이미지와 일치도를 시각적인 그래프와 함께 표시합니다.
 */

interface Aura {
  name: string;
  match: number;
  image: string;
}

interface SimilarAurasProps {
  /** 추천할 유사 페르소나 데이터 리스트 */
  auras: Aura[];
}

export default function SimilarAuras({ auras }: SimilarAurasProps) {
  return (
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
            <div className="flex items-center justify-between text-wood">
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
  );
}
