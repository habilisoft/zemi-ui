import { useQuery } from '@apollo/client';
import { GET_TAXES } from '@/queries.ts';

export function useTaxes() {
  const { loading, data, refetch } = useQuery(GET_TAXES);
  return {
    loading,
    taxes: data?.taxes,
    reload: refetch,
  };
}
