import { useQuery } from '@apollo/client';
import { GET_PRICE_LISTS } from '@/queries.ts';

export function usePriceLists() {
  const { loading, data, refetch } = useQuery(GET_PRICE_LISTS);
  return {
    loading,
    priceLists: data?.priceLists || [] as any[],
    reload: refetch,
  };
}
