"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import "../Tests/TestAttenmpt.css"
import { FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa"
import { IoMdSchool } from "react-icons/io"
import { PiStudentBold } from "react-icons/pi"

const TestAttempt = () => {
    const { testId } = useParams()

    // Sample test data
    const testData = {
        id: testId,
        title: "JEE Main 2025 (Online) 24th January Evening Slot",
        sections: [
            {
                name: "Maths : Section A",
                questions: [
                    {
                        id: 1,
                        text: "What is the value of π (pi) to two decimal places?",
                        options: ["3.14", "3.16", "3.18", "3.12"],
                        type: "mcq",
                        image: null,
                    },
                    {
                        id: 2,
                        text: "Solve for x: 2x + 5 = 15",
                        options: ["5", "10", "7.5", "20"],
                        type: "mcq",
                        image: "physics",
                    },
                    {
                        id: 3,
                        text: "Solve for x: 2x + 5 = 15",
                        options: ["5", "10", "7.5", "20"],
                        type: "mcq",
                        image: "physics",
                    },
                ],
            },
            {
                name: "Physics",
                questions: [
                    {
                        id: 4,
                        text: "In a Young's double slit experiment...",
                        options: ["I0/4", "I0/8", "I0/16", "I0/32"],
                        type: "mcq",
                        image: "physics",
                    },
                ],
            },
            {
                name: "Chemistry",
                questions: [
                    {
                        id: 5,
                        text: "Which of the following is NOT a noble gas?",
                        options: ["Helium", "Neon", "Chlorine", "Argon"],
                        type: "mcq",
                        image: null,
                    },
                ],
            },
            {
                name: "Biology",
                questions: [
                    {
                        id: 6,
                        text: "What is the powerhouse of the cell?",
                        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
                        type: "mcq",
                        image: "physics",
                    },
                ],
            },
            {
                name: "English",
                questions: [
                    {
                        id: 7,
                        text: "Identify the correct sentence:",
                        options: [
                            "She don't like apples",
                            "She doesn't likes apples",
                            "She doesn't like apples",
                            "She don't likes apples",
                        ],
                        type: "mcq",
                        image: null,
                    },
                ],
            },
            {
                name: "History",
                questions: [
                    {
                        id: 8,
                        text: "When did World War II end?",
                        options: ["1943", "1945", "1947", "1950"],
                        type: "mcq",
                        image: null,
                    },
                ],
            },
            {
                name: "Geography",
                questions: [
                    {
                        id: 9,
                        text: "Which is the longest river in the world?",
                        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                        type: "mcq",
                        image: null,
                    },
                ],
            },
            {
                name: "Computer Science ",
                questions: [
                    {
                        id: 10,
                        text: "What does CPU stand for?",
                        options: [
                            "Central Processing Unit",
                            "Computer Processing Unit",
                            "Central Process Unit",
                            "Computer Process Unit",
                        ],
                        type: "mcq",
                        image: null,
                    },
                ],
            },
            {
                name: "Computer Science : Section 2",
                questions: [
                    {
                        id: 11,
                        text: "Which programming language is primarily used for web development?",
                        options: [
                            "Python",
                            "Java",
                            "JavaScript",
                            "C++",
                        ],
                        type: "mcq",
                        image: null,
                    },
                ],
            },
           
        ],
    }

    // Create a flat list of all questions with section info
    const allQuestions = testData.sections.flatMap((section, sectionIndex) =>
        section.questions.map((question, questionIndex) => ({
            ...question,
            sectionName: section.name,
            sectionIndex,
            localIndex: questionIndex,
            globalIndex:
                testData.sections.slice(0, sectionIndex).reduce((sum, sec) => sum + sec.questions.length, 0) + questionIndex,
        })),
    )

    // State management
    const [activeSection, setActiveSection] = useState(testData.sections[0].name)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState({})
    const [selectedAnswers, setSelectedAnswers] = useState({}) // Track selected but not saved answers
    const [questionStatus, setQuestionStatus] = useState({})
    const [timeLeft, setTimeLeft] = useState(3600)
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const sectionsRef = useRef(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [warning, setWarning] = useState("")
    const hasAnsweredMarked = Object.values(questionStatus).includes("answered-marked")
    const [visitedQuestions, setVisitedQuestions] = useState(new Set())

    // State for question counts - initialize with exact count of questions
    const [counts, setCounts] = useState({
        "not-visited": allQuestions.length,
        "not-answered": 0,
        "marked-review": 0,
        answered: 0,
        "answered-marked": 0,
    })

    // State for section-wise counts
    const [sectionCounts, setSectionCounts] = useState({})

    // Helper functions
    const getCurrentQuestion = () => {
        for (const section of testData.sections) {
            if (section.name === activeSection) {
                return section.questions[currentQuestion]
            }
        }
        return null
    }

    const getCurrentQuestionWithSection = () => {
        return allQuestions.find((q) => q.sectionName === activeSection && q.localIndex === currentQuestion)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const scrollSections = (direction) => {
        if (sectionsRef.current) {
            const scrollAmount = 200
            const newScrollLeft =
                direction === "left"
                    ? sectionsRef.current.scrollLeft - scrollAmount
                    : sectionsRef.current.scrollLeft + scrollAmount

            sectionsRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            })
        }
    }

    // Function to update status and counts safely
    const updateStatusAndCounts = (questionId, newStatus) => {
        // Get current status before updating
        const currentStatus = questionStatus[questionId]

        // Skip if status is not changing
        if (currentStatus === newStatus) return

        // Update the status
        setQuestionStatus((prev) => ({
            ...prev,
            [questionId]: newStatus,
        }))

        // Update counts based on status change
        setCounts((prev) => {
            const newCounts = { ...prev }

            // Decrement previous status count if it exists
            if (currentStatus) {
                newCounts[currentStatus] = Math.max(0, newCounts[currentStatus] - 1)
            }

            // Increment new status count
            newCounts[newStatus] = (newCounts[newStatus] || 0) + 1

            return newCounts
        })

        // Update section-wise counts
        const question = allQuestions.find((q) => q.id === questionId)
        if (question) {
            const sectionName = question.sectionName

            setSectionCounts((prev) => {
                const newSectionCounts = { ...prev }

                // Initialize section if it doesn't exist
                if (!newSectionCounts[sectionName]) {
                    newSectionCounts[sectionName] = {
                        "not-visited": 0,
                        "not-answered": 0,
                        "marked-review": 0,
                        answered: 0,
                        "answered-marked": 0,
                    }
                }

                // Decrement previous status count if it exists
                if (currentStatus) {
                    newSectionCounts[sectionName][currentStatus] = Math.max(0, newSectionCounts[sectionName][currentStatus] - 1)
                }

                // Increment new status count
                newSectionCounts[sectionName][newStatus] = (newSectionCounts[sectionName][newStatus] || 0) + 1

                return newSectionCounts
            })
        }
    }

    // Mark for Review & Move to Next
    const handleMarkForReview = () => {
        const currentQ = getCurrentQuestion()
        if (!currentQ) return

        // Update status to "marked-review"
        updateStatusAndCounts(currentQ.id, "marked-review")
    }

    const handleClearResponse = () => {
        const currentQ = getCurrentQuestion()
        if (!currentQ) return

        // Remove answer
        setAnswers((prev) => {
            const newAnswers = { ...prev }
            delete newAnswers[currentQ.id]
            return newAnswers
        })

        // Remove selected answer
        setSelectedAnswers((prev) => {
            const newSelectedAnswers = { ...prev }
            delete newSelectedAnswers[currentQ.id]
            return newSelectedAnswers
        })

        // Update status to not-answered
        updateStatusAndCounts(currentQ.id, "not-answered")
    }

    const handleNextQuestion = () => {
        const current = getCurrentQuestionWithSection()
        if (!current) return

        if (current.globalIndex < allQuestions.length - 1) {
            const nextQuestion = allQuestions[current.globalIndex + 1]
            setActiveSection(nextQuestion.sectionName)
            setCurrentQuestion(nextQuestion.localIndex)
        }
    }

    const handlePrevQuestion = () => {
        const current = getCurrentQuestionWithSection()
        if (!current) return

        if (current.globalIndex > 0) {
            const prevQuestion = allQuestions[current.globalIndex - 1]
            setActiveSection(prevQuestion.sectionName)
            setCurrentQuestion(prevQuestion.localIndex)
        }
    }

    // Initialize question status and section counts
    useEffect(() => {
        const status = {}
        const sectionCountsInit = {}

        // Initialize section counts
        testData.sections.forEach((section) => {
            sectionCountsInit[section.name] = {
                "not-visited": section.questions.length,
                "not-answered": 0,
                "marked-review": 0,
                answered: 0,
                "answered-marked": 0,
            }
        })

        // Initialize question status
        allQuestions.forEach((question) => {
            status[question.id] = "not-visited"
        })

        setQuestionStatus(status)
        setSectionCounts(sectionCountsInit)

        // Make sure the first question is set as current
        if (allQuestions.length > 0) {
            setCurrentQuestionId(allQuestions[0].id)
        }
    }, [])

    // Track current question and mark as visited if it was not visited before
    useEffect(() => {
        const currentQ = getCurrentQuestion()
        if (currentQ && currentQ.id) {
            setCurrentQuestionId(currentQ.id)

            // Only update if it's not visited and not already in visitedQuestions
            if (questionStatus[currentQ.id] === "not-visited" && !visitedQuestions.has(currentQ.id)) {
                // Add to visited questions set
                setVisitedQuestions((prev) => {
                    const newSet = new Set(prev)
                    newSet.add(currentQ.id)
                    return newSet
                })

                // Update status to not-answered
                updateStatusAndCounts(currentQ.id, "not-answered")
            }
        }
    }, [currentQuestion, activeSection])

    // Timer countdown
    useEffect(() => {
        const timer =
            timeLeft > 0 &&
            setInterval(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    // Answer handling - only track selected answer, don't mark as answered yet
    const handleAnswerChange = (questionId, answer) => {
        // Update selected answer
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }))
    }

    // Save and move to next question
    const handleSaveAndNext = () => {
        const currentQ = getCurrentQuestion()
        if (!currentQ) return

        const currentSelectedAnswer = selectedAnswers[currentQ.id]

        // Validate if an answer is selected
        if (!currentSelectedAnswer) {
            alert("Please choose an answer before proceeding.")
            return
        }

        // Save the selected answer
        setAnswers((prev) => ({ ...prev, [currentQ.id]: currentSelectedAnswer }))

        // Update status to answered
        updateStatusAndCounts(currentQ.id, "answered")

        // Move to the next question
        handleNextQuestion()
    }

    // Save and mark for review
    const handleSaveAndMarkForReview = () => {
        const currentQ = getCurrentQuestion()
        if (!currentQ) return

        const currentSelectedAnswer = selectedAnswers[currentQ.id]

        // If no answer is selected, show alert
        if (!currentSelectedAnswer) {
            alert("Please choose an answer before marking for review.")
            return
        }

        // Save the selected answer
        setAnswers((prev) => ({ ...prev, [currentQ.id]: currentSelectedAnswer }))

        // If there's an answer, mark as answered-marked
        updateStatusAndCounts(currentQ.id, "answered-marked")

        // Move to the next question
        handleNextQuestion()
    }

    // Navigation to specific question
    const navigateToQuestion = (globalIndex) => {
        const question = allQuestions[globalIndex]
        if (!question) return

        setActiveSection(question.sectionName)
        setCurrentQuestion(question.localIndex)
        setCurrentQuestionId(question.id)

        // If question was not visited, update status and counts
        if (questionStatus[question.id] === "not-visited" && !visitedQuestions.has(question.id)) {
            // Add to visited questions set
            setVisitedQuestions((prev) => {
                const newSet = new Set(prev)
                newSet.add(question.id)
                return newSet
            })

            // Update status to not-answered
            updateStatusAndCounts(question.id, "not-answered")
        }
    }

    // Handle section tab scrolling
    useEffect(() => {
        const sectionsElement = sectionsRef.current
        const handleScroll = () => {
            if (sectionsElement) {
                const { scrollLeft, scrollWidth, clientWidth } = sectionsElement
                setShowLeftArrow(scrollLeft > 0)
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth)
            }
        }

        if (sectionsElement) {
            sectionsElement.addEventListener("scroll", handleScroll)
            handleScroll()
        }

        return () => {
            if (sectionsElement) {
                sectionsElement.removeEventListener("scroll", handleScroll)
            }
        }
    }, [])

    // Verify total counts don't exceed total questions
    useEffect(() => {
        const totalCounts =
            counts["not-visited"] +
            counts["not-answered"] +
            counts["marked-review"] +
            counts["answered"] +
            counts["answered-marked"]

        // If total counts exceed question count, fix it
        if (totalCounts > allQuestions.length) {
            console.warn("Count mismatch detected, fixing counts")

            // Recalculate counts based on actual statuses
            const newCounts = {
                "not-visited": 0,
                "not-answered": 0,
                "marked-review": 0,
                answered: 0,
                "answered-marked": 0,
            }

            allQuestions.forEach((q) => {
                const status = questionStatus[q.id] || "not-visited"
                newCounts[status] = (newCounts[status] || 0) + 1
            })

            setCounts(newCounts)
        }
    }, [counts, questionStatus])

    return (
        <div className="test-attempt-container">
            <div className="exam-header">
                <div className="student-header-container">
                    <div className="header-left">
                        <div className="app-brand">
                            <IoMdSchool className="app-icon" />
                            <h1>
                                Exam<span>Pro</span>
                            </h1>
                        </div>
                        <div className="exam-info">
                            <p className="user-name">
                                <span className="user-label">Test Name :</span> {testData.title}
                            </p>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="user-info">
                            <PiStudentBold className="user-icon" />
                            <div>
                                <p className="user-label">CANDIDATE</p>
                                <p className="user-name">Dineshbabu JWS</p>
                            </div>
                        </div>

                        <div className="timer-display">
                            <FaClock className="timer-icon" />
                            <div>
                                <p className="timer-label">REMAINING TIME</p>
                                <p className="time-value">{formatTime(timeLeft)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content-wrapper">
                <div className="main-content">
                    <div className="horizontal-sections-container horizontal-sections-card">
                        <button
                            className="scroll-button left"
                            onClick={() => scrollSections("left")}
                            disabled={sectionsRef.current?.scrollLeft === 0}
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="horizontal-sections" ref={sectionsRef}>
                            {testData.sections.map((section) => (
                                <div
                                    key={section.name}
                                    className={`section-tab ${activeSection === section.name ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveSection(section.name)
                                        setCurrentQuestion(0)
                                    }}
                                >
                                    <span className="section-name">{section.name}</span>
                                    {/* <span className="section-number">{section.questions.length}</span> */}
                                </div>
                            ))}
                        </div>

                        <button
                            className="scroll-button right"
                            onClick={() => scrollSections("right")}
                            disabled={
                                sectionsRef.current &&
                                sectionsRef.current.scrollLeft >= sectionsRef.current.scrollWidth - sectionsRef.current.clientWidth - 1
                            }
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="test-body question-palette-card2">
                        <div className="question-area">
                            {activeSection && (
                                <>
                                    <div className="question-container">
                                        <div className="question-text">
                                            {/* Display section-specific question number instead of global index */}
                                            {getCurrentQuestionWithSection()?.localIndex + 1} .{getCurrentQuestion()?.text}
                                        </div>
                                        {getCurrentQuestion()?.image && (
                                            <div className="question-image">
                                                <img
                                                    src={require(`./${getCurrentQuestion()?.image || "/placeholder.svg"}.png`)}
                                                    alt="Question diagram"
                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                />
                                            </div>
                                        )}
                                        {/* Question Options */}
                                        <div className="options" id="options-section">
                                            {getCurrentQuestion()?.options.map((option, i) => (
                                                <label key={i} className="option">
                                                    <input
                                                        type="radio"
                                                        name={`q${getCurrentQuestion()?.id}`}
                                                        value={option}
                                                        checked={selectedAnswers[getCurrentQuestion()?.id] === option}
                                                        onChange={() => handleAnswerChange(getCurrentQuestion()?.id, option)}
                                                    />
                                                    <span>
                                                        {String.fromCharCode(65 + i)}. {option}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="student-actions-footer">
                                        <button
                                            className={`btn save-next ${selectedAnswers[getCurrentQuestion()?.id] ? " answered-btn " : ""}`}
                                            onClick={handleSaveAndNext}
                                        >
                                            <span className="btn-text ">Save & Next</span>
                                        </button>

                                        <button className="btn save-mark" onClick={handleSaveAndMarkForReview}>
                                            <span className="btn-text">Save & Mark For Review </span>
                                        </button>

                                        <button className="btn" onClick={handleClearResponse}>
                                            <span className="btn-text">Clear</span>
                                        </button>

                                        <button
                                            className="btn mark-next"
                                            onClick={() => {
                                                handleMarkForReview()
                                                handleNextQuestion()
                                            }}
                                        >
                                            <span className="btn-text">Mark For Review & Next</span>
                                        </button>
                                    </div>

                                    <div className="navigation-buttons">
                                        <div className="nav-left">
                                            <button
                                                className="nav-btn nav-prev"
                                                onClick={handlePrevQuestion}
                                                disabled={getCurrentQuestionWithSection()?.globalIndex === 0}
                                            >
                                                Prev
                                            </button>
                                            <button
                                                className="nav-btn nav-next"
                                                onClick={handleNextQuestion}
                                                disabled={getCurrentQuestionWithSection()?.globalIndex === allQuestions.length - 1}
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <button className="nav-btn nav-submit">Submit</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="status-sidebar">
                    <div className="status-summary status-summary-card">
                        <h4>Overall Status</h4>

                        {/* Row 1: Not Visited, Not Answered */}
                        <div className="row status-counts justify-content-center">
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box not-visited">{counts["not-visited"]}</span>
                                <span>Not Visited</span>
                            </div>
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box not-answered">{counts["not-answered"]}</span>
                                <span>Not Answered</span>
                            </div>
                        </div>

                        {/* Row 2: Answered, Marked for Review */}
                        <div className="row status-counts justify-content-center">
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box answered">{counts["answered"]}</span>
                                <span>Answered</span>
                            </div>
                            <div className="col-6 col-md-6 status-item">
                                <span className="count-box marked-review">{counts["marked-review"]}</span>
                                <span>Marked for Review</span>
                            </div>
                        </div>

                        {/* Row 3: Answered & Marked */}
                        <div className="row status-counts justify-content-center">
                            <div className="col-12 col-md-12 status-item">
                                <span className="count-box answered-marked">
                                    {counts["answered-marked"]}
                                    {hasAnsweredMarked && <span className="answered-marked-dot"></span>}
                                </span>
                                <span>Answered & Marked for Review (will be considered for evaluation)</span>
                            </div>
                        </div>
                    </div>

                    <div className="question-palette-card">
                        <div className="ps-3">
                            <h4>Questions</h4>
                        </div>
                        {/* Display questions by section */}
                        {testData.sections.map((section, sectionIndex) => (
                            <div key={section.name} className="section-questions">
                                <h5 className="section-name-palette">
                                    {section.name} <span className="section-number">{section.questions.length}</span>{" "}
                                </h5>
                                <div className="section-status-indicators">
                                    <span className="status-indicator not-visited" title="Not Visited">
                                        {sectionCounts[section.name]?.["not-visited"] || 0}
                                    </span>
                                    <span className="status-indicator not-answered not-answered2" title="Not Answered">
                                        {sectionCounts[section.name]?.["not-answered"] || 0}
                                    </span>
                                    <span className="status-indicator answered" title="Answered">
                                        {sectionCounts[section.name]?.["answered"] || 0}
                                    </span>
                                    <span className="status-indicator marked-review" title="Marked for Review">
                                        {sectionCounts[section.name]?.["marked-review"] || 0}
                                    </span>
                                    <span className="status-indicator answered-marked " title="Answered & Marked">
                                        {sectionCounts[section.name]?.["answered-marked"] || 0}
                                        <span className="answered-marked-dot2"></span> {/* Small dot inside */}
                                    </span>
                                    
                                </div>
                                <div className="question-buttons">
                                    {section.questions.map((question, questionIndex) => {
                                        const globalIndex =
                                            testData.sections.slice(0, sectionIndex).reduce((sum, sec) => sum + sec.questions.length, 0) +
                                            questionIndex

                                        const isCurrent = question.id === currentQuestionId
                                        const status = questionStatus[question.id] || "not-visited"

                                        return (
                                            <button
                                                key={question.id}
                                                className={`question-btn 
                                                ${isCurrent ? "current-question" : ""} 
                                                ${status}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigateToQuestion(globalIndex);
                                                }}
                                            >
                                                {/* Display section-specific question number */}
                                                {questionIndex + 1}
                                                {status === "answered-marked" && <span className="answered-marked-dot"></span>}
                                                {status === "marked-review" && <span className="marked-review-dot"></span>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add CSS for the answered-marked status and section styling */}
            <style jsx="true">{`
                .answered-marked-dot {
                    position: absolute;
                    bottom: 7px;
                    right: 7px;
                    width: 6px;
                    height: 6px;
                    background-color: #4caf50;
                    border-radius: 50%;
                }
                
               
                .question-btn {
                    position: relative;
                }
            `}</style>
        </div>
    )
}

export default TestAttempt

