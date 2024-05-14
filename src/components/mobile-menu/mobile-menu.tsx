import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";

type Props = {
  children: React.ReactNode;
  triggerButtonClassName?: string;
};

export function MobileMenu({ children, triggerButtonClassName }: Props) {
  return (
    <Sheet>
      <SheetTrigger className={cn(triggerButtonClassName)}>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">{children}</SheetContent>
    </Sheet>
  );
}
