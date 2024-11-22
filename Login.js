import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("username:" + username);
        console.log("password:" + password);

        axios.post("http://localhost:3000/api/createuser", { username,  password })
            .then((res) => {
                if (res.data) {
                    alert("Saved Successfully");
                    setUsername("");
                    setPassword("");
                    navigate('/category');
                } else {
                    alert("Failed to save");
                }
            })
            .catch((error) => {
                console.error("There was an error creating the user!", error);
            });
    };

    return (
        <div className="wrapper">
            <form>
                <h1>Login</h1>
                <div className="input-box">
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required /><FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required /><FaLock className='icon' />
                </div>
                <div className="remember-forgot">
                    <label><input type='checkbox' /> Remember me </label>
                    <NavLink to='/register'>Forgot password</NavLink>
                </div>
                <button type='submit' onClick={handleSubmit}>Login</button>
                <div className='link'>
                    <p>Don't have an account?<NavLink to='/register'>Register</NavLink></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
