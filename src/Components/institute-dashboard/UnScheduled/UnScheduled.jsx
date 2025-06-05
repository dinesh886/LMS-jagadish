// UnScheduled.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../header/header';
import UnscheduledTest from "../ThreeTests/UnscheduledTest/UnscheduledTest";

const UnScheduled = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    console.log("Navigating to test with ID:", id);
    navigate(`/maindashboard/unscheduled/unscheduledtest-details/${id}`); // or just `../unscheduledtest-details/${id}`

  };

  return (
    <div className="scheduled-container">
      <Header />
      <UnscheduledTest onViewDetails={handleViewDetails} />
     
    </div>
  );
};


export default UnScheduled;