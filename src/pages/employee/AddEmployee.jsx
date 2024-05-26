import Cookies from "js-cookie";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES_PATH } from "../../helper/Constants";
import BankDetailsAndDocuments from "./components/BankDetailsAndDocuments";
import ContactInfo from "./components/ContactInfo";
import EmployeePersonalDetails from "./components/EmployeePersonalDetails";
import JobDetails from "./components/JobDetails";
import SkillInfo from "./components/SkillInfo";

const wizardData = [
  {
    key: 0,
    title: "Personal Details",
    component: EmployeePersonalDetails,
  },
  {
    key: 1,
    title: "Contact Details",
    component: ContactInfo,
  },
  {
    key: 2,
    title: "Job Details",
    component: JobDetails,
  },
  {
    key: 3,
    title: "Skills",
    component: SkillInfo,
  },
  {
    key: 4,
    title: "Bank Details & Documents",
    component: BankDetailsAndDocuments,
  },
];

const AddEmployee = () => {
  const [wizardIndex, setWizardIndex] = useState(0);

  // Initialize form data for each wizardIndex
  const [employeeData, setEmployeeData] = useState({
    employeeId: null,
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

    contactInfo: {
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
    },
    jobDetails: {
      currentJobDetail: {
        // id: 6,
        hiringDate: "",
        joiningDate: "",
        modeOfWork: "",
        probationPeriodMonth: 6,
        userRoleLookupId: 2,
        CTC: "",
        designationLookupId: 5,
      },
      experience: [
        {
          // id: 1,
          organisationName: "",
          startDate: "",
          endDate: "",
          designationLookupId: 15,
        },
      ],
    },
    skillInfo: {
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
          hobbiesType: 9,
          hobbiesName: 0,
        },
      ],
    },
    bankDetails: {
      id: 1,
      bankName: "",
      branchName: "",
      ifscCode: "",
      micrCode: "",
      accountNumber: "",
      isActive: true,
    },
  });

  const handleNext = async () => {
    try {
      if (wizardIndex === 0) {
        if (employeeData?.employeeId === null) {
          const personalDetailsResponse =
            await handleAddEmployeePersonalDetails();
          console.log(personalDetailsResponse);
          const employeeId =
            personalDetailsResponse?.employeeDetail?.employeeId;
          setEmployeeData({
            ...employeeData,
            employeeId: employeeId,
          });
        } else {
          const personalDetailsResponse =
            await handleUpdateEmployeePersonalDetails();
          console.log(personalDetailsResponse);
        }
      } else if (wizardIndex === 1) {
        const contactInfoResponse = await handleUpdateAddEmployeeContactInfo();
        console.log(contactInfoResponse);
      } else if (wizardIndex === 2) {
        const jobDetailsResponse = await handleUpdateAddEmployeeJobDetails();
        console.log(jobDetailsResponse);
      } else if (wizardIndex === 3) {
        const skillInfoResponse = await handleUpdateAddEmployeeSkillInfo();
        console.log(skillInfoResponse);
      } else if (wizardIndex === 4) {
        const bankDetailsResponse = await handleUpdateAddEmployeeBankDetails();
        console.log(bankDetailsResponse);
        return
      }
      
      if (wizardIndex !== 4) {
        setWizardIndex(wizardIndex + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevious = () => {
    setWizardIndex(wizardIndex - 1);
  };

  const handleWizardChange = (index) => {
    setWizardIndex(index);
  };

  const handleWizardInputChange = (wizardComponentKey, value) => {
    setEmployeeData((employeeData) => ({
      ...employeeData,
      [wizardComponentKey]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", employeeData);
    setEmployeeData({
      personalDetails: {},
      contactInfo: {},
      jobDetails: {},
      skillInfo: {},
      bankDetails: {},
    });
    setWizardIndex(1);
  };

  const handleAddEmployeePersonalDetails = async () => {
    const response = await fetch(API_ROUTES_PATH?.EMPLOYEE_PERSONAL_DETAILS, {
      method: "POST",
      body: JSON.stringify(employeeData?.personalDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const responseData = await response.json();
    return responseData;
  };

  const handleUpdateEmployeePersonalDetails = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/personal`,
      {
        method: "PUT",
        body: JSON.stringify(employeeData?.personalDetails),
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
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/contact`,
      {
        method: "PUT",
        body: JSON.stringify(employeeData?.contactInfo),
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
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/job`,
      {
        method: "PUT",
        body: JSON.stringify(employeeData?.jobDetails),
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
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/skill`,
      {
        method: "PUT",
        body: JSON.stringify(employeeData?.skillInfo),
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
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/bank`,
      {
        method: "PUT",
        body: JSON.stringify(employeeData?.bankDetails),
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
  console.log(employeeData);
  return (
    <div>
      <div className="d-flex flex-direction-row justify-content-center">
        {wizardData.map((item, index) => (
          <label
            // onClick={() => handleWizardChange(index)}
            className="m-3 fw-bold h5"
            style={{ color: index === wizardIndex ? "#00ce3f" : "black" }}
          >
            {item.title}
          </label>
        ))}
      </div>
      <div>
        <WizardComponent
          formData={employeeData}
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
          <div>
            <Button
              className="bg-success text-white"
              onClick={() => handleNext()}
            >
              Save & Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
