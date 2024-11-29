import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useContext } from "react";



const Editor = ({
    onEmailSent,
    onClose,
    initialEmail = "",
    initialSubject = "",
    initialContent = "",
    selectedEmail,
}) => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState(initialEmail);
    const [subject, setSubject] = useState(initialSubject);
    const [content, setContent] = useState(initialContent);
    const [status, setStatus] = useState("");
    const [folderId, setFolderId] = useState(null);

    useEffect(() => {
        selectedEmail?.recipients[0].receiver_email != user?.email ? setEmail(selectedEmail?.recipients[0].receiver_email) : setEmail(selectedEmail?.user?.email);
        setSubject(initialSubject);
    }, [initialEmail, initialSubject]);

    const saveToDrafts = async () => {
        try {
            await axios.post("/send-email", {
                address: email,
                subject,
                text: content,
                folder_id: 4, // Folder ID for drafts
            });
        } catch (error) {
            console.log("Failed to save email to drafts.");
        }
    };

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
            console.log("Failed to send email.");
        }
    };

    return (
        <div className="editor-window">
            <div>
                <h2>{subject ? subject : "New message"}</h2>
                <div
                    className="close-button"
                    onClick={async () => {
                        await saveToDrafts(); // Save email to drafts
                        onEmailSent();
                        onClose(); // Close the editor window
                    }}
                >
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

                <div className="editor-buttons">
                    <button
                        className="send"
                        type="submit"
                        onClick={() => {
                            setFolderId(2);
                        }}
                    >
                        Send message
                    </button>
                    <button
                        className="draft"
                        onClick={() => {
                            setFolderId(4);
                        }}
                    >
                        Save to drafts
                    </button>
                </div>
            </form>

            {status && <p>{status}</p>}
        </div>
    );
};

export default Editor;
