import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [wizardIndex, setWizardIndex] = useState(0);
  const [isEditableFields, setIsEditableFields] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

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
        contactType: "officialEmail",
        value: "",
      },
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
        designationLookupId: 0,
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
        hobbiesType: 9,
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

  const [employeeDataValidationError, setEmployeeDataValidationError] =
    useState({
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

      handleDataMapping(responseData);
    } catch (error) {}
  };

  const handleDataMapping = (responseData) => {
    /**
     * @description
     *
     */
    const contactTypeList = [
      "officialEmail",
      "personalEmail",
      "personalPhone",
      "emergencyPhone",
      "emergencyPhone",
    ];
    const contactMapped = [];

    responseData?.employeeDetail?.contacts?.forEach((contactItem) => {
      const contactTypeListItemIndex = contactTypeList.findIndex(
        (contactType) => contactType == contactItem.contactType
      );

      if (contactTypeListItemIndex !== -1) {
        contactTypeList.splice(contactTypeListItemIndex, 1);
      }

      contactMapped.push(contactItem);
    });

    contactTypeList.forEach((contactType) => {
      const newContactItem = {
        contactType: contactType,
        value: "",
        tempId: Math.random(),
      };
      contactMapped.push(newContactItem);
    });

    const newEditEmployeeData = {
      userRoleLookupId: responseData?.employeeDetail?.user?.userRoleLookupId,
      employeeId: responseData?.employeeDetail?.employeeId,
      personalDetails: responseData?.employeeDetail?.personalDetial,
      contacts: contactMapped,
      addresses: responseData?.employeeDetail?.addresses,
      jobDetails: responseData?.employeeDetail?.jobDetail,
      experience: responseData?.employeeDetail?.experiences,
      skills: responseData?.employeeDetail?.skills,
      hobbiesRecord: responseData?.employeeDetail?.hobbiesRecords,
      bankDetails: responseData?.employeeDetail?.bankdetails,
    };

    setEditEmployeeData(newEditEmployeeData);
  };

  const handleNext = async () => {
    try {
      if (wizardIndex === 0) {
        const isValidPersonalDetail = handlePersonalDetailValidation();
        if (isValidPersonalDetail) {
          const personalDetailsResponse =
            await handleUpdateEmployeePersonalDetails();
          handleDataMapping(personalDetailsResponse);
        }
      } else if (wizardIndex === 1) {
        const contactInfoResponse = await handleUpdateAddEmployeeContactInfo();
        handleDataMapping(contactInfoResponse);
      } else if (wizardIndex === 2) {
        const jobDetailsResponse = await handleUpdateAddEmployeeJobDetails();
        handleDataMapping(jobDetailsResponse);
      } else if (wizardIndex === 3) {
        const skillInfoResponse = await handleUpdateAddEmployeeSkillInfo();
        handleDataMapping(skillInfoResponse);
      } else if (wizardIndex === 4) {
        const bankDetailsResponse = await handleUpdateAddEmployeeBankDetails();
        navigate("/employeeList");
        return;
      }

      // if (wizardData.length - 1 > wizardIndex) {
      //   setWizardIndex(wizardIndex + 1);
      // }
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

    if (wizardComponentKey === "personalDetails") {
      handlePersonalDetailValidation(value);
    }
  };

  const handleSubmit = (e) => {
    console.log(e);
    setEditEmployeeData({
      personalDetails: {},
      contactInfo: {},
      jobDetails: {},
      skillInfo: {},
      bankDetails: {},
    });
    setWizardIndex(1);
  };

  const handlePersonalDetailValidation = (
    personalDetails = editEmployeeData.personalDetails
  ) => {
    let isValid = true;
    const newEmployeeDataValidationError = {
      ...employeeDataValidationError,
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
    };

    //  firstName validation
    const firstName = personalDetails?.firstName;
    if (firstName.length === 0) {
      newEmployeeDataValidationError.personalDetails.firstName =
        "Please enter First Name.";
      isValid = false;
    } else if (firstName.length < 3) {
      newEmployeeDataValidationError.personalDetails.firstName =
        "First Name should be at least 3 character.";
      isValid = false;
    }

    if (!isValid) {
      setIsShowError(true);
    }
    setEmployeeDataValidationError(newEmployeeDataValidationError);
    return isValid;
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

    const payload = {
      contacts: editEmployeeData.contacts,
      addresses: editEmployeeData.addresses,
    };
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/contact`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
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
    const payload = {
      currentJobDetail: editEmployeeData?.jobDetails,
      experience: editEmployeeData?.experience,
    };
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/job`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
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
    const payload = {
      skills: editEmployeeData?.skills,
      hobbiesRecord: editEmployeeData?.hobbiesRecord,
    };
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/skill`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
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
    console.log(responseData);
    return responseData;
  };

  const handleUpdateAddEmployeeBankDetails = async () => {
    const token = Cookies.get("token");
    const response = await fetch(
      `http://localhost:8888/api/employee/${editEmployeeData?.employeeId}/bank`,
      {
        method: "PUT",
        body: JSON.stringify(editEmployeeData?.bankDetails?.[0]),
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
      <div className="col-md-1">
        <button
          className="btn btn-outline-success btn-md mx-2"
          title="Edit Employee Details"
          onClick={() => {
            setIsEditableFields(!isEditableFields);
          }}
          style={{ border: "none" }}
        >
          <i className="bi bi-pen"></i>
        </button>
      </div>
      <div>
        <WizardComponent
          formData={editEmployeeData}
          formValidationError={employeeDataValidationError}
          handleWizardInputChange={handleWizardInputChange}
          isEditableFields={isEditableFields}
          isShowError={isShowError}
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

          {wizardIndex < wizardData.length - 1 ? (
            <>
              {/* all tab except last */}
              {isEditableFields ? (
                <div>
                  <Button
                    type="button"
                    className="bg-success text-white"
                    onClick={() => handleNext()}
                  >
                    Save & Next
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    type="button"
                    className="bg-success text-white"
                    onClick={() => setWizardIndex(wizardIndex + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* last tab */}
              {isEditableFields ? (
                <div>
                  <Button
                    type="button"
                    className="bg-success text-white"
                    onClick={() => handleNext()}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    type="button"
                    className="bg-success text-white"
                    onClick={() => {
                      navigate("/employeeList");
                    }}
                  >
                    Go to List
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
