import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Import, Plus } from 'lucide-react';
import { DropdownActionsButton } from '@/components/ui/dropdown-actions-button.tsx';
import { GraphQLRemoteDataTable } from '@/components/ui/graphql-remote-data-table';
import { GET_PRODUCTS } from '@/queries.ts';
import { NoDataPlaceholder } from '@/components/no-data-placeholder';
import Empty from '@/assets/illustrations/empty-box.svg';

const columns = [
  {
    "header": "Nombre",
    "field": "name",
  }
]

export const Rents = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Rentas", path: "/rents" },
          { label: "Lista", path: "/rents" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Rentas"/>

        <div className="flex space-x-1">

          <Button asChild>
            <Link to="new">
              <Plus className="size-4 mr-2"/> Nueva Renta
            </Link>
          </Button>
          <DropdownActionsButton items={[
            { label: "Importar desde Excel", icon: Import, onClick: () => console.log("Exportar") },
          ]}/>
        </div>
      </div>
      <GraphQLRemoteDataTable
        query={GET_PRODUCTS}
        collectionName="products"
        columns={columns}
        gridChanged={false}
        onRowClick={(row) => navigate(`/catalog/products/${row.id}`)}
        searchFields={["name"]}
        style={{ height: "calc(100vh - 350px)" }}
        noDataPlaceholder={<NoDataPlaceholder
          message="No se han creado productos"
          buttonText="Crear primer producto"
          onClick={() => navigate("/catalog/products/new")}
          illustration={Empty}/>}
        defaultPageSize={20}/>
    </PageWrapper>
  );
}
