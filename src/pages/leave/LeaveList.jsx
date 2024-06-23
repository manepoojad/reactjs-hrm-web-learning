import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import fetchInterceptor from "src/helper/fetchInterceptor";

const LeaveList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const leaveListRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLeaveList, setFilteredLeaveList] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    getLeaveList();
  }, []);

  const getLeaveList = async () => {
    try {
      const responseData = await fetchInterceptor(
        "http://localhost:8888/api/leave",
        {
          method: "GET",
        }
      );

      leaveListRef.current = responseData?.leaveList;
      setFilteredLeaveList(responseData?.leaveList);
    } catch (error) {}
  };

  const AddLeave = () => {
    navigate("/leave/create");
  };

  const handleSearchLeave = (e) => {
    const { value } = e.target;

    const filteredList =
      leaveListRef.current &&
      leaveListRef.current.filter((item, index) => {
        return item.employeeName.toLowerCase().includes(value.toLowerCase());
      });

    setFilteredLeaveList(filteredList);
  };

  const getPaginationData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedLeaveList = filteredLeaveList?.slice(
      indexOfFirstItem, // 0
      indexOfLastItem // 5
    );

    const totalPages = Math.ceil(filteredLeaveList?.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const returnData = {
      pageNumbers: pageNumbers,
      indexOfFirstItem: indexOfFirstItem,
      paginatedLeaveList: paginatedLeaveList,
    };

    return returnData;
  };

  const { pageNumbers, indexOfFirstItem, paginatedLeaveList } =
    getPaginationData();

  const handleDeleteLeave = async (leaveId, clickIndex) => {
    console.log(clickIndex);
    try {
      await fetchInterceptor(`http://localhost:8888/api/leave/${leaveId}`, {
        method: "DELETE",
      });

      getLeaveList();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  return (
    <>
      {" "}
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search by Project Name..."
          onChange={(e) => handleSearchLeave(e)}
          style={{ margin: 16, borderRadius: 10, width: "15%", padding: 10 }}
        />
        <Button
          type="button"
          className="me-3  btn btn-dark mb-3 ms-1 mt-3"
          onClick={AddLeave}
        >
          Add Leave
        </Button>
      </div>
      <table className="table table-dark  table-hover table-striped table-bordered">
        <thead style={{ borderBottom: "solid" }}>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeaveList && paginatedLeaveList?.length > 0 ? (
            paginatedLeaveList.map((leave, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{leave?.employeeName}</td>
                  <td>{leave?.title}</td>
                  <td>{leave?.description}</td>
                  <td>{leave?.leaveType}</td>
                  <td>{leave?.status}</td>
                  <td>{leave?.comment}</td>

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
                      title="Edit leave Details"
                      onClick={() => {
                        navigate(`/leave/${leave?.id}`);
                      }}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm mx-2 "
                      title="Remove Employee"
                      onClick={() => handleDeleteLeave(leave.id, index)}
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
          disabled={paginatedLeaveList?.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default LeaveList;
