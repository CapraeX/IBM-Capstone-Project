// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validatePassword = (password) => {
        return password.length >= 8; // Cambiado a 8 caracteres mínimo
    };

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate form inputs
        if (!name.trim()) {
            setShowerr('Name is required');
            return;
        }

        if (!validateEmail(email)) {
            setShowerr('Please enter a valid email address');
            return;
        }

        if (!validatePhone(phone)) {
            setShowerr('Please enter a valid 10-digit phone number');
            return;
        }

        if (!validatePassword(password)) {
            setShowerr('Password must be at least 8 characters long'); // Actualizado el mensaje de error
            return;
        }

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        console.log("response"+response);

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem('name', json.Name);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                // Modificación aquí: extraer solo el mensaje de error
                const errorMessage = json.errors[0]?.msg || 'Error en el registro';
                setShowerr(errorMessage);
            } else {
                setShowerr(json.error || 'Error en el registro');
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{marginTop:'10%'}}>
            <div className="signup-grid">
                <div className="login-text" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#333', margin: '0 0 15px' }}>SignUp</h2>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Enter your email" 
                                aria-describedby="helpId"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type="text" 
                                name="name" 
                                id="name" 
                                className="form-control" 
                                placeholder="Enter your name" 
                                aria-describedby="helpId"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                type="tel" 
                                name="phone" 
                                id="phone" 
                                className="form-control" 
                                placeholder="Enter your 10-digit phone number" 
                                aria-describedby="helpId"
                                maxLength="10"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter your password (min 8 characters)" 
                                aria-describedby="helpId"
                            />
                        </div>

                        {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}

                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components