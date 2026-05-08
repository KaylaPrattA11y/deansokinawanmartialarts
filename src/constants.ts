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
  startTime: string; // (HH:mm)
  endTime: string;   // (HH:mm)
  location: string;
  recurrence: string;
  recurrence_byDay: number[]; // e.g. [1,3] for Monday and Wednesday
  tuitionOnce: number;   // e.g. 100 for $100 one day per ${recurrence}
  tuitionTwice?: number;  // e.g. 200 for $200 two days per ${recurrence}
  tuition_billing_recurrence: string;
}

export const FREE_TRIAL_NAME = "7-Day Free Trial";
export const FREE_TRIAL_MESSAGE = `I am interested in starting my ${FREE_TRIAL_NAME}.`;
