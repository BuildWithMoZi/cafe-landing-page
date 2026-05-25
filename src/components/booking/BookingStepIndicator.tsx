import { cn } from "@/utils/cn";
import type { BookingStep } from "@/types/booking";

const STEPS: { id: BookingStep; label: string }[] = [
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "guests", label: "Guests" },
  { id: "details", label: "Details" },
];

const stepOrder: BookingStep[] = ["date", "time", "guests", "details"];

type Props = {
  current: BookingStep;
};

export function BookingStepIndicator({ current }: Props) {
  const currentIndex = stepOrder.indexOf(current);

  return (
    <nav aria-label="Booking progress" className="mb-8">
      <ol className="flex items-center justify-between gap-1">
        {STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = step.id === current;
          return (
            <li key={step.id} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <span
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-300",
                      done || active ? "bg-primary/50" : "bg-green-dark/15",
                    )}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                    active && "bg-primary text-white shadow-[0_0_20px_rgba(217,122,50,0.35)]",
                    done && !active && "bg-primary/20 text-primary",
                    !active && !done && "bg-green-dark/10 text-[#6B5B4F]",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done && !active ? "✓" : index + 1}
                </span>
                {index < STEPS.length - 1 && (
                  <span
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-300",
                      done ? "bg-primary/50" : "bg-green-dark/15",
                    )}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={cn(
                  "font-heading text-[10px] uppercase tracking-wider sm:text-xs",
                  active ? "text-primary" : "text-[#6B5B4F]",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
