import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { IFormSchema, IInputFormSchema, Money } from "@/types";
import { Checkbox } from "./checkbox";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  LoaderCircle,
} from "lucide-react";
import { es } from "date-fns/locale";
import { AlertDialog } from "./alert-dialog";
import React, { useState } from "react";
import { RemoteComboBox } from '@/components/ui/remote-combobox.tsx';
import { FormHelpIcon } from '@/components/ui/form-help-icon';

interface Props extends IFormSchema {
  submitButtonText?: string;
  cancelButtonText?: string;
  confirmCancel?: boolean;
  title?: string;
  description?: string;
  columns?: number;
  sendingRequest: boolean;
  onSubmit: (data: Record<string, string | string[]>) => void;
  onCancel?: () => void | undefined;
  alertDialogText?: string;
  alertDialogDesc?: string;
  labelsClassName?: string;
  submitButtonClassName?: string;
  alertAcceptButtonText?: string;
  alertCancelButtonText?: string;
  externalErrors?: Record<string, string>;
  submitButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function CompoundForm(props: Props) {
  const {
    inputs,
    submitButtonText = "Enviar",
    cancelButtonText = "Cancelar",
    description,
    title,
    columns = 1,
    sendingRequest,
    onSubmit,
    onCancel,
    alertDialogText,
    alertDialogDesc,
    labelsClassName,
    submitButtonVariant = "default",
    submitButtonClassName,
    confirmCancel = true,
    alertAcceptButtonText,
    alertCancelButtonText,
  } = props;
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);

  const FormSchema = z.object(
    inputs.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.name]: currentValue.validations,
      }),
      {}
    )
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: inputs
      .filter((input) => input.defaultValue !== null)
      .reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.name]: currentValue.defaultValue,
        }),
        {}
      ),
  });

  const renderInputBasedOnType = (
    inputData: IInputFormSchema,
    field: ControllerRenderProps<object, never>
  ): React.ReactNode => {
    switch (inputData.type) {
      case "select":
        return (
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={inputData.placeholder}/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {inputData.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        );
      case "number":
      case "password":
      case "text":
        return (
          <FormControl>
            <Input
              placeholder={inputData.placeholder || ""}
              {...field}
              type={inputData.type}
            />
          </FormControl>
        );
      case "textarea":
        return (
          <FormControl>
            <Textarea
              placeholder={inputData.placeholder || ""}
              className="resize-none"
              {...field}
            />
          </FormControl>
        );
      case "remote-combobox":
        return (
          <FormControl>
            <RemoteComboBox
              endpoint={inputData.remoteComboProps?.endpoint || ""}
              handleSelect={(value) => {
                form.setValue(field.name, value as never);
              }}
              selectedValue={field.value}
              createModal={inputData?.remoteComboProps?.createModal || undefined}
              displayProperty={inputData.remoteComboProps?.displayProperty || ""}
              valueProperty={inputData.remoteComboProps?.valueProperty || ""}
              placeholder={inputData.placeholder || ""}/>
          </FormControl>
        )
      case "combobox":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? inputData?.options?.find(
                      (language) => language.value === field.value
                    )?.label
                    : inputData.placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar..."/>
                <CommandEmpty>Sin resultados.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {inputData?.options?.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          form.setValue(field.name, option.value as never);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Selecciona un fecha</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={es}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case "checkbox":
        return inputData?.options?.map((option) => (
          <FormField
            key={option.value}
            control={form.control}
            name={inputData.name as never}
            render={({ field }) => {
              return (
                <FormItem
                  key={option.value}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={(field.value as string[])?.includes(
                        option.value
                      )}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, option.value])
                          : field.onChange(
                            (field.value as string[])?.filter(
                              (value) => value !== option.value
                            )
                          );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              );
            }}
          />
        ));
      case "radioGroup":
        return (
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {inputData.options?.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value}/>
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "money": {
        const value = field.value as Money;
        return (
          <FormControl>
            <div className="flex items-center">
              <div>
                <Select
                  onValueChange={(e) => form.setValue(field.name, { value: value.value, currency: e } as never)}
                  value={value.currency}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Seleccione una moneda"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      key="USD"
                      value="USD">
                      USD
                    </SelectItem>
                    <SelectItem
                      key="DOP"
                      value="DOP">
                      DOP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="valor"
                type="number"
                value={value.value}
                onChange={(e) => form.setValue(field.name, {
                  ...value,
                  value: Number.parseInt(e.target.value)
                } as never)}
                className="form-input"
              />
            </div>
          </FormControl>
        )
      }
      default:
        return null;
    }
  };

  return (
    <>
      {title && (
        <h2 className="text-base font-bold leading-7 text-neutral-900">
          {title}
        </h2>
      )}

      {description && (
        <p className="mt-1 text-sm leading-6 text-neutral-600">{description}</p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("gap-6 grid", `grid-cols-${columns}`, {
            "mt-6": title || description,
          })}
        >
          {inputs
            .filter((inputData) => {
              if (!inputData.showIf) return true;
              return inputData.showIf.every((condition) => {
                const show = condition.includes
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  ? form.watch(condition.field).includes(condition.value?.toString())
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  : form.watch(condition.field)?.toString() === condition.value?.toString();
                if (!show) {
                  form.setValue(inputData.name as never, inputData.defaultValue as never);
                }
                return show;
              });
            })
            .map((inputData) => (
              <FormField
                key={inputData.name}
                control={form.control}
                name={inputData.name as never}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className={cn(labelsClassName, 'flex items-center justify-between')}>
                      <div>{inputData.label}</div>
                      {inputData.helpText && <FormHelpIcon text={inputData.helpText}/>}
                    </FormLabel>
                    {renderInputBasedOnType(inputData, field)}
                    <FormMessage/>
                  </FormItem>
                )}
              />
            ))}
          <div className="flex items-center gap-4">
            {onCancel && (
              <Button
                onClick={() => {
                  confirmCancel
                    ? setAlertDialogIsOpen(true)
                    : onCancel();
                }}
                variant="outline"
                type="button"
                disabled={sendingRequest}
              >
                {cancelButtonText}
              </Button>
            )}

            <Button
              variant={submitButtonVariant}
              type="submit"
              disabled={sendingRequest}
              className={cn(submitButtonClassName)}
            >
              {sendingRequest && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
              )}
              {submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
      {(onCancel && confirmCancel) && (
        <AlertDialog
          isOpen={alertDialogIsOpen}
          cancel={() => setAlertDialogIsOpen(false)}
          action={() => {
            onCancel();
            setAlertDialogIsOpen(false);
          }}
          title={alertDialogText || ""}
          description={alertDialogDesc || ""}
          acceptButtonText={alertAcceptButtonText}
          cancelButtonText={alertCancelButtonText}
        />
      )}
    </>
  );
}
