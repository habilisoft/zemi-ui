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
  const [company, setCompany] = useState(tenants[0].value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        >
          {tenants.find((c) => c.value === company)?.title || ""}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuRadioGroup
          value={company}
          onValueChange={(value) => setCompany(value)}
        >
          {tenants.map((company) => (
            <DropdownMenuRadioItem
              key={company.value}
              value={company.value}
              className="py-2 cursor-pointer"
            >
              {company.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
