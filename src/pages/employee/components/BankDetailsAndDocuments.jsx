import React from "react";

const BankDetailsAndDocuments = (props) => {
  const { formData = {}, handleWizardInputChange = () => {} } = props;

  const bankDetail = formData?.bankDetails;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newBankDetail = {
      ...bankDetail,
      [name]: value,
    };

    handleWizardInputChange("bankDetails", newBankDetail);
  };

  return (
    <div className="row g-3 m-0 p-0 justify-content-center">
      <div className="col-md-5">
        <label className="form-label personal-label">Bank Name<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          name="bankName"
          value={bankDetail?.bankName || ""}
          className="form-control"
          placeholder="e.g. ICICI Bank"
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">Branch Name<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          name="branchName"
          value={bankDetail?.branchName || ""}
          className="form-control"
          placeholder="e.g. Warje Pune"
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">IFSC Code<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          name="ifscCode"
          value={bankDetail?.ifscCode || ""}
          className="form-control"
          placeholder="e.g.ICIC00007"
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">MICR Code<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          name="micrCode"
          value={bankDetail?.micrCode || ""}
          className="form-control"
          placeholder="e.g.12345678"
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <div className="col-md-5" style={{ marginRight: 640 }}>
        <label className="form-label personal-label">Account Number<span style={{ color: "red" }}>*</span></label>
        <input
          type="text"
          name="accountNumber"
          value={bankDetail?.accountNumber || ""}
          className="form-control"
          placeholder="e.g.1234567891234"
          onChange={(e) => handleInputChange(e)}
        />
      </div>

    </div>
  );
};

export default BankDetailsAndDocuments;
