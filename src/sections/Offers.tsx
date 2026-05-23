import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { useGsapScope } from "@/hooks/useGsapScope";
import { animateOffersSection } from "@/animations/scrollAnimations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cafeImages } from "@/utils/cafeImage";

function getWeekendCountdown() {
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  end.setHours(23, 59, 59, 0);
  const diff = end.getTime() - now.getTime();
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function Offers() {
  const [time, setTime] = useState(getWeekendCountdown);
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    if (
      !cardRef.current ||
      !glowARef.current ||
      !glowBRef.current ||
      !badgeRef.current ||
      !countdownRef.current
    ) {
      return;
    }

    animateOffersSection(scope, {
      card: cardRef.current,
      glowA: glowARef.current,
      glowB: glowBRef.current,
      badge: badgeRef.current,
      countdown: countdownRef.current,
    });
  });

  useEffect(() => {
    const id = setInterval(() => setTime(getWeekendCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="offers" ref={scopeRef} className="section-padding relative">
      <div
        ref={cardRef}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-cta-gradient opacity-20" />
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
          }
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(270deg, #d97a32, #b85c2e, #3d5b4f, #d97a32)",
            backgroundSize: "400% 400%",
          }}
        />
        <div
          ref={glowARef}
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl will-change-transform"
        />
        <div
          ref={glowBRef}
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-neon-purple/10 blur-3xl glow-neon will-change-transform"
        />

        <div className="relative glass-card-light m-1 rounded-3xl p-8 glow-primary md:p-14">
          <motion.span
            ref={badgeRef}
            animate={
              prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 5, -5, 0] }
            }
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -right-2 -top-2 flex h-20 w-20 items-center justify-center rounded-full bg-cta-gradient font-heading text-sm font-bold text-white shadow-lg md:right-8 md:top-8"
          >
            50% OFF
          </motion.span>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primary">
                Limited Time
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold text-green-dark md:text-5xl">
                Buy 1 Get 1 Free
                <span className="block gradient-text-light">This Weekend</span>
              </h2>
              <p className="mt-4 text-[#6B5B4F]">
                Use code{" "}
                <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-primary">
                  BELFRY50
                </span>{" "}
                at checkout. Valid on all signature drinks.
              </p>
              <MagneticButton className="mt-8 inline-block">
                <Button size="lg" data-cursor-hover>
                  Claim Offer
                </Button>
              </MagneticButton>
            </div>

            <div className="space-y-5">
              <div ref={countdownRef} className="grid grid-cols-4 gap-3">
                {(
                  [
                    ["days", time.days],
                    ["hours", time.hours],
                    ["min", time.minutes],
                    ["sec", time.seconds],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-white/60 p-4 text-center backdrop-blur-sm ring-1 ring-green-dark/10"
                  >
                    <span className="font-display text-3xl font-bold text-primary md:text-4xl">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-xs uppercase text-[#6B5B4F]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {cafeImages.offers.map((item) => (
                  <div
                    key={item.src}
                    className="overflow-hidden rounded-xl ring-1 ring-green-dark/10"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
