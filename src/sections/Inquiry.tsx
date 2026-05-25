import { motion } from "framer-motion";
import {
  HiEnvelope,
  HiMapPin,
  HiPhone,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { BRAND_EMAIL, BRAND_NAME } from "@/data/brand";

const contactCards = [
  {
    icon: HiEnvelope,
    title: "Email us",
    detail: BRAND_EMAIL,
    href: `mailto:${BRAND_EMAIL}`,
  },
  {
    icon: HiPhone,
    title: "Call us",
    detail: "+1 (415) 555-0123",
    href: "tel:+14155550123",
  },
  {
    icon: HiMapPin,
    title: "Visit us",
    detail: "742 Belfry Lane, San Francisco, CA",
    href: "#inquiry",
  },
] as const;

export function Inquiry() {
  return (
    <section id="inquiry" className="section-padding relative">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Send an Inquiry"
          subtitle="Questions about events, catering, partnerships, or anything else? We'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass-card-light flex items-start gap-4 rounded-2xl p-5 md:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <HiChatBubbleLeftRight className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-green-dark">
                  We&apos;re here to help
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B5B4F]">
                  For table reservations, use our{" "}
                  <a
                    href="#contact"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    pre-booking
                  </a>{" "}
                  flow. For everything else, send an inquiry below.
                </p>
              </div>
            </div>

            {contactCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ y: -3 }}
                data-cursor-hover
                className="glass-card-light flex items-center gap-4 rounded-2xl p-5 transition-shadow hover:shadow-[0_8px_32px_rgba(217,122,50,0.12)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-green-dark">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-heading text-xs font-semibold uppercase tracking-wider text-primary">
                    {card.title}
                  </p>
                  <p className="mt-1 text-sm text-green-dark">{card.detail}</p>
                </div>
              </motion.a>
            ))}

            <p className="px-1 text-xs text-[#6B5B4F]/80">
              Typical response time: 24–48 hours · {BRAND_NAME}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-light rounded-3xl p-8 md:p-10 lg:p-12"
          >
            <InquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
