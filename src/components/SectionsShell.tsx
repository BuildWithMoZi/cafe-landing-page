import { type ReactNode } from "react";
import { useGsapScope } from "@/hooks/useGsapScope";
import { animateSectionsTransition } from "@/animations/scrollAnimations";

interface SectionsShellProps {
  children: ReactNode;
}

/**
 * Shared bright background for all post-hero sections.
 * Background is out of document flow — content starts immediately after hero.
 * Sticky inner layer keeps the light bg fixed while content scrolls.
 */
export function SectionsShell({ children }: SectionsShellProps) {
  const scopeRef = useGsapScope<HTMLDivElement>((scope) => {
    const veil = scope.querySelector("[data-sections-veil]");
    if (veil) animateSectionsTransition(scope, veil as HTMLElement);
  });

  return (
    <div ref={scopeRef} className="sections-light relative">
      <div
        data-sections-veil
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-40 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="sticky top-0 h-screen w-full">
          <div className="absolute inset-0 bg-sections-light" />
          <div className="absolute inset-0 bg-sections-light-glow opacity-80" />
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
