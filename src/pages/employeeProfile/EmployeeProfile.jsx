import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";

const EmployeeProfile = () => {
  const [userProfileData, setUserProfileData] = useState({});
  const [lookupData, setLookupData] = useState([]);
  useEffect(() => {
    getUserProfileData();
    getAllLookupList();
  }, []);

  const getUserProfileData = async () => {
    try {
      const responseData = await fetchInterceptor(
        `/employee/2`,
        {
          method: "GET",
        }
      );
      console.log(responseData);
      setUserProfileData(responseData?.employeeDetail);
    } catch (error) {}
  };

  const getAllLookupList = async () => {
    try {
      const response = await fetch(API_ROUTES_PATH.GET_ALL_LOOKUP_LIST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not ok. ");
      }
      const responseData = await response.json();
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

  console.log(designationLabel);

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
            margin: 24,
            padding: 8,
          }}
        >
          <Button
            style={{ backgroundColor: "rgb(0, 206, 63)", border: "none" }}
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
          <div style={{ textAlign: "initial", marginLeft: 24 }}>
            No Project Allocated
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
          <div style={{ textAlign: "initial", marginLeft: 24 }}>
            No Project Allocated
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
