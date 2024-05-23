import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "../layouts/components/navbar/NavigationBar";
import Home from "../pages/Home";
import AddEmployee from "../pages/employee/AddEmployee";
import EmployeeList from "../pages/employee/EmployeeList";

const PostAuthRoutes = () => {
  return (
    <>
      <NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/" element={<EmployeeList />} />
          <Route path="/create" element={<AddEmployee />} />
        </Routes>
      </NavigationBar>
    </>
  );
};

export default PostAuthRoutes;
