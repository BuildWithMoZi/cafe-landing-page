import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import type { BookingDraft, BookingGender } from "@/types/booking";

type Props = {
  draft: BookingDraft;
  onChange: (patch: Partial<BookingDraft>) => void;
};

const genderOptions: { value: BookingGender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not", label: "Prefer not to say" },
];

export function BookingDetailsForm({ draft, onChange }: Props) {
  const [focused, setFocused] = useState<string | null>(null);

  const fields = [
    { id: "name", label: "Full Name", type: "text", required: true, value: draft.name },
    { id: "phone", label: "Mobile Number", type: "tel", required: true, value: draft.phone },
    { id: "email", label: "Email", type: "email", required: true, value: draft.email },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.id}
            className={cn("relative", field.id === "name" && "sm:col-span-2")}
          >
            <Input
              id={`booking-${field.id}`}
              type={field.type}
              required={field.required}
              value={field.value}
              onChange={(e) =>
                onChange({ [field.id]: e.target.value } as Partial<BookingDraft>)
              }
              onFocus={() => setFocused(field.id)}
              onBlur={() => setFocused(null)}
              className={cn(
                "peer pt-6",
                focused === field.id && "border-primary/60 ring-primary/30",
              )}
            />
            <Label
              htmlFor={`booking-${field.id}`}
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
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative">
          <Label
            htmlFor="booking-gender"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#6B5B4F]"
          >
            Gender <span className="font-normal normal-case">(optional)</span>
          </Label>
          <select
            id="booking-gender"
            value={draft.gender}
            onChange={(e) =>
              onChange({ gender: e.target.value as BookingDraft["gender"] })
            }
            className="flex h-12 w-full rounded-xl border border-green-dark/15 bg-white/50 px-4 text-sm text-green-dark backdrop-blur-md transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
          >
            <option value="">Select…</option>
            {genderOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Label
            htmlFor="booking-dob"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#6B5B4F]"
          >
            Date of birth <span className="font-normal normal-case">(optional)</span>
          </Label>
          <Input
            id="booking-dob"
            type="date"
            value={draft.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
}
