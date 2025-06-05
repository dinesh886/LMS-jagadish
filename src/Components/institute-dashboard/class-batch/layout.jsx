import React from "react";
import Header from "../../header/header";
import ClassSideMenu from "./classsidemenu/classsidemenu";
import ClassDetailPageSideMenu from "./classdetailspage/classdetailpagesidemenu";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  console.log("Current Path:", location.pathname); // Debugging

  // ✅ Correct condition to check if the page is class details

  const isClassDetailPage = location.pathname.includes("/classdetailpage");

  return (
    <>
      <div className="layout-container">
     
        <div className="layout-main">
          {/* Conditionally render the sidebar */}
          {isClassDetailPage ? (
            <ClassDetailPageSideMenu className="class-detail-sidebar" />
          ) : (
            <ClassSideMenu className="class-sidebar" />
          )}

          {/* Main Content Area */}
          <main className="layout-content">
            <Outlet /> {/* ✅ This ensures ClassDetailsPage renders correctly */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
