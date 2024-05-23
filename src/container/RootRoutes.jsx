import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PostAuthRoutes from "./PostAuthRoutes";

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PostAuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
