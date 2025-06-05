import React, { useState, useEffect } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faExpand,
  faCompress,
  faUser,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // State to toggle fullscreen mode
  const [isFullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    // Listen for fullscreen changes and update state
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="navbar-header">
      <div className="d-flex">
        {/* LOGO */}
        <div className="navbar-brand-box">
          <a href="#" className="logo logo-light">
            <span className="logo-sm d-none">
              <img src="#" alt="Logo Small Light" height="40" />
            </span>
            <span className="logo-lg">
              <span className="l-class">L</span>MS Institute
            </span>
          </a>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect"
          id="vertical-menu-btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* App Search */}
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Menu Search..."
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </form>
      </div>

      <div className="d-flex">
        {/* Fullscreen Button */}
        <div className="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            className="btn header-item noti-icon waves-effect"
            onClick={toggleFullscreen}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown d-inline-block">
          <button
            type="button"
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownVisible ? "true" : "false"} // Dynamically set aria-expanded
          >
            <FontAwesomeIcon
              icon={faUser}
              className="rounded-circle header-profile-user"
              style={{
                color: "white",
                fontSize: "30px",
                backgroundColor: "#007bff",
                padding: "5px",
              }}
            />
            <span className="d-none d-xl-inline-block ms-1" key="t-henry">
              User
            </span>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </button>

          {/* Conditionally render the dropdown */}
          {isDropdownVisible && (
            <div className="dropdown-menu dropdown-menu-end d-flex flex-column">
              {/* Profile */}
              <a className="dropdown-item" href="#">
                <FontAwesomeIcon
                  icon={faUser}
                  className="font-size-16 align-middle me-1"
                />
                <span key="t-profile">Profile</span>
              </a>
              {/* Logout */}
              <a className="dropdown-item text-danger" href="#">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="font-size-16 align-middle me-1 text-danger"
                />
                <span key="t-logout">Logout</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
