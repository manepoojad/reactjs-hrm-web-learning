import React, { useEffect, useState } from "react";
import { API_ROUTES_PATH } from "../../../helper/Constants";

const EmployeePersonalDetails = (props) => {
  const [lookupData, setLookupData] = useState([]);
  const { formData = {}, handleWizardInputChange = () => {} } = props;
  const personalDetails = formData?.personalDetails || {};

  const titleLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "title"
  );
  const titleLookupList = titleLookup?.lookups;

  const genderLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "gender"
  );
  const genderLookupList = genderLookup?.lookups;

  const bloodGroupLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "bloodGroup"
  );
  const bloodGroupLookupList = bloodGroupLookup?.lookups;

  const marriedStatusLookup = lookupData?.find(
    (lookup) => lookup?.lookupType === "marriedStatus"
  );
  const marriedStatusLookupList = marriedStatusLookup?.lookups;

  useEffect(() => {
    getAllLookupList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newPersonalDetails = {
      ...personalDetails,
      [name]: value,
    };

    handleWizardInputChange("personalDetails", newPersonalDetails);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEmployeePersonalDetails = async () => {
    try {
      const response = await fetch(API_ROUTES_PATH.EMPLOYEE_PERSONAL_DETAILS, {
        method: "POST",
        body: JSON.stringify(formData?.personalDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      const responseData = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row g-3 m-0 p-0">
      {/* <input
        label="First Name"
        placeholder="e.g. John"
        name="firstName"
        value={personalDetails?.firstName || ""}
        onChange={handleInputChange}
      /> */}
      <div className="col-md-2">
        <label htmlFor="title" className="form-label personal-label">
          Title<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="title"
          className="form-select"
          aria-label=".form-select-lg example"
          value={personalDetails?.title || ""}
          onChange={handleInputChange}
          required
        >
          <option defaultValue disabled value="">
            Title
          </option>
          {titleLookupList?.[0] &&
            titleLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select a valid Title.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          First Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          placeholder="e.g. Pooja"
          value={personalDetails?.firstName || ""}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Please Enter First Name.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Middle Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="middleName"
          className="form-control"
          placeholder="e.g. Devidas"
          value={personalDetails?.middleName || ""}
          onChange={handleInputChange}
        />
        <div className="invalid-feedback">Please Enter Middle Name.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Last Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          placeholder="e.g. Mane"
          value={personalDetails?.lastName || ""}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Please Enter Last Name.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Maiden Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="maidenName"
          className="form-control"
          placeholder="e.g. Mane"
          value={personalDetails?.maidenName || ""}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Please Enter Maiden Name.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Gender<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="gender"
          className="form-select"
          aria-label=".form-select-lg example"
          value={personalDetails?.gender || ""}
          onChange={handleInputChange}
          required
        >
          <option defaultValue disabled value="">
            Gender
          </option>
          {genderLookupList?.[0] &&
            genderLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select a valid Gender.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Date Of Birth<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          name="dob"
          className="form-control"
          value={personalDetails?.dob || ""}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Please Enter Date of Birth.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Blood Group<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="bloodGroup"
          className="form-select"
          aria-label=".form-select-lg example"
          value={personalDetails?.bloodGroup || ""}
          onChange={handleInputChange}
          required
        >
          <option defaultValue disabled value="">
            Blood Group
          </option>
          {genderLookupList?.[0] &&
            genderLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">
          Please select a valid Blood Group.
        </div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Married Status<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="marriedStatus"
          className="form-select"
          aria-label=".form-select-lg example"
          value={personalDetails?.marriedStatus || ""}
          onChange={handleInputChange}
          required
        >
          <option defaultValue disabled value="">
            Married Status
          </option>
          {marriedStatusLookupList?.[0] &&
            marriedStatusLookupList.map((item, index) => {
              return (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">
          Please select a valid Married Status.
        </div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          PAN No.<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="pan"
          className="form-control"
          placeholder="e.g. ABC123"
          value={personalDetails?.pan || ""}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Please Enter PAN No.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Adhar No.<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="aadhar"
          className="form-control"
          placeholder="e.g. 111222333"
          value={personalDetails?.aadhar || ""}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">Please Enter Adhar No.</div>
      </div>
    </div>
  );
};

export default EmployeePersonalDetails;
