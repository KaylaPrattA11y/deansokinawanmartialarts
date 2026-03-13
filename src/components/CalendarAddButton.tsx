// See: https://add-to-calendar-button.com/configuration
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import type { AddToCalendarButtonType } from 'add-to-calendar-button-react';

export default function CalendarAddButton(props: AddToCalendarButtonType) {
  return (
    <AddToCalendarButton 
      {...props}
      timeZone="America/New_York"
      options={['Apple', 'Google', 'iCal']}
      data-utm-source="https://deansokinawanmartialarts.netlify.app/"
      data-utm-medium="website"
    ></AddToCalendarButton>
  );
}