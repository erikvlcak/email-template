import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Editor from "./Editor";

const EmailView = ({
    selectedEmail,
    formatDate,
    onEmailSent,
    selectedFolder,
}) => {
    const { user } = useContext(UserContext);
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
                    {selectedFolder === 1 && (
                        <tr>
                            <td>
                                <strong>From:</strong>
                            </td>
                            <td>
                                {selectedEmail.user
                                    ? selectedEmail.user.email
                                    : "Unknown User"}
                            </td>
                        </tr>
                    )}
                    {selectedFolder === 2 && (
                        <tr>
                            <td>
                                <strong>To:</strong>
                            </td>
                            <td>
                                {selectedEmail.recipients[0]?.receiver_email}
                            </td>
                        </tr>
                    )}
                    {selectedFolder !== 1 && selectedFolder !== 2 && (
                        <tr>
                            <td>
                                <strong>Recipient:</strong>
                            </td>
                            <td>
                                {selectedEmail.recipients[0]?.receiver_email}
                            </td>
                        </tr>
                    )}
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
            <hr />
            {selectedEmail.html ? (
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.html }} />
            ) : (
                <div>{selectedEmail.body}</div>
            )}
            <hr />
            <button
                className="email-view__respond-button"
                onClick={handleRespondClick}
            >
                {selectedFolder === 4 ? "Finish draft" : "Reply"}
            </button>
            {isEditorVisible && (
                <Editor
                    onEmailSent={onEmailSent}
                    onClose={handleCloseEditor}
                    initialEmail={selectedEmail.recipients[0]?.receiver_email}
                    initialSubject={`Re: ${selectedEmail.subject}`}
                    initialContent={selectedEmail.body}
                    selectedEmail={selectedEmail}
                />
            )}
        </div>
    );
};

export default EmailView;
