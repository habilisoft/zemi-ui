import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import "./index.css";
import { constructionRoutes } from "@/modules/construction";
import { loansRoutes } from '@/modules/loans';
import { payrollRoutes } from '@/modules/payroll';
import { accountingRoutes } from '@/modules/accounting';
import { RootLayout } from "./layouts";
import AuthPage from "./modules/auth/auth";
import { AuthProvider } from '@/context/auth-context';
import { getSubdomain } from '@/lib/utils';
import axios from "axios";
import { Receipt } from '@/modules/construction/payment-receipt/receipt.tsx';
import { userSettingsRoutes } from '@/modules/user-settings';
import { companySettingsRoutes } from '@/modules/company-settings';
import { CompanyInfoProvider } from '@/context/company-context.tsx';
import { accessControlRoutes } from '@/modules/access-control';


axios.defaults.headers.common['TenantId'] = getSubdomain();
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      constructionRoutes,
      accountingRoutes,
      payrollRoutes,
      loansRoutes,
      userSettingsRoutes,
      companySettingsRoutes,
      accessControlRoutes
    ],
    errorElement: <div>Error inesperado</div>,
  },
  {
    path: "/login",
    element: <AuthPage/>,
  },
  {
    path: "/receipt",
    element: <Receipt/>
  }
]);

const queryClient = new QueryClient();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CompanyInfoProvider>
          <RouterProvider router={router}/>
        </CompanyInfoProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
