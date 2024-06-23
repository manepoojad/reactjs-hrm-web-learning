import { useEffect } from "react";

import Cookies from "js-cookie";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getLookupAction } from "src/redux/thunk/lookupThunk";
import Login from "../pages/Login";
import PostAuthRoutes from "./PostAuthRoutes";

const RootRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getLookupAction());
  }, []);

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
