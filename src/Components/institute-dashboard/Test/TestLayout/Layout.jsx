import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TestSidebar from "../TestSidebar/TestSidebar";
import Header from "../../../header/header";
import "./Layout.css";
import TestAddSideabr from "../TestAddSideabr/TestAddSideabr";
import TestQuestionAddSidebar from '../TestQuestionAdd/TestQuestionAddSidebar'
import { TestProvider } from "../TestContext";

const Layout = () => {
  const location = useLocation();

  const isTestAdd = location.pathname.includes("/movetest");
  const isTestQuestionAdd = location.pathname.includes("/testquestionadd");

  return (
    <TestProvider>
      <div className="layout-container">
        {/* Header */}
        {/* <header className="layout-header">
          <Header />
        </header> */}

        {/* Main Content Area with Sidebar */}
        <div className="layout-main">
          {/* Conditionally Render Sidebar */}
          {isTestQuestionAdd ? (
            <TestQuestionAddSidebar />
          ) : isTestAdd ? (
            <TestAddSideabr />
          ) : (
            <TestSidebar />
          )}

          {/* Page Content */}
          <main className="layout-content">
            <Outlet />
          </main>
        </div>
      </div>
    </TestProvider>
  );
};

export default Layout;