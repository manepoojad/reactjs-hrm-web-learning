import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

const EditLeave = () => {
  const navigate = useNavigate();
  const [lookupData, setLookupData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [editLeaveData, setEditLeaveData] = useState({
    title: "",
    description: "",
    leaveType: "",
    startDate: "",
    endDate: "",
  });

  const [leaveDataValidationError, setLeaveDataValidationError] = useState({
    title: "",
    description: "",
    leaveType: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getAllLookupList();
    getLeaveById();
  }, []);

  const getLeaveById = async () => {
    try {
      const responseData = await fetchInterceptor(
        `/leave/1`,
        {
          method: "GET",
        }
      );

      console.log(responseData?.leaveDetail);

      setEditLeaveData({
        title: responseData?.leaveDetail?.title,
        description: responseData?.leaveDetail?.description,
        leaveType: responseData?.leaveDetail?.leaveType,
        startDate: moment(responseData?.leaveDetail?.startDate).format(
          "YYYY-MM-DD"
        ),
        endDate: moment(responseData?.leaveDetail?.endDate).format(
          "YYYY-MM-DD"
        ),
      });
    } catch (error) {}
  };
  console.log(editLeaveData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newAssetsData = {
      ...editLeaveData,
      [name]: value,
    };

    setEditLeaveData(newAssetsData);
    validateForm(newAssetsData);
  };

  const validateForm = (leaveInfo = editLeaveData) => {
    let isValid = true;
    const newErrors = {
      ...leaveDataValidationError,
    };

    if (!leaveInfo?.title.trim()) {
      newErrors.title = "Please enter title.";
      isValid = false;
    } else {
      newErrors.title = "";
    }

    if (!leaveInfo.description.trim()) {
      newErrors.description = "Please enter description.";
      isValid = false;
    } else {
      newErrors.description = "";
    }

    if (!leaveInfo.leaveType) {
      newErrors.leaveType = "Please select leave type.";
      isValid = false;
    } else {
      newErrors.leaveType = "";
    }

    if (!leaveInfo.startDate) {
      newErrors.startDate = "Please select start date.";
      isValid = false;
    } else {
      newErrors.startDate = "";
    }

    if (!leaveInfo.endDate) {
      newErrors.endDate = "Please select end date.";
      isValid = false;
    } else {
      newErrors.endDate = "";
    }

    if (!isValid) {
      setIsError(true);
    }
    setLeaveDataValidationError(newErrors);
    return isValid;
  };

  const getAllLookupList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
        {
          method: "GET",
        }
      );
      const lookupData = responseData.lookupData;
      setLookupData(lookupData);
    } catch (error) {}
  };

  const leaveTypeLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "leaveType"
  );
  const leaveTypeLookupList = leaveTypeLookup?.lookups;

  const handleCreateLeave = async () => {
    let isValid;
    isValid = validateForm();
    if (isValid) {
      const responseData = await fetchInterceptor(
        "/leave",
        {
          method: "POST",
          body: editLeaveData,
        }
      );
      navigate("/leaveList");
      return responseData;
    }
  };

  return (
    <>
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
            Title<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="title"
            className={`form-control ${
              isError && leaveDataValidationError?.title ? "is-invalid" : ""
            }`}
            placeholder="e.g. HP"
            value={editLeaveData?.title || ""}
            onChange={handleInputChange}
            required
          />
          {isError && leaveDataValidationError?.title && (
            <div className="invalid-feedback">
              {leaveDataValidationError?.title}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Description<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="description"
            className={`form-control ${
              isError && leaveDataValidationError?.description
                ? "is-invalid"
                : ""
            }`}
            placeholder="e.g. HP"
            value={editLeaveData?.description || ""}
            onChange={handleInputChange}
            required
          />
          {isError && leaveDataValidationError?.description && (
            <div className="invalid-feedback">
              {leaveDataValidationError?.description}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Leave Type<span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="leaveType"
            className={`form-control ${
              isError && leaveDataValidationError?.leaveType ? "is-invalid" : ""
            }`}
            aria-label=".form-select-lg example"
            value={editLeaveData?.leaveType || ""}
            onChange={handleInputChange}
            required
          >
            <option defaultValue disabled value="">
              Leave Type
            </option>
            {leaveTypeLookupList?.[0] &&
              leaveTypeLookupList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
          </select>
          {isError && leaveDataValidationError?.leaveType && (
            <div className="invalid-feedback">
              {leaveDataValidationError?.leaveType}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            Start Date<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="startDate"
            className={`form-control ${
              isError && leaveDataValidationError?.startDate ? "is-invalid" : ""
            }`}
            placeholder="e.g. 23/08/22"
            value={editLeaveData?.startDate || ""}
            onChange={handleInputChange}
            required
          />
          {isError && leaveDataValidationError?.startDate && (
            <div className="invalid-feedback">
              {leaveDataValidationError?.startDate}
            </div>
          )}
        </div>

        <div className="col-md-5">
          <label className="form-label personal-label">
            End Date<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="endDate"
            className={`form-control ${
              isError && leaveDataValidationError?.endDate ? "is-invalid" : ""
            }`}
            placeholder="e.g. 23/08/22"
            value={editLeaveData?.endDate || ""}
            onChange={handleInputChange}
            required
          />
          {isError && leaveDataValidationError?.endDate && (
            <div className="invalid-feedback">
              {leaveDataValidationError?.endDate}
            </div>
          )}
        </div>

        {/* <div className="d-flex justify-content-end" style={{ padding: 24 }}>
          <Button
            type="button"
            className="bg-success text-white"
            onClick={() => handleCreateLeave()}
          >
            save
          </Button>
        </div> */}
      </div>
    </>
  );
};

export default EditLeave;
