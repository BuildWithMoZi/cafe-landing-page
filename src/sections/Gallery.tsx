import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiXMark } from "react-icons/hi2";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useGsapScope } from "@/hooks/useGsapScope";
import {
  animateClipReveal,
  animateClipRevealInstant,
  refreshScrollTriggers,
} from "@/animations/scrollAnimations";

const INITIAL_VISIBLE = 9;

export function Gallery() {
  const [lightbox, setLightbox] = useState<(typeof galleryImages)[number] | null>(
    null,
  );
  const [expanded, setExpanded] = useState(false);

  const hasMore = galleryImages.length > INITIAL_VISIBLE;
  const visibleImages = expanded
    ? galleryImages
    : galleryImages.slice(0, INITIAL_VISIBLE);

  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    const tiles = scope.querySelectorAll("[data-gallery-reveal]");
    if (tiles.length) animateClipReveal(tiles);
  });

  useEffect(() => {
    if (!expanded || !scopeRef.current) return;
    const newTiles = scopeRef.current.querySelectorAll(
      '[data-gallery-reveal="new"]',
    );
    if (!newTiles.length) return;
    const tween = animateClipRevealInstant(newTiles);
    refreshScrollTriggers();
    return () => {
      tween.kill();
    };
  }, [expanded, scopeRef]);

  return (
    <section id="gallery" ref={scopeRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Gallery"
        title="Moments Worth Savoring"
        subtitle="Step inside our world — from bean to cup, ambiance to artistry."
      />
      <div className="mx-auto max-w-7xl columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        <AnimatePresence>
          {visibleImages.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              data-gallery-reveal
              data-gallery-reveal-new={
                expanded && i >= INITIAL_VISIBLE ? "new" : undefined
              }
              onClick={() => setLightbox(img)}
              data-cursor-hover
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl sm:mb-4"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-green-dark/80 via-green-dark/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-heading text-xs uppercase tracking-wider text-primary">
                  {img.category}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            data-cursor-hover
            onClick={() => setExpanded((prev) => !prev)}
            className="gap-2 border-primary/30 font-heading uppercase tracking-wider text-green-dark hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            {expanded ? "View Less" : "View More"}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiChevronDown className="h-5 w-5" />
            </motion.span>
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[15000] flex items-center justify-center bg-dark/95 p-4 backdrop-blur-xl"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 text-cream hover:text-primary"
              aria-label="Close lightbox"
            >
              <HiXMark className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-5xl rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
