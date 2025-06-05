"use client"

// CurrentRunningTestDetails.jsx
import { useState, useRef, useEffect } from "react"
import "./CurrentRunningTestDetails.css"
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
  MoreVertical,
  Send,
  Power,
  BarChart2,
  MonitorX,
  Forward
} from "lucide-react"
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent"
import { toast } from "react-toastify"
import Header from "../../../header/header"
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton";
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo";

const CurrentRunningTestDetails = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [suspendedStates, setSuspendedStates] = useState({});
  const [hoveredScoreKey, setHoveredScoreKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchPlaceholder = "Search students...";

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showFullViewButton, setShowFullViewButton] = useState(true);
  const [allRowsExpanded, setAllRowsExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);

  const sampleCandidates = [
    {
      id: 1,
      name: "student1",
      email: "student1@example.com",
      class: "Enrolled 10-A",
      rank: 1,
      a: 45,
      c: 40,
      w: 2,
      gs: 88,
      ns: 85,
      joinTime: "5",
      leaveTime: "3",
      status: "Running",
    },
    {
      id: 2,
      name: "student2",
      email: "student2@example.com",
      class: "Invited",
      rank: 2,
      a: 42,
      c: 38,
      w: 3,
      gs: 85,
      ns: 80,
      joinTime: "2",
      leaveTime: "3",
      status: "Submitted",
    },
    {
      id: 3,
      name: "student3",
      email: "student3@example.com",
      class: "Enrolled 10-B",
      rank: 3,
      a: 30,
      c: 25,
      w: 4,
      gs: 70,
      ns: 65,
      joinTime: "2",
      leaveTime: "2",
      status: "Absent",
    },
    {
      id: 4,
      name: "student4",
      email: "student4@example.com",
      class: "Guest",
      rank: 4,
      a: 48,
      c: 44,
      w: 1,
      gs: 90,
      ns: 88,
      joinTime: "3",
      leaveTime: "5",
      status: "Logout",
    },
    // Added more candidates to demonstrate pagination
    {
      id: 5, name: "student5", email: "student5@example.com", class: "Enrolled 10-C", rank: 5,
      a: 35, c: 30, w: 5, gs: 75, ns: 70, joinTime: "4", leaveTime: "2", status: "Running"
    },
    {
      id: 6, name: "student6", email: "student6@example.com", class: "Guest", rank: 6,
      a: 40, c: 35, w: 5, gs: 80, ns: 75, joinTime: "3", leaveTime: "4", status: "Submitted"
    },
    {
      id: 7, name: "student7", email: "student7@example.com", class: "Enrolled 10-D", rank: 7,
      a: 28, c: 25, w: 3, gs: 65, ns: 60, joinTime: "2", leaveTime: "1", status: "Absent"
    },
    {
      id: 8, name: "student8", email: "student8@example.com", class: "Guest", rank: 8,
      a: 50, c: 45, w: 5, gs: 95, ns: 90, joinTime: "5", leaveTime: "4", status: "Logout"
    },
    {
      id: 9, name: "student9", email: "student9@example.com", class: "Enrolled 10-E", rank: 9,
      a: 32, c: 28, w: 4, gs: 70, ns: 65, joinTime: "3", leaveTime: "2", status: "Running"
    },
    {
      id: 10, name: "student10", email: "student10@example.com", class: "Guest", rank: 10,
      a: 38, c: 35, w: 3, gs: 80, ns: 75, joinTime: "4", leaveTime: "3", status: "Submitted"
    },
    {
      id: 11, name: "student11", email: "student10@example.com", class: "Guest", rank: 10,
      a: 38, c: 35, w: 3, gs: 80, ns: 75, joinTime: "4", leaveTime: "3", status: "Submitted"
    }
  ];

  // Filter candidates based on search query
  const filteredCandidates = sampleCandidates.filter(candidate => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.class.toLowerCase().includes(searchLower) ||
      candidate.status.toLowerCase().includes(searchLower) ||
      candidate.rank.toString().includes(searchQuery)
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

  // Full view toggle (consistent with CompletedTestDetails)
  const toggleFullView = () => {
    if (!fullViewMode) {
      setRowsPerPage(filteredCandidates.length);
    } else {
      setRowsPerPage(3);
    }
    setFullViewMode(!fullViewMode);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Sample test data for top cards and test details
  const testData = {
    hoursConsumed: "24/100",
    candidatesAttended: 150,
    timerDuration: "01:30:00",
    name: "Advanced Mathematics",
    owner: "Dr. Jane Smith",
    questions: 50,
    marks: 100,
    sections: 7,
    classbatch: "Public",
    description: "This is a test for advanced mathematics topics.",
    instructions: "Follow the on-screen instructions during the test.",
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleSuspendResume = (row) => {
    const action = row.status === "Running" ? "suspended" : "resumed"
    toast.success(`Candidate ${row.name} has been ${action} `)
    setOpenDropdown(null)
  }

  const handleSuspendToggle = (row) => {
    const updatedStates = {
      ...suspendedStates,
      [row.id]: !suspendedStates[row.id],
    };
    setSuspendedStates(updatedStates);

    if (updatedStates[row.id]) {
      toast.error(`${row.name} has been suspended`);
    } else {
      toast.success(`${row.name} has been resumed`);
    }

    setOpenDropdown(null);
  };

  const handleBulkSuspend = (selectedRows) => {
    const updatedStates = { ...suspendedStates };
    selectedRows.forEach(row => {
      updatedStates[row.id] = true;
    });
    setSuspendedStates(updatedStates);

    const names = selectedRows.map(row => row.name).join(', ');
    toast.error(`Suspended ${selectedRows.length} students: ${names}`);
  };

  const handleBulkTerminate = (selectedRows) => {
    const names = selectedRows.map(row => row.name).join(', ');
    toast.error(`Terminated ${selectedRows.length} students: ${names}`);
  };

  const handleBulkSendMessage = (selectedRows) => {
    const names = selectedRows.map(row => row.name).join(', ');
    toast.info(`Notification sent to ${selectedRows.length} students: ${names}`);
  };

  const handleTerminate = (row) => {
    toast.info(`${row.name} has been terminated`)
    setOpenDropdown(null)
  }

  const handleSendNotification = (row) => {
    toast.info(`Notification sent to ${row.name} `)
    setOpenDropdown(null)
  }

  const handleDropdownToggle = (rowId) => {
    setOpenDropdown(openDropdown === rowId ? null : rowId)
  }

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
    {
      name: (
        <div className="grouped-header">
          <div className="main-header">A-C-W-GS-NS</div>
          <div className="sub-headers allrankheader ">
            {['a', 'c', 'w', 'gs', 'ns'].map((key, i) => (
              <span
                key={key}
                data-key={key}
                onMouseEnter={() => setHoveredScoreKey(key)}
                onMouseLeave={() => setHoveredScoreKey(null)}
                className={`sub-header-item ${hoveredScoreKey === key ? 'highlight' : ''}`}
              >
                {['A', 'C', 'W', 'GS', 'NS'][i]}
              </span>
            ))}
          </div>
        </div>
      ),
      cell: (row) => (
        <div className="score-grid">
          {['a', 'c', 'w', 'gs', 'ns'].map((key) => (
            <div
              key={key}
              className={`score-cell ${hoveredScoreKey === key ? 'highlight' : ''}`}
              onMouseEnter={() => setHoveredScoreKey(key)}
              onMouseLeave={() => setHoveredScoreKey(null)}
              title={
                {
                  a: 'Attempts',
                  c: 'Correct',
                  w: 'Wrong',
                  gs: 'Gross Score',
                  ns: 'Net Score'
                }[key]
              }
            >
              {row[key] || 0}
            </div>
          ))}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Rank",
      selector: "rank",
      sortable: true,
      cell: (row) => <span className="status-rank">{row.rank || "N/A"}</span>,
    },
    {
      name: (
        <div className="grouped-header">
          <div className="main-header main-header2">Exam Status</div>
          <div className="sub-headers status-headers">
            <span>IN</span>
            <span>OUT</span>
          </div>
        </div>
      ),
      cell: (row) => (
        <div className="status-grid">
          <span className="status-time">{row.joinTime || "--"}</span>
          <span className="status-time">{row.leaveTime || "--"}</span>
        </div>
      ),
      sortable: false,
    },
    {
      name: "Status",
      selector: "status",
      cell: (row) => <span className={`status  ${row.status?.toLowerCase() || "na"} `}>{row.status || "N/A"}</span>,
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => (
        <div className="options-dropdown-container"
          ref={openDropdown === row.id ? dropdownRef : null}
        >
          <button
            className="options-dropdown-toggle"
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownToggle(row.id);
            }}
          >
            <MoreVertical size={16} />
          </button>
          {openDropdown === row.id && (
            <div className="options-dropdown-menu">
              <div
                className={`options-status-toggle ${suspendedStates[row.id] ? "disabled" : "enabled"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSuspendToggle(row);
                }}
              >
                <button className="options-dropdown-item">
                  <MonitorX size={14} />
                  {suspendedStates[row.id] ? "Resume" : "Suspend"}
                  <div className="options-status-toggle-track">
                    <div
                      className={`options-status-toggle-thumb ${suspendedStates[row.id] ? "disabled" : "enabled"}`}
                    >
                      {!suspendedStates[row.id] ? (
                        <IoMdCheckmark className="status-icon" />
                      ) : (
                        <IoMdClose className="status-icon" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
              <button
                className="options-dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTerminate(row);
                }}
              >
                <Power size={14} /> Terminate
              </button>
              <button
                className="options-dropdown-item options-dropdown-item3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendNotification(row);
                }}
              >
                <Forward size={14} />
                Send Notification
              </button>
            </div>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <>
      <Header />
      <div className="test-details-container">
        <div className="top-cards-container">
          <div className="top-card">
            <div className="card-content">
              <h4>Hours Consumed</h4>
              <strong>{testData.hoursConsumed}</strong>
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
              <h4>Timer </h4>
              <strong className="time-remaining">{testData.timerDuration}</strong>
            </div>
          </div>
        </div>

        <div className="main-card">
          <h2>Test Details</h2>
          <div className="test2-info">
            <div className="info-item">
              <div className="info-content">
                <h5>Test Name:</h5>
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
                <h5>Sections</h5>
                <span>{testData.sections}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>View Question Paper</h5>
                <span>{testData.owner}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-content">
                <h5>Class/Batch</h5>
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
                className={`accordion-header ${expandedSection === "description" ? "active" : ""}`}
                onClick={() => toggleSection("description")}
              >
                Description
                <span className="accordion-icon">
                  {expandedSection === "description" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {expandedSection === "description" && (
                <div className="accordion-content">
                  <p>{testData.description}</p>
                </div>
              )}
            </div>
            <div className="accordion-item">
              <button
                className={`accordion-header ${expandedSection === "instructions" ? "active" : ""}`}
                onClick={() => toggleSection("instructions")}
              >
                Instructions
                <span className="accordion-icon">
                  {expandedSection === "instructions" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {expandedSection === "instructions" && (
                <div className="accordion-content">
                  <p>{testData.instructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="status-header">
          <div className="details-table-head">
            <h3>Student Performance <br></br>Student table</h3>
          </div>
        </div>
        <div className="candidate-details-card">
          <DataTable
            columns={columns}
            data={getCurrentPageData()}
            pagination={false}
            highlightOnHover
            studentActions={["suspend", "terminate", "sendMessage"]}
            onBulkSuspend={handleBulkSuspend}
            onBulkTerminate={handleBulkTerminate}
            onBulkSendMessage={handleBulkSendMessage}
            searchoption={false}
            searchQuery={searchQuery}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={handleSearchChange}
            enableToggle={false}
            fullViewMode={fullViewMode}
            onToggleFullView={toggleFullView}
            allRowsExpanded={allRowsExpanded}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
          />

          <div className="score-legend">
            <p>Score Legend:</p>
            <ul>
              {[
                { key: 'a', label: 'Attempts' },
                { key: 'c', label: 'Correct' },
                { key: 'w', label: 'Wrong' },
                { key: 'gs', label: 'Gross Score' },
                { key: 'ns', label: 'Net Score' }
              ].map(({ key, label }) => (
                <li key={key} className={hoveredScoreKey === key ? 'highlight' : ''}>
                  <strong>{key.toUpperCase()}:</strong> {label}
                </li>
              ))}
            </ul>
          </div>
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
            fullView={toggleFullView}
            fullViewMode={fullViewMode}
            showFullViewButton={true}
          />
          <PaginationInfo
            filteredQuestions={filteredCandidates}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            label="Students"
            totalItems={sampleCandidates.length}
            isSearching={searchQuery.length > 0}
          />
        </>
      )}
    </>
  )
}

export default CurrentRunningTestDetails