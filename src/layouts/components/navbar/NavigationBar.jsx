import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { EmployeeMenu, HrMenu, ManagerMenu } from "src/helper/menuList";

const NavigationBar = (props) => {
  const location = useLocation();
  const [menuList, setMenuList] = useState(EmployeeMenu);

  useEffect(() => {
    const rolesStringify = localStorage.getItem("roles");
    const roles = JSON.parse(rolesStringify);
    if (roles.includes("Admin") || roles.includes("HR")) {
      setMenuList(HrMenu);
    } else if (roles.includes("Manager")) {
      setMenuList(ManagerMenu);
    }
  }, []);

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
          {menuList.map((menuObject) => (
            <li style={{ display: "inline", margin: 8 }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: isActiveLink(menuObject.path) ? "black" : "white",
                  fontWeight: isActiveLink(menuObject.path) ? "bold" : "normal",
                }}
                to={menuObject.path}
              >
                {menuObject.label}
              </Link>
            </li>
          ))}
         
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
