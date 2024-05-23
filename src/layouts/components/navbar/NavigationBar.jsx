import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = (props) => {
  return (
    <div>
      <div style={{ margin: 30, backgroundColor: "#00ce3f" }}>
        <ul style={{ listStyleType: "none", margin: 0, padding: 16 }}>
          <li style={{ display: "inline", margin: 8 }}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Home
            </Link>
          </li>
          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employeeList"
            >
              Employee
            </Link>
          </li>
        </ul>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default NavigationBar;
