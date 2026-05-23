import { useRef, type DependencyList, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/animations/gsapSetup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Runs GSAP animations inside a scoped container with automatic cleanup.
 * Skips entirely when the user prefers reduced motion.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  setup: (scope: T) => void,
  deps: DependencyList = [],
): RefObject<T | null> {
  const scopeRef = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = scopeRef.current;
      if (prefersReducedMotion || !el) return;
      const ctx = gsap.context(() => setup(el), scopeRef);
      return () => ctx.revert();
    },
    { scope: scopeRef, dependencies: [prefersReducedMotion, ...deps] },
  );

  return scopeRef;
}
