import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAssetsBySpecificEmployeeIdAction } from "src/redux/thunk/assetsThunk";

const MyAssets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lookup = useSelector((state) => state?.lookup?.lookupData);
  const assetListRef = useRef([]);
  const [filteredAssetsList, setFilteredAssetsList] = useState([]);
  //   const [showDialog, setShowDialog] = useState(false);
  // const [lookupData, setLookupData] = useState([]);
  //   const [selectedAssets, setSelectedAssets] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getAssetsList();
    // getAllLookupList();
  }, [currentPage]);

  const employeeId = JSON.parse(localStorage.getItem("employeeId"));


  const getAssetsList = async () => {
    try {
      const responseData = await dispatch(
        getAssetsBySpecificEmployeeIdAction(employeeId)
      ).unwrap();
      //   const responseData = await fetchInterceptor(
      //     `/employee/${employeeId}/asset`,
      //     {
      //       method: "GET",
      //     }
      //   );

      assetListRef.current = responseData;
      setFilteredAssetsList(responseData);
    } catch (error) {}
  };

//   console.log(filteredAssetsList);
  const addAssets = () => {
    navigate("/assets/create");
  };

//   const handleDeleteEmployee = (id) => {
//     console.log(id);
//   };

  //   const handleOpenDialog = (assets) => {
  //     setSelectedAssets(assets);
  //     setShowDialog(true);
  //   };
  //   console.log("selected", selectedAssets);

  //   const handleCloseDialog = () => {
  //     setShowDialog(false);
  //   };

  const handleSearchClient = (e) => {
    const { value } = e.target;

    const filteredList =
      assetListRef.current &&
      assetListRef.current.filter((item, index) => {
        return item.companyName.toLowerCase().includes(value.toLowerCase());
      });

    setFilteredAssetsList(filteredList);
  };

  const getPaginationData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedAssetsList = filteredAssetsList?.slice(
      indexOfFirstItem, // 0
      indexOfLastItem // 5
    );

    const totalPages = Math.ceil(filteredAssetsList?.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const returnData = {
      pageNumbers: pageNumbers,
      indexOfFirstItem: indexOfFirstItem,
      paginatedAssetsList: paginatedAssetsList,
    };

    return returnData;
  };

  const { pageNumbers, indexOfFirstItem, paginatedAssetsList } =
    getPaginationData();

  // const getAllLookupList = async () => {
  //   try {
  //     const responseData = await fetchInterceptor(
  //       API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     setLookupData(responseData.lookupData);
  //   } catch (error) {
  //     console.error("Error fetching lookup data:", error);
  //   }
  // };

  const assetsStatusLookup = lookup?.find(
    (lookup) => lookup.lookupType === "assetStatus"
  );
  const assetStatusLookupList = assetsStatusLookup?.lookups;

  const assetsTypeLookup = lookup?.find(
    (lookup) => lookup.lookupType === "assetType"
  );
  const assetTypeLookupList = assetsTypeLookup?.lookups;

  return (
    <>
      {/* {showDialog && (
        <AssignAssetsDialog
          show={showDialog}
          handleClose={handleCloseDialog}
          selectedAssets={selectedAssets}
          getAssetsList={getAssetsList}
        />
      )} */}

      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search by Company Name..."
          onChange={(e) => handleSearchClient(e)}
          style={{ margin: 16, borderRadius: 10, width: "15%", padding: 10 }}
        />
        <Button
          type="button"
          className="me-3  btn btn-dark mb-3 ms-1 mt-3"
          onClick={addAssets}
        >
          Add Assets
        </Button>
      </div>
      <table className="table table-dark  table-hover table-striped table-bordered">
        <thead style={{ borderBottom: "solid" }}>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Condition Status</th>
            <th>Company Name</th>
            <th>Serial Number</th>
            <th>Model Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAssetsList && paginatedAssetsList?.length > 0 ? (
            paginatedAssetsList.map((asset, index) => {
              {/* console.log(asset); */}
              const assetsStatusLookupData = assetStatusLookupList?.find(
                (lookup) => lookup?.id === asset?.assetStatusLookupId
              );

              const assetStatusLabel = assetsStatusLookupData
                ? assetsStatusLookupData?.label
                : "";

              const assetsTypeLookupData = assetTypeLookupList?.find(
                (lookup) => lookup?.id === asset?.assetTypeLookupId
              );

              const assetTypeLabel = assetsTypeLookupData
                ? assetsTypeLookupData?.label
                : "";

              return (
                <tr key={index}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{asset?.assetTypeLookupId}</td>
                  <td>{asset?.assetStatusLookupId}</td>
                  <td>{asset?.companyName}</td>
                  <td>{asset?.serialNumber}</td>
                  <td>{asset?.modelName}</td>
                  <td>
                    {/* <button
                      className="btn btn-outline-success btn-sm mx-2"
                      //   onClick={() => {
                      //     navigate(`/client/${client?.id}`);
                      //   }}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-eye-fill"></i>
                    </button> */}
                    <button
                      className="btn btn-outline-success btn-md mx-2"
                      title="Edit Asset Details"
                      onClick={() => {
                        navigate(`/assets/${asset?.id}`, {
                          state: { asset },
                        });
                      }}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                    {/* <button
                      className="btn btn-outline-danger btn-sm mx-2 "
                      title="Remove Employee"
                      //   onClick={() => handleDeleteEmployee(employee.id)}
                      style={{ border: "none" }}
                    >
                      <i className="bi bi-trash"></i>
                    </button> */}
                    {/* <AssignAssetMenu
                      show={showDialog}
                      handleClose={handleCloseDialog}
                      handleOpenDialog={() =>
                        handleOpenDialog(
                          asset?.assetTypeLookupId
                          // asset?.firstName,
                          // asset?.lastName
                        )
                      }
                    /> */}
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
          disabled={paginatedAssetsList?.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MyAssets;
