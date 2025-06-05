import React from "react";
import Header from "../../../header/header";
import SidebarMenu from "../sidebar/sidemenu";
import "./institute.css"; 
import DashBoard from "../dashboard";
import TestStatusBar from "../teststaus/teststatus";
import General from "../../General/General";
import { Routes, Route } from "react-router-dom";

const Institute=()=> {
  // return (
  //   <>
  //     <Header />
  //     <div className="institute-layout">
       
  //       <SidebarMenu className="sidebar" />

      
  //       <div className="content">
  //           <DashBoard/>
  //           <TestStatusBar/>
  //       </div>
  //     </div>
  //   </>
  // );

   return (
    <>
      <Header />
      <div className="institute-layout">
        {/* Sidebar on the left */}
        {/* <SidebarMenu className="sidebar" /> */}

        {/* Content area on the right */}
        <div className="content">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/class" element={<General />} />
            {/* <Route path="/teachers" element={<Scheduled />} />
            <Route path="/questionbank" element={<UnScheduled />} />
            <Route path="/test" element={<Teachers />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog-manage" element={<BlogManage />} />
            <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Institute;
