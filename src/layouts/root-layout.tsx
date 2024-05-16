import { Outlet } from "react-router-dom";
// import ls from "@livesession/sdk";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
// import { useEffect } from "react";

export const RootLayout = () => {
  // useEffect(() => {
  //   ls.init(import.meta.env.VITE_LIVE_SESSION_CODE);
  //   ls.newPageView();
  // }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
