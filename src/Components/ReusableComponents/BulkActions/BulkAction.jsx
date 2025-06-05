import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaArchive, FaDownload, FaTag } from "react-icons/fa";
import AddTagsComponent from "../AddTagsComponent/AddTagsComponent";
import "./BulkAction.css";
import AddTagModal from "../../ReusableComponents/AddTagModal/AddTagModal";

const BulkActions = ({ selectedRows = [], availableActions = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is active
  const tagOptionsRef = useRef(null);
  const moreOptionsRef = useRef(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const [isNewTagModalOpen, setIsNewTagModalOpen] = useState(false);
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false);
  const tagColors = {
    Urgent: "#FF0000", // Red
    Review: "#FF9900", // Orange
    Completed: "#008000", // Green
  };
  const handleAddtag = ({ name, color }) => {
    console.log("New Folder Created:", { name, color });
    // Add your logic to save the folder
  };
    const [modalHeading, setModalHeading] = useState(""); // State for modal heading
      const [selectedSection, setSelectedSection] = useState(""); // State for selected section


  const renderActionButton = (action) => {
    switch (action) {
      case "delete":
        return (
          <button className="bulk-action-button bulk-delete-button" data-tooltip="Delete">
            <FaTrash className="bulk-icon" />
          </button>
        );
      case "archive":
        return (
          <button className="bulk-action-button bulk-archive-button" data-tooltip="Archive">
            <FaArchive className="bulk-icon" />
          </button>
        );
      case "download":
        return (
          <button className="bulk-action-button bulk-download-button" data-tooltip="Download">
            <FaDownload className="bulk-icon" />
          </button>
        );
      case "tag":
        return (
          <button
            className="dropdown-toggle bulk-action-button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === "tag" ? null : "tag"); // Toggle tag dropdown
            }}
            ref={tagOptionsRef}
          >
            <FaTag className="bulk-icon tag-icon" />
          </button>
        );
      case "more":
        return selectedRows.length === 1 ? (
          <button
            className="dropdown-toggle bulk-action-button more-button-fix"
            style={{ overflow: "hidden" }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === "more" ? null : "more"); // Toggle more dropdown
            }}
          >
            More
          </button>
        ) : null;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tagOptionsRef.current &&
        !tagOptionsRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle")
      ) {
        setActiveDropdown(null); // Close dropdown if clicked outside
      }
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle")
      ) {
        setActiveDropdown(null); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bulk-actions-container">
      {selectedRows.length > 0 && (
        <div className="bulk-actions">
          {availableActions.map((action, index) => (
            <React.Fragment key={index}>
              <div className="separate-bulk-button">{renderActionButton(action)}</div>
              {index < availableActions.length - 1 &&
                !(
                  index === availableActions.length - 2 &&
                  availableActions[availableActions.length - 1] === "more" &&
                  selectedRows.length > 1
                ) && <div className="divider"></div>}
            </React.Fragment>
          ))}

          {activeDropdown === "tag" && (
            <div className="tag-options" ref={tagOptionsRef}>
              <p className="addtotag-box-heading">Add to tag</p>
              <ul>
                {Array.isArray(tags) &&
                  tags.map((tag, index) => (
                    <li key={index} className="tag-item">
                      <span
                        className="tag-dot"
                        style={{ backgroundColor: tagColors[tag] || "#000" }}
                      ></span>
                      {tag}
                    </li>
                  ))}
              </ul>
              <hr className="hr-tag" />
              <button
                className="add-tag-button add-tag-button2"
                onClick={() => {
                  setIsNewTagModalOpen(true);
                  setModalHeading(" Create New Tag");
                
                }}
              >
                Create New tag
              </button>
            </div>
          )}

          {activeDropdown === "more" && (
            <div className="more-options" ref={moreOptionsRef}>
              <ul>
                <li className="testquestionadd-dropdown-item">Rename</li>
                <li className="testquestionadd-dropdown-item">Make a Copy</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <AddTagModal isOpen={isNewTagModalOpen}
        onClose={() => setIsNewTagModalOpen(false)}
        onAddFolder={handleAddtag}

        heading={modalHeading} // Pass the dynamic heading
        selectedSection={selectedSection} // Pass the selected section name



      />
    </div>
  );
};

export default BulkActions;