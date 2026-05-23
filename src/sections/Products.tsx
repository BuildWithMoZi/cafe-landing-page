import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { HiStar, HiShoppingBag } from "react-icons/hi2";
import { products } from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { SteamEffect } from "@/components/SteamEffect";
import { useGsapScope } from "@/hooks/useGsapScope";
import { animateCarouselSlides } from "@/animations/scrollAnimations";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export function Products() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    requestAnimationFrame(() => {
      animateCarouselSlides(scope, ".swiper-slide");
    });
  });

  return (
    <section
      ref={scopeRef}
      className="section-padding relative overflow-hidden"
      style={{ perspective: 1100 }}
    >
      <SectionHeading
        eyebrow="Signature Collection"
        title="Our Finest Creations"
        subtitle="Hand-selected beans, precision extraction, and flavors that linger like a beautiful dream."
      />
      <Swiper
        modules={[Autoplay, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1.2}
        spaceBetween={24}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 8,
          stretch: 0,
          depth: 120,
          modifier: 1.5,
          slideShadows: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
        className="!pb-14"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="group relative overflow-hidden rounded-3xl glass-card-light"
      data-cursor-hover
    >
      <div className="relative h-64 overflow-hidden sm:h-72">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hover && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2">
            <SteamEffect />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full glass-card-light px-3 py-1">
          <HiStar className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-green-dark">
            {product.rating}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-green-dark">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-[#6B5B4F]">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            data-cursor-hover
            className="flex items-center gap-2 rounded-full bg-cta-gradient px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-lg shadow-primary/20"
          >
            <HiShoppingBag className="h-4 w-4" />
            {added ? "Added!" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
