import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Variants,
} from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiCalendarDays } from "react-icons/hi2";
import { cn } from "@/utils/cn";
import { isDateBookable, isSameDay, startOfDay } from "@/lib/bookingSlots";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

type Props = {
  selected: Date | null;
  onSelect: (date: Date) => void;
};

type SlideDir = 1 | -1;

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

const monthPanel: Variants = {
  enter: (dir: SlideDir) => ({
    opacity: 0,
    x: dir * 28,
    scale: 0.96,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: SlideDir) => ({
    opacity: 0,
    x: dir * -28,
    scale: 0.96,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
};

const dayStagger: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.85 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.018,
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function BookingCalendar({ selected, onSelect }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [slideDir, setSlideDir] = useState<SlideDir>(1);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => getCalendarDays(year, month), [year, month]);
  const monthKey = `${year}-${month}`;

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
  });
  const yearLabel = viewDate.getFullYear();

  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  const goPrev = () => {
    if (!canGoPrev) return;
    setSlideDir(-1);
    setViewDate(new Date(year, month - 1, 1));
  };

  const goNext = () => {
    setSlideDir(1);
    setViewDate(new Date(year, month + 1, 1));
  };

  const selectedLabel = selected
    ? selected.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="mx-auto flex w-full max-w-[268px] flex-col items-center md:max-w-[380px] lg:max-w-[420px]">
      {/* Compact header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3"
      >
        <motion.span
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary md:h-9 md:w-9 md:rounded-xl"
          animate={
            reducedMotion
              ? undefined
              : { rotate: [0, -6, 6, 0], scale: [1, 1.06, 1] }
          }
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
        >
          <HiCalendarDays className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
        </motion.span>
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B5B4F] md:text-xs">
          Pick your date
        </p>
      </motion.div>

      {/* Calendar shell — compact + glow */}
      <motion.div
        layout
        className="booking-calendar-shell relative w-full overflow-hidden rounded-2xl p-3 md:rounded-3xl md:p-5"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(217,122,50,0.12), transparent 70%)",
          }}
        />

        {/* Month navigation */}
        <div className="relative mb-2 flex items-center justify-between gap-1 md:mb-3 md:gap-2">
          <motion.button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            whileHover={canGoPrev && !reducedMotion ? { scale: 1.08 } : undefined}
            whileTap={canGoPrev && !reducedMotion ? { scale: 0.92 } : undefined}
            className={cn(
              "booking-calendar-nav flex h-7 w-7 items-center justify-center rounded-full md:h-9 md:w-9",
              canGoPrev
                ? "text-green-dark hover:text-primary"
                : "cursor-not-allowed opacity-25",
            )}
            aria-label="Previous month"
          >
            <HiChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={monthKey}
              initial={
                reducedMotion ? false : { opacity: 0, y: -6, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, y: 6, filter: "blur(6px)" }
              }
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center leading-none"
            >
              <span className="font-display text-base font-semibold text-green-dark md:text-xl lg:text-2xl">
                {monthLabel}
              </span>
              <span className="mt-0.5 font-heading text-[9px] uppercase tracking-widest text-primary/80 md:text-[11px]">
                {yearLabel}
              </span>
            </motion.div>
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={goNext}
            whileHover={!reducedMotion ? { scale: 1.08 } : undefined}
            whileTap={!reducedMotion ? { scale: 0.92 } : undefined}
            className="booking-calendar-nav flex h-7 w-7 items-center justify-center rounded-full text-green-dark hover:text-primary md:h-9 md:w-9"
            aria-label="Next month"
          >
            <HiChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </motion.button>
        </div>

        {/* Weekday row */}
        <div className="mb-1 grid grid-cols-7 gap-0.5 md:mb-2 md:gap-1.5">
          {WEEKDAYS.map((d, i) => (
            <motion.span
              key={`${d}-${i}`}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.02 }}
              className="flex h-6 items-center justify-center font-heading text-[9px] font-bold uppercase tracking-wide text-[#6B5B4F]/70 md:h-8 md:text-[11px]"
            >
              {d}
            </motion.span>
          ))}
        </div>

        {/* Days grid — slides on month change */}
        <div className="relative min-h-[168px] overflow-hidden md:min-h-[248px] lg:min-h-[272px]">
          <AnimatePresence mode="wait" custom={slideDir}>
            <motion.div
              key={monthKey}
              custom={slideDir}
              variants={reducedMotion ? undefined : monthPanel}
              initial={reducedMotion ? false : "enter"}
              animate="center"
              exit={reducedMotion ? undefined : "exit"}
              className="grid grid-cols-7 gap-0.5 md:gap-1.5"
            >
              <LayoutGroup id="booking-calendar-days">
                {days.map((day, i) => {
                  if (!day) {
                    return (
                      <span
                        key={`empty-${monthKey}-${i}`}
                        className="h-7 w-full md:h-10 lg:h-11"
                        aria-hidden
                      />
                    );
                  }

                  const bookable = isDateBookable(day, today);
                  const isSelected = selected ? isSameDay(day, selected) : false;
                  const isToday = isSameDay(day, today);

                  return (
                    <motion.button
                      key={day.toISOString()}
                      type="button"
                      disabled={!bookable}
                      custom={i}
                      variants={reducedMotion ? undefined : dayStagger}
                      initial={reducedMotion ? false : "hidden"}
                      animate="show"
                      onClick={() => onSelect(day)}
                      whileHover={
                        bookable && !reducedMotion
                          ? { scale: 1.12, y: -2 }
                          : undefined
                      }
                      whileTap={
                        bookable && !reducedMotion ? { scale: 0.88 } : undefined
                      }
                      className={cn(
                        "booking-calendar-day relative flex h-7 w-full items-center justify-center rounded-lg text-[11px] font-semibold md:h-10 md:rounded-xl md:text-sm lg:h-11 lg:text-base",
                        bookable && "cursor-pointer text-green-dark",
                        !bookable && "cursor-not-allowed text-[#6B5B4F]/25",
                        isSelected && "z-10 text-white",
                        isToday && !isSelected && "text-primary",
                      )}
                      aria-label={day.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                      aria-pressed={isSelected}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="calendar-selection"
                          className="absolute inset-0 rounded-lg bg-cta-gradient shadow-[0_2px_14px_rgba(217,122,50,0.45)] md:rounded-xl md:shadow-[0_4px_20px_rgba(217,122,50,0.4)]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 28,
                          }}
                        />
                      )}
                      {isSelected && !reducedMotion && (
                        <motion.span
                          className="absolute inset-0 rounded-lg bg-primary/30"
                          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          aria-hidden
                        />
                      )}
                      {isToday && !isSelected && (
                        <motion.span
                          className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary md:bottom-1 md:h-1.5 md:w-1.5"
                          layoutId="calendar-today-dot"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-[1]">{day.getDate()}</span>
                    </motion.button>
                  );
                })}
              </LayoutGroup>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Selected date chip */}
      <AnimatePresence mode="wait">
        {selectedLabel ? (
          <motion.p
            key={selectedLabel}
            initial={reducedMotion ? false : { opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="booking-calendar-chip mt-3 px-3 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-wider text-primary md:mt-4 md:px-4 md:py-2 md:text-xs"
          >
            {selectedLabel}
          </motion.p>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="mt-3 font-heading text-[10px] uppercase tracking-wider text-[#6B5B4F]/60 md:mt-4 md:text-xs"
          >
            Tap a date to continue
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
