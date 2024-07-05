import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { Link } from 'react-router-dom';
import { BsBuildingGear } from 'react-icons/bs';
import { FaUsersGear } from 'react-icons/fa6';

export const TenantsDropdown = () => {
  const {
    companyInfo
  } = useCompoundStore(
    (state) => ({
      companyInfo: state.companyInfo,
    }),
    shallow
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        >
          {companyInfo?.name || "Empresa"}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem
          asChild
          className="cursor-pointer gap-2 py-2">
          <Link to={`/company-settings`}>
            <BsBuildingGear size={18}/>
            Ajustes de empresa
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer gap-2 py-2">
          <Link to={`/access-control`}>
            <FaUsersGear size={18}/>
            Usuarios y permisos
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
