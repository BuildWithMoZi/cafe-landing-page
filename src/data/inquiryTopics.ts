import type { InquiryTopic } from "@/types/inquiry";

export const inquiryTopics: { value: InquiryTopic; label: string }[] = [
  { value: "general", label: "General inquiry" },
  { value: "catering", label: "Catering & bulk orders" },
  { value: "private-event", label: "Private events & celebrations" },
  { value: "feedback", label: "Feedback & suggestions" },
  { value: "partnership", label: "Partnerships & collaborations" },
];

export function getInquiryTopicLabel(topic: InquiryTopic): string {
  return inquiryTopics.find((t) => t.value === topic)?.label ?? topic;
}
