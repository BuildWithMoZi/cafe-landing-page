import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/SectionHeading";
import "swiper/css";
import "swiper/css/effect-fade";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved By Thousands"
        subtitle="Real stories from guests who made Belfry & Co. part of their daily ritual."
      />
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="mx-auto max-w-3xl"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <motion.article
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-card-light rounded-3xl p-8 md:p-12"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex gap-1 text-primary"
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <HiStar key={i} className="h-5 w-5 fill-current" />
                ))}
              </motion.div>
              <blockquote className="mt-6 font-display text-xl italic leading-relaxed text-green-dark md:text-2xl">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <motion.div className="mt-8 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <p className="font-heading font-semibold text-green-dark">{t.name}</p>
                  <p className="text-sm text-[#6B5B4F]">{t.role}</p>
                </div>
              </motion.div>
            </motion.article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
