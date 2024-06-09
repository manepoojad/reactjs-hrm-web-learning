import { Route, Routes } from "react-router-dom";
import EmployeeList from "src/pages/employee/EmployeeList";
import NavigationBar from "../layouts/components/navbar/NavigationBar";
import Home from "../pages/Home";
import AddAssets from "../pages/assets/AddAssets";
import AssetsList from "../pages/assets/AssetsList";
import EditAssets from "../pages/assets/EditAssets";
import AddClient from "../pages/client/AddClient";
import ClientList from "../pages/client/ClientList";
import UpdateClient from "../pages/client/EditClient";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeProfile from "../pages/employeeProfile/EmployeeProfile";

const PostAuthRoutes = () => {
  return (
    <>
      <NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeProfile" element={<EmployeeProfile />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/employee/create" element={<AddEmployee />} />
          <Route path="/employee/:id" element={<EditEmployee />} />
          <Route path="/clientList" element={<ClientList />} />
          <Route path="/client/create" element={<AddClient />} />
          <Route path="/client/:id" element={<UpdateClient />} />
          <Route path="/assetsList" element={<AssetsList />} />
          <Route path="/assets/create" element={<AddAssets />} />
          <Route path="/assets/:id" element={<EditAssets />} />
        </Routes>
      </NavigationBar>
    </>
  );
};

export default PostAuthRoutes;
