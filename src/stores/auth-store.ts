import { IUser } from "@/types";
import { StateCreator } from "zustand";

export interface AuthState {
  authUser: IUser | null;
  authUserLoaded: boolean;
  authUserLogout: boolean;
  newVersionAvailable: boolean;
  setAuthUser: (user: IUser) => void;
  updateAuthUserProperty: <K extends keyof IUser>(
    key: K,
    value: IUser[K]
  ) => void;
  setAuthUserLogout: () => void;
  setNewVersionAvailable: (newVersion: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set, getState) => ({
  authUser: null,
  authUserLoaded: false,
  authUserLogout: false,
  newVersionAvailable: false,
  setAuthUser: (user) => set({ authUser: user, authUserLoaded: true }),
  setAuthUserLogout: () => set({ authUserLogout: true }),
  updateAuthUserProperty: <K extends keyof IUser>(key: K, value: IUser[K]) => {
    const _user: IUser = Object.assign({}, getState().authUser);
    _user[key] = value;

    set({ authUser: _user });
  },
  setNewVersionAvailable: (newVersionAvailable) => set({ newVersionAvailable }),
});
