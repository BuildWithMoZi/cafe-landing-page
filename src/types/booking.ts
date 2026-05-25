export type BookingStep = "date" | "time" | "guests" | "details";

export type BookingGender = "male" | "female" | "other" | "prefer-not";

export interface BookingDraft {
  date: Date | null;
  timeSlot: string | null;
  guests: number;
  name: string;
  phone: string;
  email: string;
  gender: BookingGender | "";
  dateOfBirth: string;
}

export interface BookingPayload {
  date: string;
  timeSlot: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
}
