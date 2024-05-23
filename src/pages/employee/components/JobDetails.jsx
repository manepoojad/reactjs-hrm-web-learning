import React, { useEffect, useState } from "react";
import { API_ROUTES_PATH } from "../../../helper/Constants";

const JobDetails = (props) => {
  const [lookupData, setLookupData] = useState([]);
  const { formData = {}, handleWizardInputChange = () => {} } = props;

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
    } catch (error) {
      console.log(error);
    }
  };

  const currentJobDetails = formData?.jobDetails?.currentJobDetail;

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
    const newCurrentJobDetails = {
      ...formData?.jobDetails,
      currentJobDetail: newItem,
    };
    handleWizardInputChange("jobDetails", newCurrentJobDetails);
  };

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
          value={currentJobDetails?.hiringDate || ""}
          className="form-control"
          placeholder="e.g. 24/07/23"
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Joining Date<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          name="joiningDate"
          value={currentJobDetails?.joiningDate || ""}
          className="form-control"
          placeholder="e.g. 24/07/23"
          onChange={(e) => handleInputChange(e)}
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
        >
          <option defaultValue disabled value="">
            Work Mode
          </option>
          {workModeLookupList?.[0] &&
            workModeLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
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
        >
          <option defaultValue disabled value="">
            Designation
          </option>
          {designationLookupList?.[0] &&
            designationLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
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
          value={currentJobDetails?.userRoleLookupId || ""}
          aria-label=".form-select-lg example"
          required
          onChange={(e) => handleInputChange(e)}
        >
          <option defaultValue disabled value="">
            Employee Role
          </option>
          {employeeRoleLookupList?.[0] &&
            employeeRoleLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
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
        />
      </div>

      <div className="text-start text-black fw-bold col-md-10">
        Experience Details
      </div>

      <div>Past Experience</div>
      <div className="border-bottom border-bottom-1 col-md-10"></div>
    </div>
  );
};

export default JobDetails;
