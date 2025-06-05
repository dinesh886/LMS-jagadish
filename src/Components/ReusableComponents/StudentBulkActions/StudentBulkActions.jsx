import React, { useState } from "react";
import "./StudentBulkActions.css";
import { toast } from "react-toastify";
import { MonitorX } from "lucide-react";
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

const StudentBulkActions = ({
    selectedRows = [],
    studentActions = [],
    onBulkSuspend,
    onBulkTerminate,
    onBulkSendMessage,
}) => {
    const [isBulkSuspended, setIsBulkSuspended] = useState(false);

    const handleBulkSuspendToggle = () => {
        if (onBulkSuspend && selectedRows.length) {
            setIsBulkSuspended(!isBulkSuspended);
            if (!isBulkSuspended) {
                onBulkSuspend(selectedRows);
            } else {
                toast.success(`${selectedRows.length} students have been resumed`);
            }
        }
    };

    const handleBulkTerminate = () => {
        if (onBulkTerminate && selectedRows.length) {
            onBulkTerminate(selectedRows);
        }
    };

    const handleBulkMessage = () => {
        if (onBulkSendMessage && selectedRows.length) {
            onBulkSendMessage(selectedRows);
        }
    };

    const renderStudentActionButton = (action) => {
        switch (action) {
            case "suspend":
                return (
                    <button
                        key="suspend"
                        className="tube-action-button"
                        data-tooltip={isBulkSuspended ? "Resume students" : "Suspend students"}
                        onClick={handleBulkSuspendToggle}
                    >
                        <div className="suspend-toggle-container">
                            <MonitorX size={14} />
                            <span>{isBulkSuspended ? "Resume" : "Suspend"}</span>
                            <div className={`studentbulk-status-toggle ${isBulkSuspended ? "disabled" : "enabled"}`}>
                                <div className="studentbulk-status-toggle-track">
                                    <div className={`studentbulk-status-toggle-thumb ${isBulkSuspended ? "disabled" : "enabled"}`}>
                                        {!isBulkSuspended ? (
                                            <IoMdCheckmark className="status-icon" />
                                        ) : (
                                            <IoMdClose className="status-icon" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                );
            case "terminate":
                return (
                    <button
                        key="terminate"
                        className="tube-action-button"
                        data-tooltip="Terminate"
                        onClick={handleBulkTerminate}
                    >
                        Terminate
                    </button>
                );
            case "sendMessage":
                return (
                    <button
                        key="sendMessage"
                        className="tube-action-button"
                        data-tooltip="Send Notification"
                        onClick={handleBulkMessage}
                    >
                        Notify
                    </button>
                );
            default:
                return null;
        }
    };

    if (!selectedRows.length || !studentActions.length) return null;

    return (
        <div className="tube-bulk-actions-container">
            <div className="tube-bulk-actions">
                {studentActions.map((action, index) => (
                    <React.Fragment key={action}>
                        <div className="tube-bulk-button">
                            {renderStudentActionButton(action)}
                        </div>
                        {index < studentActions.length - 1 && <div className="tube-divider" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default StudentBulkActions;