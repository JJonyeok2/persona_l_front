/**
 * @file AIInterviewSection.tsx
 * @description 사용자의 취향을 분석하기 위한 AI 채팅 인터뷰 섹션입니다.
 * 퍼스널(Personal) 트랙과 공간(Space) 트랙으로 분기되어 질문을 던지고 결과를 수집합니다.
 */

import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Check, Send, Sparkles } from "lucide-react";

/**
 * 메시지 객체 타입 정의
 */
type Message = {
  id: string; // 고유 식별자 (UUID)
  sender: "ai" | "user"; // 발신자 구분
  text: string; // 메시지 내용
  options?: string[]; // (AI 전용) 선택 가능한 옵션 리스트
};

/**
 * 인터뷰 시나리오 데이터
 * 퍼스널(Personal) 트랙과 공간(Space) 트랙으로 분기됩니다.
 */
const interviewFlows = {
  start: {
    ai: "안녕하세요. 어떤 분야의 향기 스타일링을 도와드릴까요?",
    options: ["나의 퍼스널 향수", "나의 공간 향기"],
  },
  personal: [
    {
      ai: "오늘 어떤 분위기를 원하시나요?",
      options: ["데이트를 위한 로맨틱한 향", "오피스에서의 단정한 인상", "주말 나들이의 자유로운 느낌", "특별한 이벤트를 위한 시그니처 향"],
    },
    {
      ai: "오늘의 패션 스타일을 알려주세요. 어떤 룩을 하셨나요?",
      options: ["미니멀 & 모던", "고프코어 & 아웃도어", "빈티지 & 클래식", "아방가르드 & 실험적"],
    },
    {
      ai: "피하고 싶은 향조가 있으신가요?",
      options: ["우디 향은 거부감이 있어요", "플로랄이 너무 달게 느껴져요", "시트러스는 피하고 싶어요", "특별히 없어요"],
    },
  ],
  space: [
    {
      ai: "머무는 공간의 주된 색감은 무엇인가요?",
      options: ["깨끗한 화이트톤", "따뜻한 우드 & 베이지", "시크한 블랙 & 그레이", "다채로운 컬러포인트"],
    },
    {
      ai: "공간을 채우고 있는 주된 소재나 질감은 어떤 느낌인가요?",
      options: ["부드러운 원목", "차가운 금속과 유리", "포근한 패브릭", "거친 스톤이나 콘크리트"],
    },
    {
      ai: "그 공간의 빛은 어떤가요? 채광이나 조명의 분위기를 알려주세요.",
      options: ["눈부신 자연 햇살", "은은한 간접 조명", "차분하고 어두운 무드", "밝고 기능적인 조명"],
    },
    {
      ai: "피하고 싶은 향조가 있으신가요?",
      options: ["우디 향은 거부감이 있어요", "플로랄이 너무 달게 느껴져요", "시트러스는 피하고 싶어요", "특별히 없어요"],
    },
  ],
};

