import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import key from "../keys";
import Profile from "../components/Profile";

import UserContext from "../context/UserContext";

export default function Login(props) {
    const { getUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [backgroundImg, setBackgroundImg] = useState(null);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const loadImage = async () => {
        try {
            const response = await axios.get(
                `https://api.unsplash.com/photos/random?client_id=${key}`
            );
            const data = response.data;
            setBackgroundImg(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }

        // setTimeout(loadImage, 30000);
    };

    useEffect(() => {
        loadImage();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // with axios
        try {
            // make the AJAX request
            const response = await axios.post("/login", values);
            // get the (already JSON-parsed) response data
            if (response.status === 200) {
                // Redirect to the main page after successful registration
                getUser();
                navigate("/");
            }
        } catch (error) {
            // if the response code is not 2xx (success)
            switch (error.response.status) {
                case 422:
                    // handle validation errors here
                    console.log(
                        "VALIDATION FAILED:",
                        error.response.data.errors
                    );
                    break;
                case 500:
                    console.log("UNKNOWN ERROR", error.response.data);
                    break;
            }
        }
    };

    const handleChange = (event) => {
        setValues((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <div
            className="auth-body"
            style={{
                backgroundImage: `url(${backgroundImg?.urls.regular + "&fit"})`,
            }}
        >
            <div className="auth-wrapper">
                <div className="auth-header">
                    <h1 className="auth-header-text">Welcome back</h1>
                    <p className="auth-detail-text">
                        Please enter your details
                    </p>
                </div>

                <form
                    className="auth-form"
                    action="/login"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />

                    <button>Login</button>
                </form>
                <div className="auth-link">
                    <p>Dont Have an Account?</p>
                    <p>
                        <Link className="auth-link-button" to="/register">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
