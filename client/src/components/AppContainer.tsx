import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return isLoading ? (
    <div>Loading...</div>
  ) : user ? (
    <div>
      <Outlet />
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
