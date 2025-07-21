import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER } from '@/queries.ts';
import Spinner from '@/components/ui/spinner.tsx';
import { TabWrapper } from '@/components/tab-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { FactRow } from '@/components/ui/fact-row.tsx';
import { ResourceNotFound } from '@/components/resource-not-found';
import { NcfTypes } from '@/lib/constants.tsx';
import { EditableField } from '@/components/editable-field';
import { NcfTypeSelect } from '@/components/ncf-type-select/ncf-type-select.tsx';
import { CustomerService } from '@/services/customer.service.ts';
import { useEffect, useState } from 'react';
import { ICustomer } from '@/types';
import { PriceListSelect } from '@/components/price-list-select';
import { Input } from '@/components/ui/input.tsx';
import Formats from '@/lib/formatters.ts';

export const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<ICustomer>();
  if (id === undefined) {
    return;
  }
  const customerService = new CustomerService();
  const { data, loading, refetch } = useQuery(GET_CUSTOMER, {
    variables: { id: parseInt(id) }
  });

  useEffect(() => {
    if (data?.customer) {
      setCustomer(data?.customer as ICustomer);
    }
  }, [data?.customer]);

  if (loading) {
    return <Spinner/>
  }

  if(!customer) {
    return <ResourceNotFound message="Cliente no encontrado"/>
  }

  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Clientes", path: "/sales/customers" },
          { label: customer.name || "", path: `/sales/customers/${customer.id}` }
        ]
      }/>
      <PageTitle title={customer.name}/>

      <TabWrapper defaultTab="basic">
        {(selectedTab, setSelectedTab) => (
          <Tabs
            onValueChange={(value) => setSelectedTab(value)}
            defaultValue={selectedTab} className="w-full">
              <TabsList>
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="sales">Ventas</TabsTrigger>
                <TabsTrigger value="fiscal">Configuración Fiscal</TabsTrigger>
              </TabsList>
            <TabsContent value="basic">
              <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <FactRow
                    bg="gray"
                    title="Nombre">
                    <span className="text-sm text-gray-900">
                      {customer.name}
                    </span>
                  </FactRow>
                </dl>
              </div>
            </TabsContent>
            <TabsContent value="sales">
              <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <FactRow
                    bg="gray"
                    title="Límite de crédito">
                    <EditableField
                      value={customer?.accountsReceivable?.creditLimit.toString()}
                      render={(value) => value ? Formats.currency({value: parseFloat(value), currency: "DOP"}) : "No definido"}
                      className="w-[350px] xs:w-full"
                      onSave={async (value) => {
                        await customerService.changeCreditLimit(customer.id, parseFloat(value));
                        await refetch();
                      }}
                      editControl={({value, disabled,  handleChange})=><Input
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleChange(e.target.value)}/>}
                    />
                  </FactRow>
                  <FactRow
                    bg="white"
                    title="Lista de Precios">
                    <EditableField
                      value={customer?.priceList?.id.toString()}
                      render={() => customer?.priceList?.name || "No definido"}
                      className="w-[350px] xs:w-full"
                      onSave={async (value) => {
                        await customerService.changePriceList(customer.id, value);
                        await refetch();
                      }}
                      editControl={({value, disabled,  handleChange})=><PriceListSelect
                        disabled={disabled}
                        size="xs"
                        value={value}
                        onChange={(value: string) => handleChange(value)}/>}/>
                  </FactRow>
                </dl>
              </div>
            </TabsContent>
            <TabsContent value="fiscal">
              <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <FactRow
                    bg="gray"
                    title="Tipo de NCF">
                    <EditableField
                      value={customer.fiscalSettings?.ncfType as string}
                      render={(value) => NcfTypes.find((type) => type.value === value)?.displayName || "No definido"}
                      className="w-[350px] xs:w-full"
                      onSave={async (value) => {
                        await customerService.changeNcfType(customer.id, value);
                        await refetch();
                      }}
                      editControl={({value, disabled,  handleChange})=><NcfTypeSelect
                        disabled={disabled}
                        size="xs"
                        value={value}
                        onChange={(value: string) => handleChange(value)}/>}/>
                  </FactRow>
                </dl>
              </div>
            </TabsContent>
          </Tabs>)}
      </TabWrapper>
    </PageWrapper>
  )
}
