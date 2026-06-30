import { motion } from "framer-motion";
import { BRAND_PLACEHOLDER } from "@/data/brand";
import { cn } from "@/utils/cn";

/** Text size per usage context — placeholder wordmark until a real logo is added */
const variants = {
  /** Compact navbar */
  nav: {
    text: "text-base sm:text-lg md:text-xl",
  },
  footer: {
    text: "text-lg sm:text-xl",
  },
  loader: {
    text: "text-2xl sm:text-3xl md:text-4xl",
  },
  full: {
    text: "text-xl md:text-2xl",
  },
} as const;

interface BrandLogoProps {
  className?: string;
  variant?: keyof typeof variants;
  animated?: boolean;
}

export function BrandLogo({
  className,
  variant = "full",
  animated = false,
}: BrandLogoProps) {
  const { text } = variants[variant];

  const content = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap font-semibold tracking-tight",
        text,
        className
      )}
    >
      {BRAND_PLACEHOLDER}
    </span>
  );

  if (!animated) return content;

  return (
    <motion.span
      className="inline-flex shrink-0"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {content}
    </motion.span>
  );
}
