import { FactRow } from '@/components/ui/fact-row.tsx';
import { IUnitDetailResponse } from '@/types';
import Formats from '@/lib/formatters';
import { ProjectUnitState } from '@/modules/construction/projects/components/project-unit-state.tsx';

type Props = {
  unit: IUnitDetailResponse;
}
export default function UnitGeneralInfo(
  {
    unit
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
            title="Valor">
            <span className="text-sm text-gray-900">
              {Formats.currency(unit.unit.price?.value || unit.priceFromProject?.value)}
            </span>
          </FactRow>
          <FactRow
            title="Estado"
            bg="white">
            <ProjectUnitState state={unit.unit.state} />
          </FactRow>
        </dl>
      </div>
    </div>
  )
}
