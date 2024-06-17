import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { ComponentType, createElement, useEffect, useState } from 'react';
import axios from 'axios';
import { DialogProps } from '@/components/ui/dialog.tsx';

interface Props {
  endpoint: string;
  handleSelect: (value: Record<string, string>) => void;
  displayProperty: string;
  valueProperty: string;
  selectedValue?: Record<string, string> | undefined;
  placeholder: string;
  createModal?: ComponentType<DialogProps>;
}

export function RemoteComboBox(
  {
    endpoint,
    displayProperty,
    placeholder,
    valueProperty,
    selectedValue,
    handleSelect,
    createModal,
  }: Props,
) {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleValueChange = async (value: string) => {
    await search(value);
  }

  useEffect(() => {
    search('');
  }, []);

  const search = async (value: string) => {
    if (value) {
      endpoint = endpoint + `?${displayProperty}=${value}`;
    }
    try {
      const { data } = await axios.get(endpoint);
      setData(data?.content || []);
    } catch (error) {
      console.error(error);
    }
  }

  const closeModal = (data: Record<string, string> | undefined) => {
    setShowModal(false);
    if(data) {
      handleSelect(data);
    }
  }

  return (
    <>
      {createModal &&
          createElement(createModal, {
            isOpen: showModal,
            close: closeModal
          })}
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between",
              !selectedValue && "text-muted-foreground"
            )}
          >
            {selectedValue
              ? selectedValue[displayProperty]
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-full p-0">
          <Command>
            <CommandInput
              onValueChange={handleValueChange}
              placeholder="Buscar..."/>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {data.map((option) => (
                  <CommandItem
                    value={option[displayProperty]}
                    key={option[valueProperty]}
                    onSelect={() => {
                      handleSelect(option)
                      setMenuOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue && option[valueProperty] === selectedValue[valueProperty]
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option[displayProperty]}
                  </CommandItem>
                ))}
                <CommandItem>
                  <Button
                    onClick={() => setShowModal(true)}
                    variant="link"
                    className="text-primary text-center text-blue-700 underline font-bold"
                  >
                    Agregar nuevo
                  </Button>
                </CommandItem>
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
