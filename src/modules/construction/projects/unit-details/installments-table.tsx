import SimpleDataTable from '@/components/ui/simple-data-table';
import { IDownPaymentResponse, IPaymentResponse, Money } from '@/types';
import Formats from '@/lib/formatters.ts';
import Sorting from '@/lib/sorting.ts';
import { Fragment } from "react";
import { FactRow } from "@/components/ui/fact-row.tsx";
import { Link } from 'react-router-dom';

type Props = {
  downPayment: IDownPaymentResponse;
}

export function InstallmentsTable(
  { downPayment }: Props
) {
  const installments = downPayment.installments || [];
  return (
    <Fragment>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Inicial</h3>
      </div>
      <div className="mt-3 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <FactRow
            bg="gray"
            title="Monto">
                        <span className="text-sm text-gray-900">
                          {Formats.currency(downPayment.amount)}
                        </span>
          </FactRow>
          <FactRow
            bg="white"
            title="Reservación">
                        <span className="text-sm text-gray-900">
                          {Formats.currency(downPayment?.reservation?.amount)}
                        </span>
          </FactRow>
        </dl>
      </div>
      <SimpleDataTable
        style={{ height: "calc(100vh - 350px)" }}
        columns={[
          {
            header: "No.",
            field: "id",
            style: { width: "1px", paddingRight: "0px" },
            render: (id: number) => (
              <Link
                className="link"
                to={`/construction/payments/receipts/${id}`}>
                {Formats.receiptNumber(id)}
              </Link>
            )
          },
          {
            header: 'Fecha',
            field: 'date',
            render: (value: string) => Formats.dateTime(value)
          },
          {
            header: 'Monto',
            field: 'amount',
            render: (payment: IPaymentResponse) => Formats.currency(payment.amount)
          },
          {
            header: 'Balance',
            field: 'balance',
            render: (price: Money) => Formats.currency(price)
          }
        ]}
        records={installments.sort(Sorting.byDownPaymentInstallmentDate) as []}
      />
    </Fragment>
  )
}
