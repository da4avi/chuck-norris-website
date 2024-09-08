import { Link } from 'react-router-dom'
import './styles.css'

export default function Login () {
    return (
        <>
        <h1>Login</h1>
        <form action="">
            <div>
                <label htmlFor="">User: </label>
                <input type="text" name="" id="" />
            </div>
            <div>
                <label htmlFor="">Email: </label>
                <input type="email" name="" id="" />
            </div>
            <div>
                <label htmlFor="">Password: </label>
                <input type="password" name="" id="" />
            </div>
        </form>
        <li>
            <Link to="/register">Sign In</Link>
        </li>
        </>
    )
}