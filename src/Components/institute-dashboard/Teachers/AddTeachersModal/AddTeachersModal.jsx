import React, { useState } from 'react';
import './AddTeachersModal.css'; // Add your CSS file for modal styles

const AddTeachersModal = ({ isModalOpen, onClose }) => {
  const [emails, setEmails] = useState('');

  const handleAddTeachers = () => {
    if (emails.trim()) {
      const emailsArray = emails.split(',').map((email) => email.trim());
      console.log('New Teachers Added:', emailsArray);
      // Add logic to save these emails or handle the submission logic here
    }
    setEmails('');
    onClose(); // Close the modal after adding teachers
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Teachers</h2>
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="Enter emails, separated by commas"
          rows="4"
          className="modal-textarea"
        />
        <div className="modal-actions">
          <button onClick={handleAddTeachers} className="modal-button save">
            Add Teachers
          </button>
          <button onClick={onClose} className="modal-button cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeachersModal;
