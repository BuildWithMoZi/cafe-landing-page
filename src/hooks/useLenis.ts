import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsapSetup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Offset for fixed navbar when it is visible */
const ANCHOR_SCROLL_OFFSET = -88;

function getAnchorTarget(href: string | null): HTMLElement | null {
  if (!href || href === "#" || !href.startsWith("#")) return null;
  return document.querySelector<HTMLElement>(href);
}

function handleAnchorClick(
  event: MouseEvent,
  scrollToElement: (element: HTMLElement) => void,
) {
  const anchor = (event.target as Element).closest<HTMLAnchorElement>(
    'a[href^="#"]',
  );
  if (!anchor) return;

  const target = getAnchorTarget(anchor.getAttribute("href"));
  if (!target) return;

  event.preventDefault();
  scrollToElement(target);
}

export function useLenis() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let scrollToElement: (element: HTMLElement) => void;

    const onAnchorClick = (event: MouseEvent) => {
      handleAnchorClick(event, scrollToElement);
    };

    if (prefersReducedMotion) {
      scrollToElement = (element) => {
        const top =
          element.getBoundingClientRect().top +
          window.scrollY +
          ANCHOR_SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "auto" });
      };

      document.addEventListener("click", onAnchorClick);
      return () => document.removeEventListener("click", onAnchorClick);
    }

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    scrollToElement = (element) => {
      lenis.scrollTo(element, {
        offset: ANCHOR_SCROLL_OFFSET,
        duration: 1.4,
      });
    };

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [prefersReducedMotion]);
}
