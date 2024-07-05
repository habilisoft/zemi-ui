import { useQuery } from "@tanstack/react-query";
import { PermissionsService } from '@/services/permissions.service';

export function usePermissions(searchTerm: string) {
  const permissionsService = new PermissionsService();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["permissions", searchTerm],
    queryFn: () => permissionsService.getPermissions(),
  });

  return {
    isLoading,
    permissions: data,
    reload: refetch,
  };
}
