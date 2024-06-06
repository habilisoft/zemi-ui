import { Bolt } from "lucide-react";
import { ModulesDropdown } from "@/components/modules-dropdown";
import { Link } from "react-router-dom";
import { SearchBar } from "../ui/search-bar";
import { UserDropdown } from "../user-dropdown";
import { MobileMenu } from "../mobile-menu";
import { TenantsDropdown } from "../tenants-dropdown";

export const Header = () => {
  return (
    <header className="bg-neutral-900 px-10 py-1 flex items-center gap-5 justify-between md:justify-normal">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex flex-shrink-0 items-center text-amber-400">
          <Bolt />
        </Link>
        <span className="w-[1px] bg-neutral-500 h-[24px]"></span>
        <ModulesDropdown />
      </div>
      <div className="text-white hidden md:block flex-1">
        <SearchBar />
      </div>
      <MobileMenu triggerButtonClassName="text-white block md:hidden">
        <div className="flex flex-col items-start gap-4">
          <TenantsDropdown />
          <UserDropdown />
        </div>
      </MobileMenu>
      <div className="flex-1 md:flex items-center justify-end gap-4 hidden">
        <TenantsDropdown />
        <span className="w-[1px] bg-neutral-500 h-[24px]"></span>
        <UserDropdown buttonTriggerClassName="text-white" />
      </div>
    </header>
  );
};
