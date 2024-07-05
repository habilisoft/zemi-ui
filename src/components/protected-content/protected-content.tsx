import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { ReactNode, useMemo } from 'react';

type Props = {
  children: ReactNode;
  perms?: string[];
};

function ProtectedContent({ children, perms }: Props) {
  perms = perms || [];
  perms.push('admin');
  const {
    authUser
  } = useCompoundStore(
    (state) => ({
      authUser: state.authUser,
    }),
    shallow
  );

  const userPermissions = useMemo(() => {
    if (authUser?.permissions?.length) {
      return authUser.permissions;
    }
    return [];
  }, [authUser]);


  let showContent = false;

  showContent = authUser
    ? userPermissions.some((p: string) => perms?.includes(p))
    : false;

  return showContent ? <>{children}</> : <></>;
}


export { ProtectedContent }
