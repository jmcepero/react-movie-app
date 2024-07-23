import {format, differenceInYears} from 'date-fns';

export const formatDateAndAge = (date: Date): string => {
  const now = new Date();
  const formattedDate = format(date, 'MMMM d, yyyy');
  const age = differenceInYears(now, date);
  return `${formattedDate} (${age} years old)`;
};
