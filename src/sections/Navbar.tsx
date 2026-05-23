import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { navLinks } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/utils/cn";

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      data-cursor-hover
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn("nav-link", isActive && "nav-link-active")}
    >
      {label}
    </motion.a>
  );
}

export function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#menu");

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroVisible = entry.isIntersecting;
        setShowNav(!heroVisible);
        if (heroVisible) {
          setMobileOpen(false);
        } else {
          setActive((prev) => (prev === "#home" ? "#menu" : prev));
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showNav) return;

    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showNav]);

  useEffect(() => {
    if (!showNav) return;

    const sectionEls = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id !== "home" || window.scrollY < window.innerHeight * 0.5) {
            setActive(`#${id}`);
          }
        }
      },
      { rootMargin: "-25% 0px -40% 0px", threshold: [0.15, 0.4, 0.6] }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showNav]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <AnimatePresence>
      {showNav && (
        <motion.header
          key="navbar"
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "navbar-shell fixed top-3 left-1/2 z-[9000] w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 rounded-2xl transition-all duration-500 sm:top-4 md:top-6",
            scrolled && "navbar-shell-scrolled"
          )}
        >
          <nav className="flex min-h-14 items-center justify-between gap-2 px-3 py-2 sm:min-h-[3.75rem] sm:gap-3 sm:px-4 md:px-6">
            <motion.a
              href="#home"
              className="flex shrink-0 items-center"
              data-cursor-hover
              aria-label="Belfry & Co. home"
              onClick={() => setMobileOpen(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <BrandLogo variant="nav" animated />
            </motion.a>

            <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
              {navLinks.map((link) => (
                <li key={link.href} className="shrink-0">
                  <NavLink
                    href={link.href}
                    label={link.label}
                    isActive={active === link.href}
                  />
                </li>
              ))}
            </ul>

            <div className="hidden shrink-0 items-center md:flex">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="sm" asChild>
                  <a href="#contact" data-cursor-hover>
                    Order Now
                  </a>
                </Button>
              </motion.div>
            </div>

            <div className="flex shrink-0 items-center lg:hidden">
              <motion.button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                whileHover={{
                  scale: 1.06,
                  backgroundColor: "rgba(217, 122, 50, 0.12)",
                }}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-white/60 text-primary transition-colors sm:h-10 sm:w-10",
                  mobileOpen && "border-primary/50 bg-primary/10"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiXMark className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiBars3 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-primary/15 lg:hidden"
              >
                <ul className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto p-4">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -10, opacity: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-xl px-4 py-3 font-heading text-sm font-medium transition-all duration-300",
                          active === link.href
                            ? "bg-primary/15 text-primary shadow-sm"
                            : "text-green-dark hover:bg-primary/10 hover:text-primary"
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-2 md:hidden"
                  >
                    <Button className="w-full" asChild>
                      <a href="#contact" onClick={() => setMobileOpen(false)}>
                        Order Now
                      </a>
                    </Button>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
