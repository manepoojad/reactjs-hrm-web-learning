import React, { useState } from "react";

const EditContactInfo = (props) => {
  const {
    formData = {},
    handleWizardInputChange = () => {},
    formValidationError = {},
    isShowError = false,
    isEditableFields = false,
  } = props;

  const contacts = formData?.contacts || [];
  const contactsError = formValidationError?.contacts || [];
  const addressesError = formValidationError?.addresses || [];

  const personalEmailObject = contacts?.find(
    (contactItem) => contactItem?.contactType === "personalEmail"
  );
  const personalEmailErrorObject = contactsError?.find(
    (contactItem) => contactItem?.contactType === "personalEmail"
  );

  const personalContactObject = contacts?.find(
    (contactItem) => contactItem?.contactType === "personalPhone"
  );
  const personalContactErrorObject = contactsError?.find(
    (contactItem) => contactItem?.contactType === "personalPhone"
  );

  const emergencyContact = contacts?.filter(
    (contactItem) => contactItem?.contactType === "emergencyPhone"
  );
  const emergencyErrorContact = contactsError?.filter(
    (contactItem) => contactItem?.contactType === "emergencyPhone"
  );

  const personalEmergencyContactObject1 = emergencyContact?.[0];
  const personalEmergencyContactObject2 = emergencyContact?.[1];

  const personalEmergencyErrorContactObject1 = emergencyErrorContact?.[0];
  const personalEmergencyErrorContactObject2 = emergencyErrorContact?.[1];

  const address = formData?.addresses;

  const permanentAddress = address?.find(
    (address) => address?.addressType === "permanant"
  );

  const permanentAddressError = addressesError?.find(
    (address) => address?.addressType === "permanant"
  );

  const currentAddress = address?.find(
    (address) => address?.addressType === "current"
  );

  const currentAddressError = addressesError?.find(
    (address) => address?.addressType === "current"
  );

  const [sameAsAbove, setSameAsAbove] = useState(false);

  const handleInputContactChange = (e, contactId, tempId) => {
    const { name, value } = e.target;
    const newContacts = contacts?.map((item) => {
      if (
        (item.contactType === name && item?.id === contactId) ||
        (tempId && item?.tempId === tempId)
      ) {
        const newItem = {
          ...item,
          value: value,
        };
        return newItem;
      }
      return item;
    });

    handleWizardInputChange("contacts", newContacts);
  };

  const handleInputChange = (e, addressType) => {
    const { name, value } = e.target;
    let newAddresses = address?.map((addressItem) => {
      if (addressItem.addressType === addressType || sameAsAbove) {
        return {
          ...addressItem,
          [name]: value,
        };
      }

      return addressItem;
    });

    handleWizardInputChange("addresses", newAddresses);
  };

  const handleSameAsAboveChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsAbove(isChecked);
    if (isChecked) {
      const renderSameAsAddress = [
        {
          ...permanentAddress,
          addressType: "current",
        },
        {
          ...permanentAddress,
        },
      ];

      handleWizardInputChange("addresses", renderSameAsAddress);
    }
  };

  return (
    <div className="row g-3 m-0 p-0 justify-content-center">
      <div className="row g-3 m-0 p-0 justify-content-center">
        <div className="col-md-5">
          <label className="form-label personal-label">
            Personal Email ID<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="personalEmail"
            className={`form-control ${
              isShowError && personalEmailErrorObject?.value ? "is-invalid" : ""
            }`}
            placeholder="e.g. pooja@gmail.com"
            value={personalEmailObject?.value || ""}
            onChange={(e) =>
              handleInputContactChange(
                e,
                personalEmailObject?.id,
                personalEmailObject?.tempId
              )
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalEmailErrorObject && (
            <div className="invalid-feedback">
              {personalEmailErrorObject?.value}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Personal Contact<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="personalPhone"
            className={`form-control ${
              isShowError && personalContactErrorObject?.value
                ? "is-invalid"
                : ""
            }`}
            placeholder="e.g. 8080942232"
            value={personalContactObject?.value || ""}
            onChange={(e) =>
              handleInputContactChange(
                e,
                personalContactObject?.id,
                personalContactObject?.tempId
              )
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalContactErrorObject && (
            <div className="invalid-feedback">
              {personalContactErrorObject?.value}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Emergency Contact One<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="emergencyPhone"
            className={`form-control ${
              isShowError && personalEmergencyErrorContactObject1?.value
                ? "is-invalid"
                : ""
            }`}
            placeholder="e.g. 8698438642"
            value={personalEmergencyContactObject1?.value || ""}
            onChange={(e) =>
              handleInputContactChange(
                e,
                personalEmergencyContactObject1?.id,
                personalEmergencyContactObject1?.tempId
              )
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalEmergencyErrorContactObject1 && (
            <div className="invalid-feedback">
              {personalEmergencyErrorContactObject1?.value}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Emergency Contact Two<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="emergencyPhone"
            className={`form-control ${
              isShowError && personalEmergencyErrorContactObject2?.value
                ? "is-invalid"
                : ""
            }`}
            placeholder="e.g. 8698438642"
            value={personalEmergencyContactObject2?.value || ""}
            onChange={(e) =>
              handleInputContactChange(
                e,
                personalEmergencyContactObject2?.id,
                personalEmergencyContactObject2?.tempId
              )
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && personalEmergencyErrorContactObject2 && (
            <div className="invalid-feedback">
              {personalEmergencyErrorContactObject2?.value}
            </div>
          )}
        </div>
      </div>

      <div className="text-start text-black fw-bold col-md-10">
        Permanent Address
      </div>
      <div className="border-bottom border-bottom-1 col-md-10"></div>

      <div className="row g-3 m-0 p-0 justify-content-center">
        <div className="col-md-5">
          <label className="form-label personal-label">
            House No.<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="houseNo"
            className={`form-control ${
              isShowError && permanentAddressError?.houseNo ? "is-invalid" : ""
            }`}
            placeholder="e.g. Js01"
            value={permanentAddress?.houseNo || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.houseNo && (
            <div className="invalid-feedback">
              {permanentAddressError?.houseNo}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Area<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="area"
            className={`form-control ${
              isShowError && permanentAddressError?.area ? "is-invalid" : ""
            }`}
            placeholder="e.g. Wall street"
            value={permanentAddress?.area || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.area && (
            <div className="invalid-feedback">
              {permanentAddressError?.area}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Landmark<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="landmark"
            className={`form-control ${
              isShowError && permanentAddressError?.landmark ? "is-invalid" : ""
            }`}
            placeholder="e.g. Warje"
            value={permanentAddress?.landmark || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.landmark && (
            <div className="invalid-feedback">
              {permanentAddressError?.landmark}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Street<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="street"
            className={`form-control ${
              isShowError && permanentAddressError?.street ? "is-invalid" : ""
            }`}
            placeholder="e.g. Mumbai Bangalore Highway"
            value={permanentAddress?.street || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.street && (
            <div className="invalid-feedback">
              {permanentAddressError?.street}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Village/City<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="villageCity"
            className={`form-control ${
              isShowError && permanentAddressError?.villageCity
                ? "is-invalid"
                : ""
            }`}
            placeholder="e.g. Warje"
            value={permanentAddress?.villageCity || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.villageCity && (
            <div className="invalid-feedback">
              {permanentAddressError?.villageCity}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Taluka<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="taluka"
            className={`form-control ${
              isShowError && permanentAddressError?.taluka ? "is-invalid" : ""
            }`}
            placeholder="e.g. Haveli"
            value={permanentAddress?.taluka || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.taluka && (
            <div className="invalid-feedback">
              {permanentAddressError?.taluka}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            District<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="district"
            className={`form-control ${
              isShowError && permanentAddressError?.district ? "is-invalid" : ""
            }`}
            placeholder="e.g. Pune"
            value={permanentAddress?.district || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.district && (
            <div className="invalid-feedback">
              {permanentAddressError?.district}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            State<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="state"
            className={`form-control ${
              isShowError && permanentAddressError?.state ? "is-invalid" : ""
            }`}
            placeholder="e.g. Maharashtra"
            value={permanentAddress?.state || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.state && (
            <div className="invalid-feedback">
              {permanentAddressError?.state}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            ZIP Code<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="zipCode"
            className={`form-control ${
              isShowError && permanentAddressError?.zipCode ? "is-invalid" : ""
            }`}
            placeholder="e.g. 411058"
            value={permanentAddress?.zipCode || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.zipCode && (
            <div className="invalid-feedback">
              {permanentAddressError?.zipCode}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Country<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="country"
            className={`form-control ${
              isShowError && permanentAddressError?.country ? "is-invalid" : ""
            }`}
            placeholder="e.g. India"
            value={permanentAddress?.country || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
            disabled={!isEditableFields}
          />
          {isShowError && permanentAddressError?.country && (
            <div className="invalid-feedback">
              {permanentAddressError?.country}
            </div>
          )}
        </div>
      </div>

      <div
        className="d-flex justify-content-between col-md-10"
        style={{ borderBottom: "1px solid #d3d3", marginBottom: 12 }}
      >
        <div className="text-start text-black fw-bold">Current Address</div>
        <div>
          <input
            type="checkbox"
            checked={sameAsAbove}
            onChange={(e) => handleSameAsAboveChange(e)}
            disabled={!isEditableFields && sameAsAbove}

            // name="country"
            // className="form-control"
            // value={permanentAddress?.country || ""}
          />
          <label
            className="form-label personal-label"
            style={{ marginLeft: "5px" }}
          >
            Same As Above
          </label>
        </div>
      </div>

      <div className="row g-3 m-0 p-0 justify-content-center">
        <div className="col-md-5">
          <label className="form-label personal-label">
            House No.<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="houseNo"
            className="form-control"
            placeholder="e.g. Js01"
            value={currentAddress?.houseNo || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter House No.</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Area<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="area"
            className="form-control"
            placeholder="e.g. Wall street"
            value={currentAddress?.area || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter Area</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Landmark<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="landmark"
            className="form-control"
            placeholder="e.g. Warje"
            value={currentAddress?.landmark || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter Landmark</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Street<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="street"
            className="form-control"
            placeholder="e.g. Mumbai Bangalore Highway"
            value={currentAddress?.street || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter Street</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Village/City<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="villageCity"
            className="form-control"
            placeholder="e.g. Warje"
            value={currentAddress?.villageCity || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter Village/City</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Taluka<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="taluka"
            className="form-control"
            placeholder="e.g. Haveli"
            value={currentAddress?.taluka || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter Taluka</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            District<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="district"
            className="form-control"
            placeholder="e.g. Pune"
            value={currentAddress?.district || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter District</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            State<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="state"
            className="form-control"
            placeholder="e.g. Maharashtra"
            value={currentAddress?.state || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter State</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            ZIP Code<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="zipCode"
            className="form-control"
            placeholder="e.g. 411058"
            value={currentAddress?.zipCode || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            disabled={sameAsAbove || !isEditableFields}
            required
          />
          <div className="invalid-feedback">Please Enter ZIP Code</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Country<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="country"
            className="form-control"
            placeholder="e.g. India"
            value={currentAddress?.country || ""}
            onChange={(e) => handleInputChange(e, currentAddress?.addressType)}
            required
            disabled={sameAsAbove || !isEditableFields}
          />
          <div className="invalid-feedback">Please Enter Country</div>
        </div>
      </div>
    </div>
  );
};

export default EditContactInfo;
