"use client"

import { useState, useEffect } from "react"
import DataTable from "../../../ReusableComponents/TableComponent/TableComponent"
import { FaCopy, FaEdit, FaTrashAlt, FaArrowRight, FaFolderPlus, FaEllipsisH } from "react-icons/fa"
import PaginationButtons from "../../../ReusableComponents/Pagination/PaginationButton"
import PaginationInfo from "../../../ReusableComponents/Pagination/PaginationInfo"
import ColumnVisibilityDropdown from "../../../ReusableComponents/ColumnVisibilityDropdown/ColumnVisibilityDropdown"
import "./QuestionsAdd.css"
import Modal from "react-modal"
import Header from "../../../header/header"
import LatexRenderer from "../../../ReusableComponents/LatexRenderer/LatexRenderer"
import "katex/dist/katex.min.css"

const QuestionsAdd = () => {
  const data = [
    {
      id: 10,
      question: `Consider the following integral equation:
$$\\int_{0}^{\\infty} \\frac{x^{n} e^{-x}}{n!} dx = ?$$
Which of the following options correctly represents the value of this integral?

<img src="https://insightsedu.in/new/1.jpg" alt="Mathematical integral visualization" style="max-width: 300px; height: auto;" />`,
      answer: `The integral evaluates to 1 for all non-negative integers $$n$$. This is a standard result from the gamma function where $$\\Gamma(n+1) = n!$$ and $$\\int_{0}^{\\infty} x^n e^{-x} dx = \\Gamma(n+1) = n!$$.`,
      type: "MCQ",
      marks: 5,
      owner: "Admin",
      section: "Calculus",
      created: "15/03/2025",
      modified: "1 month ago",
      options: [
        '<img src="https://insightsedu.in/new/1.jpg" alt="Option A: Integral equals 1" style="max-width: 200px; height: auto;" /> The integral evaluates to 1 for all non-negative integers $$n$$.',
        '<img src="https://insightsedu.in/new/10.png" alt="Option B: Integral equals n" style="max-width: 200px; height: auto;" /> The integral evaluates to $$n$$ for all positive integers $$n$$.',
        '<img src="https://insightsedu.in/new/9.webp" alt="Option C: Integral equals 0" style="max-width: 200px; height: auto;" /> The integral evaluates to 0 for all values of $$n$$.',
        '<img src="https://insightsedu.in/new/9.webp" alt="Option D: Integral diverges" style="max-width: 200px; height: auto;" /> The integral diverges to infinity for all values of $$n$$.',
      ],
      correctAnswer: 0,
      isLaTeXEnabled: true,
      hasImages: true,
    },
    {
      id: 1,
      question: `A particle moves along a path defined by the parametric equations:
$$x(t) = R \\cos(\\omega t), \\quad y(t) = R \\sin(\\omega t), \\quad z(t) = kt^2$$
where $$R > 0$$, $$\\omega > 0$$, and $$k$$ is a constant. The motion describes a **helical path** where the particle moves in a circular trajectory in the $$xy$$-plane while simultaneously accelerating along the $$z$$-axis.

At $$t = 0$$, the particle is at point $$(R, 0, 0)$$. The speed of the particle at any time $$t$$ is given by:
$$v(t) = \\sqrt{(x'(t))^2 + (y'(t))^2 + (z'(t))^2}$$

Which of the following correctly represents the arc length $$S$$?`,
      answer: `The correct solution is option D:
$$S = \\frac{1}{4k} \\left[ 2kT \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + R^2 \\omega^2 \\ln\\left(\\frac{2kT + \\sqrt{R^2 \\omega^2 + 4k^2 T^2}}{R\\omega}\\right) \\right]$$`,
      type: "MCQ",
      marks: 10,
      owner: "Admin",
      section: "Advanced Mathematics",
      created: "15/03/2025",
      modified: "1 day ago",
      options: [
        `$$S = \\frac{T}{2} \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + \\frac{R^2 \\omega^2}{4k} \\sinh^{-1}\\left(\\frac{2kT}{R\\omega}\\right)$$`,
        `$$S = \\frac{T}{2} \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + \\frac{R^2 \\omega^2}{4k} \\ln\\left|2kT + \\sqrt{R^2\\omega^2 + 4k^2 T^2}\\right|$$`,
        `$$S = \\frac{T}{2} \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + \\frac{R^2 \\omega^2}{4k} \\tan^{-1}\\left(\\frac{2kT}{R\\omega}\\right)$$`,
        `$$S = \\frac{1}{4k} \\left[ 2kT \\sqrt{R^2 \\omega^2 + 4k^2 T^2} + R^2 \\omega^2 \\ln\\left(\\frac{2kT + \\sqrt{R^2 \\omega^2 + 4k^2 T^2}}{R\\omega}\\right) \\right]$$`,
      ],
      correctAnswer: 3,
      isLaTeXEnabled: true,
    },
    {
      id: 9,
      question: `Identify the graph of the function $$y = \\sin(x)$$ from the options below:

<img src="https://insightsedu.in/new/3.png" alt="Sine function formula" style="max-width: 300px; height: auto;" />

The correct graph is:`,
      answer: `The correct answer is option a) Sine Wave. The sine function produces a characteristic wave pattern that oscillates between -1 and 1.`,
      type: "MCQ",
      marks: 3,
      owner: "Admin",
      section: "Trigonometry",
      created: "15/03/2025",
      modified: "3 weeks ago",
      options: [
        '<img src="https://insightsedu.in/new/4.png" alt="Option A - Sine Wave" style="max-width: 200px; height: auto;" /> Sine Wave',
        '<img src="https://insightsedu.in/new/4.png" alt="Option B - Straight Line" style="max-width: 200px; height: auto;" /> Straight Line',
        '<img src="https://insightsedu.in/new/4.png" alt="Option C - Parabola" style="max-width: 200px; height: auto;" /> Parabola',
        '<img src="https://insightsedu.in/new/4.png" alt="Option D - Exponential" style="max-width: 200px; height: auto;" /> Exponential Curve',
      ],
      correctAnswer: 0,
      isLaTeXEnabled: true,
      hasImages: true,
    },
    
    {
      id: 4,
      question: `Consider the heat equation in one dimension, which describes the distribution of temperature $$u(x,t)$$ along a thin rod:
$$\\frac{\\partial u(x,t)}{\\partial t} = \\alpha \\frac{\\partial^2 u(x,t)}{\\partial x^2}$$
where $$\\alpha$$ is the thermal diffusivity. The boundary conditions are given by $$u(0,t) = 0$$ and $$u(L,t) = 0$$, and the initial condition is $$u(x,0) = f(x)$$, where $$f(x)$$ is a known function. Solve this equation using separation of variables and express the solution in terms of eigenvalues.
The general solution is:`,
      answer: `Both options a and b are correct. The solution is $$u(x,t) = \\sum_{n=1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$ and the eigenvalues are $$\\lambda_n = \\left(\\frac{n \\pi}{L}\\right)^2$$.`,
      type: "MCQ",
      marks: 7,
      owner: "Admin",
      section: "Differential Equations",
      created: "15/03/2025",
      modified: "4 days ago",
      options: [
        "$$u(x,t) = \\sum_{n=1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$.",
        "The eigenvalues are $$\\lambda_n = \\left(\\frac{n \\pi}{L}\\right)^2$$.",
        "Both options a and b are correct.",
        "The solution cannot be expressed in terms of eigenvalues.",
      ],
      correctAnswer: 2,
      isLaTeXEnabled: true,
    },
    {
      id: 5,
      question: `For a first-order reaction $$A \\to B$$, the rate law is given by:
$$\\text{Rate} = k[A]$$
where $$k$$ is the rate constant, and $$[A]$$ is the concentration of reactant $$A$$. Derive the integrated rate law and calculate the half-life of the reaction. If the concentration of $$A$$ is initially $$[A]_0$$, show that the concentration at time $$t$$ is given by:
$$[A] = [A]_0 e^{-kt}$$
The correct statement is:`,
      answer: `Both options a and b are correct, and the half-life of a first-order reaction is independent of the initial concentration $$[A]_0$$.`,
      type: "MCQ",
      marks: 5,
      owner: "Admin",
      section: "Chemistry",
      created: "15/03/2025",
      modified: "5 days ago",
      options: [
        "The half-life $$t_{1/2} = \\frac{\\ln 2}{k}$$.",
        "The integrated rate law is $$[A] = [A]_0 e^{-kt}$$.",
        "Both options a and b are correct.",
        "The half-life of a first-order reaction is independent of the initial concentration $$[A]_0$$.",
      ],
      correctAnswer: 2,
      isLaTeXEnabled: true,
    },
    {
      id: 6,
      question: `Find the Fourier series expansion for the function $$f(x) = x$$ defined on the interval $$-\\pi \\leq x \\leq \\pi$$. Use the formula:
$$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\, dx, \\quad a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) \\, dx, \\quad b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx$$
Calculate the Fourier coefficients and express the series.
The Fourier series expansion for $$f(x) = x$$ is:`,
      answer: `Both options a and b are correct. The Fourier series is $$f(x) = \\frac{2}{\\pi} \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} \\sin(nx)$$ with $$a_n = 0$$ for all $$n$$, and $$b_n = \\frac{2}{\\pi n}$$.`,
      type: "MCQ",
      marks: 6,
      owner: "Admin",
      section: "Fourier Analysis",
      created: "15/03/2025",
      modified: "6 days ago",
      options: [
        "$$f(x) = \\frac{2}{\\pi} \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} \\sin(nx)$$.",
        "The Fourier coefficients $$a_n = 0$$ for all $$n$$, and $$b_n = \\frac{2}{\\pi n}$$.",
        "Both options a and b are correct.",
        "The Fourier series does not exist for $$f(x) = x$$ on this interval.",
      ],
      correctAnswer: 2,
      isLaTeXEnabled: true,
    },
    {
      id: 7,
      question: `एक आयाम में ऊष्मा समीकरण पर विचार करें, जो एक पतली छड़ के साथ तापमान $$u(x,t)$$ के वितरण को वर्णन करता है:
$$\\frac{\\partial u(x,t)}{\\partial t} = \\alpha \\frac{\\partial^2 u(x,t)}{\\partial x^2}$$
जहाँ $$\\alpha$$ ऊष्मीय विसरण (thermal diffusivity) है। सीमा शर्तें $$u(0,t) = 0$$ और $$u(L,t) = 0$$ दी गई हैं, और प्रारंभिक शर्त $$u(x,0) = f(x)$$ है, जहाँ $$f(x)$$ एक ज्ञात फलन है। इस समीकरण को चर से पृथक्करण (separation of variables) विधि का उ��योग करके हल करें और इसे स्वदेशी मान (eigenvalues) के रूप में व्यक्त करें।
सामान्य समाधान है:`,
      answer: `विकल्प a और b दोनों सही हैं। समाधान $$u(x,t) = \\sum_{n=1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$ है और स्वदेशी मान $$\\lambda_n = \\left(\\frac{n \\pi}{L}\\right)^2$$ हैं।`,
      type: "MCQ",
      marks: 7,
      owner: "Admin",
      section: "गणित (हिंदी)",
      created: "15/03/2025",
      modified: "1 week ago",
      options: [
        "$$u(x,t) = \\sum_{n=1}^{\\infty} A_n \\sin\\left(\\frac{n \\pi x}{L}\\right) e^{-\\alpha \\left(\\frac{n \\pi}{L}\\right)^2 t}$$।",
        "स्वदेशी मान $$\\lambda_n = \\left(\\frac{n \\pi}{L}\\right)^2$$।",
        "विकल्प a और b दोनों सही हैं।",
        "समाधान को स्वदेशी मानों के रूप में व्यक्त नहीं किया जा सकता।",
      ],
      correctAnswer: 2,
      isLaTeXEnabled: true,
    },
    {
      id: 8,
      question: `సత్యనారాయణ వ్యవసాయం లో ఏ మూడు భాగాలు ఉంటాయి?`,
      answer: `రబి, ఖరీఫ్, బోనాల`,
      type: "MCQ",
      marks: 2,
      owner: "Admin",
      section: "వ్యవసాయం (తెలుగు)",
      created: "15/03/2025",
      modified: "2 weeks ago",
      options: ["రబి, ఖరీఫ్, బోనాల", "శీతకాల, వేసవికాల, ఆదివార", "పంటల్ని వేరే విభజించలేదు", "ఉష్ణకటిన, ట్రోపికల్, మాన్సూన్"],
      correctAnswer: 0,
      isLaTeXEnabled: false,
    },
    {
      id: 11,
      question: `Explain the concept of wave-particle duality in quantum mechanics. Your answer should include:
      - A description of the phenomenon
      - Key experiments that demonstrated it
      - Its implications for our understanding of matter
      - Examples where this duality is observed`,
      answer: `Wave-particle duality is a fundamental concept in quantum mechanics that states every particle exhibits both wave and particle properties. Key experiments include:
      1. Young's double-slit experiment with electrons
      2. Photoelectric effect demonstrating particle nature of light
      3. Davisson-Germer experiment showing wave nature of electrons
      
      This duality implies that classical concepts of "particle" or "wave" are inadequate to fully describe quantum-scale objects. Examples include:
      - Electron diffraction patterns
      - Photon behavior in quantum optics experiments
      - Neutron interference patterns`,
      type: "Paragraph",
      marks: 15,
      owner: "Admin",
      section: "Quantum Physics",
      created: "16/03/2025",
      modified: "2 days ago",
      isLaTeXEnabled: true,
      hasImages: false
    },

    // Question with table
    {
      id: 12,
      question: `The following table shows experimental data for a chemical reaction:
      
      <table class="data-table">
        <thead>
          <tr>
            <th>Time (s)</th>
            <th>Concentration (M)</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>1.00</td>
            <td>25.0</td>
          </tr>
          <tr>
            <td>10</td>
            <td>0.82</td>
            <td>25.5</td>
          </tr>
          <tr>
            <td>20</td>
            <td>0.67</td>
            <td>26.0</td>
          </tr>
        </tbody>
      </table>
      
      Based on this data, determine the reaction order and rate constant.`,
      answer: `The reaction appears to be first-order because the concentration decreases exponentially with time. The rate constant can be calculated from the slope of ln[Concentration] vs time plot.
      
      <table class="calculation-table">
        <tr>
          <th>Calculation Step</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Slope of ln[C] vs t</td>
          <td>-0.0193 s⁻¹</td>
        </tr>
        <tr>
          <td>Rate constant (k)</td>
          <td>0.0193 s⁻¹</td>
        </tr>
      </table>`,
      type: "Table",
      marks: 8,
      owner: "Admin",
      section: "Chemical Kinetics",
      created: "16/03/2025",
      modified: "1 day ago",
      isLaTeXEnabled: true,
      hasTables: true
    },

    // Numerical question
    {
      id: 13,
      question: `Calculate the root mean square speed of oxygen molecules (O₂) at 300 K. 
      The molar mass of oxygen is 32 g/mol and the gas constant R = 8.314 J/(mol·K).`,
      answer: `The root mean square speed is calculated using:
      $$v_{rms} = \\sqrt{\\frac{3RT}{M}}$$
      Where:
      - R = 8.314 J/(mol·K)
      - T = 300 K
      - M = 0.032 kg/mol
      
      $$v_{rms} = \\sqrt{\\frac{3 × 8.314 × 300}{0.032}} = 483.56 \\text{ m/s}$$`,
      type: "Numerical",
      marks: 5,
      owner: "Admin",
      section: "Thermodynamics",
      created: "16/03/2025",
      modified: "3 days ago",
      correctAnswer: "483.56 m/s",
      tolerance: "±5%",
      isLaTeXEnabled: true,
      units: "m/s"
    },

    // True/False question
    {
      id: 14,
      question: `The human body contains more bacterial cells than human cells.`,
      answer: `True. The average human body contains about 30 trillion human cells and 39 trillion bacterial cells.`,
      type: "True/False",
      marks: 2,
      owner: "Admin",
      section: "Biology",
      created: "16/03/2025",
      modified: "1 week ago",
      correctAnswer: true
    }
    // Additional data items...
  ]

  const INITIAL_ROWS_PER_PAGE = 5
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [filteredCount, setFilteredCount] = useState(data.length)
  const [fullViewMode, setFullViewMode] = useState(false)
  const [allRowsExpanded, setAllRowsExpanded] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-actions-dropdown")) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter data based on search and filters
  const getFilteredData = () => {
    return data.filter((question) => {
      const matchesSearch =
        searchQuery === "" ||
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.section.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = filterType === "" || question.type === filterType
      const matchesSection = filterSection === "" || question.section === filterSection

      return matchesSearch && matchesType && matchesSection
    })
  }

  const filteredData = getFilteredData()

  // Update filtered count when data changes
  useEffect(() => {
    setFilteredCount(filteredData.length)
  }, [filteredData.length])

  // Get current page data
  const getCurrentPageData = () => {
    if (fullViewMode) {
      return filteredData
    }
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }

  // Check if we should show pagination buttons
  const showPaginationButtons = !fullViewMode && rowsPerPage < filteredData.length

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  // Handle filter type change
  const handleFilterTypeChange = (value) => {
    setFilterType(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Handle filter section change
  const handleFilterSectionChange = (value) => {
    setFilterSection(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Handle individual row expansion toggle
  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId)
      } else {
        return [...prev, rowId]
      }
    })
  }

  // Toggle full view mode
  const toggleFullView = () => {
    if (!fullViewMode) {
      // Enter Full View mode
      setRowsPerPage(filteredData.length)
      setAllRowsExpanded(true)
      setExpandedRows(filteredData.map((q) => q.id))
    } else {
      // Exit Full View mode
      setRowsPerPage(INITIAL_ROWS_PER_PAGE)
      setAllRowsExpanded(false)
      setExpandedRows([])
    }
    setFullViewMode(!fullViewMode)
  }

  const handleActionClick = (action, row) => {
    // Close dropdown first
    setOpenDropdownId(null)

    // Then execute the action
    switch (action) {
      case "copy":
        console.log("Copy action for", row.question)
        break
      case "edit":
        setSelectedQuestion(row)
        setModalIsOpen(true)
        break
      case "move":
        console.log("Move to test action for", row.question)
        break
      case "folder":
        console.log("Add to section action for", row.question)
        break
      case "delete":
        console.log("Delete action for", row.question)
        break
      default:
        break
    }
  }

  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId)
  }

  // Define columns with visibility state
  const [columns, setColumns] = useState([
    {
      name: "Questions",
      selector: (row) => row?.question || "N/A",
      sortable: true,
      cell: (row) => {
        const isExpanded = expandedRows.includes(row.id)
        const shouldTruncate = !fullViewMode && !isExpanded

        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              toggleRowExpansion(row.id)
            }}
          >
            <span className={`row-link ${shouldTruncate ? "truncate" : ""}`}>
              <LatexRenderer content={row.question} />
            </span>
          </div>
        )
      },
      isVisible: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Section",
      selector: "section",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Modified",
      selector: "modified",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Created",
      selector: "created",
      sortable: true,
      isVisible: false,
    },
    {
      name: "Actions",
      selector: "actions",
      cell: (row) => (
        <div className="test-action-buttons">
          {isMobile ? (
            // Mobile: Show three dots dropdown
            <div className="mobile-actions-dropdown">
              <button
                className="test-action-button mobile-menu-trigger"
                onClick={() => toggleDropdown(row.id)}
                aria-label="More actions"
              >
                <FaEllipsisH />
              </button>

              {openDropdownId === row.id && (
                <div className="mobile-actions-menu">
                  <button className="mobile-action-item copy" onClick={() => handleActionClick("copy", row)}>
                    <FaCopy />
                    <span>Copy</span>
                  </button>
                  <button className="mobile-action-item edit" onClick={() => handleActionClick("edit", row)}>
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button className="mobile-action-item move" onClick={() => handleActionClick("move", row)}>
                    <FaArrowRight />
                    <span>Move to Test</span>
                  </button>
                  <button className="mobile-action-item folder" onClick={() => handleActionClick("folder", row)}>
                    <FaFolderPlus />
                    <span>Add to Section</span>
                  </button>
                  <button className="mobile-action-item delete" onClick={() => handleActionClick("delete", row)}>
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Desktop: Show all buttons inline
            <div className="action-buttons-container">
              <button
                className="test-action-button copy"
                aria-label="Copy"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActionClick("copy", row)
                }}
              >
                <FaCopy />
                <span className="tooltip-text">Copy</span>
              </button>
              <button
                className="test-action-button edit"
                aria-label="Edit"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActionClick("edit", row)
                }}
              >
                <FaEdit />
                <span className="tooltip-text">Edit</span>
              </button>
              <button
                className="test-action-button move"
                aria-label="Move to Test"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActionClick("move", row)
                }}
              >
                <FaArrowRight />
                <span className="tooltip-text">Move to Test</span>
              </button>
              <button
                className="test-action-button folder"
                aria-label="Add to Section"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActionClick("folder", row)
                }}
              >
                <FaFolderPlus />
                <span className="tooltip-text">Add to Section</span>
              </button>
              <button
                className="test-action-button delete"
                aria-label="Delete"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActionClick("delete", row)
                }}
              >
                <FaTrashAlt />
                <span className="tooltip-text">Delete</span>
              </button>
            </div>
          )}
        </div>
      ),
      isVisible: false,
    },
  ])

  // Toggle column visibility
  const toggleColumnVisibility = (columnSelector) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.selector === columnSelector ? { ...column, isVisible: !column.isVisible } : column,
      ),
    )
  }

  // Filter visible columns
  const visibleColumns = columns.filter((column) => column.isVisible)

  // Reset expanded rows when search changes
  useEffect(() => {
    if (!fullViewMode) {
      setExpandedRows([])
    }
  }, [searchQuery, filterType, filterSection])

  return (
    <>
      <Header />
      <div className="questionsadd-index-wrapper">
        <div className="questionsadd-index-container">
          <div className="test-index-header">
            <h1 className="breadcrumb">QB 1 Questions</h1>
            <div className="columnvisibility-wrapper">
              <ColumnVisibilityDropdown columns={columns} onToggleColumn={toggleColumnVisibility} />
            </div>
          </div>

          <div className="my-data-table">
            <DataTable
              columns={visibleColumns}
              data={getCurrentPageData()}
              enableToggle={true}
              fullViewMode={fullViewMode}
              allRowsExpanded={allRowsExpanded}
              expandedRows={expandedRows}
              setExpandedRows={setExpandedRows}
              searchoption={true}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              filterType={filterType}
              onFilterTypeChange={handleFilterTypeChange}
              filterSection={filterSection}
              onFilterSectionChange={handleFilterSectionChange}
            />
          </div>

          {/* Modal for question details */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            {selectedQuestion && (
              <div className="question-detail-modal">
                <h3>Question Details</h3>
                <div className="question-content">
                  <LatexRenderer content={selectedQuestion.question} />
                </div>
                {selectedQuestion.type === "MCQ" && selectedQuestion.options && (
                  <div className="mcq-options-modal">
                    <h4>Options:</h4>
                    {selectedQuestion.options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`mcq-option ${selectedQuestion.correctAnswer === idx ? "correct-answer" : ""}`}
                      >
                        <LatexRenderer content={option} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="answer-content">
                  <h4>Answer:</h4>
                  <LatexRenderer content={selectedQuestion.answer} />
                </div>
                <div className="modal-footer">
                  <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
      {showPaginationButtons && (
        <PaginationButtons
          filteredQuestions={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          loadMore={() => setRowsPerPage((prev) => Math.min(prev + 10, filteredData.length))}
          fullView={toggleFullView}
          fullViewMode={fullViewMode}
        />
      )}

      <PaginationInfo
        filteredQuestions={filteredData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        label="Questions"
        totalItems={data.length}
        isSearching={searchQuery.length > 0 || filterType.length > 0 || filterSection.length > 0}
      />
    </>
  )
}

export default QuestionsAdd
