import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleRegister = e => {
        e.preventDefault();
        axios.post('/auth/register', inputs)
            .then(res => { navigate("/login") })
            .catch(err => { setError(err.response.data) })
    }

    return (
        <div className="auth" >
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder='username' name='username' onChange={handleChange} />
                <input required type="password" placeholder='password' name='password' onChange={handleChange} />
                <input required type="email" placeholder='email' name='email' onChange={handleChange} />
                <button onClick={handleRegister}>Register</button>
                <p>{error}</p>
                <span>Have an account? <Link to='/login'>Login</Link></span>
            </form>
        </div >
    )
}

export default Register