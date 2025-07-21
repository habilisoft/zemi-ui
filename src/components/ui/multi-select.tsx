import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import Spinner, { Color } from '@/components/ui/spinner.tsx';
import { cva, VariantProps } from 'class-variance-authority';

export const variants = cva(
  "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-9",
        xs: "h-8",
        lg: "h-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  })

export interface MultiSelectVariantProps extends VariantProps<typeof variants> {}

export interface MultiSelectProps extends MultiSelectVariantProps {
  options: { value: never; label: never }[];
  placeholder?: string;
  selectedValues: never[];
  onChange: (value: never[]) => void;
  loadingData?: boolean;
}

const MultiSelect = ({
                       options,
                       placeholder = 'Seleccionar opciones',
                       selectedValues = [],
                       onChange,
                       loadingData = false,
                       size
                     }: MultiSelectProps) => {

  const toggleSelect = (value: never) => {
    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };

  const renderSelectedOptions = () => {
    if (selectedValues.length === 0) return placeholder;
    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label)
      .join(', ');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(variants({ size }), { "opacity-50": selectedValues.length === 0 })}>
          {loadingData &&
            <div className="opacity-50 flex items-center gap-2"><Spinner color={Color.GRAY}/>Cargando...</div>}
          {!loadingData && renderSelectedOptions()}
          <ChevronDown className="h-4 w-4 opacity-50"/>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative z-50 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={5}
          align="start"
        >
          {options.map((option) => (
            <DropdownMenu.Item
              key={option.value}
              className="relative flex w-full select-none items-center rounded-sm py-3 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                toggleSelect(option.value)
              }}
            >
              <div className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {selectedValues.includes(option.value) && <Check className="h-4 w-4"/>}
              </div>
              <div className="flex items-center justify-center">
                <span className="label">{option.label}</span>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MultiSelect;
