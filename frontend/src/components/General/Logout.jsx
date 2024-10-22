import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/Context';
import './styles/logout.css';
import { useContext, useState } from 'react';

export default function Logout() {
    const { logout, token } = useContext(AuthContext);

    return (
        <div className="logout-container">
            {token ? (
                <button className='logout-button' onClick={logout} aria-label="Logout">
                    <Link to={"/register"} aria-label="Logout">Logout</Link>
                </button>
            ) : (
                <button className='logout-button' aria-label="Login">
                    <Link to={"/login"} aria-label="Login">Login</Link>
                </button>
            )}
        </div>
    );
}
