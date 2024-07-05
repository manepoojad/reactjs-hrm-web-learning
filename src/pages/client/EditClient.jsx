import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateClientAction } from "src/redux/thunk/clientThunk";

const UpdateClient = () => {
  const location = useLocation();
  const clientObject = location?.state?.client;

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [UpdateClientData, setUpdateClientData] = useState({
    companyName: clientObject?.companyName,
    country: clientObject?.country,
    phoneNumber: clientObject?.phoneNumber,
    email: clientObject?.email,
    primaryContact: clientObject?.primaryContact,
  });

  const [clientDataValidationError, setClientDataValidationError] = useState({
    companyName: "",
    country: "",
    phoneNumber: "",
    email: "",
    primaryContact: "",
  });

  const handleUpdateClient = () => {
    let isValid;
    isValid = validateForm();
    if (isValid) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmUpdateClient = async () => {
    const payload = {
      id: params?.id,
      companyName: UpdateClientData?.companyName,
      country: UpdateClientData?.country,
      phoneNumber: UpdateClientData?.phoneNumber,
      email: UpdateClientData?.email,
      primaryContact: UpdateClientData?.primaryContact,
    };
    const responseData = await dispatch(updateClientAction(payload)).unwrap();
    navigate("/clientList");
    return responseData;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newClientData = {
      ...UpdateClientData,
      [name]: value,
    };
    setUpdateClientData(newClientData);
    validateForm(newClientData);
  };
  //   console.log("client",UpdateClientData)

  const validateForm = (clientInfo = UpdateClientData) => {
    let isValid = true;
    const newErrors = {
      ...clientDataValidationError,
    };

    // Validate company name
    if (!clientInfo.companyName.trim()) {
      newErrors.companyName = "Please enter company name.";
      isValid = false;
    } else if (clientInfo.companyName.trim().length < 3) {
      newErrors.companyName = "Company name must be at least 3 characters";
      isValid = false;
    } else {
      newErrors.companyName = "";
    }

    // Validate country
    if (!clientInfo.country.trim()) {
      newErrors.country = "Please enter country name.";
      isValid = false;
    } else {
      newErrors.country = "";
    }

    // Validate phone number
    if (!clientInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter phone number.";
      isValid = false;
    } else {
      newErrors.phoneNumber = "";
    }

    // Validate email
    if (!clientInfo.email.trim()) {
      newErrors.email = "Please enter email.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(clientInfo.email)) {
      newErrors.email = "Please enter a Valid email address.";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Validate primary contact
    if (!clientInfo.primaryContact.trim()) {
      newErrors.primaryContact = "Please enter primary contact.";
      isValid = false;
    } else {
      newErrors.primaryContact = "";
    }

    if (!isValid) {
      setIsError(true);
    }
    setClientDataValidationError(newErrors);
    return isValid;
  };

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
          className={`form-control ${
            isError && clientDataValidationError?.companyName
              ? "is-invalid"
              : ""
          }`}
          placeholder="e.g. iConnectSolutions.com"
          value={UpdateClientData?.companyName || ""}
          onChange={handleInputChange}
          required
        />
        {isError && clientDataValidationError?.companyName && (
          <div className="invalid-feedback">
            {clientDataValidationError?.companyName}
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
            isError && clientDataValidationError?.country ? "is-invalid" : ""
          }`}
          placeholder="e.g. India"
          value={UpdateClientData?.country || ""}
          onChange={handleInputChange}
          required
        />
        {isError && clientDataValidationError?.country && (
          <div className="invalid-feedback">
            {clientDataValidationError?.country}
          </div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Phone Number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="phoneNumber"
          className={`form-control ${
            isError && clientDataValidationError?.phoneNumber
              ? "is-invalid"
              : ""
          }`}
          placeholder="e.g. 8080942232"
          value={UpdateClientData?.phoneNumber || ""}
          onChange={handleInputChange}
          required
        />
        {isError && clientDataValidationError?.phoneNumber && (
          <div className="invalid-feedback">
            {clientDataValidationError?.phoneNumber}
          </div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Personal Email ID<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          name="email"
          className={`form-control ${
            isError && clientDataValidationError?.email ? "is-invalid" : ""
          }`}
          placeholder="e.g. pooja@gmail.com"
          value={UpdateClientData?.email || ""}
          onChange={handleInputChange}
          required
        />
        {isError && clientDataValidationError?.email && (
          <div className="invalid-feedback">
            {clientDataValidationError?.email}
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
          className={`form-control ${
            isError && clientDataValidationError?.primaryContact
              ? "is-invalid"
              : ""
          }`}
          placeholder="e.g. xyz"
          value={UpdateClientData?.primaryContact || ""}
          onChange={handleInputChange}
          required
        />
        {isError && clientDataValidationError?.primaryContact && (
          <div className="invalid-feedback">
            {clientDataValidationError?.primaryContact}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-end" style={{ padding: 24 }}>
        <Button
          type="button"
          className="bg-success text-white"
          onClick={() => handleUpdateClient()}
        >
          Update
        </Button>
      </div>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update the client of{" "}
          {clientObject?.companyName}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdateClient}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateClient;
