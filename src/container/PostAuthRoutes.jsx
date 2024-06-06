import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "../layouts/components/navbar/NavigationBar";
import Home from "../pages/Home";
import AddClient from "../pages/client/AddClient";
import ClientList from "../pages/client/ClientList";
import UpdateClient from "../pages/client/EditClient";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeList from "../pages/employee/EmployeeList";

const PostAuthRoutes = () => {
  return (
    <>
      <NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/clientList" element={<ClientList />} />
          <Route path="/client/create" element={<AddClient />} />
          <Route path="/client/:id" element={<UpdateClient />} />
          <Route path="/employee/create" element={<AddEmployee />} />
          <Route path="/employee/:id" element={<EditEmployee />} />
        </Routes>
      </NavigationBar>
    </>
  );
};

export default PostAuthRoutes;
