/**
 * @file NoteGlossary.tsx
 * @description 향수의 주요 원료들에 대한 설명을 카드 형태로 보여주는 컴포넌트입니다.
 * 마우스 호버 시 상세 정보를 노출하여 교육적인 재미를 더합니다.
 */

import { useState } from "react";
import { scentNotes } from "@/data/noteData";
import type { ScentNote } from "@/data/noteData";

export default function NoteGlossary() {
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);

  return (
    <div className="mt-24 pt-24 border-t border-wood/10">
      <div className="mb-12">
        <h3 className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30 mb-2">
          03. Perfumery Notes (향기 원료 사전)
        </h3>
        <p className="text-sm text-wood/40">주요 원료의 이름을 클릭하거나 마우스를 올려보세요.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {scentNotes.map((note: ScentNote) => (
          <div
            key={note.enName}
            className="group relative h-32 md:h-40 bg-white/40 border border-wood/5 rounded-sm p-5 cursor-help transition-all duration-500 hover:bg-wood hover:shadow-xl"
            onMouseEnter={() => setHoveredNote(note.enName)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            {/* 기본 노출: 원료 이름 */}
            <div className={`flex flex-col justify-between h-full transition-opacity duration-300 ${hoveredNote === note.enName ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-[10px] uppercase tracking-widest text-wood/40">{note.category} Note</span>
              <div>
                <h4 className="text-lg font-medium text-wood">{note.name}</h4>
                <p className="text-[11px] text-wood/30 uppercase tracking-tighter">{note.enName}</p>
              </div>
            </div>

            {/* 호버 시 노출: 상세 설명 */}
            <div className={`absolute inset-0 p-5 flex flex-col justify-center transition-all duration-500 ${hoveredNote === note.enName ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <p className="text-[12px] leading-relaxed text-cream/90 break-keep mb-3">
                {note.description}
              </p>
              <div className="pt-3 border-t border-cream/10">
                <p className="text-[9px] uppercase tracking-widest text-cream/40 mb-1">Origin</p>
                <p className="text-[10px] text-cream/60 truncate">{note.origin}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
