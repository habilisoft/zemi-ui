import {FactRow} from '@/components/ui/fact-row.tsx';
import {IUnitDetailResponse} from '@/types';
import Formats from '@/lib/formatters';
import {Link} from 'react-router-dom';
import {DownPaymentState} from '@/modules/construction/projects/components/down-payment-state.tsx';

type Props = {
    unit: IUnitDetailResponse;
}
export default function ReservationAndDownPayment(
    {
        unit,
    }: Props
) {
    const {downPayment} = unit;
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Inicial y Reservación</h3>
            </div>
            {downPayment && <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <FactRow
                        title="Estado"
                        bg="white">
                        <DownPaymentState state={downPayment.state}/>
                    </FactRow>
                    <FactRow
                        title="Comprador"
                        bg="gray">
                        {downPayment.buyer ? <Link className="link"
                                                   to={`/construction/buyers/${downPayment.buyer.id}`}>{downPayment.buyer.name}</Link> : 'Sin asignar'}
                    </FactRow>
                    <FactRow
                        bg="white"
                        title="Monto Reserva">
            <span className="text-sm text-gray-900">
              {Formats.currency(downPayment?.reservation?.amount)}
            </span>
                    </FactRow>
                    <FactRow title="Monto Inicial" bg="gray">
            <span className="text-sm text-gray-900">
              {Formats.currency(downPayment.amount)}
            </span>
                    </FactRow>
                    <FactRow title="Balance Pendiente Inicial" bg="white">
            <span className="text-sm text-gray-900">
              {Formats.currency(downPayment.balance)}
            </span>
                    </FactRow>
                    <FactRow title="Fecha de Reserva" bg="gray">
            <span className="text-sm text-gray-900">
              {Formats.dateWithNames(downPayment?.reservation?.date)}
            </span>
                    </FactRow>
                    <FactRow title="Meses para completar el inicial" bg="white">
            <span className="text-sm text-gray-900">
              {downPayment?.reservation?.monthsToComplete || 'N/D'}
            </span>
                    </FactRow>
                    <FactRow title="Fecha de vencimiento pago inicial" bg="gray">
            <span className="text-sm text-gray-900">
              {Formats.dateWithNames(downPayment.dueDate)}
            </span>
                    </FactRow>
                </dl>
            </div>}
        </div>
    )
}
