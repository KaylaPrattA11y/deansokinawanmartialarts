export const SITE_SEO = {
  name: {
    long: "Dean's Okinawan Karate | Shorin-Ryu Matsumura Seito",
    short: "Dean's Okinawan Karate"
  },
  description: "Shorin-Ryu Matsumura Seito karate in Hollywood, MD. Traditional Okinawan martial arts training for youth and adults. Self-defense, kobudo, and kata instruction.",
  keywords: [
    "Okinawan karate",
    "Shorin-Ryu",
    "Matsumura Seito",
    "martial arts",
    "karate classes",
    "self-defense",
    "Southern Maryland karate",
    "SOMD karate",
    "youth karate",
    "adult karate",
    "Hollywood MD"
  ],
}

export const SITE_SCHEMA = {
  type: "SportsActivityLocation",
  name: SITE_SEO.name.short,
  imagePath: "/logo.png",
  address: {
    locality: "Hollywood",
    region: "MD",
    country: "US",
  },
  telephone: "(301) 373-5031",
  priceRange: "$$",
  sameAs: [] as string[],
}

export const BASE_URL = import.meta.env.BASE_URL;

export const IS_DEV = import.meta.env.DEV;

export const BREAKPOINTS = {
  sm: 600,
  md: 900,
  lg: 1200,
}

export const ROUTES = {
  home: '',
  news: 'news/',
  instructors: 'instructors/',
  about: 'about/',
  admin: 'admin/',
  faqs: 'faqs/',
  gallery: 'gallery/',
  dictionary: 'dictionary/',
};

export const FLAGS = {
  usePagefind: false,
  useLightboxControls: false,
}
