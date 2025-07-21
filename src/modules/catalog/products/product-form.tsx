import { useState } from "react";
import { Messages } from '@/lib/constants.tsx';
import { ProductsService } from '@/services/products.service.ts';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { ICreateProductRequest, ReusableFormProps } from '@/types';
import { z } from 'zod';
import { RectangleRadioGroup } from '@/components/form-elements/RectangleRadioGroup.tsx';
import { CustomFormElement, FormInput } from '@/components/form-elements';
import AsyncActionButton from '@/components/ui/async-action-button.tsx';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Panel from '@/components/ui/panel.tsx';
import { GET_CATEGORIES } from '@/queries.ts';
import { GraphQlRemoteComboBox } from '@/components/ui/graphql-remote-combobox.tsx';
import { CategoryModal } from '@/modules/catalog/categories/category-modal.tsx';
import { ConfirmCancelButton } from '@/components/confirm-cancel-button/confirm-cancel-button.tsx';
import { positiveNumber } from '@/lib/validations.ts';
import { TaxMultiSelect } from '@/components/tax-multi-select/tax-multi-select.tsx';
import { AxiosError } from 'axios';

export const ProductForm = ({ handleSuccess, onCancel, confirmCancel = false }: ReusableFormProps) => {
  const [error, setError] = useState(null);
  const productsService = new ProductsService();
  const [type, setType] = useState<"PRODUCT" | "SERVICE">("PRODUCT");
  const [saveLoading, setSaveLoading] = useState(false);

  const schema = z.object({
    name: z.string().min(1, { message: 'Requerido' }),
    price: positiveNumber.optional(),
    category: z.object({
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
      category: undefined,
      taxes: []
    }
  });

  const onSubmit = async (data: FieldValues) => {
    setSaveLoading(true);
    const productData: ICreateProductRequest = {
      name: data.name,
      description: data.description,
      isService: type === "SERVICE",
      categoryId: data.category ? data.category.id : null,
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

  return <>
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
              validationError={errors.category?.message as string}
            >
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <GraphQlRemoteComboBox
                    {...register("category")}
                    handleSelect={(value) => {
                      onChange({ target: { value, name } })
                    }}
                    selectedValue={value}
                    displayProperty="name"
                    valueProperty="id"
                    placeholder="Seleccione una categoría"
                    addButtonText="Agregar nueva categoría"
                    createModal={CategoryModal}
                    query={GET_CATEGORIES}
                    collectionName="categories"/>)}/>
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
  </>;
}
