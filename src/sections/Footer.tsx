import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { LuCoffee } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { BRAND_EMAIL, BRAND_NAME } from "@/data/brand";

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const hours = [
  { day: "Mon – Fri", time: "7:00 AM – 10:00 PM" },
  { day: "Saturday", time: "8:00 AM – 11:00 PM" },
  { day: "Sunday", time: "8:00 AM – 9:00 PM" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-green-dark/10 bg-transparent">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.02 }}
              className="inline-block"
              aria-label={`${BRAND_NAME} home`}
            >
              <BrandLogo variant="footer" />
            </motion.a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6B5B4F]">
              Crafting extraordinary coffee experiences since 2016. Visit us and
              taste the future of café culture.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  data-cursor-hover
                  className="flex h-10 w-10 items-center justify-center rounded-full glass-card-light text-primary hover:bg-primary/20"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Opening Hours
            </h4>
            <ul className="mt-4 space-y-3">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm">
                  <span className="text-[#6B5B4F]">{h.day}</span>
                  <span className="text-green-dark">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-[#6B5B4F]">
              <li>742 Belfry Lane</li>
              <li>San Francisco, CA 94102</li>
              <li>
                <a href="tel:+14155550123" className="hover:text-primary transition-colors">
                  +1 (415) 555-0123
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND_EMAIL}`} className="hover:text-primary transition-colors">
                  {BRAND_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="#inquiry"
                  className="font-medium text-primary hover:underline underline-offset-2"
                >
                  Send an inquiry →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-[#6B5B4F]">
              Get exclusive offers and brewing tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <Input placeholder="your@email.com" type="email" className="flex-1" />
              <Button type="submit" size="sm" data-cursor-hover>
                Join
              </Button>
            </form>
            <div className="mt-6 overflow-hidden rounded-xl">
              <iframe
                title={`${BRAND_NAME} location`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1"
                className="h-32 w-full border-0 opacity-80 grayscale transition-all hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 text-center text-xs text-[#6B5B4F] sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {BRAND_NAME} All rights reserved.</p>
          <p className="inline-flex items-center justify-center gap-1.5 sm:justify-end">
            Crafted with
            <LuCoffee className="h-3.5 w-3.5 text-primary" aria-hidden />
            for modern souls
          </p>
        </div>
      </div>
    </footer>
  );
}
