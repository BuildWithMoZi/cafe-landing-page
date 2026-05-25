import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiPaperAirplane } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { inquiryTopics } from "@/data/inquiryTopics";
import { submitInquiry } from "@/lib/submitInquiry";
import { cn } from "@/utils/cn";
import type { InquiryTopic } from "@/types/inquiry";

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  topic: "general" as InquiryTopic,
  message: "",
};

export function InquiryForm() {
  const [form, setForm] = useState(INITIAL);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = (p: Partial<typeof INITIAL>) => {
    setForm((f) => ({ ...f, ...p }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitInquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      topic: form.topic,
      message: form.message.trim(),
    });

    setLoading(false);
    if (result.ok) {
      setSuccess(true);
      setForm(INITIAL);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center md:py-14"
      >
        <HiCheckCircle className="h-14 w-14 text-primary" aria-hidden />
        <h3 className="mt-5 font-display text-2xl font-semibold text-green-dark">
          Message Sent!
        </h3>
        <p className="mt-3 max-w-sm text-sm text-[#6B5B4F]">
          Thank you for reaching out. Our team will get back to you within 24–48
          hours.
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-8 border-green-dark/25 text-green-dark hover:bg-primary/10 hover:text-primary"
          onClick={() => setSuccess(false)}
          data-cursor-hover
        >
          Send another inquiry
        </Button>
      </motion.div>
    );
  }

  const textFields = [
    { id: "name", label: "Full Name", type: "text", required: true, value: form.name },
    { id: "email", label: "Email", type: "email", required: true, value: form.email },
    { id: "phone", label: "Phone (optional)", type: "tel", required: false, value: form.phone },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {textFields.map((field) => (
          <div
            key={field.id}
            className={cn("relative", field.id === "name" && "sm:col-span-2")}
          >
            <Input
              id={`inquiry-${field.id}`}
              type={field.type}
              required={field.required}
              value={field.value}
              onChange={(e) => patch({ [field.id]: e.target.value })}
              onFocus={() => setFocused(field.id)}
              onBlur={() => setFocused(null)}
              className={cn(
                "peer pt-6",
                focused === field.id && "border-primary/60 ring-primary/30",
              )}
            />
            <Label
              htmlFor={`inquiry-${field.id}`}
              className={cn(
                "pointer-events-none absolute left-4 transition-all duration-300",
                focused === field.id || field.value
                  ? "top-2 text-[10px] text-primary"
                  : "top-4 text-sm text-[#6B5B4F]",
              )}
            >
              {field.label}
            </Label>
          </div>
        ))}

        <div className="relative sm:col-span-2">
          <Label
            htmlFor="inquiry-topic"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#6B5B4F]"
          >
            Inquiry type
          </Label>
          <select
            id="inquiry-topic"
            required
            value={form.topic}
            onChange={(e) => patch({ topic: e.target.value as InquiryTopic })}
            className="flex h-12 w-full rounded-xl border border-green-dark/15 bg-white/50 px-4 text-sm text-green-dark backdrop-blur-md transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
          >
            {inquiryTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative sm:col-span-2">
          <Label
            htmlFor="inquiry-message"
            className={cn(
              "pointer-events-none absolute left-4 z-[1] transition-all duration-300",
              focused === "message" || form.message
                ? "top-3 text-[10px] text-primary"
                : "top-4 text-sm text-[#6B5B4F]",
            )}
          >
            Your message
          </Label>
          <textarea
            id="inquiry-message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => patch({ message: e.target.value })}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            className={cn(
              "flex min-h-[140px] w-full resize-y rounded-xl border border-green-dark/15 bg-white/50 px-4 pb-3 pt-7 text-sm text-green-dark backdrop-blur-md transition-all duration-300 placeholder:text-transparent focus:border-primary/50 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/25 font-body",
              focused === "message" && "border-primary/60",
            )}
          />
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-xl border border-orange-dark/30 bg-orange-dark/10 px-4 py-3 text-sm text-orange-dark"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full gap-2 sm:w-auto"
        data-cursor-hover
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark border-t-transparent" />
            Sending…
          </>
        ) : (
          <>
            Send Inquiry
            <HiPaperAirplane className="h-4 w-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
