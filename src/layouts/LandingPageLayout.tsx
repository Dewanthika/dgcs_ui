import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className="flex flex-col h-screen w-2/3 m-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
