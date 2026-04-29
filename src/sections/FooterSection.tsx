export default function FooterSection() {
  const links = [
    { label: "컨셉", href: "#philosophy" },
    { label: "AI 인터뷰", href: "#interview" },
    { label: "분석 리포트", href: "#report" },
    { label: "추천", href: "#curated" },
    { label: "안전성", href: "#safety" },
  ];

  return (
    <footer className="bg-cream border-t border-wood/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase">Persona L</p>
            <p className="text-[11px] text-wood/40 mt-1 tracking-wider">AI Scent Stylist</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] font-medium uppercase tracking-widest text-wood/50 hover:text-wood transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/JJonyeok2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium uppercase tracking-widest text-wood/40 hover:text-wood transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[11px] font-medium uppercase tracking-widest text-wood/40 hover:text-wood transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-wood/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-wood/30 tracking-wider">
            © 2026 Persona L. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-wood/30 hover:text-wood/60 transition-colors duration-300 tracking-wider">
              개인정보 처리방침
            </a>
            <a href="#" className="text-[10px] text-wood/30 hover:text-wood/60 transition-colors duration-300 tracking-wider">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
