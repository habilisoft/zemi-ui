import { PageWrapper } from '@/components/ui/page-wrapper.tsx';
import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useParams } from 'react-router-dom';
import { gql } from '@/graphql';
import { useQuery } from '@apollo/client';
import Spinner from '@/components/ui/spinner.tsx';
import PageTitleContainer from '@/components/ui/page-title-container.tsx';
import { FactRow } from '@/components/ui/fact-row.tsx';

export const ViewCategory = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const GET_CATEGORY = gql(/* GraphQL */`
      query GetCategory($id: Int!) {
          category(id: $id) {
              id
              name
              description
          }
      }
  `);

  const { data, loading } = useQuery(GET_CATEGORY, {
    variables: { id: parseInt(id) },
  });

  const category  = data?.category;

  if(loading) return <Spinner/>

  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Catálogo", path: "/catalog" },
          { label: "Categorías", path: "/catalog/categories" },
          { label: category?.name || "", path: "/catalog/categories" },
        ]}
      />
      <PageTitleContainer>
        <PageTitle title={category?.name}/>
      </PageTitleContainer>
      <div className="mt-3 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <FactRow
            bg="gray"
            title="Nombre">
                    <span className="text-sm text-gray-900">
                      {category?.name}
                    </span>
          </FactRow>
          <FactRow
            bg="white"
            title="Descripción">
                    <span className="text-sm text-gray-900">
                      {category?.description}
                    </span>
          </FactRow>
        </dl>
      </div>
    </PageWrapper>
  );
}
