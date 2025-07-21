import { FormSelect } from "@/components/form-elements/FormSelect.js";
import { usePriceLists } from "@/hooks/price-lists/index.js";
import { SelectProps } from '@/components/ui/select.tsx';

type Props = {
  value: string | undefined;
  onChange: (priceList: string) => void;
};

export const PriceListSelect = ({ value, onChange, ...rest } : Props & SelectProps) => {
  const { priceLists, loading } = usePriceLists();
  return (
    <FormSelect
      loadingData={loading}
      value={value}
      {...rest}
      disabled={loading || rest.disabled}
      onChange={onChange}
      options={priceLists?.map(priceList => ({ value: priceList.id.toString(), label: priceList.name })) || []}
      placeholder="Seleccione un valor"/>
  )
}
