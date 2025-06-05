import React, { useState } from 'react';
import TeachersSidebar from '../TeachersSideabr/TeachersSidebar'
import { Outlet } from "react-router-dom";
import Header from '../../../header/header';
import './Layout.css'
const Layout = () => {
   const [teachersEmails, setTeachersEmails] = useState([]); // Shared state for teachers' emails
  return (
   <div className="layout-container">
      {/* Header */}
    
      {/* TopBar */}
     
    
      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {/* Sidebar */}
        <TeachersSidebar setTeachersEmails={setTeachersEmails}/>{/* Pass setter */}


        {/* Page Content */}
        <main className="layout-content">
          <Outlet context={[teachersEmails, setTeachersEmails]}/> {/* Pass state as context */}
        </main>
      </div>
    </div>
  )
}

export default Layout