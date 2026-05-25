import { BRAND_NAME } from "@/data/brand";
import { getInquiryTopicLabel } from "@/data/inquiryTopics";
import { postWeb3Form, type WebFormResult } from "@/lib/web3forms";
import type { InquiryPayload } from "@/types/inquiry";

export type SubmitInquiryResult = WebFormResult;

export async function submitInquiry(
  payload: InquiryPayload,
): Promise<SubmitInquiryResult> {
  const topicLabel = getInquiryTopicLabel(payload.topic);

  const message = [
    `New inquiry at ${BRAND_NAME}`,
    "",
    `Topic: ${topicLabel}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  return postWeb3Form({
    subject: `[${BRAND_NAME}] Inquiry — ${topicLabel} — ${payload.name}`,
    message,
    fromName: payload.name,
    email: payload.email,
    phone: payload.phone,
    extraFields: {
      topic: topicLabel,
      inquiry_type: payload.topic,
    },
    demoLabel: "Inquiry",
  });
}
