import './styles.css';
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaPrint } from 'react-icons/fa6';
import { DownPaymentInstallmentsService } from '@/services/down-payment-installments.service.ts';
import { useParams } from 'react-router-dom';
import {IDownPaymentInstallmentDetailedResponse} from '@/types';
import Formats from '@/lib/formatters.ts';

function PaymentReceipt() {
  const contentToPrint = useRef(null);
  const downPaymentInstallmentService = new DownPaymentInstallmentsService();
  const [installment, setInstallment] = useState({} as IDownPaymentInstallmentDetailedResponse);
  const { installmentId } = useParams();
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => {},
    onAfterPrint: () => {},
    removeAfterPrint: true,
  });

  const {
    companyInfo
  } = useCompoundStore(
    (state) => ({
      companyInfo: state.companyInfo,
    }),
    shallow
  );

  useEffect(() => {
    if(!installmentId) return;
    downPaymentInstallmentService.getDownPaymentInstallment(installmentId)
      .then((data) => {
        setInstallment(data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [installmentId]);

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Pagos", path: "" },
          { label: "Recibo de pago", path: "/construction/payments/receipts" },
          { label: installmentId || "", path: "" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Recibo de pago" subtitle="Pagos"/>
        <Button
          variant="secondary"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}>
          <FaPrint className="mr-2" />
          Imprimir
        </Button>
      </div>

      <div className="border">
        <div className="p-5" ref={contentToPrint}>
          <div className="w-full">
            <div className=" flex justify-between">
              <div className="logo-address divide-x-2 divide-blue-800 ">
                <img src={companyInfo?.logo} alt="Company Logo" className="h-20 w-auto pr-2"/>
                <div className="address pl-2">
                  <div style={{ whiteSpace: "pre-line" }}>
                    {companyInfo?.address}
                  </div>
                  <p>Tel: {companyInfo?.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-white bg-blue-800 font-bold px-4">Recibo de Ingreso</h1>
                <p>No.: <span className="text-red-900 font-bold">
                  {Formats.receiptNumber(installment?.id)}
                </span></p>
                <p>Fecha: {Formats.dateWithNames(installment?.date)}</p>
              </div>
            </div>
            <div className="body mt-8 space-y-1">
              <p>
                <span className="font-bold text-gray-700">Hemos recibido de: </span>
                <span className="text-gray-500">{installment?.downPayment?.buyer?.name}</span>
              </p>
              <p>
                <span className="font-bold text-gray-700">La suma de: </span>
                <span className="text-gray-500">{Formats.moneyToWords(installment?.payment?.amount)}</span>
              </p>
              <p>
                <span className="font-bold text-gray-700">Por concepto de: </span>
                <span className="text-gray-500">{installment?.payment?.description}</span>
              </p>
            </div>

            <div>
              <p><span className="font-bold text-gray-700">Desglose del pago:</span></p>
              <div className="mb-3">
                {installment?.payment?.paymentInformation?.paymentMethods.map((method, index) => (
                  <div key={index} className="flex">
                    <span className="font-bold mr-2 text-gray-700">{Formats.paymentMethod(method.type)}:</span><span className="text-gray-500">{Formats.currency(method.amount)}</span>

                  </div>
                ))}
              </div>

            </div>
            <div className="footer">
              <p>______________________________</p>
              <p>Firma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export { PaymentReceipt };
