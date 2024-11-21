import { useState } from "react";
import Profile from "./Profile";
import axios from "axios";
import { useEffect } from "react";

export default function Search() {
    const [query, setQuery] = useState("");
    const [mails, setMails] = useState(null);

    const loadMails = async () =>{
        const response = await axios.get("/api/emails");
        const data = await response.data;
        console.log(data);

        setMails(data);
    };

    useEffect(()=>{
        loadMails();
    },[])

    return (
        <>
            <div className="page-top">
                <div className="searchBarComponent">
                    <div className='searchBar' >
                        <input
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search"
                            value={query}
                        />
                        {query ? (
                            <div className="searched-mails">
                            <div className="mail">{mails[0]?.subject}</div>
                            <div className="mail">{mails[1]?.subject}</div>
                            <div className="mail">{mails[2]?.subject}</div>
                            <div className="mail">{mails[3]?.subject}</div>
                            <div className="mail">{mails[4]?.subject}</div>
                            </div>
                            
                        ) : (null)}
                    </div>
                </div>
            </div>
        </>
    );
}
