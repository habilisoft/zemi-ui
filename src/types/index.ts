import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodEffects,
  ZodEnum,
  ZodNumber,
  ZodOptional,
  ZodString,
} from "zod";

export interface IDIalogOptions {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface IConfirmationDialogOptions {
  isOpen: boolean;
  description: string | React.ReactNode;
  title: string;
  cancelButtonText?: string;
  acceptButtonText?: string;
  action: () => void;
  cancel: () => void;
  cancelButtonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  actionButtonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}

export interface IInputFormSchema {
  label: string;
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "radioGroup"
    | "textarea"
    | "combobox"
    | "date";
  placeholder?: string;
  name: string;
  options?: { label: string; value: string }[];
  defaultValue: string | number | string[] | null;
  validations:
    | ZodString
    | ZodNumber
    | ZodBoolean
    | ZodEffects<ZodArray<ZodString, "many">, string[], string[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ZodEnum<any>
    | ZodOptional<ZodString>
    | ZodDate;
}

export interface IFormSchema {
  inputs: IInputFormSchema[];
}
