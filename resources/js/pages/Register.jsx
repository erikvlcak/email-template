import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/UserContext";

const images = [
    '/bgrImg/image-1.jpg',
    '/bgrImg/image-2.jpg',
    '/bgrImg/image-3.jpg',
    '/bgrImg/image-4.jpg',
    '/bgrImg/image-5.jpg',
    '/bgrImg/image-6.jpg',
    '/bgrImg/image-7.jpg',
    '/bgrImg/image-8.jpg',
    '/bgrImg/image-9.jpg',
    '/bgrImg/image-10.jpg',
    '/bgrImg/image-11.jpg',
    '/bgrImg/image-12.jpg',
    '/bgrImg/image-13.jpg',
    '/bgrImg/image-14.jpg',
    '/bgrImg/image-15.jpg',
    '/bgrImg/image-16.jpg',
    '/bgrImg/image-17.jpg',
    '/bgrImg/image-18.jpg',
    '/bgrImg/image-19.jpg',
    '/bgrImg/image-20.jpg',
];

export default function Register(props) {
    const { getUser } = useContext(UserContext);

    const [backgroundImg, setBackgroundImg] = useState(0);
    const [errors, setErrors] = useState(null);

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
                    setErrors(error.response.data.errors)
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
        const interval = setInterval(() => {
            setBackgroundImg((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []); 
    

    return (
        <div className="auth-body"
        style={{
            backgroundImage: `url(${images[backgroundImg]})`,
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
                    <div className="auth-error">{errors?.firstname}</div>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        value={values.firstname}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="lastname">Last Name: </label> */}
                    <div className="auth-error">{errors?.lastname}</div>
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        value={values.lastname}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="email">Email: </label> */}

                    <div className="auth-error">{errors?.email}</div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="phone">Phone: </label> */}
                    <div className="auth-error">{errors?.phone}</div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={values.phone}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="password">Password: </label> */}
                    <div className="auth-error">{errors?.password}</div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="password_confirmation">Password confirmation: </label> */}
                    <div className="auth-error">{errors?.password_confirmation}</div>
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
