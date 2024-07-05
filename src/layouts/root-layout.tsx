import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
// import ls from "@livesession/sdk";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCompoundStore } from '@/stores/compound-store';
import { shallow } from 'zustand/shallow';
import { LocalStorageKeys } from "@/lib/constants";
import { PageLoader } from '@/components/page-loader';

export const RootLayout = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   ls.init(import.meta.env.VITE_LIVE_SESSION_CODE);
  //   ls.newPageView();
  // }, []);

  const {
    authUser,
    authUserLogout,
    companyInfo,
    companyInfoLoaded,
  } = useCompoundStore(
    (state) => ({
      authUser: state.authUser,
      authUserLogout: state.authUserLogout,
      companyInfo: state.companyInfo,
      companyInfoLoaded: state.companyInfoLoaded,
    }),
    shallow
  );

  if (!authUser && authUserLogout) {
    localStorage.setItem(
      LocalStorageKeys.REDIRECT_URL,
      window.location.pathname + window.location.search
    );
    return <Navigate to="/auth/login"/>;
  }

  if (companyInfoLoaded && !companyInfo && window.location.pathname !== '/company-settings/edit') {
    navigate('/company-settings/edit');
  }

  if(authUser?.changePasswordAtNextLogin && window.location.pathname !== '/user-settings/change-password') {
    navigate('/user-settings/change-password');
  }

  if (!companyInfoLoaded) {
    return <PageLoader/>
  }

  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Outlet/>
      </div>
      <Footer/>
      <Toaster position="top-right" richColors/>
    </div>
  );
};
