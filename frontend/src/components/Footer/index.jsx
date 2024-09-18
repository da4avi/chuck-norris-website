import { Link } from "react-router-dom"
import "./styles.css"
import chuckNorrisIcon from "../../assets/chuckNorrisIcon.webp"

export default function Footer() {
    return (
        <footer className="main-footer">
            <div>
                <img className='chuck-norris-icon' src={chuckNorrisIcon} alt="Who was Chuck Norris" width={49} height="auto" />
            </div>
            <div className="site-map">
                <h2>Website Map</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jokes">Jokes</Link></li>
                    <li><Link to="/aboutchucknorris">About Chuck Norris</Link></li>
                    <li><Link to="/aboutthecreators">About the creators</Link></li>
                    <li><Link to="/register">Sign In</Link></li>
                </ul>
            </div>
        </footer>
    )
}