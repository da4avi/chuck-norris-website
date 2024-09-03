import { Link } from 'react-router-dom'
import "./styles.css"

export default function Header() {
    return (
        <>
            <header className='header'>
                <h1>who was <br /> chuck norris</h1>
                <ul className='nav'>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                </ul>
            </header>
        </>
    )
}