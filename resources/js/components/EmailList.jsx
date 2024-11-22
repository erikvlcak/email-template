import React, { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function EmailList({
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
                <div>Loading emails...</div>
            ) : (
                displayedEmails.map((email) => (
                    <li
                        onClick={(e) => {
                            if (
                                e.target.type !== "checkbox" &&
                                !e.target.classList.contains("star")
                            ) {
                                handleEmailClick(email);
                            }
                        }}
                        key={email.id}
                        className="email-item"
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
                        {selectedFolder !== 1 &&
                            email.recipients.length > 0 && (
                                <div className="email-recipient">
                                    {email.recipients[0].receiver_email ||
                                        "Unknown Recipient"}
                                </div>
                            )}
                        <div className="email-subjectAndBody">
                            <span className="email-subject">
                                {email.subject}
                            </span>{" "}
                            - {email.body}
                        </div>
                        <div>{formatDate(email.created_at)}</div>
                    </li>
                ))
            )}
        </>
    );
}
