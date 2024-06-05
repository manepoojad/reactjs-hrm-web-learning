import Cookies from "js-cookie";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PostAuthRoutes from "./PostAuthRoutes";

const RootRoutes = () => {
  const isAuthStatus = (() => {
    let userToken = Cookies.get("jwtToken") || "";
    if (userToken) {
      return true;
    } else {
      return false;
    }
  })();


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthStatus ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/*"
          element={
            isAuthStatus ? (
              <PostAuthRoutes />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
