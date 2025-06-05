// MainDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import DashboardIndex from "../DashboardIndex/DashboardIndex";
import General from "../General/General";
import Sheduled from "../Sheduled/Sheduled";
import UpcomingTestDetails from "../ThreeTests/UpcomingTestDetails/UpcomingTestDetails";
import UnScheduled from "../UnScheduled/UnScheduled"; // Make sure this is imported
import CurrentRunningTestDetails from "../ThreeTests/Current-Running-Test-Details/CurrentRunningTestDetails";
import CompletedTestDetails from "../ThreeTests/Completed-test-details/CompletedTestDetails";
import TestStudentOverview from "../ThreeTests/Test-Student-Overview/TestStudentOverview";
import UnscheduledTestDetails from "../ThreeTests/UnscheduledTestDetails/UnscheduledTestDetails";

const MainDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardIndex />} />
        <Route path="general" element={<General />} />
        <Route path="sheduled" element={<Sheduled />} />
        {/* Change this line to use UnScheduled instead of UnscheduledTest */}
        <Route path="unscheduled" element={<UnScheduled />} />
        <Route path="unscheduled/unscheduledtest-details/:id" element={<UnscheduledTestDetails />} />


        {/* Other detail routes */}
        <Route path="sheduled/current-running-test-details/:id" element={<CurrentRunningTestDetails />} />
        {/* <Route path="unscheduledtest-details/:id" element={<UnscheduledTestDetails />} /> */}
        <Route path="sheduled/upcoming-test-details/:id" element={<UpcomingTestDetails />} />

        <Route path="completed-test-details/:testId">
          <Route index element={<CompletedTestDetails />} />
          <Route path="teststudent-overview/:studentId" element={<TestStudentOverview />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainDashboard;