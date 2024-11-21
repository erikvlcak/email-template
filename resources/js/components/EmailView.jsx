import React, { useState } from "react";
import Editor from "./Editor";

const EmailView = ({ selectedEmail, formatDate, onEmailSent }) => {
    const [isEditorVisible, setIsEditorVisible] = useState(false);

    const handleRespondClick = () => {
        setIsEditorVisible(true);
    };

    const handleCloseEditor = () => {
        setIsEditorVisible(false);
    };

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <strong>User:</strong>
                        </td>
                        <td>
                            {selectedEmail.user
                                ? selectedEmail.user.name
                                : "Unknown User"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Recipient:</strong>
                        </td>
                        <td>{selectedEmail.recipients[0].receiver_email}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Subject:</strong>
                        </td>
                        <td>{selectedEmail.subject}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Date:</strong>
                        </td>
                        <td>{formatDate(selectedEmail.created_at)}</td>
                    </tr>
                </tbody>
            </table>
            {selectedEmail.html ? (
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.html }} />
            ) : (
                <div>{selectedEmail.body}</div>
            )}
            <button
                className="email-view__respond-button"
                onClick={handleRespondClick}
            >
                Respond
            </button>
            {isEditorVisible && (
                <Editor
                    onEmailSent={onEmailSent}
                    onClose={handleCloseEditor}
                    initialEmail={selectedEmail.recipients[0].receiver_email}
                    initialSubject={`Re: ${selectedEmail.subject}`}
                />
            )}
        </div>
    );
};

export default EmailView;
