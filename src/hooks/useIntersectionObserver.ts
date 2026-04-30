/**
 * @file useIntersectionObserver.ts
 * @description 요소의 가시성 및 스크롤 상태를 감지하는 커스텀 훅들의 모음입니다.
 * 애니메이션 트리거 및 인터랙티브 UI 구현을 위해 사용됩니다.
 */

import { useEffect, useRef, useState } from "react";

/**
 * @function useIntersectionObserver
 * @description 특정 요소가 브라우저 화면(Viewport)에 나타나는지 감지합니다.
 * @param options IntersectionObserver 초기화 옵션
 * @returns { ref, isVisible } 감지할 요소에 연결할 ref와 가시성 상태값
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null); // 감지할 DOM 요소를 참조하는 ref
  const [isVisible, setIsVisible] = useState(false); // 요소의 가시성 상태

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver 인스턴스 생성
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 화면에 나타나면 상태를 true로 변경하고 관찰을 중단합니다 (단발성 애니메이션용)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options } // 기본적으로 요소의 15%가 보일 때 트리거
    );

    observer.observe(el); // 요소 관찰 시작
    return () => observer.disconnect(); // 언마운트 시 옵저버 해제
  }, [options]);

  return { ref, isVisible };
}

/**
 * @function useScrollPosition
 * @description 현재 창의 스크롤 Y축 위치를 실시간으로 반환합니다.
 * @returns {number} 현재 scrollY 값
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 스크롤 이벤트 핸들러: 성능을 위해 passive 옵션 사용
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

/**
 * @function useIsScrolled
 * @description 스크롤 위치가 특정 임계값을 넘었는지 여부만 효율적으로 감지합니다.
 * 실시간 scrollY 값을 계속 업데이트하지 않아 리렌더링 최적화에 유리합니다.
 * @param threshold 감지할 스크롤 위치 (단위: px)
 * @returns {boolean} 임계값 초과 여부
 */
export function useIsScrolled(threshold: number) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      // 상태가 실제로 변할 때만 업데이트하여 불필요한 리렌더링 방지
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 마운트 시 초기 상태 확인
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, threshold]);

  return isScrolled;
}
