import SimpleDataTable from '@/components/ui/simple-data-table';
import { DownPaymentInstallment, IPaymentResponse, Money } from '@/types';
import Formats from '@/lib/formatters.ts';
import Sorting from '@/lib/sorting.ts';

type Props = {
  downPaymentInstallments: DownPaymentInstallment[];
}
export function InstallmentsTable(
  { downPaymentInstallments }: Props
) {
  return (
    <SimpleDataTable
      style={{ height: "calc(100vh - 350px)" }}
      columns={[
        {
          header: 'No.',
          field: 'id',
          style: {
            width: '10px'
          }
        },
        {
          header: 'Fecha',
          field: 'date',
          render: (value: string) => Formats.dateTime(value)
        },
        {
          header: 'Monto',
          field: 'payment',
          render: (payment: IPaymentResponse) => Formats.currency(payment.amount)
        },
        {
          header: 'Balance',
          field: 'balance',
          render: (price: Money) =>  Formats.currency(price)
        }
      ]}
      records={downPaymentInstallments.sort(Sorting.byDownPaymentInstallmentDate) as []}
    />
  )
}
