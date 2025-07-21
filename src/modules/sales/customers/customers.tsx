import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { NoDataPlaceholder } from '@/components/no-data-placeholder';
import Empty from '@/assets/illustrations/empty-box.svg';
import { GraphQLRemoteDataTable } from '@/components/ui/graphql-remote-data-table';
import { GET_CUSTOMERS } from '@/queries.ts';
import { ICustomer } from '@/types';

const columns = [
  {
    "header": "Nombre",
    "field": "name",
  }
]

export const Customers = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Clientes", path: "/sales/customers" }
        ]
      }/>
      <PageTitleContainer>
        <PageTitle title="Clientes"/>
        <Button asChild>
          <Link to="new">
            <Plus className="size-4 mr-2"/> Nuevo Cliente
          </Link>
        </Button>
      </PageTitleContainer>
      <GraphQLRemoteDataTable
        query={GET_CUSTOMERS}
        collectionName="customers"
        columns={columns}
        gridChanged={false}
        reload={false}
        filters={[]}
        onRowClick={(row: ICustomer) => navigate(`/sales/customers/${row.id}`)}
        style={{ height: "calc(100vh - 350px)" }}
        searchFields={["name"]}
        noDataPlaceholder={<NoDataPlaceholder
          message="No hay ningún cliente registrado"
          buttonText="Crear primer cliente"
          onClick={() => navigate("/sales/customers/new")}
          illustration={Empty}/>}
        defaultPageSize={25}/>
    </PageWrapper>
  )
}
