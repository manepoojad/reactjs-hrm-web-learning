import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BankDetailsAndDocuments from "./components/BankDetailsAndDocuments";
import ContactInfo from "./components/ContactInfo";
import EmployeePersonalDetails from "./components/EmployeePersonalDetails";
import JobDetails from "./components/JobDetails";
import SkillInfo from "./components/SkillInfo";

import fetchInterceptor from "../../helper/fetchInterceptor";

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
  const navigate = useNavigate();
  const [wizardIndex, setWizardIndex] = useState(0);
  const [isError, setIsError] = useState(false);

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
        probationPeriodMonth: 0,
        userRoleLookupId: 0,
        CTC: "",
        designationLookupId: 0,
      },
      experience: [
        {
          // id: 1,
          organisationName: "",
          startDate: "",
          endDate: "",
          designationLookupId: 0,
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
      // id: 1,
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
          if (!employeeData?.personalDetails?.firstName) {
            setIsError(true);
          } else {
            setIsError(false);
            const personalDetailsResponse =
              await handleAddEmployeePersonalDetails();
            const employeeId =
              personalDetailsResponse?.employeeDetail?.employeeId;
            setEmployeeData({
              ...employeeData,
              employeeId: employeeId,
            });
          }
        } else {
          const personalDetailsResponse =
            await handleUpdateEmployeePersonalDetails();
        }
      } else if (wizardIndex === 1) {
        const contactInfoResponse = await handleUpdateAddEmployeeContactInfo();
      } else if (wizardIndex === 2) {
        const jobDetailsResponse = await handleUpdateAddEmployeeJobDetails();
      } else if (wizardIndex === 3) {
        const skillInfoResponse = await handleUpdateAddEmployeeSkillInfo();
      } else if (wizardIndex === 4) {
        const bankDetailsResponse = await handleUpdateAddEmployeeBankDetails();
        navigate("/employeeList");
        return;
      }

      if (wizardIndex !== 4) {
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
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/personal`,
      {
        method: "POST",
        body: employeeData?.personalDetails,
      }
    );

    return responseData;
    // const response = await fetch(API_ROUTES_PATH?.EMPLOYEE_PERSONAL_DETAILS, {
    //   method: "POST",
    //   body: JSON.stringify(employeeData?.personalDetails),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!response.ok) {
    //   throw new Error("Response not ok");
    // }
    // const responseData = await response.json();
    // return responseData;
  };

  const handleUpdateEmployeePersonalDetails = async () => {
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/personal`,
      {
        method: "PUT",
        body: employeeData?.personalDetails,
      }
    );

    return responseData;
    // const jwtToken = Cookies.get("jwtToken");
    // const url = `http://localhost:8888/api/employee/${employeeData?.employeeId}/personal`;
    // const options = {
    //   method: "PUT",
    //   body: JSON.stringify(employeeData?.personalDetails),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `${jwtToken}`,
    //   },
    // };

    // const response = await fetch(url, options);

    // if (!response.ok) {
    //   throw new Error("Response not ok");
    // }
    // const responseData = await response.json();
    // return responseData;
  };

  const handleUpdateAddEmployeeContactInfo = async () => {
    // const jwtToken = Cookies.get("jwtToken");
    const payload = {
      contacts: employeeData?.contactInfo?.contacts,
      addresses: employeeData?.contactInfo?.addresses,
    };
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/contact`,
      {
        method: "PUT",
        body: payload,
      }
    );

    return responseData;
    // const response = await fetch(
    //   `http://localhost:8888/api/employee/${employeeData?.employeeId}/contact`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `${jwtToken}`,
    //     },
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Response not ok");
    // }
    // const responseData = await response.json();
    // return responseData;
  };

  const handleUpdateAddEmployeeJobDetails = async () => {
    // const jwtToken = Cookies.get("jwtToken");
    const payload = {
      currentJobDetail: employeeData?.jobDetails?.currentJobDetail,
      experience: employeeData?.jobDetails?.experience,
    };
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/job`,
      {
        method: "PUT",
        body: payload,
      }
    );

    return responseData;
    // const response = await fetch(
    //   `http://localhost:8888/api/employee/${employeeData?.employeeId}/job`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `${jwtToken}`,
    //     },
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Response not ok");
    // }
    // const responseData = await response.json();
    // return responseData;
  };

  const handleUpdateAddEmployeeSkillInfo = async () => {
    // const jwtToken = Cookies.get("jwtToken");
    const payload = {
      skills: employeeData?.skillInfo?.skills,
      hobbiesRecord: employeeData?.skillInfo?.hobbiesRecord,
    };
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/skill`,
      {
        method: "PUT",
        body: payload,
      }
    );

    return responseData;
    // const response = await fetch(
    //   `http://localhost:8888/api/employee/${employeeData?.employeeId}/skill`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(payload),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `${jwtToken}`,
    //     },
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Response not ok");
    // }
    // const responseData = await response.json();
    // return responseData;
  };

  const handleUpdateAddEmployeeBankDetails = async () => {
    // const jwtToken = Cookies.get("jwtToken");
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${employeeData?.employeeId}/bank`,
      {
        method: "PUT",
        body: employeeData?.bankDetails,
      }
    );

    return responseData;
    // const response = await fetch(
    //   `http://localhost:8888/api/employee/${employeeData?.employeeId}/bank`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(employeeData?.bankDetails),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `${jwtToken}`,
    //     },
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Response not ok");
    // }
    // const responseData = await response.json();
    // return responseData;
  };

  const WizardComponent = wizardData?.[wizardIndex]?.component;
  return (
    <div>
      <div className="d-flex flex-direction-row justify-content-center">
        {wizardData.map((item, index) => (
          <label
            key={index}
            onClick={() => handleWizardChange(index)}
            role="button"
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
          isError={isError}
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
                onClick={() => handleNext()}
              >
                Submit
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

export default AddEmployee;
