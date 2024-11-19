import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
export default function Login(props) {
 
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
 
    const handleSubmit = async (event) => {
 
        event.preventDefault();
 
        // make the AJAX request
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });
 
        // with axios
        try {
            // make the AJAX request
            const response = await axios.post('/login', values);
            // get the (already JSON-parsed) response data
            const response_data = response.data;
        } catch (error) {
            // if the response code is not 2xx (success)
            switch (error.response.status) {
                case 422:
                    // handle validation errors here
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    break;
                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }
    }
 
    const handleChange = (event) => {
        setValues(previous_values => {
            return ({...previous_values, 
                [event.target.name]: event.target.value
            });
        });
    }
 
    return (
        <div className="login-body">

            <div className="login-wrapper">
                
                <form className="login-form" action="/login" method="post" onSubmit={ handleSubmit }>
         
                    <input type="email" name="email" placeholder="Email" value={ values.email } onChange={ handleChange } />
         
                    <input type="password" name="password" placeholder="Password" value={ values.password } onChange={ handleChange } />
         
                    <button>Login</button>
         
                </form>
            <Link to="/register">Register</Link>

            </div>

        </div>
    );
}