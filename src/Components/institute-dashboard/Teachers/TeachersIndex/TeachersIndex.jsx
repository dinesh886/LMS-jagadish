
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent";
import React, { useState } from "react";
import { MdOutlineArchive } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo";
import Header from "../../../header/header";
import {
  FaPaperPlane,
  FaCopy,
  FaFilePdf,
  FaArchive,
  FaTrashAlt,
  FaFolderPlus,
  FaSearch,
  FaTrash,
  FaShare,
  FaTag,
  FaEllipsisH,
  FaDownload,
  FaPlus,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaArrowUp

} from "react-icons/fa";
import './TeachersIndex.css'
// import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import { Link } from "react-router-dom"; // Import Link for navigation

const TeachersIndex = () => {
  const data =[
    { id: 1, name:"Jhon Doe", email: 'teacher1@example.com', date: '26-12-2024', status: 'Inactive' },
    { id: 2, name: "Jhon Doe", email: 'teacher2@example.com', date: '27-12-2024', status: 'Active' },
    { id: 3, name: "Jhon Doe", email: 'teacher3@example.com', date: '27-12-2024', status: 'Active' },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(5); // Set the number of rows per page
  const [showButtons, setShowButtons] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTableVisible, setDataTableVisible] = useState(false);
  const paginatedData = data.slice(0, rowsPerPage);
  const [activeStates, setActiveStates] = useState(new Map());
  const loadMore = () => {
    setRowsPerPage((prevRows) => {
      const newRows = prevRows + 5;
      if (newRows >= data.length) setShowButtons(false); // Hide buttons if all data is shown
      return newRows;
    });
  };
  const handleActive = (row) => {
    setActiveStates((prevStates) => {
      const newStates = new Map(prevStates);
      newStates.set(row.id, !prevStates.get(row.id)); // Toggle active state
      return newStates;
    });
    console.log("Toggled active state for row:", row);
    // Add your logic to update the backend or perform other actions
  };

  const fullView = () => {
    setRowsPerPage(data.length); // Show all data
    setShowButtons(false); // Hide buttons after Full View
  };



  const handleDelete = (row) => {
    console.log("Delete clicked for row:", row);
    // Add your logic to delete the row
  };



  
  const columns = [
    {
      name: (
        <div className="flex items-center">
          <span>Name</span>
        </div>
      ),
      selector: "test",
      cell: (row) => (
        <div className="flex items-center">
          <Link >
            <span className="row-link">{row.name}</span>
          </Link>
        </div>
      ),
    },
    {
      name: (
        <div className="flex items-center">
          <span>Email</span>
        </div>
      ),
      selector: "test",
      cell: (row) => (
        <div className="flex items-center">
          <Link >
            <span className="row-link">{row.email}</span>
          </Link>
        </div>
      ),
    },
    // {
    //   name: (
    //     <div className="cursor-pointer">
    //       Questions
    //     </div>
    //   ),
    //   selector: "questions",
    //   sortable: true,
    // },
    {
      name: (
        <div className="cursor-pointer">
         Added Date
        </div>
      ),
      selector: "date",
      sortable: true,
    },
    {
      name: "Actions",
      selector: "actions",
      sortable: false, // Ensures sorting is disabled for this column
      cell: (row) => {
        const isActive = activeStates.get(row.id) || false; // Default to false if not set
        return (
          <div className="test-action-buttons flex gap-2">
            {/* Active/Deactivate Button */}
            <button
              className={`test-action-button ${isActive ? "active" : "deactive"}`}
              aria-label={isActive ? "Active" : "Deactive"}
              onClick={() => handleActive(row)}
            >
              {isActive ? <FaTimes /> : <FaCheck />} {/* Change icon based on state */}
              <span className="tooltip-text">
                {isActive ? "Deactive" : "Active"}
              </span>
            </button>
            <button className="test-action-button archive" aria-label="Archive">
              <FaArchive />
              <span className="tooltip-text">Archive</span>
            </button>
            {/* Delete Button */}
            <button
              className="test-action-button delete"
              aria-label="Delete"
              onClick={() => handleDelete(row)}
            >
              <FaTrashAlt />
              <span className="tooltip-text">Delete</span>
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <>
    <Header />
    <div className="test-index-wrapper">
      <div className="test-index-container">
        <div className="test-index-header">
          <h1 className="breadcrumb"> All Teachers Lists</h1>
        </div>

        <div className="my-data-table">
          <DataTable
            columns={columns}
            data={paginatedData}
            availableActions={["delete", "archive", "download", "tag", "more"]}
            enableToggle={false}
          />
        </div>

        {/* Other Modals */}
        {/* <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          emails={emails}
          setEmails={setEmails}
          testName={selectedTest}
        /> */}
        {/* <DispatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          scheduledTests={mockScheduledTests}
          selectedTest={selectedTest}
        /> */}
      </div>
      {/* <DispatchModal isOpen={isModalOpen} onClose={closeModal} selectedTest={selectedTest} /> */}

      <PaginationButtons
        filteredQuestions={data}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        loadMore={loadMore}
        fullView={fullView}
        isDataTableVisible={dataTableVisible} // <-- Pass true/false based on state
      />

      <PaginationInfo
        filteredQuestions={data}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        label="Tests"
      />

    </div>
    </>
  );
};
export default TeachersIndex;
