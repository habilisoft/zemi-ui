import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import Panel from '@/components/ui/panel.tsx';
import { NcfTypeSelect } from '@/components/ncf-type-select/ncf-type-select.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { CustomFormElement, FormInput } from '@/components/form-elements';
import { positiveNumber } from '@/lib/validations.ts';
import { ConfirmCancelButton } from '@/components/confirm-cancel-button';
import AsyncActionButton from '@/components/ui/async-action-button.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@/components/date-picker';
import { TaxManagementService } from '@/services/tax-management.service.ts';
import { INcfSequenceRequest } from '@/types';
import { toast } from 'sonner';
import Formats from '@/lib/formatters.ts';
import { useNcfSequences } from '@/hooks/taxes/use-ncf-sequences.tsx';
import { AxiosError } from 'axios';
import { Messages } from '@/lib/constants.tsx';

export const NewSequence = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();
  const taxManagementService = new TaxManagementService();
  const { reload } = useNcfSequences();
  const schema = z.object({
    ncfType: z.string().min(1, { message: 'Requerido' }),
    start: positiveNumber,
    end: positiveNumber,
    expirationDate: z.date().min(new Date(), { message: 'La fecha de expiración debe ser mayor a la fecha actual' })
  }).refine((data) => data.end > data.start, {
    message: 'El número final debe ser mayor que el número inicial',
    path: ['end'], // Specify where the error should be attached
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ncfType: '',
      start: undefined,
      end: undefined,
      expirationDate: new Date()
    }
  });

  const ncfType = watch('ncfType');
  const start = watch('start');
  const end = watch('end');

  const onSubmit = async (data: any) => {
    setSaveLoading(true);
    const request: INcfSequenceRequest = {
      ncfType: data.ncfType,
      start: parseInt(data.start),
      end: parseInt(data.end),
      expirationDate: data.expirationDate,
      series: 'B'
    }
    try {
      await taxManagementService.addNcfSequence(request)
      await reload();
      navigate("/fiscal-settings/ncf-sequences");
      toast.success('Secuencia de NCF agregada exitosamente');
    } catch (e: AxiosError | any) {
      toast.error(e.response?.data?.message || Messages.UNEXPECTED_ERROR);
    } finally {
      setSaveLoading(false);
    }

  }

  const formatSequence = (number: number, ncType: string) => {
    return Formats.ncfSequence(number, ncType, 'B');
  };

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Configuración Fiscal", path: "/fiscal-settings" },
          { label: "Comprobantes Fiscales", path: "/fiscal-settings/ncf-sequences" },
          { label: "Agregar Secuencia", path: "/fiscal-settings/ncf-sequences/new" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel title="Detalles de secuencia">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6">
            <div className="space-y-4">
              <CustomFormElement
                label="Tipo de NCF"
                validationError={errors.ncfType?.message}>
                <Controller
                  name="ncfType"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <NcfTypeSelect
                      value={value}
                      onChange={(value: string) => onChange({ target: { name, value } })}/>
                  )}/>
              </CustomFormElement>
              <FormInput
                required
                label="Número Inicial"
                helpText="Ingresa los números que aparecen después de los ceros"
                {...register("start")}
                validationError={errors.start?.message as string}/>
              <FormInput
                required
                label="Número Final"
                helpText="Ingresa los números que aparecen después de los ceros"
                {...register("end")}
                validationError={errors.end?.message as string}/>
              <Controller
                name="expirationDate"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <CustomFormElement
                    label="Fecha de vencimiento"
                    required={true}
                    validationError={errors.expirationDate?.message as string}
                  >
                    <DatePicker
                      value={value}
                      onChange={(value) => onChange({ target: { name, value } })}/>
                  </CustomFormElement>)}/>
            </div>

            <div>
              <div className="bg-gray-50 ring-1 ring-gray-900/5">
                <div className="px-6 py-2.5">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">Vista Previa</h3>
                </div>
                <div className="px-6 py-3 space-y-5 border-t border-gray-900/5">
                  <div>
                    <h3 className="text-sm text-gray-500">Número desde</h3>
                    <p className="text-sm font-medium">{ncfType && start ? formatSequence(start, ncfType) : 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Número hasta</h3>
                    <p className="text-sm font-medium">{ncfType && end ? formatSequence(end, ncfType) : 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Cantidad</h3>
                    <p className="text-sm font-medium">{start && end ? parseInt(end) - parseInt(start) + 1 : 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Fecha de vencimiento</h3>
                    <p className="text-sm font-medium">{watch('expirationDate')?.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

            </div>


          </div>
        </Panel>
        <div className="flex items-center gap-4 mt-4 justify-end">
          <ConfirmCancelButton confirm={isDirty} action={() => navigate("/fiscal-settings/")}/>
          <AsyncActionButton busy={saveLoading} type="submit">Guardar</AsyncActionButton>
        </div>
      </form>
    </PageWrapper>
  );
}
