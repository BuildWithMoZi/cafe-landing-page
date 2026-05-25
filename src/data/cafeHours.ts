/** 0 = Sunday … 6 = Saturday — aligned with Footer opening hours */
export type DayHours = {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
};

export const CAFE_HOURS_BY_DAY: Record<number, DayHours | null> = {
  0: { openHour: 8, openMinute: 0, closeHour: 21, closeMinute: 0 },
  1: { openHour: 7, openMinute: 0, closeHour: 22, closeMinute: 0 },
  2: { openHour: 7, openMinute: 0, closeHour: 22, closeMinute: 0 },
  3: { openHour: 7, openMinute: 0, closeHour: 22, closeMinute: 0 },
  4: { openHour: 7, openMinute: 0, closeHour: 22, closeMinute: 0 },
  5: { openHour: 7, openMinute: 0, closeHour: 22, closeMinute: 0 },
  6: { openHour: 8, openMinute: 0, closeHour: 23, closeMinute: 0 },
};

/** Minutes between selectable reservation slots */
export const SLOT_INTERVAL_MINUTES = 30;

/** How far ahead guests may pre-book */
export const MAX_BOOKING_DAYS_AHEAD = 60;
