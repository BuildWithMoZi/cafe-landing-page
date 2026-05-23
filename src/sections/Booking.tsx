import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HiCheckCircle } from "react-icons/hi2";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/utils/cn";

const fields = [
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  { id: "phone", label: "Phone", type: "tel", required: true },
  { id: "guests", label: "Guests", type: "number", required: true, min: 1, max: 20 },
  { id: "date", label: "Date", type: "date", required: true },
  { id: "time", label: "Time", type: "time", required: true },
] as const;

export function Booking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Reservations"
          title="Book Your Table"
          subtitle="Reserve your spot in our sanctuary. Intimate seating, exceptional service, unforgettable evenings."
        />
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass-card-light rounded-3xl p-8 md:p-12"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.id}
                className={cn(
                  "relative",
                  field.id === "name" && "sm:col-span-2"
                )}
              >
                <Input
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  min={"min" in field ? field.min : undefined}
                  max={"max" in field ? field.max : undefined}
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                  className={cn(
                    "peer pt-6",
                    focused === field.id && "border-primary/60 ring-primary/30"
                  )}
                />
                <Label
                  htmlFor={field.id}
                  className={cn(
                    "pointer-events-none absolute left-4 transition-all duration-300",
                    focused === field.id
                      ? "top-2 text-[10px] text-primary"
                      : "top-4 text-sm text-beige peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]"
                  )}
                >
                  {field.label}
                </Label>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading || success}
            className="mt-8 w-full"
            data-cursor-hover
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark border-t-transparent" />
                  Reserving…
                </motion.span>
              ) : success ? (
                <motion.span
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <span className="inline-flex items-center gap-2">
                    <HiCheckCircle className="h-5 w-5" aria-hidden />
                    Reservation Confirmed!
                  </span>
                </motion.span>
              ) : (
                <motion.span key="submit">Confirm Reservation</motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
