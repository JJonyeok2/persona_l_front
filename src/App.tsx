/**
 * @file App.tsx
 * @description 애플리케이션의 전체 레이아웃과 섹션 구성을 정의하는 메인 컴포넌트입니다.
 * 사이트의 전역 테마(배경색, 텍스트 색상)를 설정하고 각 섹션을 순서대로 배치합니다.
 */

import { useState } from "react";
import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import PhilosophySection from "@/sections/PhilosophySection";
import ScentGuideSection from "@/sections/ScentGuideSection";
import AIInterviewSection from "@/sections/AIInterviewSection";
import InsightReportSection from "@/sections/InsightReportSection";
import CuratedSelectionSection from "@/sections/CuratedSelectionSection";
import SafetyValuesSection from "@/sections/SafetyValuesSection";
import FooterSection from "@/sections/FooterSection";

import type { AnalysisResults } from "@/types";

export default function App() {
  // 인터뷰 결과를 저장할 상태
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  return (
    /**
     * 전체 페이지 컨테이너
     * min-h-screen: 최소 높이를 브라우저 화면 높이로 설정
     * bg-cream: 프로젝트 커스텀 크림색 배경
     * text-wood: 프로젝트 커스텀 우드색 텍스트
     * font-sans: 기본 고딕 계열 폰트 적용
     */
    <div className="min-h-screen bg-cream text-wood font-sans">
      {/* 상단 네비게이션 바 */}
      <Navigation />
      
      {/* 메인 콘텐츠 영역 */}
      <main>
        {/* 히어로 섹션: 첫 화면 및 인트로 */}
        <HeroSection />
        
        {/* 철학 섹션: 브랜드 가치 및 철학 설명 */}
        <PhilosophySection />
        
        {/* 향기 가이드 섹션: 향수 사용법 및 팁 */}
        <ScentGuideSection />
        
        {/* AI 인터뷰 섹션: 사용자 취향 분석을 위한 인터랙티브 채팅 */}
        <AIInterviewSection onComplete={(results: AnalysisResults) => setAnalysisResults(results)} />
        
        {/* 분석 리포트 섹션: 인터뷰 결과에 따른 개인화된 분석 결과 */}
        <InsightReportSection results={analysisResults} />
        
        {/* 큐레이션 섹션: 추천 제품 리스트 */}
        <CuratedSelectionSection results={analysisResults} />
        
        {/* 안전성 섹션: 제품의 원료 및 안전성 강조 */}
        <SafetyValuesSection />
      </main>
      
      {/* 하단 푸터 영역 */}
      <FooterSection />
    </div>
  );
}
