import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import fetchInterceptor from "src/helper/fetchInterceptor";

const ProjectList = () => {
  const location=useLocation()
  console.log(location);
  const projectData=location?.state?.responseData?.project
  const navigate = useNavigate();
  const projectListRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProjectList, setFilteredProjectList] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = async () => {
    try {
      const responseData = await fetchInterceptor(
        "http://localhost:8888/api/project",
        {
          method: "GET",
        }
      );

      projectListRef.current = responseData?.project;
      setFilteredProjectList(responseData?.project);
    } catch (error) {}
  };

  const project = projectListRef.current;
  const projectItem = project?.find((project) => project?.clientId);

  const AddProject = () => {
    navigate("/project/create", {
      state: { projectItem },
    });
  };

  const handleSearchProject = (e) => {
    const { value } = e.target;

    const filteredList =
      projectListRef.current &&
      projectListRef.current.filter((item, index) => {
        return item.projectName.toLowerCase().includes(value.toLowerCase());
      });

    setFilteredProjectList(filteredList);
  };

  const getPaginationData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedProjectList = filteredProjectList?.slice(
      indexOfFirstItem, // 0
      indexOfLastItem // 5
    );

    const totalPages = Math.ceil(filteredProjectList?.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const returnData = {
      pageNumbers: pageNumbers,
      indexOfFirstItem: indexOfFirstItem,
      paginatedProjectList: paginatedProjectList,
    };

    return returnData;
  };

  const { pageNumbers, indexOfFirstItem, paginatedProjectList } =
    getPaginationData();

  return (
    <>
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search by Project Name..."
          onChange={(e) => handleSearchProject(e)}
          style={{ margin: 16, borderRadius: 10, width: "15%", padding: 10 }}
        />
        <Button
          type="button"
          className="me-3  btn btn-dark mb-3 ms-1 mt-3"
          onClick={AddProject}
        >
          Add Project
        </Button>
      </div>
      <table className="table table-dark  table-hover table-striped table-bordered">
        <thead style={{ borderBottom: "solid" }}>
          <tr>
            <th>ID</th>
            <th>projectName</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProjectList && paginatedProjectList?.length > 0 ? (
            paginatedProjectList.map((project, index) => {
              const startDate = moment(project?.startDate).format("DD/MM/YYYY");

              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{project?.projectName}</td>
                  <td>{project?.status}</td>
                  <td>{startDate}</td>
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
                      title="Edit Project Details"
                      onClick={() => {
                        navigate(`/project/${project?.id}`, {
                          state: { projectData },
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
          disabled={paginatedProjectList?.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProjectList;
