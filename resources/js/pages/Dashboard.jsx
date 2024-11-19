import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import "../../css/style.scss";
import Search from "../components/Search";
import DashboardNavigation from "../components/DashboardNavigation";
import Profile from "../components/Profile";

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [inbox, setInbox] = useState([]);
    const [isEditorVisible, setIsEditorVisible] = useState(false);

    useEffect(() => {
        fetchEmails();
        fetchInbox();
    }, []);

    const fetchEmails = async () => {
        try {
            const response = await axios.get("/api/emails");
            setEmails(response.data);
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    const fetchInbox = async () => {
        try {
            const response = await axios.get("/api/fetch-inbox");
            setInbox(response.data);
        } catch (error) {
            console.error("Error fetching inbox:", error);
        }
    };

    const toggleEditor = () => {
        setIsEditorVisible(!isEditorVisible);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>CBP Mail</h2>
                <ul>
                    <li>
                        Inbox{" "}
                        <button onClick={fetchInbox}>Refresh Inbox</button>{" "}
                    </li>
                    <li>Starred</li>
                    <li>Sent</li>
                    <li>Drafts</li>
                    <li>Trash</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="fixed-top">
                    <div className="email-filters">
                        <Search />
                        <DashboardNavigation />
                    </div>
                    <div className="profile">
                        <Profile />
                    </div>
                </div>
                {isEditorVisible && (
                    <Editor onEmailSent={fetchEmails} onClose={toggleEditor} />
                )}
                <button className="compose-button" onClick={toggleEditor}>
                    +
                </button>
                <div className="email-list">
                    <h2>Sent Emails</h2>
                    <ul>
                        {emails.map((email) => (
                            <li key={email.id}>
                                <strong>To:</strong>{" "}
                                {email.recipients
                                    .map(
                                        (recipient) => recipient.receiver_email
                                    )
                                    .join(", ")}{" "}
                                <br />
                                <strong>Subject:</strong> {email.subject} <br />
                                <strong>Body:</strong> {email.body} <br />
                                <strong>Formatted Body:</strong>{" "}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: email.html,
                                    }}
                                />{" "}
                                <br />
                                <strong>Star:</strong>{" "}
                                {email.is_starred ? "Yes" : "No"} <br />
                            </li>
                        ))}
                    </ul>
                    <button onClick={fetchInbox}>Refresh Inbox</button>
                    <h2>Inbox</h2>
                    <ul>
                        {inbox.map((email) => (
                            <li key={email.id}>
                                <strong>From:</strong> {email.sender_email}{" "}
                                <br />
                                <strong>Subject:</strong> {email.subject} <br />
                                <strong>Body:</strong> {email.body} <br />
                                <strong>Formatted Body:</strong>{" "}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: email.html,
                                    }}
                                />{" "}
                                <br />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
