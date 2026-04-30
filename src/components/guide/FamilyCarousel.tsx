import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

interface Family {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  details: { name: string; desc: string }[];
}

interface FamilyCarouselProps {
  families: Family[];
}

export default function FamilyCarousel({ families }: FamilyCarouselProps) {
  const [activeFamilyIdx, setActiveFamilyIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFamilyIdx((prev) => (prev + 1) % families.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [families.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-8 md:mb-10">
        <h3 className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30">
          02. Scent Family (계열의 차이)
        </h3>
        <div className="flex gap-2">
          {families.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveFamilyIdx(i)}
              aria-label={`${families[i].title} 계열 보기`}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500 ${activeFamilyIdx === i ? 'bg-wood scale-125' : 'bg-wood/15 hover:bg-wood/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden flex-1 h-[440px] sm:h-[480px] lg:h-auto min-h-[440px]">
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
            <div className={`${f.color} p-6 sm:p-8 md:p-12 h-full rounded-sm border border-wood/5 flex flex-col`}>
              <div className="flex items-center gap-3 md:gap-4 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-wood/5 flex items-center justify-center">
                  <f.icon size={22} strokeWidth={1.2} className="text-wood" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-light tracking-tight text-wood">{f.title}</h4>
                  <p className="text-[9px] md:text-[11px] text-wood/40 uppercase tracking-[0.2em]">{f.subtitle}</p>
                </div>
              </div>
              
              <p className="text-[14px] md:text-[16px] leading-[1.8] text-wood/70 mb-8 md:mb-12 font-light break-keep text-wood">
                {f.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-10 border-t border-wood/10 mt-auto">
                {f.details.map((d) => (
                  <div key={d.name}>
                    <p className="text-[12px] md:text-[14px] font-semibold mb-1 md:mb-2 tracking-wide uppercase text-wood/80">{d.name}</p>
                    <div className="text-[12px] md:text-[13px] leading-relaxed text-wood/60 break-keep">
                      {d.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] md:text-[10px] text-wood/30 mt-6 text-center italic uppercase tracking-widest">Automatic rotation every 10 seconds</p>
    </div>
  );
}
