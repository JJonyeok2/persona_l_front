import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import PhilosophySection from "@/sections/PhilosophySection";
import ScentGuideSection from "@/sections/ScentGuideSection";
import AIInterviewSection from "@/sections/AIInterviewSection";
import InsightReportSection from "@/sections/InsightReportSection";
import CuratedSelectionSection from "@/sections/CuratedSelectionSection";
import SafetyValuesSection from "@/sections/SafetyValuesSection";
import FooterSection from "@/sections/FooterSection";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-wood font-sans">
      <Navigation />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ScentGuideSection />
        <AIInterviewSection />
        <InsightReportSection />
        <CuratedSelectionSection />
        <SafetyValuesSection />
      </main>
      <FooterSection />
    </div>
  );
}
