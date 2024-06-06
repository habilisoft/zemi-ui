import ClosableAlert from '@/components/ui/closable-alert.tsx';

export function ModuleNotImplemented() {
  return <div className="w-full p-6">
    <ClosableAlert closable={false} color="warning">
      <h5 className="font-bold text-lg -mt-1.5">Módulo no implementado</h5>
      <p className="mt-1">
        Esta funcionalidad no ha sido implementada aún.
      </p>
    </ClosableAlert>
  </div>
}
