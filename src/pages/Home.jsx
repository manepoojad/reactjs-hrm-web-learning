import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAssetsListAction } from "src/redux/thunk/assetsThunk";
import { getAllocableEmployeeListAction } from "src/redux/thunk/dashboardThunk";
import { getEmployeeListAction } from "src/redux/thunk/employeeThunk";
import { getProjectListAction } from "src/redux/thunk/projectThunk";

const Home = () => {
  const lookup = useSelector((state) => state.lookup.lookupData);
  const [search, changeSearch] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [projectList, setProjectList] = useState([]);
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
    getProjectList();
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

  const getProjectList = async () => {
    try {
      const responseData = await dispatch(getProjectListAction()).unwrap();

      // const responseData = await fetchInterceptor(
      //   "/project",
      //   {
      //     method: "GET",
      //   }
      // );
      setProjectList(responseData);
    } catch (error) {}
  };

  const getEmployeeList = async () => {
    try {
      const responseData = await dispatch(getEmployeeListAction()).unwrap();

      setEmployeeList(responseData?.employeeList);
    } catch (error) {}
  };

  const getAllocableEmployeeList = async () => {
    try {
      const responseData = await dispatch(
        getAllocableEmployeeListAction()
      ).unwrap();
      // const responseData = await fetchInterceptor(
      //   "/employee/currentAllocableEmployee",
      //   {
      //     method: "GET",
      //   }
      // );

      setAllocableEmployeeList(responseData);
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
            <div>
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
                        to="/employeeList"
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
                            {assetTypeLookupList?.length > 0 &&
                              assetTypeLookupList.map((asset, index) => {
                                {
                                  /* assetsList */
                                }

                                return (
                                  <tr key={asset.id}>
                                    <td className="text-start fw-bold">
                                      {asset.label}
                                    </td>
                                    <td className=" fw-bold">{0}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                      <NavLink
                        to="/assetsList"
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
                          projectList.length > 0 && projectList.length
                        }`}</h5>
                      </div>
                      <p className="text-start">
                        Project section is where you can manage Projects in your
                        organization
                      </p>
                      <div>
                        <table className="table table-sm">
                          <tbody>
                            {projectList.length > 0 &&
                              projectList.map((project, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="text-start fw-bold">
                                      {project?.projectName}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>

                      <NavLink
                        to="/projectList"
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
