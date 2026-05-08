/**
 * @file ScentNoteCarousel.tsx
 * @description 향기의 계층(Top, Middle, Base)을 탐색하고 선호 원료를 선택하는 인터랙티브 캐러셀 컴포넌트입니다.
 * 탭 전환, 무한 루프 캐러셀, 10초 주기 자동 재생 및 최대 3개 원료 선택 기능을 포함합니다.
 */

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, RefreshCw } from 'lucide-react';
import { scentNotes } from "@/data/noteData";
import type { ScentNote } from "@/data/noteData";

interface ScentNoteCarouselProps {
  /** 선택된 노드들이 변경될 때 부모 컴포넌트로 전달하는 콜백 */
  onNotesChange?: (notes: string[]) => void;
}

export default function ScentNoteCarousel({ onNotesChange }: ScentNoteCarouselProps) {
  const [activeTab, setActiveTab] = useState<"Top" | "Middle" | "Base">('Top');
  const [currentIndex, setCurrentIndex] = useState(0);
  /** 사용자가 선택한 노트 객체 리스트 (최대 3개) */
  const [selectedNotes, setSelectedNotes] = useState<ScentNote[]>([]);

  const currentNotes = scentNotes.filter(n => n.category === activeTab);
  const totalNotes = currentNotes.length;
  const currentNote = currentNotes[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalNotes);
  }, [totalNotes]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalNotes) % totalNotes);
  }, [totalNotes]);

  const handleTabChange = (tab: "Top" | "Middle" | "Base") => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  /**
   * 노트를 선택하거나 해제하는 핸들러
   */
  const toggleNote = (note: ScentNote) => {
    let newNotes;
    if (selectedNotes.find((n) => n.enName === note.enName)) {
      newNotes = selectedNotes.filter((n) => n.enName !== note.enName);
    } else if (selectedNotes.length < 3) {
      newNotes = [...selectedNotes, note];
    } else {
      return;
    }
    
    setSelectedNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(newNotes.map(n => n.name));
    }
  };

  const resetNotes = () => {
    setSelectedNotes([]);
    if (onNotesChange) onNotesChange([]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(timer);
  }, [activeTab, currentIndex, handleNext]);

  const isSelected = selectedNotes.find((n) => n.enName === currentNote?.enName);

  return (
    <div className="w-full bg-cream/30 rounded-sm border border-wood/5 p-8 md:p-12 flex flex-col items-center mt-12 relative overflow-hidden">
      {/* 배경 장식 (선택된 상태일 때 은은한 효과) */}
      <div className={`absolute inset-0 bg-wood/5 transition-opacity duration-1000 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />

      {/* 상단 헤더: 제목 및 선택 카운터 */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-wood/30 mb-2">
            03. Scent Explorer (원료 탐색 및 선택)
          </h3>
          <p className="text-[11px] text-wood/50">마음에 드는 원료를 최대 3개까지 선택해 보세요.</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-2 h-2 rounded-full border transition-all duration-500 ${
                  selectedNotes.length >= num ? 'bg-wood border-wood scale-110' : 'border-wood/20'
                }`} 
              />
            ))}
          </div>
          <button 
            onClick={resetNotes}
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-wood/40 hover:text-wood transition-colors"
          >
            <RefreshCw size={12} />
            Reset
          </button>
        </div>
      </div>

      {/* 1. 상단 탭 */}
      <div className="relative z-10 flex gap-6 md:gap-8 mb-16 w-full justify-center">
        {(['Top', 'Middle', 'Base'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`relative pb-2 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              activeTab === tab ? 'text-wood' : 'text-wood/30 hover:text-wood/50'
            }`}
          >
            {tab} Note
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-wood" />
            )}
          </button>
        ))}
      </div>

      {/* 2. 캐러셀 메인 영역 */}
      <div className="relative z-10 w-full flex flex-col items-center max-w-2xl">
        <div className="text-[10px] tracking-[0.3em] text-wood/30 uppercase mb-8 font-mono">
          {currentIndex + 1} / {totalNotes}
        </div>

        <div className="flex items-center justify-between w-full mb-10 gap-4 sm:gap-12">
          <button
            onClick={handlePrev}
            className="p-4 text-wood/20 hover:text-wood transition-colors flex-shrink-0"
            aria-label="Previous note"
          >
            <ChevronLeft size={24} strokeWidth={1} />
          </button>

          <div 
            key={`${activeTab}-${currentIndex}`}
            className="flex-1 text-center animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-out cursor-pointer group"
            onClick={() => toggleNote(currentNote)}
          >
            <div className="relative inline-block mb-4">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight text-wood mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentNote?.name}
              </h3>
              {isSelected && (
                <div className="absolute -top-2 -right-6 text-wood animate-in zoom-in duration-500">
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-wood/30 mb-6">{currentNote?.enName}</p>
            
            {/* 상세 설명 및 원산지 정보 (사전적 느낌 강조) */}
            <div className="max-w-md mx-auto space-y-6">
              <p className="text-[15px] md:text-[17px] leading-relaxed text-wood/70 break-keep font-light transition-colors group-hover:text-wood/90 italic">
                "{currentNote?.description}"
              </p>
              
              <div className="flex flex-col items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] uppercase tracking-[0.2em] text-wood/40">Origin</span>
                <p className="text-[11px] text-wood/60 font-medium">{currentNote?.origin}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-4 text-wood/20 hover:text-wood transition-colors flex-shrink-0"
            aria-label="Next note"
          >
            <ChevronRight size={24} strokeWidth={1} />
          </button>
        </div>

        {/* 선택 버튼 */}
        <button
          onClick={() => toggleNote(currentNote)}
          className={`px-10 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border ${
            isSelected 
              ? 'bg-wood text-cream border-wood' 
              : 'bg-transparent text-wood/60 border-wood/20 hover:border-wood/40 hover:text-wood'
          }`}
        >
          {isSelected ? 'Selected' : 'Select this Note'}
        </button>
      </div>

      {/* 3. 하단 점 인디케이터 */}
      <div className="relative z-10 flex gap-2 mt-16">
        {currentNotes.map((note, idx) => {
          const isNoteSelected = selectedNotes.find(n => n.enName === note.enName);
          return (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-1 rounded-full transition-all duration-500 ease-in-out relative ${
                currentIndex === idx 
                  ? 'w-8 bg-wood' 
                  : 'w-2 bg-wood/10 hover:bg-wood/20'
              }`}
            >
              {isNoteSelected && currentIndex !== idx && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-wood rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <p className="relative z-10 mt-12 text-[9px] text-wood/20 tracking-[0.3em] uppercase italic">
        Your Selection will be reflected in AI Analysis
      </p>
    </div>
  );
}


// EOF: ScentNoteCarousel.tsx
