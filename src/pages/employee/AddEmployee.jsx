import React, { useState } from "react";
import { Button } from "react-bootstrap";
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
  const [sameAsAbove, setSameAsAbove] = useState(false);

  // Initialize form data for each wizardIndex
  const [employeeData, setEmployeeData] = useState({
    personalDetails: {
      label: "",
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
          id: 1,
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
          id: 6,
          notes: "",
          skillType: 0,
          skillName: 0,
          skillLevel: 0,
          skillExperienceYear: 0,
        },
      ],
      hobbiesRecord: [
        {
          id: 1,
          hobbiesType: 9,
          hobbiesName: 0,
        },
      ],
    },
    bankDetails: {
      currentJobDetail: {
        id: 6,
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
          id: 1,
          organisationName: "",
          startDate: "",
          endDate: "",
          designationLookupId: 15,
        },
      ],
    },
  });

  const handleNext = () => {
    setWizardIndex(wizardIndex + 1);
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

  const WizardComponent = wizardData?.[wizardIndex]?.component;
  console.log(employeeData);
  return (
    <div>
      <div className="d-flex flex-direction-row justify-content-center">
        {wizardData.map((item, index) => (
          <label onClick={() => handleWizardChange(index)} className="m-3">
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
              // disabled={wizardIndex===0}
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
