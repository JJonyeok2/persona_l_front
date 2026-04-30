/**
 * @file ChatMessage.tsx
 * @description AI 인터뷰 섹션에서 개별 메시지(AI 또는 사용자)를 표시하는 컴포넌트입니다.
 * 발신자에 따른 대칭 레이아웃과 옵션 선택 버튼 기능을 제공합니다.
 */

import { Sparkles, Check } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: string[];
}

interface ChatMessageProps {
  /** 메시지 객체 */
  msg: Message;
  /** 메시지 리스트 내 인덱스 (등장 애니메이션용) */
  index: number;
  /** AI 옵션 버튼 클릭 시 호출될 핸들러 */
  onOptionSelect?: (option: string) => void;
}

export default function ChatMessage({ msg, index, onOptionSelect }: ChatMessageProps) {
  return (
    <div className="mb-8 animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
      {msg.sender === "ai" ? (
        /* AI 메시지 레이아웃 */
        <div className="flex gap-3">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles size={12} className="text-cream/60" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-cream/90 break-keep">{msg.text}</p>
            {/* 선택 가능한 옵션 리스트 */}
            {msg.options && (
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                {msg.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onOptionSelect?.(opt)}
                    className="group text-[12px] sm:text-[13px] text-cream/70 hover:text-cream transition-colors duration-300 border border-cream/20 px-3 py-1.5 rounded-full hover:bg-cream/5"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 사용자 메시지 레이아웃 (우측 정렬) */
        <div className="flex justify-end">
          <div className="flex items-start gap-3">
            <div className="bg-cream/10 px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] break-keep text-cream">
              {msg.text}
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 text-wood">
              <Check size={12} strokeWidth={3} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
