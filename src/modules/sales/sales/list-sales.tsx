import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListChecks, Plus } from 'lucide-react';
import { DropdownActionsButton } from '@/components/ui/dropdown-actions-button.tsx';
import { GraphQLRemoteDataTable } from '@/components/ui/graphql-remote-data-table';
import { GET_SALES } from '@/queries.ts';
import { NoDataPlaceholder } from '@/components/no-data-placeholder';
import Empty from '@/assets/illustrations/empty-box.svg';
import { ISale } from '@/types';
import Formats from '@/lib/formatters.ts';

const columns = [
  {
    "header": "Fecha",
    "field": "date",
    "render": (_cell: unknown, row: ISale) => Formats.shortDate(row.date),
    "style": { width: "120px" }
  },
  {
    "header": "Cliente",
    "field": "customer",
    "render": (_cell: unknown, row: ISale) => row.customer.name,
  }
]

export const ListSales = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Ventas", path: "/sales" },
          { label: "Lista de Ventas", path: "/sales/sales" }
        ]
      }/>

      <PageTitleContainer>
        <PageTitle title="Ventas"/>
        <div className="flex space-x-1">
          <Button asChild>
            <Link to="new">
              <Plus className="size-4 mr-2"/> Nueva Venta
            </Link>
          </Button>
          <DropdownActionsButton items={[
            { label: "Nueva Venta desde Pedido", icon: ListChecks, onClick: () => console.log("Exportar") },
            { label: "Nueva Venta dede Cotización", icon: List, onClick: () => console.log("Eliminar") }
          ]}/>
        </div>
      </PageTitleContainer>
      <GraphQLRemoteDataTable
        query={GET_SALES}
        collectionName="sales"
        columns={columns}
        gridChanged={false}
        reload={false}
        filters={[]}
        onRowClick={(row: ISale) => navigate(`/sales/sales/${row.id}`)}
        style={{ height: "calc(100vh - 350px)" }}
        searchFields={["name"]}
        noDataPlaceholder={<NoDataPlaceholder
          message="No hay ningún cliente registrado"
          buttonText="Crear primer cliente"
          onClick={() => navigate("/sales/sales/new")}
          illustration={Empty}/>}
        defaultPageSize={25}/>
    </PageWrapper>
  )
}
