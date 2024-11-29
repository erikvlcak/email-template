import React, { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function EmailList({
    emails,
    loading,
    displayedEmails,
    selectedEmails,
    selectedFolder,
    handleEmailClick,
    handleSelectEmail,
    toggleStarred,
    formatDate,
}) {
    return (
        <>
            {loading ? (
                <div className="loading-circle">
                    <div className="spinner"></div>
                </div>
            ) : (
            displayedEmails.length > 0 ? (
                displayedEmails.map((email, index) => (
                    <li className={email.recipients[0].is_read == 0 ? ("email-item-open") : ("email-item") }
                        onClick={(e) => {
                            if (
                                e.target.type !== "checkbox" &&
                                !e.target.classList.contains("star")
                            ) {
                                handleEmailClick(email);
                            }
                        }}
                        key={email.id}
                        
                    >
                        <input
                            className="email-checkbox"
                            type="checkbox"
                            checked={selectedEmails.includes(email.id)}
                            onChange={() => handleSelectEmail(email.id)}
                        />
                        <div
                            className={`star ${
                                email.is_starred ? "starred" : ""
                            }`}
                            onClick={() => toggleStarred(email)}
                        >
                            ★
                        </div>

                        {email.recipients.length > 0 && (
                            <div className="email-recipient">
                                {selectedFolder === 1 && "From: "}
                                {selectedFolder === 2 && "To: "}
                                {selectedFolder === 2
                                    ? email.recipients[0].receiver_email
                                    : emails[index]?.user?.email}
                            </div>
                        )}

                        <div className="email-subjectAndBody">
                            <span className="email-subject">
                                {email.subject}
                            </span>{" "}
                            - {email.body}
                        </div>
                        <div className="email-date">{formatDate(email.created_at)}</div>
                    </li>
                ))
                ) : (
                    <div className="empty-folder">Folder is empty</div>
                )
            )}
        </>
    );
}
