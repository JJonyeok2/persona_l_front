/**
 * @file main.tsx
 * @description 애플리케이션의 진입점(Entry Point)입니다.
 * React 프로젝트의 루트 요소를 렌더링하며, 전역 스타일 및 라우팅 설정을 포함합니다.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css' // 전역 CSS 스타일 시트 로드
import App from './App.tsx' // 메인 레이아웃 컴포넌트 로드

// HTML의 id가 'root'인 요소를 찾아 React 루트를 생성합니다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 브라우저 라우팅을 위한 BrowserRouter 설정 (현재는 단일 페이지이나 확장성을 고려) */}
    <BrowserRouter>
      {/* 최상위 App 컴포넌트 실행 */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
