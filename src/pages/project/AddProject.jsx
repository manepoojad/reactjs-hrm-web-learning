import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

const AddProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clientId = location?.state?.projectItem?.clientId;
  const [isError, setIsError] = useState(false);
  console.log(location?.state);
  const [lookupData, setLookupData] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [employeeNameList, setEmployeeNameList] = useState([]);

  const [projectData, setProjectData] = useState({
    projectName: "",
    clientId: null,
    startDate: "",
    status: "",
    employee: [
      //   {
      //     employeeId: null,
      //     employeeAllocation: "",
      //   },
    ],
  });

  const [projectDataValidationError, setProjectDataValidationError] = useState({
    projectName: "",
    clientId: null,
    startDate: "",
    status: "",
    employee: [
      //   {
      //     employeeId: null,
      //     employeeAllocation: "",
      //   },
    ],
  });

  const [addEmployeeModalData, setAddEmployeeModalData] = useState({
    isShow: false,
    employeeId: null,
    employeeAllocation: "",
  });

  const handleCloseConfirmModal = () => {
    setAddEmployeeModalData({
      isShow: false,
      employeeId: null,
      employeeAllocation: "",
    });
  };

  const handleIconClick = () => {
    setAddEmployeeModalData({
      ...addEmployeeModalData,
      isShow: true,
    });
  };

  useEffect(() => {
    getAllLookupList();
    getEmployeeNameList();
    getCompanyList();
  }, []);

  const handleCreateProject = async () => {
    let isValid;
    isValid = validateForm();
    const payload = {
      projectName: projectData?.projectName,
      status: projectData?.status,
      startDate: projectData?.startDate,
      employee: [
        {
          employeeId: projectData?.employeeId,
          employeeAllocation: projectData?.employeeAllocation,
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
    const { name, value, type } = e.target;
    console.log(type);

    let newProjectData;
    if (type === "select") {
      newProjectData = {
        ...projectData,
        employee: [
          {
            ...projectData.employee[0],
            [name]: value,
          },
        ],
      };
    } else {
      newProjectData = {
        ...projectData,
        [name]: value,
      };
    }

    setProjectData(newProjectData);
    validateForm(newProjectData);
  };
  //   console.log("client",projectData)

  const handleModalInputChange = (e) => {
    const { name, value, type } = e.target;

    setAddEmployeeModalData({
      ...addEmployeeModalData,
      [name]: value,
    });
    // validateForm(newProjectData);
  };

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

  const getEmployeeNameBYId = (employeeId) => {
    const employeeData = employeeNameList?.find(
      (employee) => employee.id == employeeId
    );
    const employeeName = `${employeeData?.firstName} ${employeeData?.lastName}`;
    return employeeName;
  };

  const statusList = [
    { id: 1, status: "Active" },
    { id: 2, status: "Inactive" },
    { id: 3, status: "On Hold" },
  ];

  const validateForm = (projectInfo = projectData) => {
    let isValid = true;
    const newErrors = {
      ...projectDataValidationError,
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

    if (!projectInfo.employee?.employeeId) {
      newErrors.employee.employeeId = "Please select employee name.";
      isValid = false;
    } else {
      newErrors.employee.employeeId = "";
    }

    if (!projectInfo.employee?.employeeAllocation) {
      newErrors.employeeAllocation = "Please select employee allocation.";
      isValid = false;
    } else {
      newErrors.employeeAllocation = "";
    }

    if (!isValid) {
      setIsError(true);
    }
    setProjectDataValidationError(newErrors);
    return isValid;
  };

  const handleAddEmployee = () => {
    // validation ==>

    const newProjectData = { ...projectData };

    newProjectData.employee.push({
      employeeId: addEmployeeModalData.employeeId,
      employeeAllocation: addEmployeeModalData.employeeAllocation,
    });

    setAddEmployeeModalData({
      isShow: false,
      employeeId: null,
      employeeAllocation: "",
    });
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
                  isError && projectDataValidationError?.projectName
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. HP"
                value={projectData?.projectName || ""}
                onChange={handleInputChange}
                required
              />
              {isError && projectDataValidationError?.projectName && (
                <div className="invalid-feedback">
                  {projectDataValidationError?.projectName}
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
                  isError && projectDataValidationError?.clientId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label=".form-select-lg example"
                value={projectData?.clientId || ""}
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
              {isError && projectDataValidationError?.clientId && (
                <div className="invalid-feedback">
                  {projectDataValidationError?.clientId}
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
                  isError && projectDataValidationError?.startDate
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="e.g. 23/08/22"
                value={projectData?.startDate || ""}
                onChange={handleInputChange}
                required
              />
              {isError && projectDataValidationError?.startDate && (
                <div className="invalid-feedback">
                  {projectDataValidationError?.startDate}
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
                  isError && projectDataValidationError?.status
                    ? "is-invalid"
                    : ""
                }`}
                aria-label=".form-select-lg example"
                value={projectData?.status || ""}
                onChange={handleInputChange}
                required
              >
                <option defaultValue disabled value="">
                  Status
                </option>
                {statusList?.[0] &&
                  statusList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.status}
                      </option>
                    );
                  })}
              </select>
              {isError && projectDataValidationError?.status && (
                <div className="invalid-feedback">
                  {projectDataValidationError?.status}
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

          {/* Display selected employees */}
          {projectData.employee.map((employee, index) => (
            <div key={index} style={{ marginTop: 10 }}>
              Employee {index + 1}: {getEmployeeNameBYId(employee.employeeId)} -{" "}
              {employee.employeeAllocation}
            </div>
          ))}
          <Modal
            dialogClassName="custom-modal"
            show={addEmployeeModalData.isShow}
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
                    // className={`form-control ${
                    //   isError && projectDataValidationError?.employeeId
                    //     ? "is-invalid"
                    //     : ""
                    // }`}
                    aria-label=".form-select-lg example"
                    value={addEmployeeModalData?.employeeId || ""}
                    onChange={handleModalInputChange}
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
                  {/* {isError && projectDataValidationError?.status && (
                    <div className="invalid-feedback">
                      {projectDataValidationError?.status}
                    </div>
                  )} */}
                </div>

                <div className="col-md-6">
                  <label className="form-label personal-label">
                    Employee Allocation<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="employeeAllocation"
                    // className={`form-control ${
                    //   isError &&
                    //   projectDataValidationError?.employee?.employeeAllocation
                    //     ? "is-invalid"
                    //     : ""
                    // }`}
                    aria-label=".form-select-lg example"
                    value={addEmployeeModalData?.employeeAllocation || ""}
                    onChange={handleModalInputChange}
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
                  {/* {isError &&
                    projectDataValidationError?.employee
                      ?.employeeAllocation && (
                      <div className="invalid-feedback">
                        {
                          projectDataValidationError?.employee
                            ?.employeeAllocation
                        }
                      </div>
                    )} */}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCloseConfirmModal}>
                No
              </Button>
              <Button variant="primary" onClick={() => handleAddEmployee()}>
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
          onClick={() => handleCreateProject()}
        >
          save
        </Button>
      </div>
    </>
  );
};

export default AddProject;
