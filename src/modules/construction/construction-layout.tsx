import { MobileMenu } from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/construction",
  },
  {
    title: "Proyectos",
    path: "/construction/projects",
  },
];

export const ConstructionLayout = () => {
  const [sidebarIsHidden, setSidebarIsHidden] = useState(false);
  const location = useLocation();

  return (
    <>
      <div
        className={cn(
          "flex-col gap-y-5 overflow-y-auto lg:border-r border-neutral-200 bg-neutral-100",
          { "w-60": !sidebarIsHidden }
        )}
      >
        {!sidebarIsHidden && (
          <div
            className={cn(
              "lg:border-b border-neutral-200 p-4 lg:flex items-center justify-between hidden"
            )}
          >
            <h3 className="text-xl font-bold">Constructora</h3>
            <Button variant="ghost" onClick={() => setSidebarIsHidden(true)}>
              <X size={18} />
            </Button>
          </div>
        )}

        {sidebarIsHidden && (
          <Button variant="ghost" onClick={() => setSidebarIsHidden(false)}>
            <Menu size={18} />
          </Button>
        )}

        <MobileMenu triggerButtonClassName="text-neutral-900 px-4 py-2 block lg:hidden">
          <h3 className="text-xl font-bold">Constructora</h3>
          <div className="mt-4 space-y-1">
            {menuItems.map((item) => (
              <SheetClose asChild key={item.title}>
                <Button
                  variant="link"
                  className={cn("block w-full text-left rounded-none px-4", {
                    "text-amber-700 font-bold": location.pathname === item.path,
                  })}
                  asChild
                >
                  <Link to={item.path}>{item.title}</Link>
                </Button>
              </SheetClose>
            ))}
          </div>
        </MobileMenu>

        {!sidebarIsHidden && (
          <div className="mt-4 space-y-1 hidden lg:block">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant="link"
                className={cn("block w-full text-left rounded-none px-4", {
                  "text-amber-700 font-bold": location.pathname === item.path,
                })}
                asChild
              >
                <Link to={item.path}>{item.title}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="h-[1600px] p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};
