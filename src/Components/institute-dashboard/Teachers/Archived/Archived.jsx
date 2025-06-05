
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
// import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import { Link } from "react-router-dom"; // Import Link for navigation

const Archived = () => {
  const data = [
    { id: 1, email: 'teacher1@example.com', date: '26-12-2024', status: 'Inactive' },

  ];

  const [rowsPerPage, setRowsPerPage] = useState(5); // Set the number of rows per page
  const [showButtons, setShowButtons] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTableVisible, setDataTableVisible] = useState(false);
  const paginatedData = data.slice(0, rowsPerPage);

  const loadMore = () => {
    setRowsPerPage((prevRows) => {
      const newRows = prevRows + 5;
      if (newRows >= data.length) setShowButtons(false); // Hide buttons if all data is shown
      return newRows;
    });
  };


  const fullView = () => {
    setRowsPerPage(data.length); // Show all data
    setShowButtons(false); // Hide buttons after Full View
  };






  // Define columns for the DataTable
  // const columns = [

  //    {
  //     name: "Name",
  //     selector: (row) => row.name,
  //     sortable: true,
  //     cell: (row) => (
  //       <Link to={`/QuestionBank/${row.id}/add`}>
  //         <span className="row-link">{row.name}</span>
  //       </Link>
  //     ),

  //   },
  //   {
  //     name: "Questions",
  //     selector: (row) => row.questions,
  //     sortable: true,
  //     width: "190px",
  //   },
  //   {
  //     name: "Last Modified",
  //     selector: (row) => row.lastModified,
  //     sortable: true,
  //     format: (row) => {
  //       const date = new Date(row.lastModified);
  //       return date instanceof Date && !isNaN(date)
  //         ? date.toLocaleDateString("en-US", {
  //             year: "numeric",
  //             month: "short",
  //             day: "numeric",
  //           })
  //         : "23-12-2024"; // Return a fallback in case the date is invalid
  //     },

  //   },
  //   {
  //     name: "Actions",
  //     cell: (row) => (
  //       <div className="action-buttons">
  //         {/* Add Button */}
  //         <Link to={`/QuestionBank/${row.id}/add`}>
  //           <button className="action-button add">
  //             <FontAwesomeIcon icon={faFolderPlus} />
  //           </button>
  //         </Link>
  //         <button
  //           className="action-button pdf"
  //           onClick={() => console.log("PDF", row.id)}
  //         >
  //           <FontAwesomeIcon icon={faFilePdf} />
  //         </button>
  //         <button
  //           className="action-button folder"
  //           onClick={() => console.log("Folder", row.id)}
  //         >
  //           <FontAwesomeIcon icon={faFolder} />
  //         </button>
  //         <button
  //           className="action-button archive"
  //           onClick={() => console.log("Archive", row.id)}
  //         >
  //             <MdOutlineArchive  icon={faArchive} />

  //         </button>
  //         <button
  //           className="action-button delete"
  //           onClick={() => console.log("Delete", row.id)}
  //         >
  //           <FontAwesomeIcon icon={faTrash} />
  //         </button>
  //       </div>
  //     ),

  //     ignoreRowClick: true,
  //     allowOverflow: true,
  //     button: true,
  //   },
  // ];
  const columns = [
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
      cell: (row) => (
        <div className="test-action-buttons flex gap-2">


          {/* <button className="test-action-button pdf" aria-label="Download PDF">
            <FaFilePdf />
            <span className="tooltip-text">Download PDF</span>
          </button>
          <button className="test-action-button copy" aria-label="Copy">
            <FaFolderPlus />
            <span className="tooltip-text">Folder</span>
          </button>

          <button className="test-action-button archive" aria-label="Archive">
            <FaArchive />
            <span className="tooltip-text">Archive</span>
          </button> */}
          <button className="test-action-button delete" aria-label="Delete">
            <FaTrashAlt />
            <span className="tooltip-text">Delete</span>
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
    <Header />
    <div className="test-index-wrapper">
      <div className="test-index-container">
        <div className="test-index-header">
          <h1 className="breadcrumb"> Archived Lists</h1>
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
export default Archived