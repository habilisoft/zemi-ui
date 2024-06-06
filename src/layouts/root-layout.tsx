import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
// import ls from "@livesession/sdk";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCompoundStore } from '@/stores/compound-store';
import { shallow } from 'zustand/shallow';
import { LocalStorageKeys } from "@/lib/constants";

export const RootLayout = () => {
  // useEffect(() => {
  //   ls.init(import.meta.env.VITE_LIVE_SESSION_CODE);
  //   ls.newPageView();
  // }, []);

  const {
    authUser,
    authUserLogout,
  } = useCompoundStore(
    (state) => ({
      authUser: state.authUser,
      authUserLogout: state.authUserLogout,
    }),
    shallow
  );

  if (!authUser && authUserLogout) {
    localStorage.setItem(
      LocalStorageKeys.REDIRECT_URL,
      window.location.pathname + window.location.search
    );
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};
