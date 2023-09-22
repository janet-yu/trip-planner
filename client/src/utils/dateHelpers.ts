import moment from 'moment';

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

export const dateToComponents = (date: Date) => {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
};

export const dateToString = (date: Date) => {
  return dateComponentsToString({
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  });
};

/**
 * @todo: need to account for different web browsers and how they perceive
 * dates
 * @param dateComponents
 * @returns
 */
export const componentsToDate = (dateComponents: { day: number; month: number; year: number }) => {
  const dateString = `${dateComponents.year}-${String(dateComponents.month + 1).padStart(
    2,
    '0'
  )}-${String(dateComponents.day).padStart(2, '0')}`;

  return moment(dateString).toDate();
};

export const dateComponentsToString = (dateComponents: {
  day: number;
  month: number;
  year: number;
}) => {
  const dateString = `${dateComponents.month + 1 < 10 ? '0' : ''}${dateComponents.month + 1}/${
    dateComponents.day < 10 ? '0' : ''
  }${dateComponents.day}/${dateComponents.year}`;

  return dateString;
};

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
