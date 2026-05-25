import { BRAND_NAME } from "@/data/brand";
import type { BookingPayload } from "@/types/booking";
import {
  formatDisplayDate,
  parseSlotKey,
  formatSlotLabel,
} from "@/lib/bookingSlots";
import { postWeb3Form, type WebFormResult } from "@/lib/web3forms";

function buildAdminMessage(payload: BookingPayload): string {
  const { hour, minute } = parseSlotKey(payload.timeSlot);
  const timeLabel = formatSlotLabel(hour, minute);

  return [
    `New pre-booking at ${BRAND_NAME}`,
    "",
    `Date: ${payload.date}`,
    `Time: ${timeLabel}`,
    `Guests: ${payload.guests}`,
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.gender ? `Gender: ${payload.gender}` : null,
    payload.dateOfBirth ? `Date of birth: ${payload.dateOfBirth}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export type SubmitBookingResult = WebFormResult;

export async function submitBooking(
  payload: BookingPayload,
): Promise<SubmitBookingResult> {
  const message = buildAdminMessage(payload);
  const { hour, minute } = parseSlotKey(payload.timeSlot);
  const displayDate = formatDisplayDate(new Date(payload.date + "T12:00:00"));

  return postWeb3Form({
    subject: `[${BRAND_NAME}] Pre-booking — ${payload.name} — ${displayDate}`,
    message,
    fromName: payload.name,
    email: payload.email,
    phone: payload.phone,
    extraFields: {
      date: payload.date,
      time: formatSlotLabel(hour, minute),
      guests: String(payload.guests),
    },
    demoLabel: "Pre-booking",
  });
}
