import { useTaxes } from '@/hooks/taxes';
import MultiSelect, { MultiSelectVariantProps } from '@/components/ui/multi-select.tsx';

interface Props extends MultiSelectVariantProps {
  onChange: (taxes: string[]) => void;
  selectedValues: never[];
}

export const TaxMultiSelect = ({
                                 onChange,
                                 selectedValues,
                                 ...other
                               }: Props) => {
  const { taxes } = useTaxes();
  return (
    <MultiSelect
      {...other}
      placeholder="Seleccionar impuestos"
      selectedValues={selectedValues}
      onChange={onChange}
      options={(taxes || []).map(tax => ({ value: tax?.id as never, label: tax?.name as never }))}/>
  )
}
