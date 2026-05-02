/**
 * @file types.ts
 * @description 애플리케이션 전반에서 사용되는 공통 타입 정의 파일입니다.
 */

export type ScentType = "personal" | "space";

export interface AnalysisResults {
  type: ScentType;
  personalMood?: string;
  fashionStyle?: string;
  spaceColor?: string;
  spaceTexture?: string;
  spaceLight?: string;
}
