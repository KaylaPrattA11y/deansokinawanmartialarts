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

export function getDurationText(startTime?: string, endTime?: string) {
  if (!startTime || !endTime) return '';
  return `${formatTime(startTime)} – ${formatTime(endTime)}`;
}