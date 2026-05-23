import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi2";
import { cn } from "@/utils/cn";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  variant?: "dark" | "light";
}

export function ThemeToggle({
  isDark,
  onToggle,
  variant = "dark",
}: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, backgroundColor: "rgba(217, 122, 50, 0.15)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      data-cursor-hover
      aria-label="Toggle theme"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300",
        variant === "light"
          ? "border-primary/25 bg-white/60 text-primary hover:border-primary/50"
          : "glass-card border-transparent text-primary"
      )}
    >
      {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
    </motion.button>
  );
}
