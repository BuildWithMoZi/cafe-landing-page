export type InquiryTopic =
  | "general"
  | "catering"
  | "private-event"
  | "feedback"
  | "partnership";

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  topic: InquiryTopic;
  message: string;
}
