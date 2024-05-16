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
import { IFormSchema, IInputFormSchema } from "@/types";
import { Checkbox } from "./checkbox";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, LoaderCircle } from "lucide-react";
import { es } from "date-fns/locale";

interface Props extends IFormSchema {
  submitButtonText?: string;
  title?: string;
  description?: string;
  columns?: number;
  sendingRequest: boolean;
  onSubmit: (data: Record<string, string | string[]>) => void;
}

export function CompoundForm(props: Props) {
  const {
    inputs,
    submitButtonText = "Submit",
    description,
    title,
    columns = 1,
    sendingRequest,
    onSubmit,
  } = props;
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
                  <SelectValue placeholder={inputData.placeholder} />
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
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        );

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
          {inputs.map((inputData) => (
            <FormField
              key={inputData.name}
              control={form.control}
              name={inputData.name as never}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{inputData.label}</FormLabel>
                  {renderInputBasedOnType(inputData, field)}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div>
            <Button type="submit" disabled={sendingRequest}>
              {sendingRequest && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
