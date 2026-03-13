import type { AddToCalendarButtonType } from 'add-to-calendar-button-react';
import { getRecurrenceText, getDurationText } from './utils';

export const NEWS_PAGE_SIZE = 6;

export const FAQS_PAGE_SIZE = 20;

export const HOME_NEWS_PAGE_SIZE = 3;

export const GALLERY_PAGE_SIZE = 28;

type WeekDayShort = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";
type WeekDayMedium = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const DAY_ABBR_MAP: Record<WeekDayShort, WeekDayMedium> = {
  MO: "Mon",
  TU: "Tue",
  WE: "Wed",
  TH: "Thu",
  FR: "Fri",
  SA: "Sat",
  SU: "Sun",
}

export interface IClass extends AddToCalendarButtonType{
  ages: string;
  schedule: string;
}

export const YOUTH_CLASS: IClass = {
  ages: "4 – 15",
  name: "Youth Karate",
  description: "Foundational karate, kata, and kobudo instruction. Children develop discipline, confidence, and respect alongside physical skill.",
  startDate: "2025-01-06", // (YYYY-MM-DD)
  startTime: "18:00",
  endTime: "19:00",
  timeZone: "EST",
  location: "Dojo",
  recurrence: "weekly",
  recurrence_byDay: "MO,WE",
  schedule: `${getRecurrenceText("MO,WE")} · ${getDurationText("18:00", "19:00")}`
}

export const ADULT_CLASS: IClass = {
  name: "Adult Karate",
  ages: "16 & Up",
  description: "Comprehensive Shorin-Ryu training including empty-hand kata, bunkai, and traditional Okinawan self-defense applications.",
  startDate: "2025-01-06", // (YYYY-MM-DD)
  startTime: "18:00",
  endTime: "20:00",
  timeZone: "EST",
  location: "Dojo",
  recurrence: "weekly",
  recurrence_byDay: "TU,TH",
  schedule: `${getRecurrenceText("TU,TH")} · ${getDurationText("18:00", "20:00")}`
}

export const CPR_CLASS: { name: string, description: string } = {
  name: "CPR & First Aid",
  description: "Learn life-saving CPR and first aid skills in a hands-on, practical course. Certification included.",
}

export const CLASSES: Object[] = [YOUTH_CLASS, ADULT_CLASS, CPR_CLASS];
