import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout () {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = axios.post('/logout');
            if (response.status === 200 || 401) {
                // Redirect to the main page after successful registration
                navigate('/login'); 
            }
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