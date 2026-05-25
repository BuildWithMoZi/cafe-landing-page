import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { BookingStepIndicator } from "@/components/booking/BookingStepIndicator";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { GuestCountStep } from "@/components/booking/GuestCountStep";
import { BookingDetailsForm } from "@/components/booking/BookingDetailsForm";
import { cn } from "@/utils/cn";
import { formatIsoDate } from "@/lib/bookingSlots";
import { submitBooking } from "@/lib/submitBooking";
import type { BookingDraft, BookingStep } from "@/types/booking";

const INITIAL_DRAFT: BookingDraft = {
  date: null,
  timeSlot: null,
  guests: 2,
  name: "",
  phone: "",
  email: "",
  gender: "",
  dateOfBirth: "",
};

const stepOrder: BookingStep[] = ["date", "time", "guests", "details"];

const stepMotion = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.25 },
};

export function PreBookingWizard() {
  const [step, setStep] = useState<BookingStep>("date");
  const [draft, setDraft] = useState<BookingDraft>(INITIAL_DRAFT);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = useCallback((p: Partial<BookingDraft>) => {
    setDraft((d) => ({ ...d, ...p }));
    setError(null);
  }, []);

  const stepIndex = stepOrder.indexOf(step);
  const canContinue =
    (step === "date" && draft.date !== null) ||
    (step === "time" && draft.timeSlot !== null) ||
    (step === "guests" && draft.guests >= 1) ||
    (step === "details" &&
      draft.name.trim() &&
      draft.phone.trim() &&
      draft.email.trim());

  const goNext = () => {
    if (!canContinue) return;
    const next = stepOrder[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    const prev = stepOrder[stepIndex - 1];
    if (prev) setStep(prev);
  };

  const handleSubmit = async () => {
    if (!draft.date || !draft.timeSlot) return;
    setLoading(true);
    setError(null);

    const result = await submitBooking({
      date: formatIsoDate(draft.date),
      timeSlot: draft.timeSlot,
      guests: draft.guests,
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      gender: draft.gender || undefined,
      dateOfBirth: draft.dateOfBirth || undefined,
    });

    setLoading(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <HiCheckCircle className="h-16 w-16 text-primary" aria-hidden />
        <h3 className="mt-6 font-display text-2xl font-semibold text-green-dark">
          Reservation Confirmed!
        </h3>
        <p className="mt-3 max-w-sm text-sm text-[#6B5B4F]">
          Thank you, {draft.name.split(" ")[0] || "guest"}. We&apos;ve received your
          pre-booking and will be in touch shortly.
        </p>
      </motion.div>
    );
  }

  const stepContentClass =
    step === "date"
      ? "mx-auto flex w-full max-w-[268px] justify-center md:max-w-[380px] lg:max-w-[420px]"
      : step === "time"
        ? "mx-auto w-full max-w-3xl"
        : step === "guests"
          ? "mx-auto w-full max-w-md"
          : "mx-auto w-full max-w-2xl";

  return (
    <div className="w-full">
      <BookingStepIndicator current={step} />

      <AnimatePresence mode="wait">
        <motion.div key={step} {...stepMotion} className={stepContentClass}>
          {step === "date" && (
            <BookingCalendar
              selected={draft.date}
              onSelect={(date) => patch({ date, timeSlot: null })}
            />
          )}
          {step === "time" && draft.date && (
            <TimeSlotGrid
              date={draft.date}
              selected={draft.timeSlot}
              onSelect={(timeSlot) => patch({ timeSlot })}
            />
          )}
          {step === "guests" && (
            <GuestCountStep
              value={draft.guests}
              onChange={(guests) => patch({ guests })}
            />
          )}
          {step === "details" && (
            <BookingDetailsForm draft={draft} onChange={patch} />
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-orange-dark/30 bg-orange-dark/10 px-4 py-3 text-sm text-orange-dark"
        >
          {error}
        </p>
      )}

      <div
        className={cn(
          "mx-auto mt-8 flex w-full max-w-2xl flex-col-reverse gap-3 sm:flex-row sm:items-center",
          step === "date"
            ? "max-w-[268px] justify-center sm:justify-center md:max-w-[380px] lg:max-w-[420px]"
            : "justify-between",
        )}
      >
        {step !== "date" && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={goBack}
            disabled={loading}
            className="gap-2 border-green-dark/25 text-green-dark hover:bg-primary/10 hover:text-primary"
            data-cursor-hover
          >
            <HiArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Button>
        )}

        {step !== "details" ? (
          <Button
            type="button"
            size="lg"
            onClick={goNext}
            disabled={!canContinue}
            className={cn(
              "gap-2",
              step === "date" && "w-full sm:mx-auto sm:w-auto",
            )}
            data-cursor-hover
          >
            Continue
            <HiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            onClick={handleSubmit}
            disabled={loading || !canContinue}
            className="w-full gap-2 sm:ml-auto sm:w-auto"
            data-cursor-hover
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark border-t-transparent" />
                Reserving…
              </>
            ) : (
              "Confirm Pre-Booking"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
