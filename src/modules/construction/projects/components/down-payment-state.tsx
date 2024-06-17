export function DownPaymentState({ state }: { state: string }) {
  let stateString;
  let color;
  switch (state) {
    case 'PAID':
      stateString = 'Pagado';
      color = 'green';
      break;
    case 'PENDING':
      stateString = 'Pendiente';
      color = 'yellow';
      break;
    case 'CANCELLED':
      stateString = 'Vendido';
      color = 'red';
      break;
    default:
      stateString = 'Desconocido';
      color = 'gray';
  }

  return <span className={`p-1 text-xs font-medium text-white rounded-lg bg-${color}-500 cursor-default`}>
      {stateString}
    <span className="sr-only bg-green-500 bg-yellow-500 bg-red-500 bg-gray-500"/>
    </span>
}
