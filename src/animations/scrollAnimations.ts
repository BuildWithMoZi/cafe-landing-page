import { gsap, ScrollTrigger } from "@/animations/gsapSetup";

const REVEAL_EASE = "power3.out";

/** Diagonal clip-path reveal — gallery tiles, cards */
export function animateClipReveal(
  targets: gsap.DOMTarget,
  options?: { stagger?: number; start?: string },
) {
  const { stagger = 0.09, start = "top 88%" } = options ?? {};

  gsap.set(targets, {
    opacity: 0,
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  return ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        stagger,
        ease: REVEAL_EASE,
      });
    },
  });
}

/** 3D perspective stagger — category / product grids */
export function animate3DStagger(
  targets: gsap.DOMTarget,
  options?: { stagger?: number; start?: string },
) {
  const { stagger = 0.1, start = "top 85%" } = options ?? {};

  gsap.set(targets, {
    opacity: 0,
    y: 72,
    rotateX: 18,
    transformPerspective: 900,
    transformOrigin: "center bottom",
  });

  return ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.1,
        stagger,
        ease: REVEAL_EASE,
      });
    },
  });
}

/** One-shot entrance for dynamically added nodes (e.g. gallery “view more”) */
export function animateClipRevealInstant(targets: gsap.TweenTarget) {
  gsap.set(targets, {
    opacity: 0,
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  return gsap.to(targets, {
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.85,
    stagger: 0.07,
    ease: REVEAL_EASE,
  });
}

/** Offers banner — scrubbed glow + entrance timeline */
export function animateOffersSection(
  root: HTMLElement,
  parts: {
    card: HTMLElement;
    glowA: HTMLElement;
    glowB: HTMLElement;
    badge: HTMLElement;
    countdown: HTMLElement;
  },
) {
  const { card, glowA, glowB, badge, countdown } = parts;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 82%",
      toggleActions: "play none none none",
    },
  });

  tl.from(card, {
    opacity: 0,
    scale: 0.92,
    y: 48,
    duration: 1.1,
    ease: REVEAL_EASE,
  })
    .from(
      badge,
      { scale: 0, rotate: -120, duration: 0.7, ease: "back.out(2)" },
      "-=0.5",
    )
    .from(
      countdown.children,
      { opacity: 0, y: 24, stagger: 0.08, duration: 0.6, ease: REVEAL_EASE },
      "-=0.45",
    );

  gsap.to(glowA, {
    x: 40,
    y: -30,
    scale: 1.25,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  gsap.to(glowB, {
    x: -35,
    y: 25,
    scale: 1.15,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  return tl;
}

/** Swiper / carousel — perspective fan-in */
export function animateCarouselSlides(
  trigger: HTMLElement,
  slideSelector: string,
) {
  const slides = trigger.querySelectorAll(slideSelector);
  if (!slides.length) return;

  gsap.set(slides, {
    opacity: 0,
    rotateY: 28,
    z: -120,
    transformPerspective: 1100,
    transformOrigin: "center center",
  });

  return gsap.to(slides, {
    opacity: 1,
    rotateY: 0,
    z: 0,
    duration: 1.05,
    stagger: 0.11,
    ease: REVEAL_EASE,
    scrollTrigger: {
      trigger,
      start: "top 78%",
      once: true,
    },
  });
}

/** Hero → light sections — dark veil fades on scroll */
export function animateSectionsTransition(
  shell: HTMLElement,
  veil: HTMLElement,
) {
  return gsap.fromTo(
    veil,
    { opacity: 1, y: 0 },
    {
      opacity: 0,
      y: -48,
      ease: "none",
      scrollTrigger: {
        trigger: shell,
        start: "top bottom",
        end: "top 55%",
        scrub: 0.8,
      },
    },
  );
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
