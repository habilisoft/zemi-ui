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
import { DialogProps } from '@/components/ui/dialog.tsx';
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql/language';
import { IEdge, IPageInfo } from '@/types';

interface Props {
  query: DocumentNode;
  collectionName: string;
  handleSelect: (value: Record<string, string>) => void;
  displayProperty: string;
  valueProperty: string;
  selectedValue?: Record<string, string | number | undefined> | undefined;
  placeholder: string;
  createModal?: ComponentType<DialogProps>;
  addButtonText?: string;
  pageSize?: number;
  size?: "sm" | "default" | "xs";
}

export function GraphQlRemoteComboBox(
  {
    query,
    collectionName,
    displayProperty,
    placeholder,
    valueProperty,
    selectedValue,
    handleSelect,
    createModal,
    pageSize = 25,
    addButtonText = "Agregar nuevo",
    size = "default"
  }: Props,
) {
  const [records, setRecords] = useState<Record<string, string>[]>([]);
  const [busy, setBusy] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pageInfo, setPageInfo] = useState<IPageInfo>();

  const { data, loading, fetchMore } = useQuery(query, {
    variables: {
      first: pageSize,
    }
  });

  useEffect(() => {
    if(!data) {
      return;
    }
    setRecords(data[collectionName].edges.map((edge: IEdge<any>) => edge.node));
  }, [data]);

  useEffect(() => {
    setBusy(loading);
  }, [loading]);

  const handleValueChange = async (value: string) => {
    await search(value);
  }

  useEffect(() => {
    search('');
  }, []);

  const search = async (search: string) => {
    setBusy(true);
    await fetchMore({
      variables: {
        first: pageSize,
        search
      },
      updateQuery: (_, { fetchMoreResult }) => {
        const newRecords = fetchMoreResult[collectionName].edges.map((edge: IEdge<any>) => edge.node);
        setRecords( newRecords);
        setPageInfo(fetchMoreResult[collectionName].pageInfo as IPageInfo);
      },
    });
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
            size={size}
            className={cn(
              "justify-between w-full",
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
            {createModal && <CommandItem>
              <Button
                onClick={() => setShowModal(true)}
                variant="link"
                className="text-primary text-center text-blue-700 underline font-bold py-0"
              >
                {addButtonText}
              </Button>
            </CommandItem>}
            <CommandGroup>
              <CommandList>
                {records.map((option) => (
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
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
