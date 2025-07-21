import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar.tsx';
import { es } from 'date-fns/locale';
import { useState } from 'react';

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  size?: "sm" | "default" | "xs";
}

export const DatePicker = ({
                             value,
                             onChange,
                             size
                           }: Props) => {
  const [open, setMenuOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange(date);
    setMenuOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={size}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "PPP", { locale: es })
          ) : (
            <span>Selecciona un fecha</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={es}
          mode="single"
          selected={value}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
