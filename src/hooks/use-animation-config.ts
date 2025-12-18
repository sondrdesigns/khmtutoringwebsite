import * as React from "react";
import { useIsMobile } from "../components/ui/use-mobile";

export interface AnimationConfig {
  shouldReduceAnimations: boolean;
  durationMultiplier: number;
  allowInfiniteAnimations: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Hook that provides animation configuration based on device type and user preferences.
 * 
 * - Desktop: Full animations with original durations
 * - Mobile: Reduced animations with shorter durations
 * - Reduced motion preference: Minimal to no animations
 */
export function useAnimationConfig(): AnimationConfig {
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    // Check prefers-reduced-motion on mount
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes to the preference
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // If user prefers reduced motion, minimize all animations
  if (prefersReducedMotion) {
    return {
      shouldReduceAnimations: true,
      durationMultiplier: 0.1, // Very fast transitions
      allowInfiniteAnimations: false,
      isMobile,
      prefersReducedMotion: true,
    };
  }

  // On mobile, reduce animations but keep essential ones
  if (isMobile) {
    return {
      shouldReduceAnimations: true,
      durationMultiplier: 0.4, // 40% of original duration (0.8s becomes 0.32s)
      allowInfiniteAnimations: false, // Disable infinite animations on mobile
      isMobile: true,
      prefersReducedMotion: false,
    };
  }

  // Desktop: full animations
  return {
    shouldReduceAnimations: false,
    durationMultiplier: 1.0,
    allowInfiniteAnimations: true,
    isMobile: false,
    prefersReducedMotion: false,
  };
}









