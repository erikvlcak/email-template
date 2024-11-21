import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";

export default function Search({handleEmailClick, displayedEmails}) {
    const [query, setQuery] = useState("");
    const [mails, setMails] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState(null);


    const loadMails = async () => {
        try {
            const response = await axios.get("/api/emails");
            setMails(response.data);
        } catch (err) {
            console.error("Failed to fetch emails:", err);
            setError("Failed to fetch emails. Please try again later.");
        }
    };


    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                setFiltered(
                    mails.filter((mail) =>
                        mail.subject.toLowerCase().includes(query.toLowerCase())
                    )
                );
            } else {
                setFiltered([]);
            }
        }); 

        return () => clearTimeout(timer); 
    }, [query, mails]);

    useEffect(() => {
        loadMails();
    }, []);

    return (
        <div className="page-top">
            <div className="searchBarComponent">
                <div className="searchBar">
                    <input className="search-input"
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <div className="searched-mails">
                            {filtered.length > 0 ? (
                                filtered.map((mail) => (
                                    <div onClick={()=>{{handleEmailClick(mail), setQuery("")}}} key={mail.id} className="mail" >
                                        <div className="mail-subject">{mail.subject}</div>
                                        <div className="mail-sender">{mail.user.email}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="mail-no-results">No results found for "{query}".</div>
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
            </div>
        </div>
    );
}
