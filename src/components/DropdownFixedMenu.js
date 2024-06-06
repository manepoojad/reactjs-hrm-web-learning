import React, { useEffect, useRef, useState } from "react";

const DropdownFixedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: "relative", display: "inline-block", }}>
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
            <button
              className="dropdown-item"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Change Status
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Item 1
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Item 2
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownFixedMenu;
