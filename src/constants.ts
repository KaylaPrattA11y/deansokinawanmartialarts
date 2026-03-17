export const NEWS_PAGE_SIZE = 6;

export const FAQS_PAGE_SIZE = 20;

export const HOME_NEWS_PAGE_SIZE = 3;

export const GALLERY_PAGE_SIZE = 28;

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

export const CPR_CLASS: IBaseClass = {
  name: "CPR & First Aid",
  description: "Learn life-saving CPR and first aid skills in a hands-on, practical course. Certification included.",
}

export const DEFINITIONS = {
  Bunkai: "The application or analysis of the movements in a kata, demonstrating their practical use in self-defense.",
  Dojo: "A place where martial arts are practiced.",
  Karate: "A martial art developed in Okinawa, focusing on striking techniques.",
  Kata: "A sequence of movements and techniques in martial arts.",
  "Kiotsuke rei": "A phrase used in martial arts to show respect when assuming a ready stance, typically meaning 'bow to attention.'",
  Kobudo: "The Okinawan martial art of weapons.",
  Kyoshi: "A title given to a senior martial arts instructor, often indicating a high level of expertise.",
  Okinawa: "An island in Japan known for its martial arts traditions.",
  Sensei: "A teacher or instructor in martial arts.",
  "Sensei ni rei": "A phrase used in martial arts to show respect to the instructor, typically meaning 'bow to the teacher.'",
  "Shomen ni rei": "A phrase used in martial arts to show respect to the front of the dojo, typically meaning 'bow to the front.'",
  "Shorin-Ryu Matsumura Seito": `An Okinawan martial art based on the teachings of <a href="http://localhost:4321/news/sokon-matsumura-warrior-diplomat-and-father-of-shorin-ryu/">Bushi Matsumura Sokon</a> (1798–1890), traditionally preserved by <a href="http://localhost:4321/news/hohan-soken-the-last-guardian-of-the-old-ways/">Hohan Soken</a> (1889-1982). "Seito" translates to "orthodox" or "original method," emphasizing the preservation of old-school Matsusoden Kobukan Koryu Uchina Di techniques.`,
}
