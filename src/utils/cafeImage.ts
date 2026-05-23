/** Public /cafe-img assets with GitHub Pages base URL support. */
export function cafeImg(filename: string): string {
  return `${import.meta.env.BASE_URL}cafe-img/${encodeURIComponent(filename)}`;
}

/** Signature drink shots (PNG) — categories & product carousel */
const drinks = {
  espresso: cafeImg("expresso.png"),
  cappuccino: cafeImg("Cappuccino.png"),
  latte: cafeImg("Latte.png"),
  mocha: cafeImg("Mocha.png"),
  coldBrew: cafeImg("ColdBrew.png"),
  desserts: cafeImg("Desserts.png"),
} as const;

export type GalleryCategory = "coffee" | "interior" | "barista" | "desserts";

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  tall: boolean;
};

export const cafeImages = {
  hero: cafeImg("unnamed (6).jpg"),

  /** Cafe ambiance collage — interior & atmosphere */
  about: [
    cafeImg("2025-11-14 (2).jpg"),
    cafeImg("2025-11-21 (1).jpg"),
    cafeImg("unnamed (3).jpg"),
    cafeImg("2025-11-21 (6).jpg"),
    cafeImg("2025-11-14 (1).jpg"),
    cafeImg("2025-11-21 (5).jpg"),
    cafeImg("2025-11-14 (3).jpg"),
    cafeImg("2025-11-21 (2).jpg"),
  ],

  categories: drinks,

  /** Signature drinks — matched to menu PNGs */
  products: [
    drinks.espresso,
    drinks.latte,
    drinks.coldBrew,
    drinks.cappuccino,
    drinks.mocha,
    drinks.desserts,
  ],

  /** Reservation section ambiance */
  booking: cafeImg("2025-11-14 (4).jpg"),

  /** Weekend offer highlights */
  offers: [
    { src: drinks.latte, alt: "Artisan latte on offer" },
    { src: drinks.mocha, alt: "Rich mocha on offer" },
    { src: drinks.coldBrew, alt: "Cold brew on offer" },
  ],

  /** Full gallery — every remaining cafe photo */
  gallery: [
    {
      src: cafeImg("unnamed (10).jpg"),
      alt: "Barista serving at Belfry & Co. counter",
      category: "barista",
      tall: true,
    },
    {
      src: cafeImg("2025-11-21 (8).jpg"),
      alt: "Espresso bar with pastry display",
      category: "barista",
      tall: false,
    },
    {
      src: cafeImg("unnamed (7).jpg"),
      alt: "Handcrafted dessert at Belfry & Co.",
      category: "desserts",
      tall: false,
    },
    {
      src: cafeImg("2025-11-21.jpg"),
      alt: "Modern cafe seating and bar",
      category: "interior",
      tall: true,
    },
    {
      src: cafeImg("2025-11-14.jpg"),
      alt: "Fresh food spread at Belfry & Co.",
      category: "desserts",
      tall: false,
    },
    {
      src: cafeImg("2025-11-21 (4).jpg"),
      alt: "Cozy corner seating with warm lighting",
      category: "interior",
      tall: false,
    },
    {
      src: cafeImg("unnamed (11).jpg"),
      alt: "Signature Belfry & Co. coffee cup",
      category: "coffee",
      tall: true,
    },
    {
      src: cafeImg("2025-11-14 (5).jpg"),
      alt: "Guests enjoying the dining area",
      category: "interior",
      tall: false,
    },
    {
      src: cafeImg("2025-11-21 (3).jpg"),
      alt: "Open kitchen and service counter",
      category: "barista",
      tall: false,
    },
    {
      src: cafeImg("unnamed (12).jpg"),
      alt: "Latte art close-up",
      category: "coffee",
      tall: true,
    },
    {
      src: cafeImg("2025-11-14 (6).jpg"),
      alt: "Evening ambiance at the cafe",
      category: "interior",
      tall: false,
    },
    {
      src: cafeImg("2025-11-21 (7).jpg"),
      alt: "Barista crafting a pour-over",
      category: "barista",
      tall: false,
    },
    {
      src: cafeImg("unnamed (1).jpg"),
      alt: "Steaming espresso shot",
      category: "coffee",
      tall: false,
    },
    {
      src: cafeImg("2025-11-14 (7).jpg"),
      alt: "Family-friendly cafe seating",
      category: "interior",
      tall: true,
    },
    {
      src: cafeImg("2025-11-21 (9).jpg"),
      alt: "Pastry case and morning brews",
      category: "desserts",
      tall: false,
    },
    {
      src: cafeImg("unnamed (13).jpg"),
      alt: "Iced coffee on the counter",
      category: "coffee",
      tall: false,
    },
    {
      src: cafeImg("2025-11-21 (10).jpg"),
      alt: "Gaming lounge — Eat Play Repeat",
      category: "interior",
      tall: true,
    },
    {
      src: cafeImg("unnamed (14).jpg"),
      alt: "Cappuccino with latte art",
      category: "coffee",
      tall: false,
    },
    {
      src: cafeImg("unnamed (15).jpg"),
      alt: "Seasonal specialty drink",
      category: "coffee",
      tall: false,
    },
  ] satisfies GalleryItem[],

  avatars: [
    cafeImg("unnamed (8).jpg"),
    cafeImg("unnamed (2).jpg"),
    cafeImg("unnamed.jpg"),
    cafeImg("unnamed (4).jpg"),
    cafeImg("unnamed (5).jpg"),
    cafeImg("unnamed (9).jpg"),
  ],
} as const;
