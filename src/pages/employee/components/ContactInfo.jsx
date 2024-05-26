import React, { useState } from "react";

const ContactInfo = (props) => {
  const { formData = {}, handleWizardInputChange = () => {} } = props;

  const contactInfo = formData?.contactInfo || {};

  const personalEmailObject = contactInfo?.contacts?.find(
    (contactItem) => contactItem?.contactType === "personalEmail"
  );

  const personalContactObject = contactInfo?.contacts?.find(
    (contactItem) => contactItem?.contactType === "personalPhone"
  );

  const personalEmergencyContactObject1 = contactInfo?.contacts?.[2];
  const personalEmergencyContactObject2 = contactInfo?.contacts?.[3];

  const address = formData?.contactInfo?.addresses;
  console.log(address);

  const permanentAddress = address?.find(
    (address) => address?.addressType === "permanant"
  );

  const currentAddress = address?.find(
    (address) => address?.addressType === "current"
  );
  const [sameAsAbove, setSameAsAbove] = useState(false);

  const handleInputContactChange = (e, contactIndex) => {
    const { name, value } = e.target;
    const contacts = contactInfo.contacts;
    const newContacts = contacts.map((item, index) => {
      if (item.contactType === name && index === contactIndex) {
        const newItem = {
          ...item,
          value: value,
        };
        return newItem;
      }
      return item;
    });
    const newContactInfo = {
      ...contactInfo,
      contacts: newContacts,
    };
    handleWizardInputChange("contactInfo", newContactInfo);
  };

  // const handleInputChange = (e, addressType) => {
  //   const { name, value } = e.target;
  //   const newAddresses = address?.map((addressItem) => {
  //     if (addressItem?.addressType === addressType) {
  //       return {
  //         ...addressItem,
  //         [name]: value,
  //       };
  //     }
  //     return addressItem;

  //   });

  //   const newContactInfo = {
  //     ...contactInfo,
  //     addresses: newAddresses,
  //   };

  //   handleWizardInputChange("contactInfo", newContactInfo);
  // };

  const handleInputChange = (e, addressType) => {
    const { name, value } = e.target;
    let newAddresses = address.map((addressItem) => {
      if (addressItem.addressType === addressType || sameAsAbove) {
        return {
          ...addressItem,
          [name]: value,
        };
      }

      return addressItem;
    });
    const newContactInfo = {
      ...contactInfo,
      addresses: newAddresses,
    };

    handleWizardInputChange("contactInfo", newContactInfo);
  };

  // const handleInputAddressesChange = (e, addressType) => {
  //   const { name, value } = e.target;
  //   const newAddresses = address?.map((addressItem, index) => {
  //     if (addressItem?.addressType === "permanant") {
  //       const newPermanentAddress = {
  //         ...addressItem,
  //         [name]: value,
  //       };
  //       return newPermanentAddress;
  //     }
  //     return addressItem;
  //   });

  //   const newContactInfo = {
  //     ...ContactInfo,
  //     addresses: newAddresses,
  //   };
  //   handleWizardInputChange("contactInfo", newContactInfo);
  // };

  // const handleInputCurrentAddressChange = (e, addressType) => {
  //   const { name, value } = e.target;
  //   const newAddress = address?.map((addressItem, index) => {
  //     if (addressItem?.addressType === "current") {
  //       const newAddressItem = {
  //         ...addressItem,
  //         [name]: value,
  //       };
  //       return newAddressItem;
  //     }
  //     return addressItem;
  //   });
  //   const newAddresses = {
  //     ...contactInfo,
  //     addresses: newAddress,
  //   };
  //   handleWizardInputChange("contactInfo", newAddresses);
  // };
  const handleSameAsAboveChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsAbove(isChecked);
    if (isChecked) {
      const renderSameAsAddress = {
        ...contactInfo,
        addresses: [
          {
            ...permanentAddress,
          },
          {
            ...permanentAddress,
            addressType: "current",
          },
        ],
      };
      handleWizardInputChange("contactInfo", renderSameAsAddress);
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
            className="form-control"
            placeholder="e.g. pooja@gmail.com"
            value={personalEmailObject?.value || ""}
            onChange={(e) => handleInputContactChange(e, 0)}
            required
          />
          <div className="invalid-feedback">
            Please Enter Personal Email ID.
          </div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Personal Contact<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="personalPhone"
            className="form-control"
            placeholder="e.g. 8080942232"
            value={personalContactObject?.value || ""}
            onChange={(e) => handleInputContactChange(e, 1)}
            required
          />
          <div className="invalid-feedback">Please Enter Personal Contact.</div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Emergency Contact One<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="emergencyPhone"
            className="form-control"
            placeholder="e.g. 8698438642"
            value={personalEmergencyContactObject1?.value || ""}
            onChange={(e) => handleInputContactChange(e, 2)}
            required
          />
          <div className="invalid-feedback">
            Please Enter Emergency Contact One.
          </div>
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Emergency Contact Two<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="emergencyPhone"
            className="form-control"
            placeholder="e.g. 8698438642"
            value={personalEmergencyContactObject2?.value || ""}
            onChange={(e) => handleInputContactChange(e, 3)}
            required
          />
          <div className="invalid-feedback">
            Please Enter Emergency Contact Two.
          </div>
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
            className="form-control"
            placeholder="e.g. Js01"
            value={permanentAddress?.houseNo || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.area || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.landmark || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.street || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.villageCity || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.taluka || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.district || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.state || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
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
            value={permanentAddress?.zipCode || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
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
            value={permanentAddress?.country || ""}
            onChange={(e) =>
              handleInputChange(e, permanentAddress?.addressType)
            }
            required
          />
          <div className="invalid-feedback">Please Enter Country</div>
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
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
            disabled={sameAsAbove}
          />
          <div className="invalid-feedback">Please Enter Country</div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
