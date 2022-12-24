/**
 * 1. Determine the number of days for the selected month
 * 2. Save the current date, save parts of the date separately (month, day, year)
 * 3. When someone clicks right, increment the month, vice versa with left
 * 4. When someone clicks on a date, set the day
 * 5. When someone clicks outside of the component, assume the date was selected
 *
 * Components:
 * 1. Date input
 * 3. Date calendar
 */
import React from 'react';
import Input from './DateInput';

// Refactor to render Calendar and Input separately here
const DatePicker = (props) => {
  return <Input />;
};

export default DatePicker;
