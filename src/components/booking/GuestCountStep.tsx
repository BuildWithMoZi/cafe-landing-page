import { motion } from "framer-motion";
import { HiMinus, HiPlus, HiUsers } from "react-icons/hi2";
import { cn } from "@/utils/cn";

const MIN_GUESTS = 1;
const MAX_GUESTS = 20;

type Props = {
  value: number;
  onChange: (n: number) => void;
};

export function GuestCountStep({ value, onChange }: Props) {
  const dec = () => onChange(Math.max(MIN_GUESTS, value - 1));
  const inc = () => onChange(Math.min(MAX_GUESTS, value + 1));

  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <HiUsers className="h-7 w-7" aria-hidden />
      </div>
      <p className="font-heading text-sm font-semibold uppercase tracking-wider text-green-dark">
        Number of guests
      </p>
      <p className="mt-2 max-w-xs text-center text-sm text-[#6B5B4F]">
        Including yourself. For parties larger than {MAX_GUESTS}, please call us.
      </p>

      <div className="mt-8 flex items-center gap-6">
        <motion.button
          type="button"
          onClick={dec}
          disabled={value <= MIN_GUESTS}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-green-dark/20 transition-colors",
            value <= MIN_GUESTS
              ? "cursor-not-allowed opacity-40"
              : "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
          )}
          aria-label="Decrease guests"
        >
          <HiMinus className="h-5 w-5" />
        </motion.button>

        <span
          className="min-w-[3ch] font-display text-5xl font-bold text-green-dark tabular-nums"
          aria-live="polite"
        >
          {value}
        </span>

        <motion.button
          type="button"
          onClick={inc}
          disabled={value >= MAX_GUESTS}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-green-dark/20 transition-colors",
            value >= MAX_GUESTS
              ? "cursor-not-allowed opacity-40"
              : "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
          )}
          aria-label="Increase guests"
        >
          <HiPlus className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}
