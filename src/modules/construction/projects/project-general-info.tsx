import { FactRow } from '@/components/ui/fact-row.tsx';
import { IProject } from '@/types';
import Formats from '@/lib/formatters';

type Props = {
  project: IProject;
}
export default function ProjectGeneralInfo(
  {
    project
  }: Props
) {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información General</h3>
      </div>
      <div className="mt-3 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <FactRow
            bg="gray"
            title="Valor de cada unidad (general)">
            <span className="text-sm text-gray-900">
              {Formats.currency(project.pricePerUnit?.value)}
            </span>
          </FactRow>
          <FactRow
            title="Cantidad de unidades"
            bg="white">
            {project?.units?.length || 0}
          </FactRow>
          <FactRow
            title="Unidades disponibles"
            bg="gray"
            >
            {project?.units?.filter(unit => unit.state === 'AVAILABLE').length || 0}
          </FactRow>
          <FactRow
            title="Unidades reservadas"
            bg="white">
            {project?.units?.filter(unit => unit.state === 'RESERVED').length || 0}
          </FactRow>
        </dl>
      </div>
    </div>
  )
}
