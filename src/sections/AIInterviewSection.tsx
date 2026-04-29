import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Check, Send, Sparkles } from "lucide-react";

type Message = {
  id: number;
  sender: "ai" | "user";
  text: string;
  options?: string[];
};

const interviewFlow: {
  ai: string;
  options: string[];
}[] = [
  {
    ai: "안녕하세요. 오늘 어떤 분위기를 원하시나요?",
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
];

export default function AIInterviewSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "ai", text: "안녕하세요. 오늘 어떤 분위기를 원하시나요?", options: interviewFlow[0].options },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [freeInput, setFreeInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progress = Math.min(((currentStep + 1) / interviewFlow.length) * 100, 100);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const handleOptionSelect = (option: string) => {
    const newUserMsg: Message = { id: Date.now(), sender: "user", text: option };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < interviewFlow.length) {
        const nextAi: Message = {
          id: Date.now() + 1,
          sender: "ai",
          text: interviewFlow[nextStep].ai,
          options: interviewFlow[nextStep].options,
        };
        setMessages((prev) => [...prev, nextAi]);
        setCurrentStep(nextStep);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "ai",
            text: "분석이 완료되었습니다. 당신의 스타일 실루엣을 완벽한 후각적 언어로 번역한 결과를 확인해 보세요.",
          },
        ]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleFreeSubmit = () => {
    if (!freeInput.trim()) return;
    handleOptionSelect(freeInput.trim());
    setFreeInput("");
  };

  return (
    <section id="interview" className="bg-wood text-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div ref={ref} className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="label-upper text-cream/40 mb-4">AI Interview</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
              당신의 취향을 들려주세요
            </h2>
          </div>

          {/* Progress bar */}
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

          {/* Chat interface */}
          <div className="max-w-2xl mx-auto">
            <div className="border-t border-cream/10 pt-8">
              <div 
                ref={scrollContainerRef}
                className="h-[400px] overflow-y-auto pr-4 custom-scrollbar mb-6"
              >
                {messages.map((msg, idx) => (
                  <div key={msg.id} className="mb-8 animate-fade-up" style={{ animationDelay: `${idx * 80}ms` }}>
                    {msg.sender === "ai" ? (
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles size={12} className="text-cream/60" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[15px] leading-relaxed text-cream/90">{msg.text}</p>
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
                <div ref={messagesEndRef} />
              </div>

              {/* Free text input */}
              {!isTyping && currentStep < interviewFlow.length && (
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
                    className="p-2 hover:bg-cream/10 transition-colors duration-300"
                  >
                    <Send size={16} strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {/* Completion state */}
              {currentStep >= interviewFlow.length && !isTyping && (
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
