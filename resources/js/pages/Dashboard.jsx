import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import EmailList from "../components/EmailList";
import "../../css/style.scss";
import Search from "../components/Search";
import DashboardNavigation from "../components/DashboardNavigation";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(1); // Default to Inbox
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEmails(selectedFolder);
    }, [selectedFolder]);

    const fetchEmails = async (folderId) => {
        try {
            let response;
            setLoading(true);
            if (folderId === "starred") {
                response = await axios.get("/api/emails?starred=1");
            } else if (folderId === 3) {
                response = await axios.get("/api/emails");
            } else {
                response = await axios.get(`/api/emails?folder_id=${folderId}`);
            }
            setEmails(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching emails:", error);
            setLoading(false);
        }
    };

    const toggleEditor = () => {
        setIsEditorVisible(!isEditorVisible);
    };

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId);
        setSelectedEmail(null); // Reset selected email when changing folders
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>CBP Mail</h2>
                <ul className="navigation">
                    <button onClick={() => handleFolderClick(1)}>Inbox</button>
                    <button onClick={() => handleFolderClick(2)}>Sent</button>
                    <button onClick={() => handleFolderClick(3)}>All</button>
                    <button onClick={() => handleFolderClick(4)}>Drafts</button>
                    <button onClick={() => handleFolderClick(5)}>Trash</button>
                    <button onClick={() => handleFolderClick("starred")}>
                        Starred
                    </button>
                </ul>
            </div>
            <div className="main-content">
                <div className="fixed-top">
                    <Search />
                    <DashboardNavigation />
                    <button
                        className="refresh-button"
                        onClick={() => fetchEmails(selectedFolder)}
                    ></button>
                </div>
                {isEditorVisible && (
                    <Editor
                        onEmailSent={() => fetchEmails(selectedFolder)}
                        onClose={toggleEditor}
                    />
                )}
                <button className="compose-button" onClick={toggleEditor}>
                    +
                </button>
                <div className="email-list">
                    {selectedEmail ? (
                        <div>
                            <button onClick={() => setSelectedEmail(null)}>
                                Back to List
                            </button>
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
                                        <td>
                                            {
                                                selectedEmail.recipients[0]
                                                    .receiver_email
                                            }
                                        </td>
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
                                        <td>
                                            {formatDate(
                                                selectedEmail.created_at
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {selectedEmail.html ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: selectedEmail.html,
                                    }}
                                />
                            ) : (
                                <div>{selectedEmail.body}</div>
                            )}
                        </div>
                    ) : (
                        <EmailList>
                            {loading ? (
                                <div>Loading emails...</div>
                            ) : (
                                emails
                                    .filter(
                                        (email) =>
                                            email.user &&
                                            email.recipients.length > 0
                                    )
                                    .map((email) => (
                                        <li
                                            key={email.id}
                                            className="email-item"
                                            onClick={() =>
                                                handleEmailClick(email)
                                            }
                                        >
                                            {selectedFolder !== 1 &&
                                                email.recipients.length > 0 && (
                                                    <div className="email-recipient">
                                                        {email.recipients[0]
                                                            .receiver_email ||
                                                            "Unknown Recipient"}
                                                    </div>
                                                )}
                                            <div className="email-subjectAndBody">
                                                <span className="email-subject">
                                                    {email.subject}
                                                </span>{" "}
                                                - {email.body}
                                            </div>
                                            <div>
                                                {formatDate(email.created_at)}
                                            </div>
                                        </li>
                                    ))
                            )}
                        </EmailList>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
