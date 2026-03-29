export const NEWS_PAGE_SIZE = 6;

export const FAQS_PAGE_SIZE = 20;

export const HOME_NEWS_PAGE_SIZE = 3;

export const GALLERY_PAGE_SIZE = 28;

export const DICTIONARY_PAGE_SIZE = 12;

export interface IBaseClass {
  name: string;
  description: string;
}

export interface IKarateClass extends IBaseClass {
  ages: string;
  startDate: string; // (YYYY-MM-DD)
  startTime: string; // (HH:mm)
  endTime: string;   // (HH:mm)
  timeZone: string;
  location: string;
  recurrence: string;
  recurrence_byDay: number[]; // e.g. [1,3] for Monday and Wednesday
  schedule: string;
  tuition: number[], // e.g. [100, 200] $100 one day per ${recurrence}, $200 two days per ${recurrence}
  tuition_recurrence: string;
}

export const YOUTH_CLASS: IKarateClass = {
  ages: "4 – 15",
  name: "Youth Karate",
  description: "Foundational karate, kata, and kobudo instruction. Children develop discipline, confidence, and respect alongside physical skill.",
  startDate: "2025-01-06", // (YYYY-MM-DD)
  startTime: "18:00",
  endTime: "19:00",
  timeZone: "EST",
  location: "Deans Okinawan Martial Arts, 23725 Three Notch Rd, Hollywood, MD 20636",
  recurrence: "Weekly",
  recurrence_byDay: [1,3], // Monday and Wednesday
  schedule: "Mon & Wed",
  tuition: [35, 40],
  tuition_recurrence: "Monthly",
}

export const ADULT_CLASS: IKarateClass = {
  name: "Adult Karate",
  ages: "16 & Up",
  description: "Comprehensive Shorin-Ryu training including empty-hand kata, bunkai, and traditional Okinawan self-defense applications.",
  startDate: "2025-01-06", // (YYYY-MM-DD)
  startTime: "18:00",
  endTime: "20:00",
  timeZone: "EST",
  location: "Deans Okinawan Martial Arts, 23725 Three Notch Rd, Hollywood, MD 20636",
  recurrence: "Weekly",
  recurrence_byDay: [2,4], // Tuesday and Thursday
  schedule: "Tue & Thu",
  tuition: [45, 60],
  tuition_recurrence: "Monthly",
}
