function ModuleBadge({ module }: { module: string }) {
  let stateString;
  let color;
  switch (module) {
    case 'AUTH':
      stateString = 'Control de Acceso';
      color = 'green';
      break;
    case 'CONSTRUCTION':
      stateString = 'Constructora';
      color = 'yellow';
      break;
    case 'ACCOUNTING':
      stateString = 'Contabilidad';
      color = 'amber';
      break;
  }

  return <span className={`p-1 text-xs font-medium text-white rounded-lg bg-${color}-500 cursor-default`}>
      {stateString}
    <span className="sr-only bg-green-500 bg-yellow-500 bg-red-500 bg-gray-500"/>
    </span>
}

export { ModuleBadge }
