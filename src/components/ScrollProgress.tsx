import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] h-0.5 origin-left bg-cta-gradient"
      style={{ scaleX: progress, width: "100%" }}
    />
  );
}
