interface Aura {
  name: string;
  match: number;
  image: string;
}

interface SimilarAurasProps {
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-wood">{p.name}</p>
                <p className="text-[11px] text-wood/40 mt-0.5">스타일 유사도</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-light text-wood">{p.match}%</p>
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
