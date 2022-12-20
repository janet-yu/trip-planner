/**
 * Get the number of days in a month based on the year
 *
 * @param month {int} Represents the month in numeric form, zero-based indexing
 * @param year {int}
 */
export const getMonthDays = (month: number, year: number) => {
  const isLeapYear = year % 400 === 0;
  const monthsWith30Days = [3, 5, 8, 10];

  if (isLeapYear && month === 1) {
    return 29;
  }

  if (monthsWith30Days.includes(month)) {
    return 30;
  }

  return 31;
};

export const getWeekDay = (date: Date) => {
  return date.getDay();
};

export const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

export const transformToDate = (dateComponents: {
  day: number;
  month: number;
  year: number;
}) => {
  const dateString = `${dateComponents.month + 1}-${dateComponents.day}-${
    dateComponents.year
  }`;
  return new Date(dateString);
};

export const MONTHS = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
