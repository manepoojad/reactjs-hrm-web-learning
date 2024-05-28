import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditBankDetailsAndDocuments from "../edit/components/EditBankDetailsAndDocuments";
import EditContactInfo from "../edit/components/EditContactInfo";
import EditEmployeePersonalDetails from "../edit/components/EditEmployeePersonalDetails";
import EditJobDetails from "../edit/components/EditJobDetails";
import EditSkillInfo from "../edit/components/EditSkillInfo";

const wizardData = [
  {
    key: 0,
    title: "Personal Details",
    component: EditEmployeePersonalDetails,
  },
  {
    key: 1,
    title: "Contact Details",
    component: EditContactInfo,
  },
  {
    key: 2,
    title: "Job Details",
    component: EditJobDetails,
  },
  {
    key: 3,
    title: "Skills",
    component: EditSkillInfo,
  },
  {
    key: 4,
    title: "Bank Details & Documents",
    component: EditBankDetailsAndDocuments,
  },
];

const EditEmployee = () => {
  const params = useParams();
  const [wizardIndex, setWizardIndex] = useState(0);

  // Initialize form data for each wizardIndex
  const [editEmployeeData, setEditEmployeeData] = useState({
    employeeId: params.id,
    userRoleLookupId: null,
    personalDetails: {
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      maidenName: "",
      gender: "",
      dob: "",
      bloodGroup: "",
      marriedStatus: "",
      pan: "",
      aadhar: "",
    },

    contacts: [
      {
        contactType: "personalEmail",
        value: "",
      },
      {
        contactType: "personalPhone",
        value: "",
      },
      {
        contactType: "emergencyPhone",
        value: "",
      },
      {
        contactType: "emergencyPhone",
        value: "",
      },
    ],
    addresses: [
      {
        // id: 1,
        addressType: "current",
        country: "",
        zipCode: "",
        state: "",
        district: "",
        taluka: "",
        villageCity: "",
        street: "",
        landmark: "",
        area: "",
        houseNo: "",
      },
      {
        // id: 1,
        addressType: "permanant",
        country: "",
        zipCode: "",
        state: "",
        district: "",
        taluka: "",
        villageCity: "",
        street: "",
        landmark: "",
        area: "",
        houseNo: "",
      },
    ],
    jobDetails: {
      // id: 6,
      hiringDate: "",
      joiningDate: "",
      modeOfWork: "",
      probationPeriodMonth: null,
      userRoleLookupId: null,
      CTC: "",
      designationLookupId: null,
    },
    experience: [
      {
        // id: 1,
        organisationName: "",
        startDate: "",
        endDate: "",
        designationLookupId: null,
      },
    ],
    skills: [
      {
        // id: 6,
        notes: "",
        skillType: 0,
        skillName: 0,
        skillLevel: 0,
        skillExperienceYear: 0,
      },
    ],
    hobbiesRecord: [
      {
        // id: 1,
        hobbiesType: null,
        hobbiesName: 0,
      },
    ],
    bankDetails: [
      {
        id: 1,
        bankName: "",
        branchName: "",
        ifscCode: "",
        micrCode: "",
        accountNumber: "",
        isActive: true,
      },
    ],
  });

  useEffect(() => {
    getSpecificEmployeeDetails();
  }, []);

  const getSpecificEmployeeDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/employee/${params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Response not ok. ");
      }
      const responseData = await response.json();

      const newEditEmployeeData = {
        userRoleLookupId: responseData?.employeeDetail?.user?.userRoleLookupId,
        employeeId: responseData?.employeeDetail?.employeeId,
        personalDetails: responseData?.employeeDetail?.personalDetial,
        contacts: responseData?.employeeDetail?.contacts,
        addresses: responseData?.employeeDetail?.addresses,
        jobDetails: responseData?.employeeDetail?.jobDetail,
        experience: responseData?.employeeDetail?.experiences,
        skills: responseData?.employeeDetail?.skills,
        hobbiesRecord: responseData?.employeeDetail?.hobbiesRecords,
        bankDetails: responseData?.employeeDetail?.bankdetails,
      };

      setEditEmployeeData(newEditEmployeeData);
    } catch (error) {}
  };
  console.log("editEmployeeData", editEmployeeData);

  const handleNext = async () => {
    try {
      if (wizardIndex === 0) {
        const personalDetailsResponse =
          await handleUpdateEmployeePersonalDetails();
      } else if (wizardIndex === 1) {
        const contactInfoResponse = await handleUpdateAddEmployeeContactInfo();
      } else if (wizardIndex === 2) {
        const jobDetailsResponse = await handleUpdateAddEmployeeJobDetails();
      } else if (wizardIndex === 3) {
        const skillInfoResponse = await handleUpdateAddEmployeeSkillInfo();
      } else if (wizardIndex === 4) {
        const bankDetailsResponse = await handleUpdateAddEmployeeBankDetails();
        return;
      }

      if (wizardData.length - 1 > wizardIndex) {
        setWizardIndex(wizardIndex + 1);
      }
    } catch (error) {}
  };

  const handlePrevious = () => {
    setWizardIndex(wizardIndex - 1);
  };

  const handleWizardChange = (index) => {
    setWizardIndex(index);
  };

  const handleWizardInputChange = (wizardComponentKey, value) => {
    setEditEmployeeData((editEmployeeData) => ({
      ...editEmployeeData,
      [wizardComponentKey]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(e)
    setEditEmployeeData({
      personalDetails: {},
      contactInfo: {},
      jobDetails: {},
      skillInfo: {},
      bankDetails: {},
    });
    setWizardIndex(1);
  };

  const handleUpdateEmployeePersonalDetails = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/personal`,
      {
        method: "PUT",
        body: JSON.stringify(editEmployeeData?.personalDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const responseData = await response.json();
    return responseData;
  };

  const handleUpdateAddEmployeeContactInfo = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/contact`,
      {
        method: "PUT",
        body: JSON.stringify(editEmployeeData?.contactInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const responseData = await response.json();
    return responseData;
  };

  const handleUpdateAddEmployeeJobDetails = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/job`,
      {
        method: "PUT",
        body: JSON.stringify(editEmployeeData?.jobDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const responseData = await response.json();
    return responseData;
  };

  const handleUpdateAddEmployeeSkillInfo = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/skill`,
      {
        method: "PUT",
        body: JSON.stringify(editEmployeeData?.skills),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const responseData = await response.json();
    return responseData;
  };

  const handleUpdateAddEmployeeBankDetails = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/bank`,
      {
        method: "PUT",
        body: JSON.stringify(editEmployeeData?.bankDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const responseData = await response.json();
    return responseData;
  };

  const WizardComponent = wizardData?.[wizardIndex]?.component;
  return (
    <div>
      <div className="d-flex flex-direction-row justify-content-center">
        {wizardData.map((item, index) => (
          <label
            key={index}
            onClick={() => handleWizardChange(index)}
            className="m-3 fw-bold h5"
            role="button"
            style={{ color: index === wizardIndex ? "#00ce3f" : "black" }}
          >
            {item.title}
          </label>
        ))}
      </div>
      <div>
        <WizardComponent
          formData={editEmployeeData}
          handleWizardInputChange={handleWizardInputChange}
        />
        <div className="d-flex justify-content-between" style={{ margin: 8 }}>
          <div>
            <Button
              className="bg-success text-white"
              onClick={() => handlePrevious()}
              style={{ display: wizardIndex === 0 && "none" }}
            >
              Back
            </Button>
          </div>

          {wizardIndex === wizardData.length - 1 ? (
            <div>
              <Button
                type="button"
                className="bg-success text-white"
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="button"
                className="bg-success text-white"
                onClick={() => handleNext()}
              >
                Save & Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
