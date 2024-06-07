import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";

const EditAssets = () => {
  const params = useParams();
  const location = useLocation();
  const assetObject = location?.state?.asset;
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lookupData, setLookupData] = useState([]);
  const [assetsDataValidationError, setAssetsDataValidationError] = useState({
    assetTypeLookupId: null,
    assetStatusLookupId: null,
    companyName: "",
    modelName: "",
    serialNumber: "",
    purchaseDate: "",
    notes: "",
  });
  const [editAssetsData, setEditAssetsData] = useState({
    assetTypeLookupId: assetObject?.assetTypeLookupId,
    assetStatusLookupId: assetObject.assetStatusLookupId,
    companyName: assetObject?.companyName,
    modelName: assetObject?.modelName,
    serialNumber: assetObject?.serialNumber,
    purchaseDate: assetObject?.purchaseDate,
    notes: assetObject?.notes,
  });

  useEffect(() => {
    getAllLookupList();
  }, []);

  const handleUpdateAssets = () => {
    let isValid;
    isValid = validateForm();
    if (isValid) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmUpdateAsset = async () => {
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/asset/${params?.id}`,
      {
        method: "PUT",
        body: editAssetsData,
      }
    );
    navigate("/assetsList");
    return responseData;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newAssetsData = {
      ...editAssetsData,
      [name]: value,
    };

    setEditAssetsData(newAssetsData);
    validateForm(newAssetsData);
  };
  //   console.log("client",editAssetsData)

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

  const assetsTypeLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "assetType"
  );
  const assetTypeLookupList = assetsTypeLookup?.lookups;

  const assetsTypeLookupData = assetTypeLookupList?.find(
    (lookup) => lookup?.id === editAssetsData?.assetTypeLookupId
  );

  const assetTypeLabel = assetsTypeLookupData
    ? assetsTypeLookupData?.label
    : "";

  const assetsStatusLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "assetStatus"
  );
  const assetStatusLookupList = assetsStatusLookup?.lookups;

  const validateForm = (clientInfo = editAssetsData) => {
    let isValid = true;
    const newErrors = {
      ...assetsDataValidationError,
    };

    if (!clientInfo?.assetTypeLookupId) {
      newErrors.assetTypeLookupId = "Please select asset type.";
      isValid = false;
    }

    if (!clientInfo.assetStatusLookupId) {
      newErrors.assetStatusLookupId = "Please select asset status";
      isValid = false;
    }

    if (!clientInfo.companyName.trim()) {
      newErrors.companyName = "Please enter company name.";
      isValid = false;
    } else {
      newErrors.companyName = "";
    }

    if (!clientInfo.modelName.trim()) {
      newErrors.modelName = "Please enter model name.";
      isValid = false;
    } else {
      newErrors.modelName = "";
    }

    if (!clientInfo.serialNumber.trim()) {
      newErrors.serialNumber = "Please enter serial number.";
      isValid = false;
    } else {
      newErrors.serialNumber = "";
    }

    if (!clientInfo.purchaseDate) {
      newErrors.purchaseDate = "Please select purchase date.";
      isValid = false;
    } else {
      newErrors.purchaseDate = "";
    }

    if (!isValid) {
      setIsError(true);
    }
    setAssetsDataValidationError(newErrors);
    return isValid;
  };

  const isoDateString = editAssetsData?.purchaseDate;
  const formattedDate = isoDateString?.split("T")[0];

  return (
    <div className="row g-3 m-0 p-0 d-flex flex-direction-row justify-content-center">
      <div>
        <label
          role="button"
          className="m-3 fw-bold h5"
          style={{ color: "white", backgroundColor: "#00ce3f", padding: 16 }}
        >
          Assets Details
        </label>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Asset Type<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="assetTypeLookupId"
          className="form-select"
          aria-label=".form-select-lg example"
          value={editAssetsData?.assetTypeLookupId || ""}
          onChange={handleInputChange}
          required
        >
          <option defaultValue disabled value="">
            Asset Type
          </option>
          {assetTypeLookupList?.[0] &&
            assetTypeLookupList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select a asset type.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Asset Status<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="assetStatusLookupId"
          className="form-select"
          aria-label=".form-select-lg example"
          value={editAssetsData?.assetStatusLookupId || ""}
          onChange={handleInputChange}
          required
        >
          <option defaultValue disabled value="">
            Asset Status
          </option>
          {assetStatusLookupList?.[0] &&
            assetStatusLookupList.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="invalid-feedback">Please select a asset status.</div>
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Company Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="companyName"
          className={`form-control ${
            isError && assetsDataValidationError?.companyName
              ? "is-invalid"
              : ""
          }`}
          placeholder="e.g. HP"
          value={editAssetsData?.companyName || ""}
          onChange={handleInputChange}
          required
        />
        {isError && assetsDataValidationError?.companyName && (
          <div className="invalid-feedback">
            {assetsDataValidationError?.companyName}
          </div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Model Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="modelName"
          className={`form-control ${
            isError && assetsDataValidationError?.modelName ? "is-invalid" : ""
          }`}
          placeholder="e.g. vfgt980"
          value={editAssetsData?.modelName || ""}
          onChange={handleInputChange}
          required
        />
        {isError && assetsDataValidationError?.modelName && (
          <div className="invalid-feedback">
            {assetsDataValidationError?.modelName}
          </div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Serial Number<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="serialNumber"
          className={`form-control ${
            isError && assetsDataValidationError?.serialNumber
              ? "is-invalid"
              : ""
          }`}
          placeholder="e.g. 808"
          value={editAssetsData?.serialNumber || ""}
          onChange={handleInputChange}
          required
        />
        {isError && assetsDataValidationError?.serialNumber && (
          <div className="invalid-feedback">
            {assetsDataValidationError?.serialNumber}
          </div>
        )}
      </div>

      <div className="col-md-5">
        <label className="form-label personal-label">
          Purchase Date<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          name="purchaseDate"
          className={`form-control ${
            isError && assetsDataValidationError?.purchaseDate
              ? "is-invalid"
              : ""
          }`}
          placeholder="e.g. 23/08/22"
          value={formattedDate || ""}
          onChange={handleInputChange}
          required
        />
        {isError && assetsDataValidationError?.purchaseDate && (
          <div className="invalid-feedback">
            {assetsDataValidationError?.purchaseDate}
          </div>
        )}
      </div>

      <div className="col-md-5" style={{ marginRight: 650 }}>
        <label className="form-label personal-label">Notes</label>
        <input
          type="text"
          name="notes"
          className={`form-control ${
            isError && assetsDataValidationError?.notes ? "is-invalid" : ""
          }`}
          placeholder="e.g. xyz"
          value={editAssetsData?.notes || ""}
          onChange={handleInputChange}
        />
        {isError && assetsDataValidationError?.notes && (
          <div className="invalid-feedback">
            {assetsDataValidationError?.notes}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-end" style={{ padding: 24 }}>
        <Button
          type="button"
          className="bg-success text-white"
          onClick={() => handleUpdateAssets()}
        >
          Update
        </Button>
      </div>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update the
          <span className="fw-bold"> {assetTypeLabel}</span> Asset?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdateAsset}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditAssets;
