import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeListAction } from "src/redux/thunk/employeeThunk";
import fetchInterceptor from "../helper/fetchInterceptor";
import "./status.css";

const AssignAssetsDialog = ({
  show,
  handleClose = () => {},
  selectedAssets,
  getAssetsList = () => {},
}) => {
  console.log(selectedAssets);
  const dispatch = useDispatch();
  const lookup = useSelector((state) => state?.lookup?.lookupData);
  const [employeeList, setEmployeeList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  // const [assetsList, setAssetsList] = useState([]);
  const [assetsData, setAssetsData] = useState({
    assignedComment: "",
    assetId: selectedAssets?.assetsId,
    employeeId: "",
  });

  useEffect(() => {
    getEmployeeList();
    // getAssetsList();
  }, []);

  const assetList = lookup.find((asset) => asset);
  console.log(assetList);

  const employeeId = JSON.parse(localStorage.getItem("employeeId"));

  const getEmployeeList = async () => {
    try {
      const responseData = await dispatch(getEmployeeListAction()).unwrap();
      setEmployeeList(responseData?.employeeList);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  const handleChangeEmployeeStatus = () => {
    if (
      !assetsData.assetId ||
      !assetsData.employeeId ||
      !assetsData.assignedComment
    ) {
      setIsError(true);
      return;
    }
    setConfirmModalOpen(true);
  };

  // const getAssetsList = async () => {
  //   try {
  //     const responseData = await fetchInterceptor(
  //       `/employee/${employeeId}/asset`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     setAssetsList(
  //       responseData?.getAllAssetsForSpecificEmployeeResponse?.asset
  //     );
  //     //   handleClose();
  //     //   setConfirmModalOpen(false);
  //     return responseData;
  //   } catch (error) {
  //     console.error("Error confirming status change:", error);
  //   }
  // };

  const confirmStatusChange = async () => {
    try {
      const payload = {
        assignedComment: assetsData.assignedComment,
      };
      const responseData = await fetchInterceptor(
        `/employee/${assetsData.employeeId}/asset/${assetsData.assetId}`,
        {
          method: "POST",
          body: payload,
        }
      );
      getAssetsList();
      handleClose();
      setConfirmModalOpen(false);
      return responseData;
    } catch (error) {
      console.error("Error confirming status change:", error);
    }
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  // const assetLookup = lookup?.find(
  //   (lookup) => lookup.lookupType === "assetType"
  // );
  // const assetLookupList = assetLookup?.lookups;
  // console.log(assetLookupList);
  // const assetLookupData = assetLookupList?.find(
  //   (lookup) => lookup?.id === selectedAssets
  // );
  // const assetsLabel = assetLookupData ? assetLookupData?.label : "";
  // console.log(assetsLabel);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <>
      {/* Confirm modal */}
      <Modal
        dialogClassName="custom-modal"
        show={confirmModalOpen}
        onHide={handleCloseConfirmModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to assign the selected asset to the employee?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            No
          </Button>
          <Button variant="primary" onClick={confirmStatusChange}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show && !confirmModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Asset To Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-evenly">
            <div className="col-md-4">
              <label className="form-label personal-label">
                Asset<span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="assetId"
                className="form-select"
                aria-label=".form-select-lg example"
                value={assetsData.assetId}
                onChange={handleInputChange}
                required
              >
                <option defaultValue disabled value="">
                  Select Asset
                </option>
                {/* {assetLookupList?.map((item, index) => ( */}
                <option key={assetsData.assetId} value={assetsData.assetId}>
                  {selectedAssets?.assetsLabel}
                </option>
                {/* ))} */}
              </select>
              {isError && !assetsData.assetId && (
                <div className="invalid-feedback d-block">
                  Please select an asset.
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label personal-label">
                Employee Name<span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="employeeId"
                className="form-select"
                aria-label=".form-select-lg example"
                value={assetsData.employeeId}
                onChange={handleInputChange}
                required
              >
                <option defaultValue disabled value="">
                  Select Employee
                </option>
                {employeeList?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.firstName} {item.lastName}
                  </option>
                ))}
              </select>
              {isError && !assetsData.employeeId && (
                <div className="invalid-feedback d-block">
                  Please select an employee.
                </div>
              )}
            </div>

            <div className="col-md-3">
              <label className="form-label personal-label">
                Comment<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="assignedComment"
                className="form-control"
                placeholder="e.g. xyz"
                value={assetsData.assignedComment}
                onChange={handleInputChange}
                required
              />
              {isError && !assetsData.assignedComment && (
                <div className="invalid-feedback d-block">
                  Please enter a comment.
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangeEmployeeStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignAssetsDialog;
