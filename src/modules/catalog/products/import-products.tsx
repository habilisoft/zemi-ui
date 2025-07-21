import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';

export const ImportProducts = () => {
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Catálogo", path: "/catalog" },
          { label: "Productos", path: "/catalog/products" },
          { label: "Importar productos", path: "/catalog/products/import" }
        ]
      }/>
      <PageTitle title={"Importar productos"} subtitle={"Importar productos desde un archivo"}/>
    </PageWrapper>
  )
}
