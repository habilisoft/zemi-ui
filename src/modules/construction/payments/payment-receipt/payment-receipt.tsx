import './styles.css';
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaPrint } from 'react-icons/fa6';

function PaymentReceipt() {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
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

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Pagos", path: "" },
          { label: "Recibo de pago", path: "" },
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
                  <p>Dirección de la empresa</p>
                  <p>Calle, Ciudad, País</p>
                  <p>Tel: (123) 456-7890</p>
                </div>
              </div>
              <div className="receipt-info">
                <h1 className="text-white bg-blue-800 font-bold px-4">Recibo de Ingreso</h1>
                <p>No.: <span className="text-red-900 font-bold">12345</span></p>
                <p>Fecha: 01/01/2024</p>
              </div>
            </div>
            <div className="body mt-5 space-y-2 text-lg">
              <p><strong>Hemos recibido de:</strong> <span
                className="text-gray-500 font-bold">Nombre de la Persona</span>
              </p>
              <p><strong>La suma de:</strong> <span className="text-gray-500 font-bold">Cantidad en letras (Monto en efectivo) Moneda</span>
              </p>
              <p><strong>Por concepto de:</strong> <span className="text-gray-500 font-bold">Concepto del pago</span>
              </p>
              <p><strong>Forma de pago:</strong> Efectivo / Cheque / Transferencia</p>
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
