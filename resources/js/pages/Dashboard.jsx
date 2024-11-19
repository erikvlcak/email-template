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
            response = await axios.get(`/api/emails?folder_id=${folderId}`);

            setEmails(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    const toggleEditor = () => {
        setIsEditorVisible(!isEditorVisible);
    };

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>CBP Mail</h2>
                <button
                    className="refresh-button"
                    onClick={() => fetchEmails(selectedFolder)}
                >
                    Refresh
                </button>
                <ul className="navigation">
                    <button onClick={() => handleFolderClick(1)}>Inbox</button>
                    <button onClick={() => handleFolderClick(2)}>Sent</button>
                    <button onClick={() => handleFolderClick(3)}>
                        Starred
                    </button>
                    <button onClick={() => handleFolderClick(4)}>Drafts</button>
                    <button onClick={() => handleFolderClick(5)}>Trash</button>
                </ul>
            </div>
            <div className="main-content">
                <div className="fixed-top">
                    <Search />
                    <DashboardNavigation />
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
                    <EmailList>
                        {loading ? (
                            <div>Loading emails...</div>
                        ) : (
                            emails.map((email) => (
                                <li key={email.id} className="email-item">
                                    {selectedFolder !== 1 && (
                                        <div className="email-recipient">
                                            {email.recipients
                                                .map(
                                                    (recipient) =>
                                                        recipient.receiver_email ||
                                                        "Unknown Recipient"
                                                )
                                                .join(", ")}
                                        </div>
                                    )}
                                    <div className="email-subjectAndBody">
                                        <span className="email-subject">
                                            {email.subject}
                                        </span>{" "}
                                        - {email.body}
                                    </div>
                                </li>
                            ))
                        )}
                    </EmailList>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
