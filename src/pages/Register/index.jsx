import { Link } from 'react-router-dom'
import './styles.css'

export default function Register () {
    return (
        <>
        <div>
        <h1>Sign in</h1>
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
            <div>
                <label htmlFor="">Confirm your password: </label>
                <input type="password" name="" id="" />
            </div>
        </form>
        <li>
            <Link to="/login">Login </Link>
        </li>
        </div>
        </>
    )
}