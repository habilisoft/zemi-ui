import { devtools } from "zustand/middleware";
import { createAuthSlice, AuthState } from "./auth-store";
import { createWithEqualityFn } from 'zustand/traditional';

export const useCompoundStore = createWithEqualityFn<
    AuthState
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  }))
);
