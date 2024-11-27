import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import EmailList from "../components/EmailList";
import Search from "../components/Search";
import { Link, redirect, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmailView from "../components/EmailView";
import UserContext from "../context/UserContext";
import Login from "./Login";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isEditorVisible, setIsEditorVisible] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(1); // Default to Inbox
    const [loading, setLoading] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [activeButton, setActiveButton] = useState(1); // Default to Inbox
    //const [isRead, setIsRead] = useState(false);

    const navigate = useNavigate();

    const fetchEmails = async (folderId) => {
        try {
            let response;
            setLoading(true);
            if (folderId === "starred") {
                response = await axios.get("/api/emails?starred=1");
            } else if (folderId === 3) {
                response = await axios.get("/api/emails");
            } else {
                response = await axios.get(`/api/emails`);
            }
            setEmails(response.data);
            console.log("Emails:", emails);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching emails:", error);
            setLoading(false);
        }
    };

    const markEmailAsRead = async (emailId) => {
        try {
            await axios.patch(`/api/emails/${emailId}/mark-as-read`, {
                is_read: true, // Mark the email as read
            });
            console.log("Email marked as read");
        } catch (error) {
            console.error("Error marking email as read:", error);
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
        markEmailAsRead(email.id);
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

    const deleteSelectedEmails = async () => {
        try {
            await Promise.all(
                selectedEmails.map((emailId) =>
                    axios.delete(`/api/emails/${emailId}`)
                )
            );
            fetchEmails(selectedFolder); // Refresh the email list
            setSelectedEmails([]); // Reset selected emails
        } catch (error) {
            console.error("Error deleting emails:", error);
        }
    };

    const displayedEmails = emails.filter((item) =>
        selectedFolder == 1
            ? item?.recipients[0]?.receiver_email == user?.email &&
              item.folder_id != 5 &&
              item?.recipients[0]?.receiver_email != null
            : selectedFolder == 2
            ? item.user.id == user?.id &&
              item.folder_id != 5 &&
              item?.recipients[0]?.receiver_email != null &&
              item.folder_id != 4
            : selectedFolder == 3
            ? (item.user.id == user?.id ||
                  item?.recipients[0]?.receiver_email == user?.email) &&
              item.folder_id != 5 &&
              item?.recipients[0]?.receiver_email != null
            : selectedFolder == 4
            ? (item.user.id == user?.id ||
                  item?.recipients[0]?.receiver_email == user?.email) &&
              item.folder_id == 4 &&
              item?.recipients[0]?.receiver_email != null
            : selectedFolder == 5
            ? (item.user.id == user?.id ||
                  item?.recipients[0]?.receiver_email == user?.email) &&
              item.folder_id == 5 &&
              item?.recipients[0]?.receiver_email != null
            : selectedFolder == "starred"
            ? (item.user.id == user?.id ||
                  item?.recipients[0]?.receiver_email == user?.email) &&
              item.is_starred == 1 &&
              item?.recipients[0]?.receiver_email != null
            : null
    );

    useEffect(() => {
        fetchEmails(selectedFolder);
    }, [selectedFolder]);

    return user && Object.keys(user).length ? (
        <div className="dashboard">
            <Navbar
                fetchEmails={fetchEmails}
                handleFolderClick={handleFolderClick}
                selectedFolder={selectedFolder}
                activeButton={activeButton}
            />

            <div className="main-content">
                <div className="fixed-top">
                    <Search
                        handleEmailClick={handleEmailClick}
                        displayedEmails={displayedEmails}
                        selectedFolder={selectedFolder}
                    />

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
                                    {selectedFolder !== 5 && (
                                        <button
                                            onClick={() =>
                                                moveEmailsToFolder(5)
                                            }
                                        >
                                            Move selected to Trash
                                        </button>
                                    )}
                                    {selectedFolder == 5 && (
                                        <div className="trash-buttons">
                                            <button
                                                className="button-delete"
                                                onClick={
                                                    () => deleteSelectedEmails() //delete emails
                                                }
                                            >
                                                Delete selected
                                            </button>

                                            <button
                                                className="button-delete"
                                                onClick={() =>
                                                    moveEmailsToFolder(3)
                                                }
                                            >
                                                Restore selected
                                            </button>
                                        </div>
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
                <div className="compose-button" onClick={toggleEditor}>
                    +
                </div>

                <div className="email-list">
                    {selectedEmail ? (
                        <EmailView
                            selectedFolder={selectedFolder}
                            selectedEmail={selectedEmail}
                            setSelectedEmail={setSelectedEmail}
                            formatDate={formatDate}
                        />
                    ) : (
                        <EmailList
                            emails={emails}
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
    ) : (
        <>
            {/* <h1>Please log in to access this page</h1>
                <Link to='/login'>
                    Log in
                </Link> */}
            <Login />
        </>
    );
};

export default Dashboard;
