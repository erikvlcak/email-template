import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/UserContext";

const images = [
    "/bgrImg/image-1.jpg",
    "/bgrImg/image-2.jpg",
    "/bgrImg/image-3.jpg",
    "/bgrImg/image-4.jpg",
    "/bgrImg/image-5.jpg",
    "/bgrImg/image-6.jpg",
    "/bgrImg/image-7.jpg",
    "/bgrImg/image-8.jpg",
    "/bgrImg/image-9.jpg",
    "/bgrImg/image-10.jpg",
    "/bgrImg/image-11.jpg",
    "/bgrImg/image-12.jpg",
    "/bgrImg/image-13.jpg",
    "/bgrImg/image-14.jpg",
    "/bgrImg/image-15.jpg",
    "/bgrImg/image-16.jpg",
    "/bgrImg/image-17.jpg",
    "/bgrImg/image-18.jpg",
    "/bgrImg/image-19.jpg",
    "/bgrImg/image-20.jpg",
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
                    setErrors(error.response.data.errors);
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
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="signup-body"
            style={{
                backgroundImage: `url(${images[backgroundImg]})`,
            }}
        >
            <div className="signup-form-content">
                <div className="">
                    <h1 className="">
                        Sign Up to <span className="title-blue">C</span>
                        <span className="title-black">B</span>
                        <span className="title-red">P</span> MAIL
                    </h1>
                    <p className="">Please enter your details</p>
                </div>

                <form
                    className="signup-form"
                    action="/register"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <div className="signup-form-top">
                        <div className="fname">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="fname"
                                name="firstname"
                                placeholder="First name"
                                value={values.firstname}
                                onChange={handleChange}
                            />
                            <div className="error">{errors?.firstname}</div>
                        </div>

                        <div className="lname">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                className="lname"
                                placeholder="Last name"
                                value={values.lastname}
                                onChange={handleChange}
                            />
                            <div className="error">{errors?.lastname}</div>
                        </div>

                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <div className="error">{errors?.email}</div>
                        </div>
                    </div>

                    <div className="signup-form-bottom">
                        <div className="phone">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="phone"
                                placeholder="Phone number"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            <div className="error">{errors?.phone}</div>
                        </div>

                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <div className="error">{errors?.password}</div>
                        </div>

                        <div className="password-confirm">
                            <label htmlFor="password_confirmation">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                className="password-confirm"
                                placeholder="Password confirmation"
                                value={values.password_confirmation}
                                onChange={handleChange}
                            />
                            <div className="error">
                                {errors?.password_confirmation}
                            </div>
                        </div>
                    </div>

                    <button className="signup-register-btn">Register</button>
                </form>

                <div className="signup-login">
                    <p>Already Have an Account?</p>
                    <p>
                        <Link className="" to="/login">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
