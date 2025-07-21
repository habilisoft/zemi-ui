import { useQuery } from '@apollo/client';
import { GET_PERMISSIONS } from '@/queries.ts';

export function usePermissions() {
  const { loading, data, refetch } = useQuery(GET_PERMISSIONS);
  return {
    loading,
    permissions: data?.permissions,
    reload: refetch,
  };
}
