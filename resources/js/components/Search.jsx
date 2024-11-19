import { useState } from "react";
import Profile from "./Profile";

export default function Search() {
    const [query, setQuery] = useState("");
    const [displayedProfile, setDisplayedProfile] = useState(false);

    return (
        <>
            <div className="page-top">
                <div className="searchBar">
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search"
                        value={query}
                    />

                    {query && (
                        <button onClick={() => setQuery("")}>Clear</button>
                    )}

                    <button>Filter</button>
                </div>
                <div className="profile">
                    <button
                        onClick={() => setDisplayedProfile(!displayedProfile)}
                    >
                        {displayedProfile ? (
                            "Profile"
                        ) : (
                            <div className="development">
                                <Profile />
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
