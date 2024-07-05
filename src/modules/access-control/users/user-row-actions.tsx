import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from '@/types';
import { ProtectedContent } from '@/components/protected-content';
import { useCompoundStore } from '@/stores/compound-store.ts';

interface Props {
  user: IUser,
  handleResetPassword: () => void;
  handleRemoveUser: () => void;
}

function UserRowActions({
                          handleResetPassword,
                          handleRemoveUser,
                          user
                        }: Props) {

  const { authUser } = useCompoundStore((state) => ({ authUser: state.authUser }));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4"/>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuItem
          onClick={handleResetPassword}>
          Restablecer contraseña
        </DropdownMenuItem>
        {(authUser?.username !== user.username) && <ProtectedContent perms={['auth:user:delete']}>
          <DropdownMenuItem
            onClick={handleRemoveUser}>
            Eliminar usuario
          </DropdownMenuItem>
        </ProtectedContent>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserRowActions };
