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
  const [isEmployeeError, setIsEmployeeError] = useState(false);
  const [lookupData, setLookupData] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [employeeNameList, setEmployeeNameList] = useState([]);

  const [projectData, setProjectData] = useState({
    projectName: "",
    clientId: null,
    startDate: "",
    status: "",
    employee: [],
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

  const [addEmployeeModalDataError, setAddEmployeeModalDataError] = useState({
    isShow: false,
    employeeId: null,
    employeeAllocation: "",
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

    if (isValid) {
      const responseData = await fetchInterceptor(
        `/client/${clientId}/project`,
        {
          method: "POST",
          body: projectData,
        }
      );
      navigate("/projectList");
      return responseData;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

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

  const handleModalInputChange = (e) => {
    const { name, value, type } = e.target;

    const newEmployeeData = {
      ...addEmployeeModalData,
      [name]: value,
    };

    setAddEmployeeModalData(newEmployeeData);
    employeeValidForm(newEmployeeData);
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
        `/employee/currentAllocableEmployee`,
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

    if (!isValid) {
      setIsError(true);
    }
    setProjectDataValidationError(newErrors);
    return isValid;
  };

  const employeeValidForm = (employeeInfo = addEmployeeModalData) => {
    let isValid = true;
    const newErrors = {
      ...addEmployeeModalDataError,
    };
    if (!employeeInfo?.employeeId) {
      newErrors.employeeId = "Please select employee name.";
      isValid = false;
    } else {
      newErrors.employeeId = "";
    }

    if (!employeeInfo?.employeeAllocation) {
      newErrors.employeeAllocation = "Please select employee allocation.";
      isValid = false;
    } else {
      newErrors.employeeAllocation = "";
    }

    if (!isValid) {
      setIsEmployeeError(true);
    }
    setAddEmployeeModalDataError(newErrors);
    return isValid;
  };
//   const handleAddEmployee = () => {
//     // validation ==>
//     let isValid;
//     isValid = employeeValidForm();
//     if (isValid) {
//       const newProjectData = { ...projectData };

//       newProjectData.employee.push({
//         employeeId: addEmployeeModalData.employeeId,
//         employeeAllocation: addEmployeeModalData.employeeAllocation,
//       });

//       setAddEmployeeModalData({
//         isShow: false,
//         employeeId: null,
//         employeeAllocation: "",
//       });
//     }
//   };

const handleAddEmployee = () => {
    // validation ==>
    let isValid;
    isValid = employeeValidForm();
  
    if (isValid) {
      const newEmployee = {
        employeeId: addEmployeeModalData.employeeId,
        employeeAllocation: addEmployeeModalData.employeeAllocation,
      };
  
      const newProjectData = {
        ...projectData,
        employee: [...projectData.employee, newEmployee],
      };
  
      setProjectData(newProjectData);
  
      // Reset modal state
      setAddEmployeeModalData({
        isShow: false,
        employeeId: null,
        employeeAllocation: "",
      });
    }
  };

  const handleDeleteEmployee = (clickIndex) => {
    const newEmployeeData = projectData?.employee?.filter(
      (item, index) => index !== clickIndex
    );
    setProjectData({
      ...projectData,
      employee: newEmployeeData,
    });
  };

  const getEmployeeNameBYId = (employeeId) => {
    const employeeData = employeeNameList?.find(
      (employee) => employee.id == employeeId
    );
    const employeeName = `${employeeData?.firstName} ${employeeData?.lastName}`;
    return employeeName;
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
            width: "60%",
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
            <div className="col-md-6" style={{ marginRight: 40 }}>
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
            <div className="col-md-6" style={{ marginRight: 40 }}>
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

        <div style={{ borderRight: "2px solid grey", marginLeft: 20 }}></div>

        <div
          style={{
            width: "30%",
            marginLeft: 15,
            marginRight: 100,
            marginTop: 30,
          }}
        >
          {projectData?.employee?.length > 0 ? (
            <>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                Employee On Project{" "}
                <i
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  class="bi bi-plus-circle-fill"
                  onClick={handleIconClick}
                ></i>{" "}
              </div>
              {projectData.employee.map((employee, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    border: "1px solid grey",
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      {index + 1}. {getEmployeeNameBYId(employee.employeeId)}
                    </div>
                    <div> {employee.employeeAllocation}</div>
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      marginRight: 16,
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteEmployee(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div>
                Click On <i class="bi bi-plus-circle-fill"></i> To Add Employee
                On Project
              </div>

              <div style={{ marginLeft: 250, marginTop: 10 }}>
                {" "}
                <i
                  style={{ fontSize: 25, cursor: "pointer" }}
                  class="bi bi-plus-circle-fill"
                  onClick={handleIconClick}
                ></i>
              </div>
            </>
          )}

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
                    className={`form-control ${
                      isEmployeeError && addEmployeeModalDataError?.employeeId
                        ? "is-invalid"
                        : ""
                    }`}
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
                  {isEmployeeError && addEmployeeModalDataError?.employeeId && (
                    <div className="invalid-feedback">
                      {addEmployeeModalDataError?.employeeId}
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
                      isEmployeeError &&
                      addEmployeeModalDataError?.employeeAllocation
                        ? "is-invalid"
                        : ""
                    }`}
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
                  {isEmployeeError &&
                    addEmployeeModalDataError?.employeeAllocation && (
                      <div className="invalid-feedback">
                        {addEmployeeModalDataError?.employeeAllocation}
                      </div>
                    )}
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
