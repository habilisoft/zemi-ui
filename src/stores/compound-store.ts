import { devtools } from "zustand/middleware";
import { createAuthSlice, AuthState } from "./auth-store";
import { createWithEqualityFn } from 'zustand/traditional';
import { CompanyState, createCompanySlice } from '@/stores/company-store.ts';

export const useCompoundStore = createWithEqualityFn<
  CompanyState
  & AuthState
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createCompanySlice(...a),
  }))
);
