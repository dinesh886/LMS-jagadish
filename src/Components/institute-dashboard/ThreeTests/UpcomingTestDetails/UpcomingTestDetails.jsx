import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpcomingTestDetails.css';
import {
  Clock,
  Users,
  Timer,
  FileText,
  User,
  HelpCircle,
  Target,
  BookOpen,
  Users2,
  ChevronDown,
  ChevronUp,
  BarChart2
} from 'lucide-react';
import DataTable from '../../../ReusableComponents/TableComponent/TableComponent';
import Header from '../../../header/header';
import PaginationButtons from '../../../ReusableComponents/Pagination/PaginationButton';
import PaginationInfo from '../../../ReusableComponents/Pagination/PaginationInfo';
import clock from '../../../../images/clock.png';

const UpcomingTestDetails = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState(null);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showFullViewButton, setShowFullViewButton] = useState(true);
  const [allRowsExpanded, setAllRowsExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const searchPlaceholder = "Search students...";

  const testData = {
    hoursConsumed: 0,
    candidatesAttended: 0,
    timerDuration: '01:20:00',
    name: 'Advanced JavaScript Assessment',
    owner: 'John Doe',
    questions: 50,
    marks: 100,
    sections: 3,
    classbatch: "Public",
    description: 'This test evaluates advanced JavaScript concepts including closures, prototypes, and async programming.',
    instructions: 'Please read each question carefully. You have 2.5 hours to complete the test. Good luck!',
    candidates: [
      // Existing candidates
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', class: '10-A', status: 'Enrolled' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', class: '10-B', status: 'Invited' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', class: '10-C', status: 'Pending' },
      // Additional candidates to demonstrate pagination
      { id: 4, name: 'David Wilson', email: 'david@example.com', class: '10-D', status: 'Enrolled' },
      { id: 5, name: 'Eve Davis', email: 'eve@example.com', class: '10-E', status: 'Invited' },
      { id: 6, name: 'Frank Miller', email: 'frank@example.com', class: '10-F', status: 'Pending' },
      { id: 7, name: 'Grace Lee', email: 'grace@example.com', class: '10-G', status: 'Enrolled' },
      { id: 8, name: 'Henry Taylor', email: 'henry@example.com', class: '10-H', status: 'Invited' },
      { id: 9, name: 'Ivy Clark', email: 'ivy@example.com', class: '10-I', status: 'Pending' },
      { id: 10, name: 'Jack Walker', email: 'jack@example.com', class: '10-J', status: 'Enrolled' },
      { id: 11, name: 'Karen Hall', email: 'karen@example.com', class: '10-K', status: 'Invited' },
   
    ]
  };

  // Filter candidates based on search query
  const filteredCandidates = testData.candidates.filter(candidate => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.class.toLowerCase().includes(searchLower) ||
      candidate.status.toLowerCase().includes(searchLower)
    );
  });

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredCandidates;
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredCandidates.slice(startIndex, startIndex + rowsPerPage);
  };

  // Pagination functions
  const loadMore = () => {
    const newRows = rowsPerPage + 5;
    setRowsPerPage(newRows);

    if (newRows >= filteredCandidates.length) {
      setShowButtons(false);
    }
  };

  const toggleFullView = () => {
    if (!fullViewMode) {
      // Enter Full View mode
      setRowsPerPage(filteredCandidates.length);
      setAllRowsExpanded(true);
      setShowFullViewButton(false);
      setShowButtons(false);
    } else {
      // Exit Full View mode
      setRowsPerPage(10);
      setAllRowsExpanded(false);
      setShowFullViewButton(true);
      setShowButtons(true);
      setExpandedRows([]);
    }
    setFullViewMode(!fullViewMode);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <span>{row.name || "N/A"}</span>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => <span>{row.email || "N/A"}</span>,
    },
    {
      name: "Class",
      selector: "class",
      sortable: true,
      cell: (row) => <span>{row.class || "N/A"}</span>,
    },
    // {
    //   name: "Status",
    //   selector: "Status",
    //   cell: (row) => <span className={`status ${row.status?.toLowerCase() || "na"}`}>{row.status || "N/A"}</span>,
    //   sortable: true,
    // }
  ];

  return (
    <>
      <Header />
      <div className="test-details-container">
        <div className="top-cards-container">
          <div className="top-card">
            <div className="card-content">
              <h4>Hours Consumed</h4>
              <strong>{testData.hoursConsumed}/100</strong>
            </div>
          </div>
          <div className="top-card">
            <div className="card-content">
              <h4>Candidates Attended</h4>
              <strong>{testData.candidatesAttended}</strong>
            </div>
          </div>
          <div className="top-card">
            <div className="card-content">
              <h4>Timer</h4>
              <strong>{testData.timerDuration}</strong>
            </div>
          </div>
        </div>

        <div className="main-card">
          <h2>Test Details</h2>
          <div className="test2-info">
            <div className="info-item">
              <div className="info-content">
                <h5> Test Name:</h5>
                <span>{testData.name}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Owner:</h5>
                <span>{testData.owner}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Questions:</h5>
                <span>{testData.questions}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Marks:</h5>
                <span>{testData.marks}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Sections:</h5>
                <span>{testData.sections}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>View Question Paper:</h5>
                <span>{testData.owner}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Class/Batch:</h5>
                <span>{testData.classbatch}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Marks:</h5>
                <span>{testData.marks}</span>
              </div>
            </div>
          </div>

          <div className="accordion">
            <div className="accordion-item">
              <button
                className={`accordion-header ${expandedSection === 'description' ? 'active' : ''}`}
                onClick={() => toggleSection('description')}
              >
                Description
                <span className="accordion-icon">
                  {expandedSection === 'description' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {expandedSection === 'description' && (
                <div className="accordion-content">
                  <p>{testData.description}</p>
                </div>
              )}
            </div>
            <div className="accordion-item">
              <button
                className={`accordion-header ${expandedSection === 'instructions' ? 'active' : ''}`}
                onClick={() => toggleSection('instructions')}
              >
                Instructions
                <span className="accordion-icon">
                  {expandedSection === 'instructions' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {expandedSection === 'instructions' && (
                <div className="accordion-content">
                  <p>{testData.instructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="candidate-details-card">
          <div className="status-header">
            <div className="status-title status-title2">
              <h3>Student Table</h3>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={getCurrentPageData()}
            pagination
            highlightOnHover
            searchoption={true}
            searchQuery={searchQuery}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={handleSearchChange}
            enableToggle={true}
            showColumnVisibility={false}
            fullViewMode={fullViewMode}
            allRowsExpanded={allRowsExpanded}
            onToggleAllRows={toggleFullView}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
          />

         
        </div>
      </div>
      {/* Pagination components */}

      {(showButtons || (fullViewMode && rowsPerPage < filteredCandidates.length)) && (
        <>
          <PaginationButtons
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            loadMore={loadMore}
            toggleFullView={toggleFullView}
            fullViewMode={fullViewMode}
            showFullViewButton={showFullViewButton}
          />
          <PaginationInfo
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            label="Students"
            totalItems={testData.candidates.length}
            isSearching={searchQuery.length > 0}
          />
        </>
      )}
    </>
  );
}

export default UpcomingTestDetails;