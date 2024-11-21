import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import EmailList from "../components/EmailList";
import "../../css/style.scss";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmailView from "../components/EmailView";

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(1); // Default to Inbox
    const [loading, setLoading] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [activeButton, setActiveButton] = useState(1); // Default to Inbox

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
        setSelectedEmails([]); // Reset selected emails when changing folders
        setActiveButton(folderId); // Set the active button
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const handleSelectEmail = (emailId) => {
        setSelectedEmails((prevSelectedEmails) =>
            prevSelectedEmails.includes(emailId)
                ? prevSelectedEmails.filter((id) => id !== emailId)
                : [...prevSelectedEmails, emailId]
        );
    };

    const handleSelectAllEmails = (displayedEmails) => {
        if (selectedEmails.length === displayedEmails.length) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(displayedEmails.map((email) => email.id));
        }
    };

    const toggleStarred = async (email) => {
        const updatedEmail = { ...email, is_starred: !email.is_starred };
        try {
            await axios.put(`/api/emails/${email.id}`, updatedEmail);
            setEmails((prevEmails) =>
                prevEmails.map((e) => (e.id === email.id ? updatedEmail : e))
            );
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };

    const moveEmailsToFolder = async (folderId) => {
        try {
            await Promise.all(
                selectedEmails.map((emailId) =>
                    axios.put(`/api/emails/${emailId}`, { folder_id: folderId })
                )
            );
            fetchEmails(selectedFolder); // Refresh the email list
            setSelectedEmails([]); // Reset selected emails
        } catch (error) {
            console.error("Error moving emails:", error);
        }
    };

    const displayedEmails = emails.filter(
        (email) => email.user && email.recipients.length > 0
    );

    return (
        <div className="dashboard">
            <Navbar
                fetchEmails={fetchEmails}
                handleFolderClick={handleFolderClick}
                selectedFolder={selectedFolder}
                activeButton={activeButton}
            />

            <div className="main-content">
                <div className="fixed-top">
                    <Search handleEmailClick={handleEmailClick} displayedEmails={displayedEmails}/>
                    <div className="top-options">
                        <div className="top-select-info">
                            <button
                                onClick={() =>
                                    handleSelectAllEmails(displayedEmails)
                                }
                            >
                                Select all
                            </button>

                            <div>
                                <strong>{selectedEmails.length} </strong>
                                selected
                            </div>
                        </div>

                        <div className="top-move">
                            {selectedEmails.length > 0 && (
                                <div className="top-move-buttons">
                                    <span>Move selected email(s) to: </span>
                                    {selectedFolder !== 1 && (
                                        <button
                                            onClick={() =>
                                                moveEmailsToFolder(1)
                                            }
                                        >
                                            Inbox
                                        </button>
                                    )}
                                    {selectedFolder !== 2 && (
                                        <button
                                            onClick={() =>
                                                moveEmailsToFolder(2)
                                            }
                                        >
                                            Sent
                                        </button>
                                    )}
                                    {selectedFolder !== 4 && (
                                        <button
                                            onClick={() =>
                                                moveEmailsToFolder(4)
                                            }
                                        >
                                            Drafts
                                        </button>
                                    )}
                                    {selectedFolder !== 5 && (
                                        <button
                                            onClick={() =>
                                                moveEmailsToFolder(5)
                                            }
                                        >
                                            Trash
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
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
                        <EmailView
                            selectedEmail={selectedEmail}
                            setSelectedEmail={setSelectedEmail}
                            formatDate={formatDate}
                        />
                    ) : (
                        <EmailList
                            loading={loading}
                            displayedEmails={displayedEmails}
                            selectedEmails={selectedEmails}
                            selectedFolder={selectedFolder}
                            handleEmailClick={handleEmailClick}
                            handleSelectEmail={handleSelectEmail}
                            toggleStarred={toggleStarred}
                            formatDate={formatDate}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
