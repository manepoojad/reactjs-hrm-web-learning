import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import fetchInterceptor from "src/helper/fetchInterceptor";
import { getAssetsListAction } from "src/redux/thunk/assetsThunk";
import { getEmployeeListAction } from "src/redux/thunk/employeeThunk";

const Home = () => {
  const lookup = useSelector((state) => state.lookup.lookupData);
  const [search, changeSearch] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [assetsList, setAssetsList] = useState([]);
  const [allocableEmployeeList, setAllocableEmployeeList] = useState([]);
  const dispatch = useDispatch();
  const [data, changeData] = useState({
    employees: null,
    assets: null,
    projects: null,
  });

  useEffect(() => {
    getEmployeeList();
    getAllocableEmployeeList();
    getAssetsList();
  }, []);

  let roles = JSON.parse(localStorage.getItem("roles"));
  let employeeId = JSON.parse(localStorage.getItem("employeeId"));

  const assetsTypeLookup = lookup?.find(
    (lookup) => lookup.lookupType === "assetType"
  );
  const assetTypeLookupList = assetsTypeLookup?.lookups;

  const totalEmployeeCount = employeeList.length;
  const onLeaveEmployeeCount =
    totalEmployeeCount - allocableEmployeeList.length;

  

  const getEmployeeList = async () => {
    try {
      const responseData = await dispatch(getEmployeeListAction()).unwrap();

      setEmployeeList(responseData?.employeeList);
    } catch (error) {}
  };

  const getAllocableEmployeeList = async () => {
    try {
      const responseData = await fetchInterceptor(
        "/employee/currentAllocableEmployee",
        {
          method: "GET",
        }
      );

      setAllocableEmployeeList(responseData?.allocableEmployees);
    } catch (error) {}
  };

  const getAssetsList = async () => {
    try {
      const responseData = await dispatch(getAssetsListAction()).unwrap();

      setAssetsList(responseData);
    } catch (error) {}
  };

  

  const onChangeSearch = (e) => {
    let value = e.target.value;

    changeSearch(value);
  };
  // const { loading } = reducerDashboardState;

  // console.log(roles);

  return (
    <>
      <>
        <div
          className={`p-2 container-fluid d-flex flex-row justify-content-between text-white`}
        >
          <h4>Home</h4>
          {/* <div className="w-20">
              <Searchbox
                value={search}
                onChange={onChangeSearch}
                placeholder={"Search on home"}
              />
            </div> */}
        </div>
        {roles == "HR" || roles == "Manager" ? (
          <>
            <div style={{ overflow: "scroll" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="col-sm-4 mb-3">
                  <div
                    style={{
                      border: "1px solid #252129",
                      margin: 16,
                      padding: 16,
                      borderRadius: 16,
                      boxShadow: "initial",
                    }}
                  >
                    <div>
                      <div className="d-flex flex-row justify-content-between">
                        <h5 className="fw-bold">Employees</h5>
                        <h5 className="fw-bold">{`Total : ${
                          employeeList.length > 0 && employeeList.length
                        }`}</h5>
                      </div>
                      <p className="card-text text-start">
                        Employee section is where you can manage existing
                        employees organization or onbord new employees
                      </p>
                      <div>
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <td className="text-start fw-bold">Working</td>
                              <td className=" fw-bold">
                                {allocableEmployeeList.length > 0 &&
                                  allocableEmployeeList.length}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-start  fw-bold">On leave</td>
                              <td className=" fw-bold">
                                {onLeaveEmployeeCount || "0"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <NavLink
                        to="/app/employee"
                        className="bg-success text-white btn btn-primary"
                      >
                        Employees
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 mb-3">
                  <div>
                    <div
                      style={{
                        border: "1px solid #252129",
                        margin: 16,
                        padding: 16,
                        borderRadius: 16,
                        boxShadow: "initial",
                      }}
                    >
                      <div className="d-flex flex-row justify-content-between">
                        <h5 className="fw-bold">Assests</h5>
                        <h5 className="fw-bold">{`Total :${
                          assetsList.length > 0 && assetsList.length
                        }`}</h5>
                      </div>
                      <p className="text-start">
                        Assests section is where you can manage Assets in your
                        organization
                      </p>
                      <div>
                        <table className="table table-sm">
                          <tbody>
                            {assetsList.length > 0 &&
                              assetsList.map((asset, index) => {
                                const assetsTypeLookupData =
                                  assetTypeLookupList?.find(
                                    (lookup) =>
                                      lookup?.id === asset?.assetTypeLookupId
                                  );

                                const assetTypeLabel = assetsTypeLookupData
                                  ? assetsTypeLookupData?.label
                                  : "";

                                return (
                                  <tr key={index}>
                                    <td className="text-start fw-bold">
                                      {assetTypeLabel}
                                    </td>
                                    <td className=" fw-bold">
                                      {asset.assetTypeLookupId.count || "0"}
                                    </td>
                                  </tr>
                                );
                              })}
                            
                          </tbody>
                        </table>
                      </div>
                      <NavLink
                        to="/app/assets"
                        className="bg-success text-white btn btn-primary"
                      >
                        Assets
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 mb-3">
                  <div>
                    <div
                      style={{
                        border: "1px solid #252129",
                        margin: 16,
                        padding: 16,
                        borderRadius: 16,
                        boxShadow: "initial",
                      }}
                    >
                      <div className="d-flex flex-row justify-content-between">
                        <h5 className="fw-bold">Projects</h5>
                        <h5 className="fw-bold">{`Total :${
                          data.projects && data.projects.totalCount
                        }`}</h5>
                      </div>
                      <p className="text-start">
                        Project section is where you can manage Projects in your
                        organization
                      </p>
                      <div>
                        <table className="table table-sm">
                          <tbody>
                            {data.projects &&
                              data.projects.names.map((name, index) => {
                                return (
                                  <tr key={`${name} + ${index}`}>
                                    <td className="text-start fw-bold">
                                      {name}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>

                      <NavLink
                        to="/app/project"
                        className="bg-success text-white btn btn-primary"
                      >
                        Projects
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "Coming Soon"
        )}
      </>
    </>
  );
};
export default Home;
