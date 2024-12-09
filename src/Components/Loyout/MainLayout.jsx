import React, { useEffect, useState } from "react";
import AppLayout from "../Loyout/App"; // Assuming AppLayout is the layout component
import { Outlet } from "react-router-dom";
// import AuthContext from "../Auth/AuthContext";

export default function MainLayout() {
  const checkAuthentication = () => {
    const user = localStorage.getItem("TajurbaAdminUser");
    const token = localStorage.getItem("TajurbaAdminToken");
    return user && token;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication);
  //   const authCtx = useContext(AuthContext);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(checkAuthentication());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkAuthentication]);

  // console.log(isAuthenticated);

  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Outlet />
  );
}