export default function AIInterviewSection({ onComplete }: { onComplete?: (results: any) => void }) {
  const { ref, isVisible } = useIntersectionObserver();
  
  // 현재 진행 중인 트랙 (null, 'personal', 'space')
  const [activeTrack, setActiveTrack] = useState<null | "personal" | "space">(null);
  
  // 사용자의 선택 답변을 저장할 리스트
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // 전체 메시지 리스트 상태
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: interviewFlows.start.ai, options: interviewFlows.start.options },
  ]);
  
  // 현재 인터뷰 단계 (0, 1, 2...)
  const [currentStep, setCurrentStep] = useState(0);
  
  // AI가 답변을 생성 중인지 여부 (타이핑 애니메이션 제어)
  const [isTyping, setIsTyping] = useState(false);
  
  // 자유 입력창 텍스트 상태
  const [freeInput, setFreeInput] = useState("");
  
  // 스크롤 자동 하단 이동을 위한 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // 현재 트랙의 총 질문 수 (시작 질문 제외)
  const totalSteps = activeTrack ? interviewFlows[activeTrack].length : 1;
  // 인터뷰 진행률 계산 (0~100%)
  const progress = activeTrack 
    ? Math.min(((currentStep + 1) / totalSteps) * 100, 100)
    : 0;

  // 새로운 메시지가 추가될 때마다 채팅창을 아래로 부드럽게 스크롤
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  /**
   * 옵션을 선택하거나 텍스트를 제출했을 때 실행되는 핸들러
   */
  const handleOptionSelect = (option: string) => {
    // 1. 사용자 메시지 및 답변 데이터 저장
    const newUserMsg: Message = { id: crypto.randomUUID(), sender: "user", text: option };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    // 2. 잠시 후 AI의 다음 질문 생성
    setTimeout(() => {
      if (!activeTrack) {
        // 첫 번째 분기 선택 단계
        const track = option === "나의 퍼스널 향수" ? "personal" : "space";
        setActiveTrack(track);
        setCurrentStep(0);
        
        const nextAi: Message = {
          id: crypto.randomUUID(),
          sender: "ai",
          text: interviewFlows[track][0].ai,
          options: interviewFlows[track][0].options,
        };
        setMessages((prev) => [...prev, nextAi]);
      } else {
        // 트랙 진입 후 질문 단계
        const updatedAnswers = [...userAnswers, option];
        setUserAnswers(updatedAnswers);
        const nextStep = currentStep + 1;
        const currentFlow = interviewFlows[activeTrack];

        if (nextStep < currentFlow.length) {
          // 다음 질문이 있는 경우
          const nextAi: Message = {
            id: crypto.randomUUID(),
            sender: "ai",
            text: currentFlow[nextStep].ai,
            options: currentFlow[nextStep].options,
          };
          setMessages((prev) => [...prev, nextAi]);
          setCurrentStep(nextStep);
        } else {
          // 모든 질문이 끝난 경우
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              sender: "ai",
              text: "분석이 완료되었습니다. 당신을 위한 최적의 향기 번역 결과를 확인해 보세요.",
            },
          ]);

          // 최종 결과 데이터를 상위 컴포넌트로 전달
          if (onComplete) {
            if (activeTrack === "personal") {
              onComplete({
                type: "personal",
                personalMood: updatedAnswers[0],
                fashionStyle: updatedAnswers[1],
              });
            } else {
              onComplete({
                type: "space",
                spaceColor: updatedAnswers[0],
                spaceTexture: updatedAnswers[1],
                spaceLight: updatedAnswers[2],
              });
            }
          }
          setCurrentStep(nextStep); // 완료 상태 표시를 위해 증가
        }
      }
      setIsTyping(false);
    }, 1500);
  };

  /**
   * 자유 입력 텍스트 제출 핸들러
   */
  const handleFreeSubmit = () => {
    if (!freeInput.trim()) return;
    handleOptionSelect(freeInput.trim());
    setFreeInput("");
  };

  const isComplete = activeTrack ? currentStep >= interviewFlows[activeTrack].length : false;

  return (
    <section id="interview" className="bg-wood text-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <p className="label-upper text-cream/40 mb-4">AI Interview</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
              {activeTrack === "personal" ? "Personal Scent Style" : activeTrack === "space" ? "Space Atmosphere Scent" : "당신의 취향을 들려주세요"}
            </h2>
          </div>

          {/* 진행률 바 (Progress Bar) */}
          {activeTrack && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-cream/40 mb-3">
                <span>진행률</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-px bg-cream/10 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-cream transition-all duration-800"
                  style={{ width: `${progress}%`, transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                />
              </div>
            </div>
          )}

          {/* 채팅 인터페이스 영역 */}
          <div className="max-w-2xl mx-auto">
            <div className="border-t border-cream/10 pt-8">
              {/* 메시지 출력 컨테이너 */}
              <div 
                ref={scrollContainerRef}
                className="h-[400px] overflow-y-auto pr-4 custom-scrollbar mb-6"
              >
                {messages.map((msg, idx) => (
                  <div key={msg.id} className="mb-8 animate-fade-up" style={{ animationDelay: `${idx * 80}ms` }}>
                    {msg.sender === "ai" ? (
                      /* AI 메시지 레이아웃 */
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles size={12} className="text-cream/60" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[15px] leading-relaxed text-cream/90">{msg.text}</p>
                          {/* 선택 가능한 옵션 버튼들 */}
                          {msg.options && (
                            <div className="flex flex-wrap gap-3 mt-4">
                              {msg.options.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => handleOptionSelect(opt)}
                                  className="group text-[13px] text-cream/70 hover:text-cream transition-colors duration-300"
                                >
                                  <span className="underline-hover">{opt}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* 사용자 메시지 레이아웃 */
                      <div className="flex justify-end">
                        <div className="flex items-start gap-3">
                          <div className="bg-cream/10 px-4 py-3 text-[14px]">
                            {msg.text}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-wood" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* AI 타이핑 애니메이션 */}
                {isTyping && (
                  <div className="flex gap-3 mb-8">
                    <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={12} className="text-cream/60" />
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* 하단 입력창 영역 */}
              {!isTyping && !isComplete && (
                <div className="flex items-center gap-3 border-b border-cream/20 pb-2 mt-4">
                  <input
                    type="text"
                    value={freeInput}
                    onChange={(e) => setFreeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFreeSubmit()}
                    placeholder="자유롭게 입력하거나 위 옵션을 선택하세요"
                    className="flex-1 bg-transparent text-[14px] text-cream placeholder:text-cream/30 outline-none py-2"
                  />
                  <button
                    onClick={handleFreeSubmit}
                    aria-label="메시지 전송"
                    className="p-2 hover:bg-cream/10 transition-colors duration-300"
                  >
                    <Send size={16} strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {/* 인터뷰 완료 후 결과 보기 버튼 */}
              {isComplete && !isTyping && (
                <div className="text-center mt-8 animate-fade-in">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-cream/60 text-sm italic">분석이 완료되었습니다. 당신을 위한 리포트가 준비되었습니다.</p>
                    <a
                      href="#report"
                      className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest border border-cream/30 px-8 py-3 hover:bg-cream hover:text-wood transition-all duration-400"
                    >
                      분석 리포트 보기
                      <Sparkles size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
