import React from 'react'
import { wrapFieldsWithMeta } from 'tinacms'

// Renders a native time picker while still storing the value as a plain
// "HH:MM" 24-hour string, matching the existing calendar/ICS generation code.
export const TimeField = wrapFieldsWithMeta(({ input }) => (
  <input
    type="time"
    value={input.value ?? ''}
    onChange={(e) => input.onChange(e.target.value)}
    onBlur={input.onBlur}
    onFocus={input.onFocus}
  />
))
