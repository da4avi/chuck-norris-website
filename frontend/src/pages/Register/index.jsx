import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles.css';
import { registerUser } from '../../api/user';

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(name, email, password);
            if (response.ok) {
                navigate('/login');
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='register'>
            <h1>Sign up</h1>
            <div className='card'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">User: </label>
                        <br />
                        <input type="text" onChange={(e) => setName(e.target.value)} name="username" id="username" />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <br />
                        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <br />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
                    </div>
                </form>
                <li>
                    <button type="submit">Create</button>
                    <Link to="/login">
                        <button type="button">Login</button>
                    </Link>
                </li>
            </div>
        </div>
    );
}
