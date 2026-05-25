import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { PreBookingWizard } from "@/components/booking/PreBookingWizard";

export function Booking() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Reservations"
          title="Book Your Table"
          subtitle="Reserve your spot in our sanctuary. Choose your date, time, and party size — we'll take care of the rest."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-light w-full rounded-3xl p-8 md:p-12 lg:p-14"
        >
          <PreBookingWizard />
        </motion.div>
      </div>
    </section>
  );
}
