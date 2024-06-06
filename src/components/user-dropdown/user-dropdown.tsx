import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context.tsx';

type Props = {
  buttonTriggerClassName?: string;
};

export function UserDropdown({ buttonTriggerClassName }: Props) {
  const { logout } = useContext(AuthContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={null} className={cn("py-0", buttonTriggerClassName)}>
          <User size={20} />
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer gap-2 py-2">
            <Settings size={18} />
            Configuraciones
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer gap-2 py-2">
            <LogOut size={18} />
            Salir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
