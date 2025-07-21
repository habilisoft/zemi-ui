import { Select, SelectContent, SelectItem, SelectProps, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import Spinner, { Color } from '@/components/ui/spinner.tsx';

export const FormSelect = (
  {
    value,
    onChange,
    options,
    placeholder,
    loadingData = false,
    size
  }: {
    value: string | undefined;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    loadingData?: boolean;
  } & SelectProps
) => {

  return (
    <Select
      onValueChange={onChange}
      defaultValue={value}>
      <SelectTrigger size={size}>
        {loadingData && <div className="opacity-50 flex items-center gap-2"><Spinner color={Color.GRAY}/>Cargando...</div>}
        {!loadingData && <SelectValue placeholder={placeholder}/>}
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
