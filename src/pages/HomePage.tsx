import { Hero } from "@/sections/Hero";
import { Categories } from "@/sections/Categories";
import { Products } from "@/sections/Products";
import { About } from "@/sections/About";
import { Offers } from "@/sections/Offers";
import { Testimonials } from "@/sections/Testimonials";
import { Gallery } from "@/sections/Gallery";
import { Booking } from "@/sections/Booking";
import { Inquiry } from "@/sections/Inquiry";
import { Footer } from "@/sections/Footer";
import { SectionsShell } from "@/components/SectionsShell";

export function HomePage() {
  return (
    <>
      <Hero />
      <SectionsShell>
        <Categories />
        <Products />
        <About />
        <Offers />
        <Testimonials />
        <Gallery />
        <Booking />
        <Inquiry />
        <Footer />
      </SectionsShell>
    </>
  );
}
