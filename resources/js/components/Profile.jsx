import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

import Logout from './Logout';

function Profile(){

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const response = axios.post('/logout');
            navigate('/register'); 
        } catch (error) {
            console.log(error); 
        }
    }

    return(
        <div className="profile-component">
            
            <div className="profile-details">
                <p className="profile-mail">{user?.email}</p>
                <div className="profile-pfp">
                    <div className="pfp-letter">{user?.firstname?.slice(0,1).toUpperCase()}</div>
                </div>
                <h1 className="profile-hello">Hello, {user?.firstname}</h1>
            </div>
           
           <div className="profile-functionality">
            <button onClick={handleLogout} className="profile-add-account">
                Add different account
            </button>
            <Logout/>
           </div>
        </div>
    )
}

export default Profile;