import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const Editor = ({
    onEmailSent,
    onClose,
    initialEmail = "",
    initialSubject = "",
    initialContent = ""
}) => {
    const [email, setEmail] = useState(initialEmail);
    const [subject, setSubject] = useState(initialSubject);
    const [content, setContent] = useState(initialContent);
    const [status, setStatus] = useState("");
    const [folderId, setFolderId] = useState(null);

    useEffect(() => {
        setEmail(initialEmail);
        setSubject(initialSubject);
    }, [initialEmail, initialSubject]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/send-email", {
                address: email,
                subject,
                text: content,
                folder_id: folderId,
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
            <div>
                <h2>New Message</h2>
                <div className="close-button" onClick={onClose}>
                    X
                </div>
            </div>

            <form onSubmit={handleSubmit} className="editor-content">
                <input
                    type="text"
                    className="editor__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Recipient"
                />
                <input
                    type="text"
                    className="editor__input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Subject"
                />
                <div className="editor-content">
                    <CKEditor
                        editor={ClassicEditor}
                        className="editor-textfield"
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                </div>

                <button type="submit" onClick={()=>{setFolderId(2)}}>Send</button>
                <button onClick={()=>{setFolderId(4)}}>Save to drafts</button>

            </form>
       
            {status && <p>{status}</p>}
        </div>
    );
};

export default Editor;
