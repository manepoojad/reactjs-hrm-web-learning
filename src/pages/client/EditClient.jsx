import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetchInterceptor from "../../helper/fetchInterceptor";

const UpdateClient = () => {
  const location = useLocation();
  const clientObject = location?.state?.client;
  const params = useParams();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [UpdateClientData, setUpdateClientData] = useState({
    companyName: clientObject?.companyName,
    country: clientObject?.country,
    phoneNumber: clientObject?.phoneNumber,
    email: clientObject?.email,
    primaryContact: clientObject?.primaryContact,
  });

  const handleUpdateClient = async () => {
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/client/${params?.id}`,
      {
        method: "PUT",
        body: UpdateClientData,
      }
    );
    navigate("/clientList");
    return responseData;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateClientData({
      ...UpdateClientData,
      [name]: value,
    });
  };
  //   console.log("client",UpdateClientData)

  return (
    <div className="row g-3 m-0 p-0 d-flex flex-direction-row justify-content-center">
      <div>
        <label
          role="button"
          className="m-3 fw-bold h5"
          style={{ color: "white", backgroundColor: "#00ce3f", padding: 16 }}
        >
          Update Client
        </label>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Company Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="companyName"
          className="form-control"
          placeholder="e.g. iConnectSolutions.com"
          value={UpdateClientData?.companyName || ""}
          onChange={handleInputChange}
          required
        />
        {!isError && (
          <div className="invalid-feedback">Please Enter Company Name.</div>
        )}
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
          value={UpdateClientData?.country || ""}
          onChange={handleInputChange}
          required
        />
        {!isError && (
          <div className="invalid-feedback">Please Enter Country Name.</div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Phone Number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="phoneNumber"
          className="form-control"
          placeholder="e.g. 8080942232"
          value={UpdateClientData?.phoneNumber || ""}
          onChange={handleInputChange}
          required
        />
        {!isError && (
          <div className="invalid-feedback">Please Enter Phone Number.</div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Personal Email ID<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="e.g. pooja@gmail.com"
          value={UpdateClientData?.email || ""}
          onChange={handleInputChange}
          required
        />
        {!isError && (
          <div className="invalid-feedback">
            Please Enter Personal Email ID.
          </div>
        )}
      </div>

      <div className="col-md-5" style={{ marginRight: 650 }}>
        <label className="form-label personal-label">
          Primary Person to Contact<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="primaryContact"
          className="form-control"
          placeholder="e.g. xyz"
          value={UpdateClientData?.primaryContact || ""}
          onChange={handleInputChange}
          required
        />
        {!isError && (
          <div className="invalid-feedback">Primary Person to Contact</div>
        )}
      </div>

      <div className="d-flex justify-content-end" style={{ padding: 24 }}>
        <Button
          type="button"
          className="bg-success text-white"
          onClick={() => handleUpdateClient()}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default UpdateClient;
