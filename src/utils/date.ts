import { format, addDays } from 'date-fns';

export function formatDate(date: Date | string | number, formatString: string = 'MMMM dd, yyyy'): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return format(d, formatString);
}

export function getEstimatedDeliveryWindow(daysAhead: number = 3): string {
  const targetDate = addDays(new Date(), daysAhead);
  return format(targetDate, 'EEEE, MMMM dd');
}
