import Cookies from "js-cookie";
import React, { useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import PostAuthRoutes from "./PostAuthRoutes";
const RootRoutes = () => {
  const location = useLocation();

  const isAuthStatus = useMemo(() => {
    let userToken = Cookies.get("jwtToken") || "";
    if (userToken) {
      return true;
    } else {
      return false;
    }
  }, [location]);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthStatus ? <Navigate replace to="/" /> : <Login />}
      />
      <Route
        path="/*"
        element={
          isAuthStatus ? <PostAuthRoutes /> : <Navigate replace to="/login" />
        }
      />
    </Routes>
  );
};

export default RootRoutes;
