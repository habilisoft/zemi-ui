import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Spinner from '@/components/ui/spinner.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { FactRow } from '@/components/ui/fact-row.tsx';
import { GET_PRODUCT } from '@/queries.ts';
import Formats from '@/lib/formatters.ts';
import { ResourceNotFound } from '@/components/resource-not-found';

export const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: { id: parseInt(id) },
  });

  const product  = data?.product;

  if(loading) return <Spinner/>

  if(!product) {
    return <ResourceNotFound message="Producto no encontrado"/>
  }

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Catálogo", path: "/catalog" },
          { label: "Productos", path: "/catalog/products" },
          { label: product?.name || "", path: `/catalog/products/${product?.id}` },
        ]}
      />
      <PageTitleContainer>
        <PageTitle title={product?.name}/>
      </PageTitleContainer>
      <div className="mt-3 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <FactRow
            bg="gray"
            title="Nombre">
                    <span className="text-sm text-gray-900">
                      {product?.name}
                    </span>
          </FactRow>
          <FactRow
            bg="white"
            title="Categoría">
                    <span className="text-sm text-gray-900">
                      {product?.category?.name || "Sin categoría"}
                    </span>
          </FactRow>
          <FactRow
            bg="gray"
            title="Precio">
                    <span className="text-sm text-gray-900">
                      {(product?.prices && true && product.prices.length > 0)
                        ? Formats.currency({ value: product?.prices[0]?.price as number, currency: "DOP"})
                        : "Sin precio"}
                    </span>
          </FactRow>
        </dl>
      </div>
    </PageWrapper>
  );
}
