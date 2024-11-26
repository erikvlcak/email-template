export default function Navbar({
    fetchEmails,
    selectedFolder,
    activeButton,
    handleFolderClick,
}) {
    return (
        <div className="sidebar">
            <h2 className="logo-cbp" onClick={() => handleFolderClick(1)}>
                {" "}
                <span className="title-blue">C</span>
                <span className="title-black">B</span>
                <span className="title-red">P</span> MAIL
            </h2>

            <ul className="navigation">
                <button
                    className={activeButton === 1 ? "active" : ""}
                    onClick={() => {handleFolderClick(1); fetchEmails(selectedFolder)}}
                >
                    Inbox
                </button>
                <button
                    className={activeButton === "starred" ? "active" : ""}
                    onClick={() => {handleFolderClick("starred"); fetchEmails(selectedFolder)}}
                >
                    Favorite
                </button>
                <button
                    className={activeButton === 2 ? "active" : ""}
                    onClick={() => {handleFolderClick(2); fetchEmails(selectedFolder)}}
                >
                    Sent
                </button>
                <button
                    className={activeButton === 3 ? "active" : ""}
                    onClick={() => {handleFolderClick(3); fetchEmails(selectedFolder)}}
                >
                    All
                </button>
                <button
                    className={activeButton === 4 ? "active" : ""}
                    onClick={() => {handleFolderClick(4); fetchEmails(selectedFolder)}}
                >
                    Drafts
                </button>
                <button
                    className={activeButton === 5 ? "active" : ""}
                    onClick={() => {handleFolderClick(5); fetchEmails(selectedFolder)}}
                >
                    Trash
                </button>
            </ul>
        </div>
    );
}
