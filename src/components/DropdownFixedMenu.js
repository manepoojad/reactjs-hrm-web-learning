import React, { useEffect, useRef, useState } from "react";

const DropdownFixedMenu = ({
  show,
  handleClose = () => {},
  handleOpenDialog = () => {},
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickEvent = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickEvent);

    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="btn btn-outline-info btn-sm mx-2"
        type="button"
        id="dropdownMenuButton2"
        style={{ border: "none" }}
        onClick={toggleDropdown}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      {isOpen && (
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="dropdownMenuButton2"
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 1,
            display: "inline-block",
          }}
        >
          <li>
            <a
              className="dropdown-item"
              role="button"
              onClick={handleOpenDialog}
            >
              Change Status
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              role="button"
              onClick={() => {
                // setIsOpen(false);
              }}
            >
              Delete
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              role="button"
              onClick={() => {
                // setIsOpen(false);
              }}
            >
              Item 2
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownFixedMenu;
