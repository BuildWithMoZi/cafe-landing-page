import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className,
}: SectionHeadingProps) {
  const isLight = variant === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl",
          isLight ? "text-green-dark" : "text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 font-body text-base leading-relaxed sm:text-lg",
            isLight ? "text-[#6B5B4F]" : "text-beige"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
