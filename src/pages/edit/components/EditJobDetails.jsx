import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES_PATH } from "../../../helper/Constants";

const EditJobDetails = (props) => {
  const [lookupData, setLookupData] = useState([]);
  const {
    formData = {},
    handleWizardInputChange = () => {},
    isEditableFields = false,
  } = props;

  useEffect(() => {
    getAllLookupList();
  }, []);

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

  const currentJobDetails = formData?.jobDetails;

  const workModeLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "modeOfWork"
  );
  const workModeLookupList = workModeLookup?.lookups;

  const designationLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "designation"
  );
  const designationLookupList = designationLookup?.lookups;

  const employeeRoleLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "userRole"
  );
  const employeeRoleLookupList = employeeRoleLookup?.lookups;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newItem = {
      ...currentJobDetails,
      [name]: value,
    };
    // const newCurrentJobDetails = {
    //   ...formData,
    //   jobDetails: newItem,
    // };
    handleWizardInputChange("jobDetails", newItem);
  };

  const experience = formData?.experience;

  const handleExperienceInputChange = (e, index) => {
    const { name, value } = e.target;
    const newExperience = experience.map((experienceItem, experienceIndex) => {
      if (experienceIndex === index) {
        const newExperienceItem = {
          ...experienceItem,
          [name]: value,
        };
        return newExperienceItem;
      }
      return experienceItem;
    });

    handleWizardInputChange("experience", newExperience);
  };

  const handleAddMore = () => {
    const newExperience = {
      organisationName: "",
      startDate: "",
      endDate: "",
      designationLookupId: "",
    };

    experience.push(newExperience);

    handleWizardInputChange("experience", experience);
  };

  const handleRemove = (index) => {
    const newExperience = [...formData?.experience];
    newExperience.splice(index, 1);
    handleWizardInputChange("experience", newExperience);
  };

  const isoDateString = currentJobDetails?.hiringDate;
  const formattedDate = isoDateString?.split("T")[0];

  const isoDateString1 = currentJobDetails?.joiningDate;
  const formattedDate1 = isoDateString1?.split("T")[0];

  return (
    <div className="row g-3 m-0 p-0 justify-content-center">
      <div className="text-start text-black fw-bold col-md-10">
        Current Job Details
      </div>
      <div className="border-bottom border-bottom-1 col-md-10"></div>
      <div className="col-md-5">
        <label className="form-label personal-label">
          Hiring Date<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          name="hiringDate"
          value={formattedDate || ""}
          className="form-control"
          placeholder="e.g. 24/07/23"
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Joining Date<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          name="joiningDate"
          value={formattedDate1 || ""}
          className="form-control"
          placeholder="e.g. 24/07/23"
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Work Mode<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="modeOfWork"
          className="form-select"
          aria-label=".form-select-lg example"
          required
          value={currentJobDetails?.modeOfWork || ""}
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        >
          <option defaultValue disabled value="">
            Work Mode
          </option>
          {workModeLookupList?.[0] &&
            workModeLookupList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select a valid Work Mode.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Probation Period<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="probationPeriodMonth"
          className="form-control"
          value={currentJobDetails?.probationPeriodMonth || ""}
          placeholder="e.g. 1-6 Months"
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Designation<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="designationLookupId"
          className="form-select"
          value={currentJobDetails?.designationLookupId || ""}
          aria-label=".form-select-lg example"
          required
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        >
          <option defaultValue disabled value="">
            Designation
          </option>
          {designationLookupList?.[0] &&
            designationLookupList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select Designation.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Employee Role<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="userRoleLookupId"
          className="form-select"
          value={formData?.userRoleLookupId || ""}
          aria-label=".form-select-lg example"
          required
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        >
          <option defaultValue disabled value="">
            Employee Role
          </option>
          {employeeRoleLookupList?.[0] &&
            employeeRoleLookupList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select Employee Role.</div>
      </div>

      <div className="col-md-5" style={{ marginRight: 650 }}>
        <label className="form-label personal-label">
          CTC<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="CTC"
          value={currentJobDetails?.CTC || ""}
          className="form-control"
          onChange={(e) => handleInputChange(e)}
          disabled={!isEditableFields}
        />
      </div>

      <div className="text-start text-black fw-bold col-md-10 mt-5 h4">
        Experience Details
      </div>

      {formData?.experience &&
        formData?.experience.map((experienceDetailItem, index) => (
          <div className="row g-3 m-0 p-0 justify-content-center">
            <div className="d-flex justify-content-between col-md-10">
              <div className="col-md-10 text-black fw-bold mt-3 text-center">
                Past Experience Details - {index + 1}
              </div>
              <div>
                <Button
                  className="bg-success text-white m-2"
                  onClick={() => handleRemove(index)}
                  disabled={!isEditableFields}
                >
                  Remove
                </Button>
              </div>
            </div>
            <div className="border-bottom border-bottom-1 col-md-10"></div>

            <div className="col-md-5">
              <label className="form-label personal-label">
                Organisation Name
              </label>
              <input
                type="text"
                name="organisationName"
                className="form-control"
                value={experienceDetailItem?.organisationName || ""}
                placeholder="e.g. xyz pvt Ltd"
                onChange={(e) => handleExperienceInputChange(e, index)}
                disabled={!isEditableFields}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label personal-label">Start Date</label>

              <input
                type="date"
                name="startDate"
                className="form-control"
                value={experienceDetailItem?.startDate.split("T")[0] || ""}
                onChange={(e) => handleExperienceInputChange(e, index)}
                disabled={!isEditableFields}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label personal-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={experienceDetailItem?.endDate.split("T")[0] || ""}
                onChange={(e) => handleExperienceInputChange(e, index)}
                disabled={!isEditableFields}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label personal-label">Designation</label>
              <select
                name="designationLookupId"
                className="form-select"
                value={experienceDetailItem?.designationLookupId || ""}
                aria-label=".form-select-lg example"
                onChange={(e) => handleExperienceInputChange(e, index)}
                disabled={!isEditableFields}
              >
                <option defaultValue disabled value="">
                  Designation
                </option>
                {designationLookupList?.[0] &&
                  designationLookupList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
              <div className="invalid-feedback">Please select Designation.</div>
            </div>
          </div>
        ))}

      <div className="text-start col-md-10 m-5">
        <Button
          className="bg-success text-white"
          onClick={() => handleAddMore()}
        >
          Add More
        </Button>
      </div>
    </div>
  );
};

export default EditJobDetails;
