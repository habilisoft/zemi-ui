import { Money } from '@/types';

function currency(money: Money | undefined) {
  if (!money) return 'N/D';
  const { value, currency } = money;
  if (value == undefined) return 'N/D';
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency
  }).format(value)
}

function dateTime(value: string) {
  return `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`
}

function receiptNumber(value: number) {
  if (!value) return 'N/D';
  return value.toString().padStart(8, '0');
}

function dateWithNames(value: string | undefined) {
  if (!value) return 'N/D';
  const date = new Date(value);
  return date.toLocaleDateString('es-DO', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function moneyToWords(money: Money) {
  if (!money) return 'N/D';
  const units = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
  const teens = ['Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
  const tens = ['Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
  const hundreds = ['Cien', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

  function convertToWords(num: number): string {
    if (num < 10) return units[num];
    else if (num < 20) return teens[num - 10];
    else if (num < 100) return (num < 30 ? tens[0] : tens[Math.floor(num / 10) - 2]) + (num % 10 ? ' y ' + units[num % 10] : '');
    else if (num < 1000) return (num == 100 ? hundreds[0] : hundreds[Math.floor(num / 100) - 1]) + (num % 100 ? ' ' + convertToWords(num % 100) : '');
    else if (num < 1000000) return (num < 2000 ? 'Mil' : convertToWords(Math.floor(num / 1000)) + ' Mil') + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
    else if (num < 1000000000) return convertToWords(Math.floor(num / 1000000)) + ' Millones' + (num % 1000000 ? ' ' + convertToWords(num % 1000000) : '');
    else return 'Número demasiado grande';
  }
  function getCurrencyWord(currency: string): string {
    switch (currency) {
      case 'USD': return 'Dólares Americanos';
      case 'EUR': return 'Euros';
      case 'DOP': return 'Pesos Dominicanos';
      default: return currency;
    }
  }

  const { currency, value } = money;
  const integerPart = Math.floor(value);
  const decimalPart = Math.round((value - integerPart) * 100);
  const currencyWord = getCurrencyWord(currency);

  const integerWords = convertToWords(integerPart);
  const decimalWords = decimalPart.toString().padStart(2, '0') + '/100';

  return `${integerWords} ${currencyWord} con ${decimalWords}`;
}

function paymentMethod(method: string | undefined) {
  if (!method) return 'N/D';
  switch (method) {
    case 'CASH': return 'Efectivo';
    case 'TRANSFER': return 'Transferencia';
    case 'CHECK': return 'Cheque';
    case 'CARD': return 'Tarjeta de Crédito';
    default: return method;
  }
}

const Formats = {
  currency,
  dateTime,
  dateWithNames,
  moneyToWords,
  receiptNumber,
  paymentMethod
}

export default Formats;
