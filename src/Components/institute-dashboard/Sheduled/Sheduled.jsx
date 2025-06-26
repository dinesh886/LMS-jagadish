import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sheduled.css";
import CurrentRunningTest from "../ThreeTests/CurrentRunningTest/CurrentRunningTest";
import UpcomingTest from "../ThreeTests/UpcommingTest/UpcommingTest";
import PastTest from "../ThreeTests/PastTests/PastTest";
import Header from '../../header/header';
import CompletedTestDetails from "../ThreeTests/Completed-test-details/CompletedTestDetails";
import CompletedTest from "../ThreeTests/Completed-Test/CompletedTest";
import TestStudentOverview from "../ThreeTests/Test-Student-Overview/TestStudentOverview";
import { Helmet } from "react-helmet";
const Scheduled = () => {
  const navigate = useNavigate();
  
  // Function to navigate to the test details page with the test ID
  const handleViewDetails = (id) => {
    navigate(`/maindashboard/sheduled/current-running-test-details/${id}`);
    
  };
  // Function to navigate to the upcoming test details
  const handleUpcomingTestDetails = (id) => {
    navigate(`/maindashboard/sheduled/upcoming-test-details/${id}`);
  };
  const handleCompletedTestDetails = (id) => {
    navigate(`/maindashboard/completed-test-details/${id}`);
  };
  const viewstudenttestoverview = (id) => {
    navigate(`/maindashboard/completed-test-details/${id}`);
  };
  // Updated navigation function
  const viewStudentTestOverview = (id) => {
    navigate(`/maindashboard/teststudent-overview/${id}`);
  };
  return (
    <div className="scheduled-container">
      <Helmet>
        <title> Scheduled Tests Ongoing, Upcomming, Completed</title>
        <meta name="description" content="Scheduld Test , Ongoing,Upcomming , Completed" />
      </Helmet>
      <Header />
      {/* Pass the function as a prop */}
      <CurrentRunningTest onViewDetails={handleViewDetails} />
      <UpcomingTest onViewDetails={handleUpcomingTestDetails} />
      <CompletedTest onViewDetails={handleCompletedTestDetails} />
     

    </div>
  );
};


export default Scheduled;
