import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Import, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { NoDataPlaceholder } from '@/components/no-data-placeholder';
import Empty from '@/assets/illustrations/empty-box.svg';
import { DropdownActionsButton } from '@/components/ui/dropdown-actions-button.tsx';
import { GraphQLRemoteDataTable } from '@/components/ui/graphql-remote-data-table';
import { GET_PRODUCTS } from '@/queries.ts';

const columns = [
  {
    "header": "Nombre",
    "field": "name",
  }
]

export const Products = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Catálogo", path: "/catalog" },
          { label: "Productos", path: "/catalog/products" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Productos" subtitle="Listado de Productos"/>
        <div className="flex space-x-1">

          <Button asChild>
            <Link to="new">
              <Plus className="size-4 mr-2"/> Nuevo Producto
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
