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

export const NEWS_PAGE_SIZE = 6;

export const FAQS_PAGE_SIZE = 20;

export const HOME_NEWS_PAGE_SIZE = 3;

export const GALLERY_PAGE_SIZE = 28;

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
};

export const FLAGS = {
  usePagefind: false,
  useLightboxControls: false,
}

export const CLASSES = [
  {
    name: "Youth Karate",
    ages: "4 – 15",
    description: "Foundational karate, kata, and kobudo instruction. Children develop discipline, confidence, and respect alongside physical skill.",
    schedule: {
      days: "Mon & Wed",
      time: "6:00 – 7:00 PM"
    }
  },
  {
    name: "Adult Karate",
    ages: "16 & Up",
    description: "Comprehensive Shorin-Ryu training including empty-hand kata, bunkai, and traditional Okinawan self-defense applications.",
    schedule: {
      days: "Tue & Thu",
      time: "6:00 – 8:00 PM"
    }
  },
  {
    name: "CPR Training",
    description: "American Heart Association certified CPR and First Aid training. Open to dojo members and the wider community."
  }
];
