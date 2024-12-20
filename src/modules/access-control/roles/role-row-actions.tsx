import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IRole } from '@/types';

interface Props {
  role: IRole,
  onAssignToUsers: () => void;
  deleteRole: () => void;
}

function RoleRowActions({
                          role,
                          onAssignToUsers,
                          deleteRole
                        }: Props) {

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
          onClick={onAssignToUsers}
        >
          Asignar este rol a un usuario
        </DropdownMenuItem>
        {!role.systemRole && <DropdownMenuItem
          onClick={deleteRole}
        >Eliminar
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { RoleRowActions };
