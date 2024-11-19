import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./components/Logout";

import UserContext from "./context/UserContext";

function App() {

    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios('/api/user');

            console.log(response.data);
            
            setUser(response.data);
        } catch (error) {
            setUser(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
