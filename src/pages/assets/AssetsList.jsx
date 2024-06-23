import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "../../helper/Constants";
import fetchInterceptor from "../../helper/fetchInterceptor";

const AssetsList = () => {
  const navigate = useNavigate();
  const assetListRef = useRef([]);
  const [filteredAssetsList, setFilteredAssetsList] = useState([]);
  const [lookupData, setLookupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getAssetsList();
    getAllLookupList();
  }, [currentPage]);

  const getAssetsList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_ASSETS_LIST,
        {
          method: "GET",
        }
      );

      assetListRef.current = responseData?.assetList;
      setFilteredAssetsList(responseData?.assetList);
    } catch (error) {}
  };

  const addAssets = () => {
    navigate("/assets/create");
  };

  const handleDeleteEmployee = (id) => {
    console.log(id);
  };

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

  const getAllLookupList = async () => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
        {
          method: "GET",
        }
      );
      setLookupData(responseData.lookupData);
    } catch (error) {
      console.error("Error fetching lookup data:", error);
    }
  };

  const assetsStatusLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "assetStatus"
  );
  const assetStatusLookupList = assetsStatusLookup?.lookups;

  const assetsTypeLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "assetType"
  );
  const assetTypeLookupList = assetsTypeLookup?.lookups;

  return (
    <>
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
                  <td>{assetTypeLabel}</td>
                  <td>{assetStatusLabel}</td>
                  <td>{asset?.companyName}</td>
                  <td>{asset?.serialNumber}</td>
                  <td>{asset?.modelName}</td>
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
                        navigate(`/assets/${asset?.id}`, {
                          state: { asset },
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
          disabled={paginatedAssetsList?.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AssetsList;
