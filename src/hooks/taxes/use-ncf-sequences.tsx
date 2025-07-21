import { useQuery } from '@apollo/client';
import { GET_NCF_SEQUENCES } from '@/queries.ts';

export function useNcfSequences() {
  const { loading, data, refetch } = useQuery(GET_NCF_SEQUENCES);
  return {
    loading,
    ncfSequences: data?.ncfSequences,
    reload: refetch,
  };
}
