import { RectangleRadioGroup } from '@/components/form-elements/RectangleRadioGroup.tsx';
import { CustomFormElement, FormInput } from '@/components/form-elements';
import AsyncActionButton from '@/components/ui/async-action-button.tsx';
import { CustomerService } from '@/services/customer.service.ts';
import { useState } from 'react';
import { IRegisterCustomerRequest } from '@/types';
import { z } from 'zod';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Panel from '@/components/ui/panel.tsx';
import { positiveNumber } from '@/lib/validations.ts';
import { PriceListSelect } from '@/components/price-list-select';
import { ConfirmCancelButton } from '@/components/confirm-cancel-button';
import { useNavigate } from 'react-router-dom';
import { NcfTypeSelect } from '@/components/ncf-type-select/ncf-type-select.tsx';

type Props = {
  confirmCancel: boolean;
  onCancel: () => void;
  handleSuccess: (data: Record<string, string> | undefined) => void;
}

export const CustomerForm = ({ handleSuccess }: Props) => {
  const customerService = new CustomerService();
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [customer, setCustomer] = useState<IRegisterCustomerRequest>(
    {
      type: "PERSON"
    } as IRegisterCustomerRequest
  );

  const schema = z.object({
    name: z.string().min(1, { message: 'Requerido' }),
    rnc: z.string().min(1, { message: 'Requerido' }),
    creditLimit: positiveNumber.optional(),
    ncfType: z.string().optional(),
    priceList: z.number().optional()
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      rnc: '',
      creditLimit: '',
      ncfType: undefined,
      priceList: undefined
    }
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      setSaveLoading(true);
      const newCustomer = {
        ...data,
        type: customer.type,
        rnc: undefined
      } as IRegisterCustomerRequest;
      const response = await customerService.registerCustomer(newCustomer);

      if (data.creditLimit) {
        await customerService.changeCreditLimit(response.id, data.creditLimit);
      }

      if (data.ncfType) {
        await customerService.changeNcfType(response.id, data.ncfType);
      }

      if (data.priceList) {
        await customerService.changePriceList(response.id, data.priceList);
      }

      toast.success("Cliente creado correctamente");
      handleSuccess({ id: response.id, name: data.name });
    } catch (error) {

    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Panel title="Información Básica">
        <div className="space-y-4">
          <RectangleRadioGroup
            value={customer.type}
            onChange={(value) => setCustomer(prevState => ({ ...prevState, type: value as "PERSON" | "BUSINESS" }))}
            options={[
              { label: "Persona", value: "PERSON" },
              { label: "Empresa", value: "BUSINESS" }
            ]}/>
          <FormInput
            required
            label="Nombre"
            {...register("name")}
            validationError={errors.name?.message as string}/>
          <FormInput
            required
            label={customer.type === "PERSON" ? "Cédula" : "RNC"}
            {...register("rnc")}
            validationError={errors.rnc?.message as string}/>
        </div>
      </Panel>
      <Panel title="Ventas">
        <div className="space-y-4">
          <FormInput
            label="Límite de Crédito"
            {...register("creditLimit")}
            validationError={errors.creditLimit?.message as string}/>
          <CustomFormElement
            validationError={errors.priceList?.message}
            label="Lista de precios">
            <Controller
              name="priceList"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <PriceListSelect
                  value={value}
                  onChange={(value: string) => onChange({ target: { name, value } })}/>)}/>
          </CustomFormElement>
        </div>
      </Panel>
      <Panel title="Configuración Fiscal">
        <CustomFormElement
          label="Tipo de NCF"
          validationError={errors.ncfType?.message}
        >
          <Controller
            name="ncfType"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <NcfTypeSelect
                value={value}
                onChange={(value: string) => onChange({ target: { name, value } })}/>
            )}/>
        </CustomFormElement>
      </Panel>
      <div className="flex items-center gap-4 justify-end">
        <ConfirmCancelButton confirm={isDirty} action={() => navigate("/sales/customers")}/>
        <AsyncActionButton busy={saveLoading} type="submit">Guardar</AsyncActionButton>
      </div>
    </form>
  );
}
