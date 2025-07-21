import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { CategoryForm } from '@/modules/catalog/categories/category-form.tsx';
import { HalfScreenContainer } from '@/components/ui/half-screen-container.tsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const NewCategory = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    toast.success("Categoria creada correctamente");
    navigate("/catalog/categories");
  }
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Catálogo", path: "/catalog" },
          { label: "Categorías", path: "/catalog/categories" },
          { label: "Nueva Categoria", path: "/catalog/categories/new" },
        ]
      }/>

      <PageTitle title="Nueva Categoria"/>

      <HalfScreenContainer>
        <CategoryForm
          handleSuccess={handleSuccess}
          confirmCancel={true}
          onCancel={() => navigate("/catalog/categories")}/>
      </HalfScreenContainer>

    </PageWrapper>
  )
}
