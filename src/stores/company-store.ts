import { ICompanyInformation } from "@/types";
import { StateCreator } from "zustand";

export interface CompanyState {
  companyInfo: ICompanyInformation | null;
  companyInfoLoaded: boolean;
  setCompanyInfo: (info: ICompanyInformation) => void;
  setCompanyInfoLoaded: (loaded: boolean) => void;
}

export const createCompanySlice: StateCreator<CompanyState> = (set) => ({
  companyInfo: null,
  companyInfoLoaded: false,
  setCompanyInfo: (info: ICompanyInformation) => set({ companyInfo: info }),
  setCompanyInfoLoaded: (loaded: boolean) => set({ companyInfoLoaded: loaded }),
});
