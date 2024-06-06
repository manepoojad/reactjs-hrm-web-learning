import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";

const ClientList = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);
  const [filteredClientList, setFilteredClientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getClientList();
  }, [currentPage]);

  const getClientList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_CLIENT_LIST,
        {
          method: "GET",
        }
      );

      setClientList(responseData?.clients);
      setFilteredClientList(responseData?.clients);
    } catch (error) {}
  };

  const addClient = () => {
    navigate("/client/create");
  };

  const handleDeleteEmployee = (id) => {
    console.log(id);
  };

  const handleSearchClient = (e) => {
    const { value } = e.target;

    const filteredList =
      clientList &&
      clientList.filter((item, index) => {
        return item.companyName.toLowerCase().includes(value.toLowerCase());
      });

    setFilteredClientList(filteredList);
  };

  const getPaginationData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedClientList = filteredClientList?.slice(
      indexOfFirstItem, // 0
      indexOfLastItem // 5
    );

    const totalPages = Math.ceil(filteredClientList?.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const returnData = {
      pageNumbers: pageNumbers,
      indexOfFirstItem: indexOfFirstItem,
      paginatedClientList: paginatedClientList,
    };

    return returnData;
  };

  const { pageNumbers, indexOfFirstItem, paginatedClientList } =
    getPaginationData();

  return (
    <>
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search by Company Name..."
          onChange={(e) => handleSearchClient(e)}
          style={{ margin: 5, borderRadius: 10, width: "15%" }}
        />
        <button
          type="button"
          className="me-3  btn btn-dark mb-2 ms-1"
          onClick={addClient}
        >
          Add Client
        </button>
      </div>
      <table className="table table-dark  table-hover table-striped table-bordered">
        <thead style={{ borderBottom: "solid" }}>
          <tr>
            <th>Sr.no</th>
            <th>Company Name</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Primary Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClientList && paginatedClientList?.length > 0 ? (
            paginatedClientList.map((client, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{client?.companyName}</td>
                  <td>{client?.country}</td>
                  <td>{client?.phoneNumber}</td>
                  <td>{client?.email}</td>
                  <td>{client?.primaryContact}</td>
                  <td>
                    <button
                      className="btn btn-outline-success btn-sm mx-2"
                      //   onClick={() => {
                      //     navigate(`/client/${client?.id}`);
                      //   }}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button
                      className="btn btn-outline-success btn-md mx-2"
                      title="Edit Client Details"
                      onClick={() => {
                        navigate(`/client/${client?.id}`, {
                          state: { client },
                        });
                      }}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm mx-2 "
                      title="Remove Employee"
                      //   onClick={() => handleDeleteEmployee(employee.id)}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-trash"></i>
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

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{
              margin: "8px",
              padding: 8,
              backgroundColor: currentPage === number ? "GrayText" : "",
              borderRadius: 30,
            }}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={paginatedClientList?.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ClientList;
