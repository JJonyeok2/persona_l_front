/**
 * @file ScentGuideSection.tsx
 * @description 향기의 계열(Family)과 부향률(Concentration)에 대한 정보를 제공하는 교육적 섹션입니다.
 * 사용자가 향수에 대한 기초 지식을 쌓을 수 있도록 카드와 리스트 형태로 정보를 전달합니다.
 */

import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Leaf, Mountain, Sun, Sparkles } from "lucide-react";

/**
 * 향기 계열 데이터 정의
 */
const families = [
  {
    title: "Woody",
    subtitle: "대지의 깊은 안식",
    description: "나무의 결에서 느껴지는 따뜻하고 묵직한 힘입니다. 숲속을 걷는 듯한 차분함과 지적인 신뢰감을 동시에 전달하며, 공간에 안정적인 무게감을 더해줍니다.",
    details: [
      { name: "Sandalwood", 
        desc: "부드럽고 크리미한 우유빛 나무 향이 마음을 깊게 가라앉혀 평온을 선사합니다."
      },
      { name: "Cedarwood", 
        desc: "연필심처럼 건조하고 깨끗한 연필 향이 현대적이고 지적인 세련미를 완성합니다."
      },
    ],
    icon: Mountain,
    color: "bg-wood/5",
  },
  {
    title: "Floral",
    subtitle: "만개한 정원의 우아함",
    description: "꽃들의 섬세한 결이 모여 완성되는 풍성한 아름다움입니다. 화사한 생명력과 로맨틱한 무드를 자아내며, 가장 클래식하면서도 매혹적인 분위기를 연출합니다.",
    details: [
      { name: "Rose", desc: "화려하고 풍성한 꽃의 여왕 향기가 우아하고 고전적인 존재감을 드러냅니다." },
      { name: "Jasmine", desc: "관능적이고 달콤한 밤의 꽃 향기가 신비롭고 매혹적인 아우라를 더해줍니다." },
    ],
    icon: Leaf,
    color: "bg-cream",
  },
  {
    title: "Citrus",
    subtitle: "찬란한 햇살의 에너지",
    description: "갓 딴 과일의 껍질에서 터져 나오는 싱그럽고 활기찬 기운입니다. 기분을 즉각적으로 전환하며, 공간을 밝고 깨끗한 에너지로 가득 채워줍니다.",
    details: [
      { name: "Bergamot", desc: "차분한 감귤 향과 고급스러운 풍미가 세련되고 긍정적인 활력을 부여합니다." },
      { name: "Lemon", desc: "날카롭고 선명한 산미가 느껴지는 향이 지친 감각에 즉각적인 리프레시를 줍니다." },
    ],
    icon: Sun,
    color: "bg-[#FDFCF0]",
  },
  {
    title: "Oriental",
    subtitle: "신비로운 밤의 서사",
    description: "이국적인 향신료와 따스한 수지가 어우러진 깊은 잔향입니다. 포근한 온기와 함께 관능적인 매력을 풍기며, 잊히지 않는 긴 여운을 남깁니다.",
    details: [
      { name: "Amber", desc: "황금빛 온기가 느껴지는 달콤한 향이 포근한 위로와 성숙한 아름다움을 줍니다." },
      { name: "Vanilla", desc: "부드럽고 깊은 크림처럼 달콤한 향이 심리적 안정감과 깊은 만족감을 선사합니다." },
    ],
    icon: Sparkles,
    color: "bg-[#F9F4F2]",
  },
];

/**
 * 향수 등급(부향률) 데이터 정의
 */
const concentrations = [
  { type: "Parfum", koType: "퍼퓸", ratio: "20-30%", duration: "7-8h+", desc: "가장 진하고 깊은 영혼의 향기" },
  { type: "Eau de Parfum", koType: "오 드 퍼퓸", ratio: "15-20%", duration: "5-6h", desc: "풍부한 잔향이 매력적인 데일리 시그니처" },
  { type: "Eau de Toilette", koType: "오 드 뚜왈렛", ratio: "5-15%", duration: "3-4h", desc: "가볍고 산뜻하게 시작하는 하루의 기분" },
  { type: "Eau de Cologne", koType: "오 드 코롱", ratio: "2-4%", duration: "1-2h", desc: "은은하고 투명하게 스치는 향기의 흔적" },
];

