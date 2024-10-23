import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles.css';
import { registerUser } from '../../api/user';
import { useTranslation } from 'react-i18next'

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [t] = useTranslation("global")

    const handleSubmit = async (e) => {
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
            <h1>{t('signup')}</h1>
            <div className='card'>
                <form>
                    <div>
                        <label htmlFor="username">{t('user')} </label>
                        <br />
                        <input type="text" onChange={(e) => setName(e.target.value)} name="username" id="username" />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <br />
                        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">{t('password')} </label>
                        <br />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
                    </div>
                </form>
                <li>
                    <button type="submit" onClick={handleSubmit}>{t('create')}</button>
                    <Link to="/login">
                        <button type="button">Login</button>
                    </Link>
                </li>
            </div>
        </div>
    );
}
