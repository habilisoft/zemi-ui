import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodEffects,
  ZodEnum,
  ZodNumber, ZodObject,
  ZodOptional,
  ZodString, ZodTypeAny,
} from "zod";
import { DialogProps } from '@/components/ui/dialog.tsx';

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

export interface ShowCondition {
  field: string;
  value: string | number | string[] | null;
}

export interface IInputFormSchema {
  label: string;
  addOn?: string;
  showIf?: ShowCondition[];
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "radioGroup"
    | "textarea"
    | "combobox"
    | "remote-combobox"
    | "password"
    | "date";
  placeholder?: string;
  name: string;
  options?: { label: string; value: string }[];
  remoteComboProps?: {
    endpoint: string;
    displayProperty: string;
    valueProperty: string;
    createModal: React.ComponentType<DialogProps>;
    selectedValue?: Record<string, string> | undefined;
  }
  defaultValue: string | number | string[] | null;
  validations:
    | ZodString
    | ZodNumber
    | ZodBoolean
    | ZodEffects<ZodArray<ZodString, "many">, string[], string[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ZodEnum<any>
    | ZodOptional<ZodString>
    // eslint-disable-next-line
    | ZodObject<{ }, "strip", ZodTypeAny, { }, { }>
    | ZodDate;
}

export interface IFormSchema {
  inputs: IInputFormSchema[];
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  profileImageUrl: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface IProject {
  id?: number;
  name: string;
  value: Money;
  downPaymentInformation: IDownPaymentInformation;
}

export interface IDownPaymentInformation {
  downPaymentAmount: IDownPaymentAmount;
  downPaymentPaymentMethod: IDownPaymentPaymentMethod;
}

export interface IDownPaymentAmount {
  type: "percentage" | "upfront";
  amount: Money;
}

export interface IDownPaymentPaymentMethod {
  monthsToComplete: number;
  type: "percentage" | "upfront";
  percentage: number;
  reservationAmount: Money;
}
export interface IProjectUnit {
  id: IProjectUnitId;
  name: string;
  project: IProject;
  state: "AVAILABLE" | "RESERVED" | "SOLD";
  value: number;
  currency: string;
}
export interface IProjectUnitRequest {
  name: string,
  value: Money
}

export interface IProjectUnitPrice {
  value: Money;
}

export interface Money {
  value: number;
  currency: string;
}

export interface IProjectUnitId {
  projectId: number;
  name: string;
}

export interface IBuyer {
  id: number;
  name: string;
  [key: string]: string | number;
}

export interface IReserveUnitData {
  buyer: number;
  amount: Money;
}
