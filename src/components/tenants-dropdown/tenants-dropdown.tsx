import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const tenants = [
  { title: "Baldom", value: "Baldom" },
  { title: "Arenque", value: "Arenque" },
  { title: "Bagre", value: "Bagre" },
  { title: "Tilapia", value: "Tilapia" },
];

export const TenantsDropdown = () => {
  const [tenant, setTenant] = useState(tenants[0].value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        >
          {tenants.find((c) => c.value === tenant)?.title || ""}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuRadioGroup
          value={tenant}
          onValueChange={(value) => setTenant(value)}
        >
          {tenants.map((tenant) => (
            <DropdownMenuRadioItem
              key={tenant.value}
              value={tenant.value}
              className="py-2 cursor-pointer"
            >
              {tenant.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
