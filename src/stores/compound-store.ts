import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice, AuthState } from "./auth-store";

export const useCompoundStore = create<
    AuthState
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  }))
);
