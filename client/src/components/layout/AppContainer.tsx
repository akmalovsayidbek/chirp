import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavBar from "./NavBar";
import MenuBar from "./MenuBar";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return isLoading ? (
    <div className="grid place-items-center h-screen">
      <img src={logo} className="w-20 h-20" />
    </div>
  ) : user ? (
    <div className="flex min-h-screen flex-col bg-default-100 dark:bg-black">
      <NavBar />
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 py-4 px-5">
        <MenuBar className="sticky top-[72px] hidden h-fit flex-none space-y-3 rounded-xl sm:block p-2 xl:w-[250px]" />
        <Outlet />
      </div>
      <MenuBar className="sticky bottom-0 w-full h-[55px] p-2 items-center justify-between sm:hidden" />
    </div>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;
