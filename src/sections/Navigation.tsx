import { useState } from "react";
import { Menu, X, Search, Heart } from "lucide-react";
import { useScrollPosition } from "@/hooks/useIntersectionObserver";

export default function Navigation() {
  const scrollY = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 80;

  const navLinks = [
    { label: "컨셉", href: "#philosophy" },
    { label: "AI 인터뷰", href: "#interview" },
    { label: "분석 리포트", href: "#report" },
    { label: "추천", href: "#curated" },
    { label: "안전성", href: "#safety" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-sm border-b border-wood/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest hover:opacity-60 transition-opacity duration-300"
            >
              <Menu size={18} strokeWidth={1.5} />
              <span className="hidden sm:inline">메뉴</span>
            </button>
            <button className="hover:opacity-60 transition-opacity duration-300">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          <a
            href="#"
            className={`absolute left-1/2 -translate-x-1/2 text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-500 ${
              isScrolled ? "text-wood" : "text-cream"
            }`}
          >
            Persona L
          </a>

          <div className="flex items-center gap-6">
            <button
              className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest hover:opacity-60 transition-opacity duration-300 ${
                isScrolled ? "text-wood" : "text-cream"
              }`}
            >
              <span className="hidden sm:inline">위시리스트</span>
              <span className="text-[10px]">(0)</span>
              <Heart size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-cream transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-end px-6 md:px-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest hover:opacity-60 transition-opacity duration-300"
            >
              <span>닫기</span>
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group py-4 border-b border-wood/10 flex items-center justify-between"
                style={{
                  transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                }}
              >
                <span
                  className={`text-3xl md:text-5xl font-light tracking-tight transition-all duration-500 ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  }`}
                >
                  {link.label}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-wood/40 group-hover:text-wood transition-colors duration-300">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="px-6 md:px-16 lg:px-24 pb-8">
            <p className="text-[11px] text-wood/40 tracking-wider">
              © 2026 Persona L. AI Scent Stylist.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
