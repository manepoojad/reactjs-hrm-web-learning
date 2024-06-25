import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import fetchInterceptor from "src/helper/fetchInterceptor";
import { updateLeaveStatusAction } from "src/redux/thunk/leaveThunk";

const EmployeeLeaves = () => {
  const dispatch = useDispatch();
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
      const responseData = await fetchInterceptor("/leave", {
        method: "GET",
      });

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
      await fetchInterceptor(`/leave/${leaveId}`, {
        method: "DELETE",
      });

      getLeaveList();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateLeaveStatus = async (id, status) => {
    try {
      const leaveObject = leaveListRef.current.find((leave) => leave.id === id);
      if (!leaveObject) return;

      const payload = {
        ...leaveObject,
        status,
      };

      const responseData = await dispatch(
        updateLeaveStatusAction(payload)
      ).unwrap();

      console.log(responseData);
      getLeaveList();
    } catch (error) {
      console.log(error);
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
            {/* <th>Title</th> */}
            <th>Description</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeaveList && paginatedLeaveList?.length > 0 ? (
            paginatedLeaveList.map((leave, index) => {
              const startDate = moment(leave.startDate).format("YYYY-MM-DD");
              const endDate = moment(leave.endDate).format("YYYY-MM-DD");
              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{leave?.employeeName || "-"}</td>
                  {/* <td>{leave?.title}</td> */}
                  <td>{leave?.description || "-"}</td>
                  <td>{leave?.leaveType || "-"}</td>
                  <td>{startDate || "-"}</td>
                  <td>{endDate || "-"}</td>
                  <td>{leave?.status || "-"}</td>
                  <td>{leave?.comment || "-"}</td>

                  <td>
                    <button
                      style={{
                        border: "1px solid #00ce3f",
                        marginRight: 8,
                        color:
                          leave.status === "approved" ? "white" : "#00ce3f",
                        backgroundColor:
                          leave.status === "approved" ? "#00ce3f" : "#212529",
                      }}
                      onClick={() =>
                        handleUpdateLeaveStatus(leave.id, "approved")
                      }
                    >
                      {leave.status === "approved" ? "Approved" : "Approve"}
                    </button>
                    <button
                      style={{
                        border: "1px solid red",
                        marginRight: 8,
                        color: leave.status === "rejected" ? "white" : "red",
                        backgroundColor:
                          leave.status === "rejected" ? "red" : "#212529",
                      }}
                      onClick={() =>
                        handleUpdateLeaveStatus(leave.id, "rejected")
                      }
                    >
                      {leave.status === "rejected" ? "Rejected" : "Reject"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No data available</td>
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

export default EmployeeLeaves;
