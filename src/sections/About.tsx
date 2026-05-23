import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { stats } from "@/data/stats";
import { SectionHeading } from "@/components/SectionHeading";
import { useCountUp } from "@/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const collageImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80",
];

function CollageImage({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? undefined : { y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`overflow-hidden rounded-2xl ${index % 2 === 0 ? "mt-8" : ""}`}
    >
      <img
        src={src}
        alt={`Belfry & Co. cafe ${index + 1}`}
        loading="lazy"
        className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110 sm:h-56"
      />
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="relative grid grid-cols-2 gap-4">
          {collageImages.map((src, i) => (
            <CollageImage key={src} src={src} index={i} />
          ))}
          <div className="absolute -bottom-4 -right-4 rounded-2xl glass-card-light p-4 glow-primary">
            <p className="font-display text-3xl font-bold gradient-text-light">
              Since
            </p>
            <p className="font-display text-5xl font-bold text-green-dark">
              2016
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="A Sanctuary For Coffee Lovers"
            subtitle="Born from a passion for exceptional beans and human connection, Belfry & Co. bridges tradition and tomorrow."
            className="mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 font-body leading-relaxed text-[#6B5B4F]"
          >
            Every cup tells a story — from the highlands of Ethiopia to your
            hands. We roast in small batches, design spaces that inspire, and
            serve with the warmth of a lifelong friend.
          </motion.p>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  stat,
}: {
  stat: { label: string; value: number; suffix: string };
}) {
  const { display, ref } = useCountUp(stat.value, 2000, true, stat.suffix);

  return (
    <div ref={ref} className="text-center lg:text-left">
      <p className="font-display text-4xl font-bold gradient-text-light lg:text-5xl">
        {display}
      </p>
      <p className="mt-1 font-heading text-xs uppercase tracking-wider text-[#6B5B4F]">
        {stat.label}
      </p>
    </div>
  );
}
