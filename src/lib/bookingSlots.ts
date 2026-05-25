import {
  CAFE_HOURS_BY_DAY,
  MAX_BOOKING_DAYS_AHEAD,
  SLOT_INTERVAL_MINUTES,
  type DayHours,
} from "@/data/cafeHours";

export function getDayHours(date: Date): DayHours | null {
  return CAFE_HOURS_BY_DAY[date.getDay()] ?? null;
}

export function isDateBookable(date: Date, today = startOfDay(new Date())): boolean {
  const day = startOfDay(date);
  if (day < today) return false;
  const max = new Date(today);
  max.setDate(max.getDate() + MAX_BOOKING_DAYS_AHEAD);
  if (day > startOfDay(max)) return false;
  return getDayHours(date) !== null;
}

export function formatSlotLabel(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const m = minute.toString().padStart(2, "0");
  return `${h12}:${m} ${period}`;
}

export function slotKey(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

export function parseSlotKey(key: string): { hour: number; minute: number } {
  const [h, m] = key.split(":").map(Number);
  return { hour: h, minute: m };
}

export function getTimeSlotsForDate(date: Date): string[] {
  const hours = getDayHours(date);
  if (!hours) return [];

  const slots: string[] = [];
  let cursor =
    hours.openHour * 60 + hours.openMinute;
  const end =
    hours.closeHour * 60 + hours.closeMinute - SLOT_INTERVAL_MINUTES;

  while (cursor <= end) {
    const hour = Math.floor(cursor / 60);
    const minute = cursor % 60;
    slots.push(slotKey(hour, minute));
    cursor += SLOT_INTERVAL_MINUTES;
  }

  return slots;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSlotPastForToday(
  date: Date,
  slot: string,
  now = new Date(),
): boolean {
  if (!isSameDay(date, now)) return false;
  const { hour, minute } = parseSlotKey(slot);
  const slotMinutes = hour * 60 + minute;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotMinutes <= nowMinutes;
}

export function getAvailableSlotsForDate(date: Date, now = new Date()): string[] {
  return getTimeSlotsForDate(date).filter(
    (slot) => !isSlotPastForToday(date, slot, now),
  );
}
