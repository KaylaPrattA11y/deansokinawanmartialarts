import type { CollectionEntry } from 'astro:content';

// A single class's details for one specific calendar year.
export interface ClassYearEntry {
  clsId: string;
  name: string;
  location: string;
  sortOrder: number;
  kanji: string;
  year: number;
  ages: string;
  description: string;
  startTime: string;
  endTime: string;
  recurrence: string;
  recurrence_byDay: string[];
  tuitionOnce: number;
  tuitionTwice?: number;
  tuition_billing_recurrence: string;
}

/**
 * Flattens the classes collection into one entry per (class, year) pair,
 * excluding years that have already passed or are marked hidden.
 * `currentYear` is a build-time best guess — display gating that must stay
 * accurate after publish (past-year hiding, upcoming-year restrictions) is
 * re-checked client-side against the visitor's real clock.
 */
export function getVisibleClassYears(
  allClasses: CollectionEntry<'classes'>[],
  currentYear: number,
): ClassYearEntry[] {
  const entries: ClassYearEntry[] = [];
  for (const cls of allClasses) {
    for (const yearData of cls.data.years) {
      if (yearData.year < currentYear) continue;
      if (yearData.display === false) continue;
      entries.push({
        clsId: cls.id,
        name: cls.data.name,
        location: cls.data.location,
        sortOrder: cls.data.sortOrder ?? 99,
        kanji: cls.data.kanji ?? '',
        year: yearData.year,
        ages: yearData.ages,
        description: yearData.description,
        startTime: yearData.startTime,
        endTime: yearData.endTime,
        recurrence: yearData.recurrence,
        recurrence_byDay: yearData.recurrence_byDay,
        tuitionOnce: yearData.tuitionOnce,
        tuitionTwice: yearData.tuitionTwice,
        tuition_billing_recurrence: yearData.tuition_billing_recurrence,
      });
    }
  }
  return entries;
}

// Groups entries by year (ascending), each group sorted by sortOrder (priority).
export function groupClassYearsByYear(entries: ClassYearEntry[]): Map<number, ClassYearEntry[]> {
  const map = new Map<number, ClassYearEntry[]>();
  for (const entry of entries) {
    const group = map.get(entry.year);
    if (group) {
      group.push(entry);
    } else {
      map.set(entry.year, [entry]);
    }
  }
  for (const group of map.values()) {
    group.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  return new Map([...map.entries()].sort(([a], [b]) => a - b));
}
