import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  useEffect(() => {
    getEmployeeList();
  }, [currentPage]);

  const getEmployeeList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_EMPLOYEE_LIST,
        {
          method: "GET",
        }
      );

      setEmployeeList(responseData?.employeeList);
      setFilteredEmployeeList(responseData?.employeeList)
    } catch (error) {}
  };

  const addEmployee = () => {
    navigate("/employee/create");
  };

  const handleDeleteEmployee = (id) => {
    console.log(id);
  };

  const handleSearchEmployee = (e) => {
    const { value } = e.target;

    const filteredList =
      employeeList &&
      employeeList.filter((item, index) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        return (
          item.firstName.toLowerCase().includes(value.toLowerCase()) ||
          item.lastName.toLowerCase().includes(value.toLowerCase()) ||
          fullName.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
        );
      });

    setFilteredEmployeeList(filteredList);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredEmployeeList?.length > 0
      ? filteredEmployeeList?.slice(indexOfFirstItem, indexOfLastItem)
      : filteredEmployeeList &&
        filteredEmployeeList?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="d-flex justify-content-end">
        <input type="text" onChange={(e) => handleSearchEmployee(e)} />
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
          {currentItems && currentItems?.length > 0 ? (
            currentItems.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{employee?.firstName}</td>
                  <td>{employee?.lastName}</td>
                  <td>{employee?.email}</td>
                  <td>{employee?.status}</td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm mx-2"
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
            })
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span
          style={{
            margin: "8px",
            padding: 8,
            backgroundColor: "GrayText",
            borderRadius: 30,
          }}
        >
          {" "}
          {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentItems?.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default EmployeeList;
