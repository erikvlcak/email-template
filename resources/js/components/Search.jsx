import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Profile from "./Profile";
import UserContext from "../context/UserContext";

export default function Search({
    handleEmailClick,
    displayedEmails,
    selectedFolder,
}) {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [mails, setMails] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState(null);
    const [profileButton, setProfileButton] = useState(false);

    const handleProfileButton = () => {
        if (profileButton == false) {
            setProfileButton(true);
        } else {
            setProfileButton(false);
        }
    };

    const handleSelectedFolder = () => {
        if (selectedFolder == 1) {
            return "Search in Inbox";
        } else if (selectedFolder == 2) {
            return "Search in Sent";
        } else if (selectedFolder == 3) {
            return "Search in All";
        } else if (selectedFolder == 4) {
            return "Search in Drafts";
        } else {
            return "Search in Starred";
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                setFiltered(
                    displayedEmails.filter((mail) =>
                        mail.subject.toLowerCase().includes(query.toLowerCase())
                    )
                );
            } else {
                setFiltered([]);
            }
        });

        return () => clearTimeout(timer);
    }, [query, mails]);

    return (
        <div className="page-top">
            <div className="profile">
                {profileButton ? (
                    <div className="profile-open">
                        <Profile handleProfileButton={handleProfileButton} />
                    </div>
                ) : (
                    <div
                        className="open-profile"
                        onClick={() => {
                            handleProfileButton();
                        }}
                    >
                        <div className="profile-pfp-icon">
                            <div className="pfp-letter-icon">
                                {user?.firstname?.slice(0, 1).toUpperCase()}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <input
                className="search-input"
                type="text"
                placeholder={handleSelectedFolder()}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <div className="searched-mails">
                    {filtered.length > 0 ? (
                        filtered.map((mail) => (
                            <div
                                onClick={() => {
                                    {
                                        handleEmailClick(mail), setQuery("");
                                    }
                                }}
                                key={mail.id}
                                className="mail"
                            >
                                <div className="mail-subject">
                                    {mail.subject}
                                </div>
                                <div className="mail-sender">
                                    {mail.user.email}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mail-no-results">
                            No results found for "{query}".
                        </div>
                    )}
                    {filtered.length > 0 && (
                        <div className="search-query">
                            All results for "{query}"
                        </div>
                    )}
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
