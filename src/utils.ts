import { DAY_ABBR_MAP } from './constants';

export function formatTime(time: string) {
  const intlTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const [hourStr, minuteStr] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hourStr, 10), parseInt(minuteStr, 10));
  return intlTime.format(date);
}

export function getRecurrenceText(recurrence_byDay: string | string[] | undefined) {
  if (!recurrence_byDay) return '';
  const days = Array.isArray(recurrence_byDay) ? recurrence_byDay : recurrence_byDay.split(',');
  const daysRecurrence = days.map(day => DAY_ABBR_MAP[day.trim() as keyof typeof DAY_ABBR_MAP]).join(' & ');
  return daysRecurrence;
}

export function getDurationText(startTime?: string, endTime?: string) {
  if (!startTime || !endTime) return '';
  return `${formatTime(startTime)} – ${formatTime(endTime)}`;
}