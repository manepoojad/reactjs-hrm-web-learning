import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeLeaves from "./EmployeeLeaves";
import MyLeaves from "./MyLeaves";

const LeaveList = () => {
  const navigate = useNavigate();
  const [wizardIndex, setWizardIndex] = useState(0);
  // const [filteredLeaveList, setFilteredLeaveList] = useState([]);
  // const leaveListRef = useRef();

  // useEffect(() => {
  //   getLeaveList();
  // }, []);

  // const getLeaveList = async () => {
  //   try {
  //     const responseData = await fetchInterceptor("/leave", {
  //       method: "GET",
  //     });

  //     leaveListRef.current = responseData?.leaveList;
  //     setFilteredLeaveList(responseData?.leaveList);
  //   } catch (error) {}
  // };

  const role = JSON.parse(localStorage.getItem("roles"));

  let wizardData = [
    {
      key: 1,
      title: "My Leaves",
      component: MyLeaves,
    },
  ];

  if (role == "HR" || role =="Manager") {
    wizardData = [
      {
        key: 0,
        title: "Employee Leaves",
        component: EmployeeLeaves,
      },
      ...wizardData,
    ];
  }

  const handlePrevious = () => {
    setWizardIndex(wizardIndex - 1);
  };

  const handleWizardChange = (index) => {
    setWizardIndex(index);
  };

  const WizardComponent = wizardData?.[wizardIndex]?.component;
  return (
    <>
      <div>
        <div
          className="d-flex flex-direction-row justify-content-evenly"
          style={{ backgroundColor: "#00ce3f" }}
        >
          {wizardData.map((item, index) => (
            <label
              key={index}
              onClick={() => handleWizardChange(index)}
              role="button"
              className="m-3 fw-bold h5"
              style={{
                color: index === wizardIndex ? "white" : "black",
                // backgroundColor: index === wizardIndex ? "#00ce3f" : "black",
              }}
            >
              {item.title}
            </label>
          ))}
        </div>
        <div>
          <WizardComponent
          // formData={leaveListRef.current}
          // filteredLeaveList={filteredLeaveList}
          // setFilteredLeaveList={setFilteredLeaveList}
          // getLeaveList={getLeaveList}
          // handleWizardInputChange={handleWizardInputChange}
          // isError={isError}
          />
        </div>
      </div>
    </>
  );
};

export default LeaveList;
