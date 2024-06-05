import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";


const EmployeeList = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    try {
      // const jwtToken = Cookies.get("jwtToken");
      // const response = await fetch(API_ROUTES_PATH.GET_EMPLOYEE_LIST, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `${jwtToken}`,
      //   },
      // });
      // if (!response.ok) {
      //   throw new Error("Response not ok. ");
      // }
      // const responseData = await response.json();
      const responseData = await fetchInterceptor(API_ROUTES_PATH.GET_EMPLOYEE_LIST, {
        method: "GET"
      })
      setEmployeeList(responseData);
    } catch (error) {}
  };

  const addEmployee = () => {
    navigate("/employee/create");
  };
  const handleDeleteEmployee = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-3  btn btn-dark mb-2 ms-1"
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>
      <table className="table table-dark  table-hover table-striped table-bordered">
        <thead style={{ borderBottom: "solid" }}>
          <tr>
            <th>Sr.no</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList?.employeeList &&
            employeeList?.employeeList.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee?.firstName}</td>
                  <td>{employee?.lastName}</td>
                  <td>{employee?.email}</td>
                  <td>{employee?.status}</td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm mx-2"
                      // title="Edit Employee Details"
                      onClick={() => {
                        navigate(`/employee/${employee.id}`);
                      }}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm mx-2 "
                      title="Remove Employee"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="btn btn-outline-info btn-sm mx-2 "
                      type="button"
                      id="dropdownMenuButton2"
                      style={{ border: "none" }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      title="Change Status"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default EmployeeList;
