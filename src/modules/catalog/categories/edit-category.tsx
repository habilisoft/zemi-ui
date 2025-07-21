import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const EditCategory = () => {
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Catálogo", path: "/catalog" },
          { label: "Categorías", path: "/catalog/categories" },
          { label: "Editar Categoria", path: "/catalog/categories/new" },
        ]
      }/>

      <PageTitle title="Editar Categoria"/>

    </PageWrapper>
  )
}
