import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion || window.matchMedia("(max-width: 768px)").matches) {
      root.removeAttribute("data-custom-cursor");
      setEnabled(false);
      return;
    }

    root.setAttribute("data-custom-cursor", "true");
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor-hover], input, textarea"),
      );
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);

    return () => {
      root.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
    };
  }, [prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary md:block"
        animate={{ x: pos.x, y: pos.y, scale: hovering ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 md:block"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovering ? 2 : 1,
          opacity: hovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
