import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const RootLayout = () => {
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
