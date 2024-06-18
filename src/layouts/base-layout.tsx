import { MobileMenu } from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import  { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./styles.css";
import { MenuItem } from '@/types';
import CollapsibleMenuItem from '@/layouts/collapsible-menu-item.tsx';

type Props = {
  menuItems: MenuItem[];
  title: string;
};

export const BaseLayout = ({ menuItems, title }: Props) => {
  const [sidebarIsHidden, setSidebarIsHidden] = useState(false);
  const location = useLocation();

  return (
    <>
      <div
        className={cn(
          "flex-col gap-y-5 overflow-y-auto lg:border-r border-neutral-200 bg-neutral-100 transition-all ",
          { "w-60": !sidebarIsHidden }
        )}
      >
        {!sidebarIsHidden && (
          <div
            className={cn(
              "lg:border-b border-neutral-200 p-4 lg:flex items-center justify-between hidden"
            )}
          >
            <h3 className="text-xl font-bold">{title}</h3>
            <Button variant="ghost" onClick={() => setSidebarIsHidden(true)}>
              <X size={18}/>
            </Button>
          </div>
        )}

        {sidebarIsHidden && (
          <Button variant="ghost" onClick={() => setSidebarIsHidden(false)}>
            <Menu size={18}/>
          </Button>
        )}

        <MobileMenu triggerButtonClassName="text-neutral-900 px-4 py-2 block lg:hidden">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="mt-4 space-y-1">
            {menuItems.map((item) => {
              if(!item.children) {
                return (
                  <SheetClose asChild key={item.title}>
                    <Button
                      variant="link"
                      className={cn("block w-full text-left rounded-none px-4", {
                        "text-amber-700 font-bold": location.pathname === item.path,
                      })}
                      asChild
                    >
                      <NavLink
                        end={item.path.split("/").length === 2}
                        to={item.path}>
                        {item.title}
                      </NavLink>
                    </Button>
                  </SheetClose>
                )
              }
              return <CollapsibleMenuItem key={item.title} item={item}/>

            })}
          </div>
        </MobileMenu>

        {!sidebarIsHidden && (
          <div className="mt-4 space-y-2 hidden lg:block">
            {menuItems.map((item) => {
              if(!item.children) {
                return (
                  <NavLink
                    to={item.path}
                    key={item.title}
                    end={item.path.split("/").length === 2}
                    className="nav-item">
                    {item.title}
                  </NavLink>
                )
              }
              return <CollapsibleMenuItem key={item.title} item={item}/>
            } )}
          </div>
        )}
      </div>
      <div className="flex-1 bg-white overflow-y-auto transition-all">
        <div className="p-5">
          <Outlet/>
        </div>
      </div>
    </>
  );
};
