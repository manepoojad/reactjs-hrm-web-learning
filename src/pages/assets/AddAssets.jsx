import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAssetsAction } from "src/redux/thunk/assetsThunk";

const AddAssets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lookup = useSelector((state) => state?.lookup?.lookupData);
  const [isError, setIsError] = useState(false);
  // const [lookupData, setLookupData] = useState([]);
  const [assetsDataValidationError, setAssetsDataValidationError] = useState({
    assetTypeLookupId: null,
    assetStatusLookupId: null,
    companyName: "",
    modelName: "",
    serialNumber: "",
    purchaseDate: "",
    notes: "",
  });
  const [assetsData, setAssetsData] = useState({
    assetTypeLookupId: null,
    assetStatusLookupId: null,
    companyName: "",
    modelName: "",
    serialNumber: "",
    purchaseDate: "",
    notes: "",
  });

  // useEffect(() => {
  //   getAllLookupList();
  // }, []);

  const handleCreateAssets = async () => {
    let isValid;
    isValid = validateForm();
    if (isValid) {
      const responseData = await dispatch(addAssetsAction(assetsData)).unwrap();
      navigate("/assetsList");
      return responseData;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newAssetsData = {
      ...assetsData,
      [name]: value,
    };

    setAssetsData(newAssetsData);
    validateForm(newAssetsData);
  };
  //   console.log("client",assetsData)

  // const getAllLookupList = async () => {
  //   try {
  //     const responseData = await fetchInterceptor(
  //       API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const lookupData = responseData.lookupData;
  //     setLookupData(lookupData);
  //   } catch (error) {}
  // };

  const assetsTypeLookup = lookup?.find(
    (lookup) => lookup.lookupType === "assetType"
  );
  const assetTypeLookupList = assetsTypeLookup?.lookups;

  const assetsStatusLookup = lookup?.find(
    (lookup) => lookup.lookupType === "assetStatus"
  );
  const assetStatusLookupList = assetsStatusLookup?.lookups;

  const validateForm = (clientInfo = assetsData) => {
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
          value={assetsData?.assetTypeLookupId || ""}
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
          value={assetsData?.assetStatusLookupId || ""}
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
          value={assetsData?.companyName || ""}
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
          value={assetsData?.modelName || ""}
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
          value={assetsData?.serialNumber || ""}
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
          value={assetsData?.purchaseDate || ""}
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
          value={assetsData?.notes || ""}
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
          onClick={() => handleCreateAssets()}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default AddAssets;
