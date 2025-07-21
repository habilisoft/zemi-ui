import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { ProductForm } from '@/modules/catalog/products/product-form.tsx';
import { useNavigate } from 'react-router-dom';
import PageTitle from '@/components/ui/page-title.tsx';
import { HalfScreenContainer } from '@/components/ui/half-screen-container.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import Panel from '@/components/ui/panel.tsx';
import { RectangleRadioGroup } from '@/components/form-elements/RectangleRadioGroup.tsx';
import { CustomFormElement, FormInput } from '@/components/form-elements';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { GraphQlRemoteComboBox } from '@/components/ui/graphql-remote-combobox.tsx';
import { CategoryModal } from '@/modules/catalog/categories/category-modal.tsx';
import { GET_CATEGORIES, GET_CUSTOMERS } from '@/queries.ts';
import { TaxMultiSelect } from '@/components/tax-multi-select/tax-multi-select.tsx';
import { ConfirmCancelButton } from '@/components/confirm-cancel-button';
import AsyncActionButton from '@/components/ui/async-action-button.tsx';
import { z } from 'zod';
import { positiveNumber } from '@/lib/validations.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { CustomerModal } from '@/modules/sales/customers/customer-modal.tsx';
import { ICreateProductRequest, ICreateRentRequest } from '@/types';
import { AxiosError } from 'axios';
import { Messages } from '@/lib/constants.tsx';

export const NewRent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSuccess = () => {
    navigate("/rents");
  }

  const schema = z.object({
    name: z.string().min(1, { message: 'Requerido' }),
    price: positiveNumber.optional(),
    customer: z.object({
      id: z.number().nullable(),
      name: z.string().nullable(),
    }),
    taxes: z.array(z.number()).optional(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: '',
      customer: undefined,
      taxes: []
    }
  });

  const onSubmit = async (data: FieldValues) => {
    setSaveLoading(true);
    const productData: ICreateRentRequest = {
      name: data.name,
      description: data.description,
      isService: type === "SERVICE",
      customerId: data.category ? data.category.id : null,
    }
    let response;
    try {
      response = await productsService.createProduct(productData);
      if (data.price) {
        await productsService.changePrice(response.id, data.price);
      }
      if(data.taxes.length>0){
        await productsService.changeTaxes(response.id, data.taxes);
      }
      handleSuccess({ id: response.id, name: data.name });
    } catch (error: AxiosError | any) {
      setError(error.response?.data?.message || Messages.UNEXPECTED_ERROR);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Rentas", path: "/rents" },
          { label: "Nueva Renta", path: "/rents/new" },
        ]
      }/>
      <PageTitle title="Nueva Renta"/>

      <HalfScreenContainer>
        {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
        <form>
          <div className="space-y-4">
            <Panel title="Información Básica">
              <div className="space-y-4">
                <RectangleRadioGroup
                  value={type}
                  onChange={(value) => setType(value as "PRODUCT" | "SERVICE")}
                  options={[
                    { label: "Producto", value: "PRODUCT" },
                    { label: "Servicio", value: "SERVICE" }
                  ]}/>
                <FormInput
                  label="Nombre"
                  {...register("name")}
                  validationError={errors.name?.message as string}/>
                <CustomFormElement
                  label="Categoría"
                  validationError={errors.customer?.message as string}
                >
                  <Controller
                    name="customer"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <GraphQlRemoteComboBox
                        {...register("customer")}
                        handleSelect={(value) => {
                          onChange({ target: { value, name } })
                        }}
                        selectedValue={value}
                        displayProperty="name"
                        valueProperty="id"
                        placeholder="Seleccione un cliente"
                        addButtonText="Agregar nueva cliente"
                        createModal={CustomerModal}
                        query={GET_CUSTOMERS}
                        collectionName="customers"/>)}/>
                </CustomFormElement>
              </div>
            </Panel>
            <Panel title="Precio e Impuestos">
              <div className="space-y-4">
                <FormInput
                  label="Precio de Venta"
                  type="number"
                  step="0.01"
                  {...register("price")}
                  validationError={errors.price?.message as string}/>

                <CustomFormElement
                  label="Impuestos"
                  validationError={errors.taxes?.message}>
                  <Controller
                    control={control}
                    name="taxes"
                    render={({ field: { value, onChange, name } }) => (
                      <TaxMultiSelect
                        selectedValues={value}
                        onChange={(value) => onChange({target: {name, value}})}/>)}/>
                </CustomFormElement>

              </div>
            </Panel>
          </div>
          <div className="flex items-center gap-4 mt-4 justify-end">
            <ConfirmCancelButton
              disabled={saveLoading}
              action={onCancel}
              confirm={confirmCancel && isDirty}/>
            <AsyncActionButton
              busy={saveLoading}
              onClick={handleSubmit(onSubmit)}
              type="button">
              Guardar
            </AsyncActionButton>
          </div>
        </form>
      </HalfScreenContainer>

    </PageWrapper>
  )
}
