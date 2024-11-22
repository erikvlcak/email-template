import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

import Logout from "./Logout";

function Profile({handleProfileButton}) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleLogout = async (link) => {
        try {
            const response = axios.post("/logout");
            navigate(`${link}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile-component">
            <div className="close-icon" onClick={()=>{handleProfileButton()}}>&#x2715;</div>
            <div className="profile-details">
                <p className="profile-mail">{user?.email}</p>
                <div className="profile-pfp">
                    <div className="pfp-letter">
                        {user?.firstname?.slice(0, 1).toUpperCase()}
                    </div>
                </div>
                <h1 className="profile-hello">Hello, {user?.firstname}</h1>
            </div>

            <div className="profile-functionality">
                <button
                    onClick={() => handleLogout("/register")}
                    className="profile-button"
                >
                    Add different account
                </button>
                <button className="profile-button" onClick={() => handleLogout("/login")}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
