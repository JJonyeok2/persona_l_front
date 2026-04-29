import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Droplets, Wind, Leaf, Mountain } from "lucide-react";

const families = [
  {
    title: "Woody",
    subtitle: "대지의 깊은 안식",
    description: "나무의 결에서 느껴지는 따뜻하고 묵직한 힘입니다.",
    details: [
      { name: "Sandalwood", 
        desc: ["포근하고 부드러운 우유빛 나무 향,", "마음을 차분하게 가라앉혀 줍니다."] 
      },
      { name: "Cedarwood", 
        desc: ["연필심처럼 건조하고 깨끗한 숲의 향,", "지적이고 현대적인 세련미를 줍니다."] 
      },
    ],
    icon: Mountain,
    color: "bg-wood/5",
  },
  {
    title: "Floral",
    subtitle: "만개한 정원의 우아함",
    description: "꽃들의 섬세한 결이 모여 완성되는 풍성한 아름다움입니다.",
    details: [
      { name: "Rose", desc: ["클래식하고 화려한 꽃의 여왕,", "우아한 존재감을 드러냅니다."] },
      { name: "Jasmine", desc: ["달콤하면서도 관능적인 밤의 꽃,", "신비로운 매력을 더해줍니다."] },
    ],
    icon: Leaf,
    color: "bg-cream",
  },
];

const concentrations = [
  { type: "Parfum", ratio: "20-30%", duration: "7-8h+", desc: "가장 진하고 깊은 영혼의 향기" },
  { type: "Eau de Parfum", ratio: "15-20%", duration: "5-6h", desc: "풍부한 잔향이 매력적인 데일리 시그니처" },
  { type: "Eau de Toilette", ratio: "5-15%", duration: "3-4h", desc: "가볍고 산뜻하게 시작하는 하루의 기분" },
  { type: "Eau de Cologne", ratio: "2-4%", duration: "1-2h", desc: "은은하고 투명하게 스치는 향기의 흔적" },
];

export default function ScentGuideSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="guide" className="bg-beige py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <p className="label-upper text-wood/40 mb-4">Scent Education</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
              향기를 이해하는,
              <br />
              가장 쉬운 방법
            </h2>
            <p className="text-wood/60 leading-relaxed">
              복잡한 용어 대신 향기가 가진 고유의 성격에 집중해 보세요. <br/> 
              당신의 분위기를 완성하는 마지막 퍼즐 조각을 찾는 과정입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Concentration Guide */}
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30 mb-10">
                01. Concentration (부향률)
              </h3>
              <div className="space-y-8">
                {concentrations.map((c) => (
                  <div key={c.type} className="group border-b border-wood/10 pb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-lg font-medium">{c.type}</h4>
                      <span className="text-[11px] font-mono text-wood/40">{c.ratio} / {c.duration}</span>
                    </div>
                    <p className="text-sm text-wood/60 group-hover:text-wood transition-colors duration-300">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Woody Deep Dive */}
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30 mb-10">
                02. Scent Family (계열의 차이)
              </h3>
              <div className="space-y-12">
                {families.map((f) => (
                  <div key={f.title} className={`${f.color} p-8 md:p-10 rounded-sm`}>
                    <div className="flex items-center gap-3 mb-4">
                      <f.icon size={20} strokeWidth={1.5} className="text-wood" />
                      <h4 className="text-xl font-medium">{f.title}</h4>
                    </div>
                    <p className="text-[13px] text-wood/40 uppercase tracking-widest mb-2">{f.subtitle}</p>
                    <p className="text-sm text-wood/70 mb-8">{f.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-wood/10">
                      {f.details.map((d) => (
                        <div key={d.name}>
                          <p className="text-[13px] font-semibold mb-1">{d.name}</p>
                          <div className="text-[12px] leading-relaxed text-wood/50">
                            {Array.isArray(d.desc) ? (
                              d.desc.map((line, idx) => (
                                <p key={idx}>{line}</p>
                              ))
                            ) : (
                              <p>{d.desc}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
