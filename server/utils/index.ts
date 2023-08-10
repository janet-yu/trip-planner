import moment from 'moment';

export const isSameDate = (date1, date2) => moment(date1).isSame(date2, 'day');