export default function ScentGuideSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeFamilyIdx, setActiveFamilyIdx] = useState(0);

  // 10초마다 다음 계열로 자동 전환 (루프)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFamilyIdx((prev) => (prev + 1) % families.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="guide" className="bg-beige py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* 섹션 헤더 */}
          <div className="max-w-3xl mb-20">
            <p className="label-upper text-wood/40 mb-4">Scent Education</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
              향기를 이해하는,
              <br />
              가장 쉬운 방법
            </h2>
            <p className="text-wood/60 leading-relaxed text-lg break-keep">
              복잡한 용어 대신 향기가 가진 고유의 성격에 집중해 보세요. <br/> 
              당신의 분위기를 완성하는 마지막 퍼즐 조각을 찾는 과정입니다. <br/>
              개인이 입는 향수부터 공간을 채우는 디퓨저까지, 향기의 모든 영역을 아우릅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
            {/* 01. 부향률 가이드 영역 */}
            <div className="flex flex-col">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30 mb-10">
                01. Concentration (부향률)
              </h3>
              <div className="flex-1 bg-white/30 p-8 md:p-12 rounded-sm border border-wood/5 flex flex-col justify-center">
                <div className="space-y-10">
                  {concentrations.map((c) => (
                    <div key={c.type} className="group border-b border-wood/10 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-end mb-3">
                        <div className="flex items-baseline gap-3">
                          <h4 className="text-xl font-medium">{c.type}</h4>
                          <span className="text-[12px] text-wood/50 font-normal">{c.koType}</span>
                        </div>
                        <span className="text-[12px] font-mono text-wood/40">{c.ratio} / {c.duration}</span>
                      </div>
                      <p className="text-[15px] text-wood/60 group-hover:text-wood transition-colors duration-300 break-keep">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-wood/30 mt-6 text-center italic uppercase tracking-widest">Guide to Concentration & Longevity</p>
            </div>

            {/* 02. 향기 계열 심층 가이드 영역 */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30">
                  02. Scent Family (계열의 차이)
                </h3>
                {/* 슬라이드 인디케이터 (버튼 기능 추가) */}
                <div className="flex gap-2.5">
                  {families.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveFamilyIdx(i)}
                      aria-label={`${families[i].title} 계열 보기`}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${activeFamilyIdx === i ? 'bg-wood scale-125' : 'bg-wood/15 hover:bg-wood/30'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden flex-1 h-[480px] lg:h-auto min-h-[480px]">
                {families.map((f, idx) => (
                  <div 
                    key={f.title} 
                    className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      idx === activeFamilyIdx 
                        ? 'opacity-100 translate-x-0' 
                        : idx < activeFamilyIdx 
                          ? 'opacity-0 -translate-x-10' 
                          : 'opacity-0 translate-x-10'
                    }`}
                  >
                    <div className={`${f.color} p-8 md:p-12 h-full rounded-sm border border-wood/5 flex flex-col`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-wood/5 flex items-center justify-center">
                          <f.icon size={24} strokeWidth={1.2} className="text-wood" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-light tracking-tight">{f.title}</h4>
                          <p className="text-[11px] text-wood/40 uppercase tracking-[0.2em]">{f.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-[16px] leading-[1.8] text-wood/70 mb-12 font-light break-keep">
                        {f.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-wood/10 mt-auto">
                        {f.details.map((d) => (
                          <div key={d.name}>
                            <p className="text-[14px] font-semibold mb-2 tracking-wide uppercase text-wood/80">{d.name}</p>
                            <div className="text-[13px] leading-relaxed text-wood/60 break-keep">
                              {d.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-wood/30 mt-6 text-center italic uppercase tracking-widest">10s rotation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
