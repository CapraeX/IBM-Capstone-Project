// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

    // State variables for email and password
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [showerr, setShowerr] = useState('');

    // Get navigation function from react-router-dom
    const navigate = useNavigate();

    // Check if user is already authenticated, then redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, []);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8; // Cambiado a 8 caracteres mínimo
    };

    // Function to handle login form submission
    const login = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!validateEmail(email)) {
            setShowerr('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setShowerr('Password must be at least 8 characters long'); // Actualizado el mensaje de error
            return;
        }

        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
            // If authentication token is received, store it in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('name', json.Name);

            // Redirect to home page and reload the window
            navigate('/');
            window.location.reload();
        } else {
            // Handle errors if authentication fails
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div>
            <div className="container" style={{ 
                maxWidth: '400px', 
                margin: '120px auto 50px', // Added top margin to account for navbar
                padding: '30px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                backgroundColor: 'white'
            }}>
                <div className="login-grid">
                    <div className="login-text" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '2rem', color: '#333', margin: '0 0 15px' }}>Login</h2>
                    </div>
                    <div className="login-text" style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Are you a new member?
                        <span style={{ marginLeft: '8px' }}>
                            <Link to="/sign-up" style={{ color: '#2190FF', textDecoration: 'none', fontWeight: '500' }}>
                                Sign Up Here
                            </Link>
                        </span>
                    </div>
                    <div className="login-form">
                        <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    aria-describedby="helpId"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password (min 8 characters)"
                                    aria-describedby="helpId"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{showerr}</div>}
                            <div className="btn-group" style={{ textAlign: 'center', marginTop: '10px' }}>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                                    style={{
                                        padding: '12px 40px',
                                        backgroundColor: '#2190FF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
