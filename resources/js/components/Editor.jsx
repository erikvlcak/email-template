import React, { useState } from "react";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import axios from "axios";

const Editor = ({ onEmailSent }) => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");

    const handleModelChange = (model) => {
        setContent(model);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/send-email", {
                address: email,
                subject,
                text: content,
            });
            setStatus("Email sent successfully!");
            onEmailSent(); // Refresh the email list in Dashboard
        } catch (error) {
            setStatus("Failed to send email.");
        }
    };

    return (
        <div>
            <h2>Compose Message</h2>
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
                    <FroalaEditor
                        tag="textarea"
                        model={content}
                        onModelChange={handleModelChange}
                    />
                </div>
                <button type="submit">Send</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default Editor;
