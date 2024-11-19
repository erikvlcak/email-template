import axios from "axios";

export default function Logout () {

    const handleLogout = async () => {
        try {
            const response = axios.post('/logout');
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}