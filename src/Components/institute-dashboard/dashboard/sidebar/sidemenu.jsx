"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  DollarSign,
  Users,
  ClipboardList,
  UserCheck,
  FolderOpen,
  User,
  Power,
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  BookOpen,
  FileText,
  Menu,
  CircleDollarSign ,
  BookOpenCheck ,
  X,
} from "lucide-react"
import "./sidemenu.css"

const SidebarMenu = () => {
  const [isManageHomeVisible, setManageHomeVisible] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const [activeSection, setActiveSection] = useState("general")

  const toggleManageHomeVisibility = () => {
    setManageHomeVisible(!isManageHomeVisible)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleSetActive = (section) => {
    setActiveSection(section)
    // Close mobile sidebar when a link is clicked
    setIsMobileOpen(false)
  }

  return (
    <div className="sidebar-wrapper">
      {/* Mobile Overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar Container */}
      <nav className={`test-sidebar-container ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Main Navigation">
        <div className="test-sidebar-header">
          <span className="sidebar-letters">LMS Institute</span>
        </div>

        <div className="test-sidebar-section">
          <ul className="test-sidebar-menu">
            <li className="sidebar-section-title">Dashboard</li>

            <li>
              <Link
                to="/maindashboard/general"
                className={`sidebar-contents ${activeSection === "general" ? "active" : ""}`}
                aria-label="General"
                onClick={() => handleSetActive("general")}
              >
                <Users className="icon" size={20} />
                <span className="sidebar-letters">General</span>
              </Link>
            </li>

            <li>
              <Link
                to="/maindashboard/sheduled"
                className={`sidebar-contents ${activeSection === "sheduled" ? "active" : ""}`}
                aria-label="Sheduled"
                onClick={() => handleSetActive("sheduled")}
              >
                <UserCheck className="icon" size={20} />
                <span className="sidebar-letters">Sheduled</span>
              </Link>
            </li>

            <li>
              <Link
                to="/maindashboard/unscheduled"
                className={`sidebar-contents ${activeSection === "unscheduled" ? "active" : ""}`}
                aria-label="UnScheduled"
                onClick={() => handleSetActive("unscheduled")}
              >
                <ClipboardList className="icon" size={20} />
                <span className="sidebar-letters">UnScheduled</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Teachers"
                className={`sidebar-contents ${activeSection === "teachers" ? "active" : ""}`}
                aria-label="Teachers"
                onClick={() => handleSetActive("teachers")}
              >
                <BookOpenCheck className="icon" size={20} />
                <span className="sidebar-letters">Teachers</span>
              </Link>
            </li>

            <li>
              <Link
                to="/subscription"
                className={`sidebar-contents ${activeSection === "subscription" ? "active" : ""}`}
                aria-label="Subscription"
                onClick={() => handleSetActive("subscription")}
              >
                <CircleDollarSign className="icon" size={20} />
                <span className="sidebar-letters">Subscription</span>
              </Link>
            </li>

            <li className="sidebar-section-title" onClick={toggleManageHomeVisibility}>
              Manage Home
              {/* {isManageHomeVisible ? (
                <ChevronUp className="toggle-icon" size={16} />
              ) : (
                <ChevronDown className="toggle-icon" size={16} />
              )} */}
            </li>

            {isManageHomeVisible && (
              <ul className="test-sidebar-submenu">
                <li>
                  <Link
                    to="/home"
                    className={`sidebar-contents ${activeSection === "home" ? "active" : ""}`}
                    aria-label="Home"
                    onClick={() => handleSetActive("home")}
                  >
                    <Home className="icon" size={20} />
                    <span className="sidebar-letters">Home</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className={`sidebar-contents ${activeSection === "about" ? "active" : ""}`}
                    aria-label="About"
                    onClick={() => handleSetActive("about")}
                  >
                    <Info className="icon" size={20} />
                    <span className="sidebar-letters">About</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courses"
                    className={`sidebar-contents ${activeSection === "courses" ? "active" : ""}`}
                    aria-label="Courses"
                    onClick={() => handleSetActive("courses")}
                  >
                    <BookOpen className="icon" size={20} />
                    <span className="sidebar-letters">Courses</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blog-manage"
                    className={`sidebar-contents ${activeSection === "blog" ? "active" : ""}`}
                    aria-label="Blog"
                    onClick={() => handleSetActive("blog")}
                  >
                    <FileText className="icon" size={20} />
                    <span className="sidebar-letters">Blog</span>
                  </Link>
                </li>
              </ul>
            )}

            <li className="sidebar-section-title">Profile Info</li>

            <li>
              <Link
                to="/profile"
                className={`sidebar-contents ${activeSection === "profile" ? "active" : ""}`}
                aria-label="Profile"
                onClick={() => handleSetActive("profile")}
              >
                <User className="icon" size={20} />
                <span className="sidebar-letters">Profile</span>
              </Link>
            </li>

            <li>
              <Link
                to="/logout"
                className="sidebar-contents"
                aria-label="Logout"
                onClick={() => handleSetActive("logout")}
              >
                <Power className="icon" size={20} />
                <span className="sidebar-letters">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className={`mobile-toggle-btn ${isMobileOpen ? "sidebar-open" : ""}`}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  )
}

export default SidebarMenu
