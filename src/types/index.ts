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
  autoFocus?: boolean;
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
    addButtonText?: string;
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
    | ZodDate
    | ZodArray<ZodString>
}

export interface IFormSchema {
  inputs: IInputFormSchema[];
}

export interface IUser {
  name: string;
  username: string;
  profileImageUrl?: string;
  permissions?: string[];
  roles: IRole[],
  changePasswordAtNextLogin?: boolean;
}

export interface ICreateUserRequest {
  name: string;
  username: string;
  password: string;
  roles: string[];
  changePasswordAtNextLogin: boolean;
}

export interface IUserCreated {
  name: string,
  username: string,
  roles: IRole[],
  password: string,
  changePasswordAtNextLogin: boolean
}

export interface IRole {
  name: string;
  description: string
  permissions: IPermission[];
  systemRole: boolean;
}

export interface IPermission {
  id: string,
  name: string,
  description: string
  module: string
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface IProject {
  id?: number;
  name: string;
  value?: Money;
  downPaymentInformation: IDownPaymentInformation;
  pricePerUnit?: IPricePerUnit;
  units?: IProjectUnit[];
}

export interface IProjectRequest {
  id?: number;
  name: string;
  value?: Money;
  downPaymentInformation: IDownPaymentInformation;
  pricePerUnit: Money;
  units?: IProjectUnit[];
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
  type: "reservation" | "upfront";
  percentage?: number;
  reservationAmount?: Money;
  amount?: Money;
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
  value: Money,
  downPaymentInformation?: IDownPaymentInformation
}

export interface IProjectUnitPrice {
  value: Money;
}

export interface Money {
  value: number | undefined;
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

export interface IResetPasswordRequest {
  username: string;
  password: string;
  changePasswordAtNextLogin: boolean;
}

export interface IUnitDetailResponse {
  id: number;
  name: string;
  state: "AVAILABLE" | "RESERVED" | "SOLD";
  project: IProject;
  price?: IUnitResponsePrice;
  downPayment?: IDownPaymentResponse;
}

export interface IUnitResponsePrice {
  value: Money;
  downPaymentInformation: IDownPaymentInformation;
}

export interface IDownPaymentResponse {
  buyer: IBuyer;
  installments: DownPaymentInstallment[];
  reservation?: IUnitReservation;
  state: "PENDING" | "PAID" | "CANCELLED";
  date: string;
  dueDate: string;
  amount: Money;
  balance: Money;
}

export interface IUnitReservation {
  date: string;
  amount: Money;
  monthsToComplete: number;
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
  id: number;
  amount: Money
  description: string
  paymentInformation: {
    paymentMethods: IPaymentMethod[]
  }
}

export interface IDownPaymentInstallmentResponse {
  buyer: IBuyer;
  id: number;
  date: string;
  createdById: string;
  balance: Money;
  payment: IPaymentResponse;
}

export interface IDownPaymentInstallmentDetailedResponse {
  id: number;
  date: string;
  createdById: string;
  balance: Money;
  downPayment: IDownPaymentResponse;
  payment: IPaymentResponse;
}

export interface IExchangeRateResponse {
  source: {
    name: string,
    displayName: string
  },
  buy: number,
  sell: number,
  from: string,
  to: string,
  lastUpdate: string
}

export interface ICreateProductRequest {
  name: string;
  description: string;
  categoryId: number;
  isService: boolean;
}

export interface ICreateRentRequest {
  customerId: number;
}

export interface ICreateCategoryRequest {
  name: string;
  description: string;
}

export interface IInvoice {
  id: number;
  number: string;
  date: string;
  dueDate: string;
  total: Money;
  state: "DRAFT" | "PAID" | "CANCELLED";
  customer: IBuyer;
  items: IInvoiceItem[];
}

export interface IInvoiceItem {
  id: number;
  product: IProduct;
  quantity: number;
  price: Money;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  stock: number;
  sku: string;
}

export interface IPageRequest {
  first: number,
  after: string,
  last: number,
  before: string
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IEdge<T> {
  node: T;
  cursor: string;
}

export interface ICustomer {
  id: number;
  name: string;
  phoneNumbers: string[]
  emailAddress: string;
  type: 'PERSON' | 'BUSINESS';
  accountsReceivable: AccountReceivableDetail;
  fiscalSettings: IFiscalSettings
  address: IAddress[]
  priceList: IPriceList
}

export interface IPriceList {
  id: number;
  name: string;
}

export interface IRegisterCustomerRequest {
  id: number;
  name: string;
  phoneNumbers: string[]
  emailAddress: string;
  type: 'PERSON' | 'BUSINESS';
  address: IAddress[]
  rnc: string | undefined
}


export interface AccountReceivableDetail {
  creditLimit: number;
}

export interface IFiscalSettings {
  ncfType: string;
}

export interface IAddress {
  street: string;
  city: string;
  zipCode: string;
}

export interface ReusableFormProps {
  handleSuccess: (data: Record<string, string> | undefined) => void;
  confirmCancel?: boolean;
  onCancel: () => void;
}

export interface IMakeSaleRequest {
  documentId: string;
  customerId: number;
  products: IMakeSaleProduct[]
}

export interface IMakeSaleProduct {
  productId: number;
  quantity: number;
  price: number
}

export interface INcfType {
  value: 'FINAL_CONSUMER' | 'FISCAL_CREDIT' | 'GUBERNATORIAL' | 'SPECIAL',
  displayName: string
  numericValue: string
}

export interface INcfSequenceRequest {
  series: 'B';
  ncfType: INcfType['value'],
  start: number;
  end: number;
  expirationDate: Date;
}

export interface ISale {
  id: { sequence: string; document: string };
  ncf: string;
  date: Date;
  customer: ICustomer;
  total: Money;
}
