import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/send-email", {
                address: email,
                subject,
                text: body,
            });
            setStatus("Email sent successfully!");
            fetchEmails(); // Refresh the email list
        } catch (error) {
            setStatus("Failed to send email.");
        }
    };

    return (
        <div>
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send Email</button>
            </form>
            {status && <p>{status}</p>}
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
                        <strong>Star:</strong> {email.is_starred} <br />
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
