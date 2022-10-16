import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState(null);

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async e => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="auth" >
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='username' name='username' onChange={handleChange} />
                <input type="password" placeholder='password' name='password' onChange={handleChange} />
                <button onClick={handleLogin}>Login</button>
                <p>{error}</p>
                <span>Don't have an account? <Link to='/register'>Register</Link></span>
            </form>
        </div >
    )
}

export default Login