import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = (props) => {
  const location = useLocation();

  // Function to determine if a link is active based on the current route
  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("userEmail");
    window.location = "/login";
  };

  return (
    <div>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ marginBottom: 16, backgroundColor: "#00ce3f" }}
      >
        <ul style={{ listStyleType: "none", margin: 0, padding: 16 }}>
          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/") ? "black" : "white",
                fontWeight: isActiveLink("/") ? "bold" : "normal",
              }}
              to="/"
            >
              Home
            </Link>
          </li>

          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/employeeProfile") ? "black" : "white",
                fontWeight: isActiveLink("/employeeProfile")
                  ? "bold"
                  : "normal",
              }}
              to="/employeeProfile"
            >
              <i className=" me-1 bi-person-circle"></i> Profile
            </Link>
          </li>

          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/employeeList") ? "black" : "white",
                fontWeight: isActiveLink("/employeeList") ? "bold" : "normal",
              }}
              to="/employeeList"
            >
              Employee
            </Link>
          </li>

          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/clientList") ? "black" : "white",
                fontWeight: isActiveLink("/clientList") ? "bold" : "normal",
              }}
              to="/clientList"
            >
              Client
            </Link>
          </li>

          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/assetsList") ? "black" : "white",
                fontWeight: isActiveLink("/assetsList") ? "bold" : "normal",
              }}
              to="/assetsList"
            >
              Assets
            </Link>
          </li>

          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/projectList") ? "black" : "white",
                fontWeight: isActiveLink("/projectList") ? "bold" : "normal",
              }}
              to="/projectList"
            >
              Project
            </Link>
          </li>

          <li style={{ display: "inline", margin: 8 }}>
            <Link
              style={{
                textDecoration: "none",
                color: isActiveLink("/leaveList") ? "black" : "white",
                fontWeight: isActiveLink("/leaveList") ? "bold" : "normal",
              }}
              to="/leaveList"
            >
              Leave
            </Link>
          </li>
        </ul>
        <span
          className="me-4"
          role="button"
          style={{ textAlign: "center" }}
          onClick={handleLogout}
        >
          logout
        </span>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default NavigationBar;
