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
  includes?: string
}

export interface IInputFormSchema {
  label: string;
  addOn?: string;
  showIf?: ShowCondition[];
  helpText?: string;
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
    | "money"
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
  defaultValue: string | number | string[] | null | Money;
  validations:
    | ZodString
    | ZodNumber
    | ZodBoolean
    | ZodEffects<ZodArray<ZodString, "many">, string[], string[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ZodEffects<ZodObject<any>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ZodEnum<any>
    | ZodOptional<ZodString>
    // eslint-disable-next-line
    | ZodObject<{}, "strip", ZodTypeAny, {}, {}>
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
  pricePerUnit?: IPricePerUnit;
  units?: IProjectUnit[];
}

export interface IProjectResponse {
  id?: number;
  name: string;
  value: Money;
  downPaymentInformation: IDownPaymentInformation;
  pricePerUnit?: IPricePerUnit;
  units?: IProjectUnitResponse[];
}

export interface IPricePerUnit {
  value: Money;
  downPaymentInformation: IDownPaymentInformation;
}

export interface IDownPaymentInformation {
  downPaymentAmount: IDownPaymentAmount;
  amount?: IDownPaymentAmount;
  downPaymentPaymentMethod: IDownPaymentPaymentMethod;
  paymentMethod?: IDownPaymentPaymentMethod;
}

export interface IDownPaymentAmount {
  type: "percentage" | "amount";
  amount?: Money | IPercentageValue;
  percentage?: IPercentageValue | number;
}

export interface IPercentageValue {
  value: number;
}

export interface IDownPaymentPaymentMethod {
  monthsToComplete?: number;
  type: "percentage" | "upfront";
  percentage?: number;
  reservationAmount?: Money;
}

export interface IProjectUnit {
  id: IProjectUnitId;
  name: string;
  project: IProject;
  state: "AVAILABLE" | "RESERVED" | "SOLD";
  value: number;
  currency: string;
}

export interface IProjectUnitResponse {
  id: number;
  name: string;
  project: IProject;
  state: "AVAILABLE" | "RESERVED" | "SOLD";
  value: number;
  currency: string;
}

export interface IProjectUnitRequest {
  name: string,
  value: Money,
  downPaymentInformation?: IDownPaymentInformation
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
  payment: {
    paymentMethods: IPaymentMethod []
  }
}

export interface IPaymentMethod {
  last4?: string;
  amount: Money;
  type?: "CARD" | "CASH" | "TRANSFER" | "CHECK";
}
export interface DownPaymentInstallmentRequest {
  payment: {
    paymentMethods: IPaymentMethod []
  }
}

export interface DownPaymentInstallment {
  id: number;
  amount: Money;
  date: string;
  balance: Money;
}

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IUnitResponse {
  id: number;
  name: string;
  state: "AVAILABLE" | "RESERVED" | "SOLD";
  price: IUnitResponsePrice;
  auditInfo: IAuditInfo;
}

export interface IUnitResponsePrice {
  value: Money;
  downPaymentInformation: IDownPaymentInformation;
}

export interface IAuditInfo {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface IDownPaymentResponse {
  installments: DownPaymentInstallment[];
  state: "PENDING" | "PAID" | "CANCELLED";
  date: string;
  dueDate: string;
  amount: Money;
  balance: Money;
}

export interface ICompanyInformation {
  name?: string,
  address?: string,
  phone?: string,
  email?: string,
  website?: string,
  logo?: string,
  document?: string
}

export interface MenuItem {
  title: string;
  path: string;
  children?: MenuItem[];
}

export interface IPaymentResponse {
  amount: Money
  paymentInformation: {
    paymentMethods: IPaymentMethod[]
  }
}
