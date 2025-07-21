import { INcfType } from '@/types';

export const LocalStorageKeys = {
  CURRENT_WORKSPACE: "c_w",
  REDIRECT_URL: "r_u",
  NO_MOBILE_DIALOG: "n_b_d",
  USER_INFO: "userInfo",
  TOKEN_INFO: "tokenInfo",
  SHOW_ONBOARDING_ONCE: "s_o_o",
  ONBOARDING_COMPLETED: "o_c",
  USER_LOGGED_IN: "u_l_i",
  LIVE_SESSION_URL: "l_s_u",
};

export const Messages = {
  UNEXPECTED_ERROR: "Se ha producido un error inesperado. Por favor contacte soporte técnico"
}

export const NcfTypes: INcfType[] = [
  {
    value: "FINAL_CONSUMER",
    displayName: "Consumidor Final",
    numericValue: "01"
  },
  {
    value: "FISCAL_CREDIT",
    displayName: "Crédito Fiscal",
    numericValue: "02"
  },
  {
    value: "GUBERNATORIAL",
    displayName: "Gubernamental",
    numericValue: "14"
  },
  {
    value: "SPECIAL",
    displayName: "Especial",
    numericValue: "15"
  }
]
