import RemoteDataTable from '@/components/ui/remote-data-table';
import { IBuyer, IDownPaymentInstallmentResponse } from '@/types';
import { Link } from 'react-router-dom';
import Formats from '@/lib/formatters.ts';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

function ListDownPaymentInstallments() {
  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Pagos", path: "" },
          { label: "Recibos de Pago", path: "" }
        ]}/>
      <PageTitle title="Recibos de Pago" subtitle="Pagos"/>
      <RemoteDataTable
        path="/api/v1/down-payment/installments"
        gridChanged={false}
        defaultPageSize={25}
        filters={[]}
        columns={[
          {
            header: "No.",
            field: "installment",
            style: { width: "1px", paddingRight: "0px" },
            render: (_cell, row: IDownPaymentInstallmentResponse) => (
              <Link
                className="link"
                to={`/construction/payments/receipts/${row.id}`}>
                {Formats.receiptNumber(row.id)}
              </Link>
            )
          },
          {
            header: "Fecha",
            field: "installment",
            render: (_cell, row: IDownPaymentInstallmentResponse) => Formats.dateWithNames(row.date)
          },
          {
            header: "Comprador",
            field: "buyer",
            render: (buyer: IBuyer) => (
              <Link
                className="link"
                to={`/construction/buyers/${buyer.id}`}>
                {buyer.name}
              </Link>)
          },
          {
            header: "Concepto",
            field: "installment",
            render: (_cell, row: IDownPaymentInstallmentResponse) => row.payment.description
          },
          {
            header: "Monto",
            field: "installment",
            style: { textAlign: "right" },
            render: (_cell, row: IDownPaymentInstallmentResponse) => Formats.currency(row.payment.amount)
          },
        ]}
        style={{}}/>
    </div>
  )
}

export default ListDownPaymentInstallments;
