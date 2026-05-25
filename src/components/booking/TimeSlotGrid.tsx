import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  formatDisplayDate,
  formatSlotLabel,
  getAvailableSlotsForDate,
  parseSlotKey,
} from "@/lib/bookingSlots";

type Props = {
  date: Date;
  selected: string | null;
  onSelect: (slot: string) => void;
};

export function TimeSlotGrid({ date, selected, onSelect }: Props) {
  const slots = useMemo(() => getAvailableSlotsForDate(date), [date]);

  if (slots.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-green-dark/20 bg-white/40 px-4 py-8 text-center text-sm text-[#6B5B4F]">
        No available times for this date. Please choose another day.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-[#6B5B4F]">
        <span className="font-medium text-green-dark">{formatDisplayDate(date)}</span>
        {" — "}
        pick a time during our opening hours.
      </p>
      <div className="grid max-h-[280px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
        {slots.map((slot) => {
          const { hour, minute } = parseSlotKey(slot);
          const label = formatSlotLabel(hour, minute);
          const isActive = selected === slot;

          return (
            <motion.button
              key={slot}
              type="button"
              onClick={() => onSelect(slot)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "border-primary bg-primary text-white shadow-[0_4px_16px_rgba(217,122,50,0.3)]"
                  : "border-green-dark/15 bg-white/50 text-green-dark hover:border-primary/40 hover:bg-primary/10",
              )}
              aria-pressed={isActive}
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
