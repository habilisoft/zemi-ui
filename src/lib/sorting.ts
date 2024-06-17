import { DownPaymentInstallment } from '@/types';

function byDownPaymentInstallmentDate (a: DownPaymentInstallment, b: DownPaymentInstallment) {
  return new Date(a.date).getTime() - new Date(b.date).getTime()
}

const Sorting = {
  byDownPaymentInstallmentDate
}

export default Sorting;
