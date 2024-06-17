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
import { GrUserSettings } from 'react-icons/gr';

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
            <GrUserSettings size={18}/>
            Ajustes de empresa
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
