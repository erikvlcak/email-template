import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/Editor";

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [inbox, setInbox] = useState([]);

    useEffect(() => {
        fetchEmails();
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

    return (
        <div>
            <h1>Dashboard</h1>
            <Editor onEmailSent={fetchEmails} />
            <h2>Sent Emails</h2>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        <strong>To:</strong>{" "}
                        {email.recipients
                            .map((recipient) => recipient.receiver_email)
                            .join(", ")}{" "}
                        <br />
                        <strong>Subject:</strong> {email.subject} <br />
                        <strong>Body:</strong> {email.body} <br />
                        <strong>Star:</strong> {email.is_starred ? "Yes" : "No"}{" "}
                        <br />
                    </li>
                ))}
            </ul>
            <button onClick={fetchInbox}>Refresh Inbox</button>
            <h2>Inbox</h2>
            <ul>
                {inbox.map((email) => (
                    <li key={email.id}>
                        <strong>From:</strong> {email.sender_email} <br />
                        <strong>Subject:</strong> {email.subject} <br />
                        <strong>Body:</strong> {email.body} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
