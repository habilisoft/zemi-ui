import { NcfTypes } from '@/lib/constants.tsx';
import { FormSelect } from '@/components/form-elements/FormSelect.tsx';
import { SelectProps } from '@/components/ui/select.tsx';

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
}
export const NcfTypeSelect = ({
                                value,
                                onChange,
                                ...props
                              }: Props & SelectProps) => {

  return (
    <FormSelect
      value={value}
      {...props}
      onChange={(value: string) => onChange(value)}
      options={NcfTypes.map((type) => ({
        value: type.value,
        label: type.displayName}))}
      placeholder="Seleccione el tipo de comprobante"/>
  )
};
