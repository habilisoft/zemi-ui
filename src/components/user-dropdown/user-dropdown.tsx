import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context.tsx';
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { GrUserSettings } from 'react-icons/gr';
import { Link } from 'react-router-dom';

type Props = {
  buttonTriggerClassName?: string;
};

export function UserDropdown({ buttonTriggerClassName }: Props) {
  const { logout } = useContext(AuthContext);
  const {
    authUser
  } = useCompoundStore(
    (state) => ({
      authUser: state.authUser,
    }),
    shallow
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={null} className={cn("py-0 space-x-2 flex items-center", buttonTriggerClassName)}>
          <User size={16}/>
          <span className="text-sm">{authUser?.name}</span>
          <ChevronDown size={16}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="cursor-pointer gap-2 py-2">
            <Link to={`/user-settings`}>
              <GrUserSettings size={18}/>
              Ajustes de usuario
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer gap-2 py-2">
            <LogOut size={18}/>
            Salir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
