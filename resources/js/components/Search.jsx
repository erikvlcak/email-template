import { useState } from "react";

export default function Search() {
    const [query, setQuery] = useState("");

    return (
        <>
            <input
                onChange={(e) => setQuery(e.target.value)}
                className="searchBar"
                type="text"
                placeholder="Search"
                value={query}
            />

            {query && <button onClick={() => setQuery("")}>Clear</button>}

            <button>Filter</button>
        </>
    );
}
