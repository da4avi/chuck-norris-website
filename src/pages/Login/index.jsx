import { Link } from 'react-router-dom'
import './styles.css'

export default function Login() {
    return (
        <div className='login'>
            <h1>Login</h1>
            <div className='card'>
                <form action="">
                    <div>
                        <label htmlFor="">User: </label>
                        <br />
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Email: </label>
                        <br />
                        <input type="email" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Password: </label>
                        <br />
                        <input type="password" name="" id="" />
                    </div>
                </form>
                <li>
                    <Link to="/">
                        <button type="button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button type="button">Sign in</button>
                    </Link>
                </li>
            </div>
        </div>
    )
}