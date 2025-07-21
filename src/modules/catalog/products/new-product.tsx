import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { ProductForm } from '@/modules/catalog/products/product-form.tsx';
import { useNavigate } from 'react-router-dom';
import PageTitle from '@/components/ui/page-title.tsx';
import { HalfScreenContainer } from '@/components/ui/half-screen-container.tsx';

export const NewProduct = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/catalog/products");
  }
  return (
    <PageWrapper>
      <Breadcrumb items={
        [
          { label: "Catálogo", path: "/catalog" },
          { label: "Productos", path: "/catalog/products" },
          { label: "Nuevo Producto", path: "/catalog/products/new" },
        ]
      }/>
      <PageTitle title="Nuevo Producto"/>

      <HalfScreenContainer>
        <ProductForm
          handleSuccess={handleSuccess}
          confirmCancel={true}
          onCancel={() => navigate("/catalog/products")}/>
      </HalfScreenContainer>

    </PageWrapper>
  )
}
