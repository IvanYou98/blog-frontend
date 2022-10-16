import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from '../imgs/blog-logo.png'

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <div className='container'>
                <div >
                    <Link to="/">
                        <img className='logo' src={Logo} alt='' />
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to='/?cat=frontend'>
                        <h6>Frontend</h6>
                    </Link>
                    <Link className='link' to='/?cat=backend'>
                        <h6>Backend</h6>
                    </Link>
                    <Link className='link' to='/?cat=algo'>
                        <h6>Algo</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {
                        currentUser ? <span onClick={logout}>Logout</span> :
                            <Link className='link' to="/login">
                                Login
                            </Link>
                    }
                    <span className='write'>
                        <Link className='link' to="write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar