import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
function App(){
    return(
        <div>
            Some stuff on the page!
            <BrowserRouter >
            <Link to="/register">Register</Link>
            <Routes>
            <Route path="/register" element={<Register />}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;