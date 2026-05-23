import { useRef, useState, type MouseEvent } from "react";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/SectionHeading";
import { HiArrowRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useGsapScope } from "@/hooks/useGsapScope";
import { animate3DStagger } from "@/animations/scrollAnimations";

export function Categories() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    const cards = scope.querySelectorAll("[data-category-reveal]");
    if (cards.length) animate3DStagger(cards);
  });

  return (
    <section id="menu" ref={scopeRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Our Menu"
        title="Featured Coffee Categories"
        subtitle="Six signature experiences — each crafted with precision, passion, and a touch of magic."
      />
      <div
        className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: 900 }}
      >
        {categories.map((cat) => (
          <div key={cat.id} data-category-reveal className="[transform-style:preserve-3d]">
            <CategoryCard category={cat} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof categories)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative overflow-hidden rounded-2xl glass-card-light transition-all duration-500 hover:glow-primary hover:ring-1 hover:ring-primary/25"
      data-cursor-hover
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(217,122,50,0.45), transparent) border-box",
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-2xl font-semibold text-green-dark">
            {category.title}
          </h3>
          <span className="font-heading text-sm font-semibold text-primary">
            {category.price}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#6B5B4F]">{category.description}</p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-1">
            View Selection
            <HiArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Button>
      </div>
    </article>
  );
}
