"use client"

import { useState, useRef, useEffect } from "react"
import "./UnscheduledTestDetails.css"
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
    Forward,
    Calendar,
    AlertCircle
} from "lucide-react"
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent"
import { toast } from "react-toastify"
import Header from "../../../header/header"
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { useParams } from "react-router-dom";

const UnscheduledTestDetails = () => {
    const { id } = useParams();
    const [expandedSection, setExpandedSection] = useState(null)
    const [openDropdown, setOpenDropdown] = useState(null)
    const [suspendedStates, setSuspendedStates] = useState({});
    const [hoveredScoreKey, setHoveredScoreKey] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Hardcoded sample data for the table
    const sampleCandidates = [
        {
            id: 1,
            name: "student1",
            email: "student1@example.com",
            class: "Enrolled 10-A",
            status: "Not Started",
        },
        {
            id: 2,
            name: "student2",
            email: "student2@example.com",
            class: "Invited",
            status: "Not Started",
        },
        {
            id: 3,
            name: "student3",
            email: "student3@example.com",
            class: "Enrolled 10-B",
            status: "Not Started",
        },
        {
            id: 4,
            name: "student4",
            email: "student4@example.com",
            class: "Guest",
            status: "Not Started",
        },
    ];

    // Filter candidates based on search query
    const filteredCandidates = sampleCandidates.filter(candidate => {
        const searchLower = searchQuery.toLowerCase();
        return (
            candidate.name.toLowerCase().includes(searchLower) ||
            candidate.email.toLowerCase().includes(searchLower) ||
            candidate.class.toLowerCase().includes(searchLower) ||
            candidate.status.toLowerCase().includes(searchLower)
        );
    });

    // Sample test data for top cards and test details
    const testData = {
        name: "Advanced Mathematics",
        owner: "Dr. Jane Smith",
        questions: 50,
        marks: 100,
        sections: 7,
        description: "This is an unscheduled test for advanced mathematics topics.",
        instructions: "This test has not been scheduled yet. Please set a date and time for the test.",
        scheduled: false
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

    const handleDropdownToggle = (rowId) => {
        setOpenDropdown(openDropdown === rowId ? null : rowId)
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSendReminder = (row) => {
        toast.info(`Reminder sent to ${row.name}`)
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
    const handleBulkSendReminders = (selectedRows) => {
        const names = selectedRows.map(row => row.name).join(', ');
        toast.info(`Reminders sent to ${selectedRows.length} students: ${names}`);
    };
    const handleTerminate = (row) => {
        toast.info(`${row.name} has been terminated`)
        setOpenDropdown(null)
    }
    const handleSendNotification = (row) => {
        toast.info(`Notification sent to ${row.name} `)
        setOpenDropdown(null)
      }
    const handleScheduleTest = () => {
        toast.success("Test scheduling modal opened");
        // In a real app, this would open a modal for scheduling
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name || "N/A",
            sortable: true,
            cell: (row) => <span>{row.name || "N/A"}</span>,
        },
        {
            name: "Email",
            selector: (row) => row.email || "N/A",
            sortable: true,
            cell: (row) => <span>{row.email || "N/A"}</span>,
        },
        {
            name: "Class",
            selector: (row) => row.class || "N/A",
            sortable: true,
            cell: (row) => <span>{row.class || "N/A"}</span>,
        },
        {
            name: "Status",
            selector: (row) => row.status || "N/A",
            cell: (row) => <span className={`status ${row.status?.toLowerCase().replace(' ', '-') || "na"}`}>{row.status || "N/A"}</span>,
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
                            {/* <button
                                className="options-dropdown-item options-dropdown-item3"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSendNotification(row);
                                }}
                            >
                                <Forward size={14} />
                                Send Notification
                            </button> */}
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
                {/* <div className="unscheduled-banner">
                    <AlertCircle size={24} />
                    <span>This test has not been scheduled yet. Please set a date and time for the test.</span>
                    <button className="schedule-test-btn" onClick={handleScheduleTest}>
                        <Calendar size={16} /> Schedule Test
                    </button>
                </div> */}

                <div className="main-card unscheduled-test-maincard">
                    <h2>Test Details (ID: {id})</h2>
                    <div className="test2-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <FileText size={20} />
                            </div>
                            <div className="info-content">
                                <strong>Name:</strong>
                                <span>{testData.name}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <User size={20} />
                            </div>
                            <div className="info-content">
                                <strong>Owner:</strong>
                                <span>{testData.owner}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <HelpCircle size={20} />
                            </div>
                            <div className="info-content">
                                <strong>Questions:</strong>
                                <span>{testData.questions}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <Target size={20} />
                            </div>
                            <div className="info-content">
                                <strong>Marks:</strong>
                                <span>{testData.marks}</span>
                            </div>
                        </div>
                        {/* <div className="info-item">
                            <div className="info-icon">
                                <BookOpen size={20} />
                            </div>
                            <div className="info-content">
                                <strong>Sections:</strong>
                                <span>{testData.sections}</span>
                            </div>
                        </div> */}
                        <div className="info-item">
                            <div className="info-icon">
                                <FileText size={20} />
                            </div>
                            <div className="info-content">
                                <strong>View Question Paper:</strong>
                                <span>View</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <Users2 size={20} />
                            </div>
                            <div className="info-content">
                                <strong>Class/Batch:</strong>
                                <span>Class 10</span>
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

                <div className="candidate-details-card">
                    <div className="status-header">
                        <div className="status-title status-title2">
                            <Users2 size={20} className="status-title-icon" />
                            <h3>Enrolled Students</h3>
                        </div>
                        <div className="status-subtitle status-subtitle2">
                            Student Table ({filteredCandidates.length})
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredCandidates}
                        pagination
                        highlightOnHover
                        studentActions={["sendReminder"]}
                        onBulkSendReminders={handleBulkSendReminders}
                        searchoption={true}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                    />
                </div>
            </div>
        </>
    )
}

export default UnscheduledTestDetails