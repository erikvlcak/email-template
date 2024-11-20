import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/UserContext";

export default function Register(props) {
    const { getUser } = useContext(UserContext);

    const [backgroundImg, setBackgroundImg] = useState(0);
    const [imageFiles, setImagesFiles] = useState([]);

    const [values, setValues] = useState({
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // // with axios
        try {
            // make the AJAX request
            const response = await axios.post("/register", values);
            // get the (already JSON-parsed) response data
            if (response.status === 200 || response.status === 201) {
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

    useEffect(() => {
        const images = [];

        for (let index = 1; index < 21; index++) {
            images.push('../bgrImg/image-' + index + '.jpg');
        }

        setImagesFiles(images);

        const interval = setInterval(() => {
            setBackgroundImg((prevIndex) => (prevIndex + 1) % imageFiles.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="auth-body"
        style={{
            backgroundImage: `url(${imageFiles[backgroundImg]})`,
        }}
        >
            <div className="auth-wrapper">
                <div className="auth-header">
                    <h1 className="auth-header-text">Sign Up</h1>
                    <p className="auth-detail-text">
                        Please enter your details
                    </p>
                </div>

                <form
                    className="auth-form"
                    action="/register"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    {/* <label htmlFor="firstname">First Name: </label> */}

                    <input
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        value={values.firstname}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="lastname">Last Name: </label> */}

                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        value={values.lastname}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="email">Email: </label> */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="phone">Phone: </label> */}

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={values.phone}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="password">Password: </label> */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="password_confirmation">Password confirmation: </label> */}

                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Password confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                    />

                    <button>Register</button>
                </form>

                <div className="auth-link">
                    <p>Already Have an Account?</p>
                    <p>
                        <Link className="auth-link-button" to="/login">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
