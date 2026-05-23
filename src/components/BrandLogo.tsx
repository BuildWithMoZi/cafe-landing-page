import { motion } from "framer-motion";
import { BRAND_LOGO_SRC, BRAND_NAME } from "@/data/brand";
import { cn } from "@/utils/cn";

/** Fixed box sizes — width + height together so the image cannot blow up layout */
const variants = {
  /** Compact navbar: crops category tags, shows icon + wordmark */
  nav: {
    box: "h-9 w-[7.25rem] sm:h-10 sm:w-[8.25rem] md:h-11 md:w-[9.5rem] lg:h-12 lg:w-[10.75rem]",
    img: "h-[148%] w-auto max-w-none object-contain object-left -translate-y-[6%]",
  },
  footer: {
    box: "h-12 w-[9.5rem] sm:h-14 sm:w-[11rem]",
    img: "h-full w-full object-contain object-left",
  },
  loader: {
    box: "h-20 w-[16rem] sm:h-24 sm:w-[19rem] md:h-28 md:w-[22rem]",
    img: "h-full w-full object-contain object-center",
  },
  full: {
    box: "h-16 w-[13rem] md:h-20 md:w-[16rem]",
    img: "h-full w-full object-contain object-left",
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
  const { box, img } = variants[variant];

  const content = (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center overflow-hidden",
        box,
        className
      )}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt={BRAND_NAME}
        width={765}
        height={326}
        className={cn("pointer-events-none select-none", img)}
        loading="eager"
        decoding="async"
        draggable={false}
      />
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
