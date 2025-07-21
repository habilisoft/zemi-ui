import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { ChevronDown, LucideProps } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';

type Props = {
  items: {
    label: string,
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    onClick: () => void
  }[]
}

export const DropdownActionsButton = ({ items }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  }
  return <DropdownMenu onOpenChange={handleOpenChange}>
    <DropdownMenuTrigger asChild>
      <Button
        className={cn(
          "font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
        )}
      >
        <ChevronDown className={cn('transition-all', { 'rotate-180': open }, { 'rotate-0': !open })} size={16}/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="min-w-56 w-fit" align="end">
      {items.map((item, index) => {
        const Icon = item.icon;
        return <DropdownMenuItem
          key={index}
          asChild
          className="cursor-pointer gap-2 py-2"
          onClick={item.onClick}
        >
          <DropdownMenuLabel>
            {Icon ? <Icon className="size-4 ml-2" /> : null}
            {item.label}
          </DropdownMenuLabel>

        </DropdownMenuItem>}
      )}
    </DropdownMenuContent>
  </DropdownMenu>
}
