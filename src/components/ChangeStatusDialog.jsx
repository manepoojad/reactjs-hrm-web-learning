import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API_ROUTES_PATH } from "../helper/Constants";
import fetchInterceptor from "../helper/fetchInterceptor";

const ChangeStatusModal = ({
  show,
  handleClose = () => {},
  id,
  getEmployeeList = () => {},
}) => {
  const [lookupData, setLookupData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [statusData, setStatusData] = useState({
    comment: "",
    lookupId: "",
  });

  useEffect(() => {
    getAllLookupList();
  }, []);

  const handleChangeEmployeeStatus = async () => {
    const responseData = await fetchInterceptor(
      `http://localhost:8888/api/employee/${id}/statusOfemployee`,
      {
        method: "POST",
        body: statusData,
      }
    );
    getEmployeeList()
    handleClose();

    return responseData;
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

  const statusLookup = lookupData?.find(
    (lookup) => lookup.lookupType === "employeeStatusInCompany"
  );
  const statusLookupList = statusLookup?.lookups;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-evenly">
          <div className="col-md-3">
            <label className="form-label personal-label">
              Status<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="lookupId"
              className="form-select"
              aria-label=".form-select-lg example"
              value={statusData?.lookupId}
              onChange={handleInputChange}
              required
            >
              <option defaultValue disabled value="">
                Status
              </option>
              {statusLookupList?.[0] &&
                statusLookupList.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <div className="invalid-feedback">Please select a status.</div>
          </div>

          <div className="col-md-5">
            <label className="form-label personal-label">
              Comment<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="comment"
              className="form-control"
              placeholder="e.g. xyz"
              value={statusData?.comment || ""}
              onChange={handleInputChange}
              required
            />
            {!isError && (
              <div className="invalid-feedback">Please Enter Comment.</div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleChangeEmployeeStatus()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeStatusModal;