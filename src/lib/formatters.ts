import { Money } from '@/types';

function currency(value: Money | undefined) {
  if (!value) return 'N/D';
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: value.currency
  }).format(value.value)
}

function dateTime(value: string) {
  return `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`
}

function dateWithNames(value: string) {
  const date = new Date(value);
  //format should be "Septiembre 15, 2021". The month should Capitalized
  return date.toLocaleDateString('es-DO', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

const Formats = {
  currency,
  dateTime,
  dateWithNames
}

export default Formats;
