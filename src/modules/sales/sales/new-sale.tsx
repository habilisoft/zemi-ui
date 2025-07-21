import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { ConfirmCancelButton } from '@/components/confirm-cancel-button';
import AsyncActionButton from '@/components/ui/async-action-button.tsx';
import Panel from '@/components/ui/panel.tsx';
import { Controller, FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { CustomFormElement } from '@/components/form-elements';
import { GraphQlRemoteComboBox } from '@/components/ui/graphql-remote-combobox.tsx';
import { GET_CUSTOMERS, PRODUCTS_BY_NAME_OR_REFERENCE } from '@/queries.ts';
import { CustomerModal } from '@/modules/sales/customers/customer-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ProductModal } from '@/modules/catalog/products/product-modal.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';
import TooltipValidatedInput from '@/components/form-elements/TooltipValidatedInput.tsx';
import { DatePicker } from '@/components/date-picker';
import { positiveNumber } from '@/lib/validations.ts';
import { useProductPrice } from '@/hooks/price-lists/use-product-price.tsx';
import { useProductTaxes } from '@/hooks/taxes/use-product-taxes.tsx';
import { TaxMultiSelect } from '@/components/tax-multi-select/tax-multi-select.tsx';
import { Input } from '@/components/ui/input.tsx';
import Formats from '@/lib/formatters.ts';
import { SalesService } from '@/services/sales.service.ts';
import { IMakeSaleRequest } from '@/types';
import { AxiosError } from 'axios';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import './new-sale.css';

const DEFAULT_ITEM = {
  product: null,
  quantity: null,
  price: undefined,
  taxes: [],
  subTotal: 0
}

export const NewSale = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();
  const { reload: getPrice } = useProductPrice();
  const { reload: getTaxes } = useProductTaxes();
  const salesService = new SalesService();
  const [, setLoading] = useState<boolean>(false);
  const schema = z.object({
    customer: z.object({
      id: z.number(),
      name: z.string(),
    }),
    date: z.date(),
    items: z.array(
      z.object({
        product: z.object({
          id: z.number(),
          name: z.string()
        }),
        quantity: positiveNumber,
        price: positiveNumber,
        taxes: z.array(z.number()).optional(),
        subtotal: positiveNumber.optional(),
      })
    ),
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customer: undefined,
      date: new Date(),
      items: [DEFAULT_ITEM]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = useWatch({ control, name: 'items' });

  useEffect(() => {
    items.forEach((item, index) => {
      const quantity = item.quantity;
      const price = item.price;
      const subTotal = Formats.decimal((quantity || 0) * (price || 0));
      if (item.subTotal === subTotal) return;
      setValue(`items.${index}.subTotal`, subTotal);
    });
  }, [items]);

  const onSubmit = async (data: FieldValues) => {
    setSaving(true);
    const makeSaleRequestData: IMakeSaleRequest = getRequestData(data)
    try {
      await salesService.makeSale(makeSaleRequestData);
      toast.success("Venta creada exitosamente");
      navigate('/sales/sales');
    } catch (error: AxiosError | any) {
      setError(error.response?.data?.message || Messages.UNEXPECTED_ERROR)
    } finally {
      setSaving(false);
    }
  };

  function getRequestData(data: FieldValues) {
    return {
      customerId: data.customer.id,
      documentId: 'SALE',
      products: data.items.map((item: FieldValues) => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          price: item.price,
        }
      })
    };
  }

  const fetchProductDetails = async (product: Record<string, string | number>, index: number) => {
    setLoading(true);
    const result = await getPrice({ productId: product.id as number });
    const fetchedPrice = result?.data?.productPrice?.price;
    const taxes = await getTaxes({ productId: product.id as number });
    setValue(`items.${index}.price`, fetchedPrice as never);
    setValue(`items.${index}.taxes`, taxes.data.productTaxes?.map(t => t?.id) as never);
    setLoading(false);
  }

  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Listado de Ventas", path: "/sales/sales" },
          { label: "Nueva Venta", path: "/sales/sales/new" }
        ]
      }/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sticky top-0 bg-white">
          <PageTitleContainer>
            <PageTitle title="Nueva Venta"/>
            <div className="flex justify-end gap-2 mt-4">
              <ConfirmCancelButton
                confirm={isDirty}
                action={() => navigate('/sales/sales')}/>
              <AsyncActionButton
                busy={saving}
                type="submit">
                Guardar
              </AsyncActionButton>
            </div>
          </PageTitleContainer>
          {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
        </div>

        <div className="space-y-4">
          <Panel
            padding="narrow"
            title="Datos de la venta">
            <div className="max-w-full grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-3 sm:max-w-lg">
              <div>
                <Controller
                  name="customer"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomFormElement
                      label="Cliente"
                      required={true}
                      validationError={errors.customer?.message as string}
                    >
                      <GraphQlRemoteComboBox
                        query={GET_CUSTOMERS}
                        size="xs"
                        selectedValue={value}
                        collectionName="customers"
                        handleSelect={(value) => {
                          onChange({ target: { name, value } })
                        }}
                        createModal={CustomerModal}
                        displayProperty="name"
                        valueProperty="id"
                        addButtonText="Crear Cliente"
                        placeholder="Seleccione un cliente"/>
                    </CustomFormElement>)}/>
              </div>

              <div>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomFormElement
                      label="Fecha"
                      required={true}
                      validationError={errors.customer?.message as string}
                    >
                      <DatePicker
                        size="xs"
                        value={value}
                        onChange={(value) => onChange({ target: { name, value } })}/>
                    </CustomFormElement>)}/>
              </div>

            </div>
          </Panel>

          <Panel
            padding="none"
            title="Productos">
            <div style={{ maxHeight: "calc(100vh - 450px)" }} className="overflow-x-auto">
              <table className="new-sale-table">
                <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="w-[10px]"/>
                  <th className="pl-0 text-left">Producto</th>
                  <th className="text-right w-[150px]">Cantidad</th>
                  <th className="text-right w-[150px]">Precio Unitario</th>
                  <th className="text-right w-[186px]">Impuestos</th>
                  <th className="text-right w-[150px]">Subtotal</th>
                  <th className="relative pl-6 py-3 text-right w-[0px]"/>
                </tr>
                </thead>
                <tbody className="bg-white">
                {
                  fields.map((_, index) => (
                    <tr key={index} className={index % 2 == 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-2 text-left text-xs font-medium text-gray-500 uppercase">{index +1}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center">
                          <Controller
                            control={control}
                            name={`items.${index}.product`}
                            render={({ field: { onChange, value, name } }) => (
                              <GraphQlRemoteComboBox
                                size="xs"
                                selectedValue={value === null ? undefined : value}
                                query={PRODUCTS_BY_NAME_OR_REFERENCE}
                                collectionName="productsByNameOrReference"
                                handleSelect={(value) => {
                                  onChange({ target: { name, value } });
                                  fetchProductDetails(value, index)
                                }}
                                displayProperty="name"
                                addButtonText="Crear nuevo producto"
                                createModal={ProductModal}
                                valueProperty="id"
                                placeholder="Seleccionar producto o servicio"/>
                            )}/>
                        </div>
                      </td>
                      <td>
                        <TooltipValidatedInput
                          size="xs"
                          className="text-right"
                          {...register(`items.${index}.quantity`)}
                          validationError={errors.items?.[index]?.quantity?.message as string}
                        />
                      </td>
                      <td>
                        <TooltipValidatedInput
                          size="xs"
                          className="text-right"
                          {...register(`items.${index}.price`)}
                          validationError={errors.items?.[index]?.price?.message as string}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`items.${index}.taxes`}
                          control={control}
                          render={({ field: { value, name, onChange } }) => (
                            <TaxMultiSelect
                              size="xs"
                              onChange={(value) => onChange({ target: { name, value } })}
                              selectedValues={value}
                            />
                          )}/>
                      </td>
                      <td>
                        <span className="text-right">
                         <Input
                           size="xs"
                           readOnly
                           {...register(`items.${index}.subTotal`)}
                           className="text-right"/>
                        </span>
                      </td>
                      <td className="whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="link"
                          type="button"
                          onClick={() => {
                            fields.length > 1
                              ? remove(index)
                              : toast.warning("La venta debe tener al menos un artículo")
                          }}
                          className="text-gray-700 hover:text-gray-800"
                        >
                          <Trash className="h-4"/>
                        </Button>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              <div className="sticky bottom-0 bg-white border-t">
                <Button
                  onClick={() => append(DEFAULT_ITEM)}
                  className="text-blue-500"
                  type="button"
                  variant="link">
                  + Agregar un producto
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      </form>
    </PageWrapper>
  )
}
