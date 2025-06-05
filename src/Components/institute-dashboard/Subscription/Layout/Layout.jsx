import React, { useState } from 'react';

import { Outlet } from "react-router-dom";

import SubscriptionSidebar from '../SubscriptionSidebar/SubscriptionSidebar'

const Layout = () => {
  return (
   <div className="layout-container">
      {/* Header */}
    
      {/* TopBar */}
     
    
      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {/* Sidebar */}
       <SubscriptionSidebar />


        {/* Page Content */}
        <main className="layout-content">
          <Outlet /> {/* Pass state as context */}
        </main>
      </div>
    </div>
  )
}

export default Layout