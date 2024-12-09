import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./FinalRoute";
import PageNotFound from "./../Components/Common/PageNotFound";
import MainLayout from "../Components/Loyout/MainLayout";
import Login from "./../Components/Auth/Login";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import NewPassword from "../Components/Auth/NewPassword";
import NewPasswordForUser from "../Components/Auth/NewPasswordForUser";
import VerifyOTP from "./../Components/Auth/VerifyOTP";
import PasswordReset from "./../Components/Auth/PasswordReset";
import LoginSuccessful from "./../Components/Auth/LoginSuccessful";
import RouteName from "./RouteDetails";
import ProtectedRoute from "./ProtectedRoute";

const LOADING = (
  <div className="home-page">
    <div className="container-fluid main-container">
      <div className="row library-row center-me padding-top-40-percent">
        <div className="col-12 center-me">
          <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// console.log("AdminRoute", AdminRoute);

const Lazy = () => {
  return (
    <HashRouter>
      <Suspense fallback={LOADING}>
        <Routes>
          <Route path={RouteName.Auth.Login} element={<Login />} />
          <Route
            path={RouteName.Auth.ForgotPassword}
            element={<ForgotPassword />}
          />
          <Route path={RouteName.Auth.NewPassword} element={<NewPassword />} />
          <Route
            path={RouteName.Auth.NewPasswordForUser}
            element={<NewPasswordForUser />}
          />
          <Route path={RouteName.Auth.VerifyOtp} element={<VerifyOTP />} />
          <Route
            path={RouteName.Auth.PasswordReset}
            element={<PasswordReset />}
          />
          <Route
            path={RouteName.Auth.LoginSuccessful}
            element={<LoginSuccessful />}
          />
          <Route element={<MainLayout />}>
            {AdminRoute.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  page.protected ? (
                    <ProtectedRoute redirectPath={`../${page.redirectPath}`}>
                      {page.element}
                    </ProtectedRoute>
                  ) : (
                    page.element
                  )
                }
                exact={page.exact}
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default Lazy;
