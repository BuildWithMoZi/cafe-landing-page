import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { SteamEffect } from "@/components/SteamEffect";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { HiStar, HiChevronDown } from "react-icons/hi2";
import { BRAND_NAME } from "@/data/brand";

const CoffeeBeans3D = lazy(() =>
  import("@/components/CoffeeBeans3D").then((m) => ({
    default: m.CoffeeBeans3D,
  })),
);

const headlineWords = ["Crafted", "Coffee", "For", "Modern", "Souls"];

export function Hero() {
  const parallax = useMouseParallax(25);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id='home'
      className='relative flex min-h-[100dvh] items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 bg-hero-gradient' />
      <div
        className='absolute inset-0 opacity-50'
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(217,122,50,0.2), transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(143,181,156,0.12), transparent), radial-gradient(ellipse 40% 40% at 90% 10%, rgba(77,124,254,0.06), transparent)",
        }}
      />
      <FloatingParticles count={40} />
      <div className='noise-overlay' />

      <div className='relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-8 lg:px-16'>
        <div>
          <h1 className='font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-8xl'>
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='mr-3 inline-block last:gradient-text last:mr-0'>
                {i === headlineWords.length - 1 ?
                  <span className='gradient-text'>{word}</span>
                : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className='mt-6 max-w-lg font-body text-lg leading-relaxed text-beige'>
            Where artisan roasting meets futuristic ambiance. Experience coffee
            elevated to an art form — warm, cinematic, unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className='mt-10 flex flex-wrap gap-4'>
            <MagneticButton href='#menu'>
              <Button size='lg' data-cursor-hover>
                Explore Menu
              </Button>
            </MagneticButton>
            <MagneticButton href='#contact'>
              <Button size='lg' variant='outline' data-cursor-hover>
                Book a Table
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className='mt-12 flex gap-8'>
            {[
              { label: "Rating", value: "4.9", showStar: true as const },
              { label: "Roasts", value: "24+" },
              { label: "Awards", value: "12" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className='flex items-center gap-1 font-display text-2xl font-semibold text-primary'>
                  {stat.value}
                  {"showStar" in stat && stat.showStar && (
                    <HiStar
                      className='h-5 w-5 fill-primary text-primary'
                      aria-hidden
                    />
                  )}
                </p>
                <p className='text-xs uppercase tracking-wider text-beige'>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ x: parallax.x, y: parallax.y }}
          className='relative mx-auto aspect-square w-full max-w-lg'>
          <motion.div
            className='h-full w-full'
            animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }>
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 via-mint/15 to-transparent blur-3xl' />
          <Suspense fallback={null}>
            <CoffeeBeans3D />
          </Suspense>
          <div className='relative z-10 flex h-full items-center justify-center'>
            <div className='relative'>
              <SteamEffect />
              <img
                src='https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=85'
                alt={`Premium ${BRAND_NAME} coffee cup`}
                className='relative z-10 w-72 rounded-3xl object-cover shadow-2xl shadow-black/50 sm:w-96'
                loading='eager'
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className='absolute -inset-8 rounded-full border border-dashed border-primary/25'
              />
            </div>
          </div>

          {[
            { text: "100% Organic", top: "5%", left: "-10%" },
            { text: "Fresh Daily", top: "60%", right: "-5%" },
            { text: "Award Winner", bottom: "10%", left: "0" },
          ].map((badge, i) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.2 }}
              className='absolute glass-card rounded-xl px-3 py-2 font-heading text-xs text-primary'
              style={{
                top: badge.top,
                left: badge.left,
                right: badge.right,
                bottom: badge.bottom,
              }}>
              {badge.text}
            </motion.div>
          ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href='#menu'
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className='group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3'
        data-cursor-hover
        aria-label='Scroll to explore menu'>
        <span className='glass-card rounded-full px-5 py-2 font-heading text-[10px] uppercase tracking-[0.3em] text-beige/90 transition-colors group-hover:text-primary'>
          Discover
        </span>

        <motion.div
          className='relative flex h-16 w-8 items-start justify-center'
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <motion.div
            className='absolute inset-x-3 top-0 h-full rounded-full bg-gradient-to-b from-primary/40 via-primary/10 to-transparent blur-sm'
            animate={{ opacity: [0.4, 0.9, 0.4], scaleY: [0.85, 1.1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className='relative h-full w-px overflow-hidden rounded-full bg-beige/15'>
            <motion.div
              className='absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary to-mint/80'
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className='absolute left-1/2 -translate-x-1/2'
              style={{ bottom: i * 5 }}
              animate={{ y: [0, 4, 0], opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}>
              <HiChevronDown className='h-4 w-4 text-primary' />
            </motion.span>
          ))}
        </motion.div>
      </motion.a>
    </section>
  );
}
