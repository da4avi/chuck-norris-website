import { Link } from 'react-router-dom'
import './styles.css'

export default function Register () {
    return (
        <div className='register'>
            <h1>Sign in</h1>
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
                    <div>
                        <label htmlFor="">Confirm Password: </label>
                        <br />
                        <input type="password" name="" id="" />
                    </div>
                </form>
                <li>
                    <Link to="/login">
                        <button type="button">Create</button>
                    </Link>
                    <Link to="/login">
                        <button type="button">Login</button>
                    </Link>
                </li>
            </div>
        </div>
    )
}