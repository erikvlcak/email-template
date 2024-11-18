import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "../../css/style.scss";

const Editor = ({ onEmailSent, onClose }) => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");

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
            onClose(); // Close the editor window
        } catch (error) {
            setStatus("Failed to send email.");
        }
    };

    return (
        <div className="editor-window">
            <button className="close-button" onClick={onClose}>
                X
            </button>
            {subject ? <h2>{subject}</h2> : <h2>New message</h2>}
            <form onSubmit={handleSubmit} className="editor-content">
                <div>
                    {/* <label>Send to:</label> */}
                    <input
                        type="email"
                        className="editor__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Recipient"
                    />
                </div>
                <div>
                    {/* <label>Subject:</label> */}
                    <input
                        type="text"
                        className="editor__input"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="Subject"
                    />
                </div>
                <div className="editor-content">
                    {/* <label>Message:</label> */}
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                </div>
                <button type="submit">Send</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default Editor;
