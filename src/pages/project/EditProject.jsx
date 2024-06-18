import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location?.state?.projectData;
  const employee=projectData?.employees?.firstName
  const clientId = location?.state?.projectItem?.clientId;
  const [isError, setIsError] = useState(false);
  console.log(location?.state);
  const [lookupData, setLookupData] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeNameList, setEmployeeNameList] = useState([]);
  const [editProjectDataValidationError, setEditProjectDataValidationError] =
    useState({
      projectName: "",
      clientId: null,
      startDate: "",
      status: "",
      employeeId: null,
      employeeAllocation: "",
    });
  const [editProjectData, setEditProjectData] = useState({
    projectName: projectData?.projectName,
    clientId: projectData?.clientId,
    startDate: projectData?.startDate,
    status: projectData?.status,
    employeeId: projectData?.employeeId,
    employeeAllocation: projectData,
  });

  const handleCloseConfirmModal = () => {
    setShowModal(false);
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getAllLookupList();
    getEmployeeNameList();
    getCompanyList();
  }, []);

  const handleUpdateProject = async () => {
    let isValid;
    isValid = validateForm();
    const payload = {
      projectName: editProjectData?.projectName,
      status: editProjectData?.status,
      startDate: editProjectData?.startDate,
      employee: [
        {
          employeeId: editProjectData?.employeeId,
          employeeAllocation: editProjectData?.employeeAllocation,
        },
      ],
    };
    if (isValid) {
      const responseData = await fetchInterceptor(
        `http://localhost:8888/api/client/${clientId}/project`,
        {
          method: "POST",
          body: payload,
        }
      );
      navigate("/projectList");
      return responseData;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newProjectData = {
      ...editProjectData,
      [name]: value,
    };

    setEditProjectData(newProjectData);
    validateForm(newProjectData);
  };
  //   console.log("client",editProjectData)

  const getCompanyList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_CLIENT_LIST,
        {
          method: "GET",
        }
      );

      setCompanyList(responseData?.clients);
    } catch (error) {}
  };
  console.log(companyList);

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

  const employeeAllocationLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "employeeAllocation"
  );
  const employeeAllocationLookupList = employeeAllocationLookup?.lookups;

  const getEmployeeNameList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/employee/currentAllocableEmployee`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Response not ok. ");
      }
      const responseData = await response.json();

      setEmployeeNameList(responseData?.allocableEmployees);
    } catch (error) {}
  };

  const statusList = [
    { id: 1, status: "Active" },
    { id: 2, status: "Inactive" },
    { id: 3, status: "On Hold" },
  ];

  const validateForm = (projectInfo = editProjectData) => {
    let isValid = true;
    const newErrors = {
      ...editProjectDataValidationError,
    };

    if (!projectInfo?.projectName) {
      newErrors.projectName = "Please enter project name.";
      isValid = false;
    } else {
      newErrors.projectName = "";
    }

    if (!projectInfo.clientId) {
      newErrors.clientId = "Please select company name";
      isValid = false;
    } else {
      newErrors.clientId = "";
    }

    if (!projectInfo.status) {
      newErrors.status = "Please select status.";
      isValid = false;
    } else {
      newErrors.status = "";
    }

    if (!projectInfo.startDate) {
      newErrors.startDate = "Please select start date.";
      isValid = false;
    } else {
      newErrors.startDate = "";
    }

    if (!isValid) {
      setIsError(true);
    }
    setEditProjectDataValidationError(newErrors);
    return isValid;
  };

  const handleAddEmployee = (employeeId, employeeAllocation) => {
    const updatedProjectData = {
      ...editProjectData,
      employeeId,
      employeeAllocation,
    };
    setEditProjectData(updatedProjectData);
    setShowModal(false);
  };

  return (
    <>
      <div>
        <label
          role="button"
          className="m-3 fw-bold h5"
          style={{ color: "white", backgroundColor: "#00ce3f", padding: 16 }}
        >
          Project Details
        </label>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: "50%",
            padding: 32,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              className="col-md-6"
              style={{ marginRight: 40, marginLeft: 100 }}
            >
              <label className="form-label personal-label">
                Project Name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="projectName"
                className={`form-control ${
                  isError && editProjectDataValidationError?.projectName
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. HP"
                value={editProjectData?.projectName || ""}
                onChange={handleInputChange}
                required
              />
              {isError && editProjectDataValidationError?.projectName && (
                <div className="invalid-feedback">
                  {editProjectDataValidationError?.projectName}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label personal-label">
                Company Name<span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="clientId"
                className={`form-control ${
                  isError && editProjectDataValidationError?.clientId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label=".form-select-lg example"
                value={editProjectData?.clientId || ""}
                onChange={handleInputChange}
                style={{ cursor: "pointer" }}
                required
              >
                <option defaultValue disabled value="">
                  Company Name
                </option>
                {companyList?.[0] &&
                  companyList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.companyName}
                      </option>
                    );
                  })}
              </select>
              {isError && editProjectDataValidationError?.clientId && (
                <div className="invalid-feedback">
                  {editProjectDataValidationError?.clientId}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 20,
            }}
          >
            <div
              className="col-md-6"
              style={{ marginRight: 40, marginLeft: 100 }}
            >
              <label className="form-label personal-label">
                Start Date<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="startDate"
                className={`form-control ${
                  isError && editProjectDataValidationError?.startDate
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. 23/08/22"
                value={editProjectData?.startDate || ""}
                onChange={handleInputChange}
                required
              />
              {isError && editProjectDataValidationError?.startDate && (
                <div className="invalid-feedback">
                  {editProjectDataValidationError?.startDate}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label personal-label">
                Status<span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="status"
                className={`form-control ${
                  isError && editProjectDataValidationError?.status
                    ? "is-invalid"
                    : ""
                }`}
                aria-label=".form-select-lg example"
                value={editProjectData?.status || ""}
                onChange={handleInputChange}
                required
              >
                <option defaultValue disabled value="">
                  Status
                </option>
                {statusList?.[0] &&
                  statusList.map((item, index) => {
                    return (
                      <option key={index} value={item.status}>
                        {item.status}
                      </option>
                    );
                  })}
              </select>
              {isError && editProjectDataValidationError?.status && (
                <div className="invalid-feedback">
                  {editProjectDataValidationError?.status}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ width: "50%" }}>
          <div>
            Click On <i class="bi bi-plus-circle-fill"></i> To Add Employee On
            Project
          </div>

          <div style={{ marginLeft: 250, marginTop: 10 }}>
            {" "}
            <i
              style={{ fontSize: 25, cursor: "pointer" }}
              class="bi bi-plus-circle-fill"
              onClick={handleIconClick}
            ></i>
          </div>
          <Modal
            dialogClassName="custom-modal"
            show={showModal}
            onHide={handleCloseConfirmModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Employee On Project</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ margin: "16px" }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div className="col-md-6">
                  <label className="form-label personal-label">
                    Employee Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="employeeId"
                    className={`form-control ${
                      isError && editProjectDataValidationError?.employeeId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label=".form-select-lg example"
                    value={editProjectData?.employeeId || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option defaultValue disabled value="">
                      Employee Name
                    </option>
                    {employeeNameList?.[0] &&
                      employeeNameList.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.firstName} {item.lastName} (
                            {item.currentStatusOfAllocation})
                          </option>
                        );
                      })}
                  </select>
                  {isError && editProjectDataValidationError?.employeeId && (
                    <div className="invalid-feedback">
                      {editProjectDataValidationError?.employeeId}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label personal-label">
                    Employee Allocation<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="employeeAllocation"
                    className={`form-control ${
                      isError &&
                      editProjectDataValidationError?.employeeAllocation
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label=".form-select-lg example"
                    value={editProjectData?.employeeAllocation || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option defaultValue disabled value="">
                      Employee Allocation
                    </option>
                    {employeeAllocationLookupList?.[0] &&
                      employeeAllocationLookupList.map((item, index) => {
                        return (
                          <option key={index} value={item.label}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                  {isError &&
                    editProjectDataValidationError?.employeeAllocation && (
                      <div className="invalid-feedback">
                        {editProjectDataValidationError?.employeeAllocation}
                      </div>
                    )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCloseConfirmModal}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  handleAddEmployee(
                    editProjectData.employeeId,
                    editProjectData.employeeAllocation
                  )
                }
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="d-flex justify-content-end" style={{ padding: 24 }}>
        <Button
          type="button"
          className="bg-success text-white"
          onClick={() => handleUpdateProject()}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default EditProject;
