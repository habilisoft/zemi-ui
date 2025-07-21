import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { NoDataPlaceholder } from '@/components/no-data-placeholder';
import Empty from '@/assets/illustrations/empty-box.svg';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { GraphQLRemoteDataTable } from '@/components/ui/graphql-remote-data-table';
import { GET_CATEGORIES } from '@/queries.ts';

const columns = [
  {
    "header": "Nombre",
    "field": "name",
  }
]

export const Categories = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Catálogo", path: "/catalog" },
          { label: "Categorías", path: "/catalog/categories" },
        ]}
      />
      <PageTitleContainer>
        <PageTitle title="Categorías" subtitle="Categorías de Productos"/>
        <Button asChild>
          <Link to="new">
            <Plus className="size-4 mr-2"/> Nueva Categoría
          </Link>
        </Button>
      </PageTitleContainer>
      <GraphQLRemoteDataTable
        query={GET_CATEGORIES}
        collectionName="categories"
        columns={columns}
        gridChanged={false}
        onRowClick={(row) => navigate(`/catalog/categories/${row.id}`)}
        searchFields={["name"]}
        style={{ height: "calc(100vh - 350px)" }}
        noDataPlaceholder={<NoDataPlaceholder
          message="No hay ninguna categoría registrada"
          buttonText="Crear primera categoría"
          onClick={() => navigate("/catalog/categories/new")}
          illustration={Empty}/>}
        defaultPageSize={20}/>
    </PageWrapper>
  )
}
