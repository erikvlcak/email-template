export default function Navbar({
    fetchEmails,
    selectedFolder,
    activeButton,
    handleFolderClick,
}) {
    return (
        <div className="sidebar">
            <h2>CBP Mail</h2>

            <button
                className="refresh-button"
                onClick={() => fetchEmails(selectedFolder)}
            >
                Refresh inbox
            </button>

            <ul className="navigation">
                <button
                    className={activeButton === 1 ? "active" : ""}
                    onClick={() => handleFolderClick(1)}
                >
                    Inbox
                </button>
                <button
                    className={activeButton === "starred" ? "active" : ""}
                    onClick={() => handleFolderClick("starred")}
                >
                    Starred
                </button>
                <button
                    className={activeButton === 2 ? "active" : ""}
                    onClick={() => handleFolderClick(2)}
                >
                    Sent
                </button>
                <button
                    className={activeButton === 3 ? "active" : ""}
                    onClick={() => handleFolderClick(3)}
                >
                    All
                </button>
                <button
                    className={activeButton === 4 ? "active" : ""}
                    onClick={() => handleFolderClick(4)}
                >
                    Drafts
                </button>
                <button
                    className={activeButton === 5 ? "active" : ""}
                    onClick={() => handleFolderClick(5)}
                >
                    Trash
                </button>
            </ul>
        </div>
    );
}
