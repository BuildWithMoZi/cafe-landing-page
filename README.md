# Belfry & Co. — Premium Cafe Landing Page

A world-class, cinematic coffee brand landing page built with React, Vite, Tailwind CSS v4, Framer Motion, GSAP, Lenis, Swiper, Three.js, and Shadcn UI primitives.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — dark luxury theme
- **Framer Motion** + **GSAP ScrollTrigger**
- **Lenis** — smooth scrolling
- **Swiper.js** — product & testimonial carousels
- **Three.js** (@react-three/fiber) — floating coffee beans
- **Shadcn UI** — Button, Input, Label
- **React Icons**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Pre-booking, inquiry & admin email

The reservation flow is a 4-step wizard at `#contact` (navbar **Reserve**, hero **Book a Table**).

General questions and non-reservation messages use the inquiry form at `#inquiry` (navbar **Inquiry**). Both use the same Web3Forms key.

To notify admin on submit (GitHub Pages–friendly):

1. Copy `.env.example` to `.env`
2. Create a free key at [web3forms.com](https://web3forms.com)
3. Set `VITE_WEB3FORMS_ACCESS_KEY` in `.env`
4. Rebuild and redeploy

Without the key, **dev** shows a successful demo submit (console log); **production** shows a configuration message.

For GitHub Pages deploy, add `VITE_WEB3FORMS_ACCESS_KEY` (and optional `VITE_ADMIN_EMAIL`) under **Settings → Secrets and variables → Actions**.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── animations/     # GSAP setup & helpers
├── components/   # Reusable UI (cursor, loader, shadcn)
├── sections/     # Page sections (Hero, Menu, etc.)
├── layouts/      # MainLayout wrapper
├── pages/        # HomePage composition
├── hooks/        # Lenis, theme, count-up, parallax
├── data/         # Static content
├── styles/       # Global CSS & theme tokens
└── utils/        # cn() helper
```

## Sections

1. Floating glassmorphism navbar
2. Cinematic hero with 3D beans & parallax
3. Featured coffee categories
4. Signature products (Swiper)
5. About + animated counters
6. Special offers + countdown
7. Testimonials carousel
8. Masonry gallery + lightbox
9. Multi-step pre-booking wizard (calendar → time slots → guests → details)
10. Inquiry form (general, catering, events, feedback, partnerships)
11. Premium footer

## Features

- Custom cursor (desktop)
- Loading screen animation
- Scroll progress bar
- Back-to-top button
- Dark / light theme toggle
- Magnetic CTA buttons
- Glassmorphism cards
- SEO-friendly semantic HTML
# cafe-landing-page
