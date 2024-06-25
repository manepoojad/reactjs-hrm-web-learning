import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAssetsBySpecificEmployeeIdAction } from "src/redux/thunk/assetsThunk";
import { getEmployeeDataByIdAction } from "src/redux/thunk/employeeThunk";
import { getProjectListByIdAction } from "src/redux/thunk/projectThunk";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";

const EmployeeProfile = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [userProfileData, setUserProfileData] = useState({});
  const [asset, setAsset] = useState([]);
  const [project, setProject] = useState([]);
  const [lookupData, setLookupData] = useState([]);

  useEffect(() => {
    getUserProfileData();
    getAssetsList();
    getAllLookupList();
    getProjectList();
  }, []);

  const employeeId = JSON.parse(localStorage.getItem("employeeId"));

  // const getProjectList = async () => {
  //   try {
  //     const responseData = await dispatch(getProjectListAction()).unwrap();

  //     // const responseData = await fetchInterceptor(
  //     //   "/project",
  //     //   {
  //     //     method: "GET",
  //     //   }
  //     // );
  //     setProject(responseData);
  //     // setFilteredProjectList(responseData);
  //   } catch (error) {}
  // };

  const getProjectList = async () => {
    try {
      const responseData = await dispatch(
        getProjectListByIdAction(employeeId)
      ).unwrap();

      // const responseData = await fetchInterceptor(
      //   "/project",
      //   {
      //     method: "GET",
      //   }
      // );
      // console.log(responseData);

      setProject(responseData);
      // setFilteredProjectList(responseData);
    } catch (error) {}
  };

  const getAssetsList = async () => {
    try {
      const responseData = await dispatch(
        getAssetsBySpecificEmployeeIdAction(employeeId)
      ).unwrap();
      //   const responseData = await fetchInterceptor(
      //     `/employee/${employeeId}/asset`,
      //     {
      //       method: "GET",
      //     }
      //   );
      // console.log(responseData);
      setAsset(responseData);
    } catch (error) {}
  };

  // const employeeId = localStorage.getItem("employeeId");
  const role = JSON.parse(localStorage.getItem("roles"));

  const getUserProfileData = async () => {
    try {
      const responseData = await dispatch(
        getEmployeeDataByIdAction(employeeId)
      ).unwrap();
      // const responseData = await fetchInterceptor(
      //   `/employee/2`,
      //   {
      //     method: "GET",
      //   }
      // );
      // console.log(responseData);
      setUserProfileData(responseData?.employeeDetail);
    } catch (error) {}
  };
  // console.log(userProfileData);

  const getAllLookupList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
        {
          method: "GET",
        }
      );
      const lookupData = responseData.lookupData;
      setLookupData(lookupData);
    } catch (error) {}
  };

  const designationLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "designation"
  );
  const designationLookupList = designationLookup?.lookups;

  const designationLookupData = designationLookupList?.find(
    (lookup) => lookup?.id === userProfileData?.jobDetail?.designationLookupId
  );

  const designationLabel = designationLookupData
    ? designationLookupData?.label
    : "";

  // console.log(designationLabel);

  const userEmail =
    userProfileData?.contacts &&
    userProfileData?.contacts.find(
      (contact) => contact?.contactType === "personalEmail"
    );

  const userPersonalContact =
    userProfileData?.contacts &&
    userProfileData?.contacts.find(
      (contact) => contact?.contactType === "personalPhone"
    );

  const userAddress =
    userProfileData?.addresses &&
    userProfileData?.addresses.find(
      (address) => address?.addressType === "current"
    );
  // const assetsData = asset.find((assetObject) => assetObject);
  const handleEditProfile = () => {
    navigate(`/employee/${employeeId}`);
  };
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "50%",
          border: "1px solid grey",
          borderRadius: 8,
          marginRight: 16,
        }}
      >
        <h5 style={{ margin: 14, textAlign: "justify" }}>Personal Details</h5>
        <div style={{ borderBottom: "1px solid grey", margin: 16 }}></div>
        <div style={{ display: "flex", margin: 16 }}>
          <span
            style={{ width: "25%", textAlign: "justify", fontWeight: "bold" }}
          >
            Name
          </span>
          <span style={{ textAlign: "justify" }}>
            {userProfileData?.personalDetial?.firstName}{" "}
            {userProfileData?.personalDetial?.lastName}
          </span>
        </div>

        <div style={{ display: "flex", margin: 16 }}>
          <span
            style={{ width: "25%", textAlign: "justify", fontWeight: "bold" }}
          >
            Email
          </span>
          <span style={{ textAlign: "justify" }}>{userEmail?.value}</span>
        </div>

        <div style={{ display: "flex", margin: 16 }}>
          <span
            style={{ width: "25%", textAlign: "justify", fontWeight: "bold" }}
          >
            Personal Contact
          </span>
          <span style={{ textAlign: "justify" }}>
            {userPersonalContact?.value}
          </span>
        </div>

        <div style={{ display: "flex", margin: 16 }}>
          <span
            style={{ width: "27%", textAlign: "justify", fontWeight: "bold" }}
          >
            Address
          </span>
          <span style={{ textAlign: "justify" }}>
            {userAddress?.houseNo}, {userAddress?.area}, {userAddress?.landmark}
            , {userAddress?.district}, {userAddress?.state},{" "}
            {userAddress?.country}, {userAddress?.zipCode}.
          </span>
        </div>

        <div style={{ borderBottom: "1px solid grey", margin: 16 }}></div>
        <h5 style={{ margin: 14, textAlign: "justify" }}>Job Details</h5>
        <div style={{ borderBottom: "1px solid grey", margin: 16 }}></div>

        <div style={{ display: "flex", margin: 16 }}>
          <span
            style={{ width: "25%", textAlign: "justify", fontWeight: "bold" }}
          >
            Mode of Work
          </span>
          <span style={{ textAlign: "justify" }}>
            {userProfileData?.jobDetail?.modeOfWork}
          </span>
        </div>

        <div style={{ display: "flex", margin: 16 }}>
          <span
            style={{ width: "25%", textAlign: "justify", fontWeight: "bold" }}
          >
            Designation
          </span>
          <span style={{ textAlign: "justify" }}>{designationLabel}</span>
        </div>

        <div style={{ borderBottom: "1px solid grey", margin: 16 }}></div>
        <div style={{ borderBottom: "1px solid grey", margin: 16 }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: 80,
            padding: 8,
          }}
        >
          <Button
            style={{ backgroundColor: "rgb(0, 206, 63)", border: "none" }}
            onClick={() => handleEditProfile()}
          >
            Edit
          </Button>
        </div>
      </div>

      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: "40vh",
            border: "1px solid grey",
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <h5 style={{ marginLeft: 24, marginTop: 24, textAlign: "justify" }}>
            Assets
          </h5>
          <div
            style={{
              textAlign: "initial",
              marginLeft: 24,
              marginRight: 24,
              marginBottom: 20,
            }}
          >
            {asset && asset.length > 0 ? (
              <>
                <div style={{ overflow: "auto" }}>
                  <ol
                    className="list-group list-group-numbered"
                    style={{ height: "20vh" }}
                  >
                    {asset &&
                      asset.map((item, i) => {
                        {
                          /* console.log(item); */
                        }
                        return (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-start"
                            key={i}
                          >
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">
                                {item.assetTypeLookupId} {item.companyName}
                              </div>
                              {item.modelName}
                            </div>
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">
                                {"Serial Number"}
                                <br></br>
                              </div>
                              {/* {moment(item.startDate).format("YYYY-MM-DD")} */}
                              {item.serialNumber}
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </>
            ) : (
              "No Asset Allocated"
            )}
          </div>
        </div>
        <div
          style={{
            height: "40vh",
            border: "1px solid grey",
            borderRadius: 8,
          }}
        >
          <h5 style={{ marginLeft: 24, marginTop: 24, textAlign: "justify" }}>
            Project
          </h5>
          <div
            style={{
              textAlign: "initial",
              marginLeft: 24,
              marginRight: 24,
              marginBottom: 20,
            }}
          >
            {project && project.length > 0 ? (
              <>
                <div style={{ overflow: "auto" }}>
                  <ol
                    className="list-group list-group-numbered"
                    style={{ height: "20vh" }}
                  >
                    {project &&
                      project.map((item, i) => {
                        return (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-start"
                            key={i}
                          >
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">{item.projectName}</div>
                              {item.employeeAllocation}
                            </div>
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">
                                {"Start Date"}
                                <br></br>
                              </div>
                              {moment(item.startDate).format("YYYY-MM-DD")}
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </>
            ) : (
              "No Project Allocated"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
