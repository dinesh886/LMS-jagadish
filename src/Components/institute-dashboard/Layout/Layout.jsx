import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../../header/header';
import SidebarMenu from "../dashboard/sidebar/sidemenu";
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      {/* <header className="layout-header">
        <Header />
      </header> */}

      {/* Main Content Area */}
      <div className="layout-main">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Page Content */}
        <main className="main-layout-content">
          <Outlet /> {/* Nested routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;